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
    <div className="app-shell">
      <a className="skip-link" href="#main-content">
        Skip to content
      </a>
      <Navbar />
      <main id="main-content" className="site-main">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
