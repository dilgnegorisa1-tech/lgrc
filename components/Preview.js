"use client";
import { useEffect } from "react";

function embedUrl(r) {
  const u = r.url;
  if (r.kind === "file") {
    const ext = (r.file_name || u).split("?")[0].split(".").pop().toLowerCase();
    if (ext === "pdf") return u;
    if (["doc", "docx", "ppt", "pptx"].includes(ext))
      return "https://view.officeapps.live.com/op/embed.aspx?src=" + encodeURIComponent(u);
    return null;
  }
  let m = u.match(/drive\.google\.com\/file\/d\/([\w-]+)/) || u.match(/drive\.google\.com\/open\?id=([\w-]+)/);
  if (m) return `https://drive.google.com/file/d/${m[1]}/preview`;
  m = u.match(/docs\.google\.com\/(document|spreadsheets|presentation)\/d\/([\w-]+)/);
  if (m) return `https://docs.google.com/${m[1]}/d/${m[2]}/${m[1] === "presentation" ? "embed" : "preview"}`;
  if (/\.pdf($|\?)/i.test(u)) return u;
  return null;
}

export default function Preview({ item, onClose }) {
  useEffect(() => {
    const onKey = (e) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => { document.removeEventListener("keydown", onKey); document.body.style.overflow = prev; };
  }, [onClose]);

  const src = embedUrl(item);
  return (
    <div className="modal" onClick={onClose}>
      <div className="mbox" role="dialog" aria-modal="true" aria-label={item.title} onClick={(e) => e.stopPropagation()}>
        <div className="mhead">
          <b>{item.title}</b>
          <a className="open" href={item.url} target="_blank" rel="noopener noreferrer">Open in new tab</a>
          <button className="mclose" onClick={onClose} aria-label="Close preview">×</button>
        </div>
        <div className="mbody">
          {src ? (
            <iframe src={src} title={item.title} allow="fullscreen" />
          ) : (
            <div className="nopv">
              <p>This link can’t be previewed here.</p>
              <a className="go" href={item.url} target="_blank" rel="noopener noreferrer">Open link</a>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}