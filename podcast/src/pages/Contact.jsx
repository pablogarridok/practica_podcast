import { useState, useEffect, useRef } from "react";
import ContactForm from "../components/ContactForm";
import InformePDF from "../components/InformePDF";

export default function Contact() {
  const [sent, setSent] = useState(false);
  const successRef = useRef(null);

  // Al enviarse el formulario, mover el foco al mensaje de éxito
  useEffect(() => {
    if (sent && successRef.current) {
      successRef.current.focus();
    }
  }, [sent]);

  return (
    <div style={{ maxWidth: 680, margin: "0 auto", padding: "100px 28px 80px" }}>

      {/* aria-live="polite" anuncia el cambio dinámico al lector de pantalla */}
      <div aria-live="polite" aria-atomic="true">
        {sent && (
          <div
            ref={successRef}
            tabIndex={-1}
            style={{
              padding: "60px 28px",
              textAlign: "center",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 16,
              outline: "none",
            }}
          >
            <div
              aria-hidden="true"
              style={{
                width: 80,
                height: 80,
                borderRadius: 24,
                background: "rgba(245,200,66,0.12)",
                border: "1px solid rgba(245,200,66,0.3)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 40,
              }}
            >
              🎉
            </div>
            <h1
              style={{
                margin: 0,
                fontFamily: "'Playfair Display', serif",
                fontWeight: 900,
                fontSize: 36,
                color: "var(--text)",
              }}
            >
              ¡Mensaje enviado!
            </h1>
            <p style={{ margin: 0, fontSize: 15, color: "var(--muted)", lineHeight: 1.6 }}>
              Gracias por tu participación. Te responderemos pronto.
            </p>
            <button
              onClick={() => setSent(false)}
              style={{
                marginTop: 8,
                background: "var(--gold)",
                color: "#0c0c0e",
                fontWeight: 700,
                fontSize: 14,
                padding: "12px 24px",
                borderRadius: 10,
              }}
            >
              Enviar otro mensaje
            </button>
          </div>
        )}
      </div>

      {!sent && (
        <>
          <div className="animate-fade-up" style={{ marginBottom: 40 }}>
            <p
              style={{
                margin: "0 0 10px",
                fontSize: 11,
                fontWeight: 700,
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                color: "var(--muted2)",
              }}
            >
              Únete a la comunidad
            </p>
            <h1
              style={{
                margin: 0,
                fontFamily: "'Playfair Display', serif",
                fontWeight: 900,
                fontSize: "clamp(30px, 4vw, 44px)",
                color: "var(--text)",
                letterSpacing: "-0.02em",
                lineHeight: 1.1,
              }}
            >
              Participa &{" "}
              <em style={{ color: "var(--gold)", fontStyle: "italic" }}>contáctanos</em>
            </h1>
            <p style={{ margin: "10px 0 0", fontSize: 15, color: "var(--muted)" }}>
              ¿Tienes una sugerencia, quieres colaborar o enviar tu propia grabación?
            </p>
          </div>

          <div
            className="animate-fade-up animate-delay-1"
            style={{
              background: "var(--surface)",
              border: "1px solid var(--border)",
              borderRadius: 24,
              padding: 32,
              marginBottom: 20,
            }}
          >
            <ContactForm onSuccess={() => setSent(true)} />
          </div>

          <div
            className="animate-fade-up animate-delay-2"
            style={{
              background: "var(--surface)",
              border: "1px solid var(--border)",
              borderRadius: 16,
              padding: "18px 22px",
              display: "flex",
              gap: 14,
              alignItems: "flex-start",
              marginBottom: 32,
            }}
          >
            <span aria-hidden="true" style={{ fontSize: 20, flexShrink: 0 }}>📜</span>
            <div>
              <p style={{ margin: "0 0 3px", fontWeight: 600, fontSize: 13, color: "var(--text)" }}>
                Licencia Creative Commons
              </p>
              <p style={{ margin: 0, fontSize: 12, color: "var(--muted)", lineHeight: 1.6 }}>
                Este podcast y su web están publicados bajo{" "}
                <strong style={{ color: "var(--text)" }}>CC BY-NC-SA 4.0</strong>. Puedes
                compartir y adaptar el contenido indicando la autoría, sin uso comercial y
                bajo la misma licencia.
              </p>
            </div>
          </div>

          {/* Informe de accesibilidad en PDF - requisito de la práctica */}
          <div className="animate-fade-up animate-delay-3">
            <InformePDF />
          </div>
        </>
      )}
    </div>
  );
}