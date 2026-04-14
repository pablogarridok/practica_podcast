import AudioPlayer from "../components/AudioPlayer";
import { EPISODES } from "../data/episodes";
import { useState } from "react";

export default function Home({ setPage }) {
  const latest = EPISODES[0];
  const [muted, setMuted] = useState(true);

  return (
    <div style={{ maxWidth: 1100, margin: "0 auto", padding: "0 28px 80px" }}>

      <section
        aria-labelledby="hero-heading"
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

          <h1
            id="hero-heading"
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
            Jugamos mal,{" "}
            <em style={{ color: "var(--gold)", fontStyle: "italic" }}>opinamos peor.</em>
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
            En{" "}
            <strong style={{ color: "var(--text)" }}>Mandos Rotos</strong>, morimos en el
            tutorial y culpamos al lag, aun así venimos a opinar sin ningún tipo de vergüenza.
            Si pestañeas no te lo pierdes.
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
              Ver todos los episodios
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
              Participar en el podcast
            </button>
          </div>
        </div>

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
            <div
              aria-hidden="true"
              style={{
                position: "absolute",
                inset: -20,
                border: "1px solid rgba(255,255,255,0.08)",
                borderRadius: "50%",
              }}
            />

            {/* Video decorativo: aria-hidden porque no aporta contenido informativo */}
            <video
              src="/assets/video_podcast.mp4"
              autoPlay
              loop
              muted={muted}
              playsInline
              aria-hidden="true"
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                borderRadius: 32,
                position: "absolute",
                inset: 0,
              }}
            />

            {/* Botón de silencio con aria-label descriptivo */}
            <button
              onClick={() => setMuted(m => !m)}
              aria-label={muted ? "Activar sonido del vídeo" : "Silenciar vídeo"}
              aria-pressed={!muted}
              style={{
                position: "absolute",
                bottom: 12,
                left: 12,
                zIndex: 10,
                background: "rgba(0,0,0,0.5)",
                border: "1px solid rgba(255,255,255,0.2)",
                borderRadius: 8,
                color: "white",
                fontSize: 18,
                padding: "4px 8px",
                cursor: "pointer",
              }}
            >
              <span aria-hidden="true">{muted ? "🔇" : "🔊"}</span>
            </button>
          </div>
        </div>
      </section>

      {/* Sección del último episodio */}
      <section
        aria-labelledby="latest-heading"
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
            {/* h2 correcto: subtítulo dentro del main, debajo del h1 */}
            <h2
              id="latest-heading"
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
            aria-label={`Duración: ${latest.duration}`}
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
    </div>
  );
}
