(() => {
    "use strict";

    const metadata = Array.isArray(window.FILE_METADATA) ? window.FILE_METADATA : [];
    const dataStore = window.FILE_DATA_STORE || {};
    const masterData = window.MASTER_DATA || null;
    const docsContent = window.DOCS_CONTENT || {};
    const rawItsData = window.ITS_GEOSPATIAL_DATA || window.itsData || null;
    const roadNetworkData = window.ROAD_NETWORK || null;
    let actualNetworkData = window.ACTUAL_NETWORK || null; // authoritative FY25-26 national roads (WGS84)
    const tollComponentData = Array.isArray(window.TOLL_COMPONENTS) ? window.TOLL_COMPONENTS : [];
    const dictionaryData = Array.isArray(window.DICTIONARY_DATA) ? window.DICTIONARY_DATA : [];
    const dictionaryCategories = Array.isArray(window.DICTIONARY_CATEGORIES) ? window.DICTIONARY_CATEGORIES : [];
    const projectScope = Array.isArray(window.PROJECT_SCOPE) ? window.PROJECT_SCOPE : [];
    const rssData = window.RSS_DATA || null;
    const rssBudget = window.RSS_BUDGET || null;
    const accidentData = (window.ACCIDENT_DATA && Array.isArray(window.ACCIDENT_DATA.incidents)) ? window.ACCIDENT_DATA.incidents : [];

    const $ = (selector, root = document) => root.querySelector(selector);
    const $$ = (selector, root = document) => Array.from(root.querySelectorAll(selector));
    const actualNetworkSource = Array.from(document.scripts)
        .map((script) => script.getAttribute("src") || "")
        .find((src) => src.includes("actual_network.js")) || "docs/data/actual_network.js";

    const palette = ["#34d399", "#fbbf24", "#22d3ee", "#a78bfa", "#fb7185", "#60a5fa", "#fb923c"];
    const statusPalette = {
        "existing interface": "#34d399",
        "operational": "#34d399",
        "design": "#a78bfa",
        "planned": "#fbbf24",
        "survey required": "#fb7185",
        "critical": "#fb7185"
    };

    const state = {
        assets: [],
        corridors: [],
        assetTypes: [],
        filteredAssets: [],
        selectedAssetId: null,
        selectedSpecId: null,
        fileExtension: "All",
        tourTimer: null,
        tourIndex: 0,
        map: null,
        nationalLayer: null,
        routeLayer: null,
        markerLayer: null,
        projectBounds: null,
        nationalBounds: null,
        nationalNetworkDrawn: false,
        nationalNetworkQueued: false,
        markers: new Map(),
        workbook: null,
        workbookCharts: [],
        globalCharts: []
    };

    function init() {
        state.corridors = normalizeCorridors(rawItsData);
        state.assetTypes = normalizeAssetTypes(rawItsData);
        state.assets = normalizeAssets(rawItsData);
        state.filteredAssets = [...state.assets];

        bindNavigation();
        updateClock();
        setInterval(updateClock, 1000);
        setupMap();
        setupSpecs();
        setupBOQ();
        setupExplorer();
        setupAnalyticsDash();

        switchView("map");
    }

    function bindNavigation() {
        $$(".nav-item").forEach((item) => {
            item.addEventListener("click", () => switchView(item.dataset.view));
        });

        $("#focusMapBtn")?.addEventListener("click", () => {
            switchView("map");
            setTimeout(fitMapToAssets, 120);
        });
    }

    function switchView(viewId) {
        $$(".nav-item").forEach((item) => item.classList.toggle("active", item.dataset.view === viewId));
        $$(".view-section").forEach((view) => view.classList.toggle("active", view.id === `${viewId}-view`));

        if (viewId === "map" && state.map) {
            setTimeout(() => state.map.invalidateSize(), 120);
        }
    }

    function updateClock() {
        const clock = $("#liveClock");
        if (!clock) return;

        const now = new Date();
        clock.textContent = now.toLocaleTimeString("en-UG", {
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit"
        });
    }

    function normalizeCorridors(data) {
        if (!data || !Array.isArray(data.corridors)) return [];
        return data.corridors.map((corridor, index) => ({
            id: String(corridor.id || corridor.name || `C${index + 1}`),
            name: String(corridor.name || corridor.id || `Corridor ${index + 1}`),
            color: corridor.color || palette[index % palette.length],
            status: corridor.status || "Active",
            lengthKm: Number.isFinite(Number(corridor.lengthKm)) ? Number(corridor.lengthKm) : null,
            note: String(corridor.note || ""),
            paths: Array.isArray(corridor.paths) ? corridor.paths : []
        }));
    }

    function normalizeAssetTypes(data) {
        if (!data || !Array.isArray(data.assetTypes)) return [];
        return data.assetTypes.map((type, index) => ({
            id: String(type.id || type.label || `Type ${index + 1}`),
            short: String(type.short || type.id || "RSS").slice(0, 4),
            label: String(type.label || type.id || "RSS component"),
            color: type.color || palette[index % palette.length]
        }));
    }

    function normalizeAssets(data) {
        if (!data) return [];

        if (Array.isArray(data.installations)) {
            return data.installations
                .map((asset, index) => ({
                    id: String(asset.id || `RSS-${index + 1}`),
                    corridor: String(asset.corridor || asset.Corridor || "KEE"),
                    type: String(asset.type || asset.Asset || "RSS"),
                    site: String(asset.site || asset.Site || asset.name || "Roadside site"),
                    lat: Number(asset.lat),
                    lon: Number(asset.lon),
                    km: Number.isFinite(Number(asset.km)) ? Number(asset.km) : null,
                    status: String(asset.status || asset.Status || "Planned"),
                    phase: String(asset.phase || asset.Phase || "-"),
                    priority: String(asset.priority || asset.Priority || "Normal"),
                    purpose: String(asset.purpose || asset.Purpose || "-"),
                    power: String(asset.power || asset.Power || "-"),
                    comms: String(asset.comms || asset.Comms || "-"),
                    dependency: String(asset.dependency || asset.Dependency || "-")
                }))
                .filter((asset) => Number.isFinite(asset.lat) && Number.isFinite(asset.lon));
        }

        if (Array.isArray(data.features)) {
            return data.features
                .map((feature, index) => {
                    const props = feature.properties || {};
                    const coords = feature.geometry?.coordinates || [];
                    return {
                        id: String(props.ID || props.id || `RSS-${index + 1}`),
                        corridor: String(props.Corridor || props.corridor || "KEE"),
                        type: String(props.Asset || props.type || "RSS"),
                        site: String(props.Site || props.site || props.name || "Roadside site"),
                        lat: Number(coords[1]),
                        lon: Number(coords[0]),
                        km: Number.isFinite(Number(props.Km || props.km)) ? Number(props.Km || props.km) : null,
                        status: String(props.Status || props.status || "Planned"),
                        phase: String(props.Phase || props.phase || "-"),
                        priority: String(props.Priority || props.priority || "Normal"),
                        purpose: String(props.Purpose || props.purpose || "-"),
                        power: String(props.Power || props.power || "-"),
                        comms: String(props.Comms || props.comms || "-"),
                        dependency: String(props.Dependency || props.dependency || "-")
                    };
                })
                .filter((asset) => Number.isFinite(asset.lat) && Number.isFinite(asset.lon));
        }

        return [];
    }

    function setupMap() {
        const mapElement = $("#unifiedMap");
        if (!mapElement || typeof L === "undefined") return;

        state.map = L.map(mapElement, {
            zoomControl: false,
            preferCanvas: true
        }).setView([0.313, 32.53], 11);

        L.control.zoom({ position: "topright" }).addTo(state.map);

        L.tileLayer("https://mt1.google.com/vt/lyrs=y&x={x}&y={y}&z={z}", {
            attribution: "&copy; Google",
            maxZoom: 20
        }).addTo(state.map);

        state.nationalLayer = L.layerGroup().addTo(state.map);
        state.routeLayer = L.layerGroup().addTo(state.map);
        state.markerLayer = L.layerGroup().addTo(state.map);

        drawRoutes();
        populateMapControls();
        bindMapControls();
        renderComponentChips();
        applyMapFilters();
        // Draw the Uganda national network immediately, but frame the actual RSS scope.
        drawActualNetwork().then(() => { if (state.map) { state.map.invalidateSize(); fitMapToProject(); } });
        fitMapToProject();

        // Keep the map filling its container: recompute size once the layout settles,
        // when fonts/layout finish, and on any viewport resize (prevents cut-off tiles).
        const refresh = () => { if (state.map) { state.map.invalidateSize(); fitMapToProject(); } };
        [150, 400, 900].forEach((ms) => setTimeout(refresh, ms));
        window.addEventListener("load", refresh);
        window.addEventListener("resize", () => {
            if (!state.map) return;
            clearTimeout(state.resizeTimer);
            state.resizeTimer = setTimeout(() => state.map.invalidateSize(), 150);
        });
    }

    // Highlight the project scope (the 77 authoritative links, scope=1 in the
    // network2026 layer): expressway teal, Northern Bypass blue, Entebbe dual orange.
    function scopeColor(road) {
        const r = String(road || "");
        if (r.startsWith("M20")) return "#c084fc";     // Kampala Northern Bypass - violet
        if (r.startsWith("A003N2")) return "#fb7185";   // Entebbe dual carriageway - rose
        if (r.startsWith("M3")) return "#34d399";       // Kampala-Entebbe Expressway - emerald
        return "#34d399";
    }

    // Colour the base national road network by surface type (network2026).
    function surfaceColor(surf) {
        const v = String(surf || "").toLowerCase();
        if (v.startsWith("bitumin")) return "#0a0a0a";  // paved - bold black
        if (v.startsWith("unseal")) return "#f59e0b";   // unpaved - orange/gold
        return "#94a3b8";
    }
    const SCOPE_MAINLINES = new Set(["M20", "M20N1", "M3_Link01", "M3N1_Link01", "A003N2_Link01"]);

    function drawRoutes() {
        if (!state.routeLayer) return;
        const net = actualNetworkData || window.ACTUAL_NETWORK;
        const scope = net && Array.isArray(net.features) ? net.features.filter((f) => f.properties && f.properties.scope) : [];
        if (!scope.length) { drawDeclaredCorridorPaths(); return; }

        // soft glow under the scope corridors
        L.geoJSON(scope, {
            style: (f) => ({ color: scopeColor(f.properties.road), weight: 12, opacity: 0.13, lineCap: "round", lineJoin: "round" })
        }).addTo(state.routeLayer);
        // highlighted scope: mainlines bold, interchange slip roads thinner
        const layer = L.geoJSON(scope, {
            style: (f) => ({
                color: scopeColor(f.properties.road),
                weight: SCOPE_MAINLINES.has(String(f.properties.lid)) ? 5 : 2.4,
                opacity: 0.95, lineCap: "round", lineJoin: "round"
            }),
            onEachFeature: (f, lyr) => {
                lyr.on("click", (e) => { selectRoad(f.properties || {}, e.latlng); });
            }
        }).addTo(state.routeLayer);
        state.scopeBounds = layer.getBounds();
    }

    // Plot the actual FY25-26 national road network (authoritative GIS geometry) as a
    // muted context layer beneath the project corridors and RSS components.
    async function drawActualNetwork() {
        const network = await loadActualNetworkData();
        if (state.nationalNetworkDrawn || !network || !Array.isArray(network.features) || !state.nationalLayer) return false;
        const renderer = L.canvas({ padding: 0.25 });
        // Draw only the non-scope national roads as muted context; the project scope
        // is highlighted separately (drawRoutes) so it is never double-drawn.
        const context = { type: "FeatureCollection", features: network.features.filter((f) => !(f.properties && f.properties.scope)) };
        const layer = L.geoJSON(context, {
            renderer,
            style: (f) => {
                const bit = String((f.properties && f.properties.surf) || "").toLowerCase().startsWith("bitumin");
                return { color: surfaceColor(f.properties && f.properties.surf), weight: bit ? 3.4 : 1.2, opacity: bit ? 0.98 : 0.72, lineCap: "round", lineJoin: "round" };
            },
            onEachFeature: (feature, roadLayer) => {
                roadLayer.on("click", (e) => { selectRoad(feature.properties || {}, e.latlng); });
            }
        }).addTo(state.nationalLayer);
        state.nationalBounds = layer.getBounds();
        state.nationalNetworkDrawn = true;
        if (layer.bringToBack) layer.bringToBack();
        return true;
    }

    async function loadActualNetworkData() {
        if (actualNetworkData && Array.isArray(actualNetworkData.features)) return actualNetworkData;
        if (window.ACTUAL_NETWORK && Array.isArray(window.ACTUAL_NETWORK.features)) {
            actualNetworkData = window.ACTUAL_NETWORK;
            return actualNetworkData;
        }
        if (typeof fetch !== "function") return null;

        try {
            const response = await fetch(actualNetworkSource, { cache: "force-cache" });
            if (!response.ok) return null;
            const text = await response.text();
            const marker = "window.ACTUAL_NETWORK = ";
            const start = text.indexOf(marker);
            if (start === -1) return null;
            let payload = text.slice(start + marker.length).trim();
            if (payload.endsWith(";")) payload = payload.slice(0, -1);
            actualNetworkData = JSON.parse(payload);
            window.ACTUAL_NETWORK = actualNetworkData;
            return actualNetworkData;
        } catch (error) {
            console.warn("Actual FY25-26 road network could not be loaded", error);
            return null;
        }
    }

    function scheduleActualNetwork() {
        if (state.nationalNetworkQueued || state.nationalNetworkDrawn) return;
        state.nationalNetworkQueued = true;
        const render = () => {
            state.nationalNetworkQueued = false;
            drawActualNetwork();
        };
        if ("requestIdleCallback" in window) {
            window.requestIdleCallback(render, { timeout: 1800 });
        } else {
            setTimeout(render, 650);
        }
    }

    function drawDeclaredCorridorPaths() {
        state.corridors.forEach((corridor) => {
            corridor.paths.forEach((path) => {
                const latLngs = (path.coordinates || [])
                    .map((point) => [Number(point[0]), Number(point[1])])
                    .filter((point) => Number.isFinite(point[0]) && Number.isFinite(point[1]));

                if (latLngs.length < 2) return;

                L.polyline(latLngs, {
                    color: corridor.color || "#34d399",
                    weight: 10,
                    opacity: 0.14,
                    lineCap: "round",
                    lineJoin: "round"
                }).addTo(state.routeLayer);

                L.polyline(latLngs, {
                    color: corridor.color || "#34d399",
                    weight: 4,
                    opacity: 0.92,
                    lineCap: "round",
                    lineJoin: "round"
                }).addTo(state.routeLayer);
            });
        });
    }

    function routeColor(name = "") {
        const text = String(name).toLowerCase();
        if (text.includes("entebbe")) return "#22d3ee";
        if (text.includes("bypass")) return "#a78bfa";
        if (text.includes("munyonyo")) return "#34d399";
        return "#fbbf24";
    }

    function populateMapControls() {
        populateSelect($("#mapCorridorFilter"), unique(state.assets.map((asset) => asset.corridor)), "All corridors");
        populateSelect($("#mapTypeFilter"), unique(state.assets.map((asset) => asset.type)), "All components");
        populateSelect($("#mapStatusFilter"), unique(state.assets.map((asset) => asset.status)), "All statuses");
        populateSelect($("#mapPriorityFilter"), unique(state.assets.map((asset) => asset.priority)), "All priorities");
    }

    function populateSelect(select, values, allLabel) {
        if (!select) return;
        select.innerHTML = `<option value="All">${allLabel}</option>`;
        values.forEach((value) => {
            const option = document.createElement("option");
            option.value = value;
            option.textContent = value;
            select.appendChild(option);
        });
    }

    function bindMapControls() {
        ["mapCorridorFilter", "mapTypeFilter", "mapStatusFilter", "mapPriorityFilter", "mapSearchInput"].forEach((id) => {
            $(`#${id}`)?.addEventListener("input", applyMapFilters);
            $(`#${id}`)?.addEventListener("change", applyMapFilters);
        });

        $("#mapResetBtn")?.addEventListener("click", () => {
            ["mapCorridorFilter", "mapTypeFilter", "mapStatusFilter", "mapPriorityFilter"].forEach((id) => {
                const el = $(`#${id}`);
                if (el) el.value = "All";
            });
            const search = $("#mapSearchInput");
            if (search) search.value = "";
            stopMapTour();
            applyMapFilters();
        });

        $("#mapFitBtn")?.addEventListener("click", fitMapToProject);
        $("#mapTourBtn")?.addEventListener("click", toggleMapTour);
        $("#mapFullscreenBtn")?.addEventListener("click", toggleMapFullscreen);
        document.addEventListener("fullscreenchange", syncMapFullscreenState);
        document.addEventListener("keydown", (event) => {
            if (event.key === "Escape" && document.body.classList.contains("map-fullscreen-active") && !document.fullscreenElement) {
                document.body.classList.remove("map-fullscreen-active");
                syncMapFullscreenState();
            }
        });
        $("#assetTableTopBtn")?.addEventListener("click", () => $(".asset-table-wrap")?.scrollTo({ top: 0, behavior: "smooth" }));
    }

    async function toggleMapFullscreen() {
        const stage = $(".map-stage");
        if (!stage) return;

        const isActive = document.fullscreenElement === stage || document.body.classList.contains("map-fullscreen-active");
        if (isActive) {
            if (document.fullscreenElement && document.exitFullscreen) {
                await document.exitFullscreen().catch(() => {});
            }
            document.body.classList.remove("map-fullscreen-active");
            syncMapFullscreenState();
            return;
        }

        if (stage.requestFullscreen) {
            await stage.requestFullscreen().catch(() => {
                document.body.classList.add("map-fullscreen-active");
            });
        } else {
            document.body.classList.add("map-fullscreen-active");
        }
        syncMapFullscreenState();
    }

    function syncMapFullscreenState() {
        const stage = $(".map-stage");
        const button = $("#mapFullscreenBtn");
        const active = Boolean(stage && (document.fullscreenElement === stage || document.body.classList.contains("map-fullscreen-active")));

        if (button) {
            button.classList.toggle("active", active);
            button.setAttribute("aria-pressed", String(active));
            button.title = active ? "Exit fullscreen map view" : "View the map console fullscreen";
            button.innerHTML = active
                ? `<i class="fa-solid fa-down-left-and-up-right-to-center"></i><span>Exit</span>`
                : `<i class="fa-solid fa-up-right-and-down-left-from-center"></i><span>Fullscreen</span>`;
        }

        if (state.map) {
            setTimeout(() => {
                state.map.invalidateSize();
                fitMapToProject();
            }, 180);
        }
    }

    function renderComponentChips() {
        const rail = $("#componentChips");
        if (!rail) return;

        const counts = countBy(state.assets, "type");
        const types = unique(state.assets.map((asset) => asset.type));
        rail.innerHTML = "";

        const allChip = createChip("All", state.assets.length, "#f2f1ec", true);
        allChip.addEventListener("click", () => {
            $("#mapTypeFilter").value = "All";
            applyMapFilters();
        });
        rail.appendChild(allChip);

        types.forEach((type) => {
            const chip = createChip(type, counts[type] || 0, getTypeColor(type));
            chip.addEventListener("click", () => {
                $("#mapTypeFilter").value = type;
                applyMapFilters();
            });
            rail.appendChild(chip);
        });
    }

    function createChip(label, count, color, active = false) {
        const chip = document.createElement("button");
        chip.type = "button";
        chip.className = `chip${active ? " active" : ""}`;
        chip.dataset.value = label;
        chip.innerHTML = `<span class="dot" style="color:${color}"></span><span>${escapeHtml(label)}</span><strong>${count}</strong>`;
        return chip;
    }

    function applyMapFilters() {
        if (!state.assets.length) {
            renderEmptyMap();
            return;
        }

        const corridor = $("#mapCorridorFilter")?.value || "All";
        const type = $("#mapTypeFilter")?.value || "All";
        const status = $("#mapStatusFilter")?.value || "All";
        const priority = $("#mapPriorityFilter")?.value || "All";
        const term = ($("#mapSearchInput")?.value || "").trim().toLowerCase();

        state.filteredAssets = state.assets.filter((asset) => {
            const text = `${asset.id} ${asset.site} ${asset.type} ${asset.status} ${asset.priority} ${asset.purpose} ${asset.corridor}`.toLowerCase();
            return (corridor === "All" || asset.corridor === corridor)
                && (type === "All" || asset.type === type)
                && (status === "All" || asset.status === status)
                && (priority === "All" || asset.priority === priority)
                && (!term || text.includes(term));
        });

        updateComponentChipState(type);
        renderMapMetrics();
        renderMarkers();
        renderAssetTable();
        renderStatusBars();
        renderLegend();
        if (state.map && state.filteredAssets.length) {
            setTimeout(fitMapToAssets, 80);
        }
    }

    function updateComponentChipState(type) {
        $$("#componentChips .chip").forEach((chip) => chip.classList.toggle("active", chip.dataset.value === type));
    }

    function renderEmptyMap() {
        $("#mapAssetTable").innerHTML = "";
        $("#statusBars").innerHTML = "";
        $("#mapResultCount").textContent = "0";
    }

    function renderMapMetrics() {
        const assets = state.filteredAssets;
        const critical = assets.filter((asset) => asset.priority.toLowerCase().includes("critical")).length;
        const corridors = unique(assets.map((asset) => asset.corridor)).length;
        const maxKm = assets.reduce((max, asset) => Number.isFinite(asset.km) ? Math.max(max, asset.km) : max, 0);

        animateCount("#metricTotalAssets", assets.length);
        animateCount("#metricCriticalAssets", critical);
        animateCount("#metricCorridors", corridors);
        setText("#metricMaxKm", `${formatNumber(maxKm)} km`);
        setText("#mapResultCount", assets.length.toLocaleString());
    }

    function animateCount(selector, to) {
        const el = $(selector);
        if (!el) return;
        const setFinal = () => { el.textContent = Number(to).toLocaleString(); };
        const from = parseInt(String(el.textContent).replace(/[^\d]/g, ""), 10) || 0;
        if (from === to || typeof requestAnimationFrame !== "function") { setFinal(); return; }
        const start = performance.now();
        let done = false;
        const step = (now) => {
            const t = Math.min(1, ((now || start) - start) / 500);
            el.textContent = Math.round(from + (to - from) * (1 - Math.pow(1 - t, 3))).toLocaleString();
            if (t < 1) requestAnimationFrame(step); else { done = true; setFinal(); }
        };
        requestAnimationFrame(step);
        // Fallback: rAF is throttled in background/non-painting contexts; guarantee the value.
        setTimeout(() => { if (!done) setFinal(); }, 650);
    }

    function renderMarkers() {
        if (!state.markerLayer || !state.map) return;

        state.markerLayer.clearLayers();
        state.markers.clear();

        state.filteredAssets.forEach((asset) => {
            const marker = L.marker([asset.lat, asset.lon], {
                icon: createMarkerIcon(asset, asset.id === state.selectedAssetId),
                riseOnHover: true
            });

            marker.on("click", () => selectAsset(asset.id, true));
            marker.addTo(state.markerLayer);
            state.markers.set(asset.id, marker);
        });

        if (state.selectedAssetId && !state.markers.has(state.selectedAssetId)) {
            state.selectedAssetId = null;
            renderSelectedAsset(null);
        }
    }

    function createMarkerIcon(asset, selected = false) {
        const color = getTypeColor(asset.type);
        const short = escapeHtml(getTypeShort(asset.type));
        return L.divIcon({
            className: "asset-div-icon",
            html: `<div class="asset-marker${selected ? " selected" : ""}" style="--marker-color:${color};background:${color};">${short}</div>`,
            iconSize: selected ? [38, 38] : [32, 32],
            iconAnchor: selected ? [19, 19] : [16, 16]
        });
    }

    function refreshMarkerStyles() {
        state.markers.forEach((marker, id) => {
            const asset = state.filteredAssets.find((item) => item.id === id);
            if (asset) marker.setIcon(createMarkerIcon(asset, id === state.selectedAssetId));
        });
    }

    function renderAssetTable() {
        const tableBody = $("#mapAssetTable");
        if (!tableBody) return;

        tableBody.innerHTML = "";
        state.filteredAssets.forEach((asset) => {
            const row = document.createElement("tr");
            row.className = asset.id === state.selectedAssetId ? "active-row" : "";
            row.dataset.assetId = asset.id;
            row.innerHTML = `
                <td>${escapeHtml(asset.id)}</td>
                <td>${escapeHtml(asset.site)}<br><small>${escapeHtml(asset.type)} | ${escapeHtml(asset.corridor)}</small></td>
                <td><span class="status-badge" style="color:${getStatusColor(asset.status)}">${escapeHtml(asset.status)}</span></td>
            `;
            row.addEventListener("click", () => selectAsset(asset.id, true));
            tableBody.appendChild(row);
        });
    }

    function renderStatusBars() {
        const container = $("#statusBars");
        if (!container) return;

        const counts = countBy(state.filteredAssets, "status");
        const total = Math.max(state.filteredAssets.length, 1);

        container.innerHTML = Object.entries(counts)
            .sort((a, b) => b[1] - a[1])
            .map(([status, count]) => {
                const width = Math.round((count / total) * 100);
                return `
                    <div class="status-row">
                        <div class="status-row-top">
                            <span>${escapeHtml(status)}</span>
                            <strong>${count}</strong>
                        </div>
                        <div class="bar-track"><div class="bar-fill" style="width:${width}%;background:${getStatusColor(status)}"></div></div>
                    </div>
                `;
            }).join("");
    }

    function renderLegend() {
        const legend = $("#mapLegend");
        if (!legend) return;

        const types = unique(state.filteredAssets.map((asset) => asset.type));
        legend.innerHTML = types.map((type) => `
            <div class="legend-item">
                <span class="legend-swatch" style="background:${getTypeColor(type)}"></span>
                <span>${escapeHtml(type)}</span>
            </div>
        `).join("");
    }

    function selectAsset(assetId, fly = false) {
        const asset = state.assets.find((item) => item.id === assetId);
        if (!asset) return;

        state.selectedAssetId = asset.id;
        renderSelectedAsset(asset);
        refreshMarkerStyles();
        renderAssetTable();

        if (fly && state.map) state.map.flyTo([asset.lat, asset.lon], Math.max(state.map.getZoom(), 15), { duration: 0.85 });
    }

    function rssScopeLengthKm() {
        return Number(rssBudget?.scopeLengthKm) || 50;
    }

    const categoryMapTerms = {
        anpr: "ANPR",
        avc: "ATC",
        avids: "CCTV",
        barrier: "Toll",
        cctv: "CCTV",
        comms: "Comms",
        console: "TOC",
        network: "Cabinet",
        other: "RSS",
        payment: "Toll",
        power: "Cabinet",
        printer: "Toll",
        rfid: "Toll",
        scanner: "Toll",
        server: "TOC",
        services: "RSS",
        signal: "Toll",
        software: "TOC",
        vasd: "VASD",
        vms: "VMS",
        weather: "RWIS",
        wim: "WIM"
    };

    function assetLinkTerm(asset) {
        return String(asset?.type || asset?.site || "").trim();
    }

    function mapTermForCategory(category, fallback = "") {
        return categoryMapTerms[String(category || "").toLowerCase()] || fallback || "";
    }

    function mapTermForText(text) {
        const value = String(text || "").toLowerCase();
        if (/anpr|ocr|plate|number plate/.test(value)) return "ANPR";
        if (/rfid|dsrc|tag|toll|barrier|booth|fare|cash|lane/.test(value)) return "Toll";
        if (/avc|classifier|classification|axle|counter|loop/.test(value)) return "ATC";
        if (/cctv|camera|ptz|video|incident|surveillance/.test(value)) return "CCTV";
        if (/vms|message sign|variable message|display|sign/.test(value)) return "VMS";
        if (/vasd|speed display|radar speed|speed detection/.test(value)) return "VASD";
        if (/weather|rain|flood|rwis/.test(value)) return "RWIS";
        if (/fibre|fiber|switch|router|network|cabinet|ups|power/.test(value)) return "Cabinet";
        if (/toc|server|control|software|operator|console/.test(value)) return "TOC";
        if (/wim|weigh/.test(value)) return "WIM";
        return String(text || "").trim();
    }

    function openSpecsForTerm(term, category = "") {
        switchView("specs");
        if (category && typeof specState !== "undefined") {
            specState.category = category;
            specState.limit = SPEC_PAGE;
            renderSpecCategoryRail();
        }
        const search = $("#specsSearchInput");
        if (search) {
            search.value = term || "";
            search.dispatchEvent(new Event("input"));
        }
    }

    function openBOQForTerm(term) {
        switchView("boq");
        activateBOQPane("boq-register");
        const search = $("#componentSearchInput");
        if (search) {
            search.value = term || "";
            search.dispatchEvent(new Event("input"));
        }
    }

    function openDictionaryForTerm(term, category = "") {
        switchView("explorer");
        if (category && typeof dictState !== "undefined") {
            dictState.category = category;
            dictState.limit = DICT_PAGE;
            renderDictCategoryRail();
        }
        const search = $("#mediaSearchInput");
        if (search) {
            search.value = term || "";
            search.dispatchEvent(new Event("input"));
        }
    }

    function openMapForTerm(term) {
        switchView("map");
        const search = $("#mapSearchInput");
        const typeFilter = $("#mapTypeFilter");
        const cleanTerm = String(term || "").trim();
        if (typeFilter) {
            const exact = Array.from(typeFilter.options).find((opt) => opt.value.toLowerCase() === cleanTerm.toLowerCase());
            typeFilter.value = exact ? exact.value : "All";
        }
        if (search) search.value = typeFilter?.value === "All" ? cleanTerm : "";
        applyMapFilters();
        setTimeout(fitMapToAssets, 90);
    }

    const TYPE_BUDGET_CATEGORY = {
        ANPR: "Weigh-in-Motion: 3 sites with ANPR",
        AVIDS: "PTZ / TMCS traffic monitoring with AI-ML analytics",
        CCTV: "PTZ / TMCS traffic monitoring with AI-ML analytics",
        Comms: "Site backhaul drops (existing fibre backbone - backbone NOT priced)",
        ECB: "Central database, automated analytics & dissemination",
        RSU: "PTZ / TMCS traffic monitoring with AI-ML analytics",
        RWIS: "Weather communication sensors",
        TOC: "Traffic Control Centre - Kajjansi Toll Plaza",
        VASD: "Variable Message Signs (fixed overhead carriageway display)",
        VMS: "Variable Message Signs (fixed overhead carriageway display)",
        WIM: "Weigh-in-Motion: 3 sites with ANPR"
    };

    const TYPE_BUDGET_PATTERNS = {
        ANPR: [/ANPR camera/i, /WIM-integrated/i],
        AVIDS: [/AI\/ML processing/i, /TMCS PTZ/i],
        CCTV: [/TMCS PTZ/i, /AI\/ML processing/i],
        Comms: [/Field-site fibre drop/i],
        ECB: [/stakeholder notification/i, /public information/i],
        RSU: [/Road Side Unit for TMCS/i, /Road Side Unit/i],
        RWIS: [/Geolocated weather communication/i],
        TOC: [/Central processing server/i, /Video wall/i],
        VASD: [/Fixed overhead VMS/i, /Variable Message/i],
        VMS: [/Fixed overhead VMS/i, /overhead VMS gantry/i, /full carriageway/i],
        WIM: [/High-Speed WIM/i, /Static\/low-speed WIM/i, /Enforcement weighbridge/i]
    };

    function fmtUgx(n) {
        return `${Number(n || 0).toLocaleString("en-UG", { maximumFractionDigits: 0 })} UGX`;
    }

    function budgetCategoryByName(name) {
        return (rssBudget?.categories || []).find((category) => category.category === name) || null;
    }

    function budgetItemForType(type, category) {
        const patterns = TYPE_BUDGET_PATTERNS[type] || [];
        return (category?.items || []).find((item) => patterns.some((pattern) => pattern.test(item.item))) || null;
    }

    function assetTypesForBudgetCategory(categoryName) {
        return Object.entries(TYPE_BUDGET_CATEGORY)
            .filter(([, mapped]) => mapped === categoryName)
            .map(([type]) => type);
    }

    function assetBudgetInfo(asset) {
        const type = String(asset?.type || "");
        const categoryName = TYPE_BUDGET_CATEGORY[type] || "";
        const category = budgetCategoryByName(categoryName);
        if (!category) {
            return {
                categoryName: "RSS package",
                planningUnitUgx: 0,
                categoryTotalUgx: 0,
                source: rssBudget?.sourceWorkbook || "BOQ entailing tendered rates for TTRS .xlsx"
            };
        }
        const item = budgetItemForType(type, category);
        const relatedTypes = assetTypesForBudgetCategory(categoryName);
        const relatedAssetCount = state.assets.filter((entry) => relatedTypes.includes(entry.type)).length || 1;
        return {
            categoryName,
            itemName: item?.item || "Category average allocation",
            itemRateUgx: Number(item?.rate_ugx) || 0,
            planningUnitUgx: Math.round(Number(category.subtotal_ugx || 0) / relatedAssetCount),
            categoryTotalUgx: Number(category.subtotal_ugx || 0),
            source: rssBudget?.sourceWorkbook || "BOQ entailing tendered rates for TTRS .xlsx"
        };
    }

    function dictionaryCategoryForAsset(asset) {
        const type = String(asset?.type || "").toUpperCase();
        return ({
            ANPR: "anpr",
            AVIDS: "avids",
            CCTV: "cctv",
            Comms: "network",
            ECB: "comms",
            RSU: "power",
            RWIS: "weather",
            TOC: "server",
            VASD: "vasd",
            VMS: "vms",
            WIM: "wim"
        })[type] || "other";
    }

    function detailMediaHTML(assetOrDefinition, className = "") {
        const definition = {
            name: assetOrDefinition?.name || `${assetOrDefinition?.type || ""} ${assetOrDefinition?.site || ""}`,
            definition: assetOrDefinition?.definition || assetOrDefinition?.purpose || "",
            category: assetOrDefinition?.category || dictionaryCategoryForAsset(assetOrDefinition)
        };
        const image = dictionaryImageFor(definition);
        return `
            <figure class="detail-media ${escapeAttr(className)}">
                <img src="${escapeAttr(image.url)}" alt="${escapeAttr(image.alt)}" loading="lazy" decoding="async" referrerpolicy="no-referrer">
                <figcaption>${escapeHtml(image.caption)} <span>Wikimedia Commons</span></figcaption>
            </figure>
        `;
    }

    function bindDetailMediaFallback(panel) {
        panel?.querySelectorAll(".detail-media img").forEach((img) => img.addEventListener("error", () => {
            img.closest(".detail-media")?.classList.add("image-missing");
        }, { once: true }));
    }

    const ROAD_CLASS_LABEL = { M: "Motorway (M)", A: "National A", B: "National B", C: "Community C" };

    // Show a clicked road link's details in the right-hand pane (no popup).
    function selectRoad(props, latlng) {
        const panel = $("#mapDetailPanel");
        if (!panel) return;
        state.selectedAssetId = null;
        refreshMarkerStyles();
        renderAssetTable();
        const p = props || {};
        setText("#selectedAssetTitle", p.name || p.lid || "Road link");
        const pill = $("#selectedAssetStatus");
        if (pill) {
            pill.textContent = p.scope ? "Project scope" : "National road";
            pill.style.color = p.scope ? "#34d399" : "#7dd3fc";
        }
        const scopeKm = rssScopeLengthKm();
        const costPerKm = scopeKm && rssBudget?.grandTotalUgx ? Math.round(Number(rssBudget.grandTotalUgx) / scopeKm) : 0;
        const media = detailMediaHTML({
            name: `${p.scope ? "RSS project scope" : "Uganda national road network"} ${p.name || ""}`,
            definition: `${p.surf || ""} ${p.road || ""} road surveillance corridor`,
            category: p.scope ? "network" : "services"
        });
        panel.className = "asset-detail";
        panel.innerHTML = `
            ${media}
            <div class="detail-grid">
                <span>Road No</span><strong>${escapeHtml(p.road || "-")}</strong>
                <span>Link ID</span><strong>${escapeHtml(p.lid || "-")}</strong>
                <span>Class</span><strong>${escapeHtml(ROAD_CLASS_LABEL[p.cls] || p.cls || "-")}</strong>
                <span>Surface</span><strong>${escapeHtml(p.surf || "-")}</strong>
                <span>In RSS scope</span><strong>${p.scope ? "Yes - KNBP/KEE/EDC project corridor" : "No - national context layer"}</strong>
                <span>X (Longitude)</span><strong>${latlng ? latlng.lng.toFixed(6) : "-"}</strong>
                <span>Y (Latitude)</span><strong>${latlng ? latlng.lat.toFixed(6) : "-"}</strong>
                <span>RSS cost/km</span><strong>${costPerKm ? fmtUgx(costPerKm) : "-"}</strong>
                <span>Budget reference</span><strong>${p.scope ? "RSS CAPEX package applies by component placement" : "No RSS pricing allocated to context roads"}</strong>
            </div>
            <p class="detail-note">${escapeHtml(rssBudget?.scope || "KNBP, KEE and Entebbe Airport Dual RSS components only")}</p>`;
        bindDetailMediaFallback(panel);
    }

    function renderSelectedAsset(asset) {
        const panel = $("#mapDetailPanel");
        if (!panel) return;

        if (!asset) {
            panel.className = "asset-detail empty-state";
            panel.innerHTML = `
                <i class="fa-solid fa-location-crosshairs"></i>
                <h4>No asset selected</h4>
                <p>Choose any installation point from the map or table.</p>
            `;
            setText("#selectedAssetTitle", "Operations focus");
            setText("#selectedAssetStatus", "Ready");
            return;
        }

        panel.className = "asset-detail";
        setText("#selectedAssetTitle", asset.site);
        const statusPill = $("#selectedAssetStatus");
        if (statusPill) {
            statusPill.textContent = asset.status;
            statusPill.style.color = getStatusColor(asset.status);
        }

        const budget = assetBudgetInfo(asset);
        const media = detailMediaHTML(asset);
        panel.innerHTML = `
            ${media}
            <div class="detail-grid">
                <span>ID</span><strong>${escapeHtml(asset.id)}</strong>
                <span>Component</span><strong>${escapeHtml(asset.type)}</strong>
                <span>Corridor</span><strong>${escapeHtml(asset.corridor)}</strong>
                <span>Chainage</span><strong>${asset.km === null ? "-" : `${formatNumber(asset.km)} km`}</strong>
                <span>X (Longitude)</span><strong>${Number(asset.lon).toFixed(6)}</strong>
                <span>Y (Latitude)</span><strong>${Number(asset.lat).toFixed(6)}</strong>
                <span>Budget category</span><strong>${escapeHtml(budget.categoryName)}</strong>
                <span>Primary BOQ line</span><strong>${escapeHtml(budget.itemName || "-")}</strong>
                <span>Line rate</span><strong>${budget.itemRateUgx ? fmtUgx(budget.itemRateUgx) : "-"}</strong>
                <span>Planning allocation</span><strong>${budget.planningUnitUgx ? fmtUgx(budget.planningUnitUgx) : "-"}</strong>
                <span>Category total</span><strong>${budget.categoryTotalUgx ? fmtUgx(budget.categoryTotalUgx) : "-"}</strong>
                <span>Rate source</span><strong>${escapeHtml(budget.source)}</strong>
                <span>Priority</span><strong>${escapeHtml(asset.priority)}</strong>
                <span>Power</span><strong>${escapeHtml(asset.power)}</strong>
                <span>Comms</span><strong>${escapeHtml(asset.comms)}</strong>
                <span>Dependency</span><strong>${escapeHtml(asset.dependency)}</strong>
                <span>Purpose</span><strong>${escapeHtml(asset.purpose)}</strong>
            </div>
            <p class="detail-note">All pricing is drawn from the RSS budget model built from the TTRS tender-rate workbook and the rebuilt RSS specification.</p>
            <div class="detail-actions triple">
                <button class="btn-analyze" type="button" id="selectedReadSpecBtn"><i class="fa-solid fa-table-list"></i> Specs</button>
                <button class="btn-analyze" type="button" id="selectedBOQBtn"><i class="fa-solid fa-file-invoice-dollar"></i> BOQ</button>
                <button class="btn-analyze" type="button" id="selectedDictBtn"><i class="fa-solid fa-book"></i> Dictionary</button>
            </div>
        `;
        bindDetailMediaFallback(panel);

        $("#selectedReadSpecBtn")?.addEventListener("click", () => {
            openSpecsForTerm(assetLinkTerm(asset));
        });

        $("#selectedBOQBtn")?.addEventListener("click", () => {
            openBOQForTerm(assetLinkTerm(asset));
        });

        $("#selectedDictBtn")?.addEventListener("click", () => {
            openDictionaryForTerm(assetLinkTerm(asset));
        });
    }

    function fitMapToAssets() {
        if (!state.map || !state.filteredAssets.length) return;
        const bounds = L.latLngBounds(state.filteredAssets.map((asset) => [asset.lat, asset.lon]));
        state.map.fitBounds(bounds, { padding: [42, 42], maxZoom: 14 });
    }

    // Full project extent = corridor route geometry + declared corridor paths + all assets.
    // Default/home view: frame the entire national road network (falls back to the
    // project scope until the network layer has drawn).
    function fitMapToNetwork() {
        if (!state.map) return;
        const b = (state.nationalBounds && state.nationalBounds.isValid()) ? state.nationalBounds
            : ((state.scopeBounds && state.scopeBounds.isValid()) ? state.scopeBounds
            : (state.projectBounds = state.projectBounds || computeProjectBounds()));
        if (b && b.isValid()) state.map.fitBounds(b, { padding: [16, 16], animate: false });
        else fitMapToAssets();
    }

    function fitMapToProject() {
        if (!state.map) return;
        if (!state.projectBounds) state.projectBounds = computeProjectBounds();
        // Prefer the highlighted scope extent when available; fall back to asset/corridor bounds.
        const b = (state.scopeBounds && state.scopeBounds.isValid()) ? state.scopeBounds : state.projectBounds;
        if (b && b.isValid()) {
            // animate:false forces setView, which always applies; animated fitBounds /
            // flyToBounds silently no-op on the large national<->corridor zoom deltas here.
            state.map.fitBounds(b, { padding: [40, 40], animate: false });
        } else {
            fitMapToAssets();
        }
    }

    // Frame the project scope from the RSS components plus the declared corridor
    // centrelines. The raw road_network geometry is intentionally excluded: those
    // national road numbers run far beyond the project and would over-zoom the map.
    function computeProjectBounds() {
        const pts = [];
        state.assets.forEach((asset) => {
            if (Number.isFinite(asset.lat) && Number.isFinite(asset.lon)) pts.push([asset.lat, asset.lon]);
        });
        state.corridors.forEach((corridor) => (corridor.paths || []).forEach((path) => (path.coordinates || []).forEach((point) => {
            const lat = Number(point[0]);
            const lon = Number(point[1]);
            if (Number.isFinite(lat) && Number.isFinite(lon)) pts.push([lat, lon]);
        })));
        return pts.length ? L.latLngBounds(pts) : null;
    }

    function toggleMapTour() {
        if (state.tourTimer) {
            stopMapTour();
            return;
        }

        const button = $("#mapTourBtn");
        button?.classList.add("active");
        if (button) button.innerHTML = `<i class="fa-solid fa-pause"></i><span>Pause</span>`;
        state.tourIndex = 0;
        stepMapTour();
        state.tourTimer = setInterval(stepMapTour, 2800);
    }

    function stepMapTour() {
        if (!state.filteredAssets.length) return;
        const asset = state.filteredAssets[state.tourIndex % state.filteredAssets.length];
        state.tourIndex += 1;
        selectAsset(asset.id, true);
    }

    function stopMapTour() {
        if (state.tourTimer) clearInterval(state.tourTimer);
        state.tourTimer = null;
        const button = $("#mapTourBtn");
        button?.classList.remove("active");
        if (button) button.innerHTML = `<i class="fa-solid fa-play"></i><span>Tour</span>`;
    }

    // ---- Specs: massive wide component specification table ----
    const SPEC_PAGE = 100;
    const specState = { term: "", category: "All", limit: SPEC_PAGE };

    function setupSpecs() {
        renderSpecCategoryRail();
        renderSpecMasterTable();
        $("#specsSearchInput")?.addEventListener("input", () => { specState.limit = SPEC_PAGE; renderSpecMasterTable(); });
        $("#specLoadMore")?.addEventListener("click", () => { specState.limit += SPEC_PAGE; renderSpecMasterTable(); });
    }

    function specFiltered() {
        const term = specState.term.trim().toLowerCase();
        return dictionaryData.filter((c) => {
            if (specState.category !== "All" && c.category !== specState.category) return false;
            if (!term) return true;
            return `${c.code} ${c.name} ${c.description} ${c.make} ${c.subsystem} ${c.location} ${c.source}`.toLowerCase().includes(term);
        });
    }

    function renderSpecCategoryRail() {
        const rail = $("#specCategoryRail");
        if (!rail) return;
        const chips = [{ key: "All", label: "All", count: dictionaryData.length }].concat(dictionaryCategories);
        rail.innerHTML = chips.map((c) => `
            <button class="dict-chip${c.key === specState.category ? " active" : ""}" type="button" data-cat="${escapeAttr(c.key)}">
                <span>${escapeHtml(c.label)}</span><strong>${c.count.toLocaleString()}</strong>
            </button>`).join("");
        $$("#specCategoryRail .dict-chip").forEach((chip) => chip.addEventListener("click", () => {
            specState.category = chip.dataset.cat;
            specState.limit = SPEC_PAGE;
            $$("#specCategoryRail .dict-chip").forEach((c) => c.classList.toggle("active", c === chip));
            renderSpecMasterTable();
        }));
    }

    function renderSpecMasterTable() {
        const body = $("#specsTableBody");
        if (!body) return;
        specState.term = $("#specsSearchInput")?.value || "";
        const all = specFiltered();
        const shown = all.slice(0, specState.limit);
        const term = specState.term.trim();
        setText("#specCountNote", `${dictionaryData.length.toLocaleString()} components - showing ${shown.length.toLocaleString()} of ${all.length.toLocaleString()}`);

        if (!all.length) {
            body.innerHTML = `<tr><td colspan="12"><div class="empty-state compact"><i class="fa-solid fa-magnifying-glass"></i><h4>No components</h4><p>Try another search or element type.</p></div></td></tr>`;
        } else {
            body.innerHTML = shown.map((c, i) => `
                <tr>
                    <td class="col-idx">${i + 1}</td>
                    <td>${escapeHtml(c.code || "-")}</td>
                    <td class="col-name">${highlightText(c.name, term)}</td>
                    <td><span class="cat-tag">${escapeHtml(catLabel(c.category))}</span></td>
                    <td class="col-desc">${highlightText(c.description || c.name, term)}</td>
                    <td>${highlightText(c.make || "-", term)}</td>
                    <td class="num">${escapeHtml(c.qty || "-")}</td>
                    <td>${escapeHtml(c.unit || "-")}</td>
                    <td>${escapeHtml(c.subsystem || "-")}</td>
                    <td>${escapeHtml(c.location || "-")}</td>
                    <td>${escapeHtml(c.source || "-")}</td>
                    <td class="link-cell">
                        <button class="mini-link" type="button" data-spec-link="map" data-term="${escapeAttr(mapTermForCategory(c.category, c.name))}" title="Filter map"><i class="fa-solid fa-map-location-dot"></i></button>
                        <button class="mini-link" type="button" data-spec-link="boq" data-term="${escapeAttr(mapTermForCategory(c.category, c.name))}" title="Find BOQ rows"><i class="fa-solid fa-file-invoice-dollar"></i></button>
                        <button class="mini-link" type="button" data-spec-link="dict" data-term="${escapeAttr(c.name)}" data-cat="${escapeAttr(c.category)}" title="Open dictionary"><i class="fa-solid fa-book"></i></button>
                    </td>
                </tr>`).join("");

            $$("#specsTableBody .mini-link").forEach((button) => {
                button.addEventListener("click", (event) => {
                    event.stopPropagation();
                    const action = button.dataset.specLink;
                    if (action === "map") openMapForTerm(button.dataset.term);
                    if (action === "boq") openBOQForTerm(button.dataset.term);
                    if (action === "dict") openDictionaryForTerm(button.dataset.term, button.dataset.cat);
                });
            });
        }
        const more = $("#specLoadMore");
        if (more) more.style.display = all.length > specState.limit ? "inline-flex" : "none";
    }

    function setupBOQ() {
        $$(".boq-sub-tab").forEach((tab) => {
            tab.addEventListener("click", () => {
                activateBOQPane(tab.dataset.target);
            });
        });
        renderBOQTable();
        renderTollComponentRegister();
        $("#componentSearchInput")?.addEventListener("input", renderTollComponentRegister);
    }

    function activateBOQPane(target = "boq-priced") {
        $$(".boq-sub-tab").forEach((tab) => tab.classList.toggle("active", tab.dataset.target === target));
        $$(".boq-content-pane").forEach((pane) => pane.classList.toggle("active", pane.id === target));
    }

    function renderSpecTopicChips() {
        const rail = $("#specTopicChips");
        if (!rail) return;
        const topics = ["RSS", "WIM", "ANPR", "CCTV", "VMS", "AVIDS", "RWIS", "Cybersecurity", "Testing"];
        rail.innerHTML = topics.map((topic) => `<button class="chip" type="button" data-topic="${topic}"><span>${topic}</span></button>`).join("");
        $$("#specTopicChips .chip").forEach((chip) => {
            chip.addEventListener("click", () => {
                const input = $("#specsSearchInput");
                if (!input) return;
                input.value = chip.dataset.topic;
                input.dispatchEvent(new Event("input"));
            });
        });
    }

    function renderSpecToc(flat) {
        const toc = $("#specsTocContainer");
        const term = ($("#specsSearchInput")?.value || "").trim().toLowerCase();
        if (!toc) return;

        const matches = flat.filter((item) => {
            if (!term) return true;
            const text = `${item.docName} ${item.searchText || ""}`.toLowerCase();
            return text.includes(term);
        });

        setText("#specSectionCount", matches.length.toLocaleString());

        if (!matches.length) {
            toc.innerHTML = `<div class="empty-state"><i class="fa-solid fa-magnifying-glass"></i><h4>No matches</h4><p>Try another term.</p></div>`;
            return;
        }

        const grouped = groupBy(matches, "docName");
        toc.innerHTML = "";

        Object.entries(grouped).forEach(([docName, sections]) => {
            const group = document.createElement("div");
            group.className = "doc-group";
            group.innerHTML = `<div class="doc-title"><i class="fa-solid fa-file-word"></i>${escapeHtml(cleanDocName(docName))}</div>`;
            const list = document.createElement("ul");
            list.className = "toc-list";

            sections.forEach((item) => {
                const li = document.createElement("li");
                li.className = `toc-item${item.id === state.selectedSpecId ? " active" : ""}`;
                li.textContent = item.title;
                li.title = item.title;
                li.addEventListener("click", () => renderSpecsContent(item));
                list.appendChild(li);
            });

            group.appendChild(list);
            toc.appendChild(group);
        });
    }

    function renderSpecsContent(item) {
        const content = $("#specsContent");
        const breadcrumb = $("#specsBreadcrumb");
        if (!content || !item) return;

        state.selectedSpecId = item.id;
        $$(".toc-item").forEach((el) => el.classList.toggle("active", el.textContent === item.title));

        if (breadcrumb) {
            breadcrumb.innerHTML = `${escapeHtml(cleanDocName(item.docName))} / <span>${escapeHtml(item.title)}</span>`;
        }

        const term = ($("#specsSearchInput")?.value || "").trim();
        const body = item.content.length
            ? item.content.map((block) => renderSpecBlock(block, term)).join("")
            : `<div class="empty-state"><i class="fa-solid fa-file-lines"></i><h4>Section placeholder</h4><p>No extracted paragraphs were available for this heading.</p></div>`;

        content.innerHTML = `<h2>${highlightText(item.title, term)}</h2>${body}`;
        content.scrollTo({ top: 0, behavior: "smooth" });
    }

    function buildSpecSearchText(title, content) {
        const parts = [String(title || "")];
        (content || []).forEach((block) => {
            if (typeof block === "string") {
                parts.push(block);
            } else if (block && block.type === "table" && Array.isArray(block.rows)) {
                block.rows.forEach((row) => parts.push(row.join(" ")));
            }
        });
        return parts.join(" ");
    }

    function renderSpecBlock(block, term) {
        if (typeof block === "string") return `<p>${highlightText(block, term)}</p>`;
        if (block && block.type === "table" && Array.isArray(block.rows)) return renderSpecTable(block.rows, term);
        return "";
    }

    function renderSpecTable(rows, term) {
        if (!rows.length) return "";
        const [head, ...body] = rows;
        const thead = `<thead><tr>${head.map((cell) => `<th>${highlightText(cell, term)}</th>`).join("")}</tr></thead>`;
        const tbody = body.length
            ? `<tbody>${body.map((row) => `<tr>${row.map((cell) => `<td>${highlightText(cell, term)}</td>`).join("")}</tr>`).join("")}</tbody>`
            : "";
        return `<div class="spec-table-wrap"><table class="spec-table">${thead}${tbody}</table></div>`;
    }

    function renderTollComponentRegister() {
        const tableBody = $("#componentTableBody");
        const summary = $("#componentSummaryGrid");
        if (!tableBody) return;

        const term = ($("#componentSearchInput")?.value || "").trim().toLowerCase();
        const rows = tollComponentData.filter((item) => {
            if (!term) return true;
            const text = [
                item.source,
                item.level,
                item.item,
                item.description,
                item.make,
                item.model,
                item.quantity,
                item.unit
            ].join(" ").toLowerCase();
            return text.includes(term);
        });

        if (summary) {
            const sources = unique(rows.map((item) => item.source || "Source")).length;
            const laneItems = rows.filter((item) => /lane|barrier|rfid|anpr|avc|booth|loop|photocell|fare|display/i.test(item.description || "")).length;
            const networkItems = rows.filter((item) => /switch|router|firewall|server|rack|ups|fibre|fiber|database|sql/i.test(`${item.description || ""} ${item.make || ""}`)).length;
            summary.innerHTML = `
                ${summaryCard("fa-list-check", "Register rows", rows.length.toLocaleString(), "Visible component items")}
                ${summaryCard("fa-layer-group", "Sources", sources.toLocaleString(), "BOQ extracts normalized")}
                ${summaryCard("fa-road-barrier", "Lane systems", laneItems.toLocaleString(), "Toll lane and booth equipment")}
                ${summaryCard("fa-network-wired", "ICT backbone", networkItems.toLocaleString(), "Servers, switches, UPS and network")}
            `;
        }

        if (!rows.length) {
            tableBody.innerHTML = `<tr><td colspan="7"><div class="empty-state compact"><i class="fa-solid fa-magnifying-glass"></i><h4>No components found</h4><p>Try another equipment, make or model.</p></div></td></tr>`;
            return;
        }

        tableBody.innerHTML = rows.map((item) => {
            const makeModel = [item.make, item.model].filter(Boolean).join(" / ");
            const linkTerm = item.description || item.item || makeModel || "";
            const mapTerm = mapTermForText(`${item.description || ""} ${makeModel}`);
            return `
                <tr>
                    <td>${escapeHtml(item.source || "-")}<br><small>${escapeHtml(item.level || "")}</small></td>
                    <td>${escapeHtml(item.item || "-")}</td>
                    <td>${highlightText(item.description || "-", term)}</td>
                    <td>${highlightText(makeModel || "-", term)}</td>
                    <td>${escapeHtml(item.quantity || "-")}</td>
                    <td>${escapeHtml(item.unit || "-")}</td>
                    <td class="link-cell">
                        <button class="mini-link" type="button" data-register-link="map" data-term="${escapeAttr(mapTerm)}" title="Filter map"><i class="fa-solid fa-map-location-dot"></i></button>
                        <button class="mini-link" type="button" data-register-link="specs" data-term="${escapeAttr(linkTerm)}" title="Open specs"><i class="fa-solid fa-table-list"></i></button>
                        <button class="mini-link" type="button" data-register-link="dict" data-term="${escapeAttr(linkTerm)}" title="Open dictionary"><i class="fa-solid fa-book"></i></button>
                    </td>
                </tr>
            `;
        }).join("");

        $$("#componentTableBody .mini-link").forEach((button) => {
            button.addEventListener("click", (event) => {
                event.stopPropagation();
                const action = button.dataset.registerLink;
                if (action === "map") openMapForTerm(button.dataset.term);
                if (action === "specs") openSpecsForTerm(button.dataset.term);
                if (action === "dict") openDictionaryForTerm(button.dataset.term);
            });
        });
    }

    // ---- Dictionary: catalogue of component definitions with internet images ----
    const DICT_PAGE = 80;
    const dictState = { term: "", category: "All", limit: DICT_PAGE };
    let dictDefs = null;
    let dictCatCounts = null;

    function commonsImage(fileName) {
        return `https://commons.wikimedia.org/wiki/Special:FilePath/${encodeURIComponent(fileName)}?width=900`;
    }

    const dictionaryImages = {
        anpr: { file: "ANPR Camera Front.jpg", alt: "ANPR camera with infrared illuminators", caption: "ANPR / OCR camera" },
        cctv: { file: "401 Traffic Cam.jpg", alt: "Traffic CCTV camera mounted above a highway", caption: "Traffic CCTV monitoring" },
        avids: { file: "Fixed traffic camera on Cornelius Pass at Wilkins - Hillsboro, Oregon.JPG", alt: "Fixed road traffic camera on a mast", caption: "Video incident detection camera" },
        vms: { file: "Variable Message Sign (VMS) on Eastbound M62 - geograph.org.uk - 4768167.jpg", alt: "Variable message sign on a motorway", caption: "Variable message sign" },
        rfid: { file: "E-ZPass Toll Plaza - Spaulding Turnpike.jpg", alt: "Electronic toll plaza lanes", caption: "Electronic toll collection plaza" },
        barrier: { file: "E-ZPass Toll Plaza - Spaulding Turnpike.jpg", alt: "Toll plaza barriers and lane signals", caption: "Lane barrier and toll approach" },
        payment: { file: "POS terminal at a bookstore.jpg", alt: "Point-of-sale payment terminal", caption: "Payment terminal / POS" },
        printer: { file: "Twitter receipt printer.jpg", alt: "Thermal receipt printer", caption: "Thermal receipt printing" },
        scanner: { file: "Barcode-scanner.jpg", alt: "Handheld barcode scanner", caption: "Scanner / document capture" },
        power: { file: "UPS Power Management Module, racks with network cabling in NERSC data center.jpg", alt: "UPS power module and network cabling in racks", caption: "UPS and power distribution" },
        network: { file: "19-inch rackmount Ethernet switches and patch panels.jpg", alt: "Rack-mounted Ethernet switches and patch panels", caption: "Network switch and patching" },
        server: { file: "Datacenter Server Racks (22370909788).jpg", alt: "Data center server racks", caption: "Server / back-office infrastructure" },
        software: { file: "Network server and technician.jpg", alt: "Technician checking a network server", caption: "Software and operations platform" },
        comms: { file: "Network server and technician.jpg", alt: "Technician working near network equipment", caption: "Communications node" },
        console: { file: "Clover Station with receipt printer and cash drawer.jpg", alt: "Operator-style point-of-sale console with printer and cash drawer", caption: "Operator console" },
        signal: { file: "UK traffic sign 6031.1.jpg", alt: "Electronic road sign diagram", caption: "Lane signal / beacon" },
        avc: { file: "Pneumatic road tube counter.jpg", alt: "Pneumatic road tube traffic counter", caption: "Vehicle counter / classifier" },
        vasd: { file: "Solar radar speed sign.jpg", alt: "Solar radar speed display sign", caption: "Radar speed display" },
        wim: { file: "SB US 1 Palm Coast Weigh Station; Scales.jpg", alt: "Truck weigh station scales", caption: "Weigh-in-motion / scale system" },
        services: { file: "Autostrada A1 - Centura Arad.jpg", alt: "Roadside RSS installation work for variable message sign", caption: "Installation and commissioning" },
        other: { file: "E-ZPass Toll Plaza - Spaulding Turnpike.jpg", alt: "Integrated toll and RSS roadway equipment", caption: "Integrated RSS equipment" }
    };

    function dictionaryImageFor(definition) {
        const text = `${definition.name || ""} ${definition.definition || ""}`.toLowerCase();
        let key = definition.category || "other";
        const componentSpecific = new Set(["anpr", "avids", "cctv", "vms", "vasd", "wim", "barrier", "rfid", "weather"]);
        if (/anpr|alpr|ocr|number plate|license plate|licence plate/.test(text)) key = "anpr";
        else if (/vms|variable message|message sign|lane status|display|ohls/.test(text)) key = "vms";
        else if (/radar|speed display|vasd/.test(text)) key = "vasd";
        else if (/weigh|wim|scale/.test(text)) key = "wim";
        else if (/weather|rwis|rain|visibility|wind|water level|flood/.test(text)) key = "weather";
        else if (/camera|cctv|ptz|surveillance|video/.test(text)) key = definition.category === "avids" ? "avids" : "cctv";
        else if (/barrier|boom|alb|gate/.test(text)) key = "barrier";
        else if (/rfid|dsrc|tag|toll plaza|toll lane|etc system/.test(text)) key = "rfid";
        else if (/payment|cash|drawer|pos|card|bank/.test(text)) key = "payment";
        else if (/printer|receipt|thermal/.test(text)) key = "printer";
        else if (/scanner|barcode|document scan/.test(text)) key = "scanner";
        else if (/ups|battery|solar|power|surge|earthing/.test(text)) key = "power";
        else if (!componentSpecific.has(key) && /server|database|back office|back-office|toc|control centre|control center/.test(text)) key = "server";
        else if (!componentSpecific.has(key) && /fibre|fiber|switch|router|network|liu|rack|patch/.test(text)) key = "network";

        const image = dictionaryImages[key] || dictionaryImages.other;
        return { ...image, url: commonsImage(image.file) };
    }

    function catLabel(key) {
        return dictionaryCategories.find((x) => x.key === key)?.label || key;
    }

    function buildDefinitions() {
        if (dictDefs) return dictDefs;
        const seen = new Map();
        dictionaryData.forEach((c) => {
            const key = String(c.name || "").toLowerCase().trim();
            if (!key || seen.has(key)) return;
            seen.set(key, {
                name: c.name, category: c.category,
                definition: c.description || c.name,
                make: c.make || "", unit: c.unit || ""
            });
        });
        dictDefs = Array.from(seen.values()).sort((a, b) => a.name.localeCompare(b.name));
        dictCatCounts = { All: dictDefs.length };
        dictDefs.forEach((d) => { dictCatCounts[d.category] = (dictCatCounts[d.category] || 0) + 1; });
        return dictDefs;
    }

    function setupExplorer() {
        buildDefinitions();
        renderDictCategoryRail();
        renderDictionary();
        $("#mediaSearchInput")?.addEventListener("input", () => { dictState.limit = DICT_PAGE; renderDictionary(); });
        $("#dictLoadMore")?.addEventListener("click", () => { dictState.limit += DICT_PAGE; renderDictionary(); });
    }

    function dictFiltered() {
        const term = dictState.term.trim().toLowerCase();
        return buildDefinitions().filter((d) => {
            if (dictState.category !== "All" && d.category !== dictState.category) return false;
            if (!term) return true;
            return `${d.name} ${d.definition} ${d.make}`.toLowerCase().includes(term);
        });
    }

    function renderDictCategoryRail() {
        const rail = $("#dictCategoryRail");
        if (!rail) return;
        buildDefinitions();
        const chips = [{ key: "All", label: "All", count: dictCatCounts.All }]
            .concat(dictionaryCategories.filter((c) => dictCatCounts[c.key]).map((c) => ({ key: c.key, label: c.label, count: dictCatCounts[c.key] })));
        rail.innerHTML = chips.map((c) => `
            <button class="dict-chip${c.key === dictState.category ? " active" : ""}" type="button" data-cat="${escapeAttr(c.key)}">
                <span>${escapeHtml(c.label)}</span><strong>${c.count.toLocaleString()}</strong>
            </button>`).join("");
        $$("#dictCategoryRail .dict-chip").forEach((chip) => chip.addEventListener("click", () => {
            dictState.category = chip.dataset.cat;
            dictState.limit = DICT_PAGE;
            $$("#dictCategoryRail .dict-chip").forEach((c) => c.classList.toggle("active", c === chip));
            renderDictionary();
        }));
    }

    function renderDictionary() {
        const list = $("#mediaGrid");
        if (!list) return;
        dictState.term = $("#mediaSearchInput")?.value || "";
        const all = dictFiltered();
        const shown = all.slice(0, dictState.limit);
        setText("#dictCountNote", `${buildDefinitions().length.toLocaleString()} defined components across ${dictionaryCategories.length} element types - showing ${shown.length.toLocaleString()} of ${all.length.toLocaleString()}`);

        if (!all.length) {
            list.innerHTML = `<div class="empty-state"><i class="fa-solid fa-magnifying-glass"></i><h4>No definitions</h4><p>Try another search term or category.</p></div>`;
        } else {
            const term = dictState.term.trim();
            list.innerHTML = shown.map((d) => {
                const attrs = [d.make, d.unit].filter(Boolean).join(" | ");
                const mapTerm = mapTermForCategory(d.category, d.name);
                const image = dictionaryImageFor(d);
                return `
                    <article class="def-item">
                        <figure class="def-media">
                            <img src="${escapeAttr(image.url)}" alt="${escapeAttr(image.alt)}" loading="lazy" decoding="async" referrerpolicy="no-referrer">
                            <figcaption>${escapeHtml(image.caption)} <span>Wikimedia Commons</span></figcaption>
                        </figure>
                        <div class="def-term">
                            <h4>${highlightText(d.name, term)}</h4>
                            <button class="cat-tag linkable" type="button" data-cat="${escapeAttr(d.category)}">${escapeHtml(catLabel(d.category))}</button>
                        </div>
                        <p class="def-body">${highlightText(d.definition, term)}</p>
                        ${attrs ? `<p class="def-attrs"><i class="fa-solid fa-tag"></i> ${escapeHtml(attrs)}</p>` : ""}
                        <div class="def-actions">
                            <button class="def-link" type="button" data-dict-link="map" data-term="${escapeAttr(mapTerm)}"><i class="fa-solid fa-map-location-dot"></i> Map</button>
                            <button class="def-link" type="button" data-dict-link="specs" data-term="${escapeAttr(d.name)}" data-cat="${escapeAttr(d.category)}"><i class="fa-solid fa-table-list"></i> Specs</button>
                            <button class="def-link" type="button" data-dict-link="boq" data-term="${escapeAttr(mapTerm)}"><i class="fa-solid fa-file-invoice-dollar"></i> BOQ</button>
                        </div>
                    </article>`;
            }).join("");

            $$("#mediaGrid .cat-tag.linkable").forEach((btn) => btn.addEventListener("click", () => {
                dictState.category = btn.dataset.cat;
                dictState.limit = DICT_PAGE;
                renderDictCategoryRail();
                renderDictionary();
            }));
            $$("#mediaGrid .def-link").forEach((btn) => btn.addEventListener("click", () => {
                const action = btn.dataset.dictLink;
                if (action === "map") openMapForTerm(btn.dataset.term);
                if (action === "specs") openSpecsForTerm(btn.dataset.term, btn.dataset.cat);
                if (action === "boq") openBOQForTerm(btn.dataset.term);
            }));
            $$("#mediaGrid .def-media img").forEach((img) => img.addEventListener("error", () => {
                img.closest(".def-media")?.classList.add("image-missing");
            }, { once: true }));
        }

        const more = $("#dictLoadMore");
        if (more) more.style.display = all.length > dictState.limit ? "inline-flex" : "none";
    }

    function renderFileCard(file) {
        const name = String(file.Name || "Untitled");
        const ext = normalizeExtension(file.Extension);
        const size = formatBytes(Number(file.Length) || 0);
        const date = formatDate(file.LastWriteTime);
        const href = getRelativeFileHref(file);
        const hasData = Boolean(dataStore[name]);

        return `
            <article class="file-card">
                <div class="file-card-header">
                    <div class="file-icon"><i class="${getFileIconClass(ext)}"></i></div>
                    <div class="file-actions">
                        ${hasData ? `<button class="btn-analyze" type="button" data-file="${escapeAttr(name)}"><i class="fa-solid fa-chart-simple"></i> Analyze</button>` : ""}
                        <a class="icon-button small" href="${escapeAttr(href)}" target="_blank" rel="noopener" title="Open file"><i class="fa-solid fa-arrow-up-right-from-square"></i></a>
                    </div>
                </div>
                <div class="file-info">
                    <h3>${escapeHtml(name)}</h3>
                    <div class="file-path">${escapeHtml(String(file.FullName || ""))}</div>
                </div>
                <div class="file-meta-bottom">
                    <span>${escapeHtml(ext || "file")}</span>
                    <span>${size}</span>
                    <span>${date}</span>
                </div>
            </article>
        `;
    }

    function setupAnalytics() {
        const select = $("#fileSelect");
        if (!select) return;

        Object.keys(dataStore)
            .filter((name) => dataStore[name])
            .sort((a, b) => a.localeCompare(b))
            .forEach((name) => {
                const option = document.createElement("option");
                option.value = name;
                option.textContent = name;
                select.appendChild(option);
            });

        select.addEventListener("change", () => {
            if (!select.value) {
                $("#dashboardContent").style.display = "none";
                $("#initialState").style.display = "grid";
                return;
            }
            loadWorkbook(select.value);
        });
    }

    function loadWorkbook(fileName) {
        if (typeof XLSX === "undefined") return;
        showLoader(true);
        $("#initialState").style.display = "none";
        $("#dashboardContent").style.display = "none";

        setTimeout(() => {
            try {
                state.workbook = XLSX.read(dataStore[fileName], { type: "base64" });
                $("#dashboardContent").style.display = "block";
                renderSheetTabs();
                if (state.workbook.SheetNames.length) selectSheet(state.workbook.SheetNames[0]);
            } catch (error) {
                console.error(error);
                $("#initialState").style.display = "grid";
                $("#initialState").innerHTML = `<i class="fa-solid fa-triangle-exclamation"></i><h4>Workbook parse failed</h4><p>The selected source could not be read.</p>`;
            } finally {
                showLoader(false);
            }
        }, 80);
    }

    function renderSheetTabs() {
        const tabs = $("#sheetTabs");
        if (!tabs || !state.workbook) return;
        tabs.innerHTML = "";

        state.workbook.SheetNames.forEach((sheetName) => {
            const button = document.createElement("button");
            button.className = "tab-btn";
            button.type = "button";
            button.textContent = sheetName;
            button.addEventListener("click", () => selectSheet(sheetName));
            tabs.appendChild(button);
        });
    }

    function selectSheet(sheetName) {
        if (!state.workbook) return;
        $$("#sheetTabs .tab-btn").forEach((button) => button.classList.toggle("active", button.textContent === sheetName));
        setText("#tableTitle", sheetName);

        const worksheet = state.workbook.Sheets[sheetName];
        const rows = XLSX.utils.sheet_to_json(worksheet, { defval: "" });
        renderDataTable(rows);
        renderWorkbookCharts(rows);
    }

    function renderDataTable(rows) {
        const container = $("#tableContainer");
        if (!container) return;

        if (!rows.length) {
            container.innerHTML = `<div class="empty-state"><i class="fa-solid fa-table"></i><h4>No rows</h4><p>This worksheet has no extracted rows.</p></div>`;
            return;
        }

        const headers = Object.keys(rows[0]);
        const maxRows = rows.slice(0, 500);
        container.innerHTML = `
            <table>
                <thead><tr>${headers.map((header) => `<th>${escapeHtml(header)}</th>`).join("")}</tr></thead>
                <tbody>
                    ${maxRows.map((row) => `<tr>${headers.map((header) => `<td>${formatCell(row[header])}</td>`).join("")}</tr>`).join("")}
                </tbody>
            </table>
        `;
    }

    function renderWorkbookCharts(rows) {
        clearCharts(state.workbookCharts);
        const section = $("#chartsSection");
        const container = $("#chartsContainer");
        if (!section || !container) return;
        container.innerHTML = "";

        if (!rows.length || typeof Chart === "undefined") {
            section.style.display = "none";
            return;
        }

        const headers = Object.keys(rows[0]);
        const labelColumn = headers.find((header) => rows.some((row) => typeof row[header] === "string" && row[header])) || headers[0];
        const numericColumns = headers.filter((header) => header !== labelColumn && rows.some((row) => Number.isFinite(Number(row[header]))));

        if (!numericColumns.length) {
            section.style.display = "none";
            return;
        }

        section.style.display = "block";
        const sample = rows.slice(0, 24);
        const labels = sample.map((row) => String(row[labelColumn] || "Item").slice(0, 28));

        numericColumns.slice(0, 4).forEach((column, index) => {
            const wrapper = document.createElement("div");
            wrapper.className = "chart-wrapper";
            const canvas = document.createElement("canvas");
            wrapper.appendChild(canvas);
            container.appendChild(wrapper);

            const chart = new Chart(canvas, {
                type: index === 0 && sample.length <= 10 ? "doughnut" : "bar",
                data: {
                    labels,
                    datasets: [{
                        label: column,
                        data: sample.map((row) => Number(row[column]) || 0),
                        backgroundColor: index === 0 && sample.length <= 10 ? palette : palette[index % palette.length],
                        borderColor: "#101010",
                        borderWidth: 1,
                        borderRadius: 5
                    }]
                },
                options: chartOptions(column)
            });
            state.workbookCharts.push(chart);
        });
    }

    function setupGlobal() {
        const grid = $("#globalSummaryGrid");
        if (!grid) return;

        const dataSourceCount = Object.values(dataStore).filter(Boolean).length;
        const estimatedValue = Number(masterData?.total_financial_value) || 0;
        const boqItems = Number(masterData?.total_boq_items) || 0;

        grid.innerHTML = `
            ${summaryCard("fa-list-check", "RSS assets", state.assets.length.toLocaleString(), "Field installation register")}
            ${summaryCard("fa-folder-open", "Documents", metadata.length.toLocaleString(), `${dataSourceCount} analyzable sources`)}
            ${summaryCard("fa-sack-dollar", "Financial value", formatCurrencyAbbr(estimatedValue) + " UGX", "Incl. taxes and contingencies")}
            ${summaryCard("fa-table-list", "BOQ rows", boqItems.toLocaleString(), "Line items detected")}
        `;

        if (typeof Chart !== "undefined" && masterData) renderGlobalCharts();
    }

    function summaryCard(icon, label, value, subValue) {
        return `
            <article class="summary-card">
                <div class="summary-icon"><i class="fa-solid ${icon}"></i></div>
                <div class="summary-info">
                    <h3>${escapeHtml(label)}</h3>
                    <div class="value">${escapeHtml(String(value))}</div>
                    <div class="sub-value">${escapeHtml(subValue)}</div>
                </div>
            </article>
        `;
    }

    function renderGlobalCharts() {
        clearCharts(state.globalCharts);
        const valueCtx = $("#globalValueChart");
        const itemCtx = $("#globalItemChart");

        if (valueCtx && Array.isArray(masterData.top_value_docs) && masterData.top_value_docs.length) {
            state.globalCharts.push(new Chart(valueCtx, {
                type: "bar",
                data: {
                    labels: masterData.top_value_docs.slice(0, 10).map((doc) => String(doc.filename || "Document").slice(0, 30)),
                    datasets: [{
                        label: "Estimated value",
                        data: masterData.top_value_docs.slice(0, 10).map((doc) => Number(doc.estimated_value) || 0),
                        backgroundColor: "#34d399",
                        borderRadius: 5
                    }]
                },
                options: chartOptions("Estimated value", true)
            }));
        }

        if (itemCtx && Array.isArray(masterData.top_item_docs) && masterData.top_item_docs.length) {
            state.globalCharts.push(new Chart(itemCtx, {
                type: "bar",
                data: {
                    labels: masterData.top_item_docs.slice(0, 10).map((doc) => String(doc.filename || "Document").slice(0, 30)),
                    datasets: [{
                        label: "Line items",
                        data: masterData.top_item_docs.slice(0, 10).map((doc) => Number(doc.items_count) || 0),
                        backgroundColor: "#fbbf24",
                        borderRadius: 5
                    }]
                },
                options: chartOptions("Line items", true)
            }));
        }
    }

    function chartOptions(title, horizontal = false) {
        return {
            indexAxis: horizontal ? "y" : "x",
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: { labels: { color: "#d4d2c7" } },
                title: { display: true, text: title, color: "#f2f1ec", font: { family: "Outfit", size: 14 } }
            },
            scales: horizontal ? {
                x: { grid: { color: "rgba(255,255,255,0.08)" }, ticks: { color: "#a9aaa2" } },
                y: { grid: { display: false }, ticks: { color: "#a9aaa2" } }
            } : {
                y: { grid: { color: "rgba(255,255,255,0.08)" }, ticks: { color: "#a9aaa2" } },
                x: { grid: { display: false }, ticks: { color: "#a9aaa2" } }
            }
        };
    }

    function getTypeColor(type) {
        const match = state.assetTypes.find((item) => item.id === type || item.label === type);
        if (match) return match.color;
        const index = Math.abs(hashCode(type)) % palette.length;
        return palette[index];
    }

    function getTypeShort(type) {
        const match = state.assetTypes.find((item) => item.id === type || item.label === type);
        if (match) return match.short;
        return String(type || "RSS").replace(/[^a-z0-9]/gi, "").slice(0, 3).toUpperCase() || "RSS";
    }

    function getStatusColor(status) {
        const key = String(status || "").toLowerCase();
        return Object.entries(statusPalette).find(([name]) => key.includes(name))?.[1] || "#22d3ee";
    }

    function countBy(items, key) {
        return items.reduce((acc, item) => {
            const value = typeof key === "function" ? key(item) : item[key];
            acc[value] = (acc[value] || 0) + 1;
            return acc;
        }, {});
    }

    function groupBy(items, key) {
        return items.reduce((acc, item) => {
            const value = typeof key === "function" ? key(item) : item[key];
            if (!acc[value]) acc[value] = [];
            acc[value].push(item);
            return acc;
        }, {});
    }

    function unique(values) {
        return [...new Set(values.filter((value) => value !== undefined && value !== null && String(value).trim() !== ""))]
            .sort((a, b) => String(a).localeCompare(String(b)));
    }

    function hashCode(text) {
        return String(text).split("").reduce((hash, char) => ((hash << 5) - hash) + char.charCodeAt(0), 0);
    }

    function setText(selector, value) {
        const element = $(selector);
        if (element) element.textContent = value;
    }

    function cleanDocName(name) {
        return String(name).replace(/\.docx$/i, "").replace(/_/g, " ");
    }

    function normalizeExtension(ext) {
        const value = String(ext || "").trim();
        if (!value) return "file";
        return value.startsWith(".") ? value.toLowerCase() : `.${value.toLowerCase()}`;
    }

    function getFileIconClass(ext) {
        const value = normalizeExtension(ext);
        if (value === ".pdf") return "fa-solid fa-file-pdf";
        if ([".doc", ".docx"].includes(value)) return "fa-solid fa-file-word";
        if ([".xls", ".xlsx", ".csv"].includes(value)) return "fa-solid fa-file-excel";
        if ([".zip", ".rar", ".7z"].includes(value)) return "fa-solid fa-file-zipper";
        if ([".jpg", ".jpeg", ".png", ".gif", ".webp"].includes(value)) return "fa-solid fa-file-image";
        return "fa-solid fa-file";
    }

    function getRelativeFileHref(file) {
        const fullName = String(file.FullName || file.Name || "");
        const marker = "\\KEE\\";
        const index = fullName.toLowerCase().indexOf(marker.toLowerCase());
        const relative = index >= 0 ? fullName.slice(index + marker.length) : String(file.Name || fullName);
        return relative.split("\\").map(encodeURIComponent).join("/");
    }

    function formatBytes(bytes) {
        if (!bytes) return "0 B";
        const units = ["B", "KB", "MB", "GB"];
        const index = Math.min(Math.floor(Math.log(bytes) / Math.log(1024)), units.length - 1);
        return `${(bytes / Math.pow(1024, index)).toFixed(index === 0 ? 0 : 1)} ${units[index]}`;
    }

    function formatDate(value) {
        if (!value) return "No date";
        let raw = value;
        if (typeof value === "object") raw = value.DateTime || value.value || value.toString();
        const match = String(raw).match(/\/Date\((\d+)\)\//);
        const date = match ? new Date(Number(match[1])) : new Date(raw);
        if (Number.isNaN(date.getTime())) return "No date";
        return date.toLocaleDateString("en-UG", { year: "numeric", month: "short", day: "numeric" });
    }

    function formatNumber(value) {
        return Number(value || 0).toLocaleString(undefined, { maximumFractionDigits: 1 });
    }

    function formatCurrencyAbbr(value) {
        if (!value) return "0";
        if (value >= 1e12) return `${(value / 1e12).toFixed(2)}T`;
        if (value >= 1e9) return `${(value / 1e9).toFixed(2)}B`;
        if (value >= 1e6) return `${(value / 1e6).toFixed(2)}M`;
        if (value >= 1e3) return `${(value / 1e3).toFixed(2)}K`;
        return value.toLocaleString();
    }

    function formatCell(value) {
        if (typeof value === "number") return escapeHtml(value.toLocaleString(undefined, { maximumFractionDigits: 2 }));
        return escapeHtml(String(value ?? ""));
    }

    function highlightText(value, term) {
        const escaped = escapeHtml(String(value || ""));
        if (!term) return escaped;
        const safeTerm = escapeRegex(term);
        return escaped.replace(new RegExp(`(${safeTerm})`, "ig"), "<mark>$1</mark>");
    }

    function escapeHtml(value) {
        return String(value ?? "")
            .replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;")
            .replace(/"/g, "&quot;")
            .replace(/'/g, "&#039;");
    }

    function escapeAttr(value) {
        return escapeHtml(value).replace(/`/g, "&#096;");
    }

    function escapeRegex(value) {
        return String(value).replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    }

    function clearCharts(charts) {
        while (charts.length) {
            const chart = charts.pop();
            if (chart && typeof chart.destroy === "function") chart.destroy();
        }
    }

    function showLoader(show) {
        const loader = $("#loader");
        if (loader) loader.style.display = show ? "grid" : "none";
    }

    function renderBOQTable() {
        const tbody = $("#boqTableBody");
        if (!tbody || !window.BOQ_DATA) return;

        let html = "";
        window.BOQ_DATA.forEach(row => {
            // Apply a bold style for parent items
            const isParent = !row["RATE (USD)"];
            const style = isParent ? "font-weight: 700; color: #f8fafc; background: rgba(255,255,255,0.02);" : "";
            
            html += `<tr style="${style}">
                <td>${escapeHtml(row["ITEM"])}</td>
                <td>${escapeHtml(row["DESCRIPTION"])}</td>
                <td>${escapeHtml(row["UNIT"])}</td>
                <td>${escapeHtml(row["QUANTITY"])}</td>
                <td class="num-col">${escapeHtml(row["RATE (USD)"])}</td>
                <td class="num-col">${escapeHtml(row["AMOUNT (USD)"])}</td>
                <td class="num-col highlight-col">${escapeHtml(row["RATE (UGX)"])}</td>
                <td class="num-col highlight-col">${escapeHtml(row["AMOUNT (UGX)"])}</td>
            </tr>`;
        });
        tbody.innerHTML = html;
    }

    // ---- Analytics: numerical + categorical summaries across every data source ----
    function setupAnalyticsDash() {
        const cardsEl = $("#analyticsCards");
        const bdEl = $("#analyticsBreakdowns");
        if (!cardsEl && !bdEl) return;

        const assets = state.assets;                 // budgeted RSS components on the scope
        const rss = rssData || {};
        const bud = rssBudget || {};
        const scopeKm = rssScopeLengthKm();
        const grand = Number(bud.grandTotalUgx) || 0;
        const costPerKm = scopeKm ? grand / scopeKm : 0;
        const wimSiteCount = Array.isArray(bud.wimSites) ? bud.wimSites.length : assets.filter((a) => a.type === "WIM").length;
        const ptzCount = assets.filter((a) => a.type === "CCTV").length;

        const cards = [
            ["fa-tower-cell", assets.length.toLocaleString(), "RSS components", "Single deployment along the scope"],
            ["fa-road", `${Math.round(scopeKm)} km`, "Project scope", "KNBP + KEE + Entebbe dual"],
            ["fa-video", String(ptzCount), "PTZ / TMCS cameras", "AI-ML traffic + incident monitoring"],
            ["fa-weight-hanging", String(wimSiteCount), "WIM sites (with ANPR)", "Busega, Kajjansi, Mpala"],
            ["fa-sack-dollar", `${ugxB(grand)} UGX`, "RSS package total", "CAPEX incl. 10% cont. + 18% VAT"],
            ["fa-coins", `${ugxB(bud.subtotalUgx || 0)} UGX`, "CAPEX sub-total", "Equipment, structures, software, install"],
            ["fa-gauge-high", `${ugxB(costPerKm)} UGX`, "Cost per km", "Package total / scope length"],
            ["fa-list-check", (rss.parameters || []).length.toLocaleString(), "RSS spec parameters", `${(rss.techSpecs || []).length} technical specs`],
        ];
        if (cardsEl) {
            cardsEl.innerHTML = cards.map(([ic, val, label, sub]) => `
                <article class="an-card">
                    <div class="an-icon"><i class="fa-solid ${ic}"></i></div>
                    <div class="an-body">
                        <div class="an-val">${escapeHtml(String(val))}</div>
                        <div class="an-label">${escapeHtml(label)}</div>
                        <div class="an-sub">${escapeHtml(sub)}</div>
                    </div>
                </article>`).join("");
        }

        // Deep component summaries (100+ numerical & categorical statistics)
        const sumEl = $("#analyticsSummaries");
        if (sumEl) sumEl.innerHTML = renderComponentSummaries();

        // Crash-record safety analysis (2021-26) driving the RSS placement
        const safetyEl = $("#analyticsSafety");
        if (safetyEl) safetyEl.innerHTML = renderSafetyAnalysis() + renderPatrolOps();

        // Full costed RSS Bill of Quantities (in-depth) + budget waterfall
        const budgetEl = $("#analyticsBudget");
        if (budgetEl) {
            budgetEl.innerHTML = renderRssSchematic() + renderBudgetSummary(bud) + renderWimSites(bud) + renderBudgetTable(bud) + renderSourceNotes(bud);
        }

        setupExports();

        const costByCat = {};
        (bud.categories || []).forEach((c) => { costByCat[c.category] = c.subtotal_ugx; });

        let html = renderCostBreakdown("RSS package cost by category (UGX)", costByCat);
        const breakdowns = [
            ["RSS components by type", countBy(assets, "type")],
            ["RSS components by corridor", countBy(assets, "corridor")],
            ["RSS components by priority", countBy(assets, "priority")],
            ["WIM sites by corridor", countBy((bud.wimSites || []), "corridor")],
            ["Project scope by road number", countBy(projectScope, "road_no")],
            ["RSS specification parameters by category", countBy((rss.parameters || []), "cat")],
        ];
        html += breakdowns.map(([title, counts]) => renderBreakdownHTML(title, counts)).join("");
        if (bdEl) bdEl.innerHTML = html;
    }

    function ugxB(n) {
        n = Number(n) || 0;
        if (n >= 1e9) return (n / 1e9).toFixed(2) + "B";
        if (n >= 1e6) return (n / 1e6).toFixed(0) + "M";
        return n.toLocaleString();
    }

    function renderBudgetSummary(bud) {
        if (!bud || !bud.grandTotalUgx) return "";
        const rows = [
            ["CAPEX sub-total", bud.subtotalUgx],
            ["Contingencies (10%)", bud.contingencyUgx],
            ["VAT (18%)", bud.vatUgx],
            ["GRAND TOTAL", bud.grandTotalUgx],
        ];
        return `<section class="panel an-panel budget-summary">
            <div class="an-panel-head"><h3>RSS deployment budget</h3>
                <span class="pill">Single deployment</span></div>
            <div class="budget-rows">
                ${rows.map(([k, v], i) => `<div class="${i === rows.length - 1 ? "budget-grand" : ""}"><span>${escapeHtml(k)}</span><strong>${Number(v).toLocaleString()} UGX</strong></div>`).join("")}
                <div><span>Approx. USD (@ ${bud.currencyRate}/USD)</span><strong>$${Number(bud.grandTotalUsd).toLocaleString()}</strong></div>
                <div><span>Fibre backbone</span><strong>Already laid &mdash; only site drops priced</strong></div>
            </div>
        </section>`;
    }

    function renderRssSchematic() {
        return `<section class="panel an-panel rss-schematic-panel">
            <div class="an-panel-head">
                <h3>Detailed RSS schematic - field, communications, TCC and enforcement interfaces</h3>
                <span class="pill">Scope only</span>
            </div>
            <div class="rss-schematic" aria-label="RSS schematic architecture">
                <div class="schem-band field-band">
                    <div class="schem-title">Field layer &mdash; monitoring &amp; display</div>
                    <div class="schem-node"><i class="fa-solid fa-video"></i><strong>PTZ / TMCS with AI-ML</strong><span>21 cameras: all traffic + incident monitoring, auto-detection</span></div>
                    <div class="schem-node"><i class="fa-solid fa-weight-hanging"></i><strong>WIM x3 with ANPR</strong><span>HS-WIM Busega + Mpala, SWIM Kajjansi</span></div>
                    <div class="schem-node"><i class="fa-solid fa-signs-post"></i><strong>Overhead VMS + weather comm</strong><span>5 fixed gantry signs covering the carriageway + 2 geolocated weather feeds</span></div>
                </div>
                <div class="schem-link"><span>13 site drops onto the EXISTING fibre backbone (backbone not priced)</span></div>
                <div class="schem-band comms-band">
                    <div class="schem-title">Data feed</div>
                    <div class="schem-node"><i class="fa-solid fa-box"></i><strong>RSU cabinets</strong><span>Hybrid solar UPS, industrial fibre switch, edge streaming</span></div>
                    <div class="schem-node"><i class="fa-solid fa-network-wired"></i><strong>Existing OFC backbone</strong><span>All field data streams to the central database</span></div>
                </div>
                <div class="schem-link"><span>Continuous video, events, weigh records, weather status</span></div>
                <div class="schem-band tcc-band">
                    <div class="schem-title">TCC &mdash; Kajjansi Toll Plaza</div>
                    <div class="schem-node"><i class="fa-solid fa-database"></i><strong>Central database</strong><span>Automated analytics on every feed &mdash; no manual trawling</span></div>
                    <div class="schem-node"><i class="fa-solid fa-display"></i><strong>Video wall + operators</strong><span>Verification of AI-flagged incidents</span></div>
                    <div class="schem-node"><i class="fa-solid fa-bullhorn"></i><strong>Automated dissemination</strong><span>Notifications pushed to affected stakeholders; VMS updated</span></div>
                </div>
                <div class="schem-link"><span>Automatic notification &mdash; triggers action</span></div>
                <div class="schem-band stakeholder-band">
                    <div class="schem-title">Stakeholders notified</div>
                    <div class="schem-node"><i class="fa-solid fa-car-on"></i><strong>Patrol operations</strong><span>Dispatched to exact chainage with incident context</span></div>
                    <div class="schem-node"><i class="fa-solid fa-scale-balanced"></i><strong>Enforcement / UNBS</strong><span>Overload exceptions with ANPR-matched evidence</span></div>
                    <div class="schem-node"><i class="fa-solid fa-mobile-screen"></i><strong>Road users</strong><span>VMS warnings and travel information in real time</span></div>
                </div>
            </div>
        </section>`;
    }

    function renderWimSites(bud) {
        const sites = bud?.wimSites || [];
        if (!sites.length) return "";
        return `<section class="panel an-panel wim-sites-panel">
            <div class="an-panel-head"><h3>RSS WIM site setup</h3><span class="pill">${sites.length} sites</span></div>
            <div class="table-wrap budget-table-wrap compact">
                <table class="dense-table budget-table">
                    <thead><tr><th>Site</th><th>Corridor</th><th class="num">Km</th><th class="num">X</th><th class="num">Y</th><th>Configuration</th><th>Purpose</th></tr></thead>
                    <tbody>${sites.map((site) => `<tr>
                        <td>${escapeHtml(site.site)}</td>
                        <td>${escapeHtml(site.corridor)}</td>
                        <td class="num">${formatNumber(site.chainageKm)}</td>
                        <td class="num">${Number(site.lon).toFixed(5)}</td>
                        <td class="num">${Number(site.lat).toFixed(5)}</td>
                        <td>${escapeHtml(site.configuration)}</td>
                        <td>${escapeHtml(site.purpose)}</td>
                    </tr>`).join("")}</tbody>
                </table>
            </div>
        </section>`;
    }

    function renderBudgetTable(bud) {
        if (!bud || !Array.isArray(bud.categories)) return "";
        const body = bud.categories.map((c) => {
            const head = `<tr class="bt-cat"><td colspan="4">${escapeHtml(c.category)}</td><td class="num">${Number(c.subtotal_ugx).toLocaleString()}</td></tr>`;
            const items = c.items.map((it) => `<tr>
                <td class="col-desc">${escapeHtml(it.item)}</td>
                <td class="num">${escapeHtml(String(it.qty))}</td>
                <td>${escapeHtml(it.unit)}</td>
                <td class="num">${Number(it.rate_ugx).toLocaleString()}</td>
                <td class="num">${Number(it.amount_ugx).toLocaleString()}</td></tr>`).join("");
            return head + items;
        }).join("");
        return `<section class="panel an-panel budget-table-panel">
            <div class="an-panel-head"><h3>Costed RSS Bill of Quantities &mdash; single deployment</h3></div>
            <div class="table-wrap budget-table-wrap">
                <table class="dense-table budget-table">
                    <thead><tr><th>Item</th><th class="num">Qty</th><th>Unit</th><th class="num">Rate (UGX)</th><th class="num">Amount (UGX)</th></tr></thead>
                    <tbody>${body}</tbody>
                </table>
            </div>
        </section>`;
    }

    function renderSourceNotes(bud) {
        const notes = bud?.rateSourceNotes || [];
        if (!notes.length) return "";
        return `<section class="panel an-panel source-notes-panel">
            <div class="an-panel-head"><h3>Price assumptions and source basis</h3><span class="pill">${escapeHtml(bud.sourceWorkbook || "BOQ")}</span></div>
            <div class="source-note-grid">
                ${notes.map((note) => `<article class="source-note">
                    <strong>${escapeHtml(note.source)}</strong>
                    <span>${escapeHtml([note.sheet, note.rows, note.section].filter(Boolean).join(" | "))}</span>
                    <p>${escapeHtml(note.note)}</p>
                </article>`).join("")}
            </div>
        </section>`;
    }

    function renderCostBreakdown(title, amounts) {
        const entries = Object.entries(amounts || {}).filter(([, v]) => v > 0).sort((a, b) => b[1] - a[1]);
        const max = entries.reduce((m, [, v]) => Math.max(m, v), 0) || 1;
        const total = entries.reduce((s, [, v]) => s + v, 0);
        const rows = entries.map(([k, v]) => {
            const pct = Math.round((v / max) * 100);
            return `<div class="an-row"><div class="an-row-top"><span title="${escapeAttr(k)}">${escapeHtml(k)}</span><strong>${ugxB(v)}</strong></div><div class="an-bar"><div class="an-fill" style="width:${pct}%"></div></div></div>`;
        }).join("");
        return `<section class="panel an-panel"><div class="an-panel-head"><h3>${escapeHtml(title)}</h3><span class="pill">${ugxB(total)} UGX</span></div>${rows}</section>`;
    }

    function renderBreakdownHTML(title, counts) {
        const entries = Object.entries(counts || {})
            .filter(([k]) => k && k !== "undefined" && k !== "null" && String(k).trim() !== "")
            .sort((a, b) => b[1] - a[1]);
        const max = entries.reduce((m, [, v]) => Math.max(m, v), 0) || 1;
        const total = entries.reduce((s, [, v]) => s + v, 0);
        const rows = entries.map(([k, v]) => {
            const pct = Math.round((v / max) * 100);
            return `<div class="an-row"><div class="an-row-top"><span title="${escapeAttr(k)}">${escapeHtml(k)}</span><strong>${Number(v).toLocaleString()}</strong></div><div class="an-bar"><div class="an-fill" style="width:${pct}%"></div></div></div>`;
        }).join("");
        return `<section class="panel an-panel">
            <div class="an-panel-head"><h3>${escapeHtml(title)}</h3><span class="pill">${total.toLocaleString()}</span></div>
            ${rows || '<p class="panel-note">No data.</p>'}
        </section>`;
    }

    // ---- Component summaries engine: 100+ numerical & categorical statistics ------
    function renderComponentSummaries() {
        const assets = state.assets;
        if (!assets.length) return "";
        const bud = rssBudget || {};
        const CORR_LEN = { KEE: 24.9, KNBP: 20.0, EDC: 12.7 };
        const corridors = ["KEE", "KNBP", "EDC"];
        const types = unique(assets.map((a) => a.type));
        const bins = accidentData.length ? crashBins() : null;
        const sections = [];
        const sec = (title, stats) => sections.push({ title, stats: stats.filter((x) => x && x[1] !== undefined && x[1] !== null && x[1] !== "") });
        const num = (v, d = 1) => Number(v).toLocaleString(undefined, { maximumFractionDigits: d });

        sec("Fleet", [
            ["Total RSS components", assets.length],
            ["Component types", types.length],
            ["Corridors covered", corridors.length],
            ["Scope length (km)", num(CORR_LEN.KEE + CORR_LEN.KNBP + CORR_LEN.EDC)],
            ["Overall density (comp/km)", num(assets.length / 57.6, 2)],
            ["Critical-priority components", assets.filter((a) => a.priority === "Critical").length],
            ["High-priority components", assets.filter((a) => a.priority === "High").length],
            ["Existing installations (enhance & integrate)", assets.filter((a) => /existing/i.test(a.status)).length],
            ["New installations", assets.filter((a) => !/existing/i.test(a.status)).length],
            ["Northernmost latitude", num(Math.max(...assets.map((a) => a.lat)), 5)],
            ["Southernmost latitude", num(Math.min(...assets.map((a) => a.lat)), 5)],
            ["Westernmost longitude", num(Math.min(...assets.map((a) => a.lon)), 5)],
            ["Easternmost longitude", num(Math.max(...assets.map((a) => a.lon)), 5)],
        ]);

        types.forEach((t) => {
            const items = assets.filter((a) => a.type === t).sort((x, y) => x.km - y.km);
            const kms = items.map((a) => a.km);
            const gaps = [];
            corridors.forEach((c) => {
                const ck = items.filter((a) => a.corridor === c).map((a) => a.km).sort((a, b) => a - b);
                for (let i = 1; i < ck.length; i++) gaps.push(ck[i] - ck[i - 1]);
            });
            const stats = [
                ["Units deployed", items.length],
                ["Share of fleet", num(items.length / assets.length * 100, 1) + "%"],
                ["On KEE", items.filter((a) => a.corridor === "KEE").length],
                ["On KNBP", items.filter((a) => a.corridor === "KNBP").length],
                ["On EDC", items.filter((a) => a.corridor === "EDC").length],
                ["First chainage (km)", kms.length ? num(Math.min(...kms)) : "-"],
                ["Last chainage (km)", kms.length ? num(Math.max(...kms)) : "-"],
                ["Mean chainage (km)", kms.length ? num(kms.reduce((s2, v) => s2 + v, 0) / kms.length) : "-"],
                ["Critical / High priority", items.filter((a) => a.priority === "Critical").length + " / " + items.filter((a) => a.priority === "High").length],
            ];
            if (gaps.length) {
                stats.push(["Min spacing (km)", num(Math.min(...gaps))]);
                stats.push(["Avg spacing (km)", num(gaps.reduce((s2, v) => s2 + v, 0) / gaps.length)]);
                stats.push(["Max spacing (km)", num(Math.max(...gaps))]);
            }
            if (bins && t === "CCTV") {
                const covered = items.filter((a) => a.corridor === "KEE" && bins[Math.floor(a.km)] && bins[Math.floor(a.km)].wt >= 55).length;
                stats.push(["Cameras on measured hotspots", covered]);
            }
            sec(catAssetLabel(t) + " (" + t + ")", stats);
        });

        corridors.forEach((c) => {
            const items = assets.filter((a) => a.corridor === c);
            const perType = {};
            items.forEach((a) => { perType[a.type] = (perType[a.type] || 0) + 1; });
            const stats = [
                ["Components", items.length],
                ["Corridor length (km)", num(CORR_LEN[c])],
                ["Density (comp/km)", num(items.length / CORR_LEN[c], 2)],
            ].concat(Object.entries(perType).sort((x, y) => y[1] - x[1]).map(([t, n]) => [t + " units", n]));
            sec("Corridor " + c, stats);
        });

        if (Array.isArray(bud.categories) && bud.categories.length) {
            const tot = bud.categories.reduce((s2, c) => s2 + c.subtotal_ugx, 0) || 1;
            bud.categories.forEach((c) => {
                sec("Cost - " + c.category.slice(0, 44), [
                    ["Line items", c.items.length],
                    ["Sub-total (UGX)", Number(c.subtotal_ugx).toLocaleString()],
                    ["Share of CAPEX", num(c.subtotal_ugx / tot * 100, 1) + "%"],
                    ["Largest line (UGX)", Number(Math.max(...c.items.map((i) => i.amount_ugx))).toLocaleString()],
                ]);
            });
        }

        if (accidentData.length) {
            const by = (key) => {
                const m = {};
                accidentData.forEach((r) => { const k = r[key]; m[k] = (m[k] || 0) + 1; });
                return m;
            };
            sec("Crash record - by year", Object.entries(by("year")).sort().map(([k, v]) => ["Crashes " + k, v]));
            sec("Crash record - by severity", Object.entries(by("severity")).sort((a, b) => b[1] - a[1]).map(([k, v]) => [k, v]));
            sec("Crash record - by dominant vehicle", Object.entries(by("dominant_vehicle")).sort((a, b) => b[1] - a[1]).map(([k, v]) => [k, v]));
            const resp = accidentData.map((r) => r.response_min || 0);
            sec("Emergency response", [
                ["Average response (min)", num(resp.reduce((s2, v) => s2 + v, 0) / resp.length)],
                ["Fastest response (min)", num(Math.min(...resp))],
                ["Slowest response (min)", num(Math.max(...resp))],
                ["Responses over 30 min", resp.filter((v) => v > 30).length],
                ["Responses over 60 min", resp.filter((v) => v > 60).length],
                ["Total fatalities", accidentData.reduce((s2, r) => s2 + (r.fatality || 0), 0)],
                ["Total severe injuries", accidentData.reduce((s2, r) => s2 + (r.severe || 0), 0)],
                ["Total minor injuries", accidentData.reduce((s2, r) => s2 + (r.minor || 0), 0)],
                ["Hotspot kilometres (risk >= 55)", bins ? Object.values(bins).filter((b) => b.wt >= 55).length : 0],
            ]);
        }

        const total = sections.reduce((s2, x) => s2 + x.stats.length, 0);
        return `<section class="panel an-panel summaries-panel">
            <div class="an-panel-head"><h3>RSS component summaries &mdash; in-depth</h3><span class="pill">${total} statistics</span></div>
            <div class="sum-groups">
                ${sections.map((g) => `<div class="sum-group"><h4>${escapeHtml(g.title)}</h4>
                    ${g.stats.map(([k, v]) => `<div class="sum-row"><span>${escapeHtml(String(k))}</span><strong>${escapeHtml(String(v))}</strong></div>`).join("")}
                </div>`).join("")}
            </div>
        </section>`;
    }

    function catAssetLabel(t) {
        const at = (rawItsData && rawItsData.assetTypes || []).find((x) => x.id === t);
        return at ? at.label : t;
    }

    // ---- Safety analysis: 2021-26 crash record (KEE) drives the RSS placement ----
    function crashBins() {
        const bins = {};
        accidentData.forEach((r) => {
            const b = Math.floor(Number(r.chainage) || 0);
            if (!bins[b]) bins[b] = { n: 0, fat: 0, sev: 0, wt: 0, resp: 0 };
            bins[b].n += 1; bins[b].fat += r.fatality || 0; bins[b].sev += r.severe || 0;
            bins[b].wt += (r.fatality || 0) * 5 + (r.severe || 0) * 3 + (r.minor || 0) + 0.2;
            bins[b].resp += r.response_min || 0;
        });
        return bins;
    }

    function renderSafetyAnalysis() {
        if (!accidentData.length) return "";
        const n = accidentData.length;
        const fat = accidentData.reduce((s, r) => s + (r.fatality || 0), 0);
        const sev = accidentData.reduce((s, r) => s + (r.severe || 0), 0);
        const avgResp = accidentData.reduce((s, r) => s + (r.response_min || 0), 0) / n;
        const bins = crashBins();
        const maxWt = Math.max(...Object.values(bins).map((b) => b.wt));
        const bars = Object.keys(bins).map(Number).sort((a, b) => a - b).map((km) => {
            const b = bins[km];
            const pct = Math.round((b.wt / maxWt) * 100);
            const hot = b.wt >= 55;
            return `<div class="hs-col" title="km ${km}-${km + 1}: ${b.n} crashes, ${b.fat} fatal, risk ${b.wt.toFixed(1)}, avg response ${(b.resp / Math.max(b.n, 1)).toFixed(0)} min">
                <div class="hs-bar${hot ? " hot" : ""}" style="height:${Math.max(pct, 4)}%"></div>
                <span class="hs-km">${km}</span>
            </div>`;
        }).join("");
        const placements = [
            ["km 21-22 (worst hotspot, risk 98.6, 2 fatal)", "PTZ with AI-ML at km 21.5 - automatic incident detection and notification"],
            ["km 9-13 cluster (111 crashes)", "PTZ km 9.5 & 11.5, overhead VMS full-carriageway warning km 7.5, SWIM + TCC Kajjansi km 12.1"],
            ["km 2-5 cluster (89 crashes)", "PTZ km 2.5 & 4.5, HS-WIM + ANPR Busega km 1.2"],
            ["km 17-18 and 19-20 hotspots", "PTZ km 17.5 and 19.5"],
            ["Slow response km 5 / 16 / 23-24 (68-79 min avg)", "PTZ AI detection triggers immediate stakeholder notification - no wait for road-user reports"],
            ["km 23-24 hotspot + Mpala entry", "PTZ km 23.5, HS-WIM + ANPR Mpala km 24.2, overhead VMS full-carriageway warning km 19"],
        ];
        return `<section class="panel an-panel safety-panel">
            <div class="an-panel-head"><h3>Safety analysis &mdash; KEE crash record 2021-26 drives the RSS placement</h3>
                <span class="pill">${n} crashes &middot; ${fat} fatalities</span></div>
            <div class="safety-stats">
                <div><span>Crashes analysed</span><strong>${n}</strong></div>
                <div><span>Fatalities</span><strong>${fat}</strong></div>
                <div><span>Severe injuries</span><strong>${sev}</strong></div>
                <div><span>Avg emergency response</span><strong>${avgResp.toFixed(0)} min</strong></div>
            </div>
            <p class="panel-note">Crash risk by kilometre (fatal &times;5 + severe &times;3 + minor &times;1). Red bars are hotspots that received targeted RSS components.</p>
            <div class="hotspot-chart">${bars}</div>
            <div class="safety-map-table">
                ${placements.map(([risk, resp]) => `<div class="smt-row"><span class="smt-risk"><i class="fa-solid fa-triangle-exclamation"></i> ${escapeHtml(risk)}</span><span class="smt-resp"><i class="fa-solid fa-arrow-right"></i> ${escapeHtml(resp)}</span></div>`).join("")}
            </div>
            <p class="panel-note">Source: ${escapeHtml((window.ACCIDENT_DATA && window.ACCIDENT_DATA.source) || "KEE accident storyboard")}</p>
        </section>`;
    }

    // ---- Patrol operations: how the RSS triggers action through notification ------
    function renderPatrolOps() {
        const steps = [
            ["fa-video", "Detect", "PTZ (TMCS) cameras with AI/ML watch every kilometre continuously; the analytics engine detects incidents, stopped vehicles, queues, wrong-way movement and overloads (WIM) the moment they occur."],
            ["fa-database", "Log & analyse", "Every detection streams over the existing fibre backbone into the central database at the Kajjansi TCC, where automated analytics classify the event, locate it to the exact chainage and attach the video evidence."],
            ["fa-bell", "Notify stakeholders", "The database automatically pushes notifications to the affected stakeholders - patrol crews, police, ambulance, recovery, maintenance and the toll operator - each receiving only the events relevant to them."],
            ["fa-car-on", "Patrol acts", "Patrol crews are dispatched to a verified location with context (event type, lane, severity, live picture) instead of driving the corridor hoping to find incidents - cutting the measured 26-minute average response and eliminating blind patrol mileage."],
            ["fa-signs-post", "Inform road users", "In parallel the database updates fixed overhead VMS boards upstream of the event, warning the whole carriageway and protecting both the scene and the responding patrol."],
        ];
        return `<section class="panel an-panel patrol-panel">
            <div class="an-panel-head"><h3>Patrol operations &mdash; how the RSS triggers action</h3>
                <span class="pill">Notification-driven</span></div>
            <p class="panel-note">The RSS does not replace patrols; it makes them efficient. Detection is automatic, so patrols respond to verified, located events instead of discovering them.</p>
            <div class="patrol-steps">
                ${steps.map(([ic, t, d], i) => `<div class="patrol-step"><div class="ps-badge"><i class="fa-solid ${ic}"></i><em>${i + 1}</em></div><div><strong>${t}</strong><p>${d}</p></div></div>`).join("")}
            </div>
        </section>`;
    }

    // ---- Exports: CSV, Excel, KML, PNG, PDF --------------------------------------
    function downloadBlob(name, blob) {
        const a = document.createElement("a");
        a.href = URL.createObjectURL(blob);
        a.download = name;
        document.body.appendChild(a);
        a.click();
        setTimeout(() => { URL.revokeObjectURL(a.href); a.remove(); }, 400);
    }

    function exportRows() {
        return state.assets.map((a) => ({
            ID: a.id, Type: a.type, Site: a.site, Corridor: a.corridor, "Chainage (km)": a.km,
            "Latitude (Y)": a.lat, "Longitude (X)": a.lon, Priority: a.priority,
            Status: a.status, Purpose: a.purpose
        }));
    }

    function exportCSV() {
        const rows = exportRows();
        const heads = Object.keys(rows[0] || {});
        const esc = (v) => { const s = String(v ?? ""); return /[",\n]/.test(s) ? '"' + s.replace(/"/g, '""') + '"' : s; };
        const csv = [heads.join(",")].concat(rows.map((r) => heads.map((h) => esc(r[h])).join(","))).join("\r\n");
        downloadBlob("RSS_components_register.csv", new Blob(["﻿" + csv], { type: "text/csv;charset=utf-8" }));
    }

    function exportXLSX() {
        if (typeof XLSX === "undefined") { exportCSV(); return; }
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, XLSX.utils.json_to_sheet(exportRows()), "RSS Components");
        const bud = rssBudget || {};
        const budRows = [];
        (bud.categories || []).forEach((c) => {
            budRows.push({ Item: c.category.toUpperCase(), Qty: "", Unit: "", "Rate (UGX)": "", "Amount (UGX)": c.subtotal_ugx });
            c.items.forEach((it) => budRows.push({ Item: it.item, Qty: it.qty, Unit: it.unit, "Rate (UGX)": it.rate_ugx, "Amount (UGX)": it.amount_ugx }));
        });
        budRows.push({ Item: "SUB-TOTAL (CAPEX)", "Amount (UGX)": bud.subtotalUgx });
        budRows.push({ Item: "Contingencies (10%)", "Amount (UGX)": bud.contingencyUgx });
        budRows.push({ Item: "VAT (18%)", "Amount (UGX)": bud.vatUgx });
        budRows.push({ Item: "GRAND TOTAL", "Amount (UGX)": bud.grandTotalUgx });
        XLSX.utils.book_append_sheet(wb, XLSX.utils.json_to_sheet(budRows), "RSS Budget (UGX)");
        if (accidentData.length) {
            XLSX.utils.book_append_sheet(wb, XLSX.utils.json_to_sheet(accidentData), "Crash record 2021-26");
        }
        XLSX.writeFile(wb, "RSS_proposal_KNBP_KEE_EntebbeDual.xlsx");
    }

    function exportKML() {
        const esc = escapeHtml;
        let kml = `<?xml version="1.0" encoding="UTF-8"?>\n<kml xmlns="http://www.opengis.net/kml/2.2"><Document><name>RSS Components - KNBP, KEE, Entebbe Airport Dual</name>`;
        const colors = { CCTV: "ff5bb4f5", AVIDS: "ff16a3f9", ANPR: "ffd8741d", VMS: "ff0ba3f5", ECB: "ff4444ef", WIM: "ff3c12be", RSU: "ffa68b14", RWIS: "ffb29108", Comms: "ffb977ec", TOC: "ff272711", VASD: "fffa5a60" };
        Object.entries(colors).forEach(([t, c]) => {
            kml += `<Style id="s${t}"><IconStyle><color>${c}</color><scale>1.0</scale><Icon><href>http://maps.google.com/mapfiles/kml/shapes/placemark_circle.png</href></Icon></IconStyle></Style>`;
        });
        state.assets.forEach((a) => {
            kml += `<Placemark><name>${esc(a.site)}</name><styleUrl>#s${a.type}</styleUrl><description><![CDATA[${a.id} | ${a.type} | ${a.corridor} km ${a.km}<br>${a.purpose}]]></description><Point><coordinates>${a.lon},${a.lat},0</coordinates></Point></Placemark>`;
        });
        const net = actualNetworkData || window.ACTUAL_NETWORK;
        if (net && Array.isArray(net.features)) {
            kml += `<Folder><name>Project scope corridors</name>`;
            net.features.filter((f) => f.properties && f.properties.scope).forEach((f) => {
                const coords = f.geometry.coordinates.map((c) => `${c[0]},${c[1]},0`).join(" ");
                kml += `<Placemark><name>${esc(f.properties.name || f.properties.lid)}</name><Style><LineStyle><color>ff99d334</color><width>3</width></LineStyle></Style><LineString><coordinates>${coords}</coordinates></LineString></Placemark>`;
            });
            kml += `</Folder>`;
        }
        kml += `</Document></kml>`;
        downloadBlob("RSS_components_scope.kml", new Blob([kml], { type: "application/vnd.google-earth.kml+xml" }));
    }

    function exportPNG() {
        // Corridor deployment schematic rendered to canvas (self-contained, no map tiles).
        const W = 1600, H = 900, cv = document.createElement("canvas");
        cv.width = W; cv.height = H;
        const g = cv.getContext("2d");
        g.fillStyle = "#0b0f19"; g.fillRect(0, 0, W, H);
        g.fillStyle = "#f2f1ec"; g.font = "700 30px Arial";
        g.fillText("RSS Deployment Schematic - KNBP, KEE & Entebbe Airport Dual", 40, 52);
        g.font = "16px Arial"; g.fillStyle = "#a9aaa2";
        g.fillText("Risk-weighted from the 2021-26 KEE crash record (503 crashes, 16 fatalities). Package total " + ugxB((rssBudget || {}).grandTotalUgx || 0) + " UGX.", 40, 80);
        const corr = [["KEE", "Kampala-Entebbe Expressway (24.9 km)", "#34d399", 200],
                      ["KNBP", "Kampala Northern Bypass (21 km)", "#c084fc", 460],
                      ["EDC", "Entebbe Airport Dual (7.6 km)", "#fb7185", 720]];
        const X0 = 90, X1 = W - 90;
        const typeColor = { CCTV: "#3b82f6", AVIDS: "#f97316", ANPR: "#1d4ed8", VMS: "#f59e0b", ECB: "#ef4444", WIM: "#be123c", RSU: "#14b8a6", RWIS: "#0891b2", Comms: "#ec4899", TOC: "#111827", VASD: "#605afa" };
        corr.forEach(([cid, label, color, y]) => {
            const maxKm = Math.max(...state.assets.filter((a) => a.corridor === cid).map((a) => a.km), 1);
            g.strokeStyle = color; g.lineWidth = 6; g.beginPath(); g.moveTo(X0, y); g.lineTo(X1, y); g.stroke();
            g.fillStyle = "#f2f1ec"; g.font = "700 18px Arial"; g.fillText(label, X0, y - 58);
            state.assets.filter((a) => a.corridor === cid).forEach((a) => {
                const x = X0 + (a.km / maxKm) * (X1 - X0);
                g.fillStyle = typeColor[a.type] || "#94a3b8";
                g.beginPath(); g.arc(x, y, a.type === "WIM" || a.type === "TOC" ? 11 : 7, 0, Math.PI * 2); g.fill();
                if (a.type === "WIM" || a.type === "TOC" || a.type === "AVIDS") {
                    g.save(); g.translate(x, y - 20); g.rotate(-Math.PI / 5);
                    g.fillStyle = "#f2f1ec"; g.font = "12px Arial"; g.fillText(a.site.slice(0, 34), 0, 0); g.restore();
                }
            });
            g.fillStyle = "#a9aaa2"; g.font = "12px Arial";
            for (let k = 0; k <= maxKm; k += 5) {
                const x = X0 + (k / maxKm) * (X1 - X0);
                g.fillText("km " + k, x - 12, y + 26);
            }
        });
        let lx = X0, ly = H - 60;
        g.font = "14px Arial";
        Object.entries(typeColor).forEach(([t, c]) => {
            g.fillStyle = c; g.beginPath(); g.arc(lx, ly, 7, 0, Math.PI * 2); g.fill();
            g.fillStyle = "#d4d2c7"; g.fillText(t, lx + 12, ly + 5);
            lx += 18 + g.measureText(t).width + 26;
        });
        cv.toBlob((b) => downloadBlob("RSS_deployment_schematic.png", b), "image/png");
    }

    function exportPDF() {
        const JS = window.jspdf && window.jspdf.jsPDF;
        if (!JS) { window.print(); return; }
        const doc = new JS({ unit: "mm", format: "a4" });
        const bud = rssBudget || {};
        let y = 18;
        const line = (txt, size = 10, style = "normal", color = [20, 20, 20]) => {
            doc.setFont("helvetica", style); doc.setFontSize(size); doc.setTextColor(...color);
            doc.splitTextToSize(txt, 180).forEach((t) => {
                if (y > 282) { doc.addPage(); y = 18; }
                doc.text(t, 15, y); y += size * 0.5;
            });
            y += 1.5;
        };
        line("ROAD SURVEILLANCE SYSTEM (RSS) - PROPOSAL SUMMARY", 15, "bold");
        line("KNBP, KEE and Entebbe Airport Dual | Ministry of Works & Transport", 11);
        y += 2;
        line("Budget: " + Number(bud.grandTotalUgx || 0).toLocaleString() + " UGX grand total (CAPEX + 10% contingency + 18% VAT). Single deployment; corridor fibre backbone already laid (site drops only).", 10);
        line("Safety basis: " + accidentData.length + " recorded crashes (2021-26) with " + accidentData.reduce((s, r) => s + (r.fatality || 0), 0) + " fatalities; components are placed at the measured hotspots (km 21-22, 9-13, 2-5, 17-18) and slow-response zones (km 5, 16, 23-24).", 10);
        line("WIM sites: HS-WIM 1 Busega Entry km 1.2 | SWIM/Enforcement Kajjansi km 12.07 | HS-WIM 2 Mpala Entry km 24.2 - each with WIM-integrated ANPR.", 10);
        y += 2;
        line("COSTED BILL OF QUANTITIES (UGX)", 12, "bold");
        (bud.categories || []).forEach((c) => {
            line(c.category + "  -  " + Number(c.subtotal_ugx).toLocaleString(), 10, "bold", [10, 90, 60]);
            c.items.forEach((it) => line("   " + it.item + "  | " + it.qty + " " + it.unit + " @ " + Number(it.rate_ugx).toLocaleString() + " = " + Number(it.amount_ugx).toLocaleString(), 8));
        });
        y += 2;
        line("Sub-total (CAPEX): " + Number(bud.subtotalUgx || 0).toLocaleString() + " UGX", 10, "bold");
        line("Contingencies (10%): " + Number(bud.contingencyUgx || 0).toLocaleString() + " UGX", 10, "bold");
        line("VAT (18%): " + Number(bud.vatUgx || 0).toLocaleString() + " UGX", 10, "bold");
        line("GRAND TOTAL: " + Number(bud.grandTotalUgx || 0).toLocaleString() + " UGX (~$" + Number(bud.grandTotalUsd || 0).toLocaleString() + ")", 11, "bold", [10, 90, 60]);
        y += 2;
        line("RSS COMPONENT REGISTER (" + state.assets.length + " components)", 12, "bold");
        state.assets.forEach((a) => line("  " + a.id + " | " + a.type + " | " + a.site + " | " + a.corridor + " km " + a.km + " | Y " + a.lat + ", X " + a.lon, 8));
        doc.save("RSS_proposal_KNBP_KEE_EntebbeDual.pdf");
    }

    function setupExports() {
        if (state.exportsBound) return;
        state.exportsBound = true;
        $("#exportCsvBtn")?.addEventListener("click", exportCSV);
        $("#exportXlsxBtn")?.addEventListener("click", exportXLSX);
        $("#exportKmlBtn")?.addEventListener("click", exportKML);
        $("#exportPngBtn")?.addEventListener("click", exportPNG);
        $("#exportPdfBtn")?.addEventListener("click", exportPDF);
    }

    document.addEventListener("DOMContentLoaded", init);
})();
