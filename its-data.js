:root {
  --ink: #17202b;
  --muted: #637083;
  --line: #d8e0e8;
  --panel: #ffffff;
  --paper: #f4f7fa;
  --deep: #0f172a;
  --teal: #0f766e;
  --blue: #2563eb;
  --coral: #e4572e;
  --amber: #b45309;
  --red: #b91c1c;
  --green-soft: #e7f6f1;
  --blue-soft: #e8f0ff;
  --orange-soft: #fff0e8;
  --shadow: 0 18px 48px rgba(15, 23, 42, 0.12);
}

* {
  box-sizing: border-box;
}

html,
body {
  height: 100%;
}

body {
  margin: 0;
  overflow: hidden;
  background: var(--paper);
  color: var(--ink);
  font-family: Arial, Helvetica, sans-serif;
  letter-spacing: 0;
}

button,
input,
select {
  font: inherit;
}

.app-shell {
  display: grid;
  grid-template-columns: 330px minmax(0, 1fr) 360px;
  width: 100vw;
  height: 100vh;
}

.side-panel,
.detail-panel {
  position: relative;
  z-index: 600;
  min-width: 0;
  overflow-y: auto;
  background: var(--panel);
}

.side-panel {
  border-right: 1px solid var(--line);
  padding: 18px;
}

.detail-panel {
  border-left: 1px solid var(--line);
}

.brand-block {
  display: grid;
  grid-template-columns: 52px 1fr;
  gap: 12px;
  align-items: center;
  min-height: 62px;
}

.brand-mark {
  display: grid;
  place-items: center;
  width: 52px;
  height: 52px;
  border-radius: 8px;
  background: var(--deep);
  color: #fff;
  font-weight: 700;
}

h1,
h2,
h3,
p {
  margin: 0;
}

.brand-block h1 {
  font-size: 21px;
  line-height: 1.1;
}

.brand-block p {
  margin-top: 4px;
  color: var(--muted);
  font-size: 13px;
}

.summary-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 10px;
  margin: 18px 0;
}

.metric {
  min-width: 0;
  min-height: 92px;
  border: 1px solid var(--line);
  border-radius: 8px;
  padding: 12px;
  background: #fbfcfd;
}

.metric span {
  color: var(--muted);
  font-size: 12px;
}

.metric strong {
  display: block;
  margin-top: 10px;
  font-size: 28px;
  line-height: 1;
}

.metric em {
  display: block;
  margin-top: 9px;
  color: var(--teal);
  font-size: 12px;
  font-style: normal;
}

.control-section {
  display: grid;
  gap: 12px;
}

.section-title {
  margin-top: 8px;
  color: var(--muted);
  font-size: 12px;
  font-weight: 700;
  text-transform: uppercase;
}

.segmented,
.chip-grid {
  display: flex;
  flex-wrap: wrap;
  gap: 7px;
}

.segmented button,
.chip-grid button,
.actions button {
  min-height: 34px;
  border: 1px solid var(--line);
  border-radius: 8px;
  background: #fff;
  color: var(--ink);
  cursor: pointer;
  padding: 7px 10px;
}

.segmented button.active,
.chip-grid button.active {
  background: var(--deep);
  border-color: var(--deep);
  color: #fff;
}

select,
input[type="search"] {
  width: 100%;
  min-height: 40px;
  border: 1px solid var(--line);
  border-radius: 8px;
  background: #fff;
  color: var(--ink);
  padding: 8px 10px;
}

.actions {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 8px;
  margin-top: 6px;
}

.actions button {
  background: var(--deep);
  border-color: var(--deep);
  color: #fff;
  font-weight: 700;
}

.note {
  margin-top: 18px;
  border: 1px solid #f2c9a7;
  border-radius: 8px;
  background: var(--orange-soft);
  color: #7c3f10;
  padding: 12px;
  font-size: 13px;
  line-height: 1.35;
}

.note strong,
.note span {
  display: block;
}

.note span {
  margin-top: 5px;
}

.map-area {
  position: relative;
  min-width: 0;
}

.top-strip {
  position: absolute;
  z-index: 500;
  left: 18px;
  right: 18px;
  top: 18px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 18px;
  min-height: 76px;
  border: 1px solid var(--line);
  border-radius: 8px;
  background: rgba(255, 255, 255, 0.94);
  box-shadow: var(--shadow);
  padding: 14px 16px;
}

.eyebrow {
  display: block;
  margin-bottom: 4px;
  color: var(--teal);
  font-size: 12px;
  font-weight: 700;
  text-transform: uppercase;
}

.top-strip h2 {
  font-size: 22px;
  line-height: 1.1;
}

.legend {
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-end;
  gap: 8px;
  max-width: 520px;
}

.legend-item {
  display: inline-grid;
  grid-template-columns: 12px auto;
  align-items: center;
  gap: 6px;
  min-height: 28px;
  border: 1px solid var(--line);
  border-radius: 8px;
  background: #fff;
  padding: 4px 8px;
  color: var(--muted);
  font-size: 12px;
}

.legend-dot {
  width: 11px;
  height: 11px;
  border-radius: 999px;
}

#map {
  width: 100%;
  height: 100vh;
  background: #dce5ec;
}

.map-vector-overlay,
.map-point-layer {
  position: absolute;
  inset: 0;
  z-index: 460;
  pointer-events: none;
}

.map-vector-overlay path {
  fill: none;
  stroke-linecap: round;
  stroke-linejoin: round;
}

.map-point {
  position: absolute;
  z-index: 470;
  display: grid;
  place-items: center;
  width: 34px;
  height: 34px;
  border: 2px solid #fff;
  border-radius: 10px;
  box-shadow: 0 8px 18px rgba(15, 23, 42, 0.28);
  color: #fff;
  font-size: 10px;
  font-weight: 800;
  transform: translate(-50%, -50%);
  pointer-events: auto;
  cursor: pointer;
}

.map-point.selected {
  width: 42px;
  height: 42px;
  border-width: 3px;
}

.bottom-panel {
  position: absolute;
  z-index: 500;
  left: 18px;
  right: 18px;
  bottom: 18px;
  min-width: 0;
  max-height: 31vh;
  display: flex;
  flex-direction: column;
  border: 1px solid var(--line);
  border-radius: 8px;
  background: rgba(255, 255, 255, 0.96);
  box-shadow: var(--shadow);
  overflow: hidden;
}

.panel-head {
  min-height: 48px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  border-bottom: 1px solid var(--line);
  padding: 12px 14px;
}

.panel-head h3 {
  font-size: 16px;
}

.panel-head span {
  color: var(--muted);
  font-size: 12px;
}

.table-wrap {
  min-width: 0;
  max-width: 100%;
  overflow: auto;
}

table {
  width: 100%;
  border-collapse: collapse;
  font-size: 12px;
}

th,
td {
  padding: 9px 10px;
  border-bottom: 1px solid var(--line);
  text-align: left;
  vertical-align: top;
}

th {
  position: sticky;
  top: 0;
  z-index: 2;
  background: #172033;
  color: #fff;
  font-weight: 700;
}

tbody tr {
  cursor: pointer;
}

tbody tr:hover {
  background: #f0f7f5;
}

.status-pill,
.phase-pill,
.priority-pill {
  display: inline-grid;
  place-items: center;
  min-height: 25px;
  border-radius: 7px;
  padding: 4px 8px;
  font-size: 11px;
  font-weight: 700;
  white-space: nowrap;
}

.status-pill {
  background: #eef2f7;
  color: var(--muted);
}

.status-pill.design {
  background: var(--blue-soft);
  color: var(--blue);
}

.status-pill.planned {
  background: var(--green-soft);
  color: var(--teal);
}

.status-pill.survey {
  background: var(--orange-soft);
  color: var(--amber);
}

.status-pill.existing {
  background: #ede9fe;
  color: #6d28d9;
}

.phase-pill {
  background: #f1f5f9;
  color: var(--deep);
}

.priority-pill {
  background: #fee2e2;
  color: var(--red);
}

.asset-icon {
  display: grid;
  place-items: center;
  width: 34px;
  height: 34px;
  border: 2px solid #fff;
  border-radius: 10px;
  box-shadow: 0 8px 18px rgba(15, 23, 42, 0.28);
  color: #fff;
  font-size: 10px;
  font-weight: 800;
}

.asset-icon.selected {
  width: 42px;
  height: 42px;
  border-width: 3px;
}

.detail-panel {
  padding: 18px;
}

.empty-detail {
  display: grid;
  place-items: center;
  min-height: 180px;
  border: 1px dashed var(--line);
  border-radius: 8px;
  color: var(--muted);
  text-align: center;
  padding: 20px;
}

.empty-detail span {
  font-size: 12px;
  text-transform: uppercase;
  font-weight: 700;
}

.empty-detail strong {
  margin-top: 8px;
  color: var(--ink);
  font-size: 20px;
}

.detail-card {
  display: grid;
  gap: 14px;
}

.detail-top {
  border-bottom: 1px solid var(--line);
  padding-bottom: 14px;
}

.detail-top .type {
  color: var(--muted);
  font-size: 12px;
  font-weight: 700;
  text-transform: uppercase;
}

.detail-top h3 {
  margin-top: 6px;
  font-size: 24px;
  line-height: 1.15;
}

.detail-top p {
  margin-top: 8px;
  color: var(--muted);
  line-height: 1.4;
}

.detail-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 10px;
}

.kv {
  border: 1px solid var(--line);
  border-radius: 8px;
  background: #fbfcfd;
  padding: 10px;
}

.kv span {
  display: block;
  color: var(--muted);
  font-size: 11px;
  text-transform: uppercase;
  font-weight: 700;
}

.kv strong {
  display: block;
  margin-top: 6px;
  font-size: 14px;
  line-height: 1.3;
}

.detail-note {
  border: 1px solid var(--line);
  border-radius: 8px;
  background: #fbfcfd;
  padding: 12px;
  line-height: 1.4;
}

.detail-note span {
  display: block;
  margin-bottom: 5px;
  color: var(--muted);
  font-size: 11px;
  text-transform: uppercase;
  font-weight: 700;
}

.leaflet-popup-content {
  margin: 12px 14px;
  min-width: 210px;
}

.popup-title {
  font-weight: 800;
  margin-bottom: 4px;
}

.popup-meta {
  color: var(--muted);
  font-size: 12px;
}

.popup-purpose {
  margin-top: 8px;
  line-height: 1.35;
}

@media (max-width: 1240px) {
  .app-shell {
    grid-template-columns: 300px minmax(0, 1fr);
  }

  .detail-panel {
    display: none;
  }
}

@media (max-width: 860px) {
  body {
    overflow: auto;
    overflow-x: hidden;
  }

  .app-shell {
    grid-template-columns: 1fr;
    width: 100%;
    max-width: 100%;
    overflow-x: hidden;
    height: auto;
  }

  .side-panel {
    width: 100%;
    max-width: 100%;
    border-right: 0;
    border-bottom: 1px solid var(--line);
  }

  .summary-grid,
  .control-section,
  .segmented,
  .chip-grid,
  .actions,
  .note,
  .map-area,
  .top-strip,
  .bottom-panel {
    max-width: 100%;
  }

  .segmented button,
  .chip-grid button,
  .actions button {
    min-width: 0;
  }

  #map {
    height: 70vh;
  }

  .top-strip {
    position: static;
    flex-direction: column;
    align-items: flex-start;
    margin: 12px;
  }

  .bottom-panel {
    position: static;
    max-height: none;
    margin: 12px;
  }

  table {
    min-width: 760px;
  }

  .legend {
    justify-content: flex-start;
  }
}

@media (max-width: 540px) {
  .side-panel {
    padding: 16px;
  }

  .summary-grid {
    grid-template-columns: 1fr;
    gap: 8px;
  }

  .segmented,
  .chip-grid {
    display: grid;
    grid-template-columns: repeat(4, minmax(0, 1fr));
  }

  .metric {
    min-height: 86px;
    padding: 10px;
  }

  .actions {
    grid-template-columns: 1fr;
  }

  .top-strip h2 {
    font-size: 20px;
  }
}
