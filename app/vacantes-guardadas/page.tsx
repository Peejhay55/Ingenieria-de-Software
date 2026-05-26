"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

type Job = {
  id: string;
  title: string;
  company: string;
  location: string;
  modality: string;
  salaryMin: number;
  salaryMax: number;
  skills: string[];
};

const savedVacanciesStorageKey = "jobmaxxing_saved_vacancies";

export default function VacantesGuardadasPage() {
  const [savedJobs, setSavedJobs] = useState<Job[]>([]);

  useEffect(() => {
    if (typeof window === "undefined") return;

    try {
      const rawSavedJobs = window.localStorage.getItem(savedVacanciesStorageKey);
      setSavedJobs(rawSavedJobs ? (JSON.parse(rawSavedJobs) as Job[]) : []);
    } catch {
      setSavedJobs([]);
    }
  }, []);

  const removeSavedJob = (jobId: string) => {
    setSavedJobs((currentJobs) => {
      const nextJobs = currentJobs.filter((job) => job.id !== jobId);
      window.localStorage.setItem(savedVacanciesStorageKey, JSON.stringify(nextJobs));
      return nextJobs;
    });
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
          Perfil
        </p>
        <h1 style={{ fontSize: 36, fontWeight: 900, margin: 0, letterSpacing: "-0.05em" }}>
          Vacantes guardadas
        </h1>
        <p style={{ marginTop: 12, marginBottom: 28, color: "#a3a3a3", lineHeight: 1.6, maxWidth: 760 }}>
          Aquí verás las vacantes que marcaste con el corazón para revisarlas después.
        </p>

        <section
          style={{
            border: "1px solid #222",
            borderRadius: 24,
            backgroundColor: "rgba(20, 20, 20, 0.92)",
            padding: 24,
            boxShadow: "0 24px 60px rgba(0, 0, 0, 0.28)",
          }}
        >
          {savedJobs.length === 0 ? (
            <div style={{ color: "#a3a3a3", lineHeight: 1.6 }}>
              Aún no guardaste vacantes. Vuelve al panel y presiona el corazón en las que te interesen.
            </div>
          ) : (
            <div style={{ display: "grid", gap: 16 }}>
              {savedJobs.map((job) => (
                <article
                  key={job.id}
                  style={{
                    backgroundColor: "#111827",
                    border: "1px solid #243041",
                    borderRadius: 20,
                    padding: 20,
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "flex-start",
                    gap: 20,
                  }}
                >
                  <div>
                    <div style={{ fontSize: 20, fontWeight: 800, color: "#fff" }}>{job.title}</div>
                    <div style={{ color: "#93c5fd", fontWeight: 600, marginBottom: 8 }}>{job.company}</div>
                    <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                      <span style={{ fontSize: 12, padding: "4px 8px", backgroundColor: "#1f2937", borderRadius: 6, color: "#d1d5db" }}>{job.modality}</span>
                      <span style={{ fontSize: 12, padding: "4px 8px", backgroundColor: "#1f2937", borderRadius: 6, color: "#d1d5db" }}>{job.location}</span>
                      <span style={{ fontSize: 12, padding: "4px 8px", backgroundColor: "#1f2937", borderRadius: 6, color: "#d1d5db" }}>${job.salaryMin} - ${job.salaryMax}</span>
                    </div>
                    <p style={{ marginTop: 12, marginBottom: 0, color: "#9ca3af", fontSize: 13 }}>
                      Skills: {job.skills.join(", ")}
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={() => removeSavedJob(job.id)}
                    aria-label="Quitar vacante guardada"
                    style={{
                      width: 46,
                      height: 46,
                      borderRadius: 999,
                      border: "1px solid #ef4444",
                      backgroundColor: "rgba(239, 68, 68, 0.14)",
                      color: "#ef4444",
                      cursor: "pointer",
                      display: "grid",
                      placeItems: "center",
                      flexShrink: 0,
                    }}
                  >
                    <svg viewBox="0 0 24 24" width="22" height="22" fill="currentColor" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <path d="M12 21s-7-4.5-9.5-9A5.9 5.9 0 0 1 12 5a5.9 5.9 0 0 1 9.5 7c-2.5 4.5-9.5 9-9.5 9Z" />
                    </svg>
                  </button>
                </article>
              ))}
            </div>
          )}
        </section>

        <div style={{ marginTop: 24, display: "flex", gap: 12, flexWrap: "wrap" }}>
          <Link href="/mvp" style={{ color: "#93c5fd", textDecoration: "none", fontWeight: 700, padding: "12px 18px", borderRadius: 12, border: "1px solid #263241" }}>
            Volver al panel
          </Link>
          <Link href="/" style={{ color: "#ededed", textDecoration: "none", fontWeight: 700, padding: "12px 18px", borderRadius: 12, border: "1px solid #333", backgroundColor: "#111827" }}>
            Home
          </Link>
        </div>
      </div>
    </main>
  );
}
