"use client";
import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import Preview from "@/components/Preview";

const MAX = 50 * 1024 * 1024;
const CATS = {
  document: { label: "Documents", hint: "PDF, Word or link", accept: ".pdf,.doc,.docx", ok: /\.(pdf|docx?)$/i, allowLink: true, err: "Only PDF and Word (DOC/DOCX) files are allowed." },
  presentation: { label: "Presentations", hint: "PowerPoint", accept: ".ppt,.pptx", ok: /\.pptx?$/i, allowLink: false, err: "Only PowerPoint (PPT/PPTX) files are allowed." },
};
const extOf = (r) => (r.kind === "link" ? "link" : (r.file_name?.split(".").pop() || "file").toLowerCase());
const cls = (e) => (e === "pdf" ? "pdf" : e.startsWith("doc") ? "doc" : e.startsWith("ppt") ? "ppt" : "lnk");

export default function SectionView({ section }) {
  const [rows, setRows] = useState([]);
  const [active, setActive] = useState(section.subs[0].slug);
  const [tab, setTab] = useState("document");
  const [admin, setAdmin] = useState(false);
  const [loading, setLoading] = useState(true);
  const [pv, setPv] = useState(null);

  const load = useCallback(async () => {
    const { data } = await supabase.from("materials").select("*")
      .eq("section", section.n).order("created_at", { ascending: false });
    setRows(data || []); setLoading(false);
  }, [section.n]);

  useEffect(() => {
    load();
    supabase.auth.getSession().then(({ data }) => setAdmin(!!data.session));
    const { data: sub } = supabase.auth.onAuthStateChange((_e, s) => setAdmin(!!s));
    return () => sub.subscription.unsubscribe();
  }, [load]);

  const cur = section.subs.find((s) => s.slug === active);
  const inSub = rows.filter((r) => r.sub === active);
  const countOf = (cat) => inSub.filter((r) => (r.category || "document") === cat).length;
  const list = inSub.filter((r) => (r.category || "document") === tab);
  const cfg = CATS[tab];

  async function remove(r) {
    if (!confirm("Remove this material?")) return;
    if (r.file_path) await supabase.storage.from("materials").remove([r.file_path]);
    await supabase.from("materials").delete().eq("id", r.id);
    load();
  }

  return (<>
    <div className="crumb"><Link href="/">Home</Link> › <Link href="/lgrc">LGRC</Link> › Section {section.n}</div>
    <div className="hero" style={{ "--c": section.color }}>
      <span className="eyebrow">Section {section.n}</span>
      <h1>{section.title}</h1>
      <p>{section.subs.length} program{section.subs.length > 1 ? "s" : ""}</p>
    </div>

    <div className="two">
      <aside>
        <div className="sidehd">Programs</div>
        {section.subs.map((s) => (
          <button key={s.slug} className={"sub" + (s.slug === active ? " on" : "")}
            style={s.slug === active ? { borderColor: section.color, "--c": section.color } : null}
            onClick={() => setActive(s.slug)}>
            {s.name}<span>{rows.filter((r) => r.sub === s.slug).length}</span>
          </button>))}
      </aside>

      <div className="panel">
        <h2 className="bar">{cur.name}</h2>
        <div className="tabs" role="tablist">
          {Object.entries(CATS).map(([k, c]) => (
            <button key={k} role="tab" aria-selected={tab === k} className={"tab" + (tab === k ? " on" : "")} onClick={() => setTab(k)}>
              {c.label} <span>{countOf(k)}</span>
            </button>))}
        </div>

        <div className="pbody">
          {loading ? <p className="mu">Loading…</p> : list.length === 0 ? (
            <div className="empty"><b>No {cfg.label.toLowerCase()} yet</b><span>Materials added by the administrator will appear here.</span></div>
          ) : list.map((r) => {
            const e = extOf(r);
            return (
              <div className="item" key={r.id}>
                <span className={"ftype " + cls(e)}>{e === "link" ? "LINK" : e.toUpperCase()}</span>
                <span className="ititle">{r.title}<small>Added {new Date(r.created_at).toLocaleDateString("en-PH", { year: "numeric", month: "long", day: "numeric" })}</small></span>
                <button className="prev" onClick={() => setPv(r)}>Preview</button>
                <a className="open" href={r.url} target="_blank" rel="noopener noreferrer">{r.kind === "link" ? "Open" : "Download"}</a>
                {admin && <button className="x" title="Remove" onClick={() => remove(r)}>×</button>}
              </div>);
          })}

          {admin && (
            <details className="addbox">
              <summary>＋ Add {tab === "document" ? "document" : "presentation"}</summary>
              <UploadForm key={tab + active} category={tab} cfg={cfg} section={section.n} sub={active} onDone={load} />
            </details>)}
        </div>
      </div>
    </div>
    {pv && <Preview item={pv} onClose={() => setPv(null)} />}
  </>);
}

function UploadForm({ category, cfg, section, sub, onDone }) {
  const [kind, setKind] = useState("file");
  const [busy, setBusy] = useState(false);
  const [msg, setMsg] = useState("");

  async function submit(e) {
    e.preventDefault();
    const f = e.target;
    setMsg("");
    let rec = { section, sub, category, title: f.title.value.trim(), kind };
    if (kind === "link") {
      const u = f.link.value.trim();
      if (!/^https?:\/\//i.test(u)) return setMsg("!Enter a link starting with http:// or https://");
      rec.url = u;
    } else {
      const file = f.file.files[0];
      if (!file) return setMsg("!Choose a file.");
      if (!cfg.ok.test(file.name)) return setMsg("!" + cfg.err);
      if (file.size > MAX) return setMsg("!File is over 50 MB.");
      setBusy(true);
      const path = `${section}/${sub}/${Date.now()}-${file.name.replace(/[^\w.-]+/g, "_")}`;
      const { error } = await supabase.storage.from("materials").upload(path, file);
      if (error) { setBusy(false); return setMsg("!Upload failed: " + error.message); }
      rec = { ...rec, url: supabase.storage.from("materials").getPublicUrl(path).data.publicUrl, file_path: path, file_name: file.name };
    }
    setBusy(true);
    const { error } = await supabase.from("materials").insert(rec);
    setBusy(false);
    if (error) return setMsg("!Could not save: " + error.message);
    f.reset(); setMsg("Added."); onDone();
  }

  return (
    <form onSubmit={submit}>
      <input name="title" type="text" placeholder="Title" required />
      {cfg.allowLink && (
        <div className="row">
          <label><input type="radio" checked={kind === "file"} onChange={() => setKind("file")} /> File (PDF, Word)</label>
          <label><input type="radio" checked={kind === "link"} onChange={() => setKind("link")} /> Link (Google Drive, etc.)</label>
        </div>)}
      {kind === "file"
        ? <input name="file" type="file" accept={cfg.accept} />
        : <input name="link" type="url" placeholder="https://drive.google.com/…" />}
      <button className="go" disabled={busy}>{busy ? "Saving…" : "Add"}</button>
      {msg && <div className={msg.startsWith("!") ? "err" : "mu"}>{msg.replace(/^!/, "")}</div>}
    </form>
  );
}