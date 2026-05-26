"use client";

import { useState } from "react";
import Link from "next/link";

export default function AjustesPage() {
  const [selectedCvFiles, setSelectedCvFiles] = useState<string[]>([]);
  const [feedbackMessage, setFeedbackMessage] = useState<string>("");

  const handleCvSelection = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files ?? []);
    setSelectedCvFiles(files.map((file) => file.name));
    setFeedbackMessage(files.length > 0 ? `Listo: ${files.length} archivo(s) PDF seleccionado(s).` : "");
  };

  const handleSave = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setFeedbackMessage("Cambios listos para guardar. Conecta aquí la lógica del backend cuando quieras persistirlos.");
  };

  return (
    <main
      style={{
        minHeight: "100vh",
        padding: "40px 24px 56px",
        background:
          "radial-gradient(circle at top, rgba(59, 130, 246, 0.16), transparent 32%), linear-gradient(180deg, #0a0a0a 0%, #070707 100%)",
        color: "#ededed",
        fontFamily: "system-ui",
      }}
    >
      <div style={{ maxWidth: 980, margin: "0 auto" }}>
        <p style={{ marginBottom: 16, color: "#60a5fa", fontSize: 12, fontWeight: 800, textTransform: "uppercase", letterSpacing: "0.08em" }}>
          Cuenta
        </p>
        <h1 style={{ fontSize: 36, fontWeight: 900, margin: 0, letterSpacing: "-0.05em" }}>
          Ajustes
        </h1>
        <p style={{ marginTop: 12, marginBottom: 28, color: "#a3a3a3", lineHeight: 1.6, maxWidth: 760 }}>
          Administra tu perfil, cambia credenciales, define preferencias laborales y sube tu CV en PDF desde un solo lugar.
        </p>

        <form onSubmit={handleSave} style={{ display: "grid", gap: 20 }}>
          <section
            style={{
              border: "1px solid #222",
              borderRadius: 24,
              backgroundColor: "rgba(20, 20, 20, 0.92)",
              padding: 24,
              boxShadow: "0 24px 60px rgba(0, 0, 0, 0.28)",
            }}
          >
            <h2 style={{ marginTop: 0, marginBottom: 8, fontSize: 20 }}>Datos personales</h2>
            <p style={{ marginTop: 0, marginBottom: 20, color: "#a3a3a3" }}>Edita la información básica de tu cuenta.</p>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: 16 }}>
              <label style={{ display: "grid", gap: 8 }}>
                <span style={{ fontSize: 12, fontWeight: 800, color: "#93c5fd", textTransform: "uppercase", letterSpacing: "0.06em" }}>Nombre y Apellidos</span>
                <input
                  type="text"
                  placeholder="Tu nombre completo"
                  style={{ width: "100%", padding: "14px 16px", borderRadius: 14, border: "1px solid #303030", backgroundColor: "#0b0b0b", color: "#ededed", outline: "none" }}
                />
              </label>

              <label style={{ display: "grid", gap: 8 }}>
                <span style={{ fontSize: 12, fontWeight: 800, color: "#93c5fd", textTransform: "uppercase", letterSpacing: "0.06em" }}>Cambio de correo</span>
                <input
                  type="email"
                  placeholder="nuevo-correo@ejemplo.com"
                  style={{ width: "100%", padding: "14px 16px", borderRadius: 14, border: "1px solid #303030", backgroundColor: "#0b0b0b", color: "#ededed", outline: "none" }}
                />
              </label>
            </div>
          </section>

          <section
          style={{
            border: "1px solid #222",
            borderRadius: 24,
            backgroundColor: "rgba(20, 20, 20, 0.92)",
            padding: 24,
            boxShadow: "0 24px 60px rgba(0, 0, 0, 0.28)",
          }}
          >
            <h2 style={{ marginTop: 0, marginBottom: 8, fontSize: 20 }}>Cambio de contraseña</h2>
            <p style={{ marginTop: 0, marginBottom: 20, color: "#a3a3a3" }}>Mantén tu cuenta segura actualizando tus credenciales.</p>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 16 }}>
              <label style={{ display: "grid", gap: 8 }}>
                <span style={{ fontSize: 12, fontWeight: 800, color: "#93c5fd", textTransform: "uppercase", letterSpacing: "0.06em" }}>Contraseña actual</span>
                <input
                  type="password"
                  placeholder="••••••••"
                  style={{ width: "100%", padding: "14px 16px", borderRadius: 14, border: "1px solid #303030", backgroundColor: "#0b0b0b", color: "#ededed", outline: "none" }}
                />
              </label>

              <label style={{ display: "grid", gap: 8 }}>
                <span style={{ fontSize: 12, fontWeight: 800, color: "#93c5fd", textTransform: "uppercase", letterSpacing: "0.06em" }}>Nueva contraseña</span>
                <input
                  type="password"
                  placeholder="••••••••"
                  style={{ width: "100%", padding: "14px 16px", borderRadius: 14, border: "1px solid #303030", backgroundColor: "#0b0b0b", color: "#ededed", outline: "none" }}
                />
              </label>

              <label style={{ display: "grid", gap: 8 }}>
                <span style={{ fontSize: 12, fontWeight: 800, color: "#93c5fd", textTransform: "uppercase", letterSpacing: "0.06em" }}>Confirmar contraseña</span>
                <input
                  type="password"
                  placeholder="••••••••"
                  style={{ width: "100%", padding: "14px 16px", borderRadius: 14, border: "1px solid #303030", backgroundColor: "#0b0b0b", color: "#ededed", outline: "none" }}
                />
              </label>
            </div>
          </section>

          <section
            style={{
              border: "1px solid #222",
              borderRadius: 24,
              backgroundColor: "rgba(20, 20, 20, 0.92)",
              padding: 24,
              boxShadow: "0 24px 60px rgba(0, 0, 0, 0.28)",
            }}
          >
            <h2 style={{ marginTop: 0, marginBottom: 8, fontSize: 20 }}>Preferencias laborales</h2>
            <p style={{ marginTop: 0, marginBottom: 20, color: "#a3a3a3" }}>Define cómo quieres trabajar y qué tipo de oportunidades te interesan.</p>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 16 }}>
              <label style={{ display: "grid", gap: 8 }}>
                <span style={{ fontSize: 12, fontWeight: 800, color: "#93c5fd", textTransform: "uppercase", letterSpacing: "0.06em" }}>Modalidad</span>
                <select style={{ width: "100%", padding: "14px 16px", borderRadius: 14, border: "1px solid #303030", backgroundColor: "#0b0b0b", color: "#ededed", outline: "none" }}>
                  <option value="remote">Remoto</option>
                  <option value="hybrid">Híbrido</option>
                  <option value="onsite">Presencial</option>
                </select>
              </label>

              <label style={{ display: "grid", gap: 8 }}>
                <span style={{ fontSize: 12, fontWeight: 800, color: "#93c5fd", textTransform: "uppercase", letterSpacing: "0.06em" }}>Cargo objetivo</span>
                <input
                  type="text"
                  placeholder="Ej. Frontend Developer"
                  style={{ width: "100%", padding: "14px 16px", borderRadius: 14, border: "1px solid #303030", backgroundColor: "#0b0b0b", color: "#ededed", outline: "none" }}
                />
              </label>

              <label style={{ display: "grid", gap: 8 }}>
                <span style={{ fontSize: 12, fontWeight: 800, color: "#93c5fd", textTransform: "uppercase", letterSpacing: "0.06em" }}>Expectativa salarial</span>
                <input
                  type="number"
                  placeholder="2000000"
                  style={{ width: "100%", padding: "14px 16px", borderRadius: 14, border: "1px solid #303030", backgroundColor: "#0b0b0b", color: "#ededed", outline: "none" }}
                />
              </label>
            </div>
          </section>

          <section
            style={{
              border: "1px solid #222",
              borderRadius: 24,
              backgroundColor: "rgba(20, 20, 20, 0.92)",
              padding: 24,
              boxShadow: "0 24px 60px rgba(0, 0, 0, 0.28)",
            }}
          >
            <h2 style={{ marginTop: 0, marginBottom: 8, fontSize: 20 }}>Montar CV</h2>
            <p style={{ marginTop: 0, marginBottom: 20, color: "#a3a3a3" }}>Sube uno o varios PDF para construir tu CV o guardar versiones.</p>

            <label
              style={{
                display: "grid",
                gap: 12,
                padding: 24,
                borderRadius: 20,
                border: "1px dashed #3b82f6",
                backgroundColor: "rgba(59, 130, 246, 0.08)",
                cursor: "pointer",
              }}
            >
              <span style={{ fontWeight: 800, color: "#dbeafe" }}>Arrastra o selecciona PDFs</span>
              <span style={{ color: "#a3a3a3", fontSize: 14 }}>Formato aceptado: PDF. Puedes subir más de uno.</span>
              <input type="file" accept="application/pdf" multiple onChange={handleCvSelection} style={{ display: "none" }} />
              <span style={{ color: "#93c5fd", fontWeight: 700 }}>Seleccionar archivos</span>
            </label>

            {selectedCvFiles.length > 0 && (
              <div style={{ marginTop: 18 }}>
                <p style={{ margin: 0, marginBottom: 10, fontSize: 12, fontWeight: 800, color: "#93c5fd", textTransform: "uppercase", letterSpacing: "0.06em" }}>Archivos cargados</p>
                <ul style={{ margin: 0, paddingLeft: 18, color: "#ededed", display: "grid", gap: 6 }}>
                  {selectedCvFiles.map((fileName) => (
                    <li key={fileName}>{fileName}</li>
                  ))}
                </ul>
              </div>
            )}
          </section>

          <div style={{ display: "flex", flexWrap: "wrap", gap: 14, alignItems: "center", justifyContent: "space-between" }}>
            <div style={{ color: "#a3a3a3", minHeight: 24 }}>{feedbackMessage}</div>

            <div style={{ display: "flex", gap: 12 }}>
              <Link href="/mvp" style={{ color: "#93c5fd", textDecoration: "none", fontWeight: 700, padding: "12px 18px", borderRadius: 12, border: "1px solid #263241" }}>
                Volver al panel
              </Link>
              <button
                type="submit"
                style={{
                  padding: "12px 18px",
                  borderRadius: 12,
                  border: "none",
                  backgroundColor: "#3b82f6",
                  color: "white",
                  cursor: "pointer",
                  fontWeight: 800,
                }}
              >
                Guardar cambios
              </button>
            </div>
          </div>
        </form>
      </div>
    </main>
  );
}
