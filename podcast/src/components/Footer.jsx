export default function Footer() {
  return (
    <footer
      style={{
        borderTop: "1px solid var(--border)",
        padding: "32px 28px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        flexWrap: "wrap",
        gap: 12,
        maxWidth: 1100,
        margin: "0 auto",
      }}
    >
      <span
        style={{
          fontFamily: "'Playfair Display', serif",
          fontWeight: 700,
          fontSize: 16,
          color: "var(--gold)",
        }}
      >
        MiPodcast
      </span>
      <p style={{ color: "var(--muted2)", fontSize: 13, margin: 0 }}>
        © 2026 · Practica  · 
      </p>
      
    </footer>
  );
}
