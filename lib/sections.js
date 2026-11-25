const slug = (s) => s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
const mk = (n, title, color, names) => ({
  n, title, color,
  subs: names.map((name) => ({ slug: slug(name).slice(0, 40), name })),
});
export const SECTIONS = [
  mk(1, "Excellence in local governance upheld", "#e6b800",
    ["SGLG","SLGP","LTIA","MEALGU","SGLG-IF","CSO-PPPP","CBMS","EODB","DCR","BK","NEO / BNEO","CREATE4LGUs"]),
  mk(2, "Peaceful, orderly, safe and secure communities strengthened", "#2e75b6",
    ["C4PEACE","PADS","PCVE","ECLIP","Strengthening POCs","E911"]),
  mk(3, "Resilient communities reinforced", "#00a050",
    ["Manila Bay Clean-up","DILG Disaster Preparedness, Response, and Resilience Program","Operation Listo","Listo si KAP"]),
  mk(4, "Inclusive communities enabled", "#7030a0",
    ["Support to vulnerable sectors (food security, malnutrition, stunting, GAD, VAWC, etc.)"]),
  mk(5, "Highly trusted Department and Partner", "#8b0000",
    ["LGUIMP","LWAN","Office Productivity Services"]),
];
// Edit these two links
export const PORTAL_URL = "https://dilgnegor.netlify.app/";
export const OTHER = { label: "DILG Portal", url: "https://nir.dilg.gov.ph/" };
