import Link from "next/link";
import { SECTIONS } from "@/lib/sections";
export default function LGRC() {
  return (
    <section className="center">
      <h1 className="title">SECTIONS</h1>
      <p className="sub2">Select a section to view its programs and materials</p>
      <div className="cards wide">
        {SECTIONS.map((s) => (
          <Link key={s.n} href={`/lgrc/${s.n}`} className="card sec" style={{ "--c": s.color }}>
            <span className="num">Section {s.n}</span>{s.title}
            <small>{s.subs.length} program{s.subs.length > 1 ? "s" : ""}</small>
          </Link>))}
      </div>
    </section>
  );
}
