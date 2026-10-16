// Shared lists used by every company data file.
// Each move carries `techs`: the energy sources it concerns. An empty list means it cuts across sources
// (group strategy, ownership changes) and stays visible whatever source filter is set.
// Capacity points carry `techs` too; scope "tech" = a figure for those technologies,
// scope "total" = a company total the source did not split (shown only when all its technologies are selected).
const TECHS = [
  { id: "solar", name: "Solar", note: "Includes rooftop, floating and agrivoltaic solar" },
  { id: "wind_on", name: "Onshore wind" },
  { id: "wind_off", name: "Offshore wind", note: "Fixed and floating" },
  { id: "hydro", name: "Hydro", note: "Includes pumped storage" },
  { id: "storage", name: "Battery storage" },
  { id: "biogas", name: "Biogas", note: "Gas output, so it appears on the map but not in the capacity chart" },
  { id: "nuclear", name: "Nuclear", note: "EDF only. Outside the renewables scope, so suggested off by default" }
];
