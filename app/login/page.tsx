"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (res.ok) {
        // Por ahora guardamos el ID en localStorage para saber quién entró
        localStorage.setItem("jobmaxxing_user", data.userId);
        alert("¡Bienvenido de nuevo a JobMaxxing!");
        router.push("/mvp"); // Te manda al dashboard
      } else {
        alert(data.error || "Credenciales incorrectas");
      }
    } catch (error) {
      alert("Error de conexión");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", backgroundColor: "#0a0a0a", color: "#fff", fontFamily: "system-ui" }}>
      <div style={{ width: "100%", maxWidth: "400px", padding: "40px", backgroundColor: "#141414", borderRadius: "24px", border: "1px solid #222" }}>
        <h2 style={{ fontSize: "28px", fontWeight: 800, marginBottom: "8px", textAlign: "center" }}>Iniciar Sesión</h2>
        <p style={{ opacity: 0.5, textAlign: "center", marginBottom: "32px" }}>Accede a tu panel de JobMaxxing</p>
        
        <form onSubmit={handleLogin} style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
          <div>
            <label style={{ display: "block", fontSize: "12px", fontWeight: 700, color: "#3b82f6", textTransform: "uppercase", marginBottom: "8px" }}>Email</label>
            <input 
              type="email" required placeholder="tu@email.com"
              onChange={(e) => setEmail(e.target.value)}
              style={{ width: "100%", padding: "14px", borderRadius: "12px", backgroundColor: "#0a0a0a", border: "1px solid #333", color: "#fff", outline: "none" }}
            />
          </div>
          <div>
            <label style={{ display: "block", fontSize: "12px", fontWeight: 700, color: "#3b82f6", textTransform: "uppercase", marginBottom: "8px" }}>Contraseña</label>
            <input 
              type="password" required placeholder="••••••••"
              onChange={(e) => setPassword(e.target.value)}
              style={{ width: "100%", padding: "14px", borderRadius: "12px", backgroundColor: "#0a0a0a", border: "1px solid #333", color: "#fff", outline: "none" }}
            />
          </div>
          <button 
            type="submit" disabled={loading}
            style={{ padding: "16px", borderRadius: "12px", border: "none", backgroundColor: "#fff", color: "#000", fontWeight: 700, fontSize: "16px", cursor: "pointer", marginTop: "10px" }}
          >
            {loading ? "Cargando..." : "Entrar"}
          </button>
        </form>
        
        <p style={{ marginTop: "24px", textAlign: "center", fontSize: "14px", opacity: 0.6 }}>
          ¿No tienes cuenta? <Link href="/register" style={{ color: "#3b82f6", textDecoration: "none", fontWeight: 600 }}>Regístrate gratis</Link>
        </p>
      </div>
    </main>
  );
}