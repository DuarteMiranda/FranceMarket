// EDP (EDP Renewables, EDPR) in French renewables, Oct 2016 – Oct 2026.
// Source keys are prefixed "p_" so they never collide with the other companies' keys.
// Merge notes: party "engie" maps to the Engie centre, "edf" to EDF and "totalenergies" to TotalEnergies.
// Offshore wind sits in Ocean Winds, a 50/50 joint venture with Engie, so those moves also appear in Engie's data.
// Registers window.COMPANY_DATA.edp. Edit the lists below; run `node tools/check-data.js` after changes.
(function () {
const S = {
  p_rotation19: { t: "EDPR announces asset rotation deal in Europe, 997 MW incl. 388 MW in France (EDPR, 23 Apr 2019)", u: "https://www.edpr-investors.com/en/media/news/edpr-announces-asset-rotation-europe" },
  p_dunkirk_bids: { t: "Éolien en mer : au moins 6 offres déposées pour le parc de Dunkerque (Connaissance des Énergies, 15 Mar 2019)", u: "https://www.connaissancedesenergies.org/afp/eolien-en-mer-au-moins-6-offres-deposees-pour-le-projet-de-parc-de-dunkerque-190315" },
  p_dunkirk_win: { t: "Le consortium mené par le groupe EDF remporte le projet éolien en mer de Dunkerque (EDF, 14 Jun 2019)", u: "https://www.edf.fr/groupe-edf/espaces-dedies/journalistes/tous-les-communiques-de-presse/le-consortium-mene-par-le-groupe-edf-remporte-le-projet-eolien-en-mer-de-dunkerque" },
  p_dunkirk_price: { t: "Dunkirk strike price is EUR 44/MWh (offshoreWIND.biz, 20 Jun 2019)", u: "https://www.offshorewind.biz/2019/06/20/dunkirk-strike-price-is-eur-44-mwh/" },
  p_rpglobal: { t: "EDPR renforce sa présence en France, agreement with RP Global on nine wind projects (Journal de l’Éolien, Sep 2019)", u: "https://www.journal-eolien.org/les-actus/edpr-renforce-sa-presence-en-france/" },
  p_axpo: { t: "EDPR executes asset rotation transaction in France with Axpo (EDPR, 7 Oct 2019)", u: "https://www.edpr-investors.com/en/media/news/edpr-executes-asset-rotation-transaction-france" },
  p_ow_agree: { t: "ENGIE et EDPR pour la création d’une JV à 50/50 pour l’éolien en mer (Énergies de la Mer, 23 Jan 2020)", u: "https://www.energiesdelamer.eu/2020/01/23/engie-et-edpr-jv-a-50-50-eolien-en-mer/" },
  p_strat20: { t: "Stratégie : EDP Renewables dévoile son plan de développement horizon 2022, sponsored article (Actu-Environnement, 3 Feb 2020)", u: "https://www.actu-environnement.com/ae/pdt/edpr-renewables-eolien-solaire-strategie-developpement-1020.php4" },
  p_ow: { t: "Introducing Ocean Winds, the new marine wind company (EDP, 20 Jul 2020)", u: "https://edp.com/en/media/news/introducing-ocean-winds-new-marine-wind-company-destined-become-global-leader" },
  p_ao5pre: { t: "Éolien en mer : dix candidats présélectionnés pour le parc flottant au sud de la Bretagne (Banque des Territoires, Sep 2021)", u: "https://www.banquedesterritoires.fr/eolien-en-mer-dix-candidats-pre-selectionnes-pour-le-futur-parc-flottant-au-sud-de-la-bretagne" },
  p_kronos: { t: "EDPR acquires 70% of Kronos Solar, a solar development platform with 2.7 GW in France (EDP, 29 Jul 2022)", u: "https://www.edp.com/sites/default/files/2022-07/20220729_Kronos%20Solar_EN.pdf" },
  p_kronos_close: { t: "EDPR completes the acquisition of 70% of Kronos Solar (EDP, 6 Oct 2022)", u: "https://www.edp.com/sites/default/files/document/2025-03/EDPR_Closing%2520Kronos.pdf" },
  p_ao78pre: { t: "France reveals potential developers of two offshore wind farms, AO7 and AO8 (offshoreWIND.biz, 27 Mar 2023)", u: "https://offshorewind.biz/2023/03/27/france-reveals-potential-developers-of-two-offshore-wind-farms" },
  p_emyn_fid: { t: "Parc éolien des îles d’Yeu et de Noirmoutier : décision finale d’investissement (Connaissance des Énergies, 6 Apr 2023)", u: "https://www.connaissancedesenergies.org/afp/parc-eolien-des-iles-dyeu-et-de-noirmoutier-decision-finale-dinvestissement-construction-en-vue-230406" },
  p_dlt_fid: { t: "ENGIE reaches final investment decision for its Dieppe Le Tréport offshore wind farm, with Ocean Winds (Engie, 27 Apr 2023)", u: "https://en.newsroom.engie.com/news/engie-reaches-final-investment-decision-for-its-dieppe-le-treport-offshore-wind-farm-2818-314df.html" },
  p_cre23: { t: "EDPR remporte deux projets éoliens lors de l’appel d’offres en France (energynews.pro, 19 Jul 2023)", u: "https://energynews.pro/edpr-remporte-deux-projets-eoliens-lors-de-lappel-doffres-en-france" },
  p_decathlon: { t: "Bird & Bird conseille EDP dans son partenariat avec Decathlon pour solariser ses sites dans 6 pays d’Europe (Le Monde du Droit, 10 Apr 2024)", u: "https://www.lemondedudroit.fr/deals/92293-bird-bird-conseille-edp-partenariat-decathlon-pour-solariser-ses-sites-dans-6-pays-d-europe.html" },
  p_ao5win: { t: "Réaction au lauréat de l’AO5 Bretagne Sud (Région Bretagne, 15 May 2024)", u: "https://bretagne.bzh/app/uploads/167-CP-reaction-laureat-A05-Bretage-sud.pdf" },
  p_bess: { t: "EDPR signs a new partnership in the storage sector in France (EDP, 24 Jun 2024)", u: "https://edp.com/en/media/news/edpr-signs-new-partnership-storage-sector-france" },
  p_venoy: { t: "EDP sélectionné par une grande entreprise technologique basée aux États-Unis (EDP France, 26 Jun 2024)", u: "https://edp.com/fr/europe/france/media/news/edp-selectionne-par-une-grande-entreprise-technologique-basee-aux-etats" },
  p_ao6: { t: "ENGIE, through Ocean Winds, awarded the EFLO floating offshore wind project (Engie, 27 Dec 2024)", u: "https://en.newsroom.engie.com/assets/pr-engieao6-vdef-14h05-pdf-c944a-314df.html?dl=1" },
  p_snop: { t: "Snop chooses EDP to decarbonise its factories in Europe with decentralised solar (EDP, 6 Feb 2025)", u: "https://edp.com/en/media/news/snop-chooses-edp-decarbonise-factories-europe-decentralised-solar-energy" },
  p_ao8report: { t: "Rapport d’instruction de l’appel d’offres AO8 Centre Manche 2 (CRE, 24 Jun 2025)", u: "https://www.cre.fr/fileadmin/Documents/Appels_d_offres/2025/250624_2025-165_Instruction_AO8_rapport.pdf" },
  p_amundi: { t: "EDP completes asset rotation deal of 121 MW wind in France and Belgium (EDP, 10 Sep 2025)", u: "https://edp.com/en/investors/investor-information/market-notifications/edp-completes-asset-rotation-deal-121-mw-wind" },
  p_oleron: { t: "Éolien : pas de candidat pour un projet au large de l’île d’Oléron (L’info durable, 24 Sep 2025)", u: "https://www.linfodurable.fr/eolien-pas-de-candidat-pour-un-projet-au-large-de-lile-doleron-52966" },
  p_cm2win: { t: "TotalEnergies, associé à RWE, remporte l’appel d’offres Centre Manche 2 (TotalEnergies, 24 Sep 2025)", u: "https://totalenergies.com/fr/node/27366" },
  p_20yrs: { t: "EDP renforce la souveraineté énergétique de la France grâce à 20 ans d’engagement dans les énergies renouvelables (EDP via PR Newswire, 13 Feb 2026)", u: "https://www.prnewswire.com/fr/communiques-de-presse/edp-renforce-la-souverainete-energetique-de-la-france-grace-a-20-ans-dengagement-dans-les-energies-renouvelables-302687542.html" },
  p_opdata25: { t: "EDP Renováveis operating data 2025, incl. French additions (via MarketScreener, Jan 2026)", u: "https://www.marketscreener.com/news/edp-renov-veis-s-a-operating-data-preview-2025-document-pdf-183-24-kb-ce7e58d3dd88ff23" },
  p_emyn_full: { t: "Éoliennes en mer : le parc de Yeu-Noirmoutier entre en service à 100 % (Connaissance des Énergies, 29 Apr 2026)", u: "https://www.connaissancedesenergies.org/afp/eoliennes-en-mer-le-parc-de-yeu-noirmoutier-entre-en-service-100-260429" },
  p_choose: { t: "EDP unveils €1.3 billion growth ambition in France at Choose France (EDP, 1 Jun 2026)", u: "https://edp.com/en/media/edp-unveils-eur13-billion-growth-ambition-france-choose-france" },
  p_ess: { t: "EDP plans €1.3 billion investment in French renewables, storage (ESS News, 4 Jun 2026)", u: "https://www.ess-news.com/2026/06/04/edp-plans-e1-3-billion-investment-in-french-renewables-storage/" },
  p_figaro: { t: "Éolien en mer : ENGIE franchit un cap avec ses premiers grands projets français, Ocean Winds (Figaro Nautisme, 18 Jun 2026)", u: "https://figaronautisme.meteoconsult.fr/actus-nautisme-flash/2026-06-18/89540-eolien-en-mer-engie-franchit-un-cap-avec-ses-premiers-grands-projets-francais" },
  p_efgl: { t: "Leucate : le parc éolien flottant EFGL tourne à pleine puissance (info.fr, Jul 2026)", u: "https://info.fr/leucate-parc-eolien-flottant-efgl-pleine-puissance/" },
  p_edp_fr: { t: "EDP en France, country page (EDP, viewed Oct 2026)", u: "https://edp.com/fr/europe/france" },
  p_cre_solar: { t: "EDPR secures CfD for 30 MWp of solar in French tender (Renewables Now, undated)", u: "https://renewablesnow.com/news/edpr-secures-cfd-for-30-mwp-of-solar-in-french-tender-836365/" },
  p_ao10: { t: "Éolien en mer : les appels d’offres sont lancés, AO10 with AO9 folded in (Le Journal des Entreprises, Jun 2026)", u: "https://www.lejournaldesentreprises.com/article/eolien-en-mer-les-appels-doffres-sont-lances-2144794" }
};

const PARTIES = [
  { id: "state", name: "French State & CRE", type: "Ministry in charge of energy and the energy regulator (CRE)" },
  { id: "engie", name: "Engie", type: "Utility; EDPR’s 50/50 partner in Ocean Winds", company: "eng" },
  { id: "edf", name: "EDF Renouvelables", type: "Renewables arm of EDF" },
  { id: "totalenergies", name: "TotalEnergies", type: "Energy major; winner of Centre Manche 2", company: "te" },
  { id: "eon", name: "E.ON", type: "German utility" },
  { id: "oceanwinds", name: "Ocean Winds", type: "Offshore wind joint venture of Engie and EDPR" },
  { id: "sumitomo", name: "Sumitomo Corporation", type: "Japanese trading group, offshore wind co-investor" },
  { id: "bdt", name: "Banque des Territoires", type: "Caisse des Dépôts’ investment arm" },
  { id: "elicio", name: "Elicio", type: "Belgian wind developer" },
  { id: "baywa", name: "BayWa r.e.", type: "German renewables developer" },
  { id: "rwe", name: "RWE", type: "German utility" },
  { id: "jpm", name: "J.P. Morgan Asset Management clients", type: "Institutional investors advised by J.P. Morgan Asset Management" },
  { id: "rpglobal", name: "RP Global", type: "Renewables developer" },
  { id: "axpo_power", name: "Axpo Group (Axpo Power, CKW)", type: "Swiss utility group" },
  { id: "kronos", name: "Kronos Solar", type: "German solar developer with a large French pipeline" },
  { id: "decathlon", name: "Decathlon", type: "Sports retailer" },
  { id: "ustech", name: "Large US tech company", type: "Buyer not named by EDP" },
  { id: "snop", name: "Snop", type: "Automotive parts maker" },
  { id: "amundi", name: "Amundi Transition Énergétique", type: "Energy transition funds of the asset manager Amundi" }
];

const MOVES = [
  { id: "m_rotation19", techs: ["wind_on"], cat: "deals", date: "2019-04-23", dp: "day", short: "Sells out of 388 MW of French wind", mw: 388,
    title: "Sells its stakes in a 997 MW European wind portfolio, 388 MW of it in France", tech: "Onshore wind",
    figs: "EDPR’s net share 491 MW · ~€800m · €1.6bn implied for 100% · France 388 MW, Spain 348, Portugal 191, Belgium 71",
    text: "The buyers are institutional investors advised by J.P. Morgan Asset Management. EDPR held 51% of most of the farms and exits them fully.",
    parties: [["jpm", "Buyer"]], src: ["p_rotation19"] },
  { id: "m_dunkirk", techs: ["wind_off"], cat: "tenders", date: "2019-06-14", dp: "day", lost: "Lost", short: "Loses Dunkirk offshore (AO3)", mw: 600,
    title: "Loses the Dunkirk offshore wind tender (AO3), bid with Engie and E.ON", tech: "Offshore wind (fixed)",
    figs: "One of at least six bids, March 2019 · winner EDF at €44/MWh",
    text: "The partnership with Engie became Ocean Winds a year later.",
    parties: [["engie", "Partner in the bid"], ["eon", "Partner in the bid"], ["edf", "Winner, with innogy and Enbridge"], ["state", "Awarding authority"]],
    src: ["p_dunkirk_bids", "p_dunkirk_win", "p_dunkirk_price"] },
  { id: "m_rpglobal", techs: ["wind_on"], cat: "deals", date: "2019-09-18", dp: "day", short: "Nine wind projects from RP Global", mw: 142,
    title: "Reaches an agreement with RP Global on nine wind projects in development", tech: "Onshore wind",
    figs: "142 MW in development · Hauts-de-France, Nouvelle-Aquitaine, Normandy and a first project in Lorraine",
    text: "EDPR then had 410 MW installed in France and nearly 1 GW in development. Terms were not disclosed.",
    parties: [["rpglobal", "Developer of the projects"]], src: ["p_rpglobal"] },
  { id: "m_axpo", techs: ["wind_on"], cat: "deals", date: "2019-10-07", dp: "day", short: "Sells 49% of 100 MW to Axpo", mw: 100,
    title: "Sells 49% of 100 MW of French wind farms to Axpo", tech: "Onshore wind",
    figs: "49% plus shareholder loans · €126m implied for 100% · farms on feed-in tariffs",
    text: "Part of EDPR’s asset rotation programme, which sells stakes in operating farms to fund new ones.",
    parties: [["axpo_power", "Buyer (Axpo Power and CKW)"]], src: ["p_axpo"] },
  { id: "s_2020", techs: ["wind_on", "solar"], cat: "strategy", date: "2020-02-03", dp: "day", short: "Adds solar to its French plans",
    title: "Sets up a solar team and plans growth beyond wind in France", tech: "Onshore wind, solar",
    figs: "~440 MW of wind in 40+ parks · 49.5 MW Côte du Cerisat due H1 2020 · French staff doubled since 2017 to 70+",
    text: "From a sponsored article by EDPR. The group then aimed to build 7 GW by 2022, about a quarter of it solar.",
    parties: [], src: ["p_strat20"] },
  { id: "m_ow", techs: ["wind_off"], cat: "partners", date: "2020-07-20", dp: "day", short: "Launches Ocean Winds with Engie",
    title: "Launches Ocean Winds, a 50/50 offshore wind joint venture with Engie", tech: "Offshore wind",
    figs: "Agreed May 2019, signed Jan 2020 · 1.5 GW under construction, 4 GW in development · French projects: Dieppe-Le Tréport and Yeu-Noirmoutier (992 MW) and the Leucate pilot (30 MW)",
    text: "Ocean Winds is the only offshore wind vehicle of both groups.",
    parties: [["engie", "Joint venture partner"], ["oceanwinds", "Joint venture created"]], src: ["p_ow_agree", "p_ow"] },
  { id: "m_kronos", techs: ["solar"], cat: "deals", date: "2022-07-29", dp: "day", short: "Buys 70% of Kronos Solar", mw: 2700,
    title: "Buys 70% of Kronos Solar, with 2.7 GW of solar projects in France", tech: "Solar",
    figs: "70% · €250m at closing plus a success fee to 2028 · 2.7 GW French pipeline · closed October 2022",
    text: "Kronos Solar is a German solar developer; its founders keep 30%. EDPR started building its first French solar plant with it in 2023.",
    parties: [["kronos", "Acquired, 70%"]], src: ["p_kronos", "p_kronos_close", "p_cre23"] },
  { id: "m_emyn_fid", techs: ["wind_off"], cat: "tenders", date: "2023-04-06", dp: "day", short: "Go-ahead: Yeu-Noirmoutier offshore", mw: 500,
    title: "Takes the final investment decision on the Yeu-Noirmoutier offshore wind farm", tech: "Offshore wind (fixed)",
    figs: "~500 MW · ~€2.5bn · through Ocean Winds",
    text: "Won in 2014. Held by Ocean Winds with Sumitomo, Banque des Territoires and Vendée Energie.",
    parties: [["oceanwinds", "Developer and operator"], ["sumitomo", "Shareholder"], ["bdt", "Shareholder"]], src: ["p_emyn_fid"] },
  { id: "m_dlt_fid", techs: ["wind_off"], cat: "tenders", date: "2023-04-27", dp: "day", short: "Go-ahead: Dieppe-Le Tréport offshore", mw: 496,
    title: "Takes the final investment decision on the Dieppe-Le Tréport offshore wind farm", tech: "Offshore wind (fixed)",
    figs: "~500 MW · 62 turbines · ~€2.7bn · commissioning due in the second half of 2026",
    text: "Held by Ocean Winds with Sumitomo and Banque des Territoires.",
    parties: [["oceanwinds", "Developer and operator"], ["sumitomo", "Shareholder"], ["bdt", "Shareholder"]], src: ["p_dlt_fid"] },
  { id: "m_cre23", techs: ["wind_on"], cat: "tenders", date: "2023-07-19", dp: "day", short: "Wins two wind projects in CRE tender", mw: 33,
    title: "Wins two wind projects in a CRE onshore wind tender", tech: "Onshore wind",
    figs: "Sceaux 29.4 MW (Seine-Maritime) · Les Grands Bails 3.45 MW (Aisne) · 20-year contracts for difference",
    text: "EDPR then operated more than 700 MW in France, more than 200 MW of it owned outright, and had started building its first French solar plant.",
    parties: [["state", "Awarding authority"]], src: ["p_cre23"] },
  { id: "m_decathlon", techs: ["solar"], cat: "contracts", date: "2024-04-10", dp: "day", short: "On-site solar for Decathlon",
    title: "Signs to put solar on Decathlon sites, France included", tech: "Rooftop and car-park solar",
    figs: "Up to 80 solar plants · 21+ MWc across six countries · contracts signed in France and Germany first",
    text: "Supports Decathlon’s goal of 100% renewable power for its stores by 2026.",
    parties: [["decathlon", "Customer"]], src: ["p_decathlon"] },
  { id: "m_ao5", techs: ["wind_off"], cat: "tenders", date: "2024-05-15", dp: "day", lost: "Not selected", short: "Not selected: Bretagne Sud floating (AO5)", mw: 250,
    title: "Not selected for the Bretagne Sud floating wind tender (AO5)", tech: "Floating offshore wind",
    figs: "Ocean Winds pre-selected in September 2021 among 10 candidates · winner Elicio and BayWa r.e.",
    text: "The sources confirm only the pre-selection; whether Ocean Winds filed a final bid is not public.",
    parties: [["oceanwinds", "Pre-selected candidate"], ["elicio", "Winner, with BayWa r.e."], ["baywa", "Winner, with Elicio"], ["state", "Awarding authority"]],
    src: ["p_ao5pre", "p_ao5win"] },
  { id: "m_bess", techs: ["storage"], cat: "partners", date: "2024-06-24", dp: "day", short: "Co-develops a 50 MW battery", mw: 50,
    title: "Partners to co-develop a 50 MW standalone battery in France", tech: "Battery storage",
    figs: "50 MW · connected to the transmission grid · partner and site not disclosed",
    text: "EDPR’s storage forecast of about 500 MW for 2026 covers the whole group.",
    parties: [], src: ["p_bess"] },
  { id: "m_venoy", techs: ["solar"], cat: "contracts", date: "2024-06-26", dp: "day", short: "Solar PPA with a US tech company", mw: 19,
    title: "Signs a solar PPA with a large US tech company that includes the Venoy plant", tech: "Solar",
    figs: "Venoy 19 MWp (15 MWac) · up to 20 years from 2025 · part of a deal covering Germany, France and Italy",
    text: "EDP did not name the buyer.",
    parties: [["ustech", "Buyer"]], src: ["p_venoy"] },
  { id: "m_ao6", techs: ["wind_off"], cat: "tenders", date: "2024-12-27", dp: "day", short: "Wins EFLO floating offshore (AO6)", mw: 250,
    title: "Wins the EFLO floating wind farm off Narbonne in the Mediterranean tender (AO6)", tech: "Floating offshore wind",
    figs: "250 MW floating · through Ocean Winds",
    text: "TotalEnergies’ consortium was not selected in the same tender, and EDF won the other site.",
    parties: [["oceanwinds", "Winner"], ["state", "Awarding authority"]], src: ["p_ao6"] },
  { id: "m_snop", techs: ["solar"], cat: "contracts", date: "2025-02-06", dp: "day", short: "On-site solar for Snop",
    title: "Signs to put solar on Snop’s factories, including Étupes in France", tech: "Rooftop solar",
    figs: "~5 MWp across France, Spain and Germany, up to 10 MWp · EDP funds, builds and runs the plants",
    text: "Offered as a service: EDP pays for and runs the plants, and the savings are shared.",
    parties: [["snop", "Customer"]], src: ["p_snop"] },
  { id: "m_amundi", techs: ["wind_on"], cat: "deals", date: "2025-09-10", dp: "day", short: "Sells 111 MW of French wind to Amundi", mw: 111,
    title: "Sells 11 operating French wind farms to Amundi", tech: "Onshore wind",
    figs: "111 MW in France plus 11 MW in Belgium · 100% · enterprise value about €0.2bn",
    text: "The buyers are funds managed by Amundi Transition Énergétique.",
    parties: [["amundi", "Buyer"]], src: ["p_amundi"] },
  { id: "m_ao8", techs: ["wind_off"], cat: "tenders", date: "2025-09-24", dp: "day", lost: "No bid", short: "No bid: Centre Manche 2 (AO8)", mw: 1500,
    title: "Does not bid for Centre Manche 2 (AO8) after pre-selection", tech: "Offshore wind (fixed)",
    figs: "Ocean Winds pre-selected in March 2023 · only two bids filed, April 2025 · winner TotalEnergies with RWE",
    text: "The CRE’s report lists bids from TotalEnergies and RWE companies only.",
    parties: [["oceanwinds", "Pre-selected candidate"], ["totalenergies", "Winner"], ["rwe", "Bidder, TotalEnergies’ partner"], ["state", "Awarding authority"]],
    src: ["p_ao78pre", "p_ao8report", "p_cm2win"] },
  { id: "m_ao7", techs: ["wind_off"], cat: "tenders", date: "2025-09-24", dp: "day", lost: "No bid", short: "No bid: Oléron (AO7)", mw: 1000,
    title: "Does not bid for Oléron (AO7), which drew no bids at all", tech: "Offshore wind (fixed)",
    figs: "Ocean Winds pre-selected in March 2023 among nine candidates · tender declared unsuccessful",
    text: "EDF and TotalEnergies, also pre-selected, did not bid either.",
    parties: [["oceanwinds", "Pre-selected candidate"], ["state", "Awarding authority"]], src: ["p_ao78pre", "p_oleron"] },
  { id: "m_2025", techs: ["solar", "wind_on"], cat: "tenders", date: "2026-02-13", dp: "day", short: "2025: five solar parks and Sceaux wind",
    title: "Reports five solar parks and the 29.4 MW Sceaux wind farm commissioned in 2025", tech: "Solar, onshore wind",
    figs: "Incl. an agrivoltaic park in Bourgogne-Franche-Comté · solar additions incl. Menestreau 12 MW and Monts 17 MW · 700+ MW at 68 plants in France",
    text: "From EDP’s review of 20 years in France.",
    parties: [], src: ["p_20yrs", "p_opdata25"] },
  { id: "m_emyn", techs: ["wind_off"], cat: "tenders", date: "2026-04-29", dp: "day", short: "Yeu-Noirmoutier fully in service", mw: 500,
    title: "Completes the Yeu-Noirmoutier offshore wind farm", tech: "Offshore wind (fixed)",
    figs: "500 MW · 61 turbines · first power June 2025 · through Ocean Winds",
    text: "AFP counts it as France’s fourth offshore wind farm, after Saint-Nazaire, Fécamp and Saint-Brieuc.",
    parties: [["oceanwinds", "Operator"], ["sumitomo", "Shareholder"], ["bdt", "Shareholder"]], src: ["p_emyn_full"] },
  { id: "s_choose", techs: [], cat: "strategy", date: "2026-06-01", dp: "day", short: "Plans €1.3bn in France by 2030",
    title: "Plans €1.3bn of investment in France by 2030", tech: "All renewables",
    figs: "1 GW+ of onshore and offshore wind, solar and storage projects · 800+ MW of wind and solar developed so far · ~12 TWh generated since 2006",
    text: "Announced at the Choose France summit, for EDP Renewables France and Ocean Winds.",
    parties: [], src: ["p_choose", "p_ess"] },
  { id: "m_efgl", techs: ["wind_off"], cat: "tenders", date: "2026-07-10", dp: "day", short: "EFGL floating pilot at full power", mw: 30,
    title: "Brings the EFGL floating wind pilot off Leucate to full power", tech: "Floating offshore wind",
    figs: "30 MW · three 10 MW turbines · about 16 km off Port-La-Nouvelle · through Ocean Winds",
    text: "The first floating turbine was installed in August 2025.",
    parties: [["oceanwinds", "Developer and operator"], ["bdt", "Partner"]], src: ["p_figaro", "p_efgl", "p_edp_fr"] }
];

const BASELINE = {
  title: "EDP in France",
  figs: "700+ MW of wind and solar at 68 plants (Feb 2026) · 530 MW offshore in operation through Ocean Winds (Jul 2026) · a 50 MW battery in co-development",
  text: "EDP Renewables (EDPR) has been in France for about 20 years, first in onshore wind and since 2023 in solar. It sells stakes in operating farms to investors to fund new ones, so it operates more than it owns. Offshore wind sits in Ocean Winds, a 50/50 joint venture with Engie.",
  src: ["p_20yrs", "p_cre23", "p_ow", "p_efgl"]
};

// Capacity in France, one record per published figure (see data/companies.js and the README for the fields).
// EDPR's figures switch from installed (2019–2020) to operated (2023 on), which includes farms it has partly or fully sold.
// Offshore figures are gross and are the same farms as in Engie's data.
const CAPACITY = [
  { date: "2019-09-18", mw: { wind_on: 410 }, note: "410 MW installed in France, all onshore wind", src: ["p_rpglobal"] },
  { date: "2020-02-03", mw: { wind_on: 440 }, q: "~", note: "About 440 MW of wind in 40+ parks, per a sponsored EDPR article", src: ["p_strat20"] },
  { date: "2023-07-19", mw: { wind_on: 700 }, q: "+", derived: true, note: "More than 700 MW operated, of which 200+ MW owned outright; counted as wind because EDPR’s first French solar plant was then under construction", src: ["p_cre23"] },
  { date: "2026-02-13", total: 700, covers: ["wind_on", "solar"], q: "+", note: "More than 700 MW of wind and solar operated, 68 plants", src: ["p_20yrs"] },
  { date: "2026-04-29", mw: { wind_off: 500 }, basis: "gross", note: "Yeu-Noirmoutier fully in service, at 100%; held through Ocean Winds, so it is also on Engie’s line", src: ["p_emyn_full"] },
  { date: "2026-07-10", mw: { wind_off: 530 }, basis: "gross", derived: true, note: "Yeu-Noirmoutier 500 MW + the EFGL floating pilot 30 MW, through Ocean Winds", src: ["p_emyn_full", "p_efgl"] }
];
const TARGETS = [];

const WORTH = [
  ["oceanwinds", "EDPR’s 50/50 offshore venture with Engie"],
  ["kronos", "German developer bought for its 2.7 GW of French solar projects"],
  ["amundi", "Bought 11 operating EDPR wind farms in 2025"],
  ["eon", "Bid for Dunkirk with EDPR and Engie in 2019"]
];

const FINDINGS = [
  { h: "Builds, then sells down",
    p: "EDPR funds new projects by selling stakes in operating farms. In France it sold out of 388 MW of wind in April 2019, sold 49% of another 100 MW to Axpo that October, and sold 11 farms (111 MW) to Amundi in 2025. In 2023 it operated more than 700 MW but owned only a little over 200 MW outright.",
    ev: ["m_rotation19", "m_axpo", "m_amundi", "m_cre23"] },
  { h: "Offshore through Ocean Winds, shared with Engie",
    p: "EDPR lost Dunkirk in 2019 bidding with Engie and E.ON, then put its offshore business into Ocean Winds with Engie. Yeu-Noirmoutier was fully in service in April 2026 and the EFGL floating pilot reached full power in July; Dieppe-Le Tréport is under construction and Ocean Winds won the EFLO floating site in 2024. It did not bid for Oléron or Centre Manche 2.",
    ev: ["m_dunkirk", "m_ow", "m_emyn", "m_efgl", "m_dlt_fid", "m_ao6", "m_ao8"] },
  { h: "Late into solar, then quickly",
    p: "Until 2023 EDPR France was a wind business. Buying 70% of Kronos Solar in 2022 brought a 2.7 GW French solar pipeline; its first French solar plant went into construction in 2023, and five solar parks, one of them agrivoltaic, came online in 2025. It also signs on-site solar for companies such as Decathlon and Snop.",
    ev: ["m_kronos", "m_2025", "m_venoy", "m_decathlon", "m_snop"] },
  { h: "A €1.3bn plan for France",
    p: "At the June 2026 Choose France summit EDP announced €1.3bn of investment in France by 2030 for more than 1 GW of onshore and offshore wind, solar and storage projects. A 50 MW battery is in co-development.",
    ev: ["s_choose", "m_bess"] }
];

const GAPS = [
  { h: "Not found", items: [
      ["A consistent French capacity series: EDPR reports installed capacity for 2019–2020 (410–440 MW) and operated capacity from 2023 (700+ MW, including farms it has partly or fully sold), and its results group France with other countries. The chart line therefore overstates growth.", ["p_rpglobal", "p_cre23", "p_opdata25"]],
      ["EDPR’s CRE solar tender wins: one award of about 30 MWp was reported, but we could not date it.", ["p_cre_solar"]],
      ["The buyer in the Venoy PPA and the partner and site of the 50 MW battery.", ["p_venoy", "p_bess"]]
  ] },
  { h: "Watch", items: [
      ["Dieppe-Le Tréport (about 500 MW), due online in the second half of 2026.", ["p_dlt_fid"]],
      ["AO10 offshore tender (award expected Feb 2027): whether Ocean Winds bids after skipping Oléron and Centre Manche 2.", ["p_ao10"]],
      ["How much of Kronos Solar’s 2.7 GW French pipeline is built.", ["p_kronos"]]
  ] },
  { h: "Left out of scope", items: [
      ["EDP’s networks, supply and projects outside France, including the Belgian farms in the 2019 and 2025 sales.", ["p_rotation19", "p_amundi"]],
      ["The 2014 sale of 49% of 270 MW of French wind to an EFG Hermes fund, before the period covered.", []]
  ] }
];

window.COMPANY_DATA = window.COMPANY_DATA || {};
window.COMPANY_DATA.edp = { S, PARTIES, MOVES, BASELINE, CAPACITY, TARGETS, FINDINGS, GAPS, WORTH };
})();
