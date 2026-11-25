"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
export default function Login() {
  const r = useRouter();
  const [err, setErr] = useState("");
  async function go(e) {
    e.preventDefault();
    const { error } = await supabase.auth.signInWithPassword({ email: e.target.email.value, password: e.target.password.value });
    if (error) setErr(error.message); else r.push("/lgrc");
  }
  return (
    <section className="page"><form onSubmit={go} className="box login">
      <h2>Administrator sign in</h2>
      <input name="email" type="email" placeholder="Email" required />
      <input name="password" type="password" placeholder="Password" required />
      <button className="go">Sign in</button>
      {err && <div className="err">{err}</div>}
    </form></section>
  );
}
