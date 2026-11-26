"use client";
import { useEffect, useRef, useState } from "react";
import Person from "@/components/Persons";

const BLUE = "#1a1aa6", RED = "#d4001c", ORANGE = "#f57c00", GOLD = "#f2b705";
const W = 1500; // design width; height is measured automatically

const UNITS = [
  { key: "isa", color: GOLD, head: ["Fred Vincent C. Fortuito", "ISA I (COS)"], members: [] },
  { key: "admin", color: BLUE, label: "Administrative Section", head: ["Jalvin Jane C. Angel", "Admin. Section Chief"], members: [
    ["Michelle T. Dayot", "ADAS II"], ["Louela T. Ybañez", "Accounting Unit Chief"],
    ["Lorenzo C. Tindugan, Jr.", "ADA IV"], ["Jessica E. Ejercito", "ADA VI"],
    ["Eric C. Cañete", "ADA IV"], ["Charisme D. Alunan", "ADA IV"],
    ["Leonardo C. Orellana", "ADA IV"], ["James Arvin G. Garupa", "Driver (COS)"],
    ["Jocelyn A. Nocete", "Job Order"], ["Eunice Dawn B. Melon", "Job Order"],
  ] },
  { key: "lgmes", color: ORANGE, label: "LGMES", head: ["Kurt Philip T. Matas", "LGMES Chief"], members: [
    ["John Patrick B. Teves", "LGOO II"], ["Ravi Roi T. Ybañez", "LGOO II"], ["Jianne Quisil", "Job Order"],
  ] },
  { key: "lgcds", color: GOLD, label: "LGCDS", head: ["Landbert Kyle M. Aquino", "LGCDS Chief"], members: [
    ["Analyn E. Besario", "Assistant LGCDS Chief"],
  ] },
  { key: "pdmu", color: ORANGE, label: "PDMU", head: ["Karen L. Castillon", "PDMU Chief"], members: [
    ["Elmer A. Barrera", "ENGR III (COS)"], ["Terrence P. Campugan", "ENGR II (COS)"],
    ["Armand Paul M. Mangubat", "ENGR II (COS)"], ["Jesselle A. Patenio", "ENGR II (COS)"],
    ["Mervin Clyde T. Dayot", "PEO II (COS)"], ["Julienne Nicole M. Cabanag", "ADAS II (COS)"],
  ] },
];

const C1 = [
  ["Louela P. Villarubia", "CLGOO", "Bais City"], ["Sheila E. Reyes", "MLGOO", "Valencia"],
  ["Angelica Ana A. Cantalejo", "CLGOO", "Canlaon City"], ["Jay Loizel G. Pido", "MLGOO", "Tayasan"],
  ["Ruel M. Reyes", "CLGOO", "Guihulngan City"], ["Roland G. Gonzales", "LGOO III", ""],
  ["Ava Sheryl C. Tan", "MLGOO", "Pamplona"], ["Lovely V. Absin", "CLGOO", "Tanjay City"],
  ["Kristina Bianca P. Ayroso", "MLGOO", "Manjuyod"], ["Ma. Joan P. Cerencio", "MLGOO", "Ayungon"],
  ["Maricar M. Ollague", "MLGOO", "Mabinay"], ["Alfa Marie I. De Los Reyes", "MLGOO", "Bindoy"],
  ["Jaqueline T. Barilea", "OIC – MLGOO", "La Libertad"], ["Karen Grace N. Grapa", "MLGOO", "Jimalalud"],
];
const C2 = [
  ["Celsa V. Inoferio", "MLGOO", "Zamboanguita"], ["Maria Gina D. Quindo", "CLGOO", "Bayawan City"],
  ["Iris Keithryn G. Vendiola", "LGOO III", ""], ["Christopher Severino M. Pastor", "MLGOO", "Amlan"],
  ["Reynold B. Pasicaran", "CLGOO", "Dumaguete City"], ["Roland B. Marquez", "LGOO II", ""],
  ["Deidre May G. Aranas", "MLGOO", "Bacong"], ["Jeanette-Pauline D. Sa-Onoy", "MLGOO", "Valencia"],
  ["Baby Genesis S. Belga", "LGOO II", ""], ["Gemylene E. Espina", "MLGOO", "Siaton"],
  ["Pearl Mary P. Gentuya", "MLGOO", "Sibulan"], ["Narciso C. Tan Jr.", "ADA I", ""],
  ["Jonnah Fe A. Cimafranca", "MLGOO", "Santa Catalina"], ["Joma D. Catayas", "OIC – MLGOO", "Basay"],
  ["Rica Gemma D. Quiñones", "MLGOO", "San Jose"], ["Janice D. Baga", "MLGOO", "Dauin"],
];

function Cluster({ name, title, color, list }) {
  return (
    <div className="fcl" style={{ "--ccol": color }}>
      <Person name={name} title={title} size="lg" color={color} />
      <div className="fcl2">
        {list.map(([n, t, p]) => <Person key={n} name={n} title={t} place={p} size="sm" color={color} />)}
      </div>
    </div>
  );
}

export default function Org() {
  const ref = useRef(null);
  const [fit, setFit] = useState({ s: 0.7, h: 900 });

  useEffect(() => {
    const calc = () => {
      const h = ref.current ? ref.current.offsetHeight : 900;
      const hd = document.querySelector(".hdr")?.offsetHeight || 0;
      const f = document.querySelector(".ftr")?.offsetHeight || 0;
      const availH = window.innerHeight - hd - f - 8;
      const availW = document.documentElement.clientWidth;
      setFit({ s: Math.max(0.35, Math.min(availW / W, availH / h, 1.3)), h });
    };
    calc();
    const t = setTimeout(calc, 400);
    if (document.fonts?.ready) document.fonts.ready.then(calc);
    window.addEventListener("resize", calc);
    return () => { clearTimeout(t); window.removeEventListener("resize", calc); };
  }, []);

  return (
    <div className="fitwrap">
      <div style={{ width: W * fit.s, height: fit.h * fit.s, margin: "0 auto" }}>
        <div ref={ref} className="fit" style={{ width: W, transform: `scale(${fit.s})`, transformOrigin: "top left" }}>
          <div className="ftitle">ORGANIZATIONAL STRUCTURE · <span>Office of the Provincial Director, DILG Negros Oriental</span></div>

          <div className="ftop"><Person name="Farah Diba G. Gentuya" title="Provincial Director" size="xl" color={RED} /></div>

          <div className="fcols">
            <Cluster name="Anson L. Baroro" title="Cluster I Head" color={BLUE} list={C1} />

            <div className="fmid">
              <Person name="Klin C. Mendez" title="Program Manager" size="md" color={RED} />
              <div className="funits">
                {UNITS.map((u) => (
                  <div className="fu" key={u.key} style={{ "--ucol": u.color }}>
                    {u.label && <h3>{u.label}</h3>}
                    <Person name={u.head[0]} title={u.head[1]} size="md" color={u.color} />
                    {u.members.length > 0 && (
                      <div className="fulist">
                        {u.members.map(([n, t]) => <Person key={n} name={n} title={t} size="sm" color={u.color} />)}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            <Cluster name="Mark Joshua B. Quijote" title="Cluster II Head" color={RED} list={C2} />
          </div>
        </div>
      </div>
    </div>
  );
}