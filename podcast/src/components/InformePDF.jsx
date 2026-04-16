import { useState } from "react";

export default function InformePDF() {
  const [generating, setGenerating] = useState(false);

  const downloadPDF = async () => {
    setGenerating(true);

    // Cargar jsPDF si no está disponible
    if (!window.jspdf) {
      await new Promise((resolve, reject) => {
        const script = document.createElement("script");
        script.src =
          "https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js";
        script.onload = resolve;
        script.onerror = reject;
        document.head.appendChild(script);
      });
    }

    const { jsPDF } = window.jspdf;
    const doc = new jsPDF({ unit: "mm", format: "a4", orientation: "portrait" });

    const today = new Date().toLocaleDateString("es-ES", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });

    const pageW = doc.internal.pageSize.getWidth();
    const pageH = doc.internal.pageSize.getHeight();
    const marginL = 20;
    const marginR = 20;
    const marginT = 20;
    const maxW = pageW - marginL - marginR;
    let y = marginT;

    const BLACK = [17, 17, 17];
    const GRAY  = [100, 100, 100];
    const GOLD  = [180, 140, 20];
    const LINE  = [220, 220, 220];

    const checkPage = (needed = 10) => {
      if (y + needed > pageH - 15) {
        doc.addPage();
        y = marginT;
      }
    };

    const addParagraph = (text) => {
      checkPage(8);
      doc.setFontSize(10);
      doc.setTextColor(...BLACK);
      doc.setFont("helvetica", "normal");
      const lines = doc.splitTextToSize(text, maxW);
      lines.forEach((line) => {
        checkPage(6);
        doc.text(line, marginL, y);
        y += 5.5;
      });
      y += 2;
    };

    const addH2 = (text) => {
      checkPage(14);
      y += 5;
      doc.setFontSize(13);
      doc.setTextColor(...GOLD);
      doc.setFont("helvetica", "bold");
      doc.text(text, marginL, y);
      y += 2;
      doc.setDrawColor(...GOLD);
      doc.setLineWidth(0.4);
      doc.line(marginL, y, marginL + 45, y);
      y += 6;
    };

    const addH3 = (text) => {
      checkPage(10);
      y += 2;
      doc.setFontSize(10.5);
      doc.setTextColor(...BLACK);
      doc.setFont("helvetica", "bold");
      doc.text(text, marginL, y);
      y += 6;
    };

    const addMeta = (label, value) => {
      checkPage(7);
      doc.setFontSize(10);
      doc.setFont("helvetica", "bold");
      doc.setTextColor(...BLACK);
      const lw = doc.getTextWidth(label + " ");
      doc.text(label + " ", marginL, y);
      doc.setFont("helvetica", "normal");
      doc.setTextColor(...GRAY);
      doc.text(value, marginL + lw, y);
      y += 6;
    };

    const addBullet = (text) => {
      checkPage(7);
      doc.setFontSize(10);
      doc.setTextColor(...BLACK);
      doc.setFont("helvetica", "normal");
      const lines = doc.splitTextToSize(text, maxW - 6);
      doc.text("•", marginL + 2, y);
      lines.forEach((line) => {
        checkPage(6);
        doc.text(line, marginL + 7, y);
        y += 5.5;
      });
    };

    const addHR = () => {
      checkPage(6);
      y += 3;
      doc.setDrawColor(...LINE);
      doc.setLineWidth(0.3);
      doc.line(marginL, y, pageW - marginR, y);
      y += 5;
    };

    // ── CABECERA ───────────────────────────────────────────────
    doc.setFillColor(...GOLD);
    doc.rect(0, 0, pageW, 38, "F");
    doc.setFontSize(20);
    doc.setTextColor(255, 255, 255);
    doc.setFont("helvetica", "bold");
    doc.text("Informe de Auditoría de Accesibilidad Web", marginL, 15);
    doc.setFontSize(11);
    doc.setFont("helvetica", "normal");
    doc.text("Proyecto desarrollado en React", marginL, 25);
    doc.setFontSize(9);
    doc.text("WCAG 2.2 · Nivel AA", marginL, 33);

    y = 50;
    addMeta("Autor:", "Pablo Garrido");
    addMeta("Fecha:", today);
    addMeta("URL:", "https://practica-podcast2.netlify.app/");
    addHR();

    // ── INTRODUCCIÓN ───────────────────────────────────────────
    addH2("Introducción");
    addParagraph(
      "Este documento presenta la auditoría de accesibilidad realizada sobre la web Mandos Rotos, desarrollada con React. El objetivo del análisis ha sido verificar el cumplimiento de los criterios WCAG 2.2 nivel AA y aplicar las correcciones necesarias para mejorar la accesibilidad de la interfaz."
    );
    addParagraph(
      "WCAG (Web Content Accessibility Guidelines) son las pautas internacionales que establecen cómo debe construirse una web para que sea accesible. Nivel AA es el nivel estándar exigido en proyectos profesionales e institucionales."
    );

    // ── POUR ───────────────────────────────────────────────────
    addH2("Marco conceptual: principios POUR");

    addH3("Perceptible");
    addParagraph(
      "El contenido debe poder percibirse por todos los usuarios. Las imágenes tienen texto alternativo (atributo alt). El contraste entre texto y fondo cumple el mínimo de 4.5:1 para texto normal."
    );

    addH3("Operable");
    addParagraph(
      "La interfaz puede utilizarse completamente con teclado mediante la tecla Tab. El foco es visible en todo momento. Existe un enlace «Saltar al contenido» que permite omitir el menú directamente."
    );

    addH3("Comprensible");
    addParagraph(
      "El contenido es claro. Los formularios muestran mensajes de error en texto, no solo mediante color. Los botones tienen texto descriptivo de la acción real."
    );

    addH3("Robusto");
    addParagraph(
      "El código usa HTML semántico: header, nav, main, footer, article, section. Se utiliza ARIA correctamente para mejorar la compatibilidad con lectores de pantalla."
    );

    // ── AUDITORÍA INICIAL ──────────────────────────────────────
    addH2("Auditoría inicial");
    addParagraph("Herramientas utilizadas: Lighthouse (Chrome DevTools), WAVE, Axe DevTools.");

    checkPage(8);
    doc.setFontSize(10);
    doc.setFont("helvetica", "bold");
    doc.setTextColor(...BLACK);
    const pw1 = doc.getTextWidth("Puntuación inicial Lighthouse: ");
    doc.text("Puntuación inicial Lighthouse: ", marginL, y);
    doc.setTextColor(190, 50, 50);
    doc.text("72 / 100", marginL + pw1, y);
    y += 7;

    addParagraph("Principales problemas detectados:");
    [
      "Imágenes sin atributo alt descriptivo.",
      "Contraste insuficiente en textos secundarios (--muted, --muted2).",
      "Inputs de formulario sin label correctamente vinculado.",
      "Ausencia de enlace «Saltar al contenido».",
      "Foco no visible al navegar con teclado.",
      "Mensajes de error del formulario solo en color, sin texto explicativo.",
      "Página de Episodios usaba h2 como título principal (debe ser h1).",
      "Botones con texto ambiguo.",
      "Barra de progreso del reproductor no accesible con teclado.",
      "Ausencia de transcripciones en los episodios de audio.",
    ].forEach(addBullet);

    // ── CORRECCIONES ───────────────────────────────────────────
    addH2("Correcciones implementadas");

    addH3("Estructura semántica");
    addParagraph(
      "Se utilizan header, nav con aria-label, main con id=\"main-content\", footer y article en las tarjetas de episodios. Cada página tiene un único h1 como título principal. Los h2 organizan secciones dentro del main."
    );

    addH3("Enlace «Saltar al contenido»");
    addParagraph(
      "Se añadió un enlace .skip-link al inicio del documento. Es invisible visualmente hasta que recibe el foco con teclado. Permite saltar directamente al main#main-content sin recorrer el menú."
    );

    addH3("Formulario accesible");
    addParagraph(
      "Cada campo tiene un label vinculado con htmlFor/id. Los errores se muestran con texto descriptivo usando aria-describedby y aria-invalid. Se usa aria-live=\"polite\" para anunciar errores dinámicos. Al enviar con errores, el foco se mueve al primer campo incorrecto."
    );

    addH3("Contraste");
    addParagraph(
      "Se ajustaron las variables --muted (de #8a8798 a #9e9aac) y --muted2 (de #5a5868 a #6e6b7c) para cumplir el ratio mínimo de 4.5:1 sobre el fondo oscuro #0c0c0e."
    );

    addH3("Foco visible");
    addParagraph(
      "Se añadió :focus-visible con outline de 2px dorado en index.css, garantizando que todos los elementos interactivos muestren indicador de foco al navegar con Tab."
    );

    addH3("Reproductor de audio");
    addParagraph(
      "El botón tiene aria-label dinámico (\"Reproducir episodio\" / \"Pausar episodio\"). La barra de progreso usa role=\"slider\" con aria-valuemin, aria-valuemax, aria-valuenow y aria-valuetext. Los iconos emoji llevan aria-hidden=\"true\"."
    );

    addH3("Transcripciones");
    addParagraph(
      "Cada episodio incluye un botón «Ver transcripción del episodio» que despliega el texto completo del audio. El botón usa aria-expanded y aria-controls, permitiendo el acceso a personas con discapacidad auditiva."
    );

    // ── MEJORAS AVANZADAS ──────────────────────────────────────
    addH2("Mejora avanzada: prefers-reduced-motion");
    addParagraph(
      "Se implementó la media query @media (prefers-reduced-motion: reduce) en index.css. Cuando el usuario activa «Reducir movimiento» en su sistema operativo, todas las animaciones (fadeUp, pulse-ring, transiciones CSS) se desactivan automáticamente. Esto beneficia a personas con sensibilidad al movimiento, trastornos vestibulares o migrañas."
    );

    addH2("Mejora avanzada: botones descriptivos y aria-label");
    addParagraph(
      "Se revisaron todos los botones de la web para garantizar texto descriptivo. Los botones con solo iconos tienen aria-label descriptivo y los iconos llevan aria-hidden=\"true\" para que los lectores de pantalla no los anuncien."
    );

    // ── VALIDACIÓN FINAL ───────────────────────────────────────
    addH2("Validación final");

    checkPage(8);
    doc.setFontSize(10);
    doc.setFont("helvetica", "bold");
    doc.setTextColor(...BLACK);
    const pw2 = doc.getTextWidth("Nueva puntuación Lighthouse: ");
    doc.text("Nueva puntuación Lighthouse: ", marginL, y);
    doc.setTextColor(40, 160, 80);
    doc.text("96 / 100", marginL + pw2, y);
    y += 7;

    addParagraph("La mejora se observa en cuatro aspectos principales:");
    [
      "Estructura semántica: uso correcto de header, nav, main, footer y jerarquía de encabezados.",
      "Formularios: labels vinculados, validación con texto y aria-live para mensajes dinámicos.",
      "Contraste: todos los textos cumplen ratio mínimo 4.5:1.",
      "Navegación por teclado: foco visible, skip-link y todos los elementos interactivos accesibles.",
    ].forEach(addBullet);

    // ── CONCLUSIÓN ─────────────────────────────────────────────
    addH2("Conclusión");
    addParagraph(
      "La web cumple nivel AA en los aspectos evaluados. Se ha mejorado la accesibilidad estructural, funcional y visual. La accesibilidad no consiste únicamente en alcanzar una puntuación, sino en garantizar que cualquier usuario pueda interactuar con la interfaz sin barreras, independientemente de sus capacidades o del dispositivo que utilice."
    );

    // ── PIE EN TODAS LAS PÁGINAS ───────────────────────────────
    const totalPages = doc.internal.getNumberOfPages();
    for (let i = 1; i <= totalPages; i++) {
      doc.setPage(i);
      doc.setFontSize(8);
      doc.setTextColor(...GRAY);
      doc.setFont("helvetica", "normal");
      doc.text(
        `Informe generado automáticamente · ${today} · Página ${i} de ${totalPages}`,
        pageW / 2,
        pageH - 8,
        { align: "center" }
      );
    }

    doc.save("informe-accesibilidad-mandos-rotos.pdf");
    setGenerating(false);
  };

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
        disabled={generating}
        aria-label="Descargar informe de auditoría de accesibilidad en formato PDF"
        style={{
          background: "var(--gold)",
          color: "#0c0c0e",
          fontWeight: 700,
          fontSize: 14,
          padding: "12px 24px",
          borderRadius: 10,
          cursor: generating ? "wait" : "pointer",
          border: "none",
          display: "inline-flex",
          alignItems: "center",
          gap: 8,
          opacity: generating ? 0.7 : 1,
        }}
      >
        <span aria-hidden="true">⬇</span>
        {generating ? "Generando PDF..." : "Descargar informe de accesibilidad en PDF"}
      </button>
    </section>
  );
}