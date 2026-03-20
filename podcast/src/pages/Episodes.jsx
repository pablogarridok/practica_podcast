import EpisodeCard from "../components/EpisodeCard";
import { EPISODES,  } from "../data/episodes";

export default function Episodes() {
  return (
    <div style={{ maxWidth: 1100, margin: "0 auto", padding: "100px 28px 80px" }}>

      <div className="animate-fade-up" style={{ marginBottom: 48 }}>
        
        <h2
          style={{
            margin: 0,
            fontFamily: "'Playfair Display', serif",
            fontWeight: 900,
            fontSize: "clamp(32px, 4vw, 48px)",
            color: "var(--text)",
            letterSpacing: "-0.02em",
            lineHeight: 1.1,
          }}
        >
          Todos los{" "}
          <em style={{ color: "var(--gold)", fontStyle: "italic" }}>episodios</em>
        </h2>
        <p style={{ margin: "10px 0 0", fontSize: 15, color: "var(--muted)" }}>
          Si quieres saber como no jugar escúhanos.
        </p>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 14, marginBottom: 56 }}>
        {EPISODES.map((episode, i) => (
          <EpisodeCard key={episode.id} episode={episode} index={i} />
        ))}
      </div>

      
    </div>
  );
}
