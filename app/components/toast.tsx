"use client";

import { useEffect } from "react";

type ToastVariant = "success" | "error" | "info";

type ToastProps = {
  message: string;
  variant?: ToastVariant;
  onClose: () => void;
};

const variantStyles: Record<ToastVariant, { border: string; background: string; color: string }> = {
  success: {
    border: "rgba(34, 197, 94, 0.35)",
    background: "linear-gradient(135deg, rgba(34,197,94,0.18), rgba(10,10,10,0.96))",
    color: "#bbf7d0",
  },
  error: {
    border: "rgba(239, 68, 68, 0.35)",
    background: "linear-gradient(135deg, rgba(239,68,68,0.18), rgba(10,10,10,0.96))",
    color: "#fecaca",
  },
  info: {
    border: "rgba(59, 130, 246, 0.35)",
    background: "linear-gradient(135deg, rgba(59,130,246,0.18), rgba(10,10,10,0.96))",
    color: "#dbeafe",
  },
};

export function Toast({ message, variant = "info", onClose }: ToastProps) {
  useEffect(() => {
    const timer = window.setTimeout(onClose, 3200);
    return () => window.clearTimeout(timer);
  }, [onClose]);

  const styles = variantStyles[variant];

  return (
    <div
      role="status"
      aria-live="polite"
      style={{
        position: "fixed",
        top: 24,
        right: 24,
        zIndex: 1000,
        width: "min(92vw, 360px)",
        padding: "14px 16px",
        borderRadius: 16,
        border: `1px solid ${styles.border}`,
        background: styles.background,
        color: styles.color,
        boxShadow: "0 18px 40px rgba(0, 0, 0, 0.35)",
        backdropFilter: "blur(14px)",
        WebkitBackdropFilter: "blur(14px)",
      }}
    >
      <div style={{ display: "flex", alignItems: "flex-start", gap: 12 }}>
        <div
          style={{
            width: 10,
            height: 10,
            marginTop: 5,
            borderRadius: 999,
            background: variant === "success" ? "#22c55e" : variant === "error" ? "#ef4444" : "#3b82f6",
            boxShadow: `0 0 0 6px ${variant === "success" ? "rgba(34,197,94,0.16)" : variant === "error" ? "rgba(239,68,68,0.16)" : "rgba(59,130,246,0.16)"}`,
            flexShrink: 0,
          }}
        />
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: 12, fontWeight: 800, textTransform: "uppercase", letterSpacing: "0.08em", opacity: 0.85, marginBottom: 4 }}>
            {variant === "success" ? "Éxito" : variant === "error" ? "Error" : "Info"}
          </div>
          <div style={{ fontSize: 14, lineHeight: 1.5, fontWeight: 600 }}>{message}</div>
        </div>
        <button
          type="button"
          onClick={onClose}
          aria-label="Cerrar mensaje"
          style={{
            appearance: "none",
            border: "none",
            background: "transparent",
            color: "inherit",
            cursor: "pointer",
            fontSize: 18,
            lineHeight: 1,
            opacity: 0.75,
            padding: 0,
          }}
        >
          ×
        </button>
      </div>
    </div>
  );
}