"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Lock, User, Eye, EyeOff, ArrowRight, ShieldCheck } from "lucide-react";

export default function AdminLoginPage() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Identifiants invalides");
        setLoading(false);
        return;
      }

      router.push("/admin");
      router.refresh();
    } catch {
      setError("Erreur de connexion au serveur.");
      setLoading(false);
    }
  };

  return (
    <>
      <style jsx global>{`
        @font-face {
          font-family: "LaLuxes";
          src: url("/fonts/LaLuxes.otf") format("opentype");
        }
        @font-face {
          font-family: "zoxi-regular";
          src: url("/fonts/zoxi-regular.ttf") format("truetype");
        }
        @font-face {
          font-family: "Myriad Pro";
          src: url("/fonts/MYRIADPRO-REGULAR.OTF") format("opentype");
        }
      `}</style>

      <div
        className="min-h-screen w-full flex items-center justify-center p-4 relative"
        style={{
          backgroundImage: "url('/coffee/boissons-bg.png')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundAttachment: "fixed",
        }}
      >
        {/* Dark emerald overlay matching front theme */}
        <div className="absolute inset-0 bg-[#0a150c]/85 backdrop-blur-md" />

        <div className="relative w-full max-w-md z-10">
          {/* Subtle warm glow */}
          <div className="absolute -top-12 -left-12 w-48 h-48 bg-[#c9782b]/15 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-12 -right-12 w-48 h-48 bg-[#eedab7]/10 rounded-full blur-3xl pointer-events-none" />

          <div className="bg-[#102014]/90 border border-[#eedab7]/25 rounded-3xl p-8 sm:p-10 shadow-2xl backdrop-blur-xl">
            {/* Header with Logo */}
            <div className="text-center mb-8">
              <div className="relative w-20 h-20 mx-auto mb-4 drop-shadow-[0_4px_12px_rgba(0,0,0,0.5)]">
                <Image
                  src="/logozitouna.png"
                  alt="Zitouna"
                  fill
                  className="object-contain"
                  priority
                />
              </div>

              <h1
                style={{
                  fontFamily: "'LaLuxes', serif",
                  color: "#eedab7",
                  letterSpacing: "0.15em",
                  fontSize: "32px",
                  fontWeight: 400,
                  margin: 0,
                }}
              >
                ZITOUNA
              </h1>

              <span
                style={{
                  fontFamily: "'zoxi-regular', serif",
                  color: "#c9782b",
                  letterSpacing: "0.08em",
                  fontSize: "22px",
                  display: "block",
                  marginTop: "2px",
                }}
              >
                Administration
              </span>

              <div
                className="mx-auto mt-4"
                style={{
                  width: 50,
                  borderTop: "1px solid rgba(238, 218, 183, 0.5)",
                }}
              />
            </div>

            {/* Error Banner */}
            {error && (
              <div className="mb-6 p-3.5 rounded-xl bg-red-950/70 border border-red-500/40 text-red-200 text-sm flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-red-400 animate-pulse" />
                <span style={{ fontFamily: "'Myriad Pro', sans-serif" }}>{error}</span>
              </div>
            )}

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label
                  className="block text-xs uppercase tracking-wider mb-2 font-medium"
                  style={{
                    fontFamily: "'Myriad Pro', sans-serif",
                    color: "#eedab7",
                    letterSpacing: "0.1em",
                  }}
                >
                  Identifiant
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#eedab7]/60">
                    <User className="w-4 h-4" />
                  </div>
                  <input
                    type="text"
                    required
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="admin"
                    style={{ fontFamily: "'Myriad Pro', sans-serif" }}
                    className="w-full pl-10 pr-4 py-3 bg-[#0a150c]/80 border border-[#eedab7]/25 rounded-xl text-[#eedab7] placeholder-[#eedab7]/35 text-sm focus:outline-none focus:border-[#c9782b] focus:ring-1 focus:ring-[#c9782b] transition"
                  />
                </div>
              </div>

              <div>
                <label
                  className="block text-xs uppercase tracking-wider mb-2 font-medium"
                  style={{
                    fontFamily: "'Myriad Pro', sans-serif",
                    color: "#eedab7",
                    letterSpacing: "0.1em",
                  }}
                >
                  Mot de passe
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#eedab7]/60">
                    <Lock className="w-4 h-4" />
                  </div>
                  <input
                    type={showPassword ? "text" : "password"}
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••••••"
                    style={{ fontFamily: "'Myriad Pro', sans-serif" }}
                    className="w-full pl-10 pr-11 py-3 bg-[#0a150c]/80 border border-[#eedab7]/25 rounded-xl text-[#eedab7] placeholder-[#eedab7]/35 text-sm focus:outline-none focus:border-[#c9782b] focus:ring-1 focus:ring-[#c9782b] transition"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-[#eedab7]/60 hover:text-[#eedab7] transition cursor-pointer"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                style={{
                  fontFamily: "'LaLuxes', serif",
                  letterSpacing: "0.12em",
                  fontSize: "16px",
                }}
                className="w-full mt-2 py-3 px-4 rounded-xl bg-gradient-to-r from-[#c9782b] to-[#b0651e] text-[#0f1e12] font-bold shadow-lg hover:brightness-110 active:scale-[0.99] transition duration-200 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <>
                    <div className="w-4 h-4 border-2 border-[#0f1e12] border-t-transparent rounded-full animate-spin" />
                    <span>Connexion en cours...</span>
                  </>
                ) : (
                  <>
                    <span>SE CONNECTER</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
