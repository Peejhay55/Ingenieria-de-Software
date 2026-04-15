"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function RegisterPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (res.ok) {
        alert("¡Cuenta de JobMaxxing creada!");
        router.push("/login");
      } else {
        alert(data.error || "Error al registrarse");
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
        <h2 style={{ fontSize: "28px", fontWeight: 800, marginBottom: "8px", textAlign: "center" }}>Crear Cuenta</h2>
        <p style={{ opacity: 0.5, textAlign: "center", marginBottom: "32px" }}>Únete a la revolución de JobMaxxing</p>
        
        <form onSubmit={handleRegister} style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
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
            style={{ padding: "16px", borderRadius: "12px", border: "none", backgroundColor: "#3b82f6", color: "#fff", fontWeight: 700, fontSize: "16px", cursor: "pointer", marginTop: "10px" }}
          >
            {loading ? "Registrando..." : "Registrarse"}
          </button>
        </form>
        
        <p style={{ marginTop: "24px", textAlign: "center", fontSize: "14px", opacity: 0.6 }}>
          ¿Ya tienes cuenta? <Link href="/login" style={{ color: "#3b82f6", textDecoration: "none", fontWeight: 600 }}>Inicia sesión</Link>
        </p>
      </div>
    </main>
  );
}