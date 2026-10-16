#!/usr/bin/env node
// Builds one self-contained HTML file (CSS, D3, data and app inlined) for email or offline use.
// Usage: node tools/build-standalone.js   ->   dist/france-renewables-moves.html
const fs = require("fs");
const path = require("path");

const root = path.join(__dirname, "..");
const read = rel => fs.readFileSync(path.join(root, rel), "utf8");
let html = read("index.html");
const localRefs = (html.match(/(?:src|href)="(?:assets|data)\/[^"]+"/g) || []).length;
let inlined = 0;

html = html.replace(/<link rel="stylesheet" href="(assets\/[^"]+\.css)">/g, (_, href) => { inlined++; return `<style>\n${read(href)}\n</style>`; });
html = html.replace(/<script src="((?:assets|data)\/[^"]+\.js)"><\/script>/g,
  (_, src) => { inlined++; return `<script>\n${read(src).replace(/<\/script/gi, "<\\/script")}\n</script>`; });

if (inlined !== localRefs) throw new Error(`Inlined ${inlined} of ${localRefs} local files; check the tags in index.html`);
fs.mkdirSync(path.join(root, "dist"), { recursive: true });
const out = path.join(root, "dist", "france-renewables-moves.html");
fs.writeFileSync(out, html);
console.log(`Wrote ${path.relative(root, out)} (${Math.round(html.length / 1024)} KB)`);
