/* ═══════════════════════════════════════════════
   TransitPulse — app.js (optimized)
   ═══════════════════════════════════════════════ */
'use strict';

// ─── DATA ────────────────────────────────────────

const STATIONS = [
  { id:'S01', name:'Central Station',     x:0.50, y:0.45, type:'metro', routes:['M1','B2','T5'] },
  { id:'S02', name:'North Terminal',      x:0.45, y:0.12, type:'metro', routes:['M1','B7'] },
  { id:'S03', name:'East Market',         x:0.78, y:0.38, type:'bus',   routes:['B4','B9'] },
  { id:'S04', name:'South Bay',           x:0.52, y:0.82, type:'tram',  routes:['T2','T5'] },
  { id:'S05', name:'West Gate',           x:0.14, y:0.48, type:'bus',   routes:['B1','B3'] },
  { id:'S06', name:'Airport Express',     x:0.88, y:0.10, type:'metro', routes:['M3'] },
  { id:'S07', name:'University Hub',      x:0.33, y:0.28, type:'bus',   routes:['B6','B8','T3'] },
  { id:'S08', name:'Stadium Gate',        x:0.68, y:0.62, type:'tram',  routes:['T4','B5'] },
  { id:'S09', name:'Old Town Square',     x:0.41, y:0.56, type:'tram',  routes:['T1','T3'] },
  { id:'S10', name:'Tech Quarter',        x:0.62, y:0.22, type:'metro', routes:['M2','B11'] },
  { id:'S11', name:'River Bridge',        x:0.26, y:0.65, type:'bus',   routes:['B2','B10'] },
  { id:'S12', name:'Harbour Docks',       x:0.76, y:0.80, type:'ferry', routes:['F1','B5'] },
  { id:'S13', name:'Medical Centre',      x:0.19, y:0.34, type:'bus',   routes:['B3','B7'] },
  { id:'S14', name:'Shopping District',   x:0.58, y:0.50, type:'metro', routes:['M1','M2','T5'] },
  { id:'S15', name:'Residential Zone A',  x:0.10, y:0.72, type:'bus',   routes:['B1','B10'] },
  { id:'S16', name:'Business Park',       x:0.70, y:0.35, type:'metro', routes:['M2','B4'] },
  { id:'S17', name:'Cultural Quarter',    x:0.38, y:0.70, type:'tram',  routes:['T2','T4'] },
  { id:'S18', name:'Northgate Mall',      x:0.52, y:0.18, type:'bus',   routes:['B6','B9'] },
  { id:'S19', name:'Industrial East',     x:0.90, y:0.55, type:'bus',   routes:['B4','B5'] },
  { id:'S20', name:'Green Park',          x:0.30, y:0.50, type:'tram',  routes:['T1','T3'] },
];

const DEMAND = {
  morning: [0.92,0.95,0.70,0.55,0.72,0.75,0.68,0.52,0.72,0.88,0.62,0.38,0.64,0.93,0.48,0.97,0.64,0.80,0.42,0.58],
  midday:  [0.50,0.38,0.60,0.68,0.44,0.35,0.82,0.64,0.54,0.58,0.50,0.56,0.48,0.70,0.34,0.58,0.60,0.64,0.54,0.48],
  evening: [1.00,0.84,0.80,0.94,0.70,0.50,0.74,0.92,0.84,0.80,0.76,0.64,0.70,1.00,0.80,0.90,0.80,0.70,0.60,0.70],
  night:   [0.18,0.14,0.24,0.30,0.18,0.55,0.20,0.36,0.22,0.14,0.18,0.36,0.14,0.24,0.14,0.18,0.24,0.20,0.18,0.14],
};

const LINKS = [
  ['S01','S02'],['S02','S18'],['S01','S09'],['S01','S14'],
  ['S14','S16'],['S16','S10'],['S10','S03'],['S03','S19'],
  ['S01','S11'],['S11','S15'],['S07','S13'],['S07','S18'],
  ['S09','S17'],['S17','S04'],['S04','S12'],['S08','S12'],
  ['S08','S14'],['S06','S10'],['S05','S13'],['S05','S20'],
  ['S20','S11'],['S14','S09'],
];

const ROUTES = [
  { id:'M1',  name:'Metro Line 1',  mode:'metro', color:'#b06eff', freq:4,  load:88, punct:96 },
  { id:'M2',  name:'Metro Line 2',  mode:'metro', color:'#b06eff', freq:5,  load:72, punct:94 },
  { id:'M3',  name:'Airport Metro', mode:'metro', color:'#b06eff', freq:10, load:55, punct:98 },
  { id:'B1',  name:'Bus Route 1',   mode:'bus',   color:'#00d4ff', freq:12, load:65, punct:82 },
  { id:'B2',  name:'Bus Route 2',   mode:'bus',   color:'#00d4ff', freq:15, load:91, punct:75 },
  { id:'B3',  name:'Bus Route 3',   mode:'bus',   color:'#00d4ff', freq:10, load:48, punct:88 },
  { id:'B4',  name:'Bus Route 4',   mode:'bus',   color:'#00d4ff', freq:12, load:70, punct:84 },
  { id:'B5',  name:'Bus Route 5',   mode:'bus',   color:'#00d4ff', freq:20, load:82, punct:79 },
  { id:'T1',  name:'Tram Line 1',   mode:'tram',  color:'#00f5a0', freq:8,  load:76, punct:92 },
  { id:'T2',  name:'Tram Line 2',   mode:'tram',  color:'#00f5a0', freq:9,  load:63, punct:90 },
  { id:'T3',  name:'Tram Line 3',   mode:'tram',  color:'#00f5a0', freq:11, load:55, punct:89 },
  { id:'T4',  name:'Tram Route 4',  mode:'tram',  color:'#00f5a0', freq:13, load:98, punct:70 },
  { id:'T5',  name:'Tram Express',  mode:'tram',  color:'#00f5a0', freq:7,  load:84, punct:93 },
  { id:'F1',  name:'Ferry Route 1', mode:'ferry', color:'#ffc040', freq:30, load:42, punct:95 },
];

const SUGGESTIONS = [
  { p:'high',   t:'Route B2 at 91% load during AM Peak — add 2 vehicles on 14:30–18:30 window' },
  { p:'high',   t:'T4 Tram at 98% capacity — reduce headway from 13 min to 8 min immediately' },
  { p:'medium', t:'M1 Metro: shift first departure from 05:40 to 05:20 to capture pre-peak demand' },
  { p:'medium', t:'Overlap detected on B3 and B7 segments 4–7 — consolidate for 6% cost saving' },
  { p:'low',    t:'Night service on M3 Airport: reduce frequency 40% (low ridership 23:00–05:00)' },
  { p:'low',    t:'B3 running at 48% capacity — consider smaller vehicle class during off-peak' },
];

// ─── STATE ────────────────────────────────────────

const ST = {
  view: 'heatmap',
  time: 'morning',
  modes: { bus:true, metro:true, tram:true, ferry:false },
  threshold: 20,
  day: 'mon',
  charts: {},
  raf: null,
};

// ─── DOM REFS ──────────────────────────────────────

const $ = id => document.getElementById(id);
const canvas  = $('heatmapCanvas');
const ctx     = canvas.getContext('2d');
const tooltip = $('tooltip');

// ─── NAVIGATION ───────────────────────────────────

const TITLES = {
  heatmap:   ['Demand Heatmap',    'City-wide passenger load visualization'],
  schedule:  ['Schedule Optimizer','Interactive trip planning & optimization'],
  analytics: ['Analytics',         'Performance metrics & trend analysis'],
  routes:    ['Route Manager',     'Route directory & real-time status'],
};

document.querySelectorAll('.nav-link').forEach(btn => {
  btn.addEventListener('click', () => {
    const v = btn.dataset.view;
    if (v === ST.view) return;
    document.querySelectorAll('.nav-link').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    document.querySelectorAll('.view').forEach(el => el.classList.remove('active'));
    const target = $('view-' + v);
    if (target) target.classList.add('active');
    $('pageTitle').textContent    = TITLES[v][0];
    $('pageSubtitle').textContent = TITLES[v][1];
    ST.view = v;
    if (v === 'analytics') setTimeout(buildCharts, 60);
    if (v === 'routes')    renderRoutes();
    if (v === 'schedule')  renderSchedule();
  });
});

// ─── CONTROLS ─────────────────────────────────────

document.querySelectorAll('.chip').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.chip').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    ST.time = btn.dataset.time;
    schedDraw();
  });
});

document.querySelectorAll('[data-mode]').forEach(cb => {
  cb.addEventListener('change', () => {
    ST.modes[cb.dataset.mode] = cb.checked;
    schedDraw();
  });
});

const sliderEl = $('demandSlider');
sliderEl.addEventListener('input', () => {
  ST.threshold = +sliderEl.value;
  $('sliderVal').textContent = sliderEl.value + '%';
  sliderEl.style.setProperty('--pct', sliderEl.value + '%');
  schedDraw();
});

function schedDraw() {
  if (ST.view === 'heatmap') requestDraw();
  if (ST.view === 'schedule') renderSchedule();
}

// ─── HEATMAP CANVAS ───────────────────────────────

function resizeCanvas() {
  const dpr = Math.min(devicePixelRatio, 2);
  const w = canvas.offsetWidth;
  const h = canvas.offsetHeight;
  if (!w || !h) return;
  canvas.width  = w * dpr;
  canvas.height = h * dpr;
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  requestDraw();
}

new ResizeObserver(resizeCanvas).observe(canvas);

function requestDraw() {
  if (ST.raf) cancelAnimationFrame(ST.raf);
  ST.raf = requestAnimationFrame(draw);
}

function sPos(s) {
  const m = 55;
  const w = canvas.offsetWidth, h = canvas.offsetHeight;
  return { x: m + (w - m*2) * s.x, y: m + (h - m*2) * s.y };
}

function heatColor(v) {
  const stops = [
    [0,    [13,27,42]],
    [0.15, [10,61,98]],
    [0.30, [14,107,168]],
    [0.45, [0,180,216]],
    [0.55, [72,202,228]],
    [0.65, [249,199,79]],
    [0.78, [248,150,30]],
    [0.88, [243,114,44]],
    [1.0,  [255,64,96]],
  ];
  for (let i = 1; i < stops.length; i++) {
    if (v <= stops[i][0]) {
      const t = (v - stops[i-1][0]) / (stops[i][0] - stops[i-1][0]);
      const a = stops[i-1][1], b = stops[i][1];
      return [
        Math.round(a[0]+(b[0]-a[0])*t),
        Math.round(a[1]+(b[1]-a[1])*t),
        Math.round(a[2]+(b[2]-a[2])*t)
      ];
    }
  }
  return stops[stops.length-1][1];
}

function modeCol(type) {
  return { metro:'#b06eff', bus:'#00d4ff', tram:'#00f5a0', ferry:'#ffc040' }[type] || '#888';
}

function draw() {
  const w = canvas.offsetWidth, h = canvas.offsetHeight;
  if (!w || !h) return;
  ctx.clearRect(0, 0, w, h);

  // Subtle dot grid
  ctx.fillStyle = 'rgba(30,35,51,0.6)';
  const gs = 40;
  for (let x = gs/2; x < w; x += gs)
    for (let y = gs/2; y < h; y += gs) {
      ctx.beginPath(); ctx.arc(x, y, 0.8, 0, Math.PI*2); ctx.fill();
    }

  const demands = DEMAND[ST.time];
  const thresh  = ST.threshold / 100;
  const visible = STATIONS.filter(s => ST.modes[s.type]);

  // Heat blobs
  visible.forEach((s, _) => {
    const i = STATIONS.indexOf(s);
    const d = demands[i] ?? 0.5;
    if (d < thresh) return;
    const p = sPos(s);
    const r = 55 + d * 90;
    const [cr,cg,cb] = heatColor(d);
    const g = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, r);
    g.addColorStop(0, `rgba(${cr},${cg},${cb},${(0.28 * d).toFixed(2)})`);
    g.addColorStop(0.5, `rgba(${cr},${cg},${cb},${(0.10 * d).toFixed(2)})`);
    g.addColorStop(1, 'rgba(0,0,0,0)');
    ctx.beginPath(); ctx.arc(p.x, p.y, r, 0, Math.PI*2);
    ctx.fillStyle = g; ctx.fill();
  });

  // Route lines
  ctx.lineWidth = 1;
  ctx.setLineDash([]);
  LINKS.forEach(([a, b]) => {
    const sa = STATIONS.find(s => s.id === a);
    const sb = STATIONS.find(s => s.id === b);
    if (!sa || !sb) return;
    if (!ST.modes[sa.type] && !ST.modes[sb.type]) return;
    const pa = sPos(sa), pb = sPos(sb);
    ctx.beginPath(); ctx.moveTo(pa.x, pa.y); ctx.lineTo(pb.x, pb.y);
    ctx.strokeStyle = 'rgba(37,43,61,0.9)'; ctx.stroke();
  });

  // Stations
  visible.forEach(s => {
    const i = STATIONS.indexOf(s);
    const d = demands[i] ?? 0.5;
    const p = sPos(s);
    const col = modeCol(s.type);
    const r = d > 0.85 ? 7.5 : d > 0.6 ? 6 : 4.5;

    // Outer glow ring for hot stations
    if (d > 0.7) {
      ctx.beginPath(); ctx.arc(p.x, p.y, r + 8, 0, Math.PI*2);
      const [cr,cg,cb] = hexToRgb(col);
      ctx.strokeStyle = `rgba(${cr},${cg},${cb},0.18)`;
      ctx.lineWidth = 6; ctx.stroke();
    }

    // Dot
    ctx.beginPath(); ctx.arc(p.x, p.y, r, 0, Math.PI*2);
    ctx.fillStyle = col;
    ctx.shadowColor = col;
    ctx.shadowBlur  = d > 0.65 ? 10 : 3;
    ctx.fill();
    ctx.shadowBlur = 0;

    // Overload ring
    if (d > 0.9) {
      ctx.beginPath(); ctx.arc(p.x, p.y, r + 11, 0, Math.PI*2);
      ctx.strokeStyle = 'rgba(255,64,96,0.5)';
      ctx.lineWidth = 1.5;
      ctx.setLineDash([3,3]); ctx.stroke(); ctx.setLineDash([]);
    }

    // ID label
    ctx.font = '500 9px JetBrains Mono, monospace';
    ctx.fillStyle = 'rgba(67,78,106,0.9)';
    ctx.textAlign = 'center';
    ctx.fillText(s.id, p.x, p.y - r - 4);
  });
}

function hexToRgb(hex) {
  const r = parseInt(hex.slice(1,3),16);
  const g = parseInt(hex.slice(3,5),16);
  const b = parseInt(hex.slice(5,7),16);
  return [r,g,b];
}

// Tooltip hover
canvas.addEventListener('mousemove', e => {
  const rect = canvas.getBoundingClientRect();
  const mx = e.clientX - rect.left;
  const my = e.clientY - rect.top;
  const demands = DEMAND[ST.time];
  let hit = null;

  STATIONS.filter(s => ST.modes[s.type]).forEach(s => {
    const p = sPos(s);
    if (Math.hypot(p.x - mx, p.y - my) < 14) {
      hit = { s, d: demands[STATIONS.indexOf(s)] };
    }
  });

  if (hit) {
    $('ttName').textContent   = hit.s.name;
    $('ttLoad').textContent   = Math.round(hit.d * 100) + '%';
    $('ttRoutes').textContent = hit.s.routes.join(', ');
    $('ttNext').textContent   = Math.ceil((1 - hit.d) * 7 + 1) + ' min';
    tooltip.style.left = (mx + 16) + 'px';
    tooltip.style.top  = (my - 8)  + 'px';
    tooltip.classList.remove('hidden');
  } else {
    tooltip.classList.add('hidden');
  }
});
canvas.addEventListener('mouseleave', () => tooltip.classList.add('hidden'));

// Zoom
$('zoomIn').addEventListener('click', requestDraw);
$('zoomOut').addEventListener('click', requestDraw);
$('zoomReset').addEventListener('click', requestDraw);

// ─── SCHEDULE / GANTT ─────────────────────────────

function renderSchedule() {
  const gantt = $('gantt');
  gantt.innerHTML = '';

  // Hour header
  const hourRow = document.createElement('div');
  hourRow.className = 'g-hour-row';
  for (let h = 5; h <= 23; h++) {
    const s = document.createElement('span');
    s.className = 'g-hour';
    s.textContent = h.toString().padStart(2,'0');
    hourRow.appendChild(s);
  }
  gantt.appendChild(hourRow);

  const dayMult = { mon:1,tue:1,wed:1,thu:1,fri:1.1,sat:0.75,sun:0.65 };
  const dm = dayMult[ST.day] || 1;

  ROUTES.forEach(route => {
    const row = document.createElement('div');
    row.className = 'g-route-row';

    const lbl = document.createElement('div');
    lbl.className = 'g-label';
    lbl.textContent = route.id;
    row.appendChild(lbl);

    const track = document.createElement('div');
    track.className = 'g-track';

    const startH = route.mode === 'metro' ? 5 : 6;
    const totalMin = (23 - startH) * 60;
    const freq = Math.max(3, Math.round(route.freq / dm));

    let t = 0;
    while (t < totalMin) {
      const dur = 20 + Math.round(Math.random() * 18);
      const leftPct = (t / totalMin) * 100;
      const widthPct = Math.max((dur / totalMin) * 100, 0.6);
      const hour = startH + t / 60;

      let d = 0.3;
      if (hour >= 7.2 && hour <= 9.5)   d = 0.82 + Math.random()*0.18;
      else if (hour >= 17 && hour <= 19.5) d = 0.78 + Math.random()*0.22;
      else if (hour >= 12 && hour <= 13.5) d = 0.50 + Math.random()*0.20;
      else d = 0.18 + Math.random()*0.32;

      const [cr,cg,cb] = hexToRgb(route.color);
      const alpha = (0.35 + d * 0.45).toFixed(2);

      const block = document.createElement('div');
      block.className = 'g-block' + (d > 0.88 ? ' warn' : '');
      block.style.cssText = `left:${leftPct.toFixed(2)}%;width:${widthPct.toFixed(2)}%;background:rgba(${cr},${cg},${cb},${alpha});color:rgba(${cr},${cg},${cb},0.9);`;
      block.textContent = d > 0.88 ? '▲' : '';
      block.title = `${route.name} — Load: ${Math.round(d*100)}%`;
      track.appendChild(block);
      t += freq;
    }

    row.appendChild(track);
    gantt.appendChild(row);
  });

  // Suggestions
  const list = $('suggList');
  list.innerHTML = '';
  SUGGESTIONS.forEach(s => {
    const item = document.createElement('div');
    item.className = 'sugg-item';
    item.innerHTML = `<span class="sugg-badge ${s.p}">${s.p.toUpperCase()}</span><span>${s.t}</span>`;
    list.appendChild(item);
  });
}

document.querySelectorAll('.day').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.day').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    ST.day = btn.dataset.day;
    renderSchedule();
  });
});

// ─── ANALYTICS CHARTS ─────────────────────────────

function buildCharts() {
  if (typeof Chart === 'undefined') {
    const s = document.createElement('script');
    s.src = 'https://cdn.jsdelivr.net/npm/chart.js@4.4.0/dist/chart.umd.min.js';
    s.onload = () => renderCharts();
    document.head.appendChild(s);
  } else {
    renderCharts();
  }
}

function renderCharts() {
  Object.values(ST.charts).forEach(c => { try { c.destroy(); } catch(e){} });
  ST.charts = {};

  const mono   = 'JetBrains Mono, monospace';
  const tx3    = '#434e6a';
  const gridC  = 'rgba(23,27,40,0.8)';
  const hours  = ['05','06','07','08','09','10','11','12','13','14','15','16','17','18','19','20','21','22'];

  function baseOpts(extra = {}) {
    return {
      responsive: true,
      maintainAspectRatio: false,
      animation: { duration: 600, easing: 'easeOutQuart' },
      plugins: {
        legend: { labels: { color: tx3, font:{ family: mono, size:10 }, boxWidth:8, padding:12 } },
      },
      scales: {
        x: { ticks:{ color:tx3, font:{ family:mono, size:9 } }, grid:{ color:gridC } },
        y: { ticks:{ color:tx3, font:{ family:mono, size:9 } }, grid:{ color:gridC } },
      },
      ...extra
    };
  }

  function curve(h, mode) {
    const base = { bus:60, metro:74, tram:55 }[mode] || 60;
    return Math.min(100, Math.round(
      base +
      Math.exp(-0.5*Math.pow((h-8.3)/0.9,2)) * 36 +
      Math.exp(-0.5*Math.pow((h-17.8)/1.1,2)) * 32 +
      Math.exp(-0.5*Math.pow((h-12.5)/1.0,2)) * 12
    ));
  }

  // Demand line chart
  const dEl = $('demandChart');
  if (dEl) {
    ST.charts.demand = new Chart(dEl, {
      type: 'line',
      data: {
        labels: hours,
        datasets: [
          { label:'Bus',   data: hours.map(h => curve(+h,'bus')),   borderColor:'#00d4ff', backgroundColor:'rgba(0,212,255,0.05)', tension:0.45, fill:true, pointRadius:2, borderWidth:2 },
          { label:'Metro', data: hours.map(h => curve(+h,'metro')), borderColor:'#b06eff', backgroundColor:'rgba(176,110,255,0.05)', tension:0.45, fill:true, pointRadius:2, borderWidth:2 },
          { label:'Tram',  data: hours.map(h => curve(+h,'tram')),  borderColor:'#00f5a0', backgroundColor:'rgba(0,245,160,0.04)', tension:0.45, fill:true, pointRadius:2, borderWidth:2 },
        ]
      },
      options: baseOpts()
    });
  }

  // Doughnut
  const mEl = $('modalChart');
  if (mEl) {
    ST.charts.modal = new Chart(mEl, {
      type: 'doughnut',
      data: {
        labels: ['Bus','Metro','Tram','Ferry'],
        datasets: [{
          data: [42,35,18,5],
          backgroundColor: ['rgba(0,212,255,0.7)','rgba(176,110,255,0.7)','rgba(0,245,160,0.7)','rgba(255,192,64,0.7)'],
          borderColor:     ['#00d4ff','#b06eff','#00f5a0','#ffc040'],
          borderWidth: 1.5,
          hoverOffset: 6,
        }]
      },
      options: {
        responsive: true, maintainAspectRatio: false,
        cutout: '70%',
        animation: { duration:600 },
        plugins: { legend: { position:'bottom', labels:{ color:tx3, font:{ family:mono, size:10 }, boxWidth:8, padding:10 } } }
      }
    });
  }

  // Punctuality bar
  const pEl = $('punctChart');
  if (pEl) {
    const routes8 = ROUTES.slice(0,8);
    ST.charts.punct = new Chart(pEl, {
      type: 'bar',
      data: {
        labels: routes8.map(r => r.id),
        datasets: [{
          label: 'Punctuality %',
          data: routes8.map(r => r.punct),
          backgroundColor: routes8.map(r => r.punct > 90 ? 'rgba(0,245,160,0.55)' : r.punct > 80 ? 'rgba(255,192,64,0.55)' : 'rgba(255,64,96,0.55)'),
          borderColor:     routes8.map(r => r.punct > 90 ? '#00f5a0' : r.punct > 80 ? '#ffc040' : '#ff4060'),
          borderWidth: 1,
          borderRadius: 3,
        }]
      },
      options: baseOpts({
        plugins: { legend: { display:false } },
        scales: {
          x: { ticks:{ color:tx3, font:{ family:mono, size:9 } }, grid:{ color:gridC } },
          y: { min:50, max:100, ticks:{ color:tx3, font:{ family:mono, size:9 } }, grid:{ color:gridC } }
        }
      })
    });
  }

  // Grouped bar load
  const lEl = $('loadChart');
  if (lEl) {
    ST.charts.load = new Chart(lEl, {
      type: 'bar',
      data: {
        labels: hours,
        datasets: [
          { label:'Metro', data: hours.map(h => curve(+h,'metro')), backgroundColor:'rgba(176,110,255,0.6)', borderColor:'#b06eff', borderWidth:1, borderRadius:2 },
          { label:'Bus',   data: hours.map(h => curve(+h,'bus')+5), backgroundColor:'rgba(0,212,255,0.5)',  borderColor:'#00d4ff', borderWidth:1, borderRadius:2 },
          { label:'Tram',  data: hours.map(h => curve(+h,'tram')),  backgroundColor:'rgba(0,245,160,0.45)', borderColor:'#00f5a0', borderWidth:1, borderRadius:2 },
        ]
      },
      options: baseOpts({ barPercentage:0.7, categoryPercentage:0.8 })
    });
  }
}

// ─── ROUTES TABLE ──────────────────────────────────

function renderRoutes(filter = 'all', q = '') {
  const body = $('routesBody');
  body.innerHTML = '';

  const filtered = ROUTES.filter(r =>
    (filter === 'all' || r.mode === filter) &&
    (`${r.id} ${r.name}`.toLowerCase().includes(q.toLowerCase()))
  );

  filtered.forEach(r => {
    const status = r.load > 90 ? 'overload' : r.punct < 80 ? 'delayed' : 'ok';
    const slabel = { ok:'On Time', delayed:'Delayed', overload:'Overload' }[status];
    const lcolor = r.load > 85 ? '#ff4060' : r.load > 70 ? '#ffc040' : '#00f5a0';
    const pcolor = r.punct > 90 ? '#00f5a0' : r.punct > 80 ? '#ffc040' : '#ff4060';
    const [cr,cg,cb] = hexToRgb(r.color);

    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td>
        <div class="route-id">${r.id}</div>
        <div class="route-name">${r.name}</div>
      </td>
      <td><span class="mode-tag"><span class="dot ${r.mode} sm"></span>${r.mode}</span></td>
      <td style="font-family:var(--f-mono);font-size:11px">${r.freq} min</td>
      <td>
        <div class="load-cell">
          <div class="load-bar"><div class="load-fill" style="width:${r.load}%;background:${lcolor}"></div></div>
          <span class="load-pct" style="color:${lcolor}">${r.load}%</span>
        </div>
      </td>
      <td><span class="punct-val" style="color:${pcolor}">${r.punct}%</span></td>
      <td><span class="badge ${status}">${slabel}</span></td>
      <td><button class="row-action">Edit</button></td>
    `;
    body.appendChild(tr);
  });
}

$('routeSearch').addEventListener('input', e => renderRoutes($('routeFilter').value, e.target.value));
$('routeFilter').addEventListener('change', e => renderRoutes(e.target.value, $('routeSearch').value));

// ─── OPTIMIZE MODAL ────────────────────────────────

const modalBg = $('modalBg');

$('optimizeBtn').addEventListener('click', () => {
  modalBg.classList.add('open');
  $('optResults').classList.add('hidden');
  $('optProgress').style.display = 'block';
  $('progFill').style.width = '0%';
  runOptimization();
});

$('modalClose').addEventListener('click', () => modalBg.classList.remove('open'));
modalBg.addEventListener('click', e => { if (e.target === modalBg) modalBg.classList.remove('open'); });

function runOptimization() {
  const steps = [
    [8,  'Analyzing demand patterns…'],
    [25, 'Scanning overloaded routes…'],
    [44, 'Running frequency model…'],
    [62, 'Simulating headway adjustments…'],
    [80, 'Calculating efficiency gains…'],
    [94, 'Generating recommendations…'],
    [100,'Complete!'],
  ];
  let i = 0;
  const tick = () => {
    if (i >= steps.length) { setTimeout(showResults, 350); return; }
    $('progFill').style.width  = steps[i][0] + '%';
    $('progMsg').textContent   = steps[i][1];
    i++;
    setTimeout(tick, 460);
  };
  tick();
}

function showResults() {
  $('optProgress').style.display = 'none';
  const res = $('optResults');
  res.classList.remove('hidden');
  const items = [
    { t:'Add 2 vehicles to Route B2 (14:30–18:30)',    g:'+12% capacity' },
    { t:'Reduce T4 headway: 13 min → 8 min',           g:'−32% wait time' },
    { t:'Shift M1 first departure to 05:20',           g:'+8% AM coverage' },
    { t:'Consolidate B3 + B7 overlap on segments 4–7', g:'−6% cost' },
    { t:'Halve M3 night frequency (23:00–05:00)',       g:'−18% night cost' },
  ];
  res.innerHTML = items.map((item, i) => `
    <div class="res-item" style="animation-delay:${i*0.08}s">
      <span class="res-text">${item.t}</span>
      <span class="res-gain">${item.g}</span>
    </div>
  `).join('');
}

// ─── LIVE TICKER ───────────────────────────────────

setInterval(() => {
  $('lastUpdate').textContent = ['just now','just now','1 min ago','just now'][Math.floor(Math.random()*4)];
  $('overcrowded').textContent = Math.floor(5 + Math.random()*5);
}, 9000);

// ─── INIT ──────────────────────────────────────────

window.addEventListener('load', () => {
  resizeCanvas();
  requestDraw();
});
