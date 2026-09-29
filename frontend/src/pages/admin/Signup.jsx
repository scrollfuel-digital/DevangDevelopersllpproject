import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { User, Mail, Lock, ShieldCheck, ArrowRight, AlertCircle, Eye, EyeOff, CheckCircle2 } from "lucide-react";
import logo from "../../assets/herosection/DevangLogo_bLACK.png";
import useAdminAuth from "../../hooks/useAdminAuth";

export default function Signup() {
  const navigate = useNavigate();
  const { isAuthenticated, signup, loading: authLoading, error: authError } = useAdminAuth();

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/admin/dashboard", { replace: true });
    }
  }, [isAuthenticated, navigate]);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "Administrator",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  const pass = formData.password;
  const checks = {
    length: pass.length >= 8,
    upper: /[A-Z]/.test(pass),
    lower: /[a-z]/.test(pass),
    number: /[0-9]/.test(pass),
    special: /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(pass),
  };

  const isPasswordStrong = Object.values(checks).every(Boolean);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!isPasswordStrong) {
      setError("Please ensure password meets all security requirements listed below.");
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match. Please re-verify.");
      return;
    }

    const res = await signup({
      name: formData.name,
      email: formData.email,
      password: formData.password,
      role: formData.role,
    });

    if (res.success) {
      navigate("/admin/dashboard", { replace: true });
    } else {
      setError(res.message || "Failed to register account.");
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

      {/* Main Registration Form */}
      <main className="my-auto py-8 flex items-center justify-center">
        <div className="w-full max-w-md bg-white rounded-3xl border border-[#c59a5b]/25 p-8 sm:p-10 shadow-[0_20px_50px_-15px_rgba(0,0,0,0.07)] space-y-6 relative overflow-hidden">
          <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-[#c59a5b] via-[#a2793f] to-[#f5e4cf]" />

          <div className="text-center space-y-2">
            
            <h5 className="text-3xl font-bold font-serif text-[#111111] tracking-tight">
              Sign Up Administrator
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
                Full Name *
              </label>
              <div className="relative">
                <User className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-[#8a8a8a]" />
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="e.g. Ritesh Mehta"
                  className="w-full rounded-xl border border-gray-200 bg-[#f8f7f4] py-3 pl-10 pr-4 text-xs text-[#111111] placeholder-gray-400 focus:border-[#c59a5b] focus:bg-white focus:outline-none transition-all"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="font-semibold text-[#111111] uppercase tracking-wider text-[10px] font-mono">
                Email Address *
              </label>
              <div className="relative">
                <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-[#8a8a8a]" />
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="name@devangdevelopers.com"
                  className="w-full rounded-xl border border-gray-200 bg-[#f8f7f4] py-3 pl-10 pr-4 text-xs text-[#111111] placeholder-gray-400 focus:border-[#c59a5b] focus:bg-white focus:outline-none transition-all"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="font-semibold text-[#111111] uppercase tracking-wider text-[10px] font-mono">
                Administrative Role
              </label>
              <select
                value={formData.role}
                onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                className="w-full rounded-xl border border-gray-200 bg-[#f8f7f4] py-3 px-3 text-xs text-[#111111] focus:border-[#c59a5b] focus:bg-white focus:outline-none transition-all"
              >
                <option value="Administrator">Administrator (Full Access)</option>
                <option value="Content Editor">Content Editor (Blogs & Media)</option>
                <option value="Leads Manager">Leads Manager (Client Inquiries)</option>
              </select>
            </div>

            <div className="space-y-1.5">
              <label className="font-semibold text-[#111111] uppercase tracking-wider text-[10px] font-mono">
                Password *
              </label>
              <div className="relative">
                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-[#8a8a8a]" />
                <input
                  type={showPassword ? "text" : "password"}
                  required
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  placeholder="Create a strong password"
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

              <div className="rounded-xl border border-gray-100 bg-[#f8f7f4] p-3 space-y-1 text-[10px] text-[#6b6b6b]">
                <p className="font-bold text-[#111111] mb-1">Security Requirements:</p>
                <div className="grid grid-cols-2 gap-1 font-mono">
                  <span className={`flex items-center gap-1 ${checks.length ? "text-emerald-700 font-bold" : "text-gray-400"}`}>
                    <CheckCircle2 className="h-3 w-3" /> 8+ Characters
                  </span>
                  <span className={`flex items-center gap-1 ${checks.upper ? "text-emerald-700 font-bold" : "text-gray-400"}`}>
                    <CheckCircle2 className="h-3 w-3" /> Uppercase (A-Z)
                  </span>
                  <span className={`flex items-center gap-1 ${checks.lower ? "text-emerald-700 font-bold" : "text-gray-400"}`}>
                    <CheckCircle2 className="h-3 w-3" /> Lowercase (a-z)
                  </span>
                  <span className={`flex items-center gap-1 ${checks.number ? "text-emerald-700 font-bold" : "text-gray-400"}`}>
                    <CheckCircle2 className="h-3 w-3" /> Number (0-9)
                  </span>
                  <span className={`flex items-center gap-1 col-span-2 ${checks.special ? "text-emerald-700 font-bold" : "text-gray-400"}`}>
                    <CheckCircle2 className="h-3 w-3" /> Special Char (!@#$%^&*)
                  </span>
                </div>
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="font-semibold text-[#111111] uppercase tracking-wider text-[10px] font-mono">
                Confirm Password *
              </label>
              <div className="relative">
                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-[#8a8a8a]" />
                <input
                  type={showPassword ? "text" : "password"}
                  required
                  value={formData.confirmPassword}
                  onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                  placeholder="Re-enter password"
                  className="w-full rounded-xl border border-gray-200 bg-[#f8f7f4] py-3 pl-10 pr-4 text-xs text-[#111111] placeholder-gray-400 focus:border-[#c59a5b] focus:bg-white focus:outline-none transition-all"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={authLoading}
              className="w-full flex items-center justify-center gap-2 rounded-2xl bg-[#c59a5b] py-3.5 text-xs font-bold uppercase tracking-wider text-white shadow-lg shadow-[#c59a5b]/25 hover:bg-[#a2793f] active:scale-[0.99] transition-all disabled:opacity-50 mt-2 font-mono"
            >
              <span>{authLoading ? "Registering via Recoil..." : "Create Verified Account"}</span>
              <ArrowRight className="h-4 w-4" />
            </button>
          </form>

          <div className="text-center border-t border-gray-100 pt-4">
            <p className="text-xs text-[#6b6b6b]">
              Already registered?{" "}
              <Link to="/login" className="font-bold text-[#c59a5b] hover:underline">
                Sign In Here
              </Link>
            </p>
          </div>
        </div>
      </main>

      <footer className="w-full text-center py-2 text-[11px] text-[#8a8a8a]">
        Devang Developers LLP © {new Date().getFullYear()} • Recoil Managed Registration
      </footer>
    </div>
  );
}
