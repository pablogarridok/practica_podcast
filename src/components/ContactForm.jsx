import { useState } from "react";

const inputStyle = {
  width: "100%",
  background: "var(--surface)",
  border: "1px solid var(--border)",
  borderRadius: 12,
  padding: "12px 16px",
  color: "var(--text)",
  fontSize: 14,
  outline: "none",
  transition: "border-color 0.2s",
};

export default function ContactForm({ onSuccess }) {
  const [form, setForm] = useState({
    name: "", email: "", subject: "sugerencia", message: "", file: null,
  });
  const [focused, setFocused] = useState(null);

  const handle = (e) => {
    const { name, value, files } = e.target;
    setForm(prev => ({ ...prev, [name]: files ? files[0] : value }));
  };
  const submit = (e) => {
    e.preventDefault();
    console.log("Form data:", form);
    onSuccess();
  };

  const getFocusStyle = (name) =>
    focused === name
      ? { ...inputStyle, borderColor: "var(--gold)", boxShadow: "0 0 0 3px rgba(245,200,66,0.1)" }
      : inputStyle;

  return (
    <form onSubmit={submit} style={{ display: "flex", flexDirection: "column", gap: 18 }}>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
        {[
          { name: "name", label: "Nombre *", type: "text", placeholder: "Tu nombre", required: true },
          { name: "email", label: "Email *", type: "email", placeholder: "tu@email.com", required: true },
        ].map(f => (
          <div key={f.name} style={{ display: "flex", flexDirection: "column", gap: 6 }}>
            <label style={{ fontSize: 12, fontWeight: 500, color: "var(--muted)", letterSpacing: "0.04em", textTransform: "uppercase" }}>
              {f.label}
            </label>
            <input
              name={f.name}
              type={f.type}
              required={f.required}
              value={form[f.name]}
              onChange={handle}
              placeholder={f.placeholder}
              style={getFocusStyle(f.name)}
              onFocus={() => setFocused(f.name)}
              onBlur={() => setFocused(null)}
            />
          </div>
        ))}
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
        <label style={{ fontSize: 12, fontWeight: 500, color: "var(--muted)", letterSpacing: "0.04em", textTransform: "uppercase" }}>
          Motivo
        </label>
        <select
          name="subject"
          value={form.subject}
          onChange={handle}
          style={getFocusStyle("subject")}
          onFocus={() => setFocused("subject")}
          onBlur={() => setFocused(null)}
        >
          <option value="sugerencia">💡 Sugerencia de tema</option>
          <option value="colaboracion">🤝 Quiero colaborar</option>
          <option value="otro">✉️ Otro</option>
        </select>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
        <label style={{ fontSize: 12, fontWeight: 500, color: "var(--muted)", letterSpacing: "0.04em", textTransform: "uppercase" }}>
          Mensaje *
        </label>
        <textarea
          name="message"
          required
          value={form.message}
          onChange={handle}
          rows={5}
          placeholder="Cuéntanos tu idea o mensaje..."
          style={{ ...getFocusStyle("message"), resize: "vertical", lineHeight: 1.6 }}
          onFocus={() => setFocused("message")}
          onBlur={() => setFocused(null)}
        />
      </div>

      

      <button
        type="submit"
        style={{
          background: "var(--gold)",
          color: "#0c0c0e",
          fontWeight: 700,
          fontSize: 15,
          padding: "14px 24px",
          borderRadius: 12,
          transition: "all 0.18s",
          letterSpacing: "0.01em",
        }}
        onMouseEnter={e => { e.currentTarget.style.background = "#f7d564"; e.currentTarget.style.transform = "translateY(-1px)"; }}
        onMouseLeave={e => { e.currentTarget.style.background = "var(--gold)"; e.currentTarget.style.transform = "none"; }}
      >
        Enviar mensaje 🚀
      </button>
    </form>
  );
}
