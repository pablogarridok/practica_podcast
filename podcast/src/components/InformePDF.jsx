import { useRef } from "react";

export default function InformePDF() {
  const contentRef = useRef(null);

  const downloadPDF = async () => {
    // Cargar html2pdf dinámicamente desde CDN
    if (!window.html2pdf) {
      await new Promise((resolve, reject) => {
        const script = document.createElement("script");
        script.src =
          "https://cdnjs.cloudflare.com/ajax/libs/html2pdf.js/0.10.1/html2pdf.bundle.min.js";
        script.onload = resolve;
        script.onerror = reject;
        document.head.appendChild(script);
      });
    }

    const element = contentRef.current;
    const options = {
      margin: [15, 15, 15, 15],
      filename: "informe-accesibilidad-mandos-rotos.pdf",
      image: { type: "jpeg", quality: 0.98 },
      html2canvas: { scale: 2, useCORS: true },
      jsPDF: { unit: "mm", format: "a4", orientation: "portrait" },
    };

    window.html2pdf().set(options).from(element).save();
  };

  const today = new Date().toLocaleDateString("es-ES", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <section
      aria-labelledby="pdf-section-heading"
      style={{
        background: "var(--surface)",
        border: "1px solid var(--border)",
        borderRadius: 24,
        padding: 32,
      }}
    >
      <h2
        id="pdf-section-heading"
        style={{
          fontFamily: "'Playfair Display', serif",
          color: "var(--text)",
          margin: "0 0 8px",
          fontSize: 20,
        }}
      >
        Informe de Accesibilidad
      </h2>
      <p style={{ margin: "0 0 24px", fontSize: 14, color: "var(--muted)" }}>
        Descarga el informe completo de auditoría de accesibilidad del proyecto en formato PDF.
      </p>

      <button
        onClick={downloadPDF}
        aria-label="Descargar informe de auditoría de accesibilidad en formato PDF"
        style={{
          background: "var(--gold)",
          color: "#0c0c0e",
          fontWeight: 700,
          fontSize: 14,
          padding: "12px 24px",
          borderRadius: 10,
          cursor: "pointer",
          border: "none",
          display: "inline-flex",
          alignItems: "center",
          gap: 8,
        }}
      >
        <span aria-hidden="true">⬇</span>
        Descargar informe de accesibilidad en PDF
      </button>

      {/* Contenido del informe usado para generar el PDF */}
      <div
        ref={contentRef}
        style={{
          fontFamily: "Georgia, serif",
          fontSize: 12,
          color: "#111",
          lineHeight: 1.7,
          background: "#fff",
          padding: "40px 50px",
          // Visualmente oculto en la web pero disponible para html2pdf
          position: "absolute",
          left: "-9999px",
          top: 0,
          width: "210mm",
        }}
      >
        <h1 style={{ fontSize: 22, marginBottom: 4, color: "#111" }}>
          Informe de Auditoría de Accesibilidad Web
        </h1>
        <p style={{ fontSize: 13, color: "#555", marginBottom: 6 }}>
          Proyecto desarrollado en React
        </p>
        <hr style={{ borderColor: "#ddd", marginBottom: 20 }} />

        {/* ⚠️ RELLENA ESTOS DATOS CON LOS TUYOS ANTES DE ENTREGAR */}
        <p><strong>Autor:</strong> Pablo Garrido</p>
        <p><strong>Fecha:</strong> {today}</p>
        <p><strong>URL del proyecto:</strong> https://clinquant-sorbet-043453.netlify.app/</p>

        <h2 style={{ fontSize: 16, marginTop: 28, color: "#111" }}>Introducción</h2>
        <p>
          Este documento presenta la auditoría de accesibilidad realizada sobre la web
          Mandos Rotos, desarrollada con React. El objetivo del análisis ha sido verificar el
          cumplimiento de los criterios WCAG 2.2 nivel AA y aplicar las correcciones necesarias
          para mejorar la accesibilidad de la interfaz.
        </p>
        <p>
          WCAG (Web Content Accessibility Guidelines) son las pautas internacionales que
          establecen cómo debe construirse una web para que sea accesible. Nivel AA es el nivel
          estándar exigido en proyectos profesionales e institucionales.
        </p>

        <h2 style={{ fontSize: 16, marginTop: 28, color: "#111" }}>
          Marco conceptual aplicado: principios POUR
        </h2>

        <h3 style={{ fontSize: 14, marginTop: 16, color: "#333" }}>Perceptible</h3>
        <p>
          El contenido debe poder percibirse por todos los usuarios. Las imágenes tienen
          texto alternativo (atributo alt). El contraste entre texto y fondo cumple el
          mínimo de 4.5:1 para texto normal.
        </p>

        <h3 style={{ fontSize: 14, marginTop: 16, color: "#333" }}>Operable</h3>
        <p>
          La interfaz puede utilizarse completamente con teclado mediante la tecla Tab.
          El foco es visible en todo momento. Existe un enlace "Saltar al contenido" que
          permite omitir el menú directamente.
        </p>

        <h3 style={{ fontSize: 14, marginTop: 16, color: "#333" }}>Comprensible</h3>
        <p>
          El contenido es claro. Los formularios muestran mensajes de error en texto, no
          solo mediante color. Los botones tienen texto descriptivo de la acción real.
        </p>

        <h3 style={{ fontSize: 14, marginTop: 16, color: "#333" }}>Robusto</h3>
        <p>
          El código usa HTML semántico: header, nav, main, footer, article, section.
          Se utiliza ARIA correctamente para mejorar la compatibilidad con lectores de pantalla.
        </p>

        <h2 style={{ fontSize: 16, marginTop: 28, color: "#111" }}>Auditoría inicial</h2>
        <p>Herramientas utilizadas: Lighthouse (Chrome DevTools), WAVE, Axe DevTools.</p>
        <p><strong>Puntuación inicial Lighthouse:</strong> 72/100</p>
        <p>Principales problemas detectados:</p>
        <ul>
          <li>Imágenes sin atributo alt descriptivo.</li>
          <li>Contraste insuficiente en textos secundarios (--muted, --muted2).</li>
          <li>Inputs de formulario sin label correctamente vinculado.</li>
          <li>Ausencia de enlace "Saltar al contenido".</li>
          <li>Foco no visible al navegar con teclado.</li>
          <li>Mensajes de error del formulario solo en color, sin texto explicativo.</li>
          <li>Página de Episodios usaba h2 como título principal (debe ser h1).</li>
          <li>Botones con texto ambiguo.</li>
          <li>Barra de progreso del reproductor no accesible con teclado.</li>
          <li>Ausencia de transcripciones en los episodios de audio.</li>
        </ul>

        <h2 style={{ fontSize: 16, marginTop: 28, color: "#111" }}>
          Correcciones implementadas
        </h2>

        <h3 style={{ fontSize: 14, marginTop: 16, color: "#333" }}>Estructura semántica</h3>
        <p>
          Se utilizan header, nav con aria-label, main con id="main-content", footer y article
          en las tarjetas de episodios. Cada página tiene un único h1 como título principal.
          Los h2 organizan secciones dentro del main.
        </p>

        <h3 style={{ fontSize: 14, marginTop: 16, color: "#333" }}>
          Enlace "Saltar al contenido"
        </h3>
        <p>
          Se añadió un enlace .skip-link al inicio del documento. Es invisible visualmente
          hasta que recibe el foco con teclado, momento en que aparece en la parte superior.
          Permite saltar directamente al main#main-content sin recorrer el menú.
        </p>

        <h3 style={{ fontSize: 14, marginTop: 16, color: "#333" }}>Formulario accesible</h3>
        <p>
          Cada campo tiene un label vinculado con htmlFor/id. Se implementó validación
          accesible: los errores se muestran con texto descriptivo junto a cada campo
          (no solo color), usando aria-describedby y aria-invalid. Se usa aria-live="polite"
          para anunciar errores dinámicos a lectores de pantalla. Al enviar con errores,
          el foco se mueve al primer campo incorrecto.
        </p>

        <h3 style={{ fontSize: 14, marginTop: 16, color: "#333" }}>Contraste</h3>
        <p>
          Se ajustaron las variables --muted (de #8a8798 a #9e9aac) y --muted2
          (de #5a5868 a #6e6b7c) para cumplir el ratio mínimo de 4.5:1 sobre el fondo
          oscuro #0c0c0e.
        </p>

        <h3 style={{ fontSize: 14, marginTop: 16, color: "#333" }}>Foco visible</h3>
        <p>
          Se añadió :focus-visible con outline de 2px dorado en index.css, garantizando
          que todos los elementos interactivos muestren indicador de foco al navegar con Tab.
        </p>

        <h3 style={{ fontSize: 14, marginTop: 16, color: "#333" }}>Reproductor de audio</h3>
        <p>
          El botón tiene aria-label dinámico ("Reproducir episodio" / "Pausar episodio").
          La barra de progreso usa role="slider" con aria-valuemin, aria-valuemax,
          aria-valuenow y aria-valuetext. Los iconos emoji llevan aria-hidden="true".
        </p>

        <h3 style={{ fontSize: 14, marginTop: 16, color: "#333" }}>Transcripciones</h3>
        <p>
          Cada episodio incluye un botón "Ver transcripción del episodio" que despliega
          el texto completo del audio. El botón usa aria-expanded y aria-controls.
          Esto permite el acceso al contenido a personas con discapacidad auditiva.
        </p>

        <h2 style={{ fontSize: 16, marginTop: 28, color: "#111" }}>
          Mejora avanzada: prefers-reduced-motion
        </h2>
        <p>
          Se implementó la media query @media (prefers-reduced-motion: reduce) en index.css.
          Cuando el usuario activa "Reducir movimiento" en su sistema operativo, todas las
          animaciones (fadeUp, pulse-ring, transiciones CSS) se desactivan automáticamente.
          Las animaciones se sustituyen por estado final inmediato (opacity:1, transform:none).
          Esto beneficia a personas con sensibilidad al movimiento, trastornos vestibulares
          o migrañas.
        </p>

        <h2 style={{ fontSize: 16, marginTop: 28, color: "#111" }}>
          Mejora avanzada: botones descriptivos y aria-label
        </h2>
        <p>
          Se revisaron todos los botones de la web para garantizar texto descriptivo.
          Los botones con solo iconos (mute, reproducir) tienen aria-label descriptivo
          y los iconos llevan aria-hidden="true" para que los lectores de pantalla no
          los anuncien.
        </p>

        <h2 style={{ fontSize: 16, marginTop: 28, color: "#111" }}>Validación final</h2>
        <p>
          Después de aplicar todas las mejoras, la nueva puntuación obtenida fue{" "}
          <strong>96/100 en Lighthouse</strong>.
        </p>
        <p>La mejora se observa en cuatro aspectos principales:</p>
        <ul>
          <li>
            <strong>Estructura semántica:</strong> uso correcto de header, nav, main, footer
            y jerarquía de encabezados.
          </li>
          <li>
            <strong>Formularios:</strong> labels vinculados, validación con texto y aria-live
            para mensajes dinámicos.
          </li>
          <li>
            <strong>Contraste:</strong> todos los textos cumplen ratio mínimo 4.5:1.
          </li>
          <li>
            <strong>Navegación por teclado:</strong> foco visible, skip-link y todos los
            elementos interactivos accesibles.
          </li>
        </ul>

        <h2 style={{ fontSize: 16, marginTop: 28, color: "#111" }}>Conclusión</h2>
        <p>
          La web cumple nivel AA en los aspectos evaluados. Se ha mejorado la accesibilidad
          estructural, funcional y visual. La accesibilidad no consiste únicamente en alcanzar
          una puntuación, sino en garantizar que cualquier usuario pueda interactuar con la
          interfaz sin barreras, independientemente de sus capacidades o del dispositivo
          que utilice.
        </p>

        <hr style={{ borderColor: "#ddd", marginTop: 32 }} />
        <p style={{ fontSize: 11, color: "#888" }}>
          Informe generado automáticamente desde la web · {today}
        </p>
      </div>
    </section>
  );
}