import "./globals.css";
import { Inter } from "next/font/google";
import Header from "@/components/Header";
import AdminPill from "@/components/AdminPill";
const font = Inter({ subsets: ["latin"] });
export const metadata = { title: "LGRC – DILG Negros Oriental", description: "Local Government Resource Center, DILG Negros Oriental Provincial Office" };
export default function RootLayout({ children }) {
  return (
    <html lang="en"><body className={font.className}>
      <Header />
      <main>{children}</main>
     <footer className="ftr">
  <div>© 2026 Department of the Interior and Local Government – Negros Oriental</div>
  <div className="credit">Website developed by Niki · BSCS, NORSU 2026</div>
</footer>
      <AdminPill />
    </body></html>
  );
}
