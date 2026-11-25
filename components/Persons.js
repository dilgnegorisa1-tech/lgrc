"use client";
import { useState } from "react";

const slug = (s) =>
  s.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");

const initials = (s) =>
  s.replace(/\b(jr|sr)\.?/gi, "").split(/\s+/).filter((w) => /^[A-Za-zÑñ]/.test(w) && w.length > 2)
    .slice(0, 2).map((w) => w[0].toUpperCase()).join("");

// Photos go in /public/org/<slug>.jpg  e.g. farah-diba-g-gentuya.jpg
export default function Person({ name, title, place, size = "md", color }) {
  const [bad, setBad] = useState(false);
  return (
    <div className={"pc " + size} style={color ? { "--pcol": color } : null}>
      <div className="av">
        {bad ? <span>{initials(name)}</span>
          : <img src={`/org/${slug(name)}.jpg`} alt={name} onError={() => setBad(true)} />}
      </div>
      <b>{name}</b>
      {title && <small>{title}</small>}
      {place && <small className="pl">{place}</small>}
    </div>
  );
}