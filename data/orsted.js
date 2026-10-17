// Ørsted in French renewables, Oct 2016 – Oct 2026.
// Source keys are prefixed "o_" so they never collide with the other companies' keys.
// Registers window.COMPANY_DATA.ors. Edit the lists below; run `node tools/check-data.js` after changes.
(function () {
const S = {
  o_exit16: { t: "Ørsted sees France as far more mature for offshore wind (EnergyWatch)", u: "https://energywatch.com/EnergyNews/Renewables/article11202956.ece" },
  o_dong13: { t: "Dong Energy quits on French offshore wind tender (Navingo, 11 Apr 2013)", u: "https://www.navingocareer.com/dong-energy-quits-on-french-offshore-wind-tender/" },
  o_dk_prequal: { t: "Dunkerque : les cartes d’identité des 10 préqualifiés pour le futur parc éolien en mer (Énergies de la Mer, 17 May 2017)", u: "https://www.energiesdelamer.eu/2017/05/17/dunkerque-les-cartes-d-identite-des-10-prequalifies-pour-le-futur-parc-eolien-en-mer/" },
  o_dk_consortium: { t: "Parc offshore de Dunkerque : un nouveau consortium de poids avec Total, Elicio et Ørsted (Énergies de la Mer, 18 Feb 2019)", u: "https://www.energiesdelamer.eu/2019/02/18/parc-offshore-de-dunkerque-un-nouveau-consortium-de-poids-avec-total-elicio-et-orsted/" },
  o_dk_bid: { t: "Total lance une offre conjointe sur de l’éolien en mer à Dunkerque (Boursorama, 18 Feb 2019)", u: "https://www.boursorama.com/bourse/actualites/total-lance-une-offre-conjointe-sur-de-l-eolien-en-mer-a-dunkerque-f77aee7fce49ace5c4101c5f3bd12ef2" },
  o_dk_bids: { t: "Éolien en mer : au moins 6 offres déposées pour le parc de Dunkerque (Connaissance des Énergies, 15 Mar 2019)", u: "https://www.connaissancedesenergies.org/afp/eolien-en-mer-au-moins-6-offres-deposees-pour-le-projet-de-parc-de-dunkerque-190315" },
  o_dk_price: { t: "Dunkirk strike price is EUR 44/MWh (offshoreWIND.biz, 20 Jun 2019)", u: "https://www.offshorewind.biz/2019/06/20/dunkirk-strike-price-is-eur-44-mwh/" },
  o_ao4pre: { t: "France shortlists 6 bidders for the 1 GW Cotentin offshore wind project (Enerdata, 28 Apr 2021)", u: "https://www.enerdata.net/publications/daily-energy-news/france-shortlists-6-bidders-1-gw-cotentin-offshore-wind-project.html" },
  o_ao5pre: { t: "Bretagne Sud : 10 candidats pré-sélectionnés pour le dialogue concurrentiel de l’AO5 (Énergies de la Mer, 16 Sep 2021)", u: "https://www.energiesdelamer.eu/2021/09/16/bretagne-sud-10-candidats-pre-selectionnes-pour-le-dialogue-concurrentiel-de-lao5/" },
  o_ao6pre: { t: "Parcs éoliens en mer Méditerranée : sélection de 13 candidats (Figaro Nautisme, 2 Aug 2022)", u: "https://figaronautisme.meteoconsult.fr/actus-nautisme-flash/2022-08-02/64167-parcs-eoliens-en-mer-mediterranee-selection-de-13-candidats-pour-participer-a-la-2e-phase-de-la-procedure" },
  o_ao7pre: { t: "Présélection des candidats AO7 Oléron, rapport de synthèse (CRE, 16 Feb 2023)", u: "https://CRE.fr/fileadmin/Documents/Appels_d_offres/import/230216_2023-62_Preselection_AO7_Oleron-rapport.pdf" },
  o_ao8pre: { t: "Présélection des candidats AO8 Centre Manche 2, rapport de synthèse (CRE, 16 Feb 2023)", u: "https://CRE.fr/fileadmin/Documents/Appels_d_offres/import/230216_2023-63_Preselection_AO8_Normandie_rapport.pdf" },
  o_ao9pre: { t: "France pre-selects 12 developers for 2.5 GW offshore wind tender (Enerdata, 21 Nov 2024)", u: "https://www.enerdata.net/publications/daily-energy-news/france-pre-selects-12-developers-25-gw-offshore-wind-tender.html" },
  o_ostwind: { t: "Ørsted to acquire 100% stake in Ostwind, company announcement (Ørsted, 22 Jul 2022)", u: "https://orsted.com/en/company-announcement-list/2022/07/2022072254591" },
  o_ostwind_close: { t: "Ørsted completes acquisition of German and French onshore wind platform Ostwind (Ørsted, 19 Sep 2022)", u: "https://orsted.com/en/media/news/2022/09/20220919564311" },
  o_sale: { t: "Ørsted to divest its French onshore business (Ørsted, 29 Apr 2024)", u: "https://orsted.com/en/media/news/2024/04/oersted-to-divest-its-french-onshore-business-854311" },
  o_sale_cde: { t: "Engie signe un accord avec le groupe danois Ørsted pour acquérir son parc d’installations en France (Connaissance des Énergies, 29 Apr 2024)", u: "https://www.connaissancedesenergies.org/afp/engie-signe-un-accord-avec-le-groupe-danois-orsted-pour-acquerir-son-parc-dinstallations-en-france-240429" },
  o_sale_hl: { t: "Hogan Lovells conseille Ørsted dans le cadre de la cession de ses activités éoliennes et solaires en France à Engie (Hogan Lovells, 2 May 2024)", u: "https://hlc.com/fr/news/hogan-lovells-conseille-orsted-dans-le-cadre-de-la-cession-de-ses-activites-eoliennes-et-solaires-en-france-a-engie" },
  o_cip: { t: "European onshore business divestment to CIP (Ørsted UK, 3 Feb 2026)", u: "https://orsted.co.uk/media/newsroom/news/2026/02/european-onshore-business-divestment" }
};

const PARTIES = [
  { id: "state", name: "French State & CRE", type: "Ministry in charge of energy and the energy regulator (CRE)" },
  { id: "elicio", name: "Elicio", type: "Belgian offshore wind developer" },
  { id: "ostwind", name: "Ostwind", type: "German onshore wind and solar developer (Ostwind AG)" },
  { id: "totalenergies", name: "TotalEnergies", type: "Energy major; Ørsted’s partner for Dunkirk", company: "te" },
  { id: "edf", name: "EDF Renouvelables", type: "Renewables arm of EDF" },
  { id: "engie", name: "Engie", type: "Utility; bought Ostwind France", company: "eng" }
];

const MOVES = [
  { id: "m_dk_join", techs: ["wind_off"], cat: "partners", date: "2019-02-18", dp: "day", short: "Joins Total and Elicio for Dunkirk",
    title: "Joins Total and Elicio in a joint bid for the Dunkirk offshore wind farm", tech: "Offshore wind (fixed)",
    figs: "Up to 600 MW off Dunkirk · three-way consortium, shares not disclosed",
    text: "Ørsted was not among the ten groups pre-qualified in May 2017; Elicio was. Ørsted said it brought unmatched experience in building and running offshore wind farms.",
    parties: [["totalenergies", "Consortium partner"], ["elicio", "Consortium partner, pre-qualified in 2017"]], src: ["o_dk_consortium", "o_dk_bid", "o_dk_prequal"] },
  { id: "m_dunkirk", techs: ["wind_off"], cat: "tenders", date: "2019-06-14", dp: "month", lost: "Lost", short: "Loses Dunkirk offshore (AO3)", mw: 600,
    title: "Loses the Dunkirk offshore wind tender (AO3) with Total and Elicio", tech: "Offshore wind (fixed)",
    figs: "About 600 MW · at least six bids, March 2019 · winning price €44/MWh",
    text: "EDF, innogy and Enbridge won. It was Ørsted’s only French offshore bid in the period.",
    parties: [["edf", "Winner, with innogy and Enbridge"], ["totalenergies", "Consortium partner"], ["state", "Awarding authority"]], src: ["o_dk_bids", "o_dk_price"] },
  { id: "m_ostwind", techs: ["wind_on", "solar"], cat: "deals", date: "2022-07-22", dp: "day", short: "Buys Ostwind, enters French onshore",
    title: "Buys Ostwind, entering onshore wind and solar in France and Germany", tech: "Onshore wind, solar",
    figs: "Enterprise value €689m · 152 MW in operation or under construction, about 526 MW in advanced development and about 1 GW in the pipeline, incl. 88 MW of solar, Germany and France combined · about 115 staff in nine offices · completed 19 Sep 2022",
    text: "Ørsted called it its entry into the German and French onshore markets. The figures are not split by country.",
    parties: [["ostwind", "Seller (Ostwind AG and other sellers)"]], src: ["o_ostwind", "o_ostwind_close"] },
  { id: "m_engie", techs: ["wind_on", "solar"], cat: "deals", date: "2024-04-29", dp: "day", short: "Sells Ostwind France to Engie, leaves France", mw: 78,
    title: "Sells its French onshore business to Engie and leaves France", tech: "Onshore wind, solar",
    figs: "54 MW in operation and 24 MW of wind under construction · 9 wind farms and a 4 MW solar park · about 70 staff · price not disclosed · closing expected in Q2 2024",
    text: "Ørsted had cut its build-out goals to 2030 and kept European onshore to the UK, Ireland, Germany and Spain. It said it would have no activities left in France.",
    parties: [["engie", "Buyer, through Engie Green"]], src: ["o_sale", "o_sale_cde", "o_sale_hl"] }
];

const BASELINE = {
  title: "Ørsted in France",
  figs: "No activities in France since the 2024 sale of Ostwind France to Engie",
  text: "As DONG Energy, Ørsted won three of the four sites in France’s first offshore tender with EDF, skipped the second round and left those projects in spring 2016. In the period covered it bid once offshore, for Dunkirk with Total and Elicio, and owned an onshore business, Ostwind France, from 2022 to 2024.",
  src: ["o_dong13", "o_exit16", "o_dk_bids", "o_ostwind_close", "o_sale"]
};

// Capacity in France, one record per published figure.
const CAPACITY = [
  { date: "2024-04-29", mw: { wind_on: 50, solar: 4 }, derived: true, note: "54 MW in operation (Ørsted). Wind calculated from Engie’s figures: 74 MW at 9 wind farms incl. 24 MW under construction, plus a 4 MW solar park", src: ["o_sale", "o_sale_cde"] },
  { date: "2024-06-30", mw: { wind_on: 0, solar: 0 }, note: "Sale to Engie due to close in Q2 2024; Ørsted said it would then have no activities in France", src: ["o_sale", "o_sale_hl"] }
];
const TARGETS = [];

const WORTH = [
  ["elicio", "Bid for Dunkirk with Total and Ørsted in 2019"],
  ["ostwind", "Sold Ørsted the platform it entered French onshore with"],
  ["state", "Ran the Dunkirk tender Ørsted lost"]
];

const FINDINGS = [
  { h: "Two years in French onshore",
    p: "Ørsted entered French onshore by buying Ostwind in 2022, together with its German business. In April 2024, after cutting its 2030 goals, it sold the French part to Engie with 54 MW running and 24 MW under construction, and said it would have nothing left in France.",
    ev: ["m_ostwind", "m_engie"] },
  { h: "One offshore bid in ten years",
    p: "Ørsted left its French offshore projects with EDF in spring 2016. Its only French offshore move since was the 2019 Dunkirk bid with Total and Elicio, which EDF won. It was not among the candidates pre-selected for any French offshore round from Centre Manche 1 to AO9.",
    ev: ["m_dk_join", "m_dunkirk"] }
];

const GAPS = [
  { h: "Not found", items: [
      ["Ostwind’s French capacity at the 2022 acquisition: Ørsted gave Germany and France together.", ["o_ostwind"]],
      ["The price Engie paid, and the exact closing date.", ["o_sale", "o_sale_hl"]],
      ["Any Ørsted candidacy in the French offshore rounds AO4 to AO9: it is on none of the published pre-selection lists.", ["o_ao4pre", "o_ao5pre", "o_ao6pre", "o_ao7pre", "o_ao8pre", "o_ao9pre"]]
  ] },
  { h: "Left out of scope", items: [
      ["Ørsted’s part, as DONG Energy, in EDF’s Saint-Nazaire, Fécamp and Courseulles projects, which it left in spring 2016.", ["o_exit16"]],
      ["The 2026 sale of Ørsted’s remaining European onshore business (Ireland, UK, Germany, Spain) to CIP, which did not include France.", ["o_cip"]]
  ] }
];

window.COMPANY_DATA = window.COMPANY_DATA || {};
window.COMPANY_DATA.ors = { S, PARTIES, MOVES, BASELINE, CAPACITY, TARGETS, FINDINGS, GAPS, WORTH };
})();
