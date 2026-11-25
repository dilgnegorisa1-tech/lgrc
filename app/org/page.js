"use client";
import { useState } from "react";
import Person from "@/components/Persons";

const BLUE = "#1a1aa6", RED = "#d4001c", ORANGE = "#f57c00", GOLD = "#f2b705";

const UNITS = [
  { key: "isa", color: BLUE, head: ["Fred Vincent C. Fortuito", "ISA I (COS)"], members: [] },
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

function ClusterHead({ id, open, setOpen, name, title, color, list, align }) {
  const on = open === id;
  return (
    <div className="hd">
      <button
        type="button"
        className={"hdbtn" + (on ? " on" : "")}
        style={{ "--pcol": color }}
        aria-expanded={on}
        onClick={() => setOpen(on ? null : id)}
      >
        <Person name={name} title={title} size="lg" color={color} />
        <span className="hcnt">{list.length} members {on ? "▲" : "▼"}</span>
      </button>
      {on && (
        <div className={"drop " + align} style={{ "--dcol": color }}>
          {list.map(([n, t, p]) => (
            <Person key={n} name={n} title={t} place={p} size="sm" color={color} />
          ))}
        </div>
      )}
    </div>
  );
}

export default function Org() {
  const [open, setOpen] = useState(null);

  return (
    <section className="orgp wide">
      <div className="orghead">
        <h1 className="title">ORGANIZATIONAL STRUCTURE</h1>
        <p className="sub2">Office of the Provincial Director · DILG Negros Oriental</p>
      </div>

      {/* Provincial Director */}
      <div className="tier"><Person name="Farah Diba G. Gentuya" title="Provincial Director" size="xl" color={RED} /></div>
      <div className="vline" />

      {/* Cluster heads (dropdowns) + Program Manager */}
      <div className="hang red">
        <ClusterHead id="c1" open={open} setOpen={setOpen} name="Anson L. Baroro" title="Cluster I Head" color={BLUE} list={C1} align="l" />
        <div><Person name="Klin C. Mendez" title="Program Manager" size="lg" color={RED} /></div>
        <ClusterHead id="c2" open={open} setOpen={setOpen} name="Mark Joshua B. Quijote" title="Cluster II Head" color={RED} list={C2} align="r" />
      </div>

      {/* Units bus */}
      <div className="vline" />
      <div className="hang bus units5">
        {UNITS.map((u) => (
          <div className="unit" key={u.key} style={{ "--ucol": u.color }}>
            {u.label && <h3>{u.label}</h3>}
            <Person name={u.head[0]} title={u.head[1]} size="md" color={u.color} />
            {u.members.length > 0 && (
              <div className="ulist">
                {u.members.map(([n, t]) => <Person key={n} name={n} title={t} size="sm" color={u.color} />)}
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}