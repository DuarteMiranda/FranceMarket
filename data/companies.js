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
    { id: "te", name: "TotalEnergies", file: "totalenergies", cx: -380, cy: -240, dash: null,
      angles: { deals: -2.4, tenders: 1.2, contracts: 0.15, partners: 2.75, strategy: -1.4 } },
    { id: "bx", name: "Boralex", file: "boralex", cx: 380, cy: 290, dash: "6 4",
      angles: { deals: 0.35, tenders: 2.7, contracts: -2.4, partners: -1.2, strategy: 1.6 } },
    { id: "edf", name: "EDF", file: "edf", cx: -380, cy: 290, dash: "1 4",
      angles: { deals: 2.45, tenders: -1.0, contracts: 0.15, partners: 3.1, strategy: 1.6 } },
    { id: "eng", name: "Engie", file: "engie", cx: 380, cy: -240, dash: "8 3 2 3",
      angles: { deals: -0.7, tenders: 2.2, contracts: 3.0, partners: 1.45, strategy: -1.75 } }
  ],

  // Party ids in a company's data that are really another company on the page: drawn as a dashed link to that company.
  alias: { edf: "edf", totalenergies: "te" },

  // "Worth a click" in the map panel when more than one company is selected (party ids).
  worthMulti: [
  ["state", "Runs the tenders all four bid in"],
  ["orange", "Buys renewable power from TotalEnergies, Boralex and Engie"],
  ["elicio", "Bid with Total in 2019, then beat TotalEnergies, EDF and Ocean Winds in Bretagne Sud"],
  ["oceanwinds", "Engie’s offshore venture with EDPR; beat TotalEnergies off Narbonne"],
  ["ca", "Co-owns wind and solar farms with Engie and with TotalEnergies"],
  ["metro", "Buys power from EDF and from Boralex"]
],

  // Findings that compare companies. Each shows when at least two of its companies are selected.
  // ev: move ids as "<company id>:<move id>".
  comparisons: [
  { cos: ["te", "bx", "edf", "eng"], h: "Dunkirk split their offshore paths",
    p: "All four were in the 2019 Dunkirk tender. Boralex withdrew in March; TotalEnergies, bidding with Elicio and Ørsted, and Engie, with EDPR and E.ON, lost in June to EDF’s consortium at €44/MWh. EDF and Engie’s Ocean Winds each won a Mediterranean floating site in 2024, and both skipped Centre Manche 2, which TotalEnergies won in 2025. We found no Boralex offshore bid since 2019.",
    ev: ["bx:m_dunkirk", "te:m_dunkirk", "eng:m_dunkirk", "edf:m_dunkirk", "edf:m_ao6", "eng:m_ao6", "te:m_cm2", "eng:m_ao8"] },
  { cos: ["te", "bx", "edf", "eng"], h: "Engie leads wind and solar, EDF leads hydro",
    p: "Engie reported 2.7 GW of onshore wind and 1.8 GW of solar in France in May 2026. The latest totals the others published are about 2 GW for TotalEnergies (February 2026), about 2 GW net for EDF (October 2021) and 1,378 MW for Boralex (end-2025). In hydro the order flips: EDF has about 20 GW, Engie about 3.9 GW through CNR, which it 49.97% owns, and SHEM.",
    ev: ["eng:s_rename", "te:s_top3", "edf:s_cap2030", "bx:s_fr25", "eng:m_cnr"] },
  { cos: ["te", "bx"], h: "Similar size, different routes",
    p: "TotalEnergies reported about 2 GW in France in February 2026, Boralex 1,378 MW at the end of 2025. TotalEnergies bought its base with Direct Energie in 2018 and added developers and tender wins; Boralex grew mostly from its own onshore wind projects after buying Kallista the same year.",
    ev: ["te:m_direct", "bx:m_kallista", "te:s_top3", "bx:s_fr25"] },
  { cos: ["te", "bx", "eng"], h: "Capacity targets missed",
    p: "TotalEnergies aimed for 4 GW by 2025 and reached about 2 GW; Boralex aimed for 1.8 GW and reached 1,378 MW. Engie’s 2017 goal of about 3 GW of wind and 2.2 GW of solar by 2021 was still unmet at the end of 2023, at 2.5 GW and 1.9 GW. All three then moved to output, investment or group-wide goals.",
    ev: ["te:s_4gw", "te:s_2gw", "bx:s_fr25", "bx:s_2030", "eng:s_2021", "eng:m_orsted"] },
  { cos: ["te", "bx", "edf", "eng"], h: "The same industrial customers",
    p: "Saint-Gobain signed a 5-year PPA with TotalEnergies in October 2024 and a 20-year PPA with Boralex a month later, the second paying for new plants. Orange buys wind from Boralex from 2021 and signed solar contracts that year with Engie (15 years) and TotalEnergies (20 years). METRO France bought wind power from EDF in 2019 and signed a 20-year solar PPA with Boralex in 2021.",
    ev: ["te:m_sg_ppa", "bx:m_sg", "bx:m_orange", "eng:m_orange", "te:m_orange", "edf:m_metro", "bx:m_metro"] },
  { cos: ["te", "bx", "edf", "eng"], h: "Different ways to bring in capital",
    p: "TotalEnergies sells half of individual operating portfolios and keeps running them; one buyer, Crédit Agricole Assurances, has co-owned Engie farms through a 50/50 venture since 2013. Boralex sold 30% of its whole French business to EIP in 2022, and in 2026 the group itself was taken private by Brookfield and La Caisse. EDF has announced no sale in French wind or solar; its one opening so far is a 35% stake in the Tanika storage project in La Réunion.",
    ev: ["te:m_ca_sale", "eng:m_feih", "te:m_eiffel", "bx:m_eip", "bx:m_brookfield", "edf:m_tanika"] }
]
};
