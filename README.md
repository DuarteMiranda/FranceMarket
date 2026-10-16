# French Renewables Moves

A static site showing ten years (Oct 2016 – Oct 2026) of public market moves by TotalEnergies, Boralex, EDF and Engie in French renewables. It has two pages:

- **Relationship map**: each move is linked to the company or public body on the other side, with findings, gaps and a full table of moves.
- **Capacity and timeline**: the megawatts involved in each move, and each company's reported capacity by energy source.

Every item links to the source it came from. The site has no build step, no server code and no dependencies to install, so GitHub Pages can serve the folder as it is.

## What's in the repo

```
index.html                    Page shell: header, filters, both pages, script tags
.nojekyll                     Tells GitHub Pages to serve files as they are (no Jekyll)
assets/
  css/style.css               EDP theme, layout, company colours (--co-<id>)
  js/app.js                   Map, charts, filters, findings and table
  js/vendor/d3.v7.8.5.min.js  D3, kept in the repo so the site has no CDN dependency
data/
  shared.js                   Energy sources used as filters (solar, onshore wind, …)
  companies.js                Company list, map placement, cross-company findings
  totalenergies.js            One file per company: sources, moves, capacity, targets,
  boralex.js                  findings and gaps
  edf.js
  engie.js
tools/
  check-data.js               Checks every data file for broken references
  build-standalone.js         Builds a single offline HTML file into dist/
.github/workflows/
  check-data.yml              Runs the checks on every push
package.json                  Shortcuts: npm run check | build | serve
```

## Publish on GitHub Pages

1. Create a new repository on GitHub, for example `france-renewables-moves`.
2. Upload the contents of this folder to the repository root. You can drag and drop them in the browser (**Add file → Upload files**), or push with git:
   ```
   git init
   git add .
   git commit -m "First version"
   git branch -M main
   git remote add origin https://github.com/<your-user>/france-renewables-moves.git
   git push -u origin main
   ```
   Finder and Explorer hide files whose names start with a dot (`.nojekyll`, `.github/`), so drag and drop may leave them out. The site works without them, but you need git to keep the automatic checks.
3. In the repository, go to **Settings → Pages**. Under **Build and deployment**, set **Source** to **Deploy from a branch**, the branch to `main` and the folder to `/ (root)`, then click **Save**.
4. After a minute or two the site is live at `https://<your-user>.github.io/france-renewables-moves/`. The Pages settings screen shows the exact link.

Each later push to `main` republishes the site automatically.

**Who can see it:** a site published from a public repository is public. Publishing Pages from a private repository needs a paid GitHub plan. Restricting who can view the site is only possible on GitHub Enterprise Cloud.

**Deep links:** `…/#map` opens the relationship map and `…/#capacity` opens the charts.

## Preview locally

Opening `index.html` in a browser works directly, because the site loads no data over the network. To test it the way GitHub serves it, run:

```
python3 -m http.server 8000
```

Then open http://localhost:8000.

## Update the data

Each company's file in `data/` has the same sections:

| Section | What it holds |
|---|---|
| `S` | Sources: `key: { t: "Title (Publisher, date)", u: "https://…" }` |
| `PARTIES` | Counterparties: `{ id, name, type }`. Add `project: true` for a named project. |
| `MOVES` | One entry per move (fields below). |
| `BASELINE` | Text shown when you click the company on the map. |
| `CAPACITY` | Reported capacity in France: `mw: { solar: 1800, wind_on: 2700 }` for figures by source, or `total` with `covers: [...]` for a total that isn't split by source. Add `q: "~"` (about) or `"+"` (more than), `basis: "gross"`/`"net"`, or `derived: true` for your own calculation. |
| `TARGETS` | `{ date, gw, covers, label, sub, src }` |
| `FINDINGS`, `GAPS`, `WORTH` | Findings, gaps, and "worth a click" counterparties for that company. |

Fields of a move:

```js
{ id: "m_orange", techs: ["solar"], cat: "contracts", date: "2021-02-15", dp: "day",
  short: "15-year solar PPA with Orange", mw: 51,
  title: "Signs a 15-year solar PPA with Orange", tech: "Solar",
  figs: "51 MWc: …", text: "…",
  parties: [["orange", "Buyer"]], src: ["g_orange"] }
```

- `cat`: one of `deals`, `tenders`, `contracts`, `partners`, `strategy`.
- `dp`: how to print the date: `day`, `month`, `year`, `since` or `by`.
- `lost`: optional label for a tender not won, such as `"Lost"`, `"No bid"` or `"Withdrew"`. The move is then drawn hollow.
- `techs`: energy sources from `data/shared.js`. Use `[]` for a move that isn't tied to one source, such as a group target or an ownership change; the **Company-wide moves** filter shows or hides these.

After editing, run the checks (Node 18 or later):

```
node tools/check-data.js
```

The checks catch unknown source keys, party ids, move ids and dates. GitHub runs the same checks on every push and shows a red cross on the commit if something is broken.

When you refresh the research, also update `asOf` and `today` at the top of `data/companies.js`.

## Add a company

1. Copy a data file, for example `data/engie.js` to `data/iberdrola.js`. Change the last lines so it registers under a new short id, for example `window.COMPANY_DATA.ib = {…}`. Use a source-key prefix the other files don't use.
2. Add the company to `companies` in `data/companies.js` with its id, name, file name, position on the map (`cx`, `cy`), category angles and a line pattern (`dash`). If you leave out `cx`/`cy`, it is placed on a circle automatically.
3. Add `<script src="data/iberdrola.js"></script>` to `index.html`, next to the other data files.
4. Add a colour token `--co-ib` to `assets/css/style.css`, in `:root` and in both dark-mode blocks. Check that the new colour stays distinguishable from the others for colour-blind readers.

Then run `node tools/check-data.js`. The page title, the filters, the map, the charts and the findings update on their own.

## Offline copy

```
node tools/build-standalone.js
```

This writes `dist/france-renewables-moves.html`, one file with everything inlined, for email or offline use. `dist/` is ignored by git.

## Notes

- Method: web search of company releases, wire services, regulator documents, annual reports and trade press, limited to moves inside France. Figures are as reported by the sources and were not independently audited.
- D3 v7.8.5 is included under the ISC licence (`assets/js/vendor/d3-LICENSE.txt`). Fonts (Manrope, IBM Plex Mono) load from Google Fonts. If they are blocked, the page falls back to system fonts.
