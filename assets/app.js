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
    const esc = v => { const s = String(v ?? ''); return /[",\n]/.test(s) ? `"${s.replaceAll('"','""')}"` : s; };
    dlFile('its-plan.csv', [h.join(','), ...filtered().map(i => h.map(k => esc(i[k])).join(','))].join('\n'), 'text/csv');
});

// Boot map
renderLegend();
render();
fitBounds();
setTimeout(() => { map.invalidateSize(); fitBounds(); }, 300);
setTimeout(() => { map.invalidateSize(); fitBounds(); }, 1500);

// â•â•â• Specs Module â•â•â•
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
                // Group by spec category (rough heuristic) or just general category
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
        
        if (ctxD && window.Chart && !window._boqChartD) {
            window._boqChartD = new Chart(ctxD, {
                type: 'doughnut',
                data: {
                    labels: Object.keys(categories),
                    datasets: [{
                        data: Object.values(categories),
                        backgroundColor: ['#38bdf8', '#fb923c', '#818cf8', '#34d399', '#f87171', '#c084fc', '#94a3b8'],
                        borderWidth: 0, hoverOffset: 4
                    }]
                },
                options: { 
                    responsive: true, maintainAspectRatio: false,
                    plugins: { 
                        legend: { position: 'bottom', labels: { color: '#cbd5e1', font: { family: 'Inter' } } },
                        title: { display: true, text: 'Budget Distribution ($)', color: '#fff', font: { size: 14 } }
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
                        backgroundColor: '#38bdf8',
                        borderRadius: 4
                    }]
                },
                options: {
                    responsive: true, maintainAspectRatio: false,
                    scales: {
                        y: { ticks: { color: '#94a3b8' }, grid: { color: 'rgba(255,255,255,0.05)' } },
                        x: { ticks: { color: '#94a3b8' }, grid: { display: false } }
                    },
                    plugins: {
                        legend: { display: false },
                        title: { display: true, text: 'Asset Quantity Distribution', color: '#fff', font: { size: 14 } }
                    }
                }
            });
        } else if (window._boqChartB) {
            window._boqChartB.data.labels = Object.keys(quantities);
            window._boqChartB.data.datasets[0].data = Object.values(quantities);
            window._boqChartB.update();
        }
    }, 100);

}
renderBOQ();

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
