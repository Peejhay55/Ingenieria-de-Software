"use client";

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