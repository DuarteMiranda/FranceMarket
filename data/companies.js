// Companies on the page, in display order, plus the comparisons that span several of them.
// To add a company: create data/<file>.js (copy an existing one), add an entry here,
// add a <script src="data/<file>.js"> line to index.html and a --co-<id> colour to assets/css/style.css.
window.SITE = {
  asOf: "16 Oct 2026",          // shown in the header
  today: "2026-10-16",          // the "Today" line on the capacity charts

  companies: [
    // id: short key used in move ids ("te:m_dunkirk") and CSS (--co-te)
    // cx, cy: where the company sits on the relationship map; angles: direction of each category hub, in radians (0 = right, 1.57 = down)
    // dash: line pattern on the capacity charts, so lines differ by more than colour
    { id: "te", name: "TotalEnergies", file: "totalenergies", cx: -420, cy: -250, dash: null,
      angles: { deals: -2.4, tenders: 1.2, contracts: 0.15, partners: 2.75, strategy: -1.4 } },
    { id: "bx", name: "Boralex", file: "boralex", cx: 300, cy: 330, dash: "6 4",
      angles: { deals: 0.35, tenders: 2.7, contracts: -2.4, partners: -1.2, strategy: 1.6 } },
    { id: "edf", name: "EDF", file: "edf", cx: -420, cy: 300, dash: "1 4",
      angles: { deals: 2.45, tenders: -1.0, contracts: 0.15, partners: 3.1, strategy: 1.6 } },
    { id: "eng", name: "Engie", file: "engie", cx: 300, cy: -280, dash: "8 3 2 3",
      angles: { deals: -0.7, tenders: 2.2, contracts: 3.0, partners: 1.45, strategy: -1.75 } },
    { id: "edp", name: "EDP", file: "edp", cx: 820, cy: 20, dash: "12 4",
      angles: { tenders: -2.6, partners: -1.5, deals: 0.3, contracts: 1.15, strategy: 2.2 } },
    { id: "neo", name: "Neoen", file: "neoen", cx: -60, cy: 660, dash: "3 3 10 3",
      angles: { tenders: 1.35, deals: 2.55, contracts: 0.35, partners: 0.0, strategy: -1.57 } },
    { id: "ib", name: "Iberdrola", file: "iberdrola", cx: -940, cy: 20, dash: "10 3 2 3 2 3",
      angles: { tenders: 3.1, deals: -2.3, strategy: 2.35, contracts: 1.9, partners: -1.9 } },
    { id: "ors", name: "Ørsted", file: "orsted", cx: -60, cy: -680, dash: "4 2",
      angles: { deals: -2.0, tenders: -1.15, partners: -0.5, contracts: -2.6, strategy: -1.57 } },
    { id: "vol", name: "Voltalia", file: "voltalia", cx: 760, cy: 600, dash: "14 3 3 3",
      angles: { tenders: 0.55, contracts: 1.35, deals: -0.15, strategy: 2.1, partners: 1.0 } },
    { id: "rwe", name: "RWE", file: "rwe", cx: 780, cy: -600, dash: "2 3 2 7",
      angles: { tenders: -0.55, deals: -1.25, partners: 0.1, contracts: -1.85, strategy: -2.3 } },
    { id: "enl", name: "Enel", file: "enel", cx: -880, cy: 640, dash: "1 2 1 6",
      angles: { deals: 2.6, strategy: 1.9, tenders: 3.0, contracts: 2.3, partners: 1.6 } }
  ],

  // Party ids in a company's data that are really another company on the page: drawn as a dashed link to that company.
  alias: { edf: "edf", totalenergies: "te", edpr: "edp", engie: "eng", neoen: "neo", iberdrola: "ib", orsted: "ors", voltalia: "vol", rwe: "rwe", enel: "enl" },

  // "Worth a click" in the map panel when more than one company is selected (party ids).
  worthMulti: [
  ["state", "Runs the tenders they all bid in"],
  ["orange", "Buys renewable power from TotalEnergies, Boralex and Engie"],
  ["elicio", "Bid with Total and Ørsted in 2019, then beat TotalEnergies, EDF and Ocean Winds in Bretagne Sud"],
  ["oceanwinds", "Engie and EDPR’s offshore venture; beat TotalEnergies off Narbonne"],
  ["ca", "Co-owns wind and solar farms with Engie and with TotalEnergies"],
  ["metro", "Buys power from EDF and from Boralex"],
  ["sncf", "Signed long PPAs with Voltalia, EDF and Neoen"],
  ["brookfield", "Took over Neoen in 2024–25 and Boralex in 2026"],
  ["rte", "Ran the 2020 storage tender won by TotalEnergies and Neoen"],
  ["decathlon", "Buys solar from Voltalia and on-site solar from EDP"],
  ["bdt", "Co-owns Ocean Winds farms, joined EDF at Tanika and sold stakes to Iberdrola"]
],

  // Findings that compare companies. Each shows when at least two of its companies are selected.
  // ev: move ids as "<company id>:<move id>".
  comparisons: [
  { cos: ["te", "bx", "edf", "eng", "edp", "ib", "ors", "rwe"], h: "Dunkirk split their offshore paths",
    p: "TotalEnergies, Boralex, EDF, Engie and EDPR were all in the 2019 Dunkirk tender, Ørsted joined TotalEnergies’ bid and RWE, through innogy, joined EDF’s; Iberdrola had pre-qualified with RES in 2017 but was not among the reported bidders. Boralex withdrew in March; TotalEnergies, bidding with Elicio and Ørsted, and Engie and EDPR, bidding together with E.ON, lost in June to EDF’s consortium at €44/MWh. EDF and Ocean Winds, Engie and EDPR’s joint venture, each won a Mediterranean floating site in 2024, and both skipped Centre Manche 2, which TotalEnergies won in 2025. We found no Boralex offshore bid since 2019.",
    ev: ["bx:m_dunkirk", "te:m_dunkirk", "eng:m_dunkirk", "edp:m_dunkirk", "edf:m_dunkirk", "rwe:m_dunkirk", "ors:m_dunkirk", "ib:m_dunkirk", "edf:m_ao6", "eng:m_ao6", "te:m_cm2", "eng:m_ao8"] },
  { cos: ["te", "bx", "edf", "eng", "edp", "neo", "ib"], h: "Engie leads wind and solar, EDF leads hydro",
    p: "Engie reported 2.7 GW of onshore wind and 1.8 GW of solar in France in May 2026. The latest totals the others published are about 2 GW for TotalEnergies (February 2026), about 2 GW net for EDF (October 2021), 1,378 MW for Boralex (end-2025), a little over 700 MW operated by EDPR (February 2026) 1.1 GW in operation or under construction for Neoen after it sold 760 MW to Plenitude (November 2025), and 496 MW for Iberdrola, all at Saint-Brieuc, after it sold its onshore farms (June 2026). In hydro the order flips: EDF has about 20 GW, Engie about 3.9 GW through CNR, which it 49.97% owns, and SHEM.",
    ev: ["eng:s_rename", "te:s_top3", "edf:s_cap2030", "bx:s_fr25", "edp:m_2025", "neo:m_plenitude", "ib:m_ts_sale", "eng:m_cnr"] },
  { cos: ["te", "bx"], h: "Similar size, different routes",
    p: "TotalEnergies reported about 2 GW in France in February 2026, Boralex 1,378 MW at the end of 2025. TotalEnergies bought its base with Direct Energie in 2018 and added developers and tender wins; Boralex grew mostly from its own onshore wind projects after buying Kallista the same year.",
    ev: ["te:m_direct", "bx:m_kallista", "te:s_top3", "bx:s_fr25"] },
  { cos: ["te", "bx", "eng"], h: "Capacity targets missed",
    p: "TotalEnergies aimed for 4 GW by 2025 and reached about 2 GW; Boralex aimed for 1.8 GW and reached 1,378 MW. Engie’s 2017 goal of about 3 GW of wind and 2.2 GW of solar by 2021 was still unmet at the end of 2023, at 2.5 GW and 1.9 GW. All three then moved to output, investment or group-wide goals.",
    ev: ["te:s_4gw", "te:s_2gw", "bx:s_fr25", "bx:s_2030", "eng:s_2021", "eng:m_orsted"] },
  { cos: ["te", "bx", "edf", "eng", "neo", "vol", "edp"], h: "The same industrial customers",
    p: "Saint-Gobain signed a 5-year PPA with TotalEnergies in October 2024 and a 20-year PPA with Boralex a month later, the second paying for new plants. Orange buys wind from Boralex from 2021 and signed solar contracts that year with Engie (15 years) and TotalEnergies (20 years). METRO France bought wind power from EDF in 2019 and signed a 20-year solar PPA with Boralex in 2021. SNCF signed a 25-year solar PPA with Voltalia in 2019, a 20-year one with EDF in 2021 and a 25-year one with Neoen in 2024, each for new plants, and bought a Voltalia wind farm’s output in 2023. Decathlon buys solar from Voltalia (2020) and on-site solar from EDP (2024).",
    ev: ["te:m_sg_ppa", "bx:m_sg", "bx:m_orange", "eng:m_orange", "te:m_orange", "edf:m_metro", "bx:m_metro", "vol:m_sncf19", "edf:m_sncf", "neo:m_sncf", "vol:m_sncf23", "vol:m_decathlon", "edp:m_decathlon"] },
  { cos: ["te", "bx", "edf", "eng", "edp", "neo", "ib"], h: "Different ways to bring in capital",
    p: "TotalEnergies sells half of individual operating portfolios and keeps running them; one buyer, Crédit Agricole Assurances, has co-owned Engie farms through a 50/50 venture since 2013. EDPR sells stakes in operating farms to fund new ones, most recently 11 French wind farms to Amundi in 2025. Boralex sold 30% of its whole French business to EIP in 2022, and in 2026 the group itself was taken private by Brookfield and La Caisse. Neoen listed in Paris in 2018, sold 760 MW of running plants outright to Plenitude in 2025 and has been controlled by Brookfield since December 2024. Iberdrola went the other way offshore, buying out its Saint-Brieuc partners in 2020 and funding the €2.4bn itself, then sold its whole onshore unit to Technique Solaire in 2025–26. EDF has announced no sale in French wind or solar; its one opening so far is a 35% stake in the Tanika storage project in La Réunion.",
    ev: ["te:m_ca_sale", "eng:m_feih", "te:m_eiffel", "edp:m_amundi", "bx:m_eip", "bx:m_brookfield", "neo:s_ipo", "neo:m_plenitude", "neo:m_brookfield", "ib:m_ailes", "ib:m_ts_sale", "edf:m_tanika"] },
  { cos: ["ors", "ib", "eng"], h: "Bought into French onshore, then sold out",
    p: "Ørsted bought Ostwind, with its French business, in 2022 and sold Ostwind France to Engie in April 2024 with 54 MW running and 24 MW under construction. Iberdrola bought Aalto Power in 2020 and sold the whole onshore unit, 118 MW and 639 MW of projects, to Technique Solaire in 2025–26. Both said they were narrowing to fewer markets: Ørsted to the UK, Ireland, Germany and Spain for onshore, Iberdrola to networks, long-term contracts and markets such as the US and UK.",
    ev: ["ors:m_ostwind", "ors:m_engie", "eng:m_orsted", "ib:m_aalto", "ib:m_ts_sale"] },
  { cos: ["edf", "eng", "edp", "ib", "te", "rwe"], h: "Pre-selected, then no bid",
    p: "In February 2023 the CRE pre-selected nine candidates for Oléron (AO7) and seven for Centre Manche 2 (AO8), among them EDF with Maple Power, Ocean Winds (Engie and EDPR), Iberdrola and RWE. Nobody bid for Oléron, and only TotalEnergies and RWE bid for Centre Manche 2, which they won together in September 2025; RWE asked to leave the same day. Iberdrola’s Saint-Brieuc, fully online in May 2024, two weeks after EDF’s Fécamp, remains its only French offshore farm.",
    ev: ["edf:m_ao7", "edf:m_ao8", "eng:m_ao8", "edp:m_ao8", "ib:m_ao7", "ib:m_ao8", "rwe:m_ao7", "te:m_cm2", "rwe:m_cm2", "rwe:m_cm2_exit", "ib:m_commission", "edf:m_fecamp"] },
  { cos: ["bx", "neo"], h: "One buyer for two of them",
    p: "Brookfield agreed in May 2024 to buy control of Neoen at €39.85 a share, valuing it at €6.1bn, closed at the end of December and took it off the stock market in 2025. In March 2026 it agreed with La Caisse to take Boralex private, with about 70% for Brookfield, and closed in August. Since August 2026 Neoen and Boralex have the same controlling owner.",
    ev: ["neo:m_brookfield", "bx:m_brookfield"] },
  { cos: ["te", "neo", "eng", "edp", "bx", "edf"], h: "Ever-larger batteries",
    p: "TotalEnergies commissioned a 61 MW battery at Dunkirk in December 2021, then France’s largest, after winning RTE’s 2020 long-term tender, where Neoen won 13 MW. Neoen’s 92 MW Breizh Big Battery is due online in summer 2026 and its 248 MW Vernou battery, set to be France’s largest, in 2028. Engie began building its first French battery, 110 MW, in April 2026 for summer 2027, and EDPR is co-developing a 50 MW one. Boralex has two small batteries at wind farms, and EDF opened 20 MW of batteries alongside hydro at Baixas in 2026.",
    ev: ["te:m_dunkirk_bess", "neo:m_aolt", "neo:m_breizh", "neo:m_vernou", "eng:m_bess", "edp:m_bess", "bx:m_arce", "bx:m_plouguin", "edf:m_baixas"] },
  { cos: ["te", "edp"], h: "Opposite bets on on-site solar",
    p: "TotalEnergies sold its distributed solar business in France and six other countries in July 2026, saying projects under 3 MW no longer fit its model. EDP went the other way, signing on-site solar for Decathlon in 2024 and Snop in 2025, France included.",
    ev: ["te:m_dg_exit", "te:s_utility", "edp:m_decathlon", "edp:m_snop"] }
]
};
