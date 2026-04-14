import { useState } from "react";
import AudioPlayer from "./AudioPlayer";

export default function EpisodeCard({ episode, index = 0 }) {
  const { title, date, duration, description, src, transcript } = episode;
  const [hovered, setHovered] = useState(false);
  const [showTranscript, setShowTranscript] = useState(false);

  return (
    <article
      className="animate-fade-up"
      style={{
        animationDelay: `${index * 0.08}s`,
        background: hovered ? "var(--surface2)" : "var(--surface)",
        border: `1px solid ${hovered ? "var(--border2)" : "var(--border)"}`,
        borderRadius: 20,
        padding: "22px 24px",
        display: "flex",
        flexDirection: "column",
        gap: 14,
        transition: "all 0.22s ease",
        cursor: "default",
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div style={{ display: "flex", gap: 16, alignItems: "flex-start" }}>
        {/* Número de episodio: aria-hidden porque la info está en el h3 */}
        <div
          aria-hidden="true"
          style={{
            flexShrink: 0,
            width: 42,
            height: 42,
            borderRadius: 10,
            background: "var(--gold-soft, rgba(245,200,66,0.08))",
            border: "1px solid rgba(245,200,66,0.2)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontFamily: "'DM Mono', monospace",
            fontSize: 13,
            fontWeight: 500,
            color: "var(--gold)",
          }}
        >
          #{episode.id}
        </div>

        <div style={{ flex: 1, minWidth: 0 }}>
          <h3
            style={{
              margin: 0,
              fontSize: 16,
              fontWeight: 600,
              color: "var(--text)",
              fontFamily: "'Playfair Display', serif",
              lineHeight: 1.3,
            }}
          >
            {/* Episodio N incluido para lectores de pantalla */}
            <span className="sr-only">Episodio {episode.id}: </span>
            {title}
          </h3>
          <p style={{ margin: "4px 0 0", fontSize: 13, color: "var(--muted)", lineHeight: 1.5 }}>
            {description}
          </p>
        </div>

        <div
          style={{
            flexShrink: 0,
            textAlign: "right",
            fontSize: 12,
            color: "var(--muted2)",
            fontFamily: "'DM Mono', monospace",
          }}
        >
          {/* time con datetime para semántica correcta */}
          <time dateTime={date} style={{ display: "block" }}>{date}</time>
          <span style={{ display: "block", marginTop: 2, color: "var(--gold)" }}>{duration}</span>
        </div>
      </div>

      <AudioPlayer src={src} mini />

      {/* Transcripción - requerida para accesibilidad de contenido de audio */}
      <div>
        <button
          onClick={() => setShowTranscript(v => !v)}
          aria-expanded={showTranscript}
          aria-controls={`transcript-${episode.id}`}
          style={{
            background: "transparent",
            color: "var(--muted)",
            fontSize: 12,
            fontWeight: 500,
            padding: "4px 0",
            textDecoration: "underline",
            cursor: "pointer",
            border: "none",
          }}
        >
          {showTranscript ? "Ocultar transcripción" : "Ver transcripción del episodio"}
        </button>

        {showTranscript && (
          <div
            id={`transcript-${episode.id}`}
            style={{
              marginTop: 12,
              padding: "14px 18px",
              background: "var(--bg)",
              border: "1px solid var(--border)",
              borderRadius: 12,
              fontSize: 13,
              color: "var(--muted)",
              lineHeight: 1.7,
              maxHeight: 200,
              overflowY: "auto",
            }}
          >
            <h4 style={{ margin: "0 0 8px", fontSize: 12, color: "var(--muted2)", textTransform: "uppercase", letterSpacing: "0.08em" }}>
              Transcripción
            </h4>
            <p style={{ margin: 0 }}>
              {transcript || "Transcripción no disponible para este episodio."}
            </p>
          </div>
        )}
      </div>
    </article>
  );
}
