const LINKS = [
  { id: "home", label: "Inicio" },
  { id: "episodes", label: "Episodios" },
  { id: "contact", label: "Contacto" },
];

export default function Navbar({ active, setPage }) {
  return (
    <header
      style={{
        position: "fixed",
        top: 0, left: 0, right: 0,
        zIndex: 50,
        background: "rgba(12,12,14,0.85)",
        backdropFilter: "blur(16px)",
        WebkitBackdropFilter: "blur(16px)",
        borderBottom: "1px solid var(--border)",
      }}
    >
      <div
        style={{
          maxWidth: 1100,
          margin: "0 auto",
          padding: "0 28px",
          height: 64,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        {/* Logo */}
        <button
          onClick={() => setPage("home")}
          style={{
            background: "none",
            padding: 0,
            display: "flex",
            alignItems: "center",
            gap: 10,
          }}
        >
          <img src="assets/logo.png" alt="" style={{ width: 36, height: 36, objectFit: "contain", borderRadius: 7 }} />                
          <span
            style={{
              fontFamily: "'Playfair Display', Georgia, serif",
              fontWeight: 700,
              fontSize: 20,
              color: "var(--text)",
              letterSpacing: "-0.02em",
            }}
          >
            Mandos Rotos
          </span>
        </button>

        {/* Nav links */}
        <nav style={{ display: "flex", gap: 4 }}>
          {LINKS.map((link) => {
            const isActive = active === link.id;
            return (
              <button
                key={link.id}
                onClick={() => setPage(link.id)}
                style={{
                  padding: "7px 16px",
                  borderRadius: 8,
                  fontSize: 14,
                  fontWeight: 500,
                  transition: "all 0.2s",
                  background: isActive ? "var(--gold)" : "transparent",
                  color: isActive ? "#0c0c0e" : "var(--muted)",
                  letterSpacing: "0.01em",
                }}
                onMouseEnter={e => {
                  if (!isActive) {
                    e.currentTarget.style.color = "var(--text)";
                    e.currentTarget.style.background = "var(--surface2)";
                  }
                }}
                onMouseLeave={e => {
                  if (!isActive) {
                    e.currentTarget.style.color = "var(--muted)";
                    e.currentTarget.style.background = "transparent";
                  }
                }}
              >
                {link.label}
              </button>
            );
          })}
        </nav>
      </div>
    </header>
  );
}
