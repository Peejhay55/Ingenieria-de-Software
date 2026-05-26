/*"use client";

import { useEffect, useState } from "react";

type Preference = {
  modality: string;
  salaryExpect: number;
  mustHave: string[];
  niceToHave: string[];
};

type Profile = {
  id: string;
  fullName: string;
  email: string;
  location: string;
  targetRole: string;
  yearsExp: number;
  skills: string[];
  preference?: Preference;
};

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

type Recommendation = {
    job: Job;
    score: number;
    breakdown: {
      skillsScore: number;
      niceScore: number;
      modalityScore: number;
      salaryScore: number;
      mustHavePenalty: number;
      matchedSkills: number;
    };
  };
  
  type RecommendationsResponse = {
    profile: Profile;
    recommendations: Recommendation[];
  };

export default function MVPPage() {
  
  const inputStyle = { padding: '10px', borderRadius: '8px', border: '1px solid #ccc' };
  const buttonStyle = { marginTop: '20px', padding: '12px', width: '100%', backgroundColor: '#0070f3', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold' };

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    location: "Medellín",
    targetRole: "",
    yearsExp: 0,
    skills: "",
    modality: "remote",
    salaryExpect: 0
  });

  //función de envío
  const handleSubmitProfile = async () => {
    if (!sessionUserId) {
      setToast({ message: "Debes iniciar sesión antes de crear un perfil.", variant: "error" });
      return;
    }

    try {
      const res = await fetch("/api/profile", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId: sessionUserId,
          ...formData,
          skills: formData.skills.split(",").map(s => s.trim().toLowerCase()).filter(Boolean),
          preference: {
            modality: formData.modality,
            salaryExpect: Number(formData.salaryExpect),
            mustHave: [], // Puedes expandir esto luego
            niceToHave: []
          }
        }),
      });

      if (res.ok) {
        setToast({ message: "Perfil creado correctamente.", variant: "success" });
        window.location.reload(); // Recarga para ver el nuevo perfil en la lista
      } else {
        const err = await res.json();
        setToast({ message: `Error: ${err.error}`, variant: "error" });
      }
    } catch (error) {
                    borderRadius: 10,
                    padding: "10px",
  };

                    gap: 12,
                    alignItems: "center",
                    fontSize: 13,
  const [selectedProfileId, setSelectedProfileId] = useState<string>("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>("");
                    <strong>{p.fullName}</strong>
                    <div style={{ color: "#888", marginTop: 4 }}>


  useEffect(() => {
    async function load() {
                  <div style={{ color: "#9ca3af", fontWeight: 700, whiteSpace: "nowrap" }}>
        setLoading(true);
        setError("");

        const [pRes, jRes] = await Promise.all([
          fetch("/api/profile"),
          fetch("/api/jobs"),
        ]);

        if (!pRes.ok) throw new Error("No pude cargar perfiles");
        if (!jRes.ok) throw new Error("No pude cargar vacantes");

        const pData = await pRes.json();
        const jData = await jRes.json();

        setProfiles(pData);
        setJobs(jData);
      } catch (e) {
        setError(e instanceof Error ? e.message : "Error desconocido");
      } finally {
        setLoading(false);
      }
    }

    load();
  }, []);

  return (
    <main style={{ padding: 24, fontFamily: "system-ui" }}>
      <h1 style={{ fontSize: 28, fontWeight: 700, marginBottom: 8 }}>
        Profile Manager MVP (local)
      </h1>
      <p style={{ marginBottom: 24, opacity: 0.8 }}>
        UI mínima para ver el flujo: perfiles y vacantes (luego recomendaciones).
      </p>

      <section style={{ backgroundColor: '#f4f4f4', padding: 20, borderRadius: 12, marginBottom: 30, color: '#333' }}>
        <h2 style={{ marginTop: 0 }}>➕ Crear Perfil de Prueba</h2>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 15 }}>
          <input placeholder="Nombre Completo" onChange={e => setFormData({...formData, fullName: e.target.value})} style={inputStyle} />
          <input placeholder="Email" onChange={e => setFormData({...formData, email: e.target.value})} style={inputStyle} />
          <input placeholder="Ubicación" value={formData.location} onChange={e => setFormData({...formData, location: e.target.value})} style={inputStyle} />
          <input placeholder="Rol (ej: Java Developer)" onChange={e => setFormData({...formData, targetRole: e.target.value})} style={inputStyle} />
          <input type="number" placeholder="Años de experiencia" onChange={e => setFormData({...formData, yearsExp: parseInt(e.target.value)})} style={inputStyle} />
          <input placeholder="Skills (ej: java, spring, sql)" onChange={e => setFormData({...formData, skills: e.target.value})} style={inputStyle} />
          
          <select onChange={e => setFormData({...formData, modality: e.target.value})} style={inputStyle}>
            <option value="remote">Remoto</option>
            <option value="hybrid">Híbrido</option>
            <option value="onsite">Presencial</option>
          </select>
          
          <input type="number" placeholder="Expectativa Salarial" onChange={e => setFormData({...formData, salaryExpect: parseInt(e.target.value)})} style={inputStyle} />
        </div>
        
        <button onClick={handleSubmitProfile} style={buttonStyle}>Guardar Perfil en Base de Datos</button>
      </section>
      <div
  style={{
    display: "flex",
    gap: 12,
    alignItems: "center",
    marginBottom: 16,
    flexWrap: "wrap",
  }}
>
  <label style={{ fontWeight: 600 }}>Perfil:</label>

  <select
    value={selectedProfileId}
    onChange={(e) => setSelectedProfileId(e.target.value)}
    style={{ padding: 8, borderRadius: 8, border: "1px solid #ccc", minWidth: 280 }}
  >
    <option value="">-- Selecciona un perfil --</option>
    {profiles.map((p) => (
      <option key={p.id} value={p.id}>
        {p.fullName} ({p.email})
      </option>
    ))}
  </select>

  <button
  onClick={async () => {
    if (!selectedProfileId) {
      alert("Selecciona un perfil primero");
      return;
    }

    try {
      setRecsLoading(true);

      const res = await fetch(`/api/recomendaciones?profileId=${selectedProfileId}`);
      if (!res.ok) throw new Error("No pude generar recomendaciones");

      const data = await res.json();
      setRecs(data.recommendations);

    } catch (e) {
      alert(e instanceof Error ? e.message : "Error");
    } finally {
      setRecsLoading(false);
    }
  }}
  style={{
    padding: "8px 12px",
    borderRadius: 8,
    border: "1px solid #ccc",
    cursor: "pointer",
    fontWeight: 600,
  }}
>
  {recsLoading ? "Recomendando..." : "Recomendar"}
</button>
<section style={{ marginBottom: 16 }}>
  <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 8 }}>Recomendaciones</h2>

  {recs.length === 0 ? (
    <p style={{ opacity: 0.8 }}>Aún no has generado recomendaciones.</p>
  ) : (
    <div style={{ display: "grid", gap: 12 }}>
      {recs.map((r) => (
        <div
          key={r.job.id}
          style={{
            border: "1px solid #ddd",
            borderRadius: 12,
            padding: 12,
          }}
        >
          <div style={{ display: "flex", justifyContent: "space-between", gap: 12 }}>
            <div>
              <div style={{ fontWeight: 800 }}>{r.job.title}</div>
              <div style={{ fontSize: 12, opacity: 0.8 }}>
                {r.job.company} · {r.job.modality} · {r.job.location}
              </div>
              <div style={{ fontSize: 12, opacity: 0.8 }}>
                ${r.job.salaryMin}–${r.job.salaryMax}
              </div>
              <div style={{ fontSize: 12, opacity: 0.8 }}>
                Skills: {r.job.skills.join(", ")}
              </div>
            </div>

            <div style={{ textAlign: "right" }}>
              <div style={{ fontSize: 12, opacity: 0.8 }}>Score</div>
              <div style={{ fontSize: 26, fontWeight: 900 }}>{r.score}</div>
            </div>
            <button
  onClick={async () => {
    if (!selectedProfileId) return;

    try {
      const res = await fetch("/api/apply", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          profileId: selectedProfileId,
          jobId: r.job.id,
          score: r.score,
        }),
      });

      if (!res.ok) {
        const err = await res.json();
        setToast({ message: err.error ?? "Error aplicando.", variant: "error" });
        return;
      }

      setToast({ message: "Aplicación registrada.", variant: "success" });

    } catch (e) {
      setToast({ message: "Error aplicando.", variant: "error" });
    }
  }}
  style={{
    marginTop: 8,
    padding: "6px 10px",
    borderRadius: 8,
    border: "1px solid #ccc",
    cursor: "pointer",
    fontWeight: 600,
  }}
>
  Aplicar
</button>
          </div>

          <div style={{ marginTop: 8, fontSize: 12, opacity: 0.85 }}>
            Breakdown: skills {r.breakdown.skillsScore}, nice {r.breakdown.niceScore}, modality{" "}
            {r.breakdown.modalityScore}, salary {r.breakdown.salaryScore}, penalty{" "}
            {r.breakdown.mustHavePenalty}
          </div>
        </div>
      ))}
    </div>
  )}
</section>
</div>

      {loading && <p>Cargando…</p>}
      {error && <p style={{ color: "crimson" }}>{error}</p>}

      {!loading && !error && (
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
          <section style={{ border: "1px solid #ddd", borderRadius: 12, padding: 16 }}>
            <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 12 }}>Perfiles</h2>
            {profiles.length === 0 ? (
              <p>No hay perfiles.</p>
            ) : (
              <ul style={{ display: "grid", gap: 12, paddingLeft: 16 }}>
                {profiles.map((p) => (
                  <li key={p.id}>
                    <div style={{ fontWeight: 700 }}>{p.fullName}</div>
                    <div style={{ fontSize: 12, opacity: 0.8 }}>{p.email}</div>
                    <div style={{ fontSize: 12, opacity: 0.8 }}>
                      {p.targetRole} · {p.preference?.modality ?? "—"} · ${p.preference?.salaryExpect ?? 0}
                    </div>
                    <div style={{ fontSize: 12, opacity: 0.8 }}>
                      Skills: {p.skills.join(", ")}
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </section>

          <section style={{ border: "1px solid #ddd", borderRadius: 12, padding: 16 }}>
            <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 12 }}>Vacantes</h2>
            {jobs.length === 0 ? (
              <p>No hay vacantes.</p>
            ) : (
              <ul style={{ display: "grid", gap: 12, paddingLeft: 16 }}>
                {jobs.map((j) => (
                  <li key={j.id}>
                    <div style={{ fontWeight: 700 }}>{j.title}</div>
                    <div style={{ fontSize: 12, opacity: 0.8 }}>{j.company}</div>
                    <div style={{ fontSize: 12, opacity: 0.8 }}>
                      {j.modality} · {j.location} · ${j.salaryMin}–${j.salaryMax}
                    </div>
                    <div style={{ fontSize: 12, opacity: 0.8 }}>
                      Skills: {j.skills.join(", ")}
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </section>
        </div>
      )}
    </main>
  );
}
*/
"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { Toast } from "../components/toast";

type Preference = { modality: string; salaryExpect: number; mustHave: string[]; niceToHave: string[]; };
type Profile = { id: string; fullName: string; email: string; location: string; targetRole: string; yearsExp: number; skills: string[]; preference?: Preference; };
type Job = { id: string; title: string; company: string; location: string; modality: string; salaryMin: number; salaryMax: number; skills: string[]; };
type Recommendation = { job: Job; score: number; breakdown: { skillsScore: number; niceScore: number; modalityScore: number; salaryScore: number; mustHavePenalty: number; matchedSkills: number; }; };

const savedVacanciesStorageKey = "jobmaxxing_saved_vacancies";

export default function MVPPage() {
  const [profiles, setProfiles] = useState<Profile[]>([]);
  const [jobs, setJobs] = useState<Job[]>([]);
  const [showAllJobs, setShowAllJobs] = useState(false);
  const [footerProfilesPage, setFooterProfilesPage] = useState(0);
  const [footerJobsPage, setFooterJobsPage] = useState(0);
  const [selectedProfileId, setSelectedProfileId] = useState<string>("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>("");
  const [recs, setRecs] = useState<Recommendation[]>([]);
  const [recsLoading, setRecsLoading] = useState(false);
  const [sessionUserId, setSessionUserId] = useState<string | null>(null);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [savedJobs, setSavedJobs] = useState<Job[]>([]);
  const [savedJobsLoaded, setSavedJobsLoaded] = useState(false);
  const [toast, setToast] = useState<{ message: string; variant: "success" | "error" | "info" } | null>(null);
  const userMenuRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;

    setSessionUserId(window.localStorage.getItem("jobmaxxing_user"));
  }, []);

  useEffect(() => {
    if (!toast) return;
    const timer = window.setTimeout(() => setToast(null), 3200);
    return () => window.clearTimeout(timer);
  }, [toast]);

  useEffect(() => {
    if (typeof window === "undefined") return;

    try {
      const rawSavedJobs = window.localStorage.getItem(savedVacanciesStorageKey);
      setSavedJobs(rawSavedJobs ? (JSON.parse(rawSavedJobs) as Job[]) : []);
    } catch {
      setSavedJobs([]);
    } finally {
      setSavedJobsLoaded(true);
    }
  }, []);

  useEffect(() => {
    if (!savedJobsLoaded || typeof window === "undefined") return;
    window.localStorage.setItem(savedVacanciesStorageKey, JSON.stringify(savedJobs));
  }, [savedJobs, savedJobsLoaded]);

  useEffect(() => {
    function handleDocumentClick(event: MouseEvent) {
      if (!userMenuRef.current?.contains(event.target as Node)) {
        setUserMenuOpen(false);
      }
    }

    function handleEscapeKey(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setUserMenuOpen(false);
      }
    }

    document.addEventListener("mousedown", handleDocumentClick);
    document.addEventListener("keydown", handleEscapeKey);

    return () => {
      document.removeEventListener("mousedown", handleDocumentClick);
      document.removeEventListener("keydown", handleEscapeKey);
    };
  }, []);

  const handleLogout = () => {
    window.localStorage.removeItem("jobmaxxing_user");
    setSessionUserId(null);
    setUserMenuOpen(false);
    setToast({ message: "Sesión cerrada.", variant: "info" });
    window.location.href = "/login";
  };

  const isJobSaved = (jobId: string) => savedJobs.some((job) => job.id === jobId);

  const footerProfilesPageSize = 4;
  const footerProfilesPageCount = Math.max(1, Math.ceil(profiles.length / footerProfilesPageSize));
  const footerVisibleProfiles = profiles.slice(
    footerProfilesPage * footerProfilesPageSize,
    footerProfilesPage * footerProfilesPageSize + footerProfilesPageSize,
  );

  const footerJobsPageSize = 4;
  const footerJobsPageCount = Math.max(1, Math.ceil(jobs.length / footerJobsPageSize));
  const footerVisibleJobs = jobs.slice(
    footerJobsPage * footerJobsPageSize,
    footerJobsPage * footerJobsPageSize + footerJobsPageSize,
  );

  const toggleSavedJob = (job: Job) => {
    setSavedJobs((currentJobs) => {
      if (currentJobs.some((savedJob) => savedJob.id === job.id)) {
        setToast({ message: "Vacante quitada de guardadas.", variant: "info" });
        return currentJobs.filter((savedJob) => savedJob.id !== job.id);
      }

      setToast({ message: "Vacante guardada.", variant: "success" });
      return [job, ...currentJobs];
    });
  };

  const visibleJobs = showAllJobs ? jobs : jobs.slice(0, 5);
  const hasMoreJobs = jobs.length > 5;

  useEffect(() => {
    async function load() {
      try {
        setLoading(true);
        setError("");
        const [pRes, jRes] = await Promise.all([
          fetch("/api/profile"),
          fetch("/api/jobs"),
        ]);
        if (!pRes.ok || !jRes.ok) throw new Error("Error cargando datos");
        const pData = await pRes.json();
        const jData = await jRes.json();
        setProfiles(pData);
        setJobs(jData);
      } catch (e) {
        setError(e instanceof Error ? e.message : "Error desconocido");
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  return (
    <main style={{ padding: "40px 24px", fontFamily: "system-ui", backgroundColor: "#0a0a0a", color: "#ededed", minHeight: "100vh", position: "relative" }}>
      {toast && <Toast message={toast.message} variant={toast.variant} onClose={() => setToast(null)} />}
      
      {/* HEADER */}
      <header style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 48, maxWidth: "1200px", margin: "0 auto 48px auto" }}>
        <div>
          <h1 style={{ fontSize: 36, fontWeight: 900, margin: 0, letterSpacing: "-0.05em", color: "#fff" }}>
            Job<span style={{ color: "#3b82f6" }}>Maxxing</span>
          </h1>
          <p style={{ opacity: 0.5, marginTop: 4, fontSize: 14 }}>Dashboard de Optimización • v1.0</p>
        </div>
        
        {sessionUserId ? (
          <div ref={userMenuRef} style={{ position: "relative" }}>
            <button
              type="button"
              onClick={() => setUserMenuOpen((open) => !open)}
              aria-haspopup="menu"
              aria-expanded={userMenuOpen}
              aria-label="Abrir menú de usuario"
              style={{
                width: 48,
                height: 48,
                borderRadius: "999px",
                border: "1px solid #333",
                background: "linear-gradient(135deg, #1f2937, #0f172a)",
                color: "#fff",
                cursor: "pointer",
                display: "grid",
                placeItems: "center",
                boxShadow: "0 8px 24px rgba(0, 0, 0, 0.25)",
              }}
            >
              <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <circle cx="12" cy="8" r="4" />
                <path d="M4 20c1.9-3.5 5.1-5 8-5s6.1 1.5 8 5" />
              </svg>
            </button>

            {userMenuOpen && (
              <div
                role="menu"
                aria-label="Menú de usuario"
                style={{
                  position: "absolute",
                  top: "calc(100% + 12px)",
                  right: 0,
                  minWidth: 200,
                  padding: 8,
                  borderRadius: 16,
                  border: "1px solid #222",
                  backgroundColor: "#0f0f10",
                  boxShadow: "0 20px 40px rgba(0, 0, 0, 0.35)",
                  zIndex: 20,
                }}
              >
                <Link href="/ajustes" onClick={() => setUserMenuOpen(false)} style={{ display: "block", padding: "12px 14px", borderRadius: 12, color: "#ededed", textDecoration: "none", fontWeight: 600 }}>
                  Ajustes
                </Link>
                <Link href="/vacantes-guardadas" onClick={() => setUserMenuOpen(false)} style={{ display: "block", padding: "12px 14px", borderRadius: 12, color: "#ededed", textDecoration: "none", fontWeight: 600 }}>
                  Vacantes guardadas
                </Link>
                <button
                  type="button"
                  onClick={handleLogout}
                  style={{
                    width: "100%",
                    textAlign: "left",
                    padding: "12px 14px",
                    borderRadius: 12,
                    border: "none",
                    backgroundColor: "transparent",
                    color: "#fb7185",
                    cursor: "pointer",
                    fontWeight: 600,
                  }}
                >
                  Cerrar sesión
                </button>
              </div>
            )}
          </div>
        ) : (
          <div style={{ display: "flex", gap: 12 }}>
            <Link href="/login">
              <button style={{ padding: "10px 24px", borderRadius: 12, border: "1px solid #333", backgroundColor: "transparent", color: "#fff", cursor: "pointer", fontWeight: 600, transition: "0.2s" }}>
                Login
              </button>
            </Link>
            <Link href="/register">
              <button style={{ padding: "10px 24px", borderRadius: 12, border: "none", backgroundColor: "#3b82f6", color: "white", cursor: "pointer", fontWeight: 700, transition: "0.2s" }}>
                Register
              </button>
            </Link>
          </div>
        )}
      </header>

      <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
        
        {/* PANEL DE CONTROL (RECOMENDAR) */}
        <div style={{ backgroundColor: "#141414", padding: 24, borderRadius: 20, marginBottom: 40, display: "flex", gap: 20, alignItems: "center", border: "1px solid #222" }}>
          <div style={{ flex: 1 }}>
            <label style={{ display: "block", fontSize: 12, fontWeight: 700, color: "#3b82f6", textTransform: "uppercase", marginBottom: 8 }}>Seleccionar Candidato</label>
            <select
              value={selectedProfileId}
              onChange={(e) => setSelectedProfileId(e.target.value)}
              style={{ width: "100%", padding: "12px 16px", borderRadius: 12, backgroundColor: "#0a0a0a", color: "#fff", border: "1px solid #333", fontSize: 16, outline: "none" }}
            >
              <option value="">-- Selecciona un perfil para analizar --</option>
              {profiles.map((p) => (
                <option key={p.id} value={p.id}>{p.fullName} • {p.targetRole}</option>
              ))}
            </select>
          </div>

          <button
            onClick={async () => {
              if (!selectedProfileId) {
                setToast({ message: "Selecciona un perfil.", variant: "error" });
                return;
              }
              try {
                setRecsLoading(true);
                const res = await fetch(`/api/recomendaciones?profileId=${selectedProfileId}`);
                const data = await res.json();
                setRecs(data.recommendations);
              } catch (e) {
                setToast({ message: "Error generando recomendaciones.", variant: "error" });
              } finally {
                setRecsLoading(false);
              }
            }}
            style={{ alignSelf: "flex-end", padding: "14px 32px", borderRadius: 12, border: "none", backgroundColor: "#fff", color: "#000", cursor: "pointer", fontWeight: 800, fontSize: 16, transition: "0.2s" }}
          >
            {recsLoading ? "Procesando..." : "Ejecutar Algoritmo"}
          </button>
        </div>

        {/* RESULTADOS */}
        {recs.length > 0 && (
          <section style={{ marginBottom: 48 }}>
            <h2 style={{ fontSize: 24, fontWeight: 800, marginBottom: 24, color: "#fff" }}>Resultados de Matching</h2>
            <div style={{ display: "grid", gap: 16 }}>
              {recs.map((r) => (
                <div key={r.job.id} style={{ backgroundColor: "#141414", border: "1px solid #222", borderRadius: 20, padding: 24, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <div>
                    <div style={{ fontSize: 20, fontWeight: 800, color: "#fff" }}>{r.job.title}</div>
                    <div style={{ color: "#3b82f6", fontWeight: 600, marginBottom: 8 }}>{r.job.company}</div>
                    <div style={{ display: "flex", gap: 8 }}>
                      <span style={{ fontSize: 12, padding: "4px 8px", backgroundColor: "#222", borderRadius: 6, color: "#aaa" }}>{r.job.modality}</span>
                      <span style={{ fontSize: 12, padding: "4px 8px", backgroundColor: "#222", borderRadius: 6, color: "#aaa" }}>{r.job.location}</span>
                    </div>
                  </div>
                  <div style={{ textAlign: "right" }}>
                    <div style={{ fontSize: 11, color: "#555", fontWeight: 800, textTransform: "uppercase", marginBottom: 4 }}>Match Probability</div>
                    <div style={{ fontSize: 40, fontWeight: 900, color: r.score > 70 ? "#10b981" : r.score > 40 ? "#f59e0b" : "#ef4444" }}>
                      {r.score}%
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        <section style={{ marginBottom: 48 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20, gap: 16, flexWrap: "wrap" }}>
            <h2 style={{ fontSize: 24, fontWeight: 800, margin: 0, color: "#fff" }}>Vacantes disponibles</h2>
            <div style={{ color: "#9ca3af", fontSize: 14 }}>
              Guardadas: {savedJobs.length}
            </div>
          </div>

          <div style={{ display: "grid", gap: 16 }}>
            {jobs.length === 0 ? (
              <p style={{ color: "#9ca3af" }}>No hay vacantes para mostrar.</p>
            ) : (
              visibleJobs.map((job) => {
                const saved = isJobSaved(job.id);

                return (
                  <article
                    key={job.id}
                    style={{
                      backgroundColor: "#141414",
                      border: "1px solid #222",
                      borderRadius: 20,
                      padding: 24,
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "flex-start",
                      gap: 20,
                    }}
                  >
                    <div>
                      <div style={{ fontSize: 20, fontWeight: 800, color: "#fff" }}>{job.title}</div>
                      <div style={{ color: "#3b82f6", fontWeight: 600, marginBottom: 8 }}>{job.company}</div>
                      <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                        <span style={{ fontSize: 12, padding: "4px 8px", backgroundColor: "#222", borderRadius: 6, color: "#aaa" }}>{job.modality}</span>
                        <span style={{ fontSize: 12, padding: "4px 8px", backgroundColor: "#222", borderRadius: 6, color: "#aaa" }}>{job.location}</span>
                        <span style={{ fontSize: 12, padding: "4px 8px", backgroundColor: "#222", borderRadius: 6, color: "#aaa" }}>${job.salaryMin} - ${job.salaryMax}</span>
                      </div>
                      <p style={{ marginTop: 12, marginBottom: 0, color: "#9ca3af", fontSize: 13 }}>
                        Skills: {job.skills.join(", ")}
                      </p>
                    </div>

                    <button
                      type="button"
                      onClick={() => toggleSavedJob(job)}
                      aria-label={saved ? "Quitar vacante guardada" : "Guardar vacante"}
                      aria-pressed={saved}
                      style={{
                        width: 46,
                        height: 46,
                        borderRadius: 999,
                        border: "1px solid " + (saved ? "#ef4444" : "#333"),
                        backgroundColor: saved ? "rgba(239, 68, 68, 0.14)" : "#0b0b0b",
                        color: saved ? "#ef4444" : "#9ca3af",
                        cursor: "pointer",
                        display: "grid",
                        placeItems: "center",
                        flexShrink: 0,
                      }}
                    >
                      <svg viewBox="0 0 24 24" width="22" height="22" fill={saved ? "currentColor" : "none"} stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                        <path d="M12 21s-7-4.5-9.5-9A5.9 5.9 0 0 1 12 5a5.9 5.9 0 0 1 9.5 7c-2.5 4.5-9.5 9-9.5 9Z" />
                      </svg>
                    </button>
                  </article>
                );
              })
            )}
          </div>

          {hasMoreJobs && (
            <div style={{ marginTop: 16, display: "flex", justifyContent: "center" }}>
              <button
                type="button"
                onClick={() => setShowAllJobs((currentValue) => !currentValue)}
                style={{
                  padding: "12px 18px",
                  borderRadius: 999,
                  border: "1px solid #3b82f6",
                  backgroundColor: showAllJobs ? "#111827" : "#3b82f6",
                  color: "#fff",
                  cursor: "pointer",
                  fontWeight: 700,
                }}
              >
                {showAllJobs ? "Colapsar" : "Mostrar más"}
              </button>
            </div>
          )}
        </section>

        {/* DATA INSPECTOR (FOOTER) */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 32, opacity: 0.6, borderTop: "1px solid #222", paddingTop: 32 }}>
          <section>
            <h3 style={{ fontSize: 14, fontWeight: 700, marginBottom: 16, color: "#3b82f6" }}>Database: Perfiles</h3>
            <div style={{ display: "grid", gap: 10 }}>
              {footerVisibleProfiles.map(p => (
                <div key={p.id} style={{ padding: "10px", borderRadius: 10, backgroundColor: "#141414", fontSize: 13, border: "1px solid #222" }}>
                  <strong>{p.fullName}</strong> • <span style={{ color: "#888" }}>{p.skills.slice(0, 3).join(", ")}...</span>
                </div>
              ))}
            </div>

            {profiles.length > footerProfilesPageSize && (
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12, marginTop: 14 }}>
                <button
                  type="button"
                  onClick={() => setFooterProfilesPage((currentPage) => Math.max(0, currentPage - 1))}
                  disabled={footerProfilesPage === 0}
                  aria-label="Perfiles anteriores"
                  style={{
                    width: 40,
                    height: 40,
                    borderRadius: 999,
                    border: "1px solid #333",
                    backgroundColor: footerProfilesPage === 0 ? "#0f172a" : "#111827",
                    color: footerProfilesPage === 0 ? "#475569" : "#fff",
                    cursor: footerProfilesPage === 0 ? "not-allowed" : "pointer",
                    display: "grid",
                    placeItems: "center",
                    fontSize: 18,
                    fontWeight: 800,
                  }}
                >
                  ←
                </button>

                <div style={{ color: "#9ca3af", fontSize: 12, fontWeight: 600 }}>
                  {footerProfilesPage + 1} / {footerProfilesPageCount}
                </div>

                <button
                  type="button"
                  onClick={() => setFooterProfilesPage((currentPage) => Math.min(footerProfilesPageCount - 1, currentPage + 1))}
                  disabled={footerProfilesPage >= footerProfilesPageCount - 1}
                  aria-label="Siguientes perfiles"
                  style={{
                    width: 40,
                    height: 40,
                    borderRadius: 999,
                    border: "1px solid #333",
                    backgroundColor: footerProfilesPage >= footerProfilesPageCount - 1 ? "#0f172a" : "#111827",
                    color: footerProfilesPage >= footerProfilesPageCount - 1 ? "#475569" : "#fff",
                    cursor: footerProfilesPage >= footerProfilesPageCount - 1 ? "not-allowed" : "pointer",
                    display: "grid",
                    placeItems: "center",
                    fontSize: 18,
                    fontWeight: 800,
                  }}
                >
                  →
                </button>
              </div>
            )}
          </section>
          <section>
            <h3 style={{ fontSize: 14, fontWeight: 700, marginBottom: 16, color: "#3b82f6" }}>Database: Vacantes</h3>
              <div style={{ display: "grid", gap: 10 }}>
                {footerVisibleJobs.map(j => (
                <div key={j.id} style={{ padding: "10px", borderRadius: 10, backgroundColor: "#141414", fontSize: 13, border: "1px solid #222", display: "flex", justifyContent: "space-between", gap: 12, alignItems: "center" }}>
                  <div>
                    <strong>{j.title}</strong> • <span style={{ color: "#888" }}>{j.company}</span>
                  </div>
                  <button
                    type="button"
                    onClick={() => toggleSavedJob(j)}
                    aria-label={isJobSaved(j.id) ? "Quitar vacante guardada" : "Guardar vacante"}
                    aria-pressed={isJobSaved(j.id)}
                    style={{
                      width: 34,
                      height: 34,
                      borderRadius: 999,
                      border: "1px solid " + (isJobSaved(j.id) ? "#ef4444" : "#333"),
                      backgroundColor: isJobSaved(j.id) ? "rgba(239, 68, 68, 0.14)" : "#0b0b0b",
                      color: isJobSaved(j.id) ? "#ef4444" : "#9ca3af",
                      cursor: "pointer",
                      display: "grid",
                      placeItems: "center",
                      flexShrink: 0,
                    }}
                  >
                    <svg viewBox="0 0 24 24" width="18" height="18" fill={isJobSaved(j.id) ? "currentColor" : "none"} stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <path d="M12 21s-7-4.5-9.5-9A5.9 5.9 0 0 1 12 5a5.9 5.9 0 0 1 9.5 7c-2.5 4.5-9.5 9-9.5 9Z" />
                    </svg>
                  </button>
                </div>
              ))}
            </div>

            {jobs.length > footerJobsPageSize && (
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12, marginTop: 14 }}>
                <button
                  type="button"
                  onClick={() => setFooterJobsPage((currentPage) => Math.max(0, currentPage - 1))}
                  disabled={footerJobsPage === 0}
                  aria-label="Vacantes anteriores"
                  style={{
                    width: 40,
                    height: 40,
                    borderRadius: 999,
                    border: "1px solid #333",
                    backgroundColor: footerJobsPage === 0 ? "#0f172a" : "#111827",
                    color: footerJobsPage === 0 ? "#475569" : "#fff",
                    cursor: footerJobsPage === 0 ? "not-allowed" : "pointer",
                    display: "grid",
                    placeItems: "center",
                    fontSize: 18,
                    fontWeight: 800,
                  }}
                >
                  ←
                </button>

                <div style={{ color: "#9ca3af", fontSize: 12, fontWeight: 600 }}>
                  {footerJobsPage + 1} / {footerJobsPageCount}
                </div>

                <button
                  type="button"
                  onClick={() => setFooterJobsPage((currentPage) => Math.min(footerJobsPageCount - 1, currentPage + 1))}
                  disabled={footerJobsPage >= footerJobsPageCount - 1}
                  aria-label="Siguientes vacantes"
                  style={{
                    width: 40,
                    height: 40,
                    borderRadius: 999,
                    border: "1px solid #333",
                    backgroundColor: footerJobsPage >= footerJobsPageCount - 1 ? "#0f172a" : "#111827",
                    color: footerJobsPage >= footerJobsPageCount - 1 ? "#475569" : "#fff",
                    cursor: footerJobsPage >= footerJobsPageCount - 1 ? "not-allowed" : "pointer",
                    display: "grid",
                    placeItems: "center",
                    fontSize: 18,
                    fontWeight: 800,
                  }}
                >
                  →
                </button>
              </div>
            )}
          </section>
        </div>

        {loading && <div style={{ textAlign: "center", padding: 40, color: "#3b82f6", fontWeight: 700 }}>Conectando con JobMaxxing Engine...</div>}
        {error && <div style={{ color: "#ef4444", textAlign: "center", padding: 20 }}>{error}</div>}
      </div>
    </main>
  );
}