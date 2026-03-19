import { useAudioPlayer } from "../hooks/useAudioPlayer";

export default function AudioPlayer({ src, mini = false }) {
  const { audioRef, playing, progress, currentTime, duration, toggle, seek } =
    useAudioPlayer();

  return (
    <div
      style={{
        background: "var(--surface2)",
        borderRadius: mini ? 12 : 16,
        padding: mini ? "10px 14px" : "16px 20px",
        display: "flex",
        alignItems: "center",
        gap: 14,
        border: "1px solid var(--border)",
      }}
    >
      <audio ref={audioRef} src={src || undefined} preload="metadata" />

      {/* Play/Pause button */}
      <button
        onClick={toggle}
        aria-label={playing ? "Pausar" : "Reproducir"}
        style={{
          flexShrink: 0,
          width: mini ? 36 : 44,
          height: mini ? 36 : 44,
          borderRadius: "50%",
          background: "var(--gold)",
          color: "#0c0c0e",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: mini ? 14 : 18,
          transition: "transform 0.15s, background 0.2s",
          animation: playing ? "pulse-ring 1.8s infinite" : "none",
        }}
        onMouseEnter={e => e.currentTarget.style.transform = "scale(1.08)"}
        onMouseLeave={e => e.currentTarget.style.transform = "scale(1)"}
      >
        {playing ? "⏸" : "▶"}
      </button>

      {/* Progress */}
      <div style={{ flex: 1, minWidth: 0 }}>
        <div
          style={{
            height: 4,
            background: "var(--border2)",
            borderRadius: 99,
            cursor: "pointer",
            position: "relative",
            overflow: "hidden",
          }}
          onClick={seek}
        >
          <div
            style={{
              height: "100%",
              background: "linear-gradient(90deg, var(--gold), #f5a623)",
              borderRadius: 99,
              transition: "width 0.25s linear",
              width: `${progress}%`,
            }}
          />
        </div>
        {!mini && (
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginTop: 6,
              fontSize: 11,
              color: "var(--muted2)",
              fontFamily: "'DM Mono', monospace",
            }}
          >
            <span>{currentTime}</span>
            <span>{duration}</span>
          </div>
        )}
      </div>
    </div>
  );
}
