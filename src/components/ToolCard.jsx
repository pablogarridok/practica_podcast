import { useState } from "react";

export default function ToolCard({ tool }) {
  const { icon, name, desc } = tool;
  const [hovered, setHovered] = useState(false);

  return (
    <div
      style={{
        background: hovered ? "var(--surface2)" : "var(--surface)",
        border: `1px solid ${hovered ? "rgba(245,200,66,0.25)" : "var(--border)"}`,
        borderRadius: 14,
        padding: "18px 14px",
        textAlign: "center",
        transition: "all 0.2s",
        transform: hovered ? "translateY(-2px)" : "none",
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div style={{ fontSize: 28, marginBottom: 8 }}>{icon}</div>
      <p style={{ margin: 0, fontWeight: 600, fontSize: 13, color: "var(--text)" }}>{name}</p>
      <p style={{ margin: "3px 0 0", fontSize: 11, color: "var(--muted2)", lineHeight: 1.4 }}>{desc}</p>
    </div>
  );
}
