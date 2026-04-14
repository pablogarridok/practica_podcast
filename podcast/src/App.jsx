import { useState } from "react";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Episodes from "./pages/Episodes";
import Contact from "./pages/Contact";

const PAGES = {
  home: Home,
  episodes: Episodes,
  contact: Contact,
};

export default function App() {
  const [page, setPage] = useState("home");
  const PageComponent = PAGES[page];

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "var(--bg)",
        color: "var(--text)",
        fontFamily: "'DM Sans', system-ui, sans-serif",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* Enlace saltar al contenido - MEJORA OBLIGATORIA */}
      <a
        href="#main-content"
        className="skip-link"
      >
        Saltar al contenido principal
      </a>

      <div
        aria-hidden
        style={{
          position: "fixed",
          top: -200,
          left: "50%",
          transform: "translateX(-50%)",
          width: 800,
          height: 600,
          borderRadius: "50%",
          background: "radial-gradient(ellipse, rgba(245,200,66,0.04) 0%, transparent 70%)",
          pointerEvents: "none",
          zIndex: 0,
        }}
      />

      <Navbar active={page} setPage={setPage} />

      {/* id="main-content" para que funcione el enlace saltar */}
      <main id="main-content" style={{ flex: 1, position: "relative", zIndex: 1 }}>
        <PageComponent setPage={setPage} />
      </main>

      <Footer />
    </div>
  );
}
