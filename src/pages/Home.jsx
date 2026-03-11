import AudioPlayer from "../components/AudioPlayer";
import { EPISODES } from "../data/episodes";

export default function Home({ setPage }) {
  const latest = EPISODES[0];

  return (
    <div style={{ maxWidth: 1100, margin: "0 auto", padding: "0 28px 80px" }}>

      {/* ── Hero ─────────────────────────────────────────── */}
      <section
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 420px",
          gap: 64,
          alignItems: "center",
          paddingTop: 120,
          paddingBottom: 80,
        }}
      >
        <div className="animate-fade-up" style={{ display: "flex", flexDirection: "column", gap: 22 }}>
          {/* Badge */}
          <span
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 7,
              background: "rgba(245,200,66,0.1)",
              border: "1px solid rgba(245,200,66,0.25)",
              color: "var(--gold)",
              fontSize: 11,
              fontWeight: 700,
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              padding: "5px 12px",
              borderRadius: 99,
              width: "fit-content",
            }}
          >
            <span style={{ width: 6, height: 6, borderRadius: "50%", background: "var(--gold)", animation: "pulse-ring 1.8s infinite" }} />
            Nuevo episodio disponible
          </span>

          <h1
            style={{
              margin: 0,
              fontFamily: "'Playfair Display', Georgia, serif",
              fontWeight: 900,
              fontSize: "clamp(42px, 5vw, 64px)",
              lineHeight: 1.1,
              color: "var(--text)",
              letterSpacing: "-0.02em",
            }}
          >
            Tu podcast,{" "}
            <em style={{ color: "var(--gold)", fontStyle: "italic" }}>tu historia.</em>
          </h1>

          <p
            className="animate-fade-up animate-delay-1"
            style={{
              margin: 0,
              fontSize: 17,
              color: "var(--muted)",
              lineHeight: 1.7,
              maxWidth: 480,
            }}
          >
            Bienvenido a{" "}
            <strong style={{ color: "var(--text)" }}>MiPodcast</strong>, un espacio
            donde exploramos tecnología, creatividad y todo lo que nos apasiona.
            Nuevos episodios cada semana.
          </p>

          <div
            className="animate-fade-up animate-delay-2"
            style={{ display: "flex", gap: 12, marginTop: 8 }}
          >
            <button
              onClick={() => setPage("episodes")}
              style={{
                background: "var(--gold)",
                color: "#0c0c0e",
                fontWeight: 700,
                fontSize: 14,
                padding: "12px 24px",
                borderRadius: 10,
                transition: "all 0.18s",
                letterSpacing: "0.01em",
              }}
              onMouseEnter={e => { e.currentTarget.style.background = "#f7d564"; e.currentTarget.style.transform = "translateY(-1px)"; }}
              onMouseLeave={e => { e.currentTarget.style.background = "var(--gold)"; e.currentTarget.style.transform = "none"; }}
            >
              Ver episodios →
            </button>
            <button
              onClick={() => setPage("contact")}
              style={{
                background: "transparent",
                color: "var(--muted)",
                fontWeight: 500,
                fontSize: 14,
                padding: "12px 24px",
                borderRadius: 10,
                border: "1px solid var(--border)",
                transition: "all 0.18s",
              }}
              onMouseEnter={e => { e.currentTarget.style.color = "var(--text)"; e.currentTarget.style.borderColor = "var(--border2)"; }}
              onMouseLeave={e => { e.currentTarget.style.color = "var(--muted)"; e.currentTarget.style.borderColor = "var(--border)"; }}
            >
              Participar
            </button>
          </div>
        </div>

        {/* Cover art */}
        <div
          className="animate-fade-up animate-delay-2"
          style={{ position: "relative" }}
        >
          <div
            style={{
              aspectRatio: "1",
              borderRadius: 32,
              background: "linear-gradient(135deg, #f5c842 0%, #f5a623 50%, #e05c3a 100%)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 96,
              boxShadow: "0 40px 80px rgba(245,166,35,0.2), 0 0 0 1px rgba(255,255,255,0.06)",
              position: "relative",
              overflow: "hidden",
            }}
          >
            {/* Decorative ring */}
            <div
              style={{
                position: "absolute",
                inset: -20,
                border: "1px solid rgba(255,255,255,0.08)",
                borderRadius: "50%",
              }}
            />
            🎙️
          </div>
          <div
            style={{
              position: "absolute",
              bottom: -16,
              right: -16,
              width: 72,
              height: 72,
              borderRadius: 18,
              background: "var(--surface2)",
              border: "1px solid var(--border)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 30,
              boxShadow: "0 8px 24px rgba(0,0,0,0.4)",
            }}
          >
            🎧
          </div>
        </div>
      </section>

      {/* ── Latest episode player ────────────────────────── */}
      <section
        className="animate-fade-up animate-delay-3"
        style={{
          background: "var(--surface)",
          border: "1px solid var(--border)",
          borderRadius: 24,
          padding: 32,
          display: "flex",
          flexDirection: "column",
          gap: 20,
          marginBottom: 40,
          boxShadow: "0 2px 40px rgba(0,0,0,0.25)",
        }}
      >
        <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 16 }}>
          <div>
            <p
              style={{
                margin: "0 0 4px",
                fontSize: 10,
                fontWeight: 700,
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                color: "var(--muted2)",
              }}
            >
              Empieza a escucharnos
            </p>
            <h2
              style={{
                margin: 0,
                fontFamily: "'Playfair Display', serif",
                fontWeight: 700,
                fontSize: 22,
                color: "var(--text)",
              }}
            >
              {latest.title}
            </h2>
            <p style={{ margin: "6px 0 0", fontSize: 14, color: "var(--muted)", lineHeight: 1.5 }}>
              {latest.description}
            </p>
          </div>
          <span
            style={{
              flexShrink: 0,
              fontFamily: "'DM Mono', monospace",
              fontSize: 13,
              color: "var(--gold)",
              padding: "4px 10px",
              background: "rgba(245,200,66,0.08)",
              borderRadius: 6,
              border: "1px solid rgba(245,200,66,0.18)",
            }}
          >
            {latest.duration}
          </span>
        </div>
        <AudioPlayer src={latest.src} />
      </section>

      {/* ── Stats ───────────────────────────────────────── */}
      <section
        className="animate-fade-up animate-delay-4"
        style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 16 }}
      >
        {[
          { value: EPISODES.length, label: "Episodios" },
          { value: "4.9 ★", label: "Valoración" },
          { value: "Semanal", label: "Frecuencia" },
        ].map((s) => (
          <div
            key={s.label}
            style={{
              background: "var(--surface)",
              border: "1px solid var(--border)",
              borderRadius: 18,
              padding: "28px 20px",
              textAlign: "center",
              position: "relative",
              overflow: "hidden",
            }}
          >
            {/* Decorative top accent line */}
            <div
              style={{
                position: "absolute",
                top: 0,
                left: "25%",
                right: "25%",
                height: 2,
                background: "linear-gradient(90deg, transparent, var(--gold), transparent)",
                borderRadius: 99,
              }}
            />
            <p
              style={{
                margin: 0,
                fontFamily: "'Playfair Display', serif",
                fontWeight: 900,
                fontSize: 36,
                color: "var(--gold)",
                lineHeight: 1,
              }}
            >
              {s.value}
            </p>
            <p style={{ margin: "6px 0 0", fontSize: 12, color: "var(--muted2)", letterSpacing: "0.06em", textTransform: "uppercase", fontWeight: 500 }}>
              {s.label}
            </p>
          </div>
        ))}
      </section>
    </div>
  );
}
