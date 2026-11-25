"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
const NAV = [["/", "Home"], ["/lgrc", "LGRC"], ["/org", "Org structure"], ["/about", "About"], ["/contact", "Contact"]];
export default function Header() {
  const path = usePathname();
  const [noLogo, setNoLogo] = useState(false);
  const on = (h) => (h === "/" ? path === "/" : path.startsWith(h));
  return (
    <header className="hdr">
      <Link href="/" className="brand">
        {noLogo ? <span className="logo">DILG</span>
          : <img src="/logo.png" alt="DILG seal" className="logoimg" onError={() => setNoLogo(true)} />}
        <span>DILG Negros Oriental Provincial Office – LOCAL GOVERNMENT RESOURCE CENTER</span>
      </Link>
      <nav>{NAV.map(([h, l]) => <Link key={h} href={h} className={on(h) ? "on" : ""}>{l}</Link>)}</nav>
    </header>
  );
}
