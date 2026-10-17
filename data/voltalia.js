// Voltalia in French renewables, Oct 2016 – Oct 2026.
// Source keys are prefixed "v_" so they never collide with the other companies' keys.
// Capacity is mainland France as Voltalia reports it; French Guiana is reported separately and noted in the text.
// Registers window.COMPANY_DATA.vol. Edit the lists below; run `node tools/check-data.js` after changes.
(function () {
const S = {
  v_alleins: { t: "Lancement de la construction d’une nouvelle centrale solaire en France métropolitaine (Voltalia via AMF, 30 Aug 2017)", u: "https://echanges.dila.gouv.fr/OPENDATA/AMF/ECO/2017/08/FCECO044377_20170830.pdf" },
  v_cre4: { t: "Voltalia lauréat de l’appel d’offres solaire CRE IV (Voltalia via AMF, 13 Feb 2018)", u: "https://echanges.dila.gouv.fr/OPENDATA/AMF/ECO/2018/02/FCECO045901_20180213.pdf" },
  v_cre44: { t: "Voltalia remporte deux nouveaux projets solaires en France, AO CRE 4.4 (Voltalia, 7 Aug 2018)", u: "https://voltalia.gcs-web.com/system/files-encrypted/nasdaq_kms/news/2021/04/16/9-26-15/180807-voltalia-ipp-France-AO_CRE_4.4-vfinale-VF-def.pdf" },
  v_sncf19: { t: "Solar-powered trains propel France’s dormant PPA scene (PV Tech, 28 Jun 2019)", u: "https://pv-tech.org/solar-powered-trains-propel-frances-dormant-ppa-scene" },
  v_helexia: { t: "Voltalia acquires French solar installer Helexia (pv magazine, 27 Sep 2019)", u: "https://www.pv-magazine.com/2019/09/27/voltalia-acquires-french-solar-installer-helexia/" },
  v_fessenheim: { t: "Mise en service de Tresques et Parroc, projet remporté à Fessenheim (Voltalia, 1 Oct 2019)", u: "https://voltalia.gcs-web.com/system/files-encrypted/nasdaq_kms/news/2021/04/19/1-33-31/20191001_Voltalia-CODTresquesParroc-winFessenheim-FR.pdf" },
  v_cre20: { t: "Voltalia remporte 28 MW en France et en Guyane (Voltalia, 7 Apr 2020)", u: "https://voltalia.gcs-web.com/system/files-encrypted/nasdaq_kms/news/2021/04/19/4-23-01/20200407_AOFranceGuyane_FR.pdf" },
  v_decathlon: { t: "France’s Voltalia signs 16 MW solar PPA with retailer Decathlon (S&P Global, 3 Nov 2020)", u: "https://www.spglobal.com/energy/en/news-research/latest-news/electric-power/110320-frances-voltalia-signs-16-mw-solar-ppa-with-retailer-decathlon" },
  v_sableblanc: { t: "Voltalia remporte en Guyane française une centrale mixte photovoltaïque et stockage (Voltalia via AMF, 10 May 2021)", u: "https://echanges.dila.gouv.fr/OPENDATA/AMF/MKW/2021/05/FCMKW134049_20210510.pdf" },
  v_11firms: { t: "Voltalia signs 20-year solar PPA with 11 French firms (Voltalia, 10 Dec 2021)", u: "https://voltalia.gcs-web.com/news-releases/news-release-details/voltalia-signs-20-year-solar-ppa-11-french-firms" },
  v_capsud: { t: "Voltalia subsidiary Helexia buys struggling French agrisolar installer for US$5.5m (PV Tech, 1 Apr 2022)", u: "https://pv-tech.org/voltalia-subsidiary-helexia-buys-struggling-french-agrisolar-installer-for-us5-5m" },
  v_renault: { t: "Voltalia signe un contrat d’approvisionnement de 15 ans avec Renault Group (Voltalia via AMF, 24 Nov 2022)", u: "https://echanges.dila.gouv.fr/OPENDATA/AMF/MKW/2022/11/FCMKW138585_20221124.pdf" },
  v_fy22: { t: "Résultats annuels 2022, incl. capacity by country (Voltalia via AMF, 23 Mar 2023)", u: "https://echanges.dila.gouv.fr/OPENDATA/AMF/MKW/2023/03/FCMKW139708_20230323.pdf" },
  v_sncf23: { t: "SNCF Energie signs a new wind energy supply contract with Voltalia (Voltalia, 11 Jul 2023)", u: "https://voltalia.gcs-web.com/pt-pt/node/16546" },
  v_sudvannier: { t: "Crossing the cape of two gigawatts in operation, following the full commissioning of a new wind farm in France (Voltalia via Yahoo Finance, 5 Oct 2023)", u: "https://it.finance.yahoo.com/news/crossing-cape-two-gigawatts-operation-161000711.html" },
  v_wind73: { t: "73 mégawatts remportés en France (Voltalia via AMF, 29 Nov 2023)", u: "https://echanges.dila.gouv.fr/OPENDATA/AMF/MKW/2023/11/FCMKW131832_20231129.pdf" },
  v_fy23: { t: "Résultats annuels 2023, incl. capacity by country (Voltalia via AMF, 2 Apr 2024)", u: "https://echanges.dila.gouv.fr/OPENDATA/AMF/MKW/2024/04/FCMKW132376_20240402.pdf" },
  v_logelbach: { t: "Voltalia passes three gigawatts of capacity, incl. Logelbach commissioned in January (Voltalia via AMF, 3 Jun 2024)", u: "https://echanges.dila.gouv.fr/OPENDATA/AMF/MKW/2024/06/FCMKW114417_20240603.pdf" },
  v_cern: { t: "Le CERN s’engage avec Voltalia pour son approvisionnement en énergie renouvelable (Voltalia via AMF, 26 Nov 2024)", u: "https://echanges.dila.gouv.fr/OPENDATA/AMF/MKW/2024/11/FCMKW135325_20241126.pdf" },
  v_fy24: { t: "Résultats annuels 2024, incl. capacity by country (Voltalia, 13 Mar 2025)", u: "https://voltalia.gcs-web.com/fr/node/19676/pdf" },
  v_spring: { t: "Voltalia launches SPRING, a transformation plan to drive sustainable and profitable growth (Voltalia via GlobeNewswire, 4 Sep 2025)", u: "https://www.globenewswire.com/de/news-release/2025/09/04/3144177/0/en/Voltalia-launches-SPRING-a-transformation-plan-to-drive-sustainable-and-profitable-growth.html" },
  v_sainteanne: { t: "Voltalia lance la construction d’une centrale hybride en Guyane (Option Finance, 17 Dec 2025)", u: "https://www.optionfinance.fr/info-financiere-en-continu/d/2025-12-17-voltalia-lance-la-construction-dune-centrale-hybride-en-guyane.html" },
  v_jan26: { t: "Achievement of the 2025 target of 3.6 GW in operation and construction, incl. French sales (Voltalia via AMF, 7 Jan 2026)", u: "https://echanges.dila.gouv.fr/OPENDATA/AMF/MKW/2026/01/FCMKW118154_20260107.pdf" },
  v_fy25: { t: "2025 full-year results, incl. capacity by country (Voltalia, 12 Mar 2026)", u: "https://voltalia.gcs-web.com/pt-pt/node/20701" },
  v_cern26: { t: "Mise en service de trois parcs solaires dans le sud de la France (Voltalia via MFN, 7 May 2026)", u: "https://mfn.se/one/a/voltalia-s-a/mise-en-service-de-trois-parcs-solaires-dans-le-sud-de-la-france-d4b63c1f" }
};

const PARTIES = [
  { id: "state", name: "French State & CRE", type: "Ministry in charge of energy and the energy regulator (CRE)" },
  { id: "sncf", name: "SNCF", type: "National railway (SNCF Énergie)" },
  { id: "decathlon", name: "Decathlon", type: "Sports retailer" },
  { id: "renault", name: "Renault Group", type: "Carmaker" },
  { id: "leroymerlin", name: "Leroy Merlin", type: "Home-improvement retailer" },
  { id: "cern", name: "CERN", type: "European particle physics laboratory near Geneva" },
  { id: "airfrance", name: "Air France", type: "Airline; one of 11 buyers in a shared PPA" },
  { id: "lcl", name: "LCL", type: "Bank; underwrote the shared PPA and is a buyer" },
  { id: "helexia", name: "Helexia", type: "Rooftop solar and energy services company, Voltalia subsidiary since 2019" },
  { id: "capsud", name: "Cap Sud", type: "French agrisolar roof installer and operator" }
];

const MOVES = [
  { id: "m_alleins", techs: ["solar"], cat: "tenders", date: "2017-08-30", dp: "day", short: "Builds Carrière-des-Plaines solar (CRE 2)", mw: 8,
    title: "Starts building the Carrière-des-Plaines solar plant on a former quarry", tech: "Solar",
    figs: "8.2 MW at Alleins (Bouches-du-Rhône) · half fixed panels, half concentrated PV on trackers · won in the CRE 2 tender",
    text: "Voltalia sold the plant, with Canadel and Pagap, in December 2025.",
    parties: [["state", "Awarding authority (CRE 2)"]], src: ["v_alleins", "v_jan26"] },
  { id: "m_cre4", techs: ["solar"], cat: "tenders", date: "2018-02-13", dp: "day", short: "Wins 8 MW in CRE 4 solar rounds", mw: 8,
    title: "Wins two solar projects in Provence, one agrivoltaic", tech: "Solar, agrivoltaics",
    figs: "Talagard, 5 MW, Salon-de-Provence, 20-year contract · Saint-Étienne-du-Grès, 3 MW agrivoltaic, innovation tender",
    text: "Two more wins followed in August 2018: 8.9 MW at Marignac-Laspeyres and Jonquières (CRE 4.4).",
    parties: [["state", "Awarding authority"]], src: ["v_cre4", "v_cre44"] },
  { id: "m_sncf19", techs: ["solar"], cat: "contracts", date: "2019-06-28", dp: "day", short: "25-year solar PPA with SNCF, 143 MW", mw: 143,
    title: "Signs a 25-year PPA with SNCF for 143 MW of new solar plants", tech: "Solar",
    figs: "143 MW · three plants in the Gard and Var, built and owned by Voltalia · planned for 2022–2023",
    text: "PV Tech saw it as reviving a dormant French PPA market.",
    parties: [["sncf", "Buyer"]], src: ["v_sncf19", "v_sncf23"] },
  { id: "m_helexia", techs: ["solar"], cat: "deals", date: "2019-09-27", dp: "day", short: "Buys Helexia, rooftop solar",
    title: "Buys Helexia, a rooftop solar and building-energy company", tech: "Rooftop solar, energy services",
    figs: "More than 200 PV plants and over 60 MW in France, Belgium, Italy, Portugal and Spain · price not disclosed",
    text: "Helexia finances and installs rooftop and carport solar for commercial customers who use the power on site.",
    parties: [["helexia", "Acquired"]], src: ["v_helexia"] },
  { id: "m_fessenheim", techs: ["solar"], cat: "tenders", date: "2019-10-01", dp: "day", short: "Wins Fessenheim transition tender", mw: 10,
    title: "Wins a solar project in the tender for the Fessenheim area after the nuclear closure", tech: "Solar",
    figs: "Logelbach, 10.2 MW at Wintzenheim · 20-year contract · online January 2024 at 12.1 MW",
    text: "The same release reported Tresques (3 MW, Gard) commissioned and Parroc (5 MW, Haute-Vienne) built.",
    parties: [["state", "Awarding authority"]], src: ["v_fessenheim", "v_logelbach"] },
  { id: "m_cre20", techs: ["wind_on", "solar"], cat: "tenders", date: "2020-04-07", dp: "day", short: "Wins 28 MW incl. Sarry wind", mw: 28,
    title: "Wins 28 MW in French tenders, including the Sarry wind farm", tech: "Onshore wind, solar",
    figs: "Sarry, 22 MW wind (Yonne) · 3 MW agrivoltaic · 1.2 MW of rooftop self-consumption for Auchan and Decathlon stores · 1.4 MW solar carport in French Guiana (Helexia)",
    text: "Four separate tenders.",
    parties: [["state", "Awarding authority"]], src: ["v_cre20"] },
  { id: "m_decathlon", techs: ["solar"], cat: "contracts", date: "2020-11-03", dp: "day", short: "16 MW solar PPA with Decathlon", mw: 16,
    title: "Signs a solar PPA with Decathlon France", tech: "Solar",
    figs: "16 MW · about 26 GWh a year · solar farm in south-east France, due in 2023 · about 15% of Decathlon’s French use",
    text: "Duration not given.",
    parties: [["decathlon", "Buyer"]], src: ["v_decathlon"] },
  { id: "m_sableblanc", techs: ["solar", "storage"], cat: "tenders", date: "2021-05-10", dp: "day", short: "Solar plus battery in French Guiana", mw: 5,
    title: "Wins a solar and battery plant at Mana, French Guiana", tech: "Solar + battery storage (French Guiana)",
    figs: "Sable Blanc: 5 MW solar, 5 MW / 9.3 MWh batteries · sole winner of the CRE round for non-interconnected zones · 20-year tariff · due 2023",
    text: "It took Voltalia’s Toco complex to 19.3 MW and 25.6 MWh, which Voltalia called the largest battery complex in France.",
    parties: [["state", "Awarding authority"]], src: ["v_sableblanc"] },
  { id: "m_11firms", techs: ["solar"], cat: "contracts", date: "2021-12-10", dp: "day", short: "Shared 20-year PPA with 11 firms", mw: 56,
    title: "Signs a 20-year solar PPA shared by 11 French companies", tech: "Solar",
    figs: "56 MW solar farm planned in southern France · buyers incl. Air France and Bonduelle · LCL underwrites and buys",
    text: "Voltalia called it the first green multi-buyer PPA in Europe.",
    parties: [["airfrance", "One of 11 buyers"], ["lcl", "Underwriter and buyer"]], src: ["v_11firms"] },
  { id: "m_capsud", techs: ["solar"], cat: "deals", date: "2022-04-01", dp: "day", short: "Helexia buys Cap Sud, €5m", mw: 35,
    title: "Buys Cap Sud, an agrisolar roof company in safeguard proceedings, through Helexia", tech: "Solar (farm roofs)",
    figs: "€5m · 35 MW of solar on farm roofs",
    text: "Helexia’s long-term PPA portfolio had grown to 225 MW since 2019.",
    parties: [["capsud", "Acquired"], ["helexia", "Buyer"]], src: ["v_capsud"] },
  { id: "m_renault", techs: ["solar"], cat: "contracts", date: "2022-11-24", dp: "day", short: "350 MW solar PPA with Renault", mw: 350,
    title: "Signs a 15-year, 350 MW solar supply contract with Renault", tech: "Solar",
    figs: "350 MW · about 500 GWh a year · 100 MW from 2025, 350 MW by 2027 · plants in France",
    text: "Voltalia called it the largest corporate renewable PPA ever signed in France. Renault aims to cover up to half of its French plants’ power use by 2027.",
    parties: [["renault", "Buyer"]], src: ["v_renault"] },
  { id: "m_sncf23", techs: ["wind_on"], cat: "contracts", date: "2023-07-11", dp: "day", short: "SNCF buys Rives Charentaises wind", mw: 37,
    title: "Sells the whole output of the Rives Charentaises wind farm to SNCF Énergie", tech: "Onshore wind",
    figs: "37.4 MW · about 78 GWh a year · Nouvelle-Aquitaine · long-term contract",
    text: "Its second contract with SNCF, after the 143 MW solar agreement of 2019.",
    parties: [["sncf", "Buyer (SNCF Énergie)"]], src: ["v_sncf23"] },
  { id: "m_sudvannier", techs: ["wind_on"], cat: "contracts", date: "2023-10-05", dp: "day", short: "Sud Vannier online, PPA with Leroy Merlin", mw: 24,
    title: "Completes the Sud Vannier wind farm, sold to Leroy Merlin under a 23-year PPA", tech: "Onshore wind",
    figs: "23.6 MW · Haute-Marne, south-east of Langres · 23-year corporate PPA",
    text: "Voltalia called it the first corporate PPA signed in France for a new wind farm.",
    parties: [["leroymerlin", "Buyer"]], src: ["v_sudvannier", "v_fy22"] },
  { id: "m_wind73", techs: ["wind_on"], cat: "tenders", date: "2023-11-29", dp: "day", short: "Wins 73 MW of CRE wind", mw: 73,
    title: "Wins three onshore wind farms in a CRE tender", tech: "Onshore wind",
    figs: "73 MW · Côte-d’Or 33.6 MW · Deux-Sèvres 26.1 MW · Indre 13.5 MW · 22 turbines",
    text: "Voltalia said its French development pipeline was over 2 GW.",
    parties: [["state", "Awarding authority"]], src: ["v_wind73"] },
  { id: "m_cern", techs: ["solar"], cat: "contracts", date: "2024-11-26", dp: "day", short: "15-year solar PPAs with CERN", mw: 27,
    title: "Signs two 15-year solar PPAs with CERN", tech: "Solar",
    figs: "26.8 MW in southern France · three parks totalling 26.9 MW commissioned in May 2026, two of them selling to CERN",
    text: "Both plants were still in development when the contracts were signed.",
    parties: [["cern", "Buyer"]], src: ["v_cern", "v_cern26"] },
  { id: "s_spring", techs: [], cat: "strategy", date: "2025-09-04", dp: "day", short: "SPRING plan: fewer countries, asset sales",
    title: "Launches SPRING: at most 12 countries, three technologies and asset sales", tech: "Solar, onshore wind, batteries",
    figs: "€300–350m of disposals, mainly 2026–2028 · about 5 GW owned by 2030 · 2026 job cuts in several countries incl. France",
    text: "France is not singled out in the plan; the 2025 results list it among the countries facing workforce reductions.",
    parties: [], src: ["v_spring", "v_fy25"] },
  { id: "m_sainteanne", techs: ["solar", "storage"], cat: "tenders", date: "2025-12-17", dp: "day", short: "Builds Sainte-Anne solar + battery, Guiana", mw: 84,
    title: "Starts building the Sainte-Anne solar and battery plant in French Guiana", tech: "Solar + battery storage (French Guiana)",
    figs: "43–44 MW solar · 34 MW / 135 MWh batteries · 84 MW in Voltalia’s count incl. a 7 MW hybrid unit · online 2028",
    text: "Site works began in late July 2025.",
    parties: [], src: ["v_sainteanne", "v_jan26"] },
  { id: "m_sale25", techs: ["solar"], cat: "deals", date: "2025-12-31", dp: "month", short: "Sells three French solar plants", mw: 24,
    title: "Sells three operating solar plants in France", tech: "Solar",
    figs: "24 MW · Carrière-des-Plaines, Canadel and Pagap · buyer not named",
    text: "Part of the asset sales under SPRING. French operating capacity still rose to 340 MW at the end of 2025.",
    parties: [], src: ["v_jan26", "v_fy25"] }
];

const BASELINE = {
  title: "Voltalia in France",
  figs: "340 MW in operation in mainland France at end-2025: 255 MW solar, 81 MW wind, 5 MW other · 59 MW in French Guiana",
  text: "Voltalia is a Paris-listed producer and plant builder working in about 15 countries. In France it runs many small solar plants won in CRE tenders, a few wind farms, rooftop solar through Helexia, and solar, hydro, biomass and batteries in French Guiana. Its French sales lean on long contracts with companies: SNCF, Renault, Leroy Merlin, Decathlon and CERN.",
  src: ["v_fy25", "v_helexia", "v_renault"]
};

// Capacity in operation in mainland France, as reported each year-end. About 5 MW of other generation
// (labelled biomass in the 2024 report, hydro in the 2025 report) is noted but not charted.
const CAPACITY = [
  { date: "2022-12-31", mw: { wind_on: 65.3, solar: 146 }, note: "215.8 MW in total incl. 4.5 MW of other generation; split read from the results table", src: ["v_fy22"] },
  { date: "2023-12-31", mw: { wind_on: 93, solar: 196 }, note: "294 MW in total incl. 5 MW of other generation", src: ["v_fy23"] },
  { date: "2024-12-31", mw: { wind_on: 81, solar: 248 }, note: "334 MW in total incl. 5 MW labelled biomass", src: ["v_fy24"] },
  { date: "2025-12-31", mw: { wind_on: 81, solar: 255 }, note: "340 MW in total incl. 5 MW labelled hydro; French Guiana 59 MW", src: ["v_fy25"] }
];
const TARGETS = [];

const WORTH = [
  ["renault", "Signed France’s largest corporate PPA with Voltalia"],
  ["sncf", "Buys power from Voltalia, EDF and Neoen"],
  ["helexia", "Voltalia’s rooftop solar arm since 2019"],
  ["cern", "Buys solar from two new parks in southern France"]
];

const FINDINGS = [
  { h: "Small plants, large contracts",
    p: "Voltalia’s French plants are mostly a few megawatts each, won in CRE rounds. Its contracts are larger: 143 MW of solar for SNCF in 2019, a shared PPA for 11 companies in 2021, 350 MW for Renault in 2022, which it called France’s largest corporate PPA, and Sud Vannier, which it called the first corporate PPA in France for a new wind farm, for Leroy Merlin.",
    ev: ["m_sncf19", "m_11firms", "m_renault", "m_sudvannier", "m_sncf23", "m_cern"] },
  { h: "Rooftops through Helexia",
    p: "Voltalia bought Helexia in 2019 to finance and install solar on customers’ roofs and car parks, then bought Cap Sud’s 35 MW of farm roofs through it in 2022.",
    ev: ["m_helexia", "m_capsud", "m_cre20"] },
  { h: "Batteries in French Guiana",
    p: "In French Guiana Voltalia pairs solar with batteries: Sable Blanc in 2021 took its Toco complex to 25.6 MWh, and the Sainte-Anne plant, started in 2025, adds 135 MWh for 2028.",
    ev: ["m_sableblanc", "m_sainteanne"] },
  { h: "Selling and cutting under SPRING",
    p: "The SPRING plan of September 2025 limits Voltalia to 12 countries and plans €300–350m of asset sales. In December 2025 it sold three operating French solar plants, and its 2026 job cuts include France.",
    ev: ["s_spring", "m_sale25"] }
];

const GAPS = [
  { h: "Not found", items: [
      ["Whether the three plants for the 2019 SNCF contract were built.", ["v_sncf19"]],
      ["Which plants supply Renault, and how much of the 350 MW is running.", ["v_renault", "v_fy25"]],
      ["Capacity by source in mainland France before 2022, and what the 5 MW of other generation is: the reports label it biomass and hydro in different years.", ["v_fy24", "v_fy25"]]
  ] },
  { h: "Watch", items: [
      ["Renault’s contract, due to reach 350 MW in 2027.", ["v_renault"]],
      ["Sainte-Anne in French Guiana, due in 2028, and further sales under SPRING.", ["v_sainteanne", "v_spring"]]
  ] },
  { h: "Left out of scope", items: [
      ["Biomass plants in French Guiana (Kourou, Cacao, and Sinnamary, about 10 MW, online in 2025), since biomass power is not one of the site’s sources.", ["v_fy22", "v_jan26"]],
      ["Voltalia’s services business, building and running plants for other owners.", ["v_spring"]]
  ] }
];

window.COMPANY_DATA = window.COMPANY_DATA || {};
window.COMPANY_DATA.vol = { S, PARTIES, MOVES, BASELINE, CAPACITY, TARGETS, FINDINGS, GAPS, WORTH };
})();
