/* ═══════════════════════════════════════════════════════
   KEE Nexus v2.0 — Unified App Logic for GitHub Pages
   ═══════════════════════════════════════════════════════ */

const geoData = window.ITS_GEOSPATIAL_DATA;
const roadNet = window.ROAD_NETWORK || null;
const docsContent = window.DOCS_CONTENT || {};

const state = { corridor: "All", type: "All", status: "All", query: "", selectedId: null };

const typeById = Object.fromEntries(geoData.assetTypes.map(t => [t.id, t]));
const corridorById = Object.fromEntries(geoData.corridors.map(c => [c.id, c]));

// ═══ Navigation ═══
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

// ═══ Map ═══
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
    // Glow
    L.geoJSON(roadNet.features, { style: { color: '#38bdf8', weight: 12, opacity: 0.08 } }).addTo(map);
    // Core
    L.geoJSON(roadNet.features, {
        style: f => {
            const n = f.properties.name.toLowerCase();
            if (n.includes('expressway')) return { color: '#38bdf8', weight: 4, opacity: 0.9 };
            if (n.includes('munyonyo')) return { color: '#a78bfa', weight: 3, opacity: 0.8 };
            if (n.includes('bypass')) return { color: '#818cf8', weight: 3, opacity: 0.7 };
            if (n.includes('interchange') || n.includes('slip')) return { color: '#f59e0b', weight: 2, opacity: 0.6, dashArray: '6 4' };
            return { color: '#64748b', weight: 2, opacity: 0.5 };
        },
        onEachFeature: (f, layer) => {
            layer.bindTooltip(f.properties.name, { sticky: true, className: '' });
        }
    }).addTo(map);
}

const corridorGroup = L.layerGroup().addTo(map);
const markerGroup = L.layerGroup().addTo(map);

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
        html: `<div class="asset-icon ${sel ? 'selected' : ''}" style="background:${t.color}">${t.short}</div>`,
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
            }).bindTooltip(`${c.name} — ${p.name}`, { sticky: true }).addTo(corridorGroup);
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
        m.bindPopup(`<div class="popup-title">${item.id} — ${item.site}</div><div class="popup-meta">${c.name} · ${t.label}</div><div class="popup-purpose">${item.purpose}</div>`);
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

function renderTable() {
    const rows = filtered();
    document.getElementById('mapResultCount').textContent = `${rows.length} shown`;
    document.getElementById('mapAssetTable').innerHTML = rows.map(item => {
        const t = typeById[item.type];
        return `<tr data-id="${item.id}">
            <td><strong>${item.id}</strong></td><td>${item.corridor}</td><td>${t.label}</td>
            <td>${item.site}</td><td>${item.purpose}</td>
            <td><span class="status-pill ${statusClass(item.status)}">${item.status}</span></td>
            <td><span class="phase-pill">${item.phase}</span></td></tr>`;
    }).join('');
    document.querySelectorAll('#mapAssetTable tr').forEach(row => {
        row.addEventListener('click', () => selectInstallation(row.dataset.id, true));
    });
}

function renderDetail(item) {
    const panel = document.getElementById('mapDetailPanel');
    if (!item) { panel.className = 'detail-panel empty-detail'; panel.innerHTML = '<i class="fa-solid fa-hand-pointer"></i><p>Click a marker on the map</p>'; return; }
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
    el.textContent = state.corridor === 'All' ? 'ITS Assets Along the Road Network' : `${corridorById[state.corridor].name} — ${corridorById[state.corridor].status}`;
}

function render() {
    renderCorridorFilter(); renderTypeFilter(); renderSummary(); renderTitle();
    drawCorridors(); drawMarkers(); renderTable();
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
    const esc = v => { const s = String(v ?? ''); return /[",\n]/.test(s) ? `"${s.replaceAll('"','""')}"` : s; };
    dlFile('its-plan.csv', [h.join(','), ...filtered().map(i => h.map(k => esc(i[k])).join(','))].join('\n'), 'text/csv');
});

// Boot map
renderLegend();
render();
fitBounds();
setTimeout(() => { map.invalidateSize(); fitBounds(); }, 300);
setTimeout(() => { map.invalidateSize(); fitBounds(); }, 1500);

// ═══ Specs Module ═══
(function setupSpecs() {
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
