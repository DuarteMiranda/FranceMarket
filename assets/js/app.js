// French renewables market moves: map, capacity charts, findings and ledger.
// Reads window.SITE (data/companies.js), window.COMPANY_DATA (data/<company>.js) and TECHS (data/shared.js).
(() => {
const CATS = [
  { id: "deals", name: "Deals", long: "Acquisitions, stakes and sales", shape: "circle",
    desc: "Buying companies or stakes, selling parts of the portfolio, and exits." },
  { id: "tenders", name: "Tenders & projects", long: "Tender results and project milestones", shape: "diamond",
    desc: "State and CRE tender results, won, lost or withdrawn, and commissioning or permitting milestones." },
  { id: "contracts", name: "Offtake contracts", long: "PPAs and green-gas supply", shape: "square",
    desc: "Long-term supply of renewable power or biomethane to named French customers." },
  { id: "partners", name: "Partnerships", long: "Joint ventures and framework agreements", shape: "triangle",
    desc: "Co-development and framework agreements, many with farming organisations." },
  { id: "strategy", name: "Strategy & targets", long: "Stated goals and positioning", shape: "star",
    desc: "Targets and strategic statements about the French business, to measure the moves against." }
];
const CAT = Object.fromEntries(CATS.map(c => [c.id, c]));
const PERIODS = [
  { id: "p1", name: "2016–2019", from: "2015-01-01", to: "2019-12-31" },
  { id: "p2", name: "2020–2022", from: "2020-01-01", to: "2022-12-31" },
  { id: "p3", name: "2023–2026", from: "2023-01-01", to: "2026-12-31" }
];
const SITE = window.SITE;
const COS = SITE.companies.map((c, i, all) => {
  const d = (window.COMPANY_DATA || {})[c.id];
  if (!d) { console.warn(`No data for "${c.id}": add <script src="data/${c.file}.js"> to index.html`); return null; }
  const a = 2 * Math.PI * i / all.length - Math.PI * 3 / 4;
  return { dash: null, cx: Math.round(Math.cos(a) * 460), cy: Math.round(Math.sin(a) * 300), ...c, d, worth: (d.WORTH || []).slice() };
}).filter(Boolean);
const CO = Object.fromEntries(COS.map(c => [c.id, c]));
// Parties in one company's data that are another company on this page: drawn as a dashed link to that company.
const ALIAS = Object.fromEntries(Object.entries(SITE.alias || {}).filter(([, co]) => CO[co]));
// Colour classes for every company; the colours themselves are --co-<id> tokens in style.css.
const coStyle = document.createElement("style");
coStyle.textContent = COS.map(c => `.co-${c.id} { --c: var(--co-${c.id}); } .codot.${c.id} { background: var(--co-${c.id}); }`).join("\n");
document.head.appendChild(coStyle);

// ---------- merge data ----------
const S = Object.assign({}, ...COS.map(c => c.d.S));
const PARTY = {};
COS.forEach(c => c.d.PARTIES.forEach(p => { if (!ALIAS[p.id] && !PARTY[p.id]) PARTY[p.id] = { ...p, cos: new Set() }; }));
const MOVES = [];
COS.forEach(c => c.d.MOVES.forEach(m => {
  const mv = { ...m, co: c.id, id: c.id + ":" + m.id };
  mv.period = PERIODS.find(p => mv.date >= p.from && mv.date <= p.to).id;
  mv.parties.forEach(([pid]) => { if (!ALIAS[pid]) PARTY[pid].cos.add(c.id); });
  MOVES.push(mv);
}));
const MOVE = Object.fromEntries(MOVES.map(m => [m.id, m]));
const PARTIES = Object.values(PARTY);
COS.forEach(c => { c.worth = c.worth.filter(([pid]) => PARTY[pid]); });
const WORTH_MULTI = SITE.worthMulti || [];
// Comparisons from data/companies.js, trimmed to the companies and moves actually loaded.
const FINDINGS = (SITE.comparisons || []).map(f => ({ ...f, cos: f.cos.filter(id => CO[id]), ev: f.ev.filter(id => MOVE[id]) }))
  .filter(f => f.cos.length > 1 && f.ev.length);
COS.forEach(c => c.d.FINDINGS.forEach(f => FINDINGS.push({ h: f.h, p: f.p, cos: [c.id], ev: f.ev.map(id => c.id + ":" + id) })));
const GAPS = ["Not found", "Watch", "Left out of scope"].map(h => ({ h, items: [] }));
COS.forEach(c => c.d.GAPS.forEach(g => {
  const tgt = GAPS.find(x => x.h === g.h);
  g.items.forEach(i => tgt.items.push({ co: c.id, t: i[0], src: i[1] }));
}));

// ---------- helpers ----------
const MONTHS = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
const parse = d3.timeParse("%Y-%m-%d");
function fmtDate(m) {
  const [y, mo, d] = m.date.split("-").map(Number);
  if (m.dp === "since") return "Since " + y;
  if (m.dp === "year") return String(y);
  if (m.dp === "by") return "By " + MONTHS[mo - 1] + " " + y;
  if (m.dp === "month") return MONTHS[mo - 1] + " " + y;
  return d + " " + MONTHS[mo - 1] + " " + y;
}
const SYM = { circle: d3.symbolCircle, diamond: d3.symbolDiamond, square: d3.symbolSquare, triangle: d3.symbolTriangle, star: d3.symbolStar };
function shapeSvg(catId, size = 14, hollow = false, co = null) {
  const c = CAT[catId];
  const p = d3.symbol().type(SYM[c.shape]).size(size * size * (hollow ? 0.5 : 0.62))();
  const col = co ? `var(--co-${co})` : "var(--fg)";
  let style;
  if (catId === "strategy") style = `fill="none" stroke="${col}" stroke-width="1.4"`;
  else if (hollow) style = `fill="none" stroke="${col}" stroke-width="2"`;
  else style = `fill="${col}"`;
  return `<svg width="${size}" height="${size}" viewBox="${-size/2} ${-size/2} ${size} ${size}" aria-hidden="true"><path d="${p}" ${style}/></svg>`;
}
function neutralDot(size = 12) {
  return `<svg width="${size}" height="${size}" viewBox="0 0 12 12" aria-hidden="true"><circle cx="6" cy="6" r="4.5" fill="var(--node)" stroke="var(--node-stroke)" stroke-width="1"/></svg>`;
}
function esc(s) { return String(s).replace(/[&<>"]/g, ch => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[ch])); }
const fmtNum = d3.format(",");
const names = ids => { const n = ids.map(id => CO[id].name); return n.length < 3 ? n.join(" and ") : n.slice(0, -1).join(", ") + " and " + n[n.length - 1]; };
const degree = {};
MOVES.forEach(m => m.parties.forEach(([p]) => { degree[p] = (degree[p] || 0) + 1; }));

// ---------- filter state ----------
const activeCos = new Set(COS.map(c => c.id));
const coOn = id => activeCos.has(id);
const multi = () => activeCos.size > 1;
const MAP_TECHS = TECHS;
const CHART_TECHS = TECHS.filter(t => t.id !== "biogas");
const TECH = Object.fromEntries(TECHS.map(t => [t.id, t]));
const activeTechs = new Set(TECHS.map(t => t.id).filter(id => id !== "nuclear"));
// Moves with no single source (targets, ownership changes, renames) follow the "Company-wide moves" chip instead.
let showCompanyWide = true;
const techOn = m => m.techs.length ? m.techs.some(t => activeTechs.has(t)) : showCompanyWide;
const activeCats = new Set(CATS.map(c => c.id));
const activePer = new Set(PERIODS.map(p => p.id));
const moveVisible = m => coOn(m.co) && activeCats.has(m.cat) && activePer.has(m.period) && techOn(m);
let capView = "source", showTargets = true, page = "map", booting = true;

// ---------- graph data ----------
const nodes = [];
const links = [];
const DEFAULT_ANG = { deals: -2.4, tenders: -0.6, contracts: 0.6, partners: 2.4, strategy: 1.57 };
const ANG = Object.fromEntries(COS.map(c => [c.id, { ...DEFAULT_ANG, ...(c.angles || {}) }]));
const anchorOf = n => {
  if (n.kind === "cp") { const cs = [...PARTY[n.id.slice(2)].cos]; return { x: d3.mean(cs, c => CO[c].cx), y: d3.mean(cs, c => CO[c].cy) }; }
  return { x: CO[n.co].cx, y: CO[n.co].cy };
};
COS.forEach(c => {
  nodes.push({ id: c.id + ":center", kind: "center", co: c.id, label: c.name, area: 2400, x: c.cx, y: c.cy, fx: c.cx, fy: c.cy });
  CATS.forEach(cat => {
    if (!c.d.MOVES.some(m => m.cat === cat.id)) return;
    const a = ANG[c.id][cat.id];
    nodes.push({ id: c.id + ":hub_" + cat.id, kind: "hub", co: c.id, cat: cat.id, label: cat.name, area: cat.id === "strategy" ? 1300 : 950,
      x: c.cx + Math.cos(a) * 190, y: c.cy + Math.sin(a) * 160 });
    links.push({ source: c.id + ":center", target: c.id + ":hub_" + cat.id, kind: "trunk" });
  });
});
MOVES.forEach((m, i) => {
  const a = ANG[m.co][m.cat] + ((i % 7) - 3) * 0.2;
  const c = CO[m.co];
  nodes.push({ id: m.id, kind: "move", co: m.co, cat: m.cat, lost: !!m.lost, label: m.short, area: m.cat === "strategy" ? 420 : 340,
    x: c.cx + Math.cos(a) * 310, y: c.cy + Math.sin(a) * 260 });
  links.push({ source: m.co + ":hub_" + m.cat, target: m.id, kind: "branch" });
  m.parties.forEach(([pid]) => links.push(ALIAS[pid]
    ? { source: m.id, target: ALIAS[pid] + ":center", kind: "xco" }
    : { source: m.id, target: "p_" + pid, kind: "leaf" }));
});
PARTIES.forEach(p => {
  const ms = MOVES.filter(m => m.parties.some(x => x[0] === p.id));
  const shared = p.cos.size > 1;
  const fm = nodes.find(n => n.id === ms[0].id);
  const n = { id: "p_" + p.id, kind: "cp", shared, project: !!p.project, quiet: !p.project && !shared && (degree[p.id] || 0) < 2,
    label: p.name, area: p.project ? 230 : (shared ? 260 : 130 + Math.min(4, degree[p.id] || 1) * 25) };
  const an = anchorOf(n);
  n.x = shared ? an.x + (fm.x - an.x) * 0.3 : an.x + (fm.x - an.x) * 1.15;
  n.y = shared ? an.y + (fm.y - an.y) * 0.3 : an.y + (fm.y - an.y) * 1.15;
  nodes.push(n);
});
const NODE = Object.fromEntries(nodes.map(n => [n.id, n]));
nodes.forEach(n => { n.r = Math.sqrt(n.area / Math.PI); n.an = anchorOf(n); });

const sim = d3.forceSimulation(nodes)
  .randomSource(d3.randomLcg(0.42))
  .force("link", d3.forceLink(links).id(d => d.id)
    .distance(l => l.kind === "trunk" ? 210 : l.kind === "branch" ? 105 : l.kind === "xco" ? 260 : 80)
    .strength(l => l.kind === "trunk" ? 0.9 : l.kind === "branch" ? 0.65 : l.kind === "xco" ? 0.03 : 0.4 / Math.max(1, degree[l.target.id.slice(2)] || 1)))
  .force("charge", d3.forceManyBody().strength(d => d.kind === "hub" ? -1000 : d.kind === "center" ? -1400 : d.kind === "move" ? -560 : -320))
  .force("collide", d3.forceCollide(d => d.r + (d.kind === "hub" ? 36 : d.kind === "move" ? 30 : 18)).iterations(3))
  .force("x", d3.forceX(d => d.an.x).strength(d => d.kind === "cp" && d.shared ? 0.08 : 0.03))
  .force("y", d3.forceY(d => d.an.y).strength(d => d.kind === "cp" && d.shared ? 0.08 : 0.05))
  .stop();
for (let i = 0; i < 650; i++) sim.tick();

// ---------- render map ----------
const svg = d3.select("#map");
const root = svg.append("g");
const linkG = root.append("g").attr("class", "links");
const nodeG = root.append("g").attr("class", "nodes");
const linkSel = linkG.selectAll("line").data(links).join("line")
  .attr("class", d => d.kind === "trunk" || d.kind === "xco" ? d.kind : "")
  .attr("x1", d => d.source.x).attr("y1", d => d.source.y)
  .attr("x2", d => d.target.x).attr("y2", d => d.target.y);
function symFor(d) {
  let t = d3.symbolCircle;
  if (d.kind === "hub" || d.kind === "move") t = SYM[CAT[d.cat].shape];
  if (d.project) t = d3.symbolSquare;
  return d3.symbol().type(t).size(d.area)();
}
function ariaFor(d) {
  if (d.kind === "move") { const m = MOVE[d.id]; return `${CO[m.co].name}: ${m.title}. ${CAT[m.cat].name}${m.lost ? ", " + m.lost : ""}, ${fmtDate(m)}`; }
  if (d.kind === "hub") return `${CO[d.co].name} category: ${d.label}`;
  if (d.kind === "cp") return `${d.label}, ${PARTY[d.id.slice(2)].type}`;
  return d.label;
}
const leftOf = d => d.x < d.an.x;
const nodeSel = nodeG.selectAll("g").data(nodes).join("g")
  .attr("class", d => ["node", d.kind, d.co && d.kind !== "cp" ? "co-" + d.co : "", d.cat ? "cat-" + d.cat : "", d.lost ? "lost" : "", d.project ? "project" : "", d.quiet ? "quiet" : "", d.shared ? "shared" : ""].join(" "))
  .attr("transform", d => `translate(${d.x},${d.y})`)
  .attr("tabindex", 0).attr("role", "button")
  .attr("aria-label", ariaFor);
nodeSel.append("path").attr("d", symFor);
nodeSel.append("text")
  .text(d => d.label)
  .attr("text-anchor", d => (d.kind === "hub" || d.kind === "center") ? "middle" : (leftOf(d) ? "end" : "start"))
  .attr("x", d => (d.kind === "hub" || d.kind === "center") ? 0 : (leftOf(d) ? -(d.r + 6) : d.r + 6))
  .attr("y", d => (d.kind === "hub" || d.kind === "center") ? d.r + 17 : 4);

const zoom = d3.zoom().scaleExtent([0.2, 3.5])
  .filter(ev => {
    if (ev.type === "wheel") return true;
    if (ev.touches) return ev.touches.length > 1;
    return !ev.button;
  })
  .on("zoom", ev => root.attr("transform", ev.transform));
svg.call(zoom).on("dblclick.zoom", null);

const box = document.getElementById("mapbox");
function fit(animate) {
  const w = box.clientWidth, h = box.clientHeight;
  if (!w || !h) return;
  svg.attr("viewBox", `0 0 ${w} ${h}`);
  const vis = nodes.filter(n => !n._off);
  let x0 = Infinity, x1 = -Infinity, y0 = Infinity, y1 = -Infinity;
  vis.forEach(n => {
    const lw = n.quiet ? 0 : n.label.length * 6.3;
    const mid = n.kind === "hub" || n.kind === "center";
    const lft = leftOf(n);
    const left = mid ? n.x - lw / 2 : (lft ? n.x - n.r - 6 - lw : n.x - n.r);
    const right = mid ? n.x + lw / 2 : (lft ? n.x + n.r : n.x + n.r + 6 + lw);
    x0 = Math.min(x0, left); x1 = Math.max(x1, right);
    y0 = Math.min(y0, n.y - n.r - 4); y1 = Math.max(y1, n.y + n.r + 22);
  });
  const pad = 18, bw = x1 - x0 + pad * 2, bh = y1 - y0 + pad * 2;
  const top = 48, bottom = 26; // keep clear of the zoom buttons and the hint line
  const s = Math.max(0.2, Math.min(1.5, Math.min(w / bw, (h - top - bottom) / bh)));
  const t = d3.zoomIdentity.translate(w / 2 - s * (x0 + x1) / 2, top + (h - top - bottom) / 2 - s * (y0 + y1) / 2).scale(s);
  (animate ? svg.transition().duration(350) : svg).call(zoom.transform, t);
}
document.getElementById("zin").onclick = () => svg.transition().duration(200).call(zoom.scaleBy, 1.3);
document.getElementById("zout").onclick = () => svg.transition().duration(200).call(zoom.scaleBy, 1 / 1.3);
document.getElementById("zfit").onclick = () => fit(true);
const stage = document.querySelector(".stage");
const fsBtn = document.getElementById("zfull");
const isExpanded = () => !!document.fullscreenElement || stage.classList.contains("is-expanded");
function setFsLabel() { const on = isExpanded(); fsBtn.textContent = on ? "Exit full screen" : "Full screen"; fsBtn.setAttribute("aria-pressed", String(on)); }
function exitExpanded() { stage.classList.remove("is-expanded"); document.body.style.overflow = ""; setFsLabel(); }
fsBtn.onclick = async () => {
  if (document.fullscreenElement) { document.exitFullscreen().catch(() => {}); return; }
  if (stage.classList.contains("is-expanded")) { exitExpanded(); return; }
  try {
    if (!stage.requestFullscreen) throw new Error("unsupported");
    await stage.requestFullscreen();
  } catch (e) {
    stage.classList.add("is-expanded"); document.body.style.overflow = "hidden"; setFsLabel();
  }
};
document.addEventListener("fullscreenchange", setFsLabel);
new ResizeObserver(() => fit(false)).observe(box);

function moveTip(tipEl, host, ev) {
  const [x, y] = d3.pointer(ev, host);
  const tw = tipEl.offsetWidth, th = tipEl.offsetHeight, bw = host.clientWidth, bh = host.clientHeight;
  tipEl.style.left = Math.max(6, Math.min(bw - tw - 6, x + 14)) + "px";
  tipEl.style.top = (y + th + 24 > bh ? y - th - 12 : y + 16) + "px";
}
function showTip(tipEl, host, html, ev) { tipEl.innerHTML = html; tipEl.hidden = false; moveTip(tipEl, host, ev); }
const tip = document.getElementById("tip");
nodeSel.on("pointerenter", (ev, d) => {
  let sub = "";
  if (d.kind === "move") { const m = MOVE[d.id]; sub = `${CO[m.co].name} · ${fmtDate(m)} · ${CAT[d.cat].name}${m.lost ? " · " + m.lost : ""}`; }
  else if (d.kind === "cp") { const p = PARTY[d.id.slice(2)]; sub = p.type + (p.cos.size > 1 ? " · dealt with " + names([...p.cos]) : ""); }
  else if (d.kind === "hub") sub = `${CO[d.co].name} · ${CAT[d.cat].long}`;
  const name = d.kind === "move" ? MOVE[d.id].title : d.label;
  showTip(tip, box, `${esc(name)}${sub ? `<small>${esc(sub)}</small>` : ""}`, ev);
}).on("pointermove", ev => moveTip(tip, box, ev))
  .on("pointerleave", () => { tip.hidden = true; });

// ---------- selection ----------
let selected = null;
function neighbours(id) {
  const set = new Set([id]);
  links.forEach(l => {
    if (l.source.id === id) set.add(l.target.id);
    if (l.target.id === id) set.add(l.source.id);
  });
  return set;
}
function select(id, opts = {}) {
  selected = id;
  const svgEl = svg.node();
  if (!id) {
    svgEl.classList.remove("dimmed");
    nodeSel.classed("lit", false).classed("sel", false);
    linkSel.classed("lit", false);
    renderPanel(null);
    return;
  }
  const lit = neighbours(id);
  if (id.startsWith("p_")) [...lit].forEach(n => { if (MOVE[n]) lit.add(MOVE[n].co + ":hub_" + MOVE[n].cat); });
  if (MOVE[id]) MOVE[id].parties.forEach(([pid]) => { if (ALIAS[pid]) lit.add(ALIAS[pid] + ":center"); });
  svgEl.classList.add("dimmed");
  nodeSel.classed("lit", d => lit.has(d.id)).classed("sel", d => d.id === id);
  linkSel.classed("lit", l => lit.has(l.source.id) && lit.has(l.target.id) &&
    (l.kind !== "trunk" || l.source.id === id || l.target.id === id));
  renderPanel(id);
  if (opts.scroll) box.scrollIntoView({ behavior: matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth", block: "start" });
}
nodeSel.on("click", (ev, d) => { ev.stopPropagation(); select(d.id === selected ? null : d.id); })
  .on("keydown", (ev, d) => { if (ev.key === "Enter" || ev.key === " ") { ev.preventDefault(); select(d.id); } });
svg.on("click", () => select(null));
document.addEventListener("keydown", ev => {
  if (ev.key !== "Escape") return;
  if (stage.classList.contains("is-expanded")) { exitExpanded(); return; }
  if (selected) select(null);
});

// ---------- panel ----------
const panel = document.getElementById("panel");
function srcList(keys) {
  return `<ul class="srcs">${keys.map(k => `<li><a href="${esc(S[k].u)}" target="_blank" rel="noopener">${esc(S[k].t)}</a></li>`).join("")}</ul>`;
}
function moveBtn(m, extra) {
  const who = multi() ? CO[m.co].name + " · " : "";
  return `<li><button type="button" data-go="${m.id}">${shapeSvg(m.cat, 14, !!m.lost, m.co)}<span>${esc(m.title)}<small>${who}${fmtDate(m)}${m.lost ? " · " + m.lost : ""}${extra ? " · " + esc(extra) : ""}</small></span></button></li>`;
}
function partyBtn(pid, role) {
  const p = PARTY[pid];
  return `<li><button type="button" data-go="p_${pid}">${neutralDot(14)}<span>${esc(p.name)}<small>${esc(role)}</small></span></button></li>`;
}
function coBtn(co, role) {
  return `<li><button type="button" data-go="${co}:center"><span class="codot ${co}" style="margin:4px 0 0 2px"></span><span>${esc(CO[co].name)}<small>${esc(role)} · on this map</small></span></button></li>`;
}
function otherSide(m) {
  return m.parties.map(([pid, role]) => {
    if (ALIAS[pid]) return coBtn(ALIAS[pid], role);
    const others = [...PARTY[pid].cos].filter(c => c !== m.co);
    return partyBtn(pid, role + (others.length ? " · also dealt with " + names(others) : ""));
  }).join("");
}
function renderPanel(id) {
  let html = "";
  if (!id) {
    const act = COS.filter(c => coOn(c.id));
    const worth = multi() ? WORTH_MULTI.filter(([pid]) => PARTY[pid] && [...PARTY[pid].cos].filter(coOn).length > 1) : CO[act[0].id].worth;
    const vis = MOVES.filter(m => coOn(m.co));
    html = `<h2>Reading the map</h2>
      <p>Each shape is a move: its colour shows the company (${act.map(c => `<span class="codot ${c.id}"></span>${esc(c.name)}`).join(", ")}) and its shape the category. Moves hang off their category and connect to the companies or public bodies on the other side. Hollow diamonds are tenders not won; outlined stars are stated goals.${multi() ? " Larger grey dots between clusters dealt with more than one company, and dashed lines lead to a rival company named in a move." : ""}</p>
      <p class="sub">Categories</p>
      <ul class="plist">${CATS.map(c => `<li><button type="button" data-cat-go="${c.id}">${shapeSvg(c.id, 14)}<span>${esc(c.name)} · ${vis.filter(m => m.cat === c.id).length}<small>${esc(c.long)}</small></span></button></li>`).join("")}</ul>
      ${worth.length ? `<p class="sub">Worth a click</p><ul class="plist">${worth.map(([pid, why]) => partyBtn(pid, why)).join("")}</ul>` : ""}`;
  } else if (id.endsWith(":center")) {
    const co = id.split(":")[0], c = CO[co], B = c.d.BASELINE;
    const named = MOVES.filter(m => m.co !== co && m.parties.some(([pid]) => ALIAS[pid] === co)).sort((a, b) => b.date.localeCompare(a.date));
    html = `<div class="kicker"><span class="tag"><span class="codot ${co}"></span>Baseline</span></div><h2>${esc(B.title)}</h2>
      <div class="figs">${esc(B.figs)}</div><p>${esc(B.text)}</p>
      ${named.length ? `<p class="sub">Named in other companies’ moves</p><ul class="plist">${named.map(m => moveBtn(m, m.parties.find(([pid]) => ALIAS[pid] === co)[1])).join("")}</ul>` : ""}
      <p class="sub">Sources</p>${srcList(B.src)}`;
  } else if (id.includes(":hub_")) {
    const [co, rest] = id.split(":hub_"); const c = CAT[rest];
    const ms = MOVES.filter(m => m.co === co && m.cat === c.id && moveVisible(m)).sort((a, b) => b.date.localeCompare(a.date));
    html = `<div class="kicker"><span class="tag">${shapeSvg(c.id, 14, false, co)}${esc(CO[co].name)}</span></div><h2>${esc(c.name)}</h2>
      <p>${esc(c.desc)}</p><p class="sub">${ms.length} moves shown, newest first</p><ul class="plist">${ms.map(m => moveBtn(m)).join("")}</ul>`;
  } else if (id.startsWith("p_")) {
    const p = PARTY[id.slice(2)];
    const ms = MOVES.filter(m => m.parties.some(x => x[0] === p.id)).sort((a, b) => b.date.localeCompare(a.date));
    const shared = p.cos.size > 1;
    html = `<div class="kicker">${p.project ? "Project" : "Counterparty"}${shared ? `<span class="badge both">Dealt with ${esc(names([...p.cos]))}</span>` : ""}</div><h2>${esc(p.name)}</h2>
      <p class="note">${esc(p.type)}</p>
      <p class="sub">${ms.length === 1 ? "1 move" : ms.length + " moves"}</p>
      <ul class="plist">${ms.map(m => {
        const role = m.parties.find(x => x[0] === p.id)[1];
        return `<li><button type="button" data-go="${m.id}">${shapeSvg(m.cat, 14, !!m.lost, m.co)}<span>${esc(m.title)}<small>${CO[m.co].name} · ${fmtDate(m)} · ${esc(role)}</small></span></button></li>`;
      }).join("")}</ul>`;
  } else {
    const m = MOVE[id];
    html = `<div class="kicker"><span class="tag"><span class="codot ${m.co}"></span>${esc(CO[m.co].name)}</span><span class="tag">${shapeSvg(m.cat, 14, !!m.lost, m.co)}${esc(CAT[m.cat].name)}</span><span>${fmtDate(m)}</span>${m.lost ? `<span class="badge">${esc(m.lost)}</span>` : ""}</div>
      <h2>${esc(m.title)}</h2>
      <div class="note">${esc(m.tech)}</div>
      <div class="figs">${esc(m.figs)}</div>
      <p>${esc(m.text)}</p>
      ${m.parties.length ? `<p class="sub">Other side</p><ul class="plist">${otherSide(m)}</ul>` : ""}
      <p class="sub">Sources</p>${srcList(m.src)}`;
  }
  if (id) html += `<div><button type="button" class="chip" data-go="">Back to overview</button></div>`;
  panel.innerHTML = html;
  panel.scrollTop = 0;
}
panel.addEventListener("click", ev => {
  const cb = ev.target.closest("[data-cat-go]");
  if (cb) {
    const cat = cb.getAttribute("data-cat-go");
    const co = COS.map(c => c.id).find(c => coOn(c) && NODE[c + ":hub_" + cat]);
    if (!co) return;
    const hub = co + ":hub_" + cat;
    if (NODE[hub]._off) showAll();
    select(hub);
    return;
  }
  const b = ev.target.closest("[data-go]");
  if (!b) return;
  const id = b.getAttribute("data-go");
  if (id && NODE[id] && NODE[id]._off) showAll();
  select(id || null);
});

// ---------- filters ----------
function renderStrips() {
  const base = MOVES.filter(m => coOn(m.co));
  document.querySelector(".js-co").innerHTML = `<span class="lab">Companies</span>` + COS.map(c =>
    `<button type="button" class="chip" data-co="${c.id}" aria-pressed="${coOn(c.id)}"><span class="codot ${c.id}" style="margin-right:0"></span>${esc(c.name)}<span class="n">${MOVES.filter(m => m.co === c.id).length}</span></button>`).join("");
  document.querySelector(".js-tech").innerHTML = `<span class="lab">Sources</span>` + TECHS.map(t =>
    `<button type="button" class="chip" data-tech="${t.id}" aria-pressed="${activeTechs.has(t.id)}" title="${esc(t.note || t.name)}">${esc(t.name)}<span class="n">${base.filter(m => m.techs.includes(t.id)).length}</span></button>`).join("") +
    `<button type="button" class="chip" data-cw="1" aria-pressed="${showCompanyWide}" style="margin-left:8px" title="Targets, ownership changes and other moves not tied to one source">Company-wide moves<span class="n">${base.filter(m => !m.techs.length).length}</span></button>`;
  document.querySelector(".js-cat").innerHTML = `<span class="lab">Category</span>` + CATS.map(c =>
    `<button type="button" class="chip" data-cat="${c.id}" aria-pressed="${activeCats.has(c.id)}">${shapeSvg(c.id, 14)}${esc(c.name)}<span class="n">${base.filter(m => m.cat === c.id).length}</span></button>`).join("");
  document.querySelector(".js-per").innerHTML = `<span class="lab">Period</span>` + PERIODS.map(p =>
    `<button type="button" class="chip" data-per="${p.id}" aria-pressed="${activePer.has(p.id)}">${esc(p.name)}<span class="n">${base.filter(m => m.period === p.id).length}</span></button>`).join("");
  document.querySelector(".js-view").innerHTML = `<span class="lab">Capacity</span>` +
    `<button type="button" class="chip seg" data-view="source" aria-pressed="${capView === "source"}">By source</button>` +
    `<button type="button" class="chip seg" data-view="combined" aria-pressed="${capView === "combined"}">Combined line</button>` +
    `<button type="button" class="chip" data-targets="1" aria-pressed="${showTargets}">Targets</button>`;
}
function applyFilters() {
  nodes.forEach(n => {
    if (n.kind === "center") n._off = !coOn(n.co);
    else if (n.kind === "hub") n._off = !MOVES.some(m => m.co === n.co && m.cat === n.cat && moveVisible(m));
    else if (n.kind === "move") n._off = !moveVisible(MOVE[n.id]);
  });
  nodes.filter(n => n.kind === "cp").forEach(n => {
    const pid = n.id.slice(2);
    n._off = !MOVES.some(m => moveVisible(m) && m.parties.some(x => x[0] === pid));
  });
  nodeSel.classed("off", d => d._off);
  linkSel.classed("off", l => l.source._off || l.target._off);
  if (selected && NODE[selected] && NODE[selected]._off) select(null);
  else renderPanel(selected);
  renderStrips();
  if (page === "map") fit(!booting);
  drawCharts();
  renderFindings();
  renderGaps();
  renderLedger();
  renderMeta();
}
function showAll() {
  COS.forEach(c => activeCos.add(c.id)); CATS.forEach(c => activeCats.add(c.id)); PERIODS.forEach(p => activePer.add(p.id));
  TECHS.forEach(t => { if (t.id !== "nuclear") activeTechs.add(t.id); });
  showCompanyWide = true;
  applyFilters();
}
function toggleIn(set, key) { if (set.has(key) && set.size === 1) return; set.has(key) ? set.delete(key) : set.add(key); }
document.getElementById("filters").addEventListener("click", ev => {
  const b = ev.target.closest("button"); if (!b) return;
  if (b.dataset.co) toggleIn(activeCos, b.dataset.co);
  else if (b.dataset.tech) toggleIn(activeTechs, b.dataset.tech);
  else if (b.dataset.cw) showCompanyWide = !showCompanyWide;
  else if (b.dataset.cat) toggleIn(activeCats, b.dataset.cat);
  else if (b.dataset.per) toggleIn(activePer, b.dataset.per);
  else if (b.dataset.view) capView = b.dataset.view;
  else if (b.dataset.targets) showTargets = !showTargets;
  else return;
  applyFilters();
});

// ---------- pages ----------
const PAGES = { map: document.getElementById("page-map"), capacity: document.getElementById("page-capacity") };
function setPage(p, opts = {}) {
  page = p === "capacity" ? "capacity" : "map";
  Object.entries(PAGES).forEach(([k, el]) => { el.hidden = k !== page; });
  document.querySelectorAll("[data-page-link]").forEach(a => { if (a.dataset.pageLink === page) a.setAttribute("aria-current", "page"); else a.removeAttribute("aria-current"); });
  document.querySelector(".js-view").hidden = page !== "capacity";
  if (page === "map") fit(false); else drawCharts();
  if (opts.scroll) {
    const top = document.querySelector(".nav").offsetTop;
    if (window.scrollY > top) window.scrollTo({ top, behavior: "auto" });
  }
}
document.querySelectorAll("[data-page-link]").forEach(a => a.addEventListener("click", ev => {
  ev.preventDefault();
  setPage(a.dataset.pageLink, { scroll: true });
  try { history.replaceState(null, "", "#" + page); } catch (e) {}
}));
window.addEventListener("hashchange", () => setPage(location.hash.slice(1)));
function goToMove(id) {
  if (page !== "map") setPage("map");
  if (NODE[id]._off) showAll();
  select(id, { scroll: true });
}

// ---------- timeline chart: one row per company ----------
const tlSvg = d3.select("#tl");
const tlCard = document.getElementById("tlcard");
const tlTip = document.getElementById("tltip");
function tlLegend(rows) {
  document.getElementById("tllegend").innerHTML =
    rows.map(c => `<span><span class="codot ${c.id}" style="margin-right:0"></span>${esc(c.name)}</span>`).join("") +
    CATS.filter(c => c.id !== "strategy").map(c => `<span>${shapeSvg(c.id, 12)}${esc(c.name)}</span>`).join("") +
    `<span>${shapeSvg("tenders", 12, true)}Tender lost, not selected or withdrawn</span>`;
}
function drawTimeline() {
  const W = tlSvg.node().clientWidth || 800;
  const narrow = W < 560;
  const rows = COS.filter(c => coOn(c.id));
  tlLegend(rows);
  const rowH = rows.length > 1 ? (narrow ? 190 : 210) : (narrow ? 290 : 340);
  const m = { t: 22, r: narrow ? 12 : 24, b: 30, l: 50, gap: 28 };
  const H = m.t + rows.length * rowH + (rows.length - 1) * m.gap + m.b;
  tlSvg.attr("viewBox", `0 0 ${W} ${H}`).attr("height", H);
  tlSvg.selectAll("*").remove();
  const x = d3.scaleTime().domain([parse("2016-10-01"), parse("2026-12-31")]).range([m.l, W - m.r]);
  const yt = [1, 3, 10, 30, 100, 300, 1000, 3000];
  rows.forEach((c, i) => {
    const top = m.t + i * (rowH + m.gap), bot = top + rowH;
    const y = d3.scaleLog().domain([1, 4000]).range([bot, top + 6]);
    const g0 = tlSvg.append("g");
    g0.append("text").attr("x", m.l).attr("y", top - 8).style("fill", "var(--fg)").style("font", "700 12px var(--f-display)").style("letter-spacing", ".04em").style("text-transform", "uppercase").text(c.name);
    g0.append("text").attr("x", m.l - 40).attr("y", top - 8).style("fill", "var(--muted)").style("font", "11px var(--f-mono)").text("MW");
    g0.append("g").attr("class", "grid").attr("transform", `translate(${m.l},0)`)
      .call(d3.axisLeft(y).tickValues(yt).tickSize(-(W - m.l - m.r)).tickFormat(""));
    g0.append("g").attr("class", "axis").attr("transform", `translate(${m.l},0)`)
      .call(d3.axisLeft(y).tickValues(yt).tickFormat(d => fmtNum(d)).tickSizeOuter(0));
    g0.append("g").attr("class", "axis").attr("transform", `translate(0,${bot})`)
      .call(d3.axisBottom(x).ticks(d3.timeYear.every(narrow ? 2 : 1)).tickFormat(i === rows.length - 1 ? d3.timeFormat("%Y") : () => "").tickSizeOuter(0));
    const pts = MOVES.filter(mv => mv.co === c.id && mv.mw && mv.cat !== "strategy" && moveVisible(mv));
    const g = g0.append("g").selectAll("g").data(pts).join("g")
      .attr("class", d => `pt co-${c.id} cat-${d.cat}${d.lost ? " lost" : ""}`)
      .attr("transform", d => `translate(${x(parse(d.date))},${y(d.mw)})`)
      .attr("tabindex", 0).attr("role", "button")
      .attr("aria-label", d => `${c.name}: ${d.title}, ${fmtNum(d.mw)} MW, ${fmtDate(d)}`);
    g.append("circle").attr("class", "hit").attr("r", 13);
    g.append("path").attr("class", "mark").attr("d", d => d3.symbol().type(SYM[CAT[d.cat].shape]).size(d.lost ? 105 : 120)());
    const placed = pts.map(d => ({ x0: x(parse(d.date)) - 7, x1: x(parse(d.date)) + 7, y0: y(d.mw) - 7, y1: y(d.mw) + 7 }));
    const lab = new Map();
    pts.filter(d => d.mw >= 500).sort((a, b) => b.mw - a.mw).forEach(d => {
      const px = x(parse(d.date)), py = y(d.mw), txt = `${d.short} · ${fmtNum(d.mw)} MW`, w = txt.length * 6 + 4;
      const right = px + 11 + w <= W - m.r;
      for (const dy of [4, -9, 17]) {
        const b = right ? { x0: px + 11, x1: px + 11 + w, y0: py + dy - 10, y1: py + dy + 3 } : { x0: px - 11 - w, x1: px - 11, y0: py + dy - 10, y1: py + dy + 3 };
        if (b.y0 < top - 2 || b.x0 < 2 || placed.some(o => b.x0 < o.x1 && b.x1 > o.x0 && b.y0 < o.y1 && b.y1 > o.y0)) continue;
        placed.push(b); lab.set(d, { dy, right, txt }); break;
      }
    });
    g.filter(d => lab.has(d)).append("text")
      .attr("x", d => lab.get(d).right ? 11 : -11).attr("y", d => lab.get(d).dy)
      .attr("text-anchor", d => lab.get(d).right ? "start" : "end")
      .text(d => lab.get(d).txt);
    g.on("pointerenter", (ev, d) => showTip(tlTip, tlCard,
        `${esc(d.title)}<small>${c.name} · ${fmtDate(d)} · ${fmtNum(d.mw)} MW · ${esc(CAT[d.cat].name)}${d.lost ? " · " + d.lost : ""}</small>`, ev))
      .on("pointermove", ev => moveTip(tlTip, tlCard, ev))
      .on("pointerleave", () => { tlTip.hidden = true; })
      .on("click", (ev, d) => goToMove(d.id))
      .on("keydown", (ev, d) => { if (ev.key === "Enter" || ev.key === " ") { ev.preventDefault(); goToMove(d.id); } });
  });
}

// ---------- capacity by source ----------
const REC = COS.flatMap(c => c.d.CAPACITY.map(r => ({ ...r, co: c.id, t: parse(r.date) })));
const TGT = COS.flatMap(c => c.d.TARGETS.map(r => ({ ...r, co: c.id, t: parse(r.date) })));
const X0 = parse("2015-01-01"), X1 = parse("2031-12-31"), TODAY = parse(SITE.today);
const fmtMonth = d3.timeFormat("%b %Y");
const selCos = () => COS.filter(c => coOn(c.id)).map(c => c.id);
const srcName = (co, k) => { const t = CO[co].d.S[k].t; const m = t.match(/\(([^()]*)\)\s*$/); return m ? m[1] : t; };
const srcNames = (co, ks) => ks.map(k => srcName(co, k)).join(" · ");
const fmtV = (v, gw) => gw ? d3.format(".3~r")(v / 1000) + " GW" : d3.format(",")(Math.round(v)) + " MW";
const qual = (txt, r) => (r && r.q === "~" ? "~" : "") + txt + (r && r.q === "+" ? "+" : "") + (r && r.derived ? "*" : "");
const lineSwatch = c => `<svg width="26" height="10" viewBox="0 0 26 10" aria-hidden="true"><line x1="2" y1="5" x2="24" y2="5" stroke="var(--co-${c.id})" stroke-width="2.5" stroke-linecap="round"${c.dash ? ` stroke-dasharray="${c.dash}"` : ""}/></svg>`;

function techModel(k) {
  const cos = selCos();
  const series = cos.map(co => ({ co, pts: REC.filter(r => r.co === co && r.mw && r.mw[k] != null)
    .map(r => ({ t: r.t, v: r.mw[k], r, hollow: !!r.derived })).sort((a, b) => a.t - b.t) })).filter(s => s.pts.length);
  const targets = showTargets ? TGT.filter(g => cos.includes(g.co) && g.covers.length === 1 && g.covers[0] === k) : [];
  const missing = cos.filter(co => !series.some(s => s.co === co)).map(co =>
    CO[co].name + (REC.some(r => r.co === co && r.total != null && r.covers.includes(k)) ? " (only inside its totals)" : ""));
  return { series, targets, missing: missing.length ? "No separate figure: " + missing.join(", ") + "." : "" };
}
function totalsModel() {
  const cos = selCos();
  const series = cos.map(co => ({ co, pts: REC.filter(r => r.co === co && (
      (r.total != null && r.covers.every(k => activeTechs.has(k))) ||
      (r.mw && Object.keys(r.mw).length > 1 && Object.keys(r.mw).every(k => activeTechs.has(k)))))
    .map(r => ({ t: r.t, v: r.total != null ? r.total : d3.sum(Object.values(r.mw)), r, hollow: !!r.derived })).sort((a, b) => a.t - b.t) })).filter(s => s.pts.length);
  const targets = showTargets ? TGT.filter(g => cos.includes(g.co) && g.covers.length > 1 && g.covers.every(k => activeTechs.has(k))) : [];
  const missing = cos.filter(co => !series.some(s => s.co === co)).map(co => CO[co].name);
  return { series, targets, missing: missing.length ? "No total for the selected sources: " + missing.join(", ") + "." : "" };
}
function combinedModel() {
  const cos = selCos();
  const series = [], notes = [];
  cos.forEach(co => {
    const recs = REC.filter(r => r.co === co);
    const nMw = recs.filter(r => r.mw).length, nTot = recs.filter(r => r.total != null).length;
    if (nTot > nMw) {
      const pts = recs.filter(r => r.total != null && r.covers.every(k => activeTechs.has(k))).map(r => ({ t: r.t, v: r.total, r })).sort((a, b) => a.t - b.t);
      if (pts.length) series.push({ co, pts });
      notes.push(`${CO[co].name} uses its published totals, since it gives almost no split`);
      return;
    }
    const bySrc = {};
    recs.filter(r => r.mw).forEach(r => Object.entries(r.mw).forEach(([k, v]) => { if (activeTechs.has(k)) (bySrc[k] = bySrc[k] || []).push({ t: r.t, v, r }); }));
    Object.values(bySrc).forEach(a => a.sort((x, y) => x.t - y.t));
    const dates = [...new Set(Object.values(bySrc).flat().map(p => +p.t))].sort((a, b) => a - b);
    const pts = dates.map(d => {
      const parts = [];
      Object.entries(bySrc).forEach(([k, a]) => { let last = null; a.forEach(p => { if (+p.t <= d) last = p; }); if (last) parts.push({ k, ...last }); });
      return { t: new Date(d), v: d3.sum(parts, p => p.v), parts, hollow: parts.some(p => +p.t < d) };
    });
    if (pts.length) series.push({ co, pts });
  });
  const targets = showTargets ? TGT.filter(g => cos.includes(g.co) && g.covers.every(k => activeTechs.has(k))) : [];
  const missing = cos.filter(co => !series.some(s => s.co === co)).map(co => CO[co].name);
  return { series, targets, missing: (missing.length ? "Nothing to add up for: " + missing.join(", ") + ". " : "") + (notes.length ? notes.join("; ") + "." : "") };
}

const ctip = document.getElementById("ctip");
function cShow(html, ev, el) {
  ctip.innerHTML = html; ctip.hidden = false;
  let x, y;
  if (ev && ev.clientX != null) { x = ev.clientX; y = ev.clientY; } else { const b = el.getBoundingClientRect(); x = b.left + b.width / 2; y = b.top; }
  const w = ctip.offsetWidth, h = ctip.offsetHeight;
  let left = x + 14, top = y - h - 10;
  if (left + w > window.innerWidth - 8) left = x - w - 14;
  if (left < 8) left = 8;
  if (top < 8) top = y + 16;
  ctip.style.left = left + "px"; ctip.style.top = top + "px";
}
const cHide = () => { ctip.hidden = true; };
function bindTip(sel, htmlFn) {
  sel.on("pointerenter pointermove", function (ev, d) { cShow(htmlFn(d), ev, this); })
    .on("pointerleave blur", cHide)
    .on("focus", function (ev, d) { cShow(htmlFn(d), null, this); });
}
function pointTip(co, d, kind, gw) {
  const r = d.r;
  if (kind === "combined" && d.parts) {
    return `<b>${esc(CO[co].name)}</b> ${fmtV(d.v, gw)} in ${fmtMonth(d.t)}` + d.parts.map(p =>
      `<div class="row${+p.t < +d.t ? " old" : ""}"><span>${esc(TECH[p.k].name)}</span><span>${qual(fmtV(p.v, gw), p.r)} · ${fmtMonth(p.t)}</span></div>`).join("") +
      (d.hollow ? `<small>Faded rows are carried forward from an earlier figure</small>` : "");
  }
  const what = r.total != null ? "Total, " + r.covers.map(k => TECH[k].name.toLowerCase()).join(" + ")
    : Object.keys(r.mw).length > 1 ? "Sum of " + Object.entries(r.mw).map(([k, v]) => `${TECH[k].name.toLowerCase()} ${d3.format(",")(v)}`).join(" + ") + " MW" : TECH[Object.keys(r.mw)[0]].name;
  return `<b>${esc(CO[co].name)}</b> ${qual(fmtV(d.v, gw), r)}<br>${esc(r.note)}` +
    `<small>${fmtMonth(d.t)} · ${esc(what)}${r.basis ? " · " + r.basis : ""}${r.derived ? " · our calculation" : ""}<br>${esc(srcNames(co, r.src))}</small>`;
}
function targetLabel(g, many) {
  const v = g.gwLow ? `${g.gwLow}–${g.gw}` : d3.format("~g")(g.gw);
  return `${many ? (g.co === "te" ? "TE" : CO[g.co].name) + " " : ""}${g.derived ? "~" : ""}${v} GW by ${g.t.getFullYear()}${g.derived ? "*" : ""}`;
}
function capPlot(svgEl, model, opt) {
  const sv = d3.select(svgEl);
  sv.selectAll("*").remove();
  const W = Math.max(240, svgEl.clientWidth || svgEl.parentNode.clientWidth || 360);
  const H = opt.H, m = { t: 16, r: 16, b: 24, l: 46 };
  const actual = model.series.flatMap(s => s.pts.map(p => p.v));
  const maxA = actual.length ? d3.max(actual) : d3.max(model.targets, g => g.gw * 1000);
  const gw = maxA >= 1500;
  const inScale = model.targets.filter(g => g.gw * 1000 <= 2.5 * maxA).map(g => g.gw * 1000);
  const y = d3.scaleLinear().domain([0, d3.max(actual.concat(inScale)) * 1.12]).nice(4).range([H - m.b, m.t]);
  const yMax = y.domain()[1];
  const x = d3.scaleTime().domain([X0, X1]).range([m.l, W - m.r]);
  sv.attr("viewBox", `0 0 ${W} ${H}`).attr("height", H);
  const yt = y.ticks(4);
  sv.append("g").attr("class", "grid").attr("transform", `translate(${m.l},0)`).call(d3.axisLeft(y).tickValues(yt).tickSize(-(W - m.l - m.r)).tickFormat(""));
  sv.append("g").attr("class", "axis").attr("transform", `translate(${m.l},0)`)
    .call(d3.axisLeft(y).tickValues(yt).tickFormat(v => gw ? d3.format("~g")(v / 1000) : d3.format(",")(v)).tickSizeOuter(0));
  const years = opt.wide ? d3.timeYear.every(W < 560 ? 4 : 2).range(X0, X1) : (W < 330 ? [2016, 2022, 2028] : [2016, 2020, 2024, 2028]).map(yr => new Date(yr, 0, 1));
  sv.append("g").attr("class", "axis").attr("transform", `translate(0,${H - m.b})`)
    .call(d3.axisBottom(x).tickValues(years).tickFormat(d3.timeFormat("%Y")).tickSizeOuter(0));
  sv.append("line").attr("class", "today").attr("x1", x(TODAY)).attr("x2", x(TODAY)).attr("y1", m.t).attr("y2", H - m.b);
  sv.append("text").attr("class", "today-t").attr("x", x(TODAY) + 3).attr("y", H - m.b - 5).text("Today");

  const boxes = [];
  const fits = b => b.x0 >= m.l - 2 && b.x1 <= W + 4 && b.y0 >= 0 && b.y1 <= H - m.b && !boxes.some(o => b.x0 < o.x1 && b.x1 > o.x0 && b.y0 < o.y1 && b.y1 > o.y0);
  function placeLabel(px, py, txt) {
    const w = txt.length * 6.2 + 4;
    for (const [dx, dy] of [[0, -10], [0, 18], [-8, -22], [0, 30]]) {
      const a = px + w / 2 > W - m.r ? "end" : px - w / 2 < m.l ? "start" : "middle";
      const lx = px + dx, x0 = a === "end" ? lx - w : a === "start" ? lx : lx - w / 2;
      const b = { x0, x1: x0 + w, y0: py + dy - 10, y1: py + dy + 3 };
      if (fits(b)) { boxes.push(b); sv.append("text").attr("class", "lbl").attr("x", lx).attr("y", py + dy).attr("text-anchor", a).text(txt); return; }
    }
  }
  model.series.forEach(s => {
    const c = CO[s.co];
    boxes.push(...s.pts.map(p => ({ x0: x(p.t) - 5, x1: x(p.t) + 5, y0: y(p.v) - 5, y1: y(p.v) + 5 })));
    if (s.pts.length > 1) sv.append("path").attr("class", `ln co-${c.id}`).attr("stroke-dasharray", c.dash)
      .attr("d", d3.line().x(p => x(p.t)).y(p => y(p.v))(s.pts));
  });
  model.series.forEach(s => {
    const c = CO[s.co];
    const g = sv.append("g").attr("class", `co-${c.id}`);
    const pts = g.selectAll("g").data(s.pts).join("g").attr("class", p => "pt" + (p.hollow ? " hollow" : ""))
      .attr("transform", p => `translate(${x(p.t)},${y(p.v)})`).attr("tabindex", 0)
      .attr("aria-label", p => `${c.name}, ${fmtMonth(p.t)}: ${fmtV(p.v, gw)}`);
    pts.append("circle").attr("class", "hit").attr("r", 11);
    pts.append("circle").attr("class", "dot").attr("r", 4.25);
    bindTip(pts, p => pointTip(c.id, p, opt.kind, gw));
    const last = s.pts[s.pts.length - 1];
    placeLabel(x(last.t), y(last.v), qual(fmtV(last.v, gw), last.r));
  });
  const many = selCos().length > 1;
  model.targets.forEach(g => { const off = g.gw * 1000 > yMax; g._x = x(g.t > X1 ? X1 : g.t); g._y = off ? m.t + 4 : y(g.gw * 1000); g._off = off; });
  const tg = sv.append("g").selectAll("g").data(model.targets).join("g").attr("class", g => `tg co-${g.co}`).attr("tabindex", 0)
    .attr("aria-label", g => `${CO[g.co].name} target: ${g.label}`)
    .attr("transform", g => `translate(${g._x},${g._y})`);
  tg.append("circle").attr("class", "hit").attr("r", 11);
  tg.append("circle").attr("class", "ring").attr("r", 6);
  tg.filter(g => g._off).append("path").attr("class", "tri").attr("d", "M0,-14 L-4,-8.5 L4,-8.5 Z");
  tg.filter(g => !g._off).each(function (g) {
    const txt = targetLabel(g, many) + (g.t > X1 ? " →" : "");
    const w = txt.length * 6.2 + 4;
    for (const dy of [4, 18, -10, 32]) {
      const b = { x0: g._x - 10 - w, x1: g._x - 10, y0: g._y + dy - 10, y1: g._y + dy + 3 };
      if (fits(b)) { boxes.push(b); d3.select(this).append("text").attr("x", -10).attr("y", dy).attr("text-anchor", "end").text(txt); break; }
    }
  });
  bindTip(tg, g => `<b>${esc(CO[g.co].name)} target</b> ${esc(g.label)}<small>${esc(g.sub)}${g._off ? " · above this chart’s scale" : ""}${g.t > X1 ? " · due after 2031" : ""}<br>${esc(srcNames(g.co, g.src))}</small>`);
  return { gw, off: model.targets.filter(g => g._off).map(g => targetLabel(g, many) + (g.t > X1 ? " →" : "")) };
}
function fillCard(el, model, H, title, note) {
  el.innerHTML = `<header><h3>${esc(title)}</h3><span class="unit"></span></header>${note ? `<p class="sub-note">${esc(note)}</p>` : ""}
    <svg class="plot" role="img" aria-label="${esc(title)}: capacity in France by company"></svg><p class="missing"></p><p class="missing offs"></p>`;
  el.querySelector(".missing").textContent = model.missing;
  if (!model.series.length && !model.targets.length) {
    el.querySelector("svg").outerHTML = `<p class="empty">No published figures for the selected companies and sources.</p>`;
    return;
  }
  const r = capPlot(el.querySelector("svg"), model, { H, kind: el.id === "totalcard" ? "total" : "tech" });
  const n = d3.sum(model.series, s => s.pts.length);
  el.querySelector(".unit").textContent = `${r.gw ? "GW" : "MW"} · ${n} ${n === 1 ? "figure" : "figures"}`;
  el.querySelector(".offs").textContent = r.off.length ? "▲ Targets above this scale: " + r.off.join(", ") + "." : "";
}
function drawCapacity() {
  cHide();
  document.getElementById("v-source").hidden = capView !== "source";
  document.getElementById("v-combined").hidden = capView !== "combined";
  const act = COS.filter(c => coOn(c.id));
  const dot = h => `<svg width="14" height="14" viewBox="-7 -7 14 14" aria-hidden="true"><circle r="4.5" ${h ? `fill="var(--surface)" stroke="var(--fg)" stroke-width="1.8"` : `fill="var(--fg)"`}/></svg>`;
  document.getElementById("caplegend").innerHTML = act.map(c => `<span>${lineSwatch(c)}${esc(c.name)}</span>`).join("") +
    `<span>${dot()}Published figure</span><span>${dot(true)}${capView === "combined" ? "Includes carried-forward figures" : "Our calculation (*)"}</span>` +
    `<span><svg width="16" height="22" viewBox="-8 -16 16 22" aria-hidden="true"><circle r="5.5" fill="none" stroke="var(--fg)" stroke-width="1.5" stroke-dasharray="3 2"/><path d="M0,-14 L-4,-8.5 L4,-8.5 Z" fill="var(--fg)"/></svg>Target; ▲ above the scale, → due after 2031</span>`;
  document.getElementById("capfoot").textContent = capView === "source"
    ? "Each panel has its own scale, so read heights within a panel, not across panels. Every point is a figure a source published for that source and date; nothing is carried forward. “~” means about, “+” more than, “*” our calculation from published figures. Hydro includes pumped storage; batteries are counted separately. TotalEnergies publishes almost no split by source, so it appears mainly in the totals. Biogas has no power capacity and filters the map only."
    : "The combined line needs every selected source on the same date, which the sources never give. Carrying the last figure forward fills the gaps but mixes years: EDF’s line in 2025 still uses its 2019 solar and 2023 onshore wind figures. It also puts EDF’s 20 GW of hydro on the same axis as portfolios of 1–2 GW.";
  if (capView === "source") {
    const host = document.getElementById("panels");
    const techs = CHART_TECHS.filter(t => activeTechs.has(t.id));
    const single = techs.length <= 1;
    host.classList.toggle("single", single);
    const H = single ? 270 : 210;
    host.innerHTML = techs.length ? techs.map(t => `<article class="card pcard" data-k="${t.id}"></article>`).join("")
      : `<div class="card pcard"><p class="empty">Select at least one power source. Biogas has no power capacity, so it filters the map only.</p></div>`;
    if (techs.length > 1 && techs.length % 2 === 1) host.lastElementChild.classList.add("span2");
    host.querySelectorAll(".pcard[data-k]").forEach(el => fillCard(el, techModel(el.dataset.k), H, TECH[el.dataset.k].name));
    fillCard(document.getElementById("totalcard"), totalsModel(), H, "Totals as published", "Each total shows only when every source it includes is selected.");
  } else {
    const model = combinedModel();
    const svgEl = document.getElementById("combined");
    document.getElementById("combined-missing").textContent = model.missing;
    document.getElementById("combined-off").textContent = "";
    if (!model.series.length) { d3.select(svgEl).selectAll("*").remove(); svgEl.setAttribute("height", 0); return; }
    const r = capPlot(svgEl, model, { H: 380, kind: "combined", wide: true });
    document.getElementById("combined-off").textContent = r.off.length ? "▲ Targets above this scale: " + r.off.join(", ") + "." : "";
  }
}
function renderCapTables() {
  const cos = selCos();
  const fig = r => r.total != null
    ? `${d3.format(",")(r.total)} MW total <span class="note">(${r.covers.map(k => TECH[k].name.toLowerCase()).join(", ")})</span>`
    : Object.entries(r.mw).map(([k, v]) => `${esc(TECH[k].name)} ${d3.format(",")(v)} MW`).join("<br>");
  const link = (co, k) => `<a href="${esc(CO[co].d.S[k].u)}" target="_blank" rel="noopener">${esc(srcName(co, k))}</a>`;
  const rows = REC.filter(r => cos.includes(r.co) && (r.mw ? Object.keys(r.mw).some(k => activeTechs.has(k)) : r.covers.some(k => activeTechs.has(k))));
  document.getElementById("caprows").innerHTML = rows.map(r => `<tr>
    <td style="white-space:nowrap"><span class="codot ${r.co}"></span>${esc(CO[r.co].name)}</td>
    <td class="date">${fmtMonth(r.t)}</td>
    <td class="figs-cell">${r.q === "~" ? "~" : ""}${fig(r)}${r.q === "+" ? "+" : ""}${r.derived ? ` <span class="tag2">our calc</span>` : ""}</td>
    <td class="date">${r.basis || "–"}</td><td>${esc(r.note)}</td>
    <td>${r.src.map(k => link(r.co, k)).join("<br>")}</td></tr>`).join("");
  document.getElementById("tgtrows").innerHTML = TGT.filter(g => cos.includes(g.co)).map(g => `<tr>
    <td style="white-space:nowrap"><span class="codot ${g.co}"></span>${esc(CO[g.co].name)}</td>
    <td class="date">${g.t.getFullYear()}</td><td>${esc(g.label)}${g.derived ? ` <span class="tag2">our calc</span>` : ""}</td>
    <td>${g.covers.map(k => esc(TECH[k].name)).join(", ")}</td><td>${esc(g.sub)}</td>
    <td>${g.src.map(k => link(g.co, k)).join("<br>")}</td></tr>`).join("");
}
function drawCharts() {
  renderCapTables();
  if (page !== "capacity") return;
  drawTimeline();
  drawCapacity();
}
let chartW = 0;
new ResizeObserver(entries => {
  const w = Math.round(entries[0].contentRect.width);
  if (w && w !== chartW) { chartW = w; if (page === "capacity") { drawTimeline(); drawCapacity(); } }
}).observe(PAGES.capacity);

// ---------- findings, gaps, ledger, meta ----------
function renderFindings() {
  const fs = FINDINGS.filter(f => f.cos.length > 1 ? f.cos.filter(coOn).length > 1 : coOn(f.cos[0]));
  document.getElementById("findings").innerHTML = fs.map(f => `
    <div class="finding"><div><span class="cotag">${f.cos.length > 1 ? "Comparison · " + esc(f.cos.map(c => CO[c].name).join(", ")) : esc(CO[f.cos[0]].name)}</span><h3>${esc(f.h)}</h3></div><div><p>${esc(f.p)}</p>
    <div class="ev">${f.ev.map(id => `<button type="button" data-show="${id}">${shapeSvg(MOVE[id].cat, 12, !!MOVE[id].lost, MOVE[id].co)}${f.cos.length > 1 ? esc(CO[MOVE[id].co].name) + ": " : ""}${esc(MOVE[id].short)}</button>`).join("")}</div></div></div>`).join("");
}
function shortTitle(k) { const t = S[k].t.split(" (")[0]; return t.length > 62 ? t.slice(0, 60) + "…" : t; }
function renderGaps() {
  document.getElementById("gaps").innerHTML = GAPS.map(g => `
    <div class="card gap"><h3>${esc(g.h)}</h3><ul>${g.items.filter(i => coOn(i.co)).map(i =>
      `<li>${multi() ? `<b>${esc(CO[i.co].name)}.</b> ` : ""}${esc(i.t)}${i.src.length ? `<br><small>${i.src.map(k => `<a href="${esc(S[k].u)}" target="_blank" rel="noopener">${esc(shortTitle(k))}</a>`).join(" · ")}</small>` : ""}</li>`).join("")}</ul></div>`).join("");
}
function renderLedger() {
  const rows = MOVES.filter(moveVisible).sort((a, b) => b.date.localeCompare(a.date));
  const side = m => m.parties.length ? m.parties.map(([pid]) => ALIAS[pid] ? CO[ALIAS[pid]].name : PARTY[pid].name).map(esc).join(", ") : "–";
  document.getElementById("ledger").innerHTML = rows.map(m => `
    <tr class="row" data-show="${m.id}" tabindex="0">
      <td class="date">${fmtDate(m)}</td>
      <td style="white-space:nowrap"><span class="codot ${m.co}"></span>${esc(CO[m.co].name)}</td>
      <td><span class="mv">${esc(m.title)}</span>${m.lost ? ` <span class="badge">${esc(m.lost)}</span>` : ""}<br><span class="note">${esc(m.tech)}</span></td>
      <td><span class="cat">${shapeSvg(m.cat, 12, !!m.lost, m.co)}${esc(CAT[m.cat].name)}</span></td>
      <td class="num">${m.mw ? fmtNum(m.mw) : "–"}</td>
      <td class="figs-cell">${esc(m.figs)}</td>
      <td>${side(m)}</td>
      <td>${m.src.map((k, i) => `<a href="${esc(S[k].u)}" target="_blank" rel="noopener">[${i + 1}]</a>`).join(" ")}</td>
    </tr>`).join("") || `<tr><td colspan="8" class="note">No moves match the current filters.</td></tr>`;
}
function renderMeta() {
  const vis = MOVES.filter(m => coOn(m.co));
  const lostN = vis.filter(m => m.lost).length;
  const shared = PARTIES.filter(p => [...p.cos].filter(coOn).length > 1).length;
  const srcs = new Set(); vis.forEach(m => m.src.forEach(k => srcs.add(S[k].u)));
  REC.filter(r => coOn(r.co)).forEach(r => r.src.forEach(k => srcs.add(CO[r.co].d.S[k].u)));
  document.getElementById("meta").innerHTML =
    `<span>As of <b>${esc(SITE.asOf)}</b></span><span><b>${vis.length}</b> moves</span><span><b>${lostN}</b> ${lostN === 1 ? "tender" : "tenders"} not won</span>` +
    (multi() ? `<span><b>${shared}</b> counterparties shared</span>` : "") + `<span><b>${REC.filter(r => coOn(r.co)).length}</b> capacity figures</span><span><b>${srcs.size}</b> sources</span>`;
}

document.addEventListener("click", ev => {
  if (ev.target.closest("a")) return;
  const el = ev.target.closest("[data-show]");
  if (!el) return;
  goToMove(el.getAttribute("data-show"));
});
document.getElementById("ledger").addEventListener("keydown", ev => {
  const tr = ev.target.closest("tr[data-show]");
  if (tr && (ev.key === "Enter" || ev.key === " ")) { ev.preventDefault(); goToMove(tr.getAttribute("data-show")); }
});

document.getElementById("title").textContent = names(COS.map(c => c.id)) + " in French renewables";
document.getElementById("dek-n").textContent = ["zero", "one", "two", "three", "four", "five", "six", "seven", "eight", "nine", "ten"][COS.length] || String(COS.length);
renderStrips();
renderPanel(null);
renderFindings();
renderGaps();
renderLedger();
renderMeta();
setPage(location.hash.slice(1));
applyFilters();
booting = false;
})();
