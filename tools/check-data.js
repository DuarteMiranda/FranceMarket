#!/usr/bin/env node
// Checks every data file for broken references before you publish.
// Usage: node tools/check-data.js        (exit code 1 if anything is wrong)
const fs = require("fs");
const path = require("path");
const vm = require("vm");

const root = path.join(__dirname, "..");
const ctx = vm.createContext({ window: {}, console });
const run = rel => vm.runInContext(fs.readFileSync(path.join(root, rel), "utf8"), ctx, { filename: rel });

const problems = [];
const bad = (where, msg) => problems.push(`${where}: ${msg}`);

run("data/shared.js");
run("data/companies.js");
const SITE = ctx.window.SITE;
const TECHS = vm.runInContext("TECHS", ctx);
const T = new Set(TECHS.map(t => t.id));
const index = fs.readFileSync(path.join(root, "index.html"), "utf8");
const css = fs.readFileSync(path.join(root, "assets/css/style.css"), "utf8");

SITE.companies.forEach(c => {
  const file = `data/${c.file}.js`;
  if (!fs.existsSync(path.join(root, file))) return bad(c.id, `missing ${file}`);
  if (!index.includes(`src="${file}"`)) bad(c.id, `index.html has no <script src="${file}">`);
  if (!css.includes(`--co-${c.id}:`)) bad(c.id, `style.css has no --co-${c.id} colour`);
  run(file);
});
const DATA = ctx.window.COMPANY_DATA || {};
const cats = new Set(["deals", "tenders", "contracts", "partners", "strategy"]);
const isDate = s => /^\d{4}-\d{2}-\d{2}$/.test(s) && !isNaN(Date.parse(s));
const allMoves = new Set(), allParties = new Set();
const summary = [];

SITE.companies.forEach(c => {
  const d = DATA[c.id];
  if (!d) return bad(c.id, `data/${c.file}.js did not register window.COMPANY_DATA.${c.id}`);
  const src = (where, list) => Array.isArray(list) ? list.forEach(k => { if (!d.S[k]) bad(c.id, `${where} cites unknown source "${k}"`); }) : bad(c.id, `${where} src must be a list`);
  const techs = (where, list) => Array.isArray(list) ? list.forEach(t => { if (!T.has(t)) bad(c.id, `${where} has unknown source type "${t}"`); }) : bad(c.id, `${where} techs must be a list`);
  const P = new Set(d.PARTIES.map(p => p.id));
  P.forEach(p => allParties.add(p));
  const ids = new Set();
  d.MOVES.forEach(m => {
    const w = `move ${m.id}`;
    if (ids.has(m.id)) bad(c.id, `${w} is duplicated`);
    ids.add(m.id); allMoves.add(`${c.id}:${m.id}`);
    if (!cats.has(m.cat)) bad(c.id, `${w} has unknown category "${m.cat}"`);
    if (!isDate(m.date)) bad(c.id, `${w} has a bad date "${m.date}"`);
    ["short", "title", "tech", "figs", "text"].forEach(f => { if (typeof m[f] !== "string") bad(c.id, `${w} is missing ${f}`); });
    techs(w, m.techs); src(w, m.src);
    (m.parties || []).forEach(([p]) => { if (!P.has(p)) bad(c.id, `${w} names unknown party "${p}"`); });
  });
  d.CAPACITY.forEach((r, i) => {
    const w = `capacity #${i + 1} (${r.date})`;
    if (!isDate(r.date)) bad(c.id, `${w} has a bad date`);
    if (!!r.mw === (r.total != null)) bad(c.id, `${w} needs either mw or total, not both`);
    if (r.mw) techs(w, Object.keys(r.mw));
    if (r.total != null) techs(w, r.covers);
    src(w, r.src);
  });
  d.TARGETS.forEach((t, i) => { const w = `target #${i + 1}`; if (!isDate(t.date)) bad(c.id, `${w} has a bad date`); techs(w, t.covers); src(w, t.src); });
  d.FINDINGS.forEach(f => f.ev.forEach(id => { if (!ids.has(id)) bad(c.id, `finding "${f.h}" points to unknown move "${id}"`); }));
  src("baseline", d.BASELINE.src);
  d.GAPS.forEach(g => g.items.forEach(it => src(`gap "${it[0].slice(0, 40)}…"`, it[1])));
  (d.WORTH || []).forEach(([p]) => { if (!P.has(p) && !SITE.alias[p]) bad(c.id, `WORTH names unknown party "${p}"`); });
  summary.push({ company: c.name, moves: d.MOVES.length, lost: d.MOVES.filter(m => m.lost).length, capacity: d.CAPACITY.length, targets: d.TARGETS.length, sources: Object.keys(d.S).length });
});

(SITE.comparisons || []).forEach(f => f.ev.forEach(id => { if (!allMoves.has(id)) bad("companies.js", `comparison "${f.h}" points to unknown move "${id}"`); }));
(SITE.worthMulti || []).forEach(([p]) => { if (!allParties.has(p)) bad("companies.js", `worthMulti names unknown party "${p}"`); });
Object.entries(SITE.alias || {}).forEach(([p, co]) => { if (!SITE.companies.some(c => c.id === co)) bad("companies.js", `alias "${p}" points to unknown company "${co}"`); });

console.table(summary);
if (problems.length) {
  console.error(`\n${problems.length} problem(s):\n- ` + problems.join("\n- "));
  process.exit(1);
}
console.log("\nAll data checks passed.");
