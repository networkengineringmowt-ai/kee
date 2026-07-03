/* â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
   KEE Nexus v2.0 â€” Unified App Logic for GitHub Pages
   â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â• */

const geoData = window.ITS_GEOSPATIAL_DATA;
const roadNet = window.ROAD_NETWORK || null;
const docsContent = window.DOCS_CONTENT || {};


// ═══ V3.0 Boot Sequence ═══
(function runBootSequence() {
    const overlay = document.getElementById('bootSequence');
    const consoleEl = document.getElementById('bootConsole');
    const progress = document.getElementById('bootProgress');
    if (!overlay) return;

    const messages = [
        "Establishing secure connection to Data Center...",
        "Authenticating Ministry of Works & Transport credentials... [OK]",
        "Loading ITS Geospatial Matrix...",
        "Parsing Bill of Quantities...",
        "Initializing Neural Data Dictionary...",
        "System Online."
    ];

    let step = 0;
    const interval = setInterval(() => {
        if (step < messages.length) {
            const line = document.createElement('div');
            line.className = 'boot-line';
            line.textContent = `> ${messages[step]}`;
            consoleEl.appendChild(line);
            consoleEl.scrollTop = consoleEl.scrollHeight;
            progress.style.width = `${((step + 1) / messages.length) * 100}%`;
            step++;
        } else {
            clearInterval(interval);
            setTimeout(() => {
                overlay.style.opacity = '0';
                overlay.style.visibility = 'hidden';
            }, 500);
        }
    }, 400);
})();

const state = { corridor: "All", type: "All", status: "All", query: "", selectedId: null };

const typeById = Object.fromEntries(geoData.assetTypes.map(t => [t.id, t]));
const corridorById = Object.fromEntries(geoData.corridors.map(c => [c.id, c]));

// â•â•â• Navigation â•â•â•
const navItems = document.querySelectorAll('.nav-item');
const views = document.querySelectorAll('.view-section');

navItems.forEach(item => {
    item.addEventListener('click', () => {
        const v = item.getAttribute('data-view');
        navItems.forEach(n => n.classList.toggle('active', n.getAttribute('data-view') === v));
        views.forEach(view => {
            if (view.id === `${v}-view`) {
                view.classList.add('active');
                view.style.animation = 'none';
                view.offsetHeight;
                view.style.animation = 'fadeIn 0.5s cubic-bezier(0.16,1,0.3,1) forwards';
            } else {
                view.classList.remove('active');
            }
        });
        if (v === 'map') setTimeout(() => map.invalidateSize(), 100);
    });
});

// â•â•â• Map â•â•â•
const map = L.map('unifiedMap', { zoomControl: false, preferCanvas: true }).setView([0.215, 32.545], 11);
L.control.zoom({ position: 'bottomright' }).addTo(map);

// Imagery Hybrid
L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
    attribution: '&copy; Esri', maxZoom: 20
}).addTo(map);
L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/Reference/World_Boundaries_and_Places/MapServer/tile/{z}/{y}/{x}', {
    maxZoom: 20
}).addTo(map);
L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/Reference/World_Transportation/MapServer/tile/{z}/{y}/{x}', {
    maxZoom: 20
}).addTo(map);

// Road network layer
if (roadNet && roadNet.features) {
    // Glow only for scope
    const scopeFeatures = roadNet.features.filter(f => f.properties.is_scope);
    L.geoJSON(scopeFeatures, { style: { color: '#38bdf8', weight: 12, opacity: 0.08 } }).addTo(map);
    
    // Core
    L.geoJSON(roadNet.features, {
        style: f => {
            const p = f.properties;
            if (p.is_mainline) return { color: '#38bdf8', weight: 5, opacity: 1.0 }; // Highlighted Scope
            if (p.is_scope) {
                const n = (p.name || '').toLowerCase();
                if (n.includes('interchange') || n.includes('slip')) return { color: '#f59e0b', weight: 2, opacity: 0.8, dashArray: '6 4' };
                if (n.includes('bypass')) return { color: '#818cf8', weight: 3, opacity: 0.7 };
                return { color: '#94a3b8', weight: 3, opacity: 0.6 };
            }
            // Out of scope background roads
            return { color: '#334155', weight: 1, opacity: 0.15 };
        },
        onEachFeature: (f, layer) => {
            const name = f.properties.name || 'Unknown Road';
            layer.bindTooltip(name, { sticky: true, className: '' });
        }
    }).addTo(map);
}

const corridorGroup = L.layerGroup().addTo(map);
const markerGroup = L.layerGroup().addTo(map);


function animateValue(obj, start, end, duration, formatStr = false) {
    if (!obj) return;
    let startTimestamp = null;
    const step = (timestamp) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / duration, 1);
        const current = Math.floor(progress * (end - start) + start);
        obj.innerHTML = formatStr ? `$${current.toLocaleString()} Master Budget` : current.toLocaleString();
        if (progress < 1) window.requestAnimationFrame(step);
    };
    window.requestAnimationFrame(step);
}

function statusClass(s) {
    if (s === 'Design') return 'design';
    if (s === 'Planned') return 'planned';
    if (s === 'Survey required') return 'survey';
    if (s === 'Existing interface') return 'existing';
    return '';
}

function installationMatches(item) {
    const cm = state.corridor === 'All' || item.corridor === state.corridor;
    const tm = state.type === 'All' || item.type === state.type;
    const sm = state.status === 'All' || item.status === state.status;
    const hay = `${item.id} ${item.site} ${item.type} ${item.purpose} ${item.status} ${item.phase} ${item.corridor}`.toLowerCase();
    const qm = hay.includes(state.query.toLowerCase());
    return cm && tm && sm && qm;
}

function filtered() { return geoData.installations.filter(installationMatches); }
function corridorVisible(id) { return state.corridor === 'All' || state.corridor === id; }

function makeIcon(item, sel = false) {
    const t = typeById[item.type];
    return L.divIcon({
        className: '',
        html: `<div class="asset-icon ${sel ? 'selected' : ''}" style="background:${t.color}">${t.short}</div><div class="radar-pulse ${item.priority === 'Critical' ? 'critical' : ''}"></div>`,
        iconSize: sel ? [38, 38] : [30, 30],
        iconAnchor: sel ? [19, 19] : [15, 15],
        popupAnchor: [0, sel ? -20 : -16],
    });
}

function drawCorridors() {
    corridorGroup.clearLayers();
    geoData.corridors.forEach(c => {
        c.paths.forEach(p => {
            const vis = corridorVisible(c.id);
            L.polyline(p.coordinates, {
                color: c.color, weight: vis ? 5 : 3, opacity: vis ? 0.85 : 0.15,
                lineCap: 'round', lineJoin: 'round'
            }).bindTooltip(`${c.name} â€” ${p.name}`, { sticky: true }).addTo(corridorGroup);
        });
    });
}

const markerMap = new Map();
function drawMarkers() {
    markerGroup.clearLayers();
    markerMap.clear();
    filtered().forEach(item => {
        const m = L.marker([item.lat, item.lon], { icon: makeIcon(item, item.id === state.selectedId), riseOnHover: true });
        const c = corridorById[item.corridor], t = typeById[item.type];
        m.bindPopup(`<div class="popup-title">${item.id} â€” ${item.site}</div><div class="popup-meta">${c.name} Â· ${t.label}</div><div class="popup-purpose">${item.purpose}</div>`);
        m.on('click', () => selectInstallation(item.id, true));
        m.addTo(markerGroup);
        markerMap.set(item.id, m);
    });
}

function fitBounds() {
    if (state.corridor === 'All' && state.query === '' && state.type === 'All' && state.status === 'All') {
        // Explicit default extent: Bweyogerere (NE) to Entebbe Airport (SW)
        map.fitBounds([[0.045, 32.440], [0.360, 32.660]], { paddingTopLeft: [24, 80], paddingBottomRight: [24, 220] });
        return;
    }
    const b = [];
    geoData.corridors.forEach(c => { if (!corridorVisible(c.id)) return; c.paths.forEach(p => p.coordinates.forEach(pt => b.push(pt))); });
    filtered().forEach(i => b.push([i.lat, i.lon]));
    if (b.length) map.fitBounds(b, { paddingTopLeft: [24, 80], paddingBottomRight: [24, 220], maxZoom: state.corridor === 'All' ? 11 : 13 });
}

function renderCorridorFilter() {
    const w = document.getElementById('corridorFilter');
    w.innerHTML = ['All', ...geoData.corridors.map(c => c.id)]
        .map(id => `<button class="${state.corridor === id ? 'active' : ''}" data-c="${id}">${id}</button>`).join('');
    w.querySelectorAll('button').forEach(b => b.addEventListener('click', () => { state.corridor = b.dataset.c; state.selectedId = null; render(); fitBounds(); }));
}

function renderTypeFilter() {
    const w = document.getElementById('typeFilter');
    w.innerHTML = [`<button class="${state.type === 'All' ? 'active' : ''}" data-t="All">All</button>`]
        .concat(geoData.assetTypes.map(t => `<button class="${state.type === t.id ? 'active' : ''}" data-t="${t.id}">${t.short}</button>`)).join('');
    w.querySelectorAll('button').forEach(b => b.addEventListener('click', () => { state.type = b.dataset.t; state.selectedId = null; render(); }));
}

function renderLegend() {
    document.getElementById('legend').innerHTML = geoData.assetTypes.slice(0, 6)
        .map(t => `<span class="legend-item"><span class="legend-dot" style="background:${t.color}"></span>${t.short}</span>`).join('');
}

function renderSummary() {
    const rows = filtered();
    const critical = rows.filter(i => i.priority === 'Critical').length;
    const survey = rows.filter(i => i.status === 'Survey required').length;
    const planned = rows.filter(i => i.status === 'Planned' || i.status === 'Design').length;
    const cv = state.corridor === 'All' ? geoData.corridors.length : 1;
    const grid = document.getElementById('mapSummaryGrid');
    grid.innerHTML = [
        ['Assets', rows.length, `${critical} critical`],
        ['Corridors', cv, state.corridor === 'All' ? 'network view' : corridorById[state.corridor].status],
        ['Survey', survey, 'pending'],
        ['Design/Plan', planned, 'queue'],
    ].map(m => `<div class="summary-stat"><div class="num">${m[1]}</div><div class="lbl">${m[0]}</div><div class="sub">${m[2]}</div></div>`).join('');
}


function renderDetail(item) {
    const filtersPane = document.getElementById('mapFiltersPane');
    const detailsPane = document.getElementById('mapDetailsPane');
    const panel = document.getElementById('mapDetailPanel');
    
    if (!item) { 
        if (filtersPane) filtersPane.style.display = 'block';
        if (detailsPane) detailsPane.style.display = 'none';
        panel.className = 'detail-panel empty-detail'; 
        panel.innerHTML = '<i class="fa-solid fa-hand-pointer"></i><p>Click a marker on the map</p>'; 
        return; 
    }
    
    if (filtersPane) filtersPane.style.display = 'none';
    if (detailsPane) detailsPane.style.display = 'block';
    
    const t = typeById[item.type], c = corridorById[item.corridor];
    panel.className = 'detail-panel';
    panel.innerHTML = `
        <div style="border-bottom:1px solid rgba(255,255,255,0.1); padding-bottom:0.6rem; margin-bottom:0.6rem;">
            <div style="font-size:0.7rem; color:var(--text-muted); text-transform:uppercase; font-weight:700">${t.label}</div>
            <div style="font-size:1.1rem; font-weight:700; color:var(--text-h1); font-family:Outfit; margin-top:0.25rem">${item.site}</div>
            <div style="font-size:0.8rem; color:var(--text-muted); margin-top:0.15rem">${item.id} · ${c.name}</div>
        </div>
        <div class="detail-grid">
            <div class="lbl">Status</div><div class="val"><span class="status-pill ${statusClass(item.status)}">${item.status}</span></div>
            <div class="lbl">Phase</div><div class="val">${item.phase}</div>
            <div class="lbl">Priority</div><div class="val" style="color:#fb923c">${item.priority}</div>
            <div class="lbl">Chainage</div><div class="val">${Number.isFinite(item.km) ? item.km + ' km' : 'TBC'}</div>
            <div class="lbl">Power</div><div class="val">${item.power}</div>
            <div class="lbl">Comms</div><div class="val">${item.comms}</div>
        </div>
        <div style="margin-top:0.75rem; padding:0.6rem; background:rgba(0,0,0,0.2); border-radius:8px; font-size:0.8rem; color:var(--text-muted)">
            <strong style="color:var(--text-main)">Purpose:</strong> ${item.purpose}
        </div>`;
}

window.clearMapSelection = function() {
    state.selectedId = null;
    drawMarkers();
    renderDetail(null);
};

function selectInstallation(id, pan = false) {
    state.selectedId = id;
    drawMarkers();
    const item = geoData.installations.find(i => i.id === id);
    renderDetail(item);
    if (item && pan) {
        map.setView([item.lat, item.lon], Math.max(map.getZoom(), 14), { animate: true });
        const m = markerMap.get(id);
        if (m) m.openPopup();
    }
}

function renderTitle() {
    const el = document.getElementById('mapTitle');
    el.textContent = state.corridor === 'All' ? 'ITS Assets Along the Road Network' : `${corridorById[state.corridor].name} â€” ${corridorById[state.corridor].status}`;
}

function render() {
    renderCorridorFilter(); renderTypeFilter(); renderSummary(); renderTitle();
    drawCorridors(); drawMarkers();
    renderDetail(geoData.installations.find(i => i.id === state.selectedId));
}

// Filters
document.getElementById('mapStatusFilter').addEventListener('change', e => { state.status = e.target.value; state.selectedId = null; render(); });
document.getElementById('mapSearchInput').addEventListener('input', e => { state.query = e.target.value.trim(); state.selectedId = null; render(); });

// Export
function toGeoJson(rows) {
    return { type: 'FeatureCollection', features: rows.map(i => ({ type: 'Feature', geometry: { type: 'Point', coordinates: [i.lon, i.lat] }, properties: { id: i.id, corridor: i.corridor, type: i.type, site: i.site, km: i.km, status: i.status, phase: i.phase, priority: i.priority, purpose: i.purpose, power: i.power, comms: i.comms, dependency: i.dependency } })) };
}
function dlFile(name, content, mime) { const a = document.createElement('a'); a.href = URL.createObjectURL(new Blob([content], { type: mime })); a.download = name; document.body.appendChild(a); a.click(); a.remove(); }
document.getElementById('exportGeojson').addEventListener('click', () => dlFile('its-plan.geojson', JSON.stringify(toGeoJson(filtered()), null, 2), 'application/geo+json'));
document.getElementById('exportCsv').addEventListener('click', () => {
    const h = ['id','corridor','type','site','km','lat','lon','status','phase','priority','purpose','power','comms','dependency'];
    const esc = v => { const s = String(v !== null && v !== undefined ? v : ''); return /[",\n]/.test(s) ? `"${s.replace(/"/g,'""')}"` : s; };
    dlFile('its-plan.csv', [h.join(','), ...filtered().map(i => h.map(k => esc(i[k])).join(','))].join('\n'), 'text/csv');
});

// Boot map
renderLegend();
render();
fitBounds();
setTimeout(() => { map.invalidateSize(); fitBounds(); }, 300);
setTimeout(() => { map.invalidateSize(); fitBounds(); }, 1500);

// â•â•â• Specs Module â•â•â•
(
// ═══ Dictionary Table in Specs ═══
function renderSpecsDictTable(query = '') {
    const tbody = document.getElementById('specsDictTableBody');
    if (!tbody || !window.DICTIONARY_DATA) return;
    
    tbody.innerHTML = '';
    const q = query.toLowerCase();
    
    const items = window.DICTIONARY_DATA.filter(row => {
        if (!q) return true;
        return (row.name && String(row.name).toLowerCase().includes(q)) || 
               (row.definition && String(row.definition).toLowerCase().includes(q)) ||
               (row.category && String(row.category).toLowerCase().includes(q));
    });
    
    items.forEach((row, idx) => {
        const tr = document.createElement('tr');
        tr.style.borderBottom = '1px solid rgba(255,255,255,0.05)';
        tr.style.background = idx % 2 === 0 ? 'transparent' : 'rgba(255,255,255,0.02)';
        
        // Extract tags
        let tagsHtml = '';
        if (row.tags && row.tags.length) {
            tagsHtml = '<div style="margin-top:8px; display:flex; gap:6px; flex-wrap:wrap;">' + 
                row.tags.map(t => `<span style="background:rgba(56,189,248,0.1); color:#38bdf8; font-size:10px; padding:2px 6px; border-radius:10px;">${t}</span>`).join('') + 
                '</div>';
        }
        
        // Find if spec doc exists
        let hasSpecDoc = false;
        const rc = String(row.name).toLowerCase();
        if (window.DOCS_CONTENT) {
            for (let docKey in window.DOCS_CONTENT) {
                const found = window.DOCS_CONTENT[docKey].find(s => {
                    const st = s.title ? String(s.title).toLowerCase() : '';
                    return st && (st.includes(rc) || rc.includes(st));
                });
                if (hasSpecDoc) break;
            }
        }
        
        tr.innerHTML = `
            <td style="padding: 1rem 1.5rem; vertical-align: top;">
                <div style="font-weight: 600; font-size: 0.95rem; color: #facc15;">${row.name || 'Unknown'}</div>
                <div style="font-size: 0.75rem; color: #94a3b8; margin-top: 4px;">Category: ${row.category || 'N/A'}</div>
                ${tagsHtml}
            </td>
            <td style="padding: 1rem 1.5rem; font-size: 0.85rem; color: #cbd5e1; max-width: 500px; white-space: normal; line-height: 1.5; vertical-align: top;">
                ${row.definition || 'No definition provided.'}
                ${row.purpose ? `<div style="margin-top:6px;"><strong style="color:#a78bfa;">Purpose:</strong> ${row.purpose}</div>` : ''}
            </td>
            <td style="padding: 1rem 1.5rem; text-align: center; vertical-align: top;">
                <button title="View in Specs" style="background: rgba(234, 179, 8, 0.1); color: #eab308; border: 1px solid rgba(234, 179, 8, 0.2); border-radius: 4px; padding: 6px 10px; cursor: pointer;">
                    <i class="fa-solid fa-book-open-reader"></i>
                </button>
            </td>
        `;
        tbody.appendChild(tr);
    });
}
const dictSearch = document.getElementById('specsDictSearch');
if (dictSearch) dictSearch.addEventListener('input', e => renderSpecsDictTable(e.target.value));

function setupSpecs() {
    const tocContainer = document.getElementById('specsTocContainer');
    const searchInput = document.getElementById('specsSearchInput');
    if (!tocContainer || !docsContent || Object.keys(docsContent).length === 0) return;

    let flatToc = [];
    Object.keys(docsContent).forEach(docName => {
        docsContent[docName].forEach((sec, idx) => {
            flatToc.push({ docName, title: sec.title, content: sec.content, id: `sec_${docName.replace(/\W/g,'')}_${idx}` });
        });
    });

    function renderTOC(term = '') {
        tocContainer.innerHTML = '';
        const t = term.toLowerCase();
        const grouped = {};
        flatToc.forEach(item => {
            const tm = item.title.toLowerCase().includes(t);
            const cm = item.content.some(c => c.toLowerCase().includes(t));
            if (t === '' || tm || cm) {
                if (!grouped[item.docName]) grouped[item.docName] = [];
                grouped[item.docName].push(item);
            }
        });
        Object.keys(grouped).forEach(docName => {
            const g = document.createElement('div'); g.className = 'doc-group';
            let clean = docName.replace('.docx', '').replace(/_/g, ' ');
            g.innerHTML = `<div class="doc-title"><i class="fa-solid fa-file-lines"></i> ${clean}</div>`;
            const ul = document.createElement('ul'); ul.className = 'toc-list';
            grouped[docName].forEach(item => {
                const li = document.createElement('li'); li.className = 'toc-item'; li.textContent = item.title; li.title = item.title;
                li.onclick = () => {
                    document.querySelectorAll('.toc-item').forEach(el => el.classList.remove('active'));
                    li.classList.add('active');
                    renderContent(item);
                };
                ul.appendChild(li);
            });
            g.appendChild(ul); tocContainer.appendChild(g);
        });
        if (!Object.keys(grouped).length) tocContainer.innerHTML = '<div style="color:var(--text-muted);text-align:center;padding:2rem">No matches</div>';
    }

    function renderContent(item) {
        const area = document.getElementById('specsContent');
        const bc = document.getElementById('specsBreadcrumb');
        bc.innerHTML = `${item.docName.replace('.docx','').replace(/_/g,' ')} &gt; <span>${item.title}</span>`;
        let html = `<h2>${item.title}</h2>`;
        item.content.forEach(p => { html += `<p>${p}</p>`; });
        area.innerHTML = html;
        area.scrollTop = 0;
    }

    renderTOC();
    if (searchInput) searchInput.addEventListener('input', e => renderTOC(e.target.value));
})();



// ═══ Georeferenced RSS Catalogue ═══
window.RSS_CATALOGUE = [
    {
        component: "High-Speed Weigh-In-Motion (HS-WIM)",
        subcomponents: ["PTZ Cameras", "Data Logger Cabinet", "ANPR System"],
        location: "KNBP: Namboole - Gayaza (Km 12+400)",
        lat: 0.3541,
        lon: 32.6122,
        justification: "Critical deployment. AADT: 27,000 | Heavy M-Class Freight: 4,800. Required to prevent rapid pavement degradation."
    },
    {
        component: "Automatic Traffic Counter (ATC)",
        subcomponents: ["PTZ Surveillance Camera", "Microwave Radar Sensor", "Solar Power Array", "4G LTE Modem"],
        location: "KNBP: Gayaza - Hoima (Km 18+200)",
        lat: 0.3421,
        lon: 32.5518,
        justification: "Peak congestion zone. AADT: 30,000 | Heavy M-Class: 4,500. Needed for dynamic flow analysis."
    },
    {
        component: "Road Weather Information System (RWIS)",
        subcomponents: ["PTZ Monitoring Camera", "Anemometer", "Pavement Surface Temp Sensor", "Visibility Sensor (Fog)"],
        location: "KNBP: Hoima - Busega (Km 28+500)",
        lat: 0.3155,
        lon: 32.5188,
        justification: "High volume + low visibility risk. AADT: 32,000 | Heavy M-Class: 5,500."
    },
    {
        component: "Low-Speed Weigh-In-Motion (LS-WIM)",
        subcomponents: ["PTZ Validation Camera", "Load Cells", "Variable Message Sign (VMS)", "Classification Scanner"],
        location: "KEE: Busega Interchange Slip",
        lat: 0.3094,
        lon: 32.5152,
        justification: "Major freight choke point transferring to KEE. Heavy M-Class validation."
    },
    {
        component: "Multi-Lane Free Flow (MLFF) Sensor Array",
        subcomponents: ["PTZ Verification Camera", "ETC Antennas", "Laser Profiler", "Front/Rear ANPR"],
        location: "KEE: Munyonyo Spur (Km 4+100)",
        lat: 0.2589,
        lon: 32.6111,
        justification: "Toll validation and traffic profiling."
    }
];

function renderRSSCatalogue(query = '') {
    const tbody = document.getElementById('rssTableBody');
    if (!tbody || !window.RSS_CATALOGUE) return;
    
    tbody.innerHTML = '';
    const q = query.toLowerCase();
    
    const items = window.RSS_CATALOGUE.filter(row => {
        if (!q) return true;
        return (row.component && row.component.toLowerCase().includes(q)) || 
               (row.location && row.location.toLowerCase().includes(q)) ||
               (row.justification && row.justification.toLowerCase().includes(q));
    });
    
    items.forEach((row, idx) => {
        const tr = document.createElement('tr');
        tr.style.borderBottom = '1px solid rgba(255,255,255,0.05)';
        tr.style.background = idx % 2 === 0 ? 'transparent' : 'rgba(255,255,255,0.02)';
        
        let subcompHtml = '<div style="margin-top:6px; display:flex; gap:4px; flex-wrap:wrap;">';
        row.subcomponents.forEach(sc => {
            subcompHtml += `<span style="background:rgba(234, 179, 8, 0.1); color:#eab308; font-size:10px; padding:2px 6px; border-radius:4px; border:1px solid rgba(234,179,8,0.2);">${sc}</span>`;
        });
        subcompHtml += '</div>';
        
        const safeComponent = String(row.component).replace(/'/g, "\'");
        
        tr.innerHTML = `
            <td style="padding: 1rem 1.5rem; vertical-align: top;">
                <div style="font-weight: 600; font-size: 0.95rem; color: #38bdf8;">${row.component}</div>
                ${subcompHtml}
            </td>
            <td style="padding: 1rem 1.5rem; vertical-align: top; color: #cbd5e1; font-size: 0.85rem;">
                <i class="fa-solid fa-map-pin" style="color:#facc15;"></i> ${row.location}
            </td>
            <td style="padding: 1rem 1.5rem; vertical-align: top; text-align: right; font-family: monospace; color: #94a3b8; font-size: 0.8rem;">
                ${row.lat.toFixed(4)}, ${row.lon.toFixed(4)}
            </td>
            <td style="padding: 1rem 1.5rem; vertical-align: top; font-size: 0.85rem; color: #cbd5e1; max-width: 300px; white-space: normal; line-height: 1.4;">
                ${row.justification}
            </td>
            <td style="padding: 1rem 1.5rem; vertical-align: top; text-align: center;">
                <button onclick="navigateToTab('map', '${safeComponent}')" title="View on Map" style="background: rgba(16, 185, 129, 0.1); color: #10b981; border: 1px solid rgba(16, 185, 129, 0.2); border-radius: 4px; padding: 6px 10px; cursor: pointer;">
                    <i class="fa-solid fa-location-crosshairs"></i>
                </button>
            </td>
        `;
        tbody.appendChild(tr);
    });
}
const rssSearchInput = document.getElementById('rssSearch');
if (rssSearchInput) rssSearchInput.addEventListener('input', e => renderRSSCatalogue(e.target.value));

function renderBOQ() {
    const tbody = document.getElementById('boqTableBody');
    const totalEl = document.getElementById('boqTotalSum');
    if (!tbody || !window.BOQ_DATA) return;
    
    tbody.innerHTML = '';
    let grandTotal = 0;
    
    function strToNum(str) {
        if (!str) return 0;
        const clean = String(str).replace(/[^0-9.-]+/g,"");
        return parseFloat(clean) || 0;
    }
    
    window.BOQ_DATA.forEach(row => {
        const amt = parseFloat(strToNum(row.total_cost_usd));
        if (row.is_header && !isNaN(amt)) grandTotal += amt;
        
        const tr = document.createElement('tr');
        tr.className = 'stagger-row';
        tr.style.animationDelay = `${(tbody.children.length % 20) * 0.05}s`;
        tr.style.borderBottom = '1px solid rgba(255,255,255,0.05)';
        if (row.is_header) {
            tr.style.background = 'rgba(56, 189, 248, 0.05)';
        }
        
        const idCol = row.is_header ? `<strong style="color:var(--primary); font-size:0.9rem;">${row.level_id}</strong>` : `<span style="padding-left:1.5rem; font-size:0.75rem; color:var(--text-muted)">${row.level_id || '-'}</span>`;
        const costCol = row.unit_cost_usd ? `$${parseFloat(strToNum(row.unit_cost_usd)).toLocaleString()}` : `<span style="color:var(--text-muted)">-</span>`;
        const totalCol = row.total_cost_usd ? `<strong style="color:#e2e8f0">$${parseFloat(strToNum(row.total_cost_usd)).toLocaleString()}</strong>` : `<span style="color:var(--text-muted)">-</span>`;
        
        const x_lon = row.x_lon !== undefined ? row.x_lon.toFixed(5) : '-';
        const y_lat = row.y_lat !== undefined ? row.y_lat.toFixed(5) : '-';
        
        tr.innerHTML = `
            <td style="padding: 0.8rem 1.5rem; font-family: monospace;">${idCol}</td>
            <td style="padding: 0.8rem 1.5rem;">
                <div style="font-weight: ${row.is_header ? '700' : '500'}; font-size: ${row.is_header ? '0.9rem' : '0.85rem'}; color: ${row.is_header ? 'var(--text-h1)' : '#cbd5e1'}; margin-bottom: 0.2rem;">${row.component || '-'}</div>
                <div style="font-size: 0.75rem; color: var(--text-muted);"><i class="fa-solid fa-location-dot"></i> ${row.site}</div>
            </td>
            <td style="padding: 0.8rem 1.5rem; font-size: 0.8rem; color: #94a3b8; max-width: 300px; line-height: 1.4;">${row.spec || '-'}</td>
            <td style="padding: 0.8rem 1.5rem; text-align: right; font-weight: 600; font-size: 0.85rem;">${row.qty || '-'}</td>
            <td style="padding: 0.8rem 1.5rem; text-align: right; font-family: monospace; font-size: 0.75rem; color: var(--text-muted);">
                ${x_lon}<br>${y_lat}
            </td>
            <td style="padding: 0.8rem 1.5rem; text-align: right; font-size:0.85rem; color: #94a3b8;">${costCol}</td>
            <td style="padding: 0.8rem 1.5rem; text-align: right; font-size:0.85rem;">${totalCol}</td>
        `;
        tbody.appendChild(tr);
    });
    
    
    totalEl.textContent = `$${grandTotal.toLocaleString()} Master Budget`;
    animateValue(totalEl, 0, grandTotal, 1500, true);

    // V3.0 Chart.js Analytics
    setTimeout(() => {
        const categories = {};
        const quantities = {};
        window.BOQ_DATA.forEach(row => {
            if (!row.is_header && row.unit_cost_usd) {
                let cat = "Other";
                if (row.component.includes("CCTV") || row.component.includes("Camera")) cat = "Surveillance";
                else if (row.component.includes("Cable") || row.component.includes("Fiber")) cat = "Fiber & Comms";
                else if (row.component.includes("Gantry") || row.component.includes("VMS") || row.component.includes("Sign")) cat = "Signage & Gantries";
                else if (row.component.includes("Server") || row.component.includes("Software") || row.component.includes("Center")) cat = "Control Center";
                else if (row.component.includes("Civil") || row.component.includes("Trench")) cat = "Civil Works";
                else if (row.component.includes("Cabinet") || row.component.includes("Power")) cat = "Power & Cabinets";
                
                const amt = parseFloat(String(row.total_cost_usd).replace(/[^0-9.-]+/g,"")) || 0;
                categories[cat] = (categories[cat] || 0) + amt;
                quantities[cat] = (quantities[cat] || 0) + (parseFloat(row.qty) || 1);
            }
        });

        const ctxD = document.getElementById('boqDoughnutChart');
        const ctxB = document.getElementById('boqBarChart');
        const ctxL = document.getElementById('trafficLineChart');
        
        // Vibrant Glassmorphism Colors
        const vibrantColors = [
            'hsl(330, 100%, 65%)', // Pink
            'hsl(280, 100%, 65%)', // Purple
            'hsl(190, 100%, 55%)', // Cyan
            'hsl(150, 100%, 50%)', // Green
            'hsl(45, 100%, 55%)',  // Yellow
            'hsl(10, 100%, 60%)',  // Orange
            'hsl(220, 100%, 70%)'  // Blue
        ];

        if (ctxD && window.Chart && !window._boqChartD) {
            window._boqChartD = new Chart(ctxD, {
                type: 'doughnut',
                data: {
                    labels: Object.keys(categories),
                    datasets: [{
                        data: Object.values(categories),
                        backgroundColor: vibrantColors,
                        borderWidth: 2,
                        borderColor: '#0f172a',
                        hoverOffset: 10
                    }]
                },
                options: { 
                    responsive: true, maintainAspectRatio: false,
                    plugins: { 
                        legend: { position: 'bottom', labels: { color: '#e2e8f0', font: { family: 'Inter', size: 11 }, padding: 15 } },
                        title: { display: true, text: 'Budget Distribution ($)', color: '#fff', font: { size: 16, weight: '600' }, padding: {bottom: 20} }
                    }
                }
            });
        } else if (window._boqChartD) {
            window._boqChartD.data.labels = Object.keys(categories);
            window._boqChartD.data.datasets[0].data = Object.values(categories);
            window._boqChartD.update();
        }

        if (ctxB && window.Chart && !window._boqChartB) {
            window._boqChartB = new Chart(ctxB, {
                type: 'bar',
                data: {
                    labels: Object.keys(quantities),
                    datasets: [{
                        label: 'Component Quantity',
                        data: Object.values(quantities),
                        backgroundColor: 'hsl(190, 100%, 55%)',
                        borderColor: 'hsl(190, 100%, 75%)',
                        borderWidth: 1,
                        borderRadius: 6
                    }]
                },
                options: {
                    responsive: true, maintainAspectRatio: false,
                    scales: {
                        y: { 
                            ticks: { color: '#cbd5e1', font: {family:'Inter'} }, 
                            grid: { color: 'rgba(255,255,255,0.08)' },
                            beginAtZero: true
                        },
                        x: { 
                            ticks: { 
                                color: '#cbd5e1', 
                                font: {family:'Inter'},
                                autoSkip: false,
                                maxRotation: 45,
                                minRotation: 45
                            }, 
                            grid: { display: false } 
                        }
                    },
                    plugins: {
                        legend: { display: false },
                        title: { display: true, text: 'Asset Quantity Distribution', color: '#fff', font: { size: 16, weight: '600' }, padding: {bottom: 20} }
                    }
                }
            });
        } else if (window._boqChartB) {
            window._boqChartB.data.labels = Object.keys(quantities);
            window._boqChartB.data.datasets[0].data = Object.values(quantities);
            window._boqChartB.update();
        }

        if (ctxL && window.Chart && !window._boqChartL) {
            window._boqChartL = new Chart(ctxL, {
                type: 'line',
                data: {
                    labels: ['Namboole-Gayaza', 'Gayaza-Hoima', 'Hoima-Busega'],
                    datasets: [
                        {
                            label: 'Total AADT',
                            data: [27000, 30000, 32000],
                            borderColor: 'hsl(330, 100%, 65%)',
                            backgroundColor: 'rgba(255, 51, 153, 0.1)',
                            borderWidth: 3,
                            fill: true,
                            tension: 0.4
                        },
                        {
                            label: 'M-Class (Heavy/Freight)',
                            data: [4800, 4500, 5500],
                            borderColor: 'hsl(45, 100%, 55%)',
                            backgroundColor: 'rgba(255, 204, 0, 0.1)',
                            borderWidth: 3,
                            fill: true,
                            tension: 0.4
                        }
                    ]
                },
                options: {
                    responsive: true, maintainAspectRatio: false,
                    interaction: { mode: 'index', intersect: false },
                    scales: {
                        y: { 
                            ticks: { color: '#cbd5e1', font: {family:'Inter'} }, 
                            grid: { color: 'rgba(255,255,255,0.08)' } 
                        },
                        x: { 
                            ticks: { color: '#cbd5e1', font: {family:'Inter'} }, 
                            grid: { display: false } 
                        }
                    },
                    plugins: {
                        legend: { position: 'bottom', labels: { color: '#e2e8f0' } },
                        title: { display: true, text: 'M-Class Traffic Demand (RSS Justification)', color: '#fff', font: { size: 16, weight: '600' }, padding: {bottom: 20} }
                    }
                }
            });
        }
    }, 100);


}
renderBOQ();
renderRSSCatalogue();

// ═══ Data Dictionary ═══
function renderDictionary(query = '') {
    const grid = document.getElementById('dictionaryGrid');
    if (!grid || !window.DICTIONARY_DATA) return;
    
    grid.innerHTML = '';
    const q = query.toLowerCase();
    
    // Filter items (limit to 100 for performance if no query)
    const filtered = window.DICTIONARY_DATA.filter(item => {
        if (!q) return true;
        return item.name.toLowerCase().includes(q) || 
               item.category.toLowerCase().includes(q) || 
               item.description.toLowerCase().includes(q);
    });
    
    const displayItems = q ? filtered : filtered.slice(0, 100);
    
    displayItems.forEach(item => {
        const card = document.createElement('div');
        card.className = 'dict-card stagger-row';
        card.style.animationDelay = `${(i % 12) * 0.05}s`;
        
        let mediaHtml = '';
        if (item.video) {
            mediaHtml = `
                <div class="dict-media">
                    <span class="media-badge"><i class="fa-brands fa-youtube"></i> Video Demo</span>
                    <iframe src="${item.video}?modestbranding=1&rel=0" allowfullscreen></iframe>
                </div>`;
        } else if (item.image) {
            mediaHtml = `
                <div class="dict-media">
                    <img src="${item.image}" alt="${item.name}" loading="lazy">
                </div>`;
        }
        
        card.innerHTML = `
            ${mediaHtml}
            <div class="dict-content">
                <div class="dict-cat">${item.category}</div>
                <div class="dict-title">${item.name}</div>
                <div class="dict-desc">${item.description}</div>
                <div class="dict-footer">
                    <span><i class="fa-solid fa-server"></i> ITS Network Component</span>
                    <span class="dict-id">${item.id}</span>
                </div>
            </div>
        `;
        grid.appendChild(card);
    });
    
    if (filtered.length === 0) {
        grid.innerHTML = '<div style="color:var(--text-muted);grid-column:1/-1;text-align:center;padding:3rem;">No components found matching your search.</div>';
    } else if (!q && filtered.length > 100) {
        const more = document.createElement('div');
        more.style.cssText = 'grid-column:1/-1;text-align:center;padding:2rem;color:var(--text-muted)';
        more.innerHTML = `Showing 100 of ${filtered.length} components. Use search to find specific items.`;
        grid.appendChild(more);
renderBOQ();
renderRSSCatalogue();

// ═══ Data Dictionary ═══
function renderDictionary(query = '') {
    const grid = document.getElementById('dictionaryGrid');
    if (!grid || !window.DICTIONARY_DATA) return;
    
    grid.innerHTML = '';
    const q = query.toLowerCase();
    
    // Filter items (limit to 100 for performance if no query)
    const filtered = window.DICTIONARY_DATA.filter(item => {
        if (!q) return true;
        return item.name.toLowerCase().includes(q) || 
               item.category.toLowerCase().includes(q) || 
               item.description.toLowerCase().includes(q);
    });
    
    const displayItems = q ? filtered : filtered.slice(0, 100);
    
    displayItems.forEach(item => {
        const card = document.createElement('div');
        card.className = 'dict-card stagger-row';
        card.style.animationDelay = `${(i % 12) * 0.05}s`;
        
        let mediaHtml = '';
        if (item.video) {
            mediaHtml = `
                <div class="dict-media">
                    <span class="media-badge"><i class="fa-brands fa-youtube"></i> Video Demo</span>
                    <iframe src="${item.video}?modestbranding=1&rel=0" allowfullscreen></iframe>
                </div>`;
        } else if (item.image) {
            mediaHtml = `
                <div class="dict-media">
                    <img src="${item.image}" alt="${item.name}" loading="lazy">
                </div>`;
        }
        
        card.innerHTML = `
            ${mediaHtml}
            <div class="dict-content">
                <div class="dict-cat">${item.category}</div>
                <div class="dict-title">${item.name}</div>
                <div class="dict-desc">${item.description}</div>
                <div class="dict-footer">
                    <span><i class="fa-solid fa-server"></i> ITS Network Component</span>
                    <span class="dict-id">${item.id}</span>
                </div>
            </div>
        `;
        grid.appendChild(card);
    });
    
    if (filtered.length === 0) {
        grid.innerHTML = '<div style="color:var(--text-muted);grid-column:1/-1;text-align:center;padding:3rem;">No components found matching your search.</div>';
    } else if (!q && filtered.length > 100) {
        const more = document.createElement('div');
        more.style.cssText = 'grid-column:1/-1;text-align:center;padding:2rem;color:var(--text-muted)';
        more.innerHTML = `Showing 100 of ${filtered.length} components. Use search to find specific items.`;
        grid.appendChild(more);
    }
}

renderDictionary();
const dictSearch = document.getElementById('dictSearch');
if (dictSearch) {
    dictSearch.addEventListener('input', e => renderDictionary(e.target.value));
}

// ═══ Unified Cross-Linking Engine ═══
window.navigateToTab = function(tabId, query = '') {
    // 1. Switch the active view
    document.querySelectorAll('.view-section').forEach(sec => sec.classList.remove('active'));
    document.querySelectorAll('.nav-item').forEach(item => item.classList.remove('active'));
    
    const targetSection = document.getElementById(`${tabId}-view`);
    const targetNav = document.querySelector(`[data-view="${tabId}"]`);
    
    if (targetSection) targetSection.classList.add('active');
    if (targetNav) targetNav.classList.add('active');
    
    // 2. Route the query to the appropriate engine
    if (query) {
        if (tabId === 'map') {
            const searchInput = document.getElementById('mapSearchInput');
            if (searchInput) {
                searchInput.value = query;
                searchInput.dispatchEvent(new Event('input'));
            }
        } else if (tabId === 'dictionary') {
            const dictSearchBox = document.getElementById('dictSearch');
            if (dictSearchBox) {
                dictSearchBox.value = query;
                renderDictionary(query);
            }
        } else if (tabId === 'boq') {
            const procSearch = document.getElementById('procurementSearch');
            if (procSearch) {
                procSearch.value = query;
                if (typeof renderProcurementTable === 'function') renderProcurementTable(query);
            }
        } else if (tabId === 'specs') {
            const specsSearch = document.getElementById('specsSearchInput');
            if (specsSearch) {
                specsSearch.value = query;
                if (typeof renderTOC === 'function') renderTOC(query);
            }
        }
    }
    
    // Scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });
};

// ═══ Master Procurement Table ═══
function renderProcurementTable(query = '') {
    const tbody = document.getElementById('procurementTableBody');
    if (!tbody || !window.BOQ_DATA) return;
    
    tbody.innerHTML = '';
    const q = query.toLowerCase();
    
    // Filter BOQ data
    const items = window.BOQ_DATA.filter(row => {
        if (row.is_header) return false; // Only show actual components, not headers
        if (!row.component) return false;
        const rc = String(row.component).toLowerCase();
        if (!q) return true;
        return rc.includes(q) || 
               (row.spec && String(row.spec).toLowerCase().includes(q)) || 
               (row.site && String(row.site).toLowerCase().includes(q));
    });
    
    items.forEach(row => {
        const rc = String(row.component).toLowerCase();
        // Try to find matching dictionary item for category
        let dictItem = null;
        if (window.DICTIONARY_DATA) {
            dictItem = window.DICTIONARY_DATA.find(d => {
                const dn = d.name ? String(d.name).toLowerCase() : '';
                return dn && (dn.includes(rc) || rc.includes(dn));
            });
        }
        const category = dictItem ? dictItem.category : 'Field Equipment';
        
        const tr = document.createElement('tr');
        tr.className = 'stagger-row';
        tr.style.animationDelay = `${(tbody.children.length % 20) * 0.05}s`;
        tr.style.borderBottom = '1px solid rgba(255,255,255,0.05)';
        
        // Find if spec doc exists
        let hasSpecDoc = false;
        if (window.DOCS_CONTENT) {
            for (let docKey in window.DOCS_CONTENT) {
                const found = window.DOCS_CONTENT[docKey].find(s => {
                    const st = s.title ? String(s.title).toLowerCase() : '';
                    return st && (st.includes(rc) || rc.includes(st));
                });
                if (found) { hasSpecDoc = true; break; }
            }
        }
        
        const safeComponent = String(row.component).replace(/'/g, "\\'");
        
        tr.innerHTML = `
            <td style="padding: 1rem 1.5rem;">
                <div style="font-weight: 600; font-size: 0.9rem; color: var(--text-h1); margin-bottom: 0.2rem;">${row.component}</div>
                <div style="font-size: 0.75rem; color: var(--text-muted);"><i class="fa-solid fa-location-dot"></i> ${row.site || 'Various Locations'}</div>
            </td>
            <td style="padding: 1rem 1.5rem;">
                <span class="status-pill existing" style="background: rgba(56,189,248,0.1); color: #38bdf8; border: 1px solid rgba(56,189,248,0.2);">${category}</span>
            </td>
            <td style="padding: 1rem 1.5rem; text-align: right; font-weight: 600; font-size: 0.95rem; color: #fff;">
                ${row.qty || '-'}
                <div style="font-size: 0.7rem; color: var(--text-muted); font-weight: normal; margin-top: 2px;">$${row.unit_cost_usd || '0'} ea</div>
            </td>
            <td style="padding: 1rem 1.5rem; font-size: 0.8rem; color: #94a3b8; max-width: 300px; white-space: normal; line-height: 1.4;">
                ${row.spec || 'Standard ITS Specification'}
                ${hasSpecDoc ? `<div style="margin-top: 5px; color: var(--primary); font-size: 0.75rem;"><i class="fa-solid fa-file-contract"></i> Full spec found in manuals</div>` : ''}
            </td>
            <td style="padding: 1rem 1.5rem; text-align: center;">
                <div style="display: flex; gap: 8px; justify-content: center;">
                    <button onclick="navigateToTab('map', '${safeComponent}')" title="View on Map" style="background: rgba(16, 185, 129, 0.1); color: #10b981; border: 1px solid rgba(16, 185, 129, 0.2); border-radius: 4px; padding: 6px 10px; cursor: pointer; transition: 0.2s;">
                        <i class="fa-solid fa-map-location-dot"></i>
                    </button>
                    <button onclick="navigateToTab('dictionary', '${safeComponent}')" title="View Data Dictionary" style="background: rgba(139, 92, 246, 0.1); color: #8b5cf6; border: 1px solid rgba(139, 92, 246, 0.2); border-radius: 4px; padding: 6px 10px; cursor: pointer; transition: 0.2s;">
                        <i class="fa-solid fa-book-atlas"></i>
                    </button>
                    ${hasSpecDoc ? `<button onclick="navigateToTab('specs', '${safeComponent}')" title="Read Technical Spec" style="background: rgba(234, 179, 8, 0.1); color: #eab308; border: 1px solid rgba(234, 179, 8, 0.2); border-radius: 4px; padding: 6px 10px; cursor: pointer; transition: 0.2s;"><i class="fa-solid fa-book-open-reader"></i></button>` : ''}
                </div>
            </td>
        `;
        tbody.appendChild(tr);
    });
}

// Hook up search
const procSearch = document.getElementById('procurementSearch');
if (procSearch) procSearch.addEventListener('input', e => renderProcurementTable(e.target.value));

renderProcurementTable();
renderSpecsDictTable();

}
}


// ═══ Accident Hotspot Layer ═══
let accidentLayer = null;
const accToggle = document.getElementById('toggleAccidents');

function renderAccidents() {
    if (accidentLayer) { map.removeLayer(accidentLayer); accidentLayer = null; }
    if (!accToggle || !accToggle.checked || !window.ACCIDENT_DATA) return;
    
    accidentLayer = L.featureGroup().addTo(map);
    window.ACCIDENT_DATA.incidents.forEach(acc => {
        if (!acc.lat || !acc.lon) return;
        
        let color = '#fb923c'; // Minor
        let radius = 4;
        if (acc.severity === 'Damage Only') { color = '#facc15'; radius = 3; }
        if (acc.severity === 'Severe Injury') { color = '#ef4444'; radius = 6; }
        if (acc.severity === 'Fatal') { color = '#a855f7'; radius = 8; }
        
        const circle = L.circleMarker([acc.lat, acc.lon], {
            radius: radius,
            fillColor: color,
            color: '#fff',
            weight: 1,
            opacity: 1,
            fillOpacity: 0.8
        });
        
        const content = `
            <div style="font-family:Inter; min-width:200px;">
                <div style="font-weight:700; color:${color}; font-size:14px; margin-bottom:4px;"><i class="fa-solid fa-car-burst"></i> ${acc.severity}</div>
                <div style="font-size:12px; color:#94a3b8; margin-bottom:8px;">${acc.date} | ${acc.hour_band} | Chainage: ${acc.chainage}</div>
                <div style="font-size:12px; margin-bottom:4px;"><strong>Vehicles:</strong> ${acc.dominant_vehicle} (${acc.vehicles})</div>
                <div style="font-size:12px; margin-bottom:4px;"><strong>Casualties:</strong> ${acc.casualties}</div>
                <div style="font-size:12px; margin-bottom:8px;"><strong>Response Time:</strong> ${acc.response_band}</div>
                <div style="background:rgba(255,255,255,0.05); padding:6px; border-radius:4px; font-size:11px; color:#cbd5e1;">
                    <em>Justification:</em> High accident frequency at this chainage strongly validates the requirement for CCTV coverage and VMS warning systems to improve incident response times.
                </div>
            </div>
        `;
        circle.bindPopup(content, {className: 'glass-popup'});
        circle.addTo(accidentLayer);
    });
}

if (accToggle) {
    accToggle.addEventListener('change', renderAccidents);
}

// Hook into existing render
const originalRender = render;
render = function() {
    originalRender();
    renderAccidents();
};



// ═══ Physical Road Network Layer ═══
let networkLayer = null;
const netToggle = document.getElementById('toggleNetwork');

function renderNetwork() {
    if (networkLayer) { map.removeLayer(networkLayer); networkLayer = null; }
    if (!netToggle || !netToggle.checked || !window.ROAD_NETWORK) return;
    
    networkLayer = L.geoJSON(window.ROAD_NETWORK, {
        style: function (feature) {
            return {
                color: '#38bdf8',
                weight: 6,
                opacity: 0.6,
                className: 'route-line'
            };
        },
        onEachFeature: function (feature, layer) {
            if (feature.properties && feature.properties.Link_Name) {
                let statsHtml = '';
                if (feature.properties.User_Stats) {
                    statsHtml = `
                    <div style="margin-top:8px; border-top:1px solid rgba(255,255,255,0.1); padding-top:8px; font-size:11px; color:#cbd5e1;">
                        <strong style="color:#facc15;"><i class="fa-solid fa-satellite-dish"></i> RSS Placement Justification</strong><br>
                        <em>Traffic Volumes (AADT):</em><br>
                        • Namboole-Gayaza: 27k, 4.8k, 5.1k<br>
                        • Gayaza-Hoima: 30k, 4.5k, 4.7k<br>
                        • Hoima-Busega: Pending<br>
                        <br>
                        <span style="color:#94a3b8;">High traffic volumes along the KNBP corridor directly justify the strategic placement of Road Sensor System (RSS) components to optimize traffic monitoring and weight compliance.</span>
                    </div>`;
                }
                layer.bindPopup(`<div style="font-family:Inter; font-weight:700; color:#38bdf8;">${feature.properties.Link_Name}</div><div style="font-size:12px; color:#94a3b8;">Physical ArcGIS Road Segment</div>${statsHtml}`, {className: 'glass-popup'});
            }
        }
    }).addTo(map);
    
    // Create a drop shadow effect (underlay)
    const shadowLayer = L.geoJSON(window.ROAD_NETWORK, {
        style: function (feature) {
            return {
                color: '#070e18',
                weight: 12,
                opacity: 0.3,
                className: 'route-shadow'
            };
        },
        interactive: false
    });
    
    // Group them
    networkLayer = L.layerGroup([shadowLayer, networkLayer]).addTo(map);
}

if (netToggle) {
    netToggle.addEventListener('change', renderNetwork);
}

// Hook into existing render
const originalRender2 = render;
render = function() {
    originalRender2();
    renderNetwork();
};

