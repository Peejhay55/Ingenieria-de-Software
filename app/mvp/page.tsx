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
    try {
      const res = await fetch("/api/profile", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
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
        alert("¡Perfil creado!");
        window.location.reload(); // Recarga para ver el nuevo perfil en la lista
      } else {
        const err = await res.json();
        alert("Error: " + err.error);
      }
    } catch (error) {
      alert("Error de conexión");
    }
  };

  //renderiza el formulario en el JSX (antes de <section> de Perfiles)
  const [profiles, setProfiles] = useState<Profile[]>([]);
  const [jobs, setJobs] = useState<Job[]>([]);
  const [selectedProfileId, setSelectedProfileId] = useState<string>("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>("");
  const [recs, setRecs] = useState<Recommendation[]>([]);
  const [recsLoading, setRecsLoading] = useState(false);


  useEffect(() => {
    async function load() {
      try {
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
        alert(err.error ?? "Error aplicando");
        return;
      }

      alert("Aplicación registrada ✅");

    } catch (e) {
      alert("Error aplicando");
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

import { useEffect, useState } from "react";
import Link from "next/link";

type Preference = { modality: string; salaryExpect: number; mustHave: string[]; niceToHave: string[]; };
type Profile = { id: string; fullName: string; email: string; location: string; targetRole: string; yearsExp: number; skills: string[]; preference?: Preference; };
type Job = { id: string; title: string; company: string; location: string; modality: string; salaryMin: number; salaryMax: number; skills: string[]; };
type Recommendation = { job: Job; score: number; breakdown: { skillsScore: number; niceScore: number; modalityScore: number; salaryScore: number; mustHavePenalty: number; matchedSkills: number; }; };

export default function MVPPage() {
  const [profiles, setProfiles] = useState<Profile[]>([]);
  const [jobs, setJobs] = useState<Job[]>([]);
  const [selectedProfileId, setSelectedProfileId] = useState<string>("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>("");
  const [recs, setRecs] = useState<Recommendation[]>([]);
  const [recsLoading, setRecsLoading] = useState(false);

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
    <main style={{ padding: "40px 24px", fontFamily: "system-ui", backgroundColor: "#0a0a0a", color: "#ededed", minHeight: "100vh" }}>
      
      {/* HEADER */}
      <header style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 48, maxWidth: "1200px", margin: "0 auto 48px auto" }}>
        <div>
          <h1 style={{ fontSize: 36, fontWeight: 900, margin: 0, letterSpacing: "-0.05em", color: "#fff" }}>
            Job<span style={{ color: "#3b82f6" }}>Maxxing</span>
          </h1>
          <p style={{ opacity: 0.5, marginTop: 4, fontSize: 14 }}>Dashboard de Optimización • v1.0</p>
        </div>
        
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
              if (!selectedProfileId) return alert("Selecciona un perfil");
              try {
                setRecsLoading(true);
                const res = await fetch(`/api/recomendaciones?profileId=${selectedProfileId}`);
                const data = await res.json();
                setRecs(data.recommendations);
              } catch (e) {
                alert("Error generando recomendaciones");
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

        {/* DATA INSPECTOR (FOOTER) */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 32, opacity: 0.6, borderTop: "1px solid #222", paddingTop: 32 }}>
          <section>
            <h3 style={{ fontSize: 14, fontWeight: 700, marginBottom: 16, color: "#3b82f6" }}>Database: Perfiles</h3>
            <div style={{ display: "grid", gap: 10 }}>
              {profiles.map(p => (
                <div key={p.id} style={{ padding: "10px", borderRadius: 10, backgroundColor: "#141414", fontSize: 13, border: "1px solid #222" }}>
                  <strong>{p.fullName}</strong> • <span style={{ color: "#888" }}>{p.skills.slice(0, 3).join(", ")}...</span>
                </div>
              ))}
            </div>
          </section>
          <section>
            <h3 style={{ fontSize: 14, fontWeight: 700, marginBottom: 16, color: "#3b82f6" }}>Database: Vacantes</h3>
            <div style={{ display: "grid", gap: 10 }}>
              {jobs.map(j => (
                <div key={j.id} style={{ padding: "10px", borderRadius: 10, backgroundColor: "#141414", fontSize: 13, border: "1px solid #222" }}>
                  <strong>{j.title}</strong> • <span style={{ color: "#888" }}>{j.company}</span>
                </div>
              ))}
            </div>
          </section>
        </div>

        {loading && <div style={{ textAlign: "center", padding: 40, color: "#3b82f6", fontWeight: 700 }}>Conectando con JobMaxxing Engine...</div>}
        {error && <div style={{ color: "#ef4444", textAlign: "center", padding: 20 }}>{error}</div>}
      </div>
    </main>
  );
}