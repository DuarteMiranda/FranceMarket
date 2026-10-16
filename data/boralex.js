// Boralex in French renewables, Oct 2016 – Oct 2026.
// Registers window.COMPANY_DATA.bx. Edit the lists below; run `node tools/check-data.js` after changes.
(function () {
const S = {
  bx_ar21: { t: "Boralex 2021 annual report (Boralex, Feb 2022)", u: "https://ca.boralex.com/sites/default/files/2024-11/investors-2021-annual-report.pdf" },
  bx_ar22: { t: "Boralex 2022 annual report (Boralex, Feb 2023)", u: "https://ca.boralex.com/sites/default/files/2024-11/investors-2022-annual-report.pdf" },
  bx_ar23: { t: "Boralex rapport annuel 2023 (Boralex, Feb 2024)", u: "https://ca.boralex.com/sites/default/files/2024-10/rapport_annuel_2023_fr.pdf" },
  bx_ar24: { t: "Boralex rapport annuel 2024 (Boralex, Feb 2025)", u: "https://ca.boralex.com/sites/default/files/2025-02/rapport-annuel-2024.pdf" },
  pvb_2015: { t: "Boralex announces closing of French wind power portfolio acquisition totalling approximately 350 MW (PR Newswire, 28 Dec 2015)", u: "https://prnewswire.com/news-releases/boralex-announces-closing-of-french-wind-power-portfolio-acquisition-totalling-approximately-350-mw-563649301.html" },
  bx_kallista: { t: "Boralex agrees to acquire Kallista from Ardian in France (Power Technology, 23 Apr 2018)", u: "https://www.power-technology.com/news/boralex-agrees-acquire-kallista-ardian-france/" },
  rn_kallista: { t: "Canada’s Boralex closes 331MW wind portfolio deal in France (Recharge)", u: "https://www.rechargenews.com/wind/1516851/canadas-boralex-closes-331mw-wind-portfolio-deal-in-france" },
  cde_dunk_bids: { t: "Éolien en mer : au moins 6 offres déposées pour le parc de Dunkerque (Connaissance des Énergies, 15 Mar 2019)", u: "https://www.connaissancedesenergies.org/afp/eolien-en-mer-au-moins-6-offres-deposees-pour-le-projet-de-parc-de-dunkerque-190315" },
  cde_bx_withdraw: { t: "Éolien en mer : le groupe canadien Boralex se retire de l’appel d’offres pour le projet de Dunkerque (Connaissance des Énergies, 18 Mar 2019)", u: "https://www.connaissancedesenergies.org/afp/eolien-en-mer-le-groupe-canadien-boralex-se-retire-de-lappel-doffres-pour-le-projet-de-dunkerque-190318" },
  owb_dunkirk: { t: "Dunkirk strike price is EUR 44/MWh (offshoreWIND.biz, 20 Jun 2019)", u: "https://www.offshorewind.biz/2019/06/20/dunkirk-strike-price-is-eur-44-mwh/" },
  bx_arce: { t: "Storage: Vallée de l’Arce (Boralex)", u: "https://us.boralex.com/en/projects-and-sites/storage-stockage-de-larce" },
  eg_orange: { t: "Orange and Boralex ink PPA in France (Energy Global, Jul 2020)", u: "https://www.energyglobal.com/wind/17072020/orange-and-boralex-ink-ppa-in-france/amp/" },
  en_1gw: { t: "Boralex dépasse le seuil des 1 GW en France (energynews.pro, 10 Dec 2020)", u: "https://energynews.pro/boralex-depasse-le-seuil-des-1-gw-en-france" },
  nw_ibm: { t: "Boralex signs a new renewable power purchase agreement to benefit IBM France (Newswire, 29 Apr 2021)", u: "https://www.newswire.ca/news-releases/boralex-signs-a-new-renewable-power-purchase-agreement-to-benefit-ibm-france-830945702.html" },
  ei_sunagri: { t: "Boralex, Sun’Agri join forces to develop agrivoltaics in Europe (Energetica India, 15 Jun 2021)", u: "https://www.energetica-india.net/news/boralex-sunagri-join-forces-to-develop-agrivoltaics-in-europe" },
  nw_strat21: { t: "Boralex unveils updated strategic plan and corporate objectives for 2025 (Newswire, 17 Jun 2021)", u: "https://www.newswire.ca/news-releases/boralex-unveils-updated-strategic-plan-and-corporate-objectives-for-2025-895784599.html" },
  nw_metro: { t: "METRO France and Boralex sign 20-year power purchase agreement (Newswire, 30 Nov 2021)", u: "https://www.newswire.ca/news-releases/metro-france-and-boralex-sign-20-year-power-purchase-agreement-883016020.html" },
  bx_eip: { t: "Boralex announces agreement with Energy Infrastructure Partners to support its Strategic Plan in France (Boralex, 24 Feb 2022)", u: "https://ca.boralex.com/en/press-releases/boralex-announces-agreement-energy-infrastructure-partners-support-implementation" },
  bx_lohan: { t: "Mise en service du parc éolien des Moulins du Lohan (Boralex, 20 Feb 2023)", u: "https://www.boralex.com/sites/default/files/2024-10/c-blx-mes-lml-vf_fr.pdf" },
  bx_plouguin: { t: "Mise en service de l’unité de stockage de Plouguin (Boralex, 2 May 2023)", u: "https://www.boralex.com/sites/default/files/2024-10/c-blx-cp-stockage-plouguin-fr_vf.pdf" },
  bx_auchan23: { t: "Boralex et Auchan signent un nouveau contrat d’achat d’électricité (Boralex, 13 Nov 2023)", u: "https://www.boralex.com/sites/default/files/2024-10/c-blx-cppa-auchan-2023-vf.pdf" },
  amf_sg: { t: "Saint-Gobain et Boralex signent un contrat d’achat d’électricité renouvelable de 20 ans (AMF filing, 7 Nov 2024)", u: "https://echanges.dila.gouv.fr/OPENDATA/AMF/ECO/2024/11/FCECO076572_20241107.pdf" },
  bo_sg: { t: "Saint-Gobain et Boralex signent un contrat long terme d’achat d’électricité renouvelable en France (Boursorama, 7 Nov 2024)", u: "https://www.boursorama.com/bourse/actualites/saint-gobain-et-boralex-signent-un-contrat-long-terme-d-achat-d-electricite-renouvelable-en-france-18b48545db02867f565b7ff494117791" },
  bx_2030: { t: "Boralex 2030 Strategy (Boralex, 17 Jun 2025)", u: "https://ca.boralex.com/sites/default/files/2025-06/pr-blx-2030-strategy-en.pdf" },
  bx_q2_25: { t: "Boralex résultats financiers T2 2025 (Boralex, Aug 2025)", u: "https://fr.boralex.com/sites/default/files/2025-08/c-blx-resultats-financiers-t2-2025.pdf" },
  amrf: { t: "Boralex brochure for rural mayors, France figures and AMRF partnership (AMRF, Sep 2025)", u: "https://www.amrf.fr/wp-content/uploads/sites/644/2025/09/2025_09_Plaquette_Boralex_numerique.pdf" },
  bx_tender25: { t: "Boralex wins 125 MW in France’s wind tender (Boralex, 6 Nov 2025)", u: "https://ca.boralex.com/sites/default/files/2025-11/pr-blx-wind-tender-france-2025_en_vf_0.pdf" },
  bx_ar25: { t: "Boralex 2025 annual report (Boralex, Feb 2026)", u: "https://www.boralex.com/sites/default/files/2026-02/rapportannuel2025_en.pdf" },
  bx_brookfield: { t: "Boralex enters definitive agreement to be acquired by Brookfield alongside La Caisse (Boralex, 25 Mar 2026)", u: "https://www.boralex.com/en/press-releases/boralex-enters-definitive-agreement-be-acquired-brookfield-alongside-la-caisse" },
  en_approvals: { t: "Boralex reçoit toutes les approbations réglementaires pour l’opération avec Brookfield et la Caisse (energynews.pro, Aug 2026)", u: "https://energynews.pro/boralex-recoit-toutes-les-approbations-reglementaires-pour-loperation-avec-brookfield-et-la-caisse" },
  bx_close: { t: "Brookfield and La Caisse complete acquisition of Boralex (Boralex, 14 Aug 2026)", u: "https://www.boralex.com/en/press-releases/brookfield-and-la-caisse-complete-acquisition-boralex" },
  pvt_fin: { t: "Boralex secures US$1.65 billion to finance French renewables activities (PV Tech, 1 Jul 2026)", u: "https://www.pv-tech.org/boralex-secures-us1-65-billion-to-finance-french-renewables-activities/" },
  wiki_bx: { t: "Boralex (Wikipedia)", u: "https://en.wikipedia.org/wiki/Boralex" },
  jde_ao10: { t: "Éolien en mer : les appels d’offres sont lancés, AO10 with AO9 folded in (Le Journal des Entreprises, Jun 2026)", u: "https://www.lejournaldesentreprises.com/article/eolien-en-mer-les-appels-doffres-sont-lances-2144794" }
};

const PARTIES = [
  { id: "state", name: "French State & CRE", type: "Ministry in charge of energy and the energy regulator (CRE)" },
  { id: "rte", name: "RTE", type: "French transmission system operator" },
  { id: "kallista", name: "Kallista Energy", type: "Wind producer, sold by the investment firm Ardian" },
  { id: "consortium", name: "Eneco · Van Oord · DGE", type: "Dunkirk bid partners (DGE is part of Mitsubishi)" },
  { id: "edf", name: "EDF Renouvelables", type: "Renewables arm of EDF" },
  { id: "bretagne", name: "Région Bretagne", type: "Regional council of Brittany" },
  { id: "allymercoeur", name: "Ally-Mercoeur wind farm", type: "39 MW wind farm, Haute-Loire; being repowered to 101 MW", project: true },
  { id: "orange", name: "Orange", type: "Telecoms operator" },
  { id: "auchan", name: "Auchan", type: "Retailer" },
  { id: "ibm", name: "IBM France", type: "IT company" },
  { id: "axpo", name: "Axpo Solutions", type: "Energy trader and aggregator" },
  { id: "metro", name: "METRO France", type: "Food service wholesaler" },
  { id: "sg", name: "Saint-Gobain", type: "Building materials manufacturer" },
  { id: "eip", name: "Energy Infrastructure Partners", type: "Swiss infrastructure investor" },
  { id: "sunagri", name: "Sun’Agri", type: "Agrivoltaics specialist" },
  { id: "amrf", name: "AMRF", type: "Association of rural mayors of France" },
  { id: "brookfield", name: "Brookfield", type: "Asset manager, with Brookfield Renewable Partners" },
  { id: "caisse", name: "La Caisse", type: "Québec pension fund manager, formerly CDPQ" }
];

const MOVES = [
  { id: "m_kallista", techs: ["wind_on"], cat: "deals", date: "2018-04-23", dp: "day", short: "Buys Kallista Energy", mw: 331,
    title: "Acquires Kallista Energy from Ardian", tech: "Onshore wind",
    figs: "163 MW operating · 10 MW under construction · 158 MW pipeline · €129.4m plus €94m of project debt",
    text: "Took Boralex’s French capacity from 609 MW to 772 MW and made it the largest independent onshore wind producer in France.",
    parties: [["kallista", "Acquired, 100%"]], src: ["bx_kallista", "rn_kallista"] },
  { id: "m_dunkirk", techs: ["wind_off"], cat: "tenders", date: "2019-03-18", dp: "day", lost: "Withdrew", short: "Withdraws from Dunkirk offshore (AO3)", mw: 600,
    title: "Withdraws from its Dunkirk offshore wind bid (AO3)", tech: "Offshore wind (fixed)",
    figs: "About 600 MW site · bid filed with Eneco, Van Oord and DGE",
    text: "Boralex said its stake no longer met its investment criteria and planned to sell it to its partners once the winner was named. The site went to EDF Renouvelables, innogy and Enbridge in June 2019 at €44/MWh.",
    parties: [["consortium", "Consortium partners"], ["edf", "Winner, with innogy and Enbridge"], ["state", "Awarding authority"]],
    src: ["cde_dunk_bids", "cde_bx_withdraw", "owb_dunkirk"] },
  { id: "m_auchan20", techs: ["wind_on"], cat: "contracts", date: "2020-01-01", dp: "year", short: "First PPA with Auchan", mw: 16,
    title: "Signs its first PPA with Auchan", tech: "Onshore wind",
    figs: "Chépy (4 MW) and Nibas (12 MW) wind farms · extended in 2023 to December 2026",
    text: "Two wind farms commissioned in 2003–2004 supply Auchan stores and warehouses in northern France.",
    parties: [["auchan", "Buyer"]], src: ["bx_auchan23"] },
  { id: "m_arce", techs: ["storage"], cat: "tenders", date: "2020-03-01", dp: "month", short: "First French battery, Vallée de l’Arce", mw: 2,
    title: "Commissions its first French battery at Vallée de l’Arce", tech: "Battery storage",
    figs: "2 MW · 1.5 MWh · Aube",
    text: "Sits at the foot of the Vallée de l’Arce wind farm and sells frequency reserve services, Boralex’s first entry into that European market.",
    parties: [["rte", "Grid services (frequency reserve)"]], src: ["bx_arce"] },
  { id: "m_orange", techs: ["wind_on"], cat: "contracts", date: "2020-07-07", dp: "day", short: "5-year PPA with Orange", mw: 39,
    title: "Signs a 5-year PPA with Orange for the Ally-Mercoeur wind farm", tech: "Onshore wind",
    figs: "39 MW · about 67 GWh a year · 5 years from January 2021",
    text: "Orange buys all the output of the 26-turbine Ally-Mercoeur farm in Auvergne-Rhône-Alpes. The same farm is now being repowered after a 2025 tender win.",
    parties: [["orange", "Buyer"], ["allymercoeur", "Source of the power"]], src: ["eg_orange"] },
  { id: "m_1gw", techs: ["wind_on"], cat: "tenders", date: "2020-12-10", dp: "day", short: "Passes 1 GW; repowers Cham Longe", mw: 64,
    title: "Passes 1 GW in France, including the Cham Longe repowering", tech: "Onshore wind",
    figs: "64.4 MW across 3 farms · just over 1 GW operating in France",
    text: "Commissioned Blanches Fosses (Aisne), the Seuil de Bapaume extension (Somme) and the repowered Cham Longe (Ardèche), where 12 of 14 turbines were replaced.",
    parties: [], src: ["en_1gw"] },
  { id: "m_ibm", techs: ["wind_on"], cat: "contracts", date: "2021-04-29", dp: "day", short: "5-year wind PPA for IBM France",
    title: "Signs a 5-year wind PPA for IBM France", tech: "Onshore wind",
    figs: "55% of IBM’s French consumption · 5 years from January 2021",
    text: "Power comes from Boralex wind farms whose contracts with EDF are expiring, aggregated by Axpo.",
    parties: [["ibm", "Buyer"], ["axpo", "Aggregator"]], src: ["nw_ibm"] },
  { id: "m_sunagri", techs: ["solar"], cat: "partners", date: "2021-06-15", dp: "day", short: "Agrivoltaics deal with Sun’Agri",
    title: "Signs a 10-year exclusive agrivoltaics agreement with Sun’Agri", tech: "Agrivoltaics",
    figs: "10 years · exclusive across the EU · no volume announced",
    text: "Boralex brings energy project expertise and Sun’Agri the agronomy and its steerable solar louvres.",
    parties: [["sunagri", "Exclusive partner"]], src: ["ei_sunagri"] },
  { id: "s_plan21", techs: [], cat: "strategy", date: "2021-06-17", dp: "day", short: "Plan: double group capacity by 2025",
    title: "Plans to double group capacity by 2025", tech: "All technologies",
    figs: "Group: 2.2 GW (end-2020) to 4.4 GW by 2025, 10–12 GW by 2030",
    text: "Company-wide plan presented at its investor day. France-specific targets came with the EIP deal eight months later.",
    parties: [], src: ["nw_strat21"] },
  { id: "m_metro", techs: ["solar"], cat: "contracts", date: "2021-11-30", dp: "day", short: "20-year solar PPA with METRO", mw: 16,
    title: "Signs a 20-year solar PPA with METRO France", tech: "Solar",
    figs: "15.9 MWc Grange du Causse plant · about 23 GWh a year · 20 years from 2024",
    text: "A PPA that finances a new solar plant near Montpellier, which Boralex builds and operates.",
    parties: [["metro", "Buyer"]], src: ["nw_metro"] },
  { id: "m_eip", techs: [], cat: "deals", date: "2022-02-24", dp: "day", short: "Sells 30% of France to EIP", mw: 1100,
    title: "Sells 30% of its French business to Energy Infrastructure Partners", tech: "All technologies",
    figs: "30% · €1,718m equity value for 100% · 20.3× EBITDA · €532m cash · 1.1 GW operating, 1.5 GW pipeline",
    text: "EIP bought 30% of Boralex’s French operations and pipeline. Boralex keeps 70% and runs the business; the cash funds its French growth plan.",
    parties: [["eip", "Bought 30%"]], src: ["bx_eip"] },
  { id: "s_fr25", techs: [], cat: "strategy", date: "2022-02-24", dp: "day", short: "Goal: 1.8 GW in France by 2025",
    title: "Targets 1.8 GW in France by 2025 and up to 3 GW by 2030", tech: "All technologies",
    figs: "1.8 GW by 2025 · up to 3 GW by 2030 · 1.1 GW at the time",
    text: "Set out with the EIP deal. At the end of 2025 the French portfolio stood at 1,378 MW.",
    parties: [], src: ["bx_eip", "bx_ar25"] },
  { id: "m_lohan", techs: ["wind_on"], cat: "tenders", date: "2023-02-20", dp: "day", short: "Commissions 65 MW Moulins du Lohan", mw: 65,
    title: "Commissions the 65 MW Moulins du Lohan wind farm", tech: "Onshore wind",
    figs: "65 MW · 17 turbines · won in CRE period 7 (Nov 2020) · France reaches 1.2 GW",
    text: "In Morbihan, Brittany. With it Boralex passed 3 GW worldwide.",
    parties: [["state", "CRE tender"]], src: ["bx_lohan"] },
  { id: "m_plouguin", techs: ["storage"], cat: "tenders", date: "2023-05-02", dp: "day", short: "Second battery at Plouguin",
    title: "Commissions its second French battery at Plouguin", tech: "Battery storage",
    figs: "3.3+ MWh · Finistère, Brittany",
    text: "Selected in a 2019 call by the Brittany regional council and co-funded by EU regional funds. Sits on a wind farm Boralex is also renewing.",
    parties: [["bretagne", "Selected the project"]], src: ["bx_plouguin", "amrf"] },
  { id: "m_auchan23", techs: ["wind_on"], cat: "contracts", date: "2023-11-13", dp: "day", short: "20-year PPA with Auchan", mw: 29,
    title: "Signs a 20-year PPA with Auchan for the Moulin Blanc wind farm", tech: "Onshore wind",
    figs: "28.8 MW · about 60 GWh a year · 20 years · 2020 PPA extended to Dec 2026",
    text: "The contract finances a new 8-turbine farm in Hauts-de-France and lifts Auchan’s PPA supply to 29% of its needs.",
    parties: [["auchan", "Buyer"]], src: ["bx_auchan23"] },
  { id: "m_sg", techs: ["solar", "wind_on"], cat: "contracts", date: "2024-11-07", dp: "day", short: "20-year PPA with Saint-Gobain",
    title: "Signs a 20-year PPA with Saint-Gobain", tech: "Solar + onshore wind",
    figs: "About 110 GWh a year · 2 solar plants and 1 wind farm · plants online Q1 2026 to Q1 2027",
    text: "Covers about 10% of Saint-Gobain’s electricity use in France, from three new plants Boralex develops, builds and operates.",
    parties: [["sg", "Buyer"]], src: ["amf_sg", "bo_sg"] },
  { id: "m_q2_25", techs: ["wind_on"], cat: "tenders", date: "2025-05-15", dp: "month", short: "Commissions 29 MW in two farms", mw: 29,
    title: "Commissions Fontaine-lès-Boulans and Febvin-Palfart", tech: "Onshore wind",
    figs: "18 MW + 11 MW · Febvin-Palfart under a 15-year PPA",
    text: "The only French commissioning reported for 2025.",
    parties: [], src: ["bx_q2_25", "bx_ar25"] },
  { id: "s_2030", techs: [], cat: "strategy", date: "2025-06-17", dp: "day", short: "2030 plan: €950m in France",
    title: "Sets its 2030 Strategy, with about €950m for France", tech: "All technologies",
    figs: "Group: double capacity every five years · about €950m to invest in France by 2030 · no France MW target",
    text: "France is described as a market where Boralex leads and sees potential to get more from existing plants.",
    parties: [], src: ["bx_2030", "bx_tender25"] },
  { id: "m_solar_sale", techs: ["solar"], cat: "deals", date: "2025-07-01", dp: "year", short: "Sells part of French solar pipeline",
    title: "Sells part of its French solar development portfolio", tech: "Solar",
    figs: "Size, buyer and price not disclosed",
    text: "The 2025 annual report says it was sold to reallocate capital.",
    parties: [], src: ["bx_ar25"] },
  { id: "s_ppa1twh", techs: [], cat: "strategy", date: "2025-09-01", dp: "month", short: "Goal: 1 TWh a year under PPAs",
    title: "Aims to sell 1 TWh a year under PPAs in France by 2030", tech: "All technologies",
    figs: "1 TWh a year by 2030 · close to 300 GWh a year today",
    text: "From Boralex’s 2025 brochure for French rural mayors.",
    parties: [], src: ["amrf"] },
  { id: "m_amrf", techs: [], cat: "partners", date: "2025-09-01", dp: "by", short: "Partnership with rural mayors (AMRF)",
    title: "Partners with the French rural mayors’ association", tech: "All technologies",
    figs: "No volume announced",
    text: "Aimed at supporting rural towns’ energy transition projects. The start date of the partnership is not given.",
    parties: [["amrf", "Partner"]], src: ["amrf"] },
  { id: "m_tender25", techs: ["wind_on"], cat: "tenders", date: "2025-11-06", dp: "day", short: "Tops PPE2 wind round, 125 MW", mw: 125,
    title: "Ranks first in a national onshore wind tender with 125 MW", tech: "Onshore wind",
    figs: "125 MW · 2 projects · 13% of volume · incl. 101 MW Ally-Mercoeur repowering and extension",
    text: "Tenth round of the PPE2 onshore wind tender. Ally-Mercoeur is the farm whose output went to Orange from 2021; the other project is Ouest-Château-Thierry (23 MW, Aisne).",
    parties: [["state", "CRE tender"], ["allymercoeur", "Repowering and extension, 101 MW"]], src: ["bx_tender25", "bx_ar25"] },
  { id: "m_brookfield", techs: [], cat: "deals", date: "2026-03-25", dp: "day", short: "Taken private by Brookfield & La Caisse",
    title: "Agrees to be taken private by Brookfield and La Caisse", tech: "All technologies",
    figs: "C$37.25 a share · enterprise value about C$9.0bn · closed 14 Aug 2026",
    text: "A parent-level deal: Brookfield takes about 70% and La Caisse about 30%. Boralex keeps its Québec headquarters and runs independently; the owners plan to speed up development and start an asset recycling programme.",
    parties: [["brookfield", "Buyer, about 70%"], ["caisse", "Existing shareholder, rising to about 30%"]], src: ["bx_brookfield", "en_approvals", "bx_close"] },
  { id: "m_refi", techs: [], cat: "deals", date: "2026-07-01", dp: "day", short: "€1.45bn refinancing in France",
    title: "Refinances its French platform with €1.45bn of debt", tech: "All technologies",
    figs: "€1.45bn · 10 banks · incl. €811m term loan and a 22-year €450m facility for new projects",
    text: "Raised together with EIP, which owns 30% of the French business. Boralex called it one of the largest renewable platform financings in Europe that year.",
    parties: [["eip", "Co-owner of the French business"]], src: ["pvt_fin"] }
];

const BASELINE = {
  title: "Boralex in France",
  figs: "1,378 MW at end-2025: 1,314 MW wind, 59 MW solar, 5 MW storage · 85 sites · 310+ staff",
  text: "France is Boralex’s largest market outside Canada, and Boralex describes itself as the largest independent onshore wind producer there. Since 2022 the French business is 70% Boralex and 30% EIP; since August 2026 Boralex itself is owned by Brookfield and La Caisse.",
  src: ["bx_ar25", "amrf", "pvt_fin", "bx_close"]
};

// Capacity in France, one record per published figure.
//   mw: { tech: MW }     figures the source gives for each technology
//   total + covers       an undivided total; covers = the technologies it includes
//   q: "+" more than, "~" about · basis: "gross" or "net" when the source says
//   derived: true        computed by us from published figures; note says how
// TARGETS use the same covers field; gw is the goal (gwLow when stated as a range).
// Boralex counts 100% of its subsidiaries, so figures include EIP's 30% share from 2022.
const BX_COVERS = ["wind_on", "solar"];
const CAPACITY = [
  { date: "2015-12-28", total: 500, covers: BX_COVERS, q: "~", note: "About 500 MW operating in France (before the period covered)", src: ["pvb_2015"] },
  { date: "2018-04-23", total: 772, covers: BX_COVERS, note: "772 MW after Kallista (609 MW before)", src: ["bx_kallista"] },
  { date: "2020-12-10", total: 1000, covers: BX_COVERS, q: "+", note: "Just over 1 GW operating", src: ["en_1gw"] },
  { date: "2021-12-31", mw: { wind_on: 1047, solar: 34, storage: 2 }, note: "1,081 MW at 71 sites; the 2 MW battery is outside Boralex’s own total", src: ["bx_ar21"] },
  { date: "2022-02-24", total: 1100, covers: BX_COVERS, note: "1.1 GW operating, at the EIP deal", src: ["bx_eip"] },
  { date: "2022-12-31", mw: { wind_on: 1152, solar: 46, storage: 2 }, note: "1,198 MW at 73 sites, battery excluded", src: ["bx_ar22"] },
  { date: "2023-12-31", mw: { wind_on: 1208, solar: 46, storage: 5 }, note: "1,259 MW at 79 sites, now including batteries", src: ["bx_ar23"] },
  { date: "2024-12-31", mw: { wind_on: 1279, solar: 59, storage: 5 }, note: "1,343 MW at 83 sites", src: ["bx_ar24"] },
  { date: "2025-12-31", mw: { wind_on: 1314, solar: 59, storage: 5 }, note: "1,378 MW at 85 sites", src: ["bx_ar25"] }
];
const TARGETS = [
  { date: "2025-12-31", gw: 1.8, covers: ["wind_on", "solar", "storage"], label: "1.8 GW by 2025", sub: "goal set Feb 2022", src: ["bx_eip"] },
  { date: "2030-12-31", gw: 3, covers: ["wind_on", "solar", "storage"], label: "Up to 3 GW by 2030", sub: "goal set Feb 2022, not repeated", src: ["bx_eip"] }
];

const WORTH = [
  ["allymercoeur", "Sold to Orange, then won a repowering tender"],
  ["eip", "30% owner of the French business since 2022"],
  ["auchan", "Two PPAs, in 2020 and 2023"],
  ["edf", "Won Dunkirk after Boralex pulled out"]
];

const FINDINGS = [
  { h: "One acquisition, then organic growth",
    p: "Buying Kallista in April 2018 took Boralex from 609 MW to 772 MW in France and made it the largest independent onshore wind producer. We found no later French acquisition; growth since came from its own projects, passing 1 GW in December 2020, 1.2 GW in February 2023 and 1,378 MW at the end of 2025.",
    ev: ["m_kallista", "m_1gw", "m_lohan", "m_q2_25"] },
  { h: "Missed its French target by about 0.4 GW",
    p: "When it sold 30% to EIP in February 2022, Boralex set a goal of 1.8 GW in France by 2025 and up to 3 GW by 2030. It reached 1,378 MW. The 2025 plan gives no French capacity target, only about €950m of investment and a goal of 1 TWh a year sold under PPAs by 2030.",
    ev: ["s_fr25", "s_2030", "s_ppa1twh"] },
  { h: "Outside capital at every level",
    p: "EIP bought 30% of the French business in 2022 for €532m in cash. In 2026 the French platform refinanced €1.45bn with EIP, and the whole group was taken private by Brookfield and La Caisse, whose plans include an asset recycling programme.",
    ev: ["m_eip", "m_refi", "m_brookfield"] },
  { h: "Onshore wind specialist",
    p: "Wind is 95% of its French capacity. It pulled out of the Dunkirk offshore bid in 2019 and we found no later offshore bid. Storage stays at two small pilots, and part of the French solar pipeline was sold in 2025.",
    ev: ["m_dunkirk", "m_arce", "m_plouguin", "m_solar_sale"] },
  { h: "Old wind farms, new customers",
    p: "Boralex sells the output of existing wind farms to companies: Auchan in 2020, Orange from 2021 and IBM in 2021, the last from farms whose EDF contracts were expiring. Newer PPAs with METRO, Auchan and Saint-Gobain run 20 years and pay for new plants. Ally-Mercoeur, sold to Orange in 2020, won a repowering slot in 2025 to grow from 39 MW to 101 MW.",
    ev: ["m_orange", "m_ibm", "m_auchan23", "m_sg", "m_tender25"] }
];

const GAPS = [
  { h: "Not found", items: [
      ["Most CRE onshore tender results from 2017 to 2024: the CRE lists projects without owners and Boralex announced few individually.", ["bx_tender25"]],
      ["Size, buyer and price of the French solar pipeline sold in 2025.", ["bx_ar25"]],
      ["Any French move between October 2016 and April 2018.", []],
      ["When the AMRF partnership started.", ["amrf"]]
  ] },
  { h: "Watch", items: [
      ["Brookfield and La Caisse’s asset recycling programme, and whether it includes stakes in French plants.", ["bx_brookfield"]],
      ["The three Saint-Gobain PPA plants, due online between Q1 2026 and Q1 2027, and the 101 MW Ally-Mercoeur repowering.", ["amf_sg", "bx_tender25"]],
      ["AO10 offshore tender (award expected Feb 2027): Boralex has not bid offshore since 2019.", ["jde_ao10"]]
  ] },
  { h: "Left out of scope", items: [
      ["The 350 MW French wind portfolio bought in December 2015, before the period covered; it is the 2015 point on the capacity chart.", ["pvb_2015"]],
      ["Acquisitions and projects in the UK, Canada and the US.", ["bx_ar25"]],
      ["Patrick Decostre, who built the French business, became group CEO in 2020.", ["wiki_bx"]]
  ] }
];

window.COMPANY_DATA = window.COMPANY_DATA || {};
window.COMPANY_DATA.bx = { S, PARTIES, MOVES, BASELINE, CAPACITY, TARGETS, FINDINGS, GAPS, WORTH };
})();
