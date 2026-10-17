// Enel in French renewables, Oct 2016 – Oct 2026.
// Source keys are prefixed "el_" so they never collide with the other companies' keys.
// Enel sold its French renewables arm in 2014, before the period; this file records what followed.
// Registers window.COMPANY_DATA.enl. Edit the lists below; run `node tools/check-data.js` after changes.
(function () {
const S = {
  el_egpf: { t: "Boralex to acquire Enel Green Power France (Windtech International, 17 Dec 2014)", u: "https://www.windtech-international.com/company-news/boralex-to-acquire-enel-green-power-france" },
  el_egpf_close: { t: "Sale of Enel Green Power France completed (Enel, 18 Dec 2014)", u: "https://corporate.enel.it/en/media/explore-press-releases/press/2014/12/sale-of-enel-green-power-france-completed-" },
  el_adlc: { t: "Décision n° 16-DCC-153 relative à la prise de contrôle exclusif d’Enel France par Quadran (Autorité de la concurrence, 20 Oct 2016)", u: "https://www.autoritedelaconcurrence.fr/sites/default/files/commitments//16DCC153versionpublication.pdf" },
  el_plan22: { t: "Le géant italien Enel compte réduire sa dette en cédant 21 milliards d’euros d’actifs (Connaissance des Énergies, 22 Nov 2022)", u: "https://www.connaissancedesenergies.org/afp/le-geant-italien-enel-compte-reduire-sa-dette-en-cedant-21-milliards-deuros-dactifs-221122" },
  el_dk_prequal: { t: "Dunkerque : les cartes d’identité des 10 préqualifiés pour le futur parc éolien en mer (Énergies de la Mer, 17 May 2017)", u: "https://www.energiesdelamer.eu/2017/05/17/dunkerque-les-cartes-d-identite-des-10-prequalifies-pour-le-futur-parc-eolien-en-mer/" },
  el_ao4pre: { t: "France shortlists 6 bidders for the 1 GW Cotentin offshore wind project (Enerdata, 28 Apr 2021)", u: "https://www.enerdata.net/publications/daily-energy-news/france-shortlists-6-bidders-1-gw-cotentin-offshore-wind-project.html" },
  el_ao5pre: { t: "Bretagne Sud : 10 candidats pré-sélectionnés pour le dialogue concurrentiel de l’AO5 (Énergies de la Mer, 16 Sep 2021)", u: "https://www.energiesdelamer.eu/2021/09/16/bretagne-sud-10-candidats-pre-selectionnes-pour-le-dialogue-concurrentiel-de-lao5/" },
  el_ao6pre: { t: "Parcs éoliens en mer Méditerranée : sélection de 13 candidats (Figaro Nautisme, 2 Aug 2022)", u: "https://figaronautisme.meteoconsult.fr/actus-nautisme-flash/2022-08-02/64167-parcs-eoliens-en-mer-mediterranee-selection-de-13-candidats-pour-participer-a-la-2e-phase-de-la-procedure" },
  el_ao7pre: { t: "Présélection des candidats AO7 Oléron, rapport de synthèse (CRE, 16 Feb 2023)", u: "https://CRE.fr/fileadmin/Documents/Appels_d_offres/import/230216_2023-62_Preselection_AO7_Oleron-rapport.pdf" },
  el_ao8pre: { t: "Présélection des candidats AO8 Centre Manche 2, rapport de synthèse (CRE, 16 Feb 2023)", u: "https://CRE.fr/fileadmin/Documents/Appels_d_offres/import/230216_2023-63_Preselection_AO8_Normandie_rapport.pdf" },
  el_ao9pre: { t: "France pre-selects 12 developers for 2.5 GW offshore wind tender (Enerdata, 21 Nov 2024)", u: "https://www.enerdata.net/publications/daily-energy-news/france-pre-selects-12-developers-25-gw-offshore-wind-tender.html" }
};

const PARTIES = [
  { id: "quadran", name: "Quadran", type: "French renewables producer; bought by Direct Energie, then part of TotalEnergies" }
];

const MOVES = [
  { id: "m_enelfrance", techs: [], cat: "deals", date: "2016-10-20", dp: "day", short: "Sells Enel France to Quadran",
    title: "Sells Enel France, its supplier to business sites, to Quadran", tech: "Electricity supply",
    figs: "100% of Enel France · buyer Energies Libres, owned by Quadran · agreed 16 Sep 2016, cleared by the competition authority 20 Oct 2016",
    text: "The competition authority described Enel France as a supplier to medium and large business sites, and Quadran as the renewable producer.",
    parties: [["quadran", "Buyer, through Energies Libres"]], src: ["el_adlc"] },
  { id: "s_core22", techs: [], cat: "strategy", date: "2022-11-22", dp: "day", short: "Six core countries; France not one",
    title: "Narrows the group to six core countries, none of them France", tech: "All activities",
    figs: "Italy, Spain, the US, Brazil, Chile and Colombia · €21bn of asset sales in the 2023–2025 plan",
    text: "France was neither among the core countries nor among the exits named.",
    parties: [], src: ["el_plan22"] }
];

const BASELINE = {
  title: "Enel in France",
  figs: "No French renewable plants found in the period · Enel Green Power France (12 wind farms, 186 MW, 310 MW of projects) sold to Boralex in December 2014",
  text: "Enel left French renewables before the period by selling Enel Green Power France to Boralex for C$400m. In 2016 it sold its French business-supply arm to Quadran. We found no Enel plant, tender bid or PPA in France from 2016 to 2026.",
  src: ["el_egpf", "el_egpf_close", "el_adlc"]
};

const CAPACITY = [];
const TARGETS = [];

const WORTH = [
  ["quadran", "Bought Enel France in 2016, later part of TotalEnergies"]
];

const FINDINGS = [
  { h: "Out of France before the period",
    p: "Enel sold its French wind business to Boralex in 2014 and its French supply arm to Quadran in 2016. Its 2022 plan kept six core countries, none of them France, and it appears on none of the French offshore pre-selection lists from Dunkirk (2017) to AO9 (2024).",
    ev: ["m_enelfrance", "s_core22"] }
];

const GAPS = [
  { h: "Not found", items: [
      ["Any Enel renewable plant, tender bid or PPA in France from 2016 to 2026.", []],
      ["Any Enel candidacy in French offshore rounds: it is on none of the published pre-selection lists.", ["el_dk_prequal", "el_ao4pre", "el_ao5pre", "el_ao6pre", "el_ao7pre", "el_ao8pre", "el_ao9pre"]]
  ] },
  { h: "Left out of scope", items: [
      ["Enel X’s demand-response and charging services, which are not generation.", []],
      ["The 2014 sale of Enel Green Power France to Boralex, before the period covered.", ["el_egpf", "el_egpf_close"]]
  ] }
];

window.COMPANY_DATA = window.COMPANY_DATA || {};
window.COMPANY_DATA.enl = { S, PARTIES, MOVES, BASELINE, CAPACITY, TARGETS, FINDINGS, GAPS, WORTH };
})();
