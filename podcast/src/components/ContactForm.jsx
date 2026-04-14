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

const errorInputStyle = {
  ...inputStyle,
  border: "2px solid #e05c3a",
};

export default function ContactForm({ onSuccess }) {
  const [form, setForm] = useState({
    name: "", email: "", subject: "sugerencia", message: "",
  });
  const [errors, setErrors] = useState({});
  const [focused, setFocused] = useState(null);

  const handle = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
    // Limpiar error al escribir
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: "" }));
    }
  };

  const validate = () => {
    const newErrors = {};
    if (!form.name.trim()) newErrors.name = "El nombre es obligatorio.";
    if (!form.email.trim()) {
      newErrors.email = "El email es obligatorio.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      newErrors.email = "Introduce un email con formato válido (ejemplo@correo.com).";
    }
    if (!form.message.trim()) newErrors.message = "El mensaje no puede estar vacío.";
    return newErrors;
  };

  const submit = (e) => {
    e.preventDefault();
    const newErrors = validate();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      // Mover el foco al primer campo con error
      const firstErrorField = Object.keys(newErrors)[0];
      document.getElementById(firstErrorField)?.focus();
      return;
    }
    onSuccess();
  };

  const getFocusStyle = (name) => {
    if (errors[name]) return errorInputStyle;
    return focused === name
      ? { ...inputStyle, borderColor: "var(--gold)", boxShadow: "0 0 0 3px rgba(245,200,66,0.1)" }
      : inputStyle;
  };

  return (
    // noValidate desactiva validación nativa del navegador para usar la nuestra accesible
    <form onSubmit={submit} noValidate style={{ display: "flex", flexDirection: "column", gap: 18 }}>

      {/* aria-live="polite" anuncia errores dinámicos a lectores de pantalla */}
      <div aria-live="polite" aria-atomic="true" className="sr-only">
        {Object.values(errors).filter(Boolean).length > 0 &&
          `Hay ${Object.values(errors).filter(Boolean).length} errores en el formulario. ${Object.values(errors).filter(Boolean).join(" ")}`
        }
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
        {/* Campo Nombre */}
        <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
          {/* htmlFor vincula el label al input */}
          <label
            htmlFor="name"
            style={{ fontSize: 12, fontWeight: 500, color: "var(--muted)", letterSpacing: "0.04em", textTransform: "uppercase" }}
          >
            Nombre <span aria-hidden="true">*</span>
            <span className="sr-only">(obligatorio)</span>
          </label>
          <input
            id="name"
            name="name"
            type="text"
            required
            value={form.name}
            onChange={handle}
            placeholder="Tu nombre"
            aria-describedby={errors.name ? "name-error" : undefined}
            aria-invalid={errors.name ? "true" : "false"}
            style={getFocusStyle("name")}
            onFocus={() => setFocused("name")}
            onBlur={() => setFocused(null)}
          />
          {errors.name && (
            <span id="name-error" role="alert" style={{ fontSize: 12, color: "#e05c3a", marginTop: 2 }}>
              {errors.name}
            </span>
          )}
        </div>

        {/* Campo Email */}
        <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
          <label
            htmlFor="email"
            style={{ fontSize: 12, fontWeight: 500, color: "var(--muted)", letterSpacing: "0.04em", textTransform: "uppercase" }}
          >
            Correo electrónico <span aria-hidden="true">*</span>
            <span className="sr-only">(obligatorio)</span>
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            value={form.email}
            onChange={handle}
            placeholder="tu@email.com"
            aria-describedby={errors.email ? "email-error" : undefined}
            aria-invalid={errors.email ? "true" : "false"}
            style={getFocusStyle("email")}
            onFocus={() => setFocused("email")}
            onBlur={() => setFocused(null)}
          />
          {errors.email && (
            <span id="email-error" role="alert" style={{ fontSize: 12, color: "#e05c3a", marginTop: 2 }}>
              {errors.email}
            </span>
          )}
        </div>
      </div>

      {/* Campo Motivo */}
      <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
        <label
          htmlFor="subject"
          style={{ fontSize: 12, fontWeight: 500, color: "var(--muted)", letterSpacing: "0.04em", textTransform: "uppercase" }}
        >
          Motivo
        </label>
        <select
          id="subject"
          name="subject"
          value={form.subject}
          onChange={handle}
          style={getFocusStyle("subject")}
          onFocus={() => setFocused("subject")}
          onBlur={() => setFocused(null)}
        >
          <option value="sugerencia">Sugerencia de tema</option>
          <option value="colaboracion">Quiero colaborar</option>
          <option value="otro">Otro</option>
        </select>
      </div>

      {/* Campo Mensaje */}
      <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
        <label
          htmlFor="message"
          style={{ fontSize: 12, fontWeight: 500, color: "var(--muted)", letterSpacing: "0.04em", textTransform: "uppercase" }}
        >
          Mensaje <span aria-hidden="true">*</span>
          <span className="sr-only">(obligatorio)</span>
        </label>
        <textarea
          id="message"
          name="message"
          required
          value={form.message}
          onChange={handle}
          rows={5}
          placeholder="Cuéntanos tu idea o mensaje..."
          aria-describedby={errors.message ? "message-error" : undefined}
          aria-invalid={errors.message ? "true" : "false"}
          style={{ ...getFocusStyle("message"), resize: "vertical", lineHeight: 1.6 }}
          onFocus={() => setFocused("message")}
          onBlur={() => setFocused(null)}
        />
        {errors.message && (
          <span id="message-error" role="alert" style={{ fontSize: 12, color: "#e05c3a", marginTop: 2 }}>
            {errors.message}
          </span>
        )}
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
        Enviar mensaje
      </button>
    </form>
  );
}
