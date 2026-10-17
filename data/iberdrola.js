// Iberdrola in French renewables, Oct 2016 – Oct 2026.
// Source keys are prefixed "i_" so they never collide with the other companies' keys.
// Registers window.COMPANY_DATA.ib. Edit the lists below; run `node tools/check-data.js` after changes.
(function () {
const S = {
  i_fr_page: { t: "Iberdrola in France: 496 MW installed, data as of June 2026 (Iberdrola)", u: "https://www.iberdrola.com/about-us/iberdrola-france" },
  i_sale12: { t: "EDF : Iberdrola vend ses parcs éoliens terrestres français (Tradingsat, 31 Dec 2012)", u: "https://www.tradingsat.com/edf-FR0010242511/actualites/edf-iberdrola-vend-ses-parcs-eoliens-terrestres-francais-423401.html" },
  i_dk_prequal: { t: "Dunkerque : les cartes d’identité des 10 préqualifiés pour le futur parc éolien en mer (Énergies de la Mer, 17 May 2017)", u: "https://www.energiesdelamer.eu/2017/05/17/dunkerque-les-cartes-d-identite-des-10-prequalifies-pour-le-futur-parc-eolien-en-mer/" },
  i_dk_bids: { t: "Éolien en mer : au moins 6 offres déposées pour le parc de Dunkerque (Connaissance des Énergies, 15 Mar 2019)", u: "https://www.connaissancedesenergies.org/afp/eolien-en-mer-au-moins-6-offres-deposees-pour-le-projet-de-parc-de-dunkerque-190315" },
  i_dk_price: { t: "Dunkirk strike price is EUR 44/MWh (offshoreWIND.biz, 20 Jun 2019)", u: "https://www.offshorewind.biz/2019/06/20/dunkirk-strike-price-is-eur-44-mwh/" },
  i_ao6pre: { t: "Parcs éoliens en mer Méditerranée : sélection de 13 candidats (Figaro Nautisme, 2 Aug 2022)", u: "https://figaronautisme.meteoconsult.fr/actus-nautisme-flash/2022-08-02/64167-parcs-eoliens-en-mer-mediterranee-selection-de-13-candidats-pour-participer-a-la-2e-phase-de-la-procedure" },
  i_tariff18: { t: "France reduces feed-in tariffs for 6 offshore wind projects (Offshore Wind, 20 Jun 2018)", u: "https://www.offshorewind.biz/2018/06/20/france-reduces-feed-in-tariffs-for-6-offshore-wind-projects" },
  i_tariff18b: { t: "Feed-in tariffs in place for six French offshore wind farms (Offshore Wind, 15 Nov 2018)", u: "https://www.offshorewind.biz/2018/11/15/feed-in-tariffs-in-place-for-six-french-offshore-wind-farms" },
  i_cust19: { t: "Iberdrola hopes to reach a million customers in France by 2023 with 100% renewable energy (Iberdrola, 24 Oct 2019)", u: "https://iberdrola.com/press-room/news/detail/iberdrola-hopes-reach-million-customers-france-2023-with-100-renewable-energy" },
  i_ailes: { t: "Iberdrola increases its offshore wind ambition in France, acquiring 100% of Ailes Marines (Iberdrola, 9 Mar 2020)", u: "https://iberdrola.com/press-room/news/detail/iberdrola-increases-offshore-wind-ambition-france-acquiring-100-capital-ailes-marines" },
  i_aalto_ann: { t: "Iberdrola acquires French renewables company Aalto Power for €100 million (Iberdrola, 7 May 2020)", u: "https://iberdrola.com/press-room/news/detail/iberdrola-acquires-french-renewables-company-aalto-power-million-euros" },
  i_aalto_close: { t: "Iberdrola seals the purchase of French renewables company Aalto Power for €100m (Iberdrola, 1 Jul 2020)", u: "https://iberdrola.com/press-room/news/detail/iberdrola-seals-purchase-french-renewables-company-aalto-power-100m" },
  i_jackets: { t: "Iberdrola and Navantia-Windar sign Saint-Brieuc contract (Offshore Wind, 18 Jun 2020)", u: "https://offshorewind.biz/2020/06/18/iberdrola-and-navantia-windar-sign-saint-brieuc-contract" },
  i_prequal21: { t: "Iberdrola, precalificada para la próxima subasta de capacidad eólica marina de Francia (Iberdrola, 26 Apr 2021)", u: "https://www.iberdrola.com/sala-comunicacion/noticias/detalle/iberdrola-precalificada-para-proxima-subasta-capacidad-eolica-marina-francia" },
  i_ao4pre: { t: "France shortlists 6 bidders for the 1 GW Cotentin offshore wind project (Enerdata, 28 Apr 2021)", u: "https://www.enerdata.net/publications/daily-energy-news/france-shortlists-6-bidders-1-gw-cotentin-offshore-wind-project.html" },
  i_build: { t: "Construction begins on Saint-Brieuc offshore wind farm (Energy Global, 21 Apr 2021)", u: "https://www.energyglobal.com/wind/21042021/" },
  i_ao5pre: { t: "Bretagne Sud : 10 candidats pré-sélectionnés pour le dialogue concurrentiel de l’AO5 (Énergies de la Mer, 16 Sep 2021)", u: "https://www.energiesdelamer.eu/2021/09/16/bretagne-sud-10-candidats-pre-selectionnes-pour-le-dialogue-concurrentiel-de-lao5/" },
  i_retail22: { t: "Iberdrola propone a miles de sus clientes en Francia que se desabonen (Valencia Plaza, 20 Aug 2022)", u: "https://valenciaplaza.com/valenciaplaza/iberdrola-propone-a-miles-de-sus-clientes-en-francia-que-se-desabonen" },
  i_ao7pre: { t: "Présélection des candidats AO7 Oléron, rapport de synthèse (CRE, 16 Feb 2023)", u: "https://CRE.fr/fileadmin/Documents/Appels_d_offres/import/230216_2023-62_Preselection_AO7_Oleron-rapport.pdf" },
  i_ao8pre: { t: "Présélection des candidats AO8 Centre Manche 2, rapport de synthèse (CRE, 16 Feb 2023)", u: "https://CRE.fr/fileadmin/Documents/Appels_d_offres/import/230216_2023-63_Preselection_AO8_Normandie_rapport.pdf" },
  i_ao4cre: { t: "Délibération n°2023-77 sur l’instruction de l’AO4, five bids (CRE, 9 Mar 2023)", u: "https://www.cre.fr/fileadmin/Documents/Actualites/import/230309_2023-77_instruction_ao4.pdf" },
  i_ao4win: { t: "EDF and Maple Power awarded 1 GW offshore wind project in Normandy (Enerdata, 28 Mar 2023)", u: "https://www.enerdata.net/publications/daily-energy-news/edf-and-maple-power-awarded-1-gw-offshore-wind-project-normandy-france.html" },
  i_ekwateur: { t: "Energy developments in France: Iberdrola sells its customer base to Ekwateur (Energynews, 7 Aug 2023)", u: "https://energynews.pro/en/energy-developments-in-france-iberdrola-sells-its-customer-base-to-ekwater" },
  i_commission: { t: "Iberdrola met en service le deuxième parc éolien en mer français et le premier en Bretagne (Iberdrola, 28 May 2024)", u: "https://www.iberdrola.com/documents/20125/4255736/Iberdrola+met+en+service+le+deuxieme+parc+eolien+en+mer+francais+et+le+premier+en+Bretagne.pdf" },
  i_commission_ow: { t: "496 MW Saint-Brieuc offshore wind farm fully commissioned (Offshore Wind, 28 May 2024)", u: "https://offshorewind.biz/2024/05/28/496-mw-saint-brieuc-offshore-wind-farm-fully-commissioned" },
  i_ao9: { t: "Iberdrola, among 12 bidders shortlisted by French government to develop offshore wind farms (The Corner, 25 Nov 2024)", u: "https://thecorner.eu/?p=117742" },
  i_agrati: { t: "Iberdrola and Agrati advance in decarbonizing industrial production in France (Iberdrola, 28 Jan 2025)", u: "https://iberdrola.com/press-room/news/detail/iberdrola-and-agrati-advance-in-decarbonizing-industrial-production-in-france" },
  i_om: { t: "Iberdrola inaugurates the operation and maintenance base of the Saint-Brieuc offshore wind farm (Iberdrola, 1 Feb 2025)", u: "https://iberdrola.com/press-room/news/detail/iberdrola-inaugurates-operation-maintenance-base-saint-brieuc-offshore-wind-farm-france" },
  i_ao8rep: { t: "Rapport d’instruction AO8: two bids filed (CRE, 24 Jun 2025)", u: "https://www.cre.fr/fileadmin/Documents/Appels_d_offres/2025/250624_2025-165_Instruction_AO8_rapport.pdf" },
  i_floating: { t: "Iberdrola : des doutes sur le flottant… à court terme (Énergies de la Mer, 29 Jun 2025)", u: "https://www.energiesdelamer.eu/2025/06/29/iberdrola-des-doutes-sur-le-flottant-a-court-terme/" },
  i_oleron: { t: "Éolien : pas de candidat pour un projet au large de l’île d’Oléron (L’info durable, 24 Sep 2025)", u: "https://www.linfodurable.fr/eolien-pas-de-candidat-pour-un-projet-au-large-de-lile-doleron-52966" },
  i_greenunivers: { t: "L’éolien en mer ne fait plus recette (GreenUnivers, Oct 2025)", u: "https://www.greenunivers.com/2025/10/leolien-en-mer-ne-fait-plus-recette-dossier-403698/" },
  i_ts_sale: { t: "Iberdrola vende una cartera de renovables en Francia a Technique Solaire (Estrategias de Inversión, 21 Nov 2025)", u: "https://www.estrategiasdeinversion.com/actualidad/noticias/bolsa-espana/iberdrola-vende-una-cartera-de-renovables-en-francia-n-866299" },
  i_ts_pv: { t: "Technique Solaire buys Iberdrola’s French renewables unit (pv magazine, Nov 2025)", u: "https://www.pv-magazine.com/?p=324759" },
  i_ts_price: { t: "Technique Solaire acquires 11 onshore wind farms from Iberdrola for approximately €100 million (The Corner, 2025)", u: "https://thecorner.eu/?p=123078" },
  i_ts_close: { t: "Iberdrola France sells onshore wind and solar portfolio to Technique Solaire (Windtech International, 24 Feb 2026)", u: "https://www.windtech-international.com/projects-and-contracts/iberdrola-france-sells-onshore-wind-and-solar-portfolio-to-technique-solaire" },
  i_ts_close2: { t: "Iberdrola France completes the sale of its onshore renewable portfolio (Energy Global, 2 Mar 2026)", u: "https://www.energyglobal.com/wind/02032026/iberdrola-france-completes-the-sale-of-its-onshore-renewable-portfolio/" },
  i_ao10: { t: "Bidding period closes for 10 GW French offshore wind tender (Offshore Wind, 15 Oct 2026)", u: "https://offshorewind.biz/2026/10/15/bidding-period-closes-for-10-gw-french-offshore-wind-tender" }
};

const PARTIES = [
  { id: "state", name: "French State & CRE", type: "Ministry in charge of energy and the energy regulator (CRE)" },
  { id: "bdt", name: "Banque des Territoires", type: "Caisse des Dépôts’ investment arm" },
  { id: "res", name: "RES", type: "Renewable energy developer; Iberdrola’s partner in Saint-Brieuc" },
  { id: "aiolos", name: "Aiolos", type: "Majority owner of Aalto Power before 2020" },
  { id: "navantia", name: "Navantia-Windar", type: "Spanish consortium building offshore foundations" },
  { id: "ekwateur", name: "Ekwateur", type: "French energy supplier" },
  { id: "agrati", name: "Agrati", type: "Italian maker of automotive fasteners, three plants in France" },
  { id: "technique", name: "Technique Solaire", type: "French renewable energy producer" },
  { id: "elicio", name: "Elicio", type: "Belgian offshore wind developer" },
  { id: "rwe", name: "RWE", type: "German utility" },
  { id: "edf", name: "EDF Renouvelables", type: "Renewables arm of EDF" },
  { id: "totalenergies", name: "TotalEnergies", type: "Energy major; winner of Centre Manche 2", company: "te" },
  { id: "oceanwinds", name: "Ocean Winds", type: "Engie and EDPR’s offshore joint venture" }
];

const MOVES = [
  { id: "m_tariff18", techs: ["wind_off"], cat: "tenders", date: "2018-06-20", dp: "day", short: "Saint-Brieuc tariff cut by the State",
    title: "Accepts a lower feed-in tariff for Saint-Brieuc in the State’s renegotiation", tech: "Offshore wind (fixed)",
    figs: "Six offshore projects from the 2011–2013 rounds · tariffs cut from about €200 to about €150/MWh · about €15bn less subsidy in total",
    text: "Saint-Brieuc, won by an Iberdrola-led consortium in 2012, was one of the six. Tariffs were set by November 2018; the sources give no project-by-project figure.",
    parties: [["state", "Renegotiated the tariffs"]], src: ["i_tariff18", "i_tariff18b"] },
  { id: "m_dunkirk", techs: ["wind_off"], cat: "tenders", date: "2019-06-14", dp: "month", lost: "Not won", short: "Not won: Dunkirk (AO3)", mw: 600,
    title: "Does not win Dunkirk (AO3), after pre-qualifying with RES", tech: "Offshore wind (fixed)",
    figs: "About 600 MW · pre-qualified with RES, May 2017 · not among the six bids reported in March 2019 · winning price €44/MWh",
    text: "EDF, innogy and Enbridge won. The sources do not say whether Iberdrola bid.",
    parties: [["res", "Partner at pre-qualification"], ["edf", "Winner, with innogy and Enbridge"], ["state", "Awarding authority"]], src: ["i_dk_prequal", "i_dk_bids", "i_dk_price"] },
  { id: "s_customers", techs: [], cat: "strategy", date: "2019-10-24", dp: "day", short: "Goal: 1 million customers by 2023",
    title: "Sets a goal of one million household customers in France by 2023", tech: "Retail supply (100% renewable offers)",
    figs: "About 100,000 customers in October 2019 · aim of 10% of the household market",
    text: "Iberdrola sold electricity in France as a 100% renewable supplier alongside its Saint-Brieuc project, then 70% owned.",
    parties: [], src: ["i_cust19"] },
  { id: "m_ailes", techs: ["wind_off"], cat: "deals", date: "2020-03-09", dp: "day", short: "Takes 100% of Saint-Brieuc", mw: 496,
    title: "Buys the remaining 30% of Ailes Marines, the Saint-Brieuc project company", tech: "Offshore wind (fixed)",
    figs: "496 MW · 62 Siemens Gamesa 8 MW turbines · about €2.4bn · construction from 2021, full operation planned for 2023",
    text: "Avel Vor, owned by RES and the Caisse des Dépôts, sold its 30%. Iberdrola said it was also looking at onshore wind in France.",
    parties: [["res", "Seller, through Avel Vor"], ["bdt", "Seller, through Avel Vor (Caisse des Dépôts)"]], src: ["i_ailes"] },
  { id: "m_jackets", techs: ["wind_off"], cat: "tenders", date: "2020-06-18", dp: "day", short: "€350m foundation order for Saint-Brieuc",
    title: "Orders Saint-Brieuc’s 62 jacket foundations from Navantia-Windar", tech: "Offshore wind (fixed)",
    figs: "€350m · 62 jackets with pin piles · built in Fene and Avilés, Spain",
    text: "Navantia-Windar also built foundations for Iberdrola’s East Anglia One and Wikinger farms.",
    parties: [["navantia", "Supplier"]], src: ["i_jackets", "i_commission_ow"] },
  { id: "m_aalto", techs: ["wind_on"], cat: "deals", date: "2020-07-01", dp: "day", short: "Buys Aalto Power, €100m", mw: 118,
    title: "Buys the French onshore developer Aalto Power", tech: "Onshore wind",
    figs: "€100m · 118 MW at 11 operating wind farms · 636 MW of onshore wind projects · agreed May 2020",
    text: "Aalto Power, based in Marseille, was 50.1% owned by Aiolos and 49.9% by the Caisse des Dépôts. Iberdrola had sold its earlier French onshore business, 321 MW, in 2012.",
    parties: [["aiolos", "Seller, 50.1%"], ["bdt", "Seller, 49.9% (Caisse des Dépôts)"]], src: ["i_aalto_ann", "i_aalto_close", "i_sale12"] },
  { id: "s_4bn", techs: [], cat: "strategy", date: "2021-04-26", dp: "day", short: "Plans €4bn in France to 2025",
    title: "Plans to invest €4bn in France by 2025, mostly in renewables", tech: "All renewables",
    figs: "400,000 customers, aiming for one million supply points in 2023 · orders of nearly €1bn a year from French firms",
    text: "Stated when Iberdrola was pre-qualified for the Centre Manche 1 offshore tender.",
    parties: [], src: ["i_prequal21"] },
  { id: "m_build", techs: ["wind_off"], cat: "tenders", date: "2021-05-03", dp: "day", short: "Starts building Saint-Brieuc",
    title: "Starts offshore construction of the Saint-Brieuc wind farm", tech: "Offshore wind (fixed)",
    figs: "Foundation installation from early May 2021 · 496 MW",
    text: "Nine years after Ailes Marines won the site in the 2012 tender.",
    parties: [], src: ["i_build", "i_prequal21", "i_commission"] },
  { id: "s_retail22", techs: [], cat: "strategy", date: "2022-08-20", dp: "day", short: "Asks household customers to leave",
    title: "Asks thousands of household customers not to renew their contracts", tech: "Retail supply",
    figs: "Letters to a few thousand customers whose contracts were ending · pointed them to the regulated tariff",
    text: "Iberdrola cited extremely high and volatile prices and said at the time it was not leaving the French retail market.",
    parties: [], src: ["i_retail22"] },
  { id: "m_ekwateur", techs: [], cat: "deals", date: "2023-08-07", dp: "day", short: "Sells household customers to Ekwateur",
    title: "Sells its household gas and electricity customers to Ekwateur", tech: "Retail supply",
    figs: "Whole household portfolio · transfer in November 2023 · price not disclosed",
    text: "Iberdrola kept business and industrial customers. It had about 500,000 customers the summer before.",
    parties: [["ekwateur", "Buyer"]], src: ["i_ekwateur"] },
  { id: "m_ao4", techs: ["wind_off"], cat: "tenders", date: "2023-03-27", dp: "day", lost: "Not won", short: "Not won: Centre Manche 1 (AO4)", mw: 1000,
    title: "Does not win Centre Manche 1 (AO4), after being shortlisted alone", tech: "Offshore wind (fixed)",
    figs: "About 1 GW off Normandy · one of six shortlisted, April 2021 · five bids filed, names other than the winner not published",
    text: "EDF and Maple Power won at under €45/MWh. The sources do not say whether Iberdrola filed one of the five bids.",
    parties: [["state", "Awarding authority"], ["edf", "Winner, with Maple Power"]], src: ["i_ao4pre", "i_ao4cre", "i_ao4win"] },
  { id: "m_commission", techs: ["wind_off"], cat: "tenders", date: "2024-05-28", dp: "day", short: "Saint-Brieuc fully online", mw: 496,
    title: "Brings all 62 turbines of Saint-Brieuc into operation", tech: "Offshore wind (fixed)",
    figs: "496 MW · 62 Siemens Gamesa SG 8.0-167 DD · €2.4bn, funded by Iberdrola · about 1,820 GWh a year · first power July 2023 · inaugurated September 2024",
    text: "Brittany’s first offshore wind farm and, by Iberdrola’s count, France’s second. More than 1,700 jobs in France, over 500 of them in Brittany.",
    parties: [], src: ["i_commission", "i_commission_ow", "i_fr_page"] },
  { id: "m_ao5", techs: ["wind_off"], cat: "tenders", date: "2024-05-15", dp: "day", lost: "No bid", short: "No bid: Bretagne Sud floating (AO5)", mw: 250,
    title: "Does not bid for the Bretagne Sud floating wind tender (AO5)", tech: "Floating offshore wind",
    figs: "250 MW site · pre-selected alone among ten candidates, September 2021 · winner named May 2024",
    text: "Iberdrola France later said it had chosen not to bid in French floating wind tenders. Elicio and BayWa r.e. won.",
    parties: [["state", "Awarding authority"], ["elicio", "Winner, with BayWa r.e."]], src: ["i_ao5pre", "i_floating"] },
  { id: "m_ao9", techs: ["wind_off"], cat: "tenders", date: "2024-11-25", dp: "month", short: "Pre-qualified for AO9",
    title: "Is pre-qualified for the AO9 offshore round, later merged into AO10", tech: "Offshore wind",
    figs: "Up to 2.9 GW at four sites · one of 12 pre-qualified · AO10 bids closed October 2026, award planned February 2027",
    text: "Bidder names for AO10 have not been published, so it is not known whether Iberdrola bid.",
    parties: [["state", "Awarding authority"]], src: ["i_ao9", "i_ao10"] },
  { id: "m_ao6", techs: ["wind_off"], cat: "tenders", date: "2024-12-27", dp: "day", lost: "No bid", short: "No bid: Mediterranean floating (AO6)", mw: 500,
    title: "Does not bid for the Mediterranean floating wind tender (AO6)", tech: "Floating offshore wind",
    figs: "Two floating sites of about 250 MW · pre-selected among 13 candidates, August 2022 · winners named December 2024",
    text: "Iberdrola France later said it had chosen not to bid in French floating tenders. EDF with Maple Power and Ocean Winds won the two sites.",
    parties: [["state", "Awarding authority"], ["edf", "Winner of one site, with Maple Power"], ["oceanwinds", "Winner of the other site"]], src: ["i_ao6pre", "i_floating"] },
  { id: "m_agrati", techs: ["wind_on"], cat: "contracts", date: "2025-01-28", dp: "day", short: "Wind PPA with Agrati", mw: 10,
    title: "Signs a PPA to supply Agrati’s French plants from the Florembeau wind farm", tech: "Onshore wind",
    figs: "10.25 MW, 5 turbines, Créquy (Pas-de-Calais) · 21 GWh a year from 2025 · 105 GWh in total",
    text: "Supplies Agrati’s plants in Fourmies, Vieux-Condé and Avressieux. The only French PPA we found for Iberdrola.",
    parties: [["agrati", "Buyer"]], src: ["i_agrati"] },
  { id: "m_om", techs: ["wind_off"], cat: "tenders", date: "2025-02-01", dp: "day", short: "Opens Saint-Brieuc O&M base",
    title: "Opens the Saint-Brieuc operation and maintenance base", tech: "Offshore wind (fixed)",
    figs: "Binic-Étables-sur-Mer · up to 80 staff · port works paid for by Iberdrola",
    text: "The centre controls and manages the farm’s output.",
    parties: [], src: ["i_om"] },
  { id: "s_floating", techs: ["wind_off"], cat: "strategy", date: "2025-06-27", dp: "day", short: "Too early for floating wind",
    title: "Says floating wind is too early and keeps to fixed-bottom offshore in France", tech: "Offshore wind",
    figs: "Expects the first commercial floating farms around 2034–2035 · has not bid in French floating tenders",
    text: "Iberdrola France’s head, Emmanuel Rollin, questioned the viability of the AO5 and AO6 floating projects. In October 2025 GreenUnivers listed Iberdrola among developers drifting away from the French market.",
    parties: [], src: ["i_floating", "i_greenunivers"] },
  { id: "m_ao7", techs: ["wind_off"], cat: "tenders", date: "2025-09-24", dp: "day", lost: "No bid", short: "No bid: Oléron (AO7)", mw: 1000,
    title: "Does not bid for the Oléron offshore wind tender (AO7)", tech: "Offshore wind (fixed)",
    figs: "About 1 GW site · pre-selected among nine candidates, February 2023 · no candidate filed",
    text: "The tender failed; Oléron was later folded into the AO10 round.",
    parties: [["state", "Awarding authority"]], src: ["i_ao7pre", "i_oleron"] },
  { id: "m_ao8", techs: ["wind_off"], cat: "tenders", date: "2025-09-24", dp: "day", lost: "No bid", short: "No bid: Centre Manche 2 (AO8)", mw: 1500,
    title: "Does not bid for Centre Manche 2 (AO8)", tech: "Offshore wind (fixed)",
    figs: "1.5 GW · pre-selected among seven candidates, February 2023 · only two bids filed, April 2025",
    text: "The site went to TotalEnergies with RWE. The CRE report names TotalEnergies’ and RWE’s companies as the bidders.",
    parties: [["state", "Awarding authority"], ["totalenergies", "Winner"], ["rwe", "Bidder, with TotalEnergies"]], src: ["i_ao8pre", "i_ao8rep"] },
  { id: "m_ts_sale", techs: ["wind_on", "solar"], cat: "deals", date: "2025-11-21", dp: "day", short: "Sells onshore unit to Technique Solaire", mw: 118,
    title: "Sells its whole French onshore business to Technique Solaire", tech: "Onshore wind, solar",
    figs: "118 MW at 11 wind farms · 639 MW of wind and solar projects · 24 staff · completed 24 Feb 2026 · about €100m according to market sources, not disclosed",
    text: "Iberdrola said it is focusing on regulated networks, generation with long-term contracts and key markets such as the US and the UK. Saint-Brieuc was left out of the sale.",
    parties: [["technique", "Buyer"]], src: ["i_ts_sale", "i_ts_pv", "i_ts_price", "i_ts_close", "i_ts_close2"] }
];

const BASELINE = {
  title: "Iberdrola in France",
  figs: "496 MW installed, all of it the Saint-Brieuc offshore wind farm (June 2026) · onshore business sold to Technique Solaire, February 2026",
  text: "Iberdrola has developed renewables in France since 2005. It sold its first onshore business, 32 wind farms and 321 MW, in 2012, kept the Saint-Brieuc offshore project won that year, bought back into onshore with Aalto Power in 2020 and sold that business again in 2025–26. Saint-Brieuc has run at full capacity since May 2024.",
  src: ["i_fr_page", "i_sale12", "i_aalto_close", "i_ts_close"]
};

// Installed capacity in France, one record per published figure.
const CAPACITY = [
  { date: "2020-07-01", mw: { wind_on: 118, wind_off: 0 }, note: "118 MW of onshore wind bought with Aalto Power; Saint-Brieuc not yet built", src: ["i_aalto_close"] },
  { date: "2024-05-28", mw: { wind_on: 118, wind_off: 496 }, note: "Saint-Brieuc fully online; 11 onshore wind farms (118 MW)", src: ["i_commission"] },
  { date: "2026-02-24", mw: { wind_on: 0, wind_off: 496 }, note: "Onshore business sold to Technique Solaire; 496 MW installed in June 2026, all offshore", src: ["i_ts_close", "i_fr_page"] }
];
const TARGETS = [];

const WORTH = [
  ["bdt", "Sold Iberdrola its stakes in Saint-Brieuc and Aalto Power"],
  ["technique", "Bought Iberdrola’s French onshore business"],
  ["navantia", "Built Saint-Brieuc’s 62 foundations"],
  ["state", "Ran every offshore round Iberdrola was pre-selected for"]
];

const FINDINGS = [
  { h: "One offshore farm is now the whole French business",
    p: "Iberdrola bought out its Saint-Brieuc partners in 2020, started building in 2021 and had all 62 turbines running in May 2024, at a cost of €2.4bn it funded itself. After the onshore sale, the 496 MW farm is all it operates in France.",
    ev: ["m_ailes", "m_build", "m_commission", "m_ts_sale"] },
  { h: "Into onshore and out again",
    p: "Iberdrola paid €100m for Aalto Power in 2020, with 118 MW running and 636 MW of projects. Operating capacity was still 118 MW in 2024, and in 2025 it sold the unit, with 639 MW of projects, to Technique Solaire, for about €100m according to market sources.",
    ev: ["m_aalto", "m_agrati", "m_ts_sale"] },
  { h: "Pre-selected seven times offshore, won nothing",
    p: "Iberdrola was pre-qualified for Dunkirk with RES in 2017, shortlisted for Centre Manche 1, pre-selected for Bretagne Sud, the Mediterranean floating sites, Oléron and Centre Manche 2, and pre-qualified for AO9. EDF won Dunkirk and Centre Manche 1; Iberdrola did not bid in the floating rounds, Oléron or Centre Manche 2, and in 2025 said floating wind was too early.",
    ev: ["m_dunkirk", "m_ao4", "m_ao5", "m_ao6", "m_ao7", "m_ao8", "m_ao9", "s_floating"] },
  { h: "A retail push, reversed",
    p: "In 2019 Iberdrola aimed for a million household customers in France by 2023. It had 400,000 in 2021, asked some to leave in 2022 when prices spiked, and sold all its household customers to Ekwateur in 2023.",
    ev: ["s_customers", "s_4bn", "s_retail22", "m_ekwateur"] }
];

const GAPS = [
  { h: "Not found", items: [
      ["Saint-Brieuc’s own tariff: the sources give only the average for the six renegotiated projects.", ["i_tariff18"]],
      ["Whether Iberdrola bid for Dunkirk, whether it filed one of the five Centre Manche 1 bids, and whether it bid in AO10.", ["i_dk_bids", "i_ao4cre", "i_ao10"]],
      ["The Technique Solaire price, beyond a market estimate, and any French PPA other than Agrati.", ["i_ts_price", "i_agrati"]]
  ] },
  { h: "Watch", items: [
      ["The AO10 award, planned for February 2027.", ["i_ao10"]],
      ["Saint-Brieuc’s output against the expected 1,820 GWh a year.", ["i_commission"]]
  ] },
  { h: "Left out of scope", items: [
      ["The 2012 sale of Iberdrola’s first French onshore business (321 MW) to GE, MEAG and EDF Energies Nouvelles, before the period covered.", ["i_sale12"]],
      ["Iberdrola’s supply to business and industrial customers in France.", ["i_ekwateur"]]
  ] }
];

window.COMPANY_DATA = window.COMPANY_DATA || {};
window.COMPANY_DATA.ib = { S, PARTIES, MOVES, BASELINE, CAPACITY, TARGETS, FINDINGS, GAPS, WORTH };
})();
