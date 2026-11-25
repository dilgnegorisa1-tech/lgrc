import Link from "next/link";
import { PORTAL_URL, OTHER } from "@/lib/sections";
export default function Home() {
  return (
    <section className="center">
      <h1 className="title">LGRC</h1>
      <p className="sub2">Local Government Resource Center</p>
      <div className="cards">
        <a className="card" href={PORTAL_URL} target="_blank" rel="noopener noreferrer">DILG Negros Oriental Portal</a>
        <Link className="card" href="/lgrc">LGRC</Link>
        <a className="card" href={OTHER.url} target="_blank" rel="noopener noreferrer">{OTHER.label}</a>
      </div>
    </section>
  );
}
