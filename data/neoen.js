// Neoen in French renewables, Oct 2016 – Oct 2026.
// Source keys are prefixed "n_" so they never collide with the other companies' keys.
// Neoen reports French capacity "in operation or under construction", not operating capacity alone.
// Registers window.COMPANY_DATA.neo. Edit the lists below; run `node tools/check-data.js` after changes.
(function () {
const S = {
  n_ipo: { t: "Neoen lance son introduction en bourse sur Euronext Paris (Neoen, 4 Oct 2018)", u: "https://neoen.com/app/uploads/2022/01/neoen-cp-ipo-vffr-final.pdf" },
  n_ipo_price: { t: "Neoen : introduction en bourse à 16,50 euros par action (Tradingsat, Oct 2018)", u: "https://www.tradingsat.com/neoen-FR0011675362/actualites/neoen-marche-introduction-en-bourse-a-1650-euros-par-action-830345.html" },
  n_urd19: { t: "Document d’enregistrement universel 2019, incl. French capacity at 31 Dec 2019 (Neoen, 2020)", u: "https://neoen.com/app/uploads/2021/12/1588608351-neoen-urd-2019-vfr.pdf" },
  n_aolt: { t: "Neoen remporte 13 MW à l’appel d’offres long terme de RTE pour le stockage (Neoen, 11 Mar 2020)", u: "https://neoen.com/app/uploads/2020/03/1588164007-20200311-neoen-cp-aolt-storage-france.pdf" },
  n_cre20: { t: "Neoen remporte 14 MW de projets solaires et éoliens en France (Euro-Énergie, 23 Oct 2020)", u: "https://www.euro-energie.com/neoen-remporte-14-mw-de-projets-solaires-et-eoliens-en-france-n-7981" },
  n_1gw: { t: "Neoen dépasse le gigawatt en France (Neoen via AMF, 10 Jun 2021)", u: "https://echanges.dila.gouv.fr/OPENDATA/AMF/ECO/2021/06/FCECO059306_20210610.pdf" },
  n_farmdown21: { t: "Neoen va céder deux projets éoliens en France (Neoen via AMF, 9 Dec 2021)", u: "https://echanges.dila.gouv.fr/OPENDATA/AMF/ECO/2021/12/FCECO061088_20211209.pdf" },
  n_urd21: { t: "Document d’enregistrement universel 2021, incl. French capacity (Neoen, Mar 2022)", u: "https://neoen.com/app/uploads/2022/03/Neoen_URD_2021_FR_Livre_BD.pdf" },
  n_q1_22: { t: "Neoen : chiffre d’affaires du premier trimestre 2022, incl. 92.5 MWc PPE2 win (Neoen via AMF, 3 May 2022)", u: "https://echanges.dila.gouv.fr/OPENDATA/AMF/ECO/2022/05/FCECO067147_20220503.pdf" },
  n_neutral22: { t: "Neoen remporte 180 MW au dernier appel d’offres technologiquement neutre de la CRE (Neoen via AMF, 12 Dec 2022)", u: "https://echanges.dila.gouv.fr/OPENDATA/AMF/ECO/2022/12/FCECO069472_20221212.pdf" },
  n_cre23: { t: "Neoen remporte 238,5 MWc de nouveaux projets solaires en France (Neoen via AMF, 28 Sep 2023)", u: "https://echanges.dila.gouv.fr/OPENDATA/AMF/ECO/2023/09/FCECO072501_20230928.pdf" },
  n_fy23: { t: "Neoen : résultats annuels 2023, incl. French tender wins and commissioning (Neoen via AMF, 28 Feb 2024)", u: "https://echanges.dila.gouv.fr/OPENDATA/AMF/ECO/2024/02/FCECO073911_20240228.pdf" },
  n_urd23: { t: "Document d’enregistrement universel 2023, incl. French capacity (Neoen, Mar 2024)", u: "https://neoen.com/app/uploads/2024/03/Document-dEnregistrement-Universel-2023-PDF-150dpi.pdf" },
  n_cre24: { t: "Neoen remporte 119 MWc de projets solaires au sol (Neoen via AMF, 7 Mar 2024)", u: "https://echanges.dila.gouv.fr/OPENDATA/AMF/ECO/2024/03/FCECO074000_20240307.pdf" },
  n_bf_deal: { t: "Brookfield enters into exclusive negotiations with Impala and other shareholders to acquire a majority stake in Neoen (Brookfield, 30 May 2024)", u: "https://bep.brookfield.com/bepc/brookfield-enters-exclusive-negotiations-impala-and-other-shareholders-acquire-majority-stake" },
  n_sncf: { t: "Neoen : contrat d’achat d’électricité verte avec la SNCF (Tradingsat, 10 Jun 2024)", u: "https://www.tradingsat.com/neoen-FR0011675362/actualites/neoen-neoen-contrat-d-achat-d-electricite-verte-avec-la-sncf-1116723.html" },
  n_cre24b: { t: "Neoen remporte 164 MWc de projets solaires en France (Neoen via AMF, 14 Nov 2024)", u: "https://echanges.dila.gouv.fr/OPENDATA/AMF/ECO/2024/11/FCECO076647_20241114.pdf" },
  n_bf_close: { t: "Brookfield wraps up majority stake acquisition in French Neoen (Renewables Now, Dec 2024)", u: "https://renewablesnow.com/news/brookfield-wraps-up-majority-stake-acquisition-in-french-neoen-1268656/" },
  n_fy24: { t: "Neoen : résultats annuels 2024, incl. France and the Brookfield offer (Neoen, 5 Mar 2025)", u: "https://neoen.com/app/uploads/2025/03/CP-Neoen-Resultats-estimes-non-audites-FY-2024-final.pdf" },
  n_bf_offer: { t: "Brookfield announces successful completion of the tender offer for Neoen, squeeze-out to follow (Brookfield via MFN, 19 Mar 2025)", u: "https://mfn.se/one/a/brookfield-asset-management-inc/brookfield-announces-successful-completion-of-the-tender-offer-for-neoen-with-mandatory-squeeze-out-to-follow-4caf3b13" },
  n_plenitude: { t: "Neoen cède à Plenitude un portefeuille français de 760 MW d’actifs en opération (Neoen, 18 Nov 2025)", u: "https://neoen.com/app/uploads/2025/11/2025-18-11_Neoen_FR-Asset-Divestment_CP_final.pdf" },
  n_plenitude_afp: { t: "Plenitude rachète à Neoen près d’une cinquantaine de parcs solaires et éoliens en France (Connaissance des Énergies, 18 Nov 2025)", u: "https://www.connaissancedesenergies.org/afp/plenitude-rachete-neoen-pres-dune-cinquantaine-de-parcs-solaires-et-eoliens-en-france-251118" },
  n_rte: { t: "Neoen and RTE sign a contract to trial grid-forming battery services at Breizh Big Battery (Neoen, 13 Jan 2026)", u: "https://neoen.com/app/uploads/2026/01/MR-Neoen_retrofit-RTE_13012026.pdf" },
  n_vernou: { t: "Neoen lance la batterie de Vernou-la-Celle-sur-Seine, 248 MW / 496 MWh (Neoen, 2 Apr 2026)", u: "https://neoen.com/app/uploads/2026/04/Neoen_FR_Vernou-NTP_CP.pdf" },
  n_vernou_cde: { t: "Une nouvelle plus grande batterie de France en projet (Connaissance des Énergies, Apr 2026)", u: "https://www.connaissancedesenergies.org/une-nouvelle-plus-grande-batterie-de-france-en-projet" }
};

const PARTIES = [
  { id: "state", name: "French State & CRE", type: "Ministry in charge of energy and the energy regulator (CRE)" },
  { id: "rte", name: "RTE", type: "French transmission system operator" },
  { id: "sncf", name: "SNCF", type: "National railway (SNCF Énergie)" },
  { id: "brookfield", name: "Brookfield", type: "Asset manager, with Brookfield Renewable Partners" },
  { id: "impala", name: "Impala", type: "Holding company of Neoen’s founder, Jacques Veyrat" },
  { id: "plenitude", name: "Plenitude", type: "Renewables and retail arm of Eni" }
];

const MOVES = [
  { id: "s_ipo", techs: [], cat: "deals", date: "2018-10-16", dp: "day", short: "Lists on Euronext Paris",
    title: "Lists on Euronext Paris to fund new plants", tech: "All renewables",
    figs: "€16.50 per share · about €450m of new shares · trading from 17 October 2018",
    text: "Neoen presented itself as France’s leading independent producer of exclusively renewable power, and its 300 MW Cestas park as Europe’s most powerful solar plant.",
    parties: [], src: ["n_ipo", "n_ipo_price"] },
  { id: "m_azur", techs: ["storage"], cat: "tenders", date: "2019-06-30", dp: "year", short: "First French battery: Azur Stockage", mw: 6,
    title: "Starts its first French battery, Azur Stockage", tech: "Battery storage",
    figs: "6 MW / 6 MWh · in operation from 2019",
    text: "Its only French battery in operation at the end of 2019.",
    parties: [], src: ["n_aolt", "n_urd19"] },
  { id: "m_aolt", techs: ["storage"], cat: "tenders", date: "2020-03-11", dp: "day", short: "Wins 13 MW in RTE’s storage tender", mw: 13,
    title: "Wins 13 MW of batteries in RTE’s long-term capacity tender", tech: "Battery storage",
    figs: "7 MW in Brittany (2021–2027 contract) and 6 MW (2022–2028) · RTE awarded 377 MW to 12 companies, 253 MW of it storage",
    text: "The same tender round backed TotalEnergies’ Dunkirk battery.",
    parties: [["rte", "Ran the long-term capacity tender"]], src: ["n_aolt"] },
  { id: "m_cre20", techs: ["solar", "wind_on"], cat: "tenders", date: "2020-10-23", dp: "day", short: "Wins 14 MW of CRE solar and wind", mw: 14,
    title: "Wins a solar and a wind project in CRE tenders", tech: "Solar, onshore wind",
    figs: "14+ MW · CRE 4.8 ground-mounted solar and 6th onshore wind period · Aude and Yonne · online early 2023",
    text: "Both projects are 100% Neoen.",
    parties: [["state", "Awarding authority"]], src: ["n_cre20"] },
  { id: "m_1gw", techs: [], cat: "tenders", date: "2021-06-10", dp: "day", short: "Passes 1 GW in France",
    title: "Passes 1 GW in operation or under construction in France", tech: "Solar, onshore wind, batteries",
    figs: "55 plants in operation, 22 under construction · 140+ staff · €1bn+ invested in France",
    text: "France was then Neoen’s second market after Australia.",
    parties: [], src: ["n_1gw"] },
  { id: "m_farmdown21", techs: ["wind_on"], cat: "deals", date: "2021-12-09", dp: "day", short: "Sells 95% of two wind farms", mw: 47,
    title: "Sells 95% of two French wind farms and keeps 5%", tech: "Onshore wind",
    figs: "46.8 MW · Le Berger (Meuse) and Les Beaux Monts (Yonne) · 20-year fixed tariffs",
    text: "The buyer was not named. Neoen also sold four French solar farms in the second half of 2021.",
    parties: [], src: ["n_farmdown21", "n_q1_22"] },
  { id: "m_ppe2", techs: ["solar"], cat: "tenders", date: "2022-03-10", dp: "day", short: "Wins 92.5 MWc in first PPE2 solar round", mw: 93,
    title: "Wins 92.5 MWc in the first PPE2 ground-mounted solar round", tech: "Ground-mounted solar",
    figs: "7 projects of 4.7–30 MWc · many on former quarries, landfills and fallow land · 661 MWc of French solar tender wins in five years",
    text: "TotalEnergies won 62 MW in the same round.",
    parties: [["state", "Awarding authority"]], src: ["n_q1_22"] },
  { id: "m_neutral", techs: ["wind_on", "solar"], cat: "tenders", date: "2022-12-12", dp: "day", short: "Wins 180 MW in technology-neutral tender", mw: 180,
    title: "Wins 180 MW in the CRE’s technology-neutral tender", tech: "Onshore wind, solar",
    figs: "11 projects · 9 wind farms, 137.8 MW · 2 solar plants, 42.1 MWc",
    text: "Neoen was the top winner of the round. Eight of the wind projects (125.8 MW) were waiting on legal appeals at the time.",
    parties: [["state", "Awarding authority"]], src: ["n_neutral22"] },
  { id: "m_cre23", techs: ["solar"], cat: "tenders", date: "2023-09-28", dp: "day", short: "Wins 238.5 MWc of solar", mw: 239,
    title: "Wins 238.5 MWc of ground-mounted and car-park solar in CRE tenders", tech: "Solar",
    figs: "15 ground-mounted plants, 221.6 MWc · 2 car parks, 16.9 MWc · over a quarter agrisolar, incl. two 30 MWc farms with sheep",
    text: "Its French portfolio in operation, under construction or awarded passed 2 GW: 1,177 MW operating, 280 MW under construction, 639 MW ready to build.",
    parties: [["state", "Awarding authority"]], src: ["n_cre23"] },
  { id: "m_cre23b", techs: ["solar"], cat: "tenders", date: "2023-12-19", dp: "day", short: "Wins 104 MWc; top CRE5 winner", mw: 104,
    title: "Wins 104.4 MWc of solar and ends 2023 as the top winner of the CRE5 tenders", tech: "Ground-mounted solar",
    figs: "4 projects of 14.4–30 MWc · 2023 wins: 381 MWc of solar and 68 MW of wind",
    text: "In 2023 Neoen also brought 12 solar plants (194 MWc), 3 wind farms (64 MW) and the 8 MW Antugnac battery into operation in France.",
    parties: [["state", "Awarding authority"]], src: ["n_fy23"] },
  { id: "m_cre24", techs: ["solar"], cat: "tenders", date: "2024-03-07", dp: "day", short: "Wins 119 MWc of ground solar", mw: 119,
    title: "Wins 119 MWc of ground-mounted solar in the PPE2 tenders", tech: "Ground-mounted solar",
    figs: "7 projects of 5–30 MWc · fifth PPE2 round · incl. Lapenne (Ariège), 21 MWc with sheep farming · built 2024–2028",
    text: "Grand Est, Nouvelle-Aquitaine and Occitanie.",
    parties: [["state", "Awarding authority"]], src: ["n_cre24"] },
  { id: "m_sncf", techs: ["solar"], cat: "contracts", date: "2024-06-10", dp: "day", short: "25-year solar PPA with SNCF", mw: 139,
    title: "Signs a 25-year solar PPA with SNCF Énergie for the new Le Couret plant", tech: "Solar",
    figs: "139 MWc · Haute-Vienne · 172 GWh a year · construction from early 2026, power from 2028",
    text: "The plant’s output equals SNCF’s yearly power needs for the Paris–Marseille TGV line.",
    parties: [["sncf", "Buyer (SNCF Énergie)"]], src: ["n_sncf"] },
  { id: "m_cre24b", techs: ["solar"], cat: "tenders", date: "2024-11-14", dp: "day", short: "Wins 164 MWc; top PPE2 winner", mw: 164,
    title: "Wins 164 MWc and is the top winner of the sixth PPE2 ground-mounted solar round", tech: "Ground-mounted solar, agrivoltaics",
    figs: "7 projects, 4 of them agrivoltaic · incl. Tourneuve (Lot-et-Garonne), 73 MWc · 642 MWc won across PPE2 ground-mounted rounds",
    text: "Neoen said it kept its lead across the PPE2 rounds and that its French portfolio in operation, under construction or awarded exceeded 2.5 GW.",
    parties: [["state", "Awarding authority"]], src: ["n_cre24b"] },
  { id: "m_brookfield", techs: [], cat: "deals", date: "2024-12-27", dp: "day", short: "Taken over by Brookfield",
    title: "Comes under Brookfield’s control, then leaves the stock market", tech: "All renewables",
    figs: "53% bought at €39.85 a share, agreed May 2024 · equity value €6.1bn for 100% · 97.7% after the 2025 tender offer, then squeeze-out",
    text: "Sellers included Impala, the founder’s holding company (42.14%). Temasek co-invested with Brookfield.",
    parties: [["brookfield", "Buyer, with Temasek"], ["impala", "Seller, 42.14%"]], src: ["n_bf_deal", "n_bf_close", "n_fy24", "n_bf_offer"] },
  { id: "m_solarsales", techs: ["solar"], cat: "deals", date: "2025-03-05", dp: "day", short: "Sells small French solar plants",
    title: "Reports more sales of small French solar plants", tech: "Solar",
    figs: "4 plants, 19 MWc sold in 2023 · 5 plants, 28 MWc in 2024 · several small projects also sold",
    text: "From Neoen’s 2023 and 2024 annual results.",
    parties: [], src: ["n_fy23", "n_fy24"] },
  { id: "m_plenitude", techs: ["solar", "wind_on", "storage"], cat: "deals", date: "2025-11-18", dp: "day", short: "Sells 760 MW to Plenitude (Eni)", mw: 760,
    title: "Sells 760 MW of operating French plants to Plenitude", tech: "Solar, onshore wind, batteries",
    figs: "52 assets: 37 solar, 14 wind, 1 battery · price not disclosed · Neoen keeps managing them for a few years",
    text: "Neoen keeps 1.1 GW in operation or under construction in France and reinvests the proceeds.",
    parties: [["plenitude", "Buyer (Eni’s renewables and retail arm)"]], src: ["n_plenitude", "n_plenitude_afp"] },
  { id: "m_breizh", techs: ["storage"], cat: "partners", date: "2026-01-13", dp: "day", short: "Grid-forming trial with RTE", mw: 92,
    title: "Agrees with RTE to trial grid-forming services on Breizh Big Battery", tech: "Battery storage",
    figs: "92 MW / 183 MWh at Pleyber-Christ (Finistère) · under construction, due online summer 2026 · trial from the second half of 2026, for at least one year",
    text: "Neoen’s first large-scale battery in France and the largest in Brittany. The trial switches an inverter from grid-following to grid-forming mode.",
    parties: [["rte", "Grid operator running the trial"]], src: ["n_rte", "n_fy24"] },
  { id: "m_vernou", techs: ["storage"], cat: "tenders", date: "2026-04-02", dp: "day", short: "Launches 248 MW Vernou battery", mw: 248,
    title: "Launches the Vernou-la-Celle-sur-Seine battery, set to be France’s largest", tech: "Battery storage",
    figs: "248 MW / 496 MWh · first battery on RTE’s 400 kV grid · no public support or subsidy · construction from summer 2026, online 2028",
    text: "Just ahead of the 240 MW Cernay-lès-Reims battery opened in early 2026. Neoen then had 2.2 GW in France in construction, in operation or under its management.",
    parties: [["rte", "Grid connection at 400 kV"]], src: ["n_vernou", "n_vernou_cde"] }
];

const BASELINE = {
  title: "Neoen in France",
  figs: "1.1 GW in operation or under construction after the Plenitude sale: 754 MW solar, 307 MW onshore wind, 115 MW / 213 MWh batteries (Nov 2025) · 2.2 GW including plants it manages (Apr 2026)",
  text: "Neoen, founded in Paris in 2008, builds solar, wind and battery plants and sells some of them once running. It listed on Euronext Paris in 2018 and has been controlled by Brookfield since December 2024. At its listing it called its 300 MW Cestas park Europe’s most powerful solar plant.",
  src: ["n_plenitude", "n_vernou", "n_ipo", "n_fy24"]
};

// Capacity in France, one record per published figure. All figures are "in operation or under construction".
const NEO_COVERS = ["solar", "wind_on", "storage"];
const CAPACITY = [
  { date: "2019-12-31", mw: { solar: 527, wind_on: 230, storage: 6 }, note: "In operation or under construction: 32 solar projects (527 MWc), 20 wind (230 MW), 1 battery in operation (6 MW)", src: ["n_urd19"] },
  { date: "2021-06-10", total: 1000, covers: NEO_COVERS, q: "+", note: "More than 1 GW in operation or under construction", src: ["n_1gw"] },
  { date: "2021-12-31", total: 1200, covers: NEO_COVERS, q: "~", note: "Nearly 1.2 GW in operation or under construction", src: ["n_urd21"] },
  { date: "2023-09-28", total: 1457, covers: NEO_COVERS, derived: true, note: "1,177 MW in operation plus 280 MW under construction (sum calculated here)", src: ["n_cre23"] },
  { date: "2023-12-31", total: 1600, covers: NEO_COVERS, note: "1.6 GW in operation or under construction", src: ["n_urd23"] },
  { date: "2025-11-18", mw: { solar: 754, wind_on: 307, storage: 115 }, note: "In operation or under construction after selling 760 MW to Plenitude: 754 MW solar, 307 MW wind, 115 MW / 213 MWh batteries", src: ["n_plenitude"] }
];
const TARGETS = [];

const WORTH = [
  ["brookfield", "Took over Neoen in 2024–25 and Boralex in 2026"],
  ["plenitude", "Bought 760 MW of Neoen’s French plants in 2025"],
  ["sncf", "Signed long solar PPAs with Neoen and with EDF"],
  ["rte", "Tests grid-forming on Neoen’s Breton battery"]
];

const FINDINGS = [
  { h: "The top winner of France’s solar tenders",
    p: "Neoen won 92.5 MWc in the first PPE2 solar round in 2022, 238.5 MWc and 104.4 MWc in 2023, and 119 MWc and 164 MWc in 2024. It ended 2023 as the top winner of the CRE5 tenders, topped the sixth ground-mounted round in 2024 and has won 642 MWc across those rounds.",
    ev: ["m_ppe2", "m_cre23", "m_cre23b", "m_cre24", "m_cre24b"] },
  { h: "Builds, then sells",
    p: "Neoen sells stakes in French plants once they run: two wind farms in 2021, small solar plants in 2023 and 2024, and 760 MW of operating plants to Plenitude in November 2025, which it manages for a few more years. It kept 1.1 GW in operation or under construction.",
    ev: ["m_farmdown21", "m_solarsales", "m_plenitude"] },
  { h: "From small batteries to France’s largest",
    p: "Its first French battery, Azur Stockage (6 MW), started in 2019, and it won 13 MW in RTE’s 2020 long-term tender. Breizh Big Battery (92 MW) is due online in summer 2026 with an RTE grid-forming trial, and the 248 MW Vernou battery, due in 2028 without public support, is set to be France’s largest.",
    ev: ["m_azur", "m_aolt", "m_breizh", "m_vernou"] },
  { h: "Listed in 2018, owned by Brookfield since 2024",
    p: "Neoen raised about €450m of new money on Euronext Paris in 2018. Brookfield agreed to buy control in May 2024 at €39.85 a share, closed at the end of December, and took the company off the market in 2025.",
    ev: ["s_ipo", "m_brookfield"] }
];

const GAPS = [
  { h: "Not found", items: [
      ["French capacity in operation alone, by technology: Neoen mostly reports operation and construction together. The one operating-only figure found is 1,177 MW in September 2023, not split by source.", ["n_urd21", "n_cre23"]],
      ["The price of the Plenitude sale and the buyers of the 2021 wind farms.", ["n_plenitude", "n_farmdown21"]],
      ["Tenders Neoen lost: the CRE publishes winners, not unsuccessful bidders.", []]
  ] },
  { h: "Watch", items: [
      ["Breizh Big Battery (92 MW), due online in summer 2026, and the RTE grid-forming trial.", ["n_rte"]],
      ["Vernou (248 MW) construction from summer 2026 and the Le Couret solar plant for SNCF, both due in 2028.", ["n_vernou", "n_sncf"]]
  ] },
  { h: "Left out of scope", items: [
      ["Neoen’s assets outside France, including the sale of its Victorian assets in Australia tied to Brookfield’s takeover.", ["n_fy24"]],
      ["The 300 MW Cestas solar park, already running before the period covered.", ["n_ipo"]]
  ] }
];

window.COMPANY_DATA = window.COMPANY_DATA || {};
window.COMPANY_DATA.neo = { S, PARTIES, MOVES, BASELINE, CAPACITY, TARGETS, FINDINGS, GAPS, WORTH };
})();
