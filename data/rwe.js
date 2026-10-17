// RWE in French renewables, Oct 2016 – Oct 2026.
// Source keys are prefixed "r_" so they never collide with the other companies' keys.
// RWE reports capacity "commissioned in France since 2021", not a split by source.
// Registers window.COMPANY_DATA.rwe. Edit the lists below; run `node tools/check-data.js` after changes.
(function () {
const S = {
  r_dk_win: { t: "EDF, Innogy, Enbridge take 600MW Dunkirk spoils (reNews, Jun 2019)", u: "https://renews.biz/53740/edf-innogy-enbridge-take-600mw-dunkirk-spoils/" },
  r_dk_price: { t: "Dunkirk strike price is EUR 44/MWh (offshoreWIND.biz, 20 Jun 2019)", u: "https://www.offshorewind.biz/2019/06/20/dunkirk-strike-price-is-eur-44-mwh/" },
  r_dk_owners: { t: "Dunkerque : les maîtres d’ouvrage, EDF Renouvelables France, innogy SE et Blauracke (Débat public)", u: "https://dunkerque-eolien.debatpublic.fr/projet/maitres-d-ouvrages.html" },
  r_dk_2021: { t: "EDF team presses on with Dunkirk offshore wind (reNews, 11 May 2021)", u: "https://www.renews.biz/offshore-wind/edf-team-presses-on-with-dunkirk-offshore-wind/" },
  r_dk_2025: { t: "Les porteurs du projet: EDF power solutions and Enbridge (Parc éolien en mer de Dunkerque)", u: "https://parc-eolien-en-mer-de-dunkerque.fr/presentation-du-projet/les-porteurs-du-projet/" },
  r_nordex: { t: "Transaction with Nordex closed: RWE strengthens its market presence in France (RWE, 3 Nov 2020)", u: "https://www.rwe.com/en/investor-relations/financial-calendar-and-publications/news-and-ad-hoc-announcements/news/news-2020-11-03/" },
  r_build21: { t: "RWE construit ses premiers parcs éoliens terrestres en France (RWE, 14 Jan 2021)", u: "https://fr.rwe.com/-/media/RWE/RWE-France/documents/presse/2021/2021-01-14-rwe-construit-ses-premiers-parcs-eoliens-terrestres-en-france.pdf" },
  r_ao4pre: { t: "France shortlists 6 bidders for the 1 GW Cotentin offshore wind project (Enerdata, 28 Apr 2021)", u: "https://www.enerdata.net/publications/daily-energy-news/france-shortlists-6-bidders-1-gw-cotentin-offshore-wind-project.html" },
  r_ao4cre: { t: "Délibération n°2023-77 sur l’instruction de l’AO4, five bids (CRE, 9 Mar 2023)", u: "https://www.cre.fr/fileadmin/Documents/Actualites/import/230309_2023-77_instruction_ao4.pdf" },
  r_ao4win: { t: "EDF and Maple Power awarded 1 GW offshore wind project in Normandy (Enerdata, 28 Mar 2023)", u: "https://www.enerdata.net/publications/daily-energy-news/edf-and-maple-power-awarded-1-gw-offshore-wind-project-normandy-france.html" },
  r_ao5pre: { t: "Bretagne Sud : 10 candidats pré-sélectionnés pour le dialogue concurrentiel de l’AO5 (Énergies de la Mer, 16 Sep 2021)", u: "https://www.energiesdelamer.eu/2021/09/16/bretagne-sud-10-candidats-pre-selectionnes-pour-le-dialogue-concurrentiel-de-lao5/" },
  r_pierrots: { t: "RWE met en service son premier parc éolien terrestre en France (RWE, 22 Oct 2021)", u: "https://fr.rwe.com/-/media/RWE/RWE-France/documents/presse/2021/21-10-22-rwe-met-en-service-son-premier-parc-olien-terrestre.pdf" },
  r_bourbon: { t: "RWE and Bourbon to jointly bid for French floating offshore wind farms (Offshore Wind, 27 Jun 2022)", u: "https://www.offshorewind.biz/2022/06/27/rwe-and-bourbon-to-jointly-bid-for-french-floating-offshore-wind-farms" },
  r_ao6pre: { t: "Parcs éoliens en mer Méditerranée : sélection de 13 candidats (Figaro Nautisme, 2 Aug 2022)", u: "https://figaronautisme.meteoconsult.fr/actus-nautisme-flash/2022-08-02/64167-parcs-eoliens-en-mer-mediterranee-selection-de-13-candidats-pour-participer-a-la-2e-phase-de-la-procedure" },
  r_ao6cre: { t: "Délibération n°2024-211 sur l’instruction de l’AO6, five bidders (CRE, 29 Nov 2024)", u: "https://cre.fr/fileadmin/Documents/Deliberations/2024/241129_2024-211_Instruction_AO6.pdf" },
  r_ao7pre: { t: "Présélection des candidats AO7 Oléron, rapport de synthèse (CRE, 16 Feb 2023)", u: "https://CRE.fr/fileadmin/Documents/Appels_d_offres/import/230216_2023-62_Preselection_AO7_Oleron-rapport.pdf" },
  r_ao8pre: { t: "Présélection des candidats AO8 Centre Manche 2, rapport de synthèse (CRE, 16 Feb 2023)", u: "https://CRE.fr/fileadmin/Documents/Appels_d_offres/import/230216_2023-63_Preselection_AO8_Normandie_rapport.pdf" },
  r_cre23: { t: "Résultats solides de RWE au dernier appel d’offres éolien terrestre français (RWE, 10 Jul 2023)", u: "https://fr.rwe.com/-/media/RWE/RWE-France/documents/presse/2023/2023-07-10-resultats-solides-de-rwe-au-dernier-appel-doffre-eolien-terrestre-francais.pdf" },
  r_nouvions: { t: "RWE inaugure son plus grand parc éolien en France (RWE, 7 Jun 2024)", u: "https://fr.rwe.com/-/media/RWE/RWE-France/documents/presse/2024/2024-06-07-rwe-inaugure-son-plus-grand-parc-olien-en-france.pdf" },
  r_cre24: { t: "RWE sécurise deux projets au dernier appel d’offres éolien de la CRE (RWE, 14 Nov 2024)", u: "https://fr.rwe.com/-/media/RWE/RWE-France/documents/presse/2024/2024-11-14--rwe-securise-deux-projets-au-dernier-appel-doffres-olien-de-la-cre.pdf" },
  r_ao9: { t: "France pre-selects 12 developers for 2.5 GW offshore wind tender (Enerdata, 21 Nov 2024)", u: "https://www.enerdata.net/publications/daily-energy-news/france-pre-selects-12-developers-25-gw-offshore-wind-tender.html" },
  r_sanofi: { t: "RWE et Sanofi signent leur premier contrat d’achat d’électricité (RWE, 7 Apr 2025)", u: "https://fr.rwe.com/-/media/RWE/RWE-France/documents/presse/2025/2025-04-02-rwe-et-sanofi-signent-leur-premier-contrat.pdf" },
  r_ao8rep: { t: "Rapport d’instruction AO8: two bids filed (CRE, 24 Jun 2025)", u: "https://www.cre.fr/fileadmin/Documents/Appels_d_offres/2025/250624_2025-165_Instruction_AO8_rapport.pdf" },
  r_cm2: { t: "TotalEnergies-RWE consortium wins France’s largest offshore wind tender as RWE signals exit (Offshore Wind, 24 Sep 2025)", u: "https://www.offshorewind.biz/2025/09/24/breaking-totalenergies-rwe-consortium-wins-frances-largest-offshore-wind-tender-as-rwe-signals-exit" },
  r_oleron: { t: "Éolien : pas de candidat pour un projet au large de l’île d’Oléron (L’info durable, 24 Sep 2025)", u: "https://www.linfodurable.fr/eolien-pas-de-candidat-pour-un-projet-au-large-de-lile-doleron-52966" },
  r_pierrieres: { t: "RWE inaugure le parc solaire des Pierrières en Charente-Maritime (RWE, 29 Sep 2025)", u: "https://fr.rwe.com/-/media/RWE/RWE-France/documents/presse/2025/2025-09-29-rwe-inaugure-le-parc-solaire-des-pierrieres-en-charente-maritime.pdf" },
  r_cm2_exit: { t: "RWE mulls offshore project exit as value comes into question (TGS 4C, 27 Oct 2025)", u: "https://www.tgs4c.com/news/rwe-mulls-offshore-project-exit-as-value-comes-into-question-nid32020.html" },
  r_cm2_permit: { t: "Centre Manche Énergies dépose la demande d’Autorisation Unique (TotalEnergies, 28 May 2026)", u: "https://totalenergies.com/fr/node/28766" },
  r_3farms: { t: "RWE inaugure trois nouveaux parcs éoliens (RWE, 18 Jun 2026)", u: "https://fr.rwe.com/-/media/RWE/RWE-France/documents/presse/2026/2026-06-18-rwe-inaugure-trois-nouveaux-parcs-eoliens.pdf" },
  r_ao10: { t: "Bidding period closes for 10 GW French offshore wind tender (Offshore Wind, 15 Oct 2026)", u: "https://offshorewind.biz/2026/10/15/bidding-period-closes-for-10-gw-french-offshore-wind-tender" }
};

const PARTIES = [
  { id: "state", name: "French State & CRE", type: "Ministry in charge of energy and the energy regulator (CRE)" },
  { id: "edf", name: "EDF Renouvelables", type: "Renewables arm of EDF" },
  { id: "totalenergies", name: "TotalEnergies", type: "Energy major; RWE’s partner for Centre Manche", company: "te" },
  { id: "nordex", name: "Nordex", type: "German turbine maker; sold RWE its European project business" },
  { id: "statkraft", name: "Statkraft", type: "Norwegian utility and power aggregator" },
  { id: "bourbon", name: "Bourbon", type: "French marine services group (floating wind installation)" },
  { id: "sanofi", name: "Sanofi", type: "Pharmaceutical group" },
  { id: "elicio", name: "Elicio", type: "Belgian offshore wind developer" },
  { id: "oceanwinds", name: "Ocean Winds", type: "Engie and EDPR’s offshore joint venture" }
];

const MOVES = [
  { id: "m_dunkirk", techs: ["wind_off"], cat: "tenders", date: "2019-06-14", dp: "day", short: "Wins Dunkirk with EDF, as innogy", mw: 600,
    title: "Wins the Dunkirk offshore wind tender (AO3) with EDF and Enbridge, through innogy", tech: "Offshore wind (fixed)",
    figs: "About 600 MW · €44/MWh · consortium of EDF Renouvelables, innogy and Enbridge",
    text: "innogy’s renewables became RWE Renewables, still a partner in May 2021. The project company’s site now lists only EDF and Enbridge; when RWE left was not found.",
    parties: [["edf", "Consortium leader"], ["state", "Awarding authority"]], src: ["r_dk_win", "r_dk_price", "r_dk_owners", "r_dk_2021", "r_dk_2025"] },
  { id: "m_nordex", techs: ["wind_on", "solar"], cat: "deals", date: "2020-11-03", dp: "day", short: "Buys Nordex’s project business, ~€400m",
    title: "Buys Nordex’s European wind and solar development business, mostly in France", tech: "Onshore wind, solar",
    figs: "About €400m · 2.7 GW of projects in France, Spain, Sweden and Poland · French pipeline 1.9 GW after the deal · 70+ staff, mostly in France",
    text: "RWE called France one of its target markets for offshore and onshore wind, large solar and batteries. It arrived in French onshore with this deal.",
    parties: [["nordex", "Seller"]], src: ["r_nordex", "r_build21", "r_cre24"] },
  { id: "m_build21", techs: ["wind_on"], cat: "tenders", date: "2021-01-14", dp: "day", short: "Starts its first French wind farms", mw: 59,
    title: "Starts building its first three wind farms in France", tech: "Onshore wind",
    figs: "59 MW · about €70m · Les Pierrots (Indre) 26.4 MW, Les Hauts Bouleaux (Oise) 18 MW, Martinpuich (Pas-de-Calais) 14.7 MW · Nordex turbines",
    text: "All three came from the Nordex pipeline.",
    parties: [], src: ["r_build21"] },
  { id: "m_ao4", techs: ["wind_off"], cat: "tenders", date: "2023-03-27", dp: "day", lost: "Not won", short: "Not won: Centre Manche 1 (AO4)", mw: 1000,
    title: "Does not win Centre Manche 1 (AO4), shortlisted with Total", tech: "Offshore wind (fixed)",
    figs: "About 1 GW off Normandy · Total–RWE one of six shortlisted, April 2021 · five bids filed",
    text: "EDF and Maple Power won. The CRE did not publish the other bidders.",
    parties: [["totalenergies", "Partner at shortlisting"], ["edf", "Winner, with Maple Power"], ["state", "Awarding authority"]], src: ["r_ao4pre", "r_ao4cre", "r_ao4win", "r_bourbon"] },
  { id: "m_pierrots", techs: ["wind_on"], cat: "tenders", date: "2021-10-22", dp: "day", short: "First French wind farm online", mw: 26,
    title: "Brings its first French wind farm, Les Pierrots, into operation", tech: "Onshore wind",
    figs: "26.4 MW · 11 Nordex N117 turbines · Indre · three-year PPA with the aggregator Statkraft under the support scheme",
    text: "Three more farms, 50 MW, were due to start construction before the end of 2021.",
    parties: [["statkraft", "Aggregator buying the output"]], src: ["r_pierrots"] },
  { id: "m_bourbon", techs: ["wind_off"], cat: "partners", date: "2022-06-27", dp: "day", short: "Teams with Bourbon for floating wind",
    title: "Teams up with Bourbon to bid for the Mediterranean floating wind farms (AO6)", tech: "Floating offshore wind",
    figs: "Two sites of about 250 MW, with possible extensions to 1.5 GW",
    text: "RWE was already pre-selected for Centre Manche 1 with TotalEnergies and for Bretagne Sud.",
    parties: [["bourbon", "Partner in the bid"]], src: ["r_bourbon"] },
  { id: "m_cre23", techs: ["wind_on"], cat: "tenders", date: "2023-07-10", dp: "day", short: "Wins 43.5 MW of CRE wind", mw: 44,
    title: "Wins three onshore wind projects in the CRE tender", tech: "Onshore wind",
    figs: "43.5 MW with 20-year contracts · Beg ar C’Hra 14.7 MW (Brittany) · Catillon-Fumechon (Oise) · Les Nouvions extension 14.4 MW",
    text: "RWE France then had 210 staff, about 150 MW commissioned in two years, 900 MW of wind and 400 MWc of solar in development.",
    parties: [["state", "Awarding authority"]], src: ["r_cre23"] },
  { id: "m_nouvions", techs: ["wind_on"], cat: "tenders", date: "2024-06-07", dp: "day", short: "Opens Les Nouvions, its largest", mw: 44,
    title: "Inaugurates Les Nouvions, its largest French wind farm", tech: "Onshore wind",
    figs: "44 MW · 11 Nordex N149 turbines, the first of the model in France · Aisne · online February 2024",
    text: "RWE then had more than 250 staff in seven offices, 1.3 GW of wind and nearly 800 MWc of solar in development.",
    parties: [], src: ["r_nouvions"] },
  { id: "m_ao5", techs: ["wind_off"], cat: "tenders", date: "2024-05-15", dp: "day", lost: "Not won", short: "Not won: Bretagne Sud floating (AO5)", mw: 250,
    title: "Does not win the Bretagne Sud floating wind tender (AO5)", tech: "Floating offshore wind",
    figs: "250 MW · pre-selected alone among ten candidates, September 2021 · winner named May 2024",
    text: "Elicio and BayWa r.e. won. Whether RWE filed a bid was not found.",
    parties: [["elicio", "Winner, with BayWa r.e."], ["state", "Awarding authority"]], src: ["r_ao5pre", "r_bourbon"] },
  { id: "m_cre24", techs: ["wind_on"], cat: "tenders", date: "2024-11-14", dp: "day", short: "Wins 41 MW in AO16 wind round", mw: 41,
    title: "Wins two wind projects in the CRE’s 16th onshore round", tech: "Onshore wind",
    figs: "41.3 MW · Morgat (Charente-Maritime) 11.8 MW · Les Pressoirs (Indre) 29.5 MW",
    text: "RWE said it had commissioned about 240 MW in two years and was positioned on every French offshore tender.",
    parties: [["state", "Awarding authority"]], src: ["r_cre24"] },
  { id: "m_ao9", techs: ["wind_off"], cat: "tenders", date: "2024-11-21", dp: "day", short: "Pre-qualified for AO9",
    title: "Is pre-qualified for the AO9 offshore round, later merged into AO10", tech: "Offshore wind",
    figs: "Up to 2.5 GW at four sites · one of 12 pre-qualified · AO10 bids closed October 2026, award planned February 2027",
    text: "Bidder names for AO10 have not been published.",
    parties: [["state", "Awarding authority"]], src: ["r_ao9", "r_ao10"] },
  { id: "m_ao6", techs: ["wind_off"], cat: "tenders", date: "2024-12-27", dp: "day", lost: "Not won", short: "Not won: Mediterranean floating (AO6)", mw: 500,
    title: "Does not win the Mediterranean floating wind tender (AO6) with Bourbon", tech: "Floating offshore wind",
    figs: "Two sites of about 250 MW · pre-selected among 13, August 2022 · five candidates bid for both sites",
    text: "EDF with Maple Power and Ocean Winds won. The CRE named only the winners.",
    parties: [["bourbon", "Partner"], ["edf", "Winner of one site"], ["oceanwinds", "Winner of the other site"], ["state", "Awarding authority"]], src: ["r_ao6pre", "r_ao6cre", "r_bourbon"] },
  { id: "m_sanofi", techs: ["wind_on"], cat: "contracts", date: "2025-04-07", dp: "day", short: "20-year wind PPA with Sanofi", mw: 9,
    title: "Signs its first French corporate PPA, with Sanofi", tech: "Onshore wind",
    figs: "20 years from early 2025 · 9 MW, 3 turbines at Chemin de Châlons 1 (Marne) · 21 GWh a year",
    text: "RWE France then had more than 270 staff in six offices.",
    parties: [["sanofi", "Buyer"]], src: ["r_sanofi"] },
  { id: "m_cm2", techs: ["wind_off"], cat: "tenders", date: "2025-09-24", dp: "day", short: "Wins Centre Manche 2 with TotalEnergies", mw: 1500,
    title: "Wins Centre Manche 2 (AO8) with TotalEnergies", tech: "Offshore wind (fixed)",
    figs: "1.5 GW off Normandy · €66/MWh · only two bids filed, both from the consortium partners’ companies",
    text: "TotalEnergies called it France’s largest renewable project. RWE asked to leave the consortium the same day.",
    parties: [["totalenergies", "Consortium leader and operator"], ["state", "Awarding authority"]], src: ["r_cm2", "r_ao8pre", "r_ao8rep"] },
  { id: "m_cm2_exit", techs: ["wind_off"], cat: "deals", date: "2025-09-24", dp: "day", short: "Asks to leave Centre Manche 2",
    title: "Asks to leave Centre Manche 2 after a strategic review", tech: "Offshore wind (fixed)",
    figs: "Subject to approval by French authorities · project company 100% TotalEnergies by May 2026",
    text: "Reports cited doubts over the project’s long-term returns compared with other markets.",
    parties: [["totalenergies", "Takes over RWE’s share"]], src: ["r_cm2", "r_cm2_exit", "r_cm2_permit"] },
  { id: "m_ao7", techs: ["wind_off"], cat: "tenders", date: "2025-09-24", dp: "day", lost: "No bid", short: "No bid: Oléron (AO7)", mw: 1000,
    title: "Does not bid for the Oléron offshore wind tender (AO7)", tech: "Offshore wind (fixed)",
    figs: "About 1 GW · pre-selected among nine candidates, February 2023 · no candidate filed",
    text: "The tender failed; Oléron moved to the AO10 round.",
    parties: [["state", "Awarding authority"]], src: ["r_ao7pre", "r_oleron"] },
  { id: "m_pierrieres", techs: ["solar"], cat: "tenders", date: "2025-09-29", dp: "day", short: "Opens Pierrières solar park", mw: 4,
    title: "Inaugurates the Pierrières solar park on a former landfill", tech: "Solar",
    figs: "4 MWc · Ardillières (Charente-Maritime) · won in the CRE technology-neutral tender",
    text: "RWE then counted 265 MW commissioned in France, 1.6 GW of wind and nearly 1 GWc of solar in development.",
    parties: [["state", "Awarding authority"]], src: ["r_pierrieres"] },
  { id: "m_3farms", techs: ["wind_on"], cat: "tenders", date: "2026-06-18", dp: "day", short: "Opens three wind farms, 68.8 MW", mw: 69,
    title: "Inaugurates three wind farms in the Marne, Oise and Nord", tech: "Onshore wind",
    figs: "68.8 MW · Chemin de Châlons 18 MW · Catillon-Fumechon 21.6 MW · Catésis 29.2 MW",
    text: "RWE said it had commissioned 275 MW in France.",
    parties: [], src: ["r_3farms"] }
];

const BASELINE = {
  title: "RWE in France",
  figs: "275 MW commissioned since 2021 (June 2026) · 1.7 GW of wind and nearly 1 GWc of solar in development",
  text: "RWE entered French onshore by buying Nordex’s development business in 2020 and opened its first wind farm in 2021. Offshore, it won Dunkirk in 2019 through innogy and Centre Manche 2 with TotalEnergies in 2025, then asked to leave Centre Manche 2.",
  src: ["r_3farms", "r_nordex", "r_pierrots", "r_cm2"]
};

// Capacity RWE says it has commissioned in France since 2021 (no split by source except the first farm).
const RWE_COVERS = ["wind_on", "solar"];
const CAPACITY = [
  { date: "2021-10-22", mw: { wind_on: 26.4 }, note: "First French wind farm, Les Pierrots", src: ["r_pierrots"] },
  { date: "2023-07-10", total: 150, covers: RWE_COVERS, q: "~", note: "About 150 MW commissioned in two years", src: ["r_cre23"] },
  { date: "2024-11-14", total: 240, covers: RWE_COVERS, q: "~", note: "About 240 MW commissioned in two years", src: ["r_cre24"] },
  { date: "2025-09-29", total: 265, covers: RWE_COVERS, note: "265 MW commissioned", src: ["r_pierrieres"] },
  { date: "2026-06-18", total: 275, covers: RWE_COVERS, note: "275 MW commissioned", src: ["r_3farms"] }
];
const TARGETS = [];

const WORTH = [
  ["nordex", "Sold RWE the pipeline it entered France with"],
  ["bourbon", "RWE’s partner for Mediterranean floating wind"],
  ["sanofi", "Buys wind power from RWE"]
];

const FINDINGS = [
  { h: "Built on Nordex’s pipeline",
    p: "RWE bought Nordex’s European project business in 2020, mostly French projects, and opened its first French wind farm in 2021. It reported about 150 MW commissioned by mid-2023 and 275 MW by June 2026, with 1.7 GW of wind and nearly 1 GWc of solar still in development.",
    ev: ["m_nordex", "m_build21", "m_pierrots", "m_nouvions", "m_3farms"] },
  { h: "In every offshore round, then out of its one big win",
    p: "RWE was in the winning Dunkirk consortium through innogy in 2019, and pre-selected for Centre Manche 1, Bretagne Sud, the Mediterranean floating sites, Oléron, Centre Manche 2 and AO9. It won Centre Manche 2 with TotalEnergies in September 2025 and asked to leave the same day.",
    ev: ["m_dunkirk", "m_ao4", "m_ao5", "m_ao6", "m_ao7", "m_cm2", "m_cm2_exit", "m_ao9"] },
  { h: "Steady small onshore tender wins",
    p: "RWE won 43.5 MW of wind in 2023 and 41.3 MW in 2024 in CRE rounds, and a small solar park in the technology-neutral tender. Its first corporate PPA in France, with Sanofi, came in 2025.",
    ev: ["m_cre23", "m_cre24", "m_pierrieres", "m_sanofi"] }
];

const GAPS = [
  { h: "Not found", items: [
      ["When RWE left the Dunkirk project: a partner in May 2021, absent from the project company’s list later.", ["r_dk_2021", "r_dk_2025"]],
      ["Whether RWE filed bids for Centre Manche 1, Bretagne Sud and the Mediterranean sites, and whether it bid in AO10.", ["r_ao4cre", "r_ao6cre", "r_ao10"]],
      ["RWE’s French capacity in operation by source: it reports capacity commissioned since 2021.", ["r_3farms"]]
  ] },
  { h: "Watch", items: [
      ["The AO10 award, planned for February 2027.", ["r_ao10"]]
  ] },
  { h: "Left out of scope", items: [
      ["innogy’s other French activities before its renewables moved to RWE.", ["r_dk_owners"]]
  ] }
];

window.COMPANY_DATA = window.COMPANY_DATA || {};
window.COMPANY_DATA.rwe = { S, PARTIES, MOVES, BASELINE, CAPACITY, TARGETS, FINDINGS, GAPS, WORTH };
})();
