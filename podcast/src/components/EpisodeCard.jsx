import { useState } from "react";
import AudioPlayer from "./AudioPlayer";

export default function EpisodeCard({ episode, index = 0 }) {
  const { title, date, duration, description, src } = episode;
  const [hovered, setHovered] = useState(false);

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
        <div
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
          <p style={{ margin: 0 }}>{date}</p>
          <p style={{ margin: "2px 0 0", color: "var(--gold)" }}>{duration}</p>
        </div>
      </div>

      <AudioPlayer src={src} mini />
    </article>
  );
}
