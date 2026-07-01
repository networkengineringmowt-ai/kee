(() => {
    "use strict";

    const metadata = Array.isArray(window.FILE_METADATA) ? window.FILE_METADATA : [];
    const dataStore = window.FILE_DATA_STORE || {};
    const masterData = window.MASTER_DATA || null;
    const docsContent = window.DOCS_CONTENT || {};
    const rawItsData = window.ITS_GEOSPATIAL_DATA || window.itsData || null;
    const roadNetworkData = window.ROAD_NETWORK || null;
    const tollComponentData = Array.isArray(window.TOLL_COMPONENTS) ? window.TOLL_COMPONENTS : [];
    const dictionaryData = Array.isArray(window.DICTIONARY_DATA) ? window.DICTIONARY_DATA : [];
    const dictionaryCategories = Array.isArray(window.DICTIONARY_CATEGORIES) ? window.DICTIONARY_CATEGORIES : [];

    // ITS/ETC element media: representative internet image + YouTube demo video per
    // component category. Applied to every component in the dictionary by category so
    // each element type is illustrated and demonstrated. (Planning-grade references.)
    const IMG = {
        cam: "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=640&q=70",
        sign: "https://images.unsplash.com/photo-1616401784845-180882ba9ba8?w=640&q=70",
        toll: "https://images.unsplash.com/photo-1582298538104-fe2e74c27f59?w=640&q=70",
        road: "https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?w=640&q=70",
        control: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=640&q=70",
        fiber: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=640&q=70"
    };
    const CATEGORY_MEDIA = {
        anpr:    { icon: "fa-camera", color: "#34d399", image: IMG.cam,     video: "UxrOHCH5SdQ", query: "ANPR automatic number plate recognition tolling" },
        rfid:    { icon: "fa-wifi", color: "#22d3ee", image: IMG.toll,      video: "wbErZjLxlBM", query: "RFID electronic toll collection how it works" },
        avc:     { icon: "fa-car-side", color: "#a78bfa", image: IMG.toll,  video: "PsBmJb3tA-s", query: "automatic vehicle classification axle count toll" },
        barrier: { icon: "fa-road-barrier", color: "#fb7185", image: IMG.toll, video: "IX0rFjPuNV4", query: "toll lane automatic boom barrier" },
        vms:     { icon: "fa-display", color: "#fbbf24", image: IMG.sign,   video: "DJWBz7RjUac", query: "variable message sign highway ITS" },
        avids:   { icon: "fa-video", color: "#f59e0b", image: IMG.cam,      video: "zA_SIC6nmdM", query: "automatic video incident detection highway" },
        vasd:    { icon: "fa-gauge-high", color: "#60a5fa", image: IMG.sign, video: "IX0rFjPuNV4", query: "vehicle activated speed display radar sign" },
        wim:     { icon: "fa-weight-hanging", color: "#f97316", image: IMG.road, video: "IX0rFjPuNV4", query: "weigh in motion system highway trucks" },
        cctv:    { icon: "fa-video", color: "#38bdf8", image: IMG.cam,      video: "SXmI6AK6Vnc", query: "highway PTZ CCTV traffic surveillance camera" },
        server:  { icon: "fa-server", color: "#818cf8", image: IMG.control, video: "EkbhyTGyBGo", query: "traffic management control centre servers" },
        power:   { icon: "fa-bolt", color: "#facc15", image: IMG.control,   video: "EkbhyTGyBGo", query: "toll plaza UPS power backup system" },
        network: { icon: "fa-network-wired", color: "#2dd4bf", image: IMG.fiber, video: "EkbhyTGyBGo", query: "fibre optic network switch ITS backbone" },
        printer: { icon: "fa-print", color: "#94a3b8", image: IMG.toll,     video: "IX0rFjPuNV4", query: "toll booth thermal receipt printer" },
        console: { icon: "fa-desktop", color: "#c084fc", image: IMG.toll,   video: "IX0rFjPuNV4", query: "toll lane operator console booth" },
        comms:   { icon: "fa-tower-broadcast", color: "#4ade80", image: IMG.control, video: "EkbhyTGyBGo", query: "toll plaza intercom public address system" },
        signal:  { icon: "fa-traffic-light", color: "#fb923c", image: IMG.sign, video: "IX0rFjPuNV4", query: "toll lane traffic signal overhead lane status" },
        civil:   { icon: "fa-helmet-safety", color: "#a3a3a3", image: IMG.road, video: "IX0rFjPuNV4", query: "toll plaza gantry civil works canopy" },
        software:{ icon: "fa-code", color: "#a78bfa", image: IMG.control,   video: "EkbhyTGyBGo", query: "toll management system TMS software" },
        scanner: { icon: "fa-barcode", color: "#5eead4", image: IMG.toll,   video: "IX0rFjPuNV4", query: "toll booth document barcode scanner" },
        payment: { icon: "fa-money-bill-wave", color: "#4ade80", image: IMG.toll, video: "d-ilXg7E0L0", query: "toll payment FASTag cash lane" },
        weather: { icon: "fa-cloud-sun-rain", color: "#38bdf8", image: IMG.road, video: "EkbhyTGyBGo", query: "road weather information system RWIS" },
        enforcement: { icon: "fa-shield-halved", color: "#f87171", image: IMG.cam, video: "UxrOHCH5SdQ", query: "toll enforcement violation ANPR" },
        services:{ icon: "fa-screwdriver-wrench", color: "#cbd5e1", image: IMG.road, video: "IX0rFjPuNV4", query: "ITS installation testing commissioning" },
        other:   { icon: "fa-microchip", color: "#94a3b8", image: IMG.control, video: "IX0rFjPuNV4", query: "intelligent transport system equipment" }
    };
    function catMedia(key) { return CATEGORY_MEDIA[key] || CATEGORY_MEDIA.other; }
    const _tileCache = {};
    function catTile(key) {
        if (_tileCache[key]) return _tileCache[key];
        const m = catMedia(key);
        const label = (dictionaryCategories.find((c) => c.key === key)?.label || key).toUpperCase();
        const svg = `<svg xmlns='http://www.w3.org/2000/svg' width='320' height='200'>` +
            `<defs><linearGradient id='g' x1='0' y1='0' x2='1' y2='1'>` +
            `<stop offset='0' stop-color='${m.color}' stop-opacity='0.35'/>` +
            `<stop offset='1' stop-color='#0b0f19'/></linearGradient></defs>` +
            `<rect width='320' height='200' fill='#0b0f19'/><rect width='320' height='200' fill='url(#g)'/>` +
            `<text x='160' y='108' font-family='Outfit,Arial' font-size='16' font-weight='700' fill='#f2f1ec' ` +
            `text-anchor='middle'>${label.replace(/&/g, "and")}</text></svg>`;
        _tileCache[key] = "data:image/svg+xml;utf8," + encodeURIComponent(svg);
        return _tileCache[key];
    }

    const $ = (selector, root = document) => root.querySelector(selector);
    const $$ = (selector, root = document) => Array.from(root.querySelectorAll(selector));

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
        routeLayer: null,
        markerLayer: null,
        projectBounds: null,
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
        setupExplorer();
        setupAnalytics();
        setupGlobal();

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

        state.routeLayer = L.layerGroup().addTo(state.map);
        state.markerLayer = L.layerGroup().addTo(state.map);

        drawRoutes();
        populateMapControls();
        bindMapControls();
        renderComponentChips();
        applyMapFilters();
        fitMapToProject();
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
        $("#mapTourBtn")?.addEventListener("click", toggleMapTour);
        $("#assetTableTopBtn")?.addEventListener("click", () => $(".asset-table-wrap")?.scrollTo({ top: 0, behavior: "smooth" }));
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

        setText("#metricTotalAssets", assets.length.toLocaleString());
        setText("#metricCriticalAssets", critical.toLocaleString());
        setText("#metricCorridors", corridors.toLocaleString());
        setText("#metricMaxKm", `${formatNumber(maxKm)} km`);
        setText("#mapResultCount", assets.length.toLocaleString());
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
                <button class="btn-analyze" type="button" id="selectedReadSpecBtn"><i class="fa-solid fa-book-open"></i> Specs</button>
                <button class="btn-analyze" type="button" id="selectedDictBtn"><i class="fa-solid fa-photo-film"></i> Media</button>
                <button class="btn-analyze" type="button" id="selectedFilterBtn"><i class="fa-solid fa-filter"></i> Isolate</button>
            </div>
        `;

        $("#selectedReadSpecBtn")?.addEventListener("click", () => {
            switchView("specs");
            const reader = document.querySelector('.spec-sub-tab[data-target="specs-reader"]');
            if (reader) reader.click();
            const search = $("#specsSearchInput");
            if (search) {
                search.value = asset.type;
                search.dispatchEvent(new Event("input"));
            }
        });

        $("#selectedDictBtn")?.addEventListener("click", () => {
            switchView("explorer");
            const search = $("#mediaSearchInput");
            if (search) {
                search.value = asset.type;
                search.dispatchEvent(new Event("input"));
            }
        });

        $("#selectedFilterBtn")?.addEventListener("click", () => {
            const typeFilter = $("#mapTypeFilter");
            if (typeFilter) typeFilter.value = asset.type;
            applyMapFilters();
            setTimeout(fitMapToAssets, 80);
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
        if (state.projectBounds && state.projectBounds.isValid()) {
            state.map.fitBounds(state.projectBounds, { padding: [40, 40] });
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

    function setupSpecs() {
        // DOCS_CONTENT is a flat array of sections. Each content item is either a
        // paragraph string or a table block: { type: "table", rows: [[cell, ...], ...] }.
        const flat = (Array.isArray(docsContent) ? docsContent : []).map((section, index) => {
            const content = Array.isArray(section.content)
                ? section.content
                : (section.content ? [section.content] : []);
            return {
                id: String(section.id || `${String(section.docName || "doc").replace(/\W/g, "_")}_${index}`),
                docName: String(section.docName || "Document"),
                title: String(section.title || `Section ${index + 1}`),
                content,
                searchText: buildSpecSearchText(section.title, content)
            };
        });

        const toc = $("#specsTocContainer");
        if (toc) {
            setText("#specSectionCount", flat.length.toLocaleString());
            renderSpecTopicChips();

            const render = () => renderSpecToc(flat);
            $("#specsSearchInput")?.addEventListener("input", render);
            render();
            if (flat.length) renderSpecsContent(flat[0]);
        }

        // BOQ view: Priced BOQ / Component Register sub-tab switching
        $$(".boq-sub-tab").forEach((tab) => {
            tab.addEventListener("click", () => {
                $$(".boq-sub-tab").forEach((t) => t.classList.remove("active"));
                $$(".boq-content-pane").forEach((p) => p.classList.remove("active"));
                tab.classList.add("active");
                $("#" + tab.dataset.target)?.classList.add("active");
            });
        });

        renderBOQTable();
        renderTollComponentRegister();
        $("#componentSearchInput")?.addEventListener("input", renderTollComponentRegister);
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
            tableBody.innerHTML = `<tr><td colspan="6"><div class="empty-state compact"><i class="fa-solid fa-magnifying-glass"></i><h4>No components found</h4><p>Try another equipment, make or model.</p></div></td></tr>`;
            return;
        }

        tableBody.innerHTML = rows.map((item) => {
            const makeModel = [item.make, item.model].filter(Boolean).join(" / ");
            return `
                <tr>
                    <td>${escapeHtml(item.source || "-")}<br><small>${escapeHtml(item.level || "")}</small></td>
                    <td>${escapeHtml(item.item || "-")}</td>
                    <td>${highlightText(item.description || "-", term)}</td>
                    <td>${highlightText(makeModel || "-", term)}</td>
                    <td>${escapeHtml(item.quantity || "-")}</td>
                    <td>${escapeHtml(item.unit || "-")}</td>
                </tr>
            `;
        }).join("");
    }

    const DICT_PAGE = 60;
    const dictState = { term: "", category: "All", limit: DICT_PAGE };

    function setupExplorer() {
        renderDictCategoryRail();
        renderDictionary();

        $("#mediaSearchInput")?.addEventListener("input", () => { dictState.limit = DICT_PAGE; renderDictionary(); });
        $("#dictLoadMore")?.addEventListener("click", () => { dictState.limit += DICT_PAGE; renderDictionary(); });

        // modal close events (legacy video modal + new component modal)
        $("#closeVideoBtn")?.addEventListener("click", closeVideoModal);
        $("#videoModalBackdrop")?.addEventListener("click", closeVideoModal);
        $("#closeComponentBtn")?.addEventListener("click", closeComponentModal);
        $("#componentModalBackdrop")?.addEventListener("click", closeComponentModal);
    }

    function dictFiltered() {
        const term = dictState.term.trim().toLowerCase();
        return dictionaryData.filter((c) => {
            if (dictState.category !== "All" && c.category !== dictState.category) return false;
            if (!term) return true;
            return `${c.name} ${c.make} ${c.description} ${c.code} ${c.subsystem} ${c.location}`.toLowerCase().includes(term);
        });
    }

    function renderDictCategoryRail() {
        const rail = $("#dictCategoryRail");
        if (!rail) return;
        const chips = [{ key: "All", label: "All", count: dictionaryData.length, color: "#f2f1ec", icon: "fa-layer-group" }]
            .concat(dictionaryCategories.map((c) => ({ ...c, color: catMedia(c.key).color, icon: catMedia(c.key).icon })));
        rail.innerHTML = chips.map((c) => `
            <button class="dict-chip${c.key === dictState.category ? " active" : ""}" type="button" data-cat="${escapeAttr(c.key)}">
                <i class="fa-solid ${c.icon}" style="color:${c.color}"></i>
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
        const grid = $("#mediaGrid");
        if (!grid) return;
        dictState.term = $("#mediaSearchInput")?.value || "";
        const all = dictFiltered();
        const shown = all.slice(0, dictState.limit);

        setText("#dictCountNote", `${dictionaryData.length.toLocaleString()} components across ${dictionaryCategories.length} ETC & ITS element types — showing ${shown.length.toLocaleString()} of ${all.length.toLocaleString()}`);

        if (!all.length) {
            grid.innerHTML = `<div class="empty-state"><i class="fa-solid fa-magnifying-glass"></i><h4>No components</h4><p>Try another search term or category.</p></div>`;
        } else {
            grid.innerHTML = shown.map((c) => {
                const m = catMedia(c.category);
                const label = dictionaryCategories.find((x) => x.key === c.category)?.label || c.category;
                const sub = c.make || c.subsystem || c.location || "";
                return `
                    <article class="dict-card" data-id="${escapeAttr(c.id)}">
                        <div class="dict-card-media">
                            <img class="dict-card-img" src="${escapeAttr(m.image)}" data-cat="${escapeAttr(c.category)}" alt="${escapeAttr(label)}" loading="lazy">
                            <span class="dict-card-badge" style="background:${m.color}"><i class="fa-solid ${m.icon}"></i> ${escapeHtml(label)}</span>
                            <span class="dict-card-play"><i class="fa-solid fa-play"></i></span>
                        </div>
                        <div class="dict-card-body">
                            <h4 class="dict-card-title">${escapeHtml(c.name)}</h4>
                            <p class="dict-card-sub">${escapeHtml(sub)}</p>
                            <p class="dict-card-meta">${escapeHtml(c.code || "")}${c.code ? " · " : ""}${escapeHtml(c.source || "")}</p>
                        </div>
                    </article>`;
            }).join("");

            $$("#mediaGrid .dict-card-img").forEach((img) => img.addEventListener("error", () => {
                if (!img.dataset.fb) { img.dataset.fb = "1"; img.src = catTile(img.dataset.cat); }
            }));
            $$("#mediaGrid .dict-card").forEach((card) => card.addEventListener("click", () => {
                const comp = dictionaryData.find((x) => x.id === card.dataset.id);
                if (comp) openComponentModal(comp);
            }));
        }

        const more = $("#dictLoadMore");
        if (more) more.style.display = all.length > dictState.limit ? "inline-flex" : "none";
    }

    function openComponentModal(comp) {
        const m = catMedia(comp.category);
        const label = dictionaryCategories.find((x) => x.key === comp.category)?.label || comp.category;
        setText("#componentModalTitle", comp.name);
        const rows = [
            ["Element type", label], ["Make / model", comp.make], ["BOQ code", comp.code],
            ["Quantity", comp.qty], ["Unit", comp.unit], ["Subsystem", comp.subsystem],
            ["Location", comp.location], ["Source", comp.source]
        ].filter(([, v]) => v);
        const body = $("#componentModalBody");
        if (body) {
            body.innerHTML = `
                <div class="cmodal-video">
                    <iframe src="https://www.youtube-nocookie.com/embed/${escapeAttr(m.video)}" title="${escapeAttr(label)} demonstration"
                        frameborder="0" allow="accelerometer; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
                </div>
                <p class="cmodal-desc">${escapeHtml(comp.description || comp.name)}</p>
                <div class="cmodal-grid">
                    ${rows.map(([k, v]) => `<div><span>${escapeHtml(k)}</span><strong>${escapeHtml(String(v))}</strong></div>`).join("")}
                </div>
                <div class="cmodal-actions">
                    <a class="media-card-btn" href="https://www.youtube.com/results?search_query=${encodeURIComponent(m.query)}" target="_blank" rel="noopener"><i class="fa-brands fa-youtube"></i> More demos on YouTube</a>
                    <button class="media-card-btn ghost" type="button" id="cmodalLocate"><i class="fa-solid fa-location-dot"></i> Find on map</button>
                </div>`;
            $("#cmodalLocate")?.addEventListener("click", () => {
                closeComponentModal();
                switchView("map");
                const search = $("#mapSearchInput");
                const typeSel = $("#mapTypeFilter");
                if (typeSel) typeSel.value = "All";
                if (search) { search.value = label.split(" ")[0]; search.dispatchEvent(new Event("input")); }
                setTimeout(() => { if (state.map) { state.map.invalidateSize(); fitMapToAssets(); } }, 160);
            });
        }
        $("#componentModal")?.classList.add("active");
    }

    function closeComponentModal() {
        $("#componentModal")?.classList.remove("active");
        const body = $("#componentModalBody");
        if (body) body.innerHTML = ""; // stop video playback
    }

    function openVideoModal(videoId, title) {
        $("#videoModalTitle").textContent = title;
        $("#videoContainer").innerHTML = `<iframe src="https://www.youtube.com/embed/${videoId}?autoplay=1" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`;
        $("#videoModal").classList.add("active");
    }

    function closeVideoModal() {
        $("#videoModal").classList.remove("active");
        $("#videoContainer").innerHTML = ""; // Stop video playback
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
