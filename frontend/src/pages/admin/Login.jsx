import React, { useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Mail, Lock, ArrowRight, AlertCircle, Eye, EyeOff } from "lucide-react";
import { Turnstile } from "@marsidev/react-turnstile";
import logo from "../../assets/herosection/DevangLogo_bLACK.png";
import { useAuth } from "../../context/AuthContext";

export default function Login() {
  const navigate = useNavigate();
  const { login, loading: authLoading, error: authError } = useAuth();

  const [formData, setFormData] = useState({
    email: "admin@gmail.com",
    password: "pass@123",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [turnstileToken, setTurnstileToken] = useState("");
  const turnstileRef = useRef(null);

  const turnstileSiteKey =
    import.meta.env.VITE_TURNSTILE_SITE_KEY || "0x4AAAAAAE32Pw9QivldjMWo";

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (authLoading) return;

    setError("");

    if (!turnstileToken) {
      setError("Please complete the Cloudflare security captcha verification.");
      return;
    }

    const res = await login(formData.email, formData.password, turnstileToken);
    if (res.success) {
      navigate("/admin/dashboard", { replace: true });
    } else {
      setError(res.message || "Access Denied: Invalid credentials.");
      turnstileRef.current?.reset();
      setTurnstileToken("");
    }
  };

  return (
    <div className="min-h-screen w-full bg-[#f8f7f4] text-[#111111] font-sans flex flex-col justify-between p-4 sm:p-6 lg:p-10 selection:bg-[#c59a5b] selection:text-white">
      {/* Header Bar */}
      <header className="w-full max-w-7xl mx-auto flex items-center justify-between py-2">
        <Link to="/" className="flex items-center gap-3 group">
          <img
            src={logo}
            alt="Devang Developers LLP"
            className="h-12 w-auto object-contain transition-transform group-hover:scale-105"
          />
        </Link>
        <Link
          to="/"
          className="text-xs font-semibold uppercase tracking-wider text-[#6b6b6b] hover:text-[#c59a5b] transition-colors"
        >
          ← Back to Live Site
        </Link>
      </header>

      {/* Main Login Container */}
      <main className="my-auto py-8 flex items-center justify-center">
        <div className="w-full max-w-md bg-white rounded-3xl border border-[#c59a5b]/25 p-8 sm:p-10 shadow-[0_20px_50px_-15px_rgba(0,0,0,0.07)] space-y-6 relative overflow-hidden">
          <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-[#c59a5b] via-[#a2793f] to-[#f5e4cf]" />

          <div className="text-center space-y-2">
            <h5 className="text-3xl font-bold font-serif text-[#111111] tracking-tight">
              Sign In Required
            </h5>
          </div>

          {(error || authError) && (
            <div className="flex items-start gap-2.5 rounded-2xl bg-red-50 border border-red-200 p-3.5 text-xs text-red-700 animate-in fade-in">
              <AlertCircle className="h-4 w-4 text-red-500 shrink-0 mt-0.5" />
              <div className="leading-relaxed">{error || authError}</div>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4 text-xs">
            <div className="space-y-1.5">
              <label className="font-semibold text-[#111111] uppercase tracking-wider text-[10px] font-mono">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-[#8a8a8a]" />
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="admin@gmail.com"
                  className="w-full rounded-xl border border-gray-200 bg-[#f8f7f4] py-3 pl-10 pr-4 text-xs text-[#111111] placeholder-gray-400 focus:border-[#c59a5b] focus:bg-white focus:outline-none transition-all"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="font-semibold text-[#111111] uppercase tracking-wider text-[10px] font-mono">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-[#8a8a8a]" />
                <input
                  type={showPassword ? "text" : "password"}
                  required
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  placeholder="pass@123"
                  className="w-full rounded-xl border border-gray-200 bg-[#f8f7f4] py-3 pl-10 pr-10 text-xs text-[#111111] placeholder-gray-400 focus:border-[#c59a5b] focus:bg-white focus:outline-none transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-[#111111]"
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>

            {/* Cloudflare Turnstile Captcha Widget */}
            <div className="flex flex-col items-center justify-center my-3 min-h-[65px]">
              <Turnstile
                ref={turnstileRef}
                siteKey={turnstileSiteKey}
                onSuccess={(t) => {
                  setTurnstileToken(t);
                  setError("");
                }}
                onError={() => {
                  setTurnstileToken("");
                  setError("Captcha verification failed. Please try again.");
                }}
                onExpire={() => {
                  setTurnstileToken("");
                }}
              />
            </div>

            <button
              type="submit"
              disabled={authLoading}
              className="w-full flex items-center justify-center gap-2 rounded-2xl bg-[#c59a5b] py-3.5 text-xs font-bold uppercase tracking-wider text-white shadow-lg shadow-[#c59a5b]/25 hover:bg-[#a2793f] active:scale-[0.99] transition-all disabled:opacity-50 mt-2 font-mono"
            >
              <span>{authLoading ? "Authenticating..." : "Secure Sign In"}</span>
              <ArrowRight className="h-4 w-4" />
            </button>
          </form>

          <div className="text-center border-t border-gray-100 pt-4">
            <p className="text-xs text-[#6b6b6b]">
              Need a new administrator account?{" "}
              <Link to="/signup" className="font-bold text-[#c59a5b] hover:underline">
                Register / Sign Up Here
              </Link>
            </p>
          </div>
        </div>
      </main>

      <footer className="w-full text-center py-2 text-[11px] text-[#8a8a8a]">
        Devang Developers LLP © {new Date().getFullYear()} • Secure In-Memory Admin Authorization
      </footer>
    </div>
  );
}
