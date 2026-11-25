import { notFound } from "next/navigation";
import { SECTIONS } from "@/lib/sections";
import SectionView from "@/components/SectionView";
export function generateStaticParams() { return SECTIONS.map((s) => ({ n: String(s.n) })); }
export default function SectionPage({ params }) {
  const s = SECTIONS.find((x) => String(x.n) === params.n);
  if (!s) notFound();
  return <SectionView section={s} />;
}
