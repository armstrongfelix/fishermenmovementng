import { useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";

const pageTitles = {
  "/": "Fishermen Movement — Cyber Safety & Digital Responsibility",
  "/about": "About — Fishermen Movement",
  "/curriculum": "Programme Curriculum — Fishermen Movement",
  "/impact": "Impact — Fishermen Movement",
  "/gallery": "Gallery — Fishermen Movement",
  "/news": "News & Updates — Fishermen Movement",
  "/contact": "Contact — Fishermen Movement",
};

export default function MainLayout() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
  }, [pathname]);

  useEffect(() => {
    document.title =
      pageTitles[pathname] || "Page not found — Fishermen Movement";
  }, [pathname]);

  return (
    <div className="flex min-h-screen flex-col">
      <a
        className="absolute left-6 top-[-80px] z-[300] rounded-[10px] bg-ink px-[18px] py-3 text-sm font-semibold text-white focus:top-3"
        href="#main-content"
      >
        Skip to content
      </a>
      <Navbar />
      <main id="main-content" className="flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
