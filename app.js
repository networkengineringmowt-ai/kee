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
            short: String(type.short || type.id || "ITS").slice(0, 4),
            label: String(type.label || type.id || "ITS asset"),
            color: type.color || palette[index % palette.length]
        }));
    }

    function normalizeAssets(data) {
        if (!data) return [];

        if (Array.isArray(data.installations)) {
            return data.installations
                .map((asset, index) => ({
                    id: String(asset.id || `ITS-${index + 1}`),
                    corridor: String(asset.corridor || asset.Corridor || "KEE"),
                    type: String(asset.type || asset.Asset || "ITS"),
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
                        id: String(props.ID || props.id || `ITS-${index + 1}`),
                        corridor: String(props.Corridor || props.corridor || "KEE"),
                        type: String(props.Asset || props.type || "ITS"),
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
        fitMapToProject();
        scheduleActualNetwork();

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

    function drawRoutes() {
        if (!state.routeLayer) return;

        drawDeclaredCorridorPaths();

        if (!roadNetworkData || !Array.isArray(roadNetworkData.features)) return;

        // The exact project scope includes Kampala-Entebbe Expressway (M3, M3N1, M3N2), 
        // Kampala Northern Bypass (M20, M20N1), Entebbe Airport Dual (A003N2), and all their slip roads.
        let features = roadNetworkData.features.filter((feature) => {
            const roadNo = String(feature.properties?.Road_No_1 || "");
            return roadNo.startsWith("M20") || roadNo.startsWith("M3") || roadNo.startsWith("A003N2");
        });

        L.geoJSON(features, {
            style: () => ({
                color: "#fbbf24",
                weight: 12,
                opacity: 0.11,
                lineCap: "round",
                lineJoin: "round"
            })
        }).addTo(state.routeLayer);

        L.geoJSON(features, {
            style: (feature) => ({
                color: routeColor(feature.properties?.Link_Name || feature.properties?.name),
                weight: 4,
                opacity: 0.88,
                dashArray: "1 10",
                lineCap: "round",
                lineJoin: "round"
            }),
            onEachFeature: (feature, layer) => {
                const name = escapeHtml(feature.properties?.Link_Name || feature.properties?.name || "KEE corridor");
                const roadNo = escapeHtml(feature.properties?.Road_No_1 || "");
                layer.bindPopup(`<div class="popup-card"><h4>${name}</h4><p><strong>${roadNo}</strong></p><p>Expressway route geometry layer</p></div>`);
            }
        }).addTo(state.routeLayer);
    }

    // Plot the actual FY25-26 national road network (authoritative GIS geometry) as a
    // muted context layer beneath the project corridors and ITS assets.
    async function drawActualNetwork() {
        const network = await loadActualNetworkData();
        if (state.nationalNetworkDrawn || !network || !Array.isArray(network.features) || !state.nationalLayer) return false;
        const renderer = L.canvas({ padding: 0.25 });
        const layer = L.geoJSON(network, {
            renderer,
            style: () => ({ color: "#7dd3fc", weight: 1.1, opacity: 0.42, lineCap: "round", lineJoin: "round" }),
            onEachFeature: (feature, roadLayer) => {
                const props = feature.properties || {};
                const sourceRecord = props.sourceRecord ? `Record ${escapeHtml(props.sourceRecord)}` : "FY25-26 road link";
                const length = Number.isFinite(Number(props.geometryLengthKm)) ? `${formatNumber(props.geometryLengthKm)} km` : "Measured from GIS geometry";
                roadLayer.bindPopup(`
                    <div class="popup-card">
                        <h4>Actual FY25-26 road network</h4>
                        <p><strong>${sourceRecord}</strong></p>
                        <p>Geometry length: ${escapeHtml(length)}</p>
                        <p>${escapeHtml(props.attributeStatus || "Source GIS road geometry")}</p>
                    </div>
                `);
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
                }).bindPopup(`
                    <div class="popup-card">
                        <h4>${escapeHtml(path.name || corridor.name)}</h4>
                        <p>${escapeHtml(corridor.name)}</p>
                        <p>${escapeHtml(corridor.note || corridor.status)}</p>
                    </div>
                `).addTo(state.routeLayer);
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
        $("#mapNationalBtn")?.addEventListener("click", async () => {
            if (!state.nationalNetworkDrawn) await drawActualNetwork();
            if (state.map && state.nationalBounds && state.nationalBounds.isValid()) {
                state.map.fitBounds(state.nationalBounds, { padding: [24, 24], animate: false });
            }
        });
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
                fitMapToAssets();
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
        const from = parseInt(String(el.textContent).replace(/[^\d]/g, ""), 10) || 0;
        if (from === to) { el.textContent = to.toLocaleString(); return; }
        const start = performance.now();
        const step = (now) => {
            const t = Math.min(1, (now - start) / 500);
            const eased = 1 - Math.pow(1 - t, 3);
            el.textContent = Math.round(from + (to - from) * eased).toLocaleString();
            if (t < 1) requestAnimationFrame(step);
        };
        requestAnimationFrame(step);
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

            marker.bindPopup(renderPopup(asset));
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
            iconAnchor: selected ? [19, 19] : [16, 16],
            popupAnchor: [0, -14]
        });
    }

    function refreshMarkerStyles() {
        state.markers.forEach((marker, id) => {
            const asset = state.filteredAssets.find((item) => item.id === id);
            if (asset) marker.setIcon(createMarkerIcon(asset, id === state.selectedAssetId));
        });
    }

    function renderPopup(asset) {
        return `
            <div class="popup-card">
                <h4>${escapeHtml(asset.site)}</h4>
                <p><strong>${escapeHtml(asset.id)}</strong> | ${escapeHtml(asset.type)}</p>
                <p>${escapeHtml(asset.purpose)}</p>
                <p style="color:${getStatusColor(asset.status)}">${escapeHtml(asset.status)}</p>
            </div>
        `;
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

        const marker = state.markers.get(asset.id);
        if (fly && state.map) state.map.flyTo([asset.lat, asset.lon], Math.max(state.map.getZoom(), 15), { duration: 0.85 });
        if (marker) marker.openPopup();
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
        other: "ITS",
        payment: "Toll",
        power: "Cabinet",
        printer: "Toll",
        rfid: "Toll",
        scanner: "Toll",
        server: "TOC",
        services: "ITS",
        signal: "Toll",
        software: "TOC",
        vasd: "VMS",
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

        panel.innerHTML = `
            <div class="detail-grid">
                <span>ID</span><strong>${escapeHtml(asset.id)}</strong>
                <span>Component</span><strong>${escapeHtml(asset.type)}</strong>
                <span>Corridor</span><strong>${escapeHtml(asset.corridor)}</strong>
                <span>Chainage</span><strong>${asset.km === null ? "-" : `${formatNumber(asset.km)} km`}</strong>
                <span>Priority</span><strong>${escapeHtml(asset.priority)}</strong>
                <span>Phase</span><strong>${escapeHtml(asset.phase)}</strong>
                <span>Power</span><strong>${escapeHtml(asset.power)}</strong>
                <span>Comms</span><strong>${escapeHtml(asset.comms)}</strong>
                <span>Dependency</span><strong>${escapeHtml(asset.dependency)}</strong>
                <span>Purpose</span><strong>${escapeHtml(asset.purpose)}</strong>
            </div>
            <div class="detail-actions triple">
                <button class="btn-analyze" type="button" id="selectedReadSpecBtn"><i class="fa-solid fa-table-list"></i> Specs</button>
                <button class="btn-analyze" type="button" id="selectedBOQBtn"><i class="fa-solid fa-file-invoice-dollar"></i> BOQ</button>
                <button class="btn-analyze" type="button" id="selectedDictBtn"><i class="fa-solid fa-book"></i> Dictionary</button>
            </div>
        `;

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
    function fitMapToProject() {
        if (!state.map) return;
        if (!state.projectBounds) state.projectBounds = computeProjectBounds();
        const b = state.projectBounds;
        if (b && b.isValid()) {
            // animate:false forces setView, which always applies; animated fitBounds /
            // flyToBounds silently no-op on the large national<->corridor zoom deltas here.
            state.map.fitBounds(b, { padding: [40, 40], animate: false });
        } else {
            fitMapToAssets();
        }
    }

    // Frame the project scope from the ITS assets plus the declared corridor
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
        const topics = ["ETC", "RFID", "ANPR", "AVC", "CCTV", "VMS", "ATCC", "HCI", "Cybersecurity", "Testing"];
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

    // ---- Dictionary: text-only catalogue of component definitions ----
    const DICT_PAGE = 80;
    const dictState = { term: "", category: "All", limit: DICT_PAGE };
    let dictDefs = null;
    let dictCatCounts = null;

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
                return `
                    <article class="def-item">
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
            ${summaryCard("fa-list-check", "ITS assets", state.assets.length.toLocaleString(), "Field installation register")}
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
        return String(type || "ITS").replace(/[^a-z0-9]/gi, "").slice(0, 3).toUpperCase() || "ITS";
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

    document.addEventListener("DOMContentLoaded", init);
})();
