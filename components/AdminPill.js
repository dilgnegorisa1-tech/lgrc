"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
export default function AdminPill() {
  const [user, setUser] = useState(null);
  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => setUser(data.session?.user ?? null));
    const { data: sub } = supabase.auth.onAuthStateChange((_e, s) => setUser(s?.user ?? null));
    return () => sub.subscription.unsubscribe();
  }, []);
  return user
    ? <button className="pill" onClick={() => supabase.auth.signOut()}>🔓 Edit mode · Log out</button>
    : <Link className="pill" href="/login">🔒 Admin login</Link>;
}
