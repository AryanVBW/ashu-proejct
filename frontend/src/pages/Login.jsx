import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, Lock, TrendingUp, PieChart, ShieldCheck, ArrowRight, Star, Loader2 } from "lucide-react";
import { authAPI } from "../services/api";
import "./Login.css";

const FEATURES = [
  { icon: <TrendingUp size={14} />, text: "AI-powered spending insights" },
  { icon: <PieChart size={14} />,   text: "Real-time budget tracking" },
  { icon: <ShieldCheck size={14} />, text: "Bank-grade data security" },
];

const pageVariants = {
  initial: { opacity: 0, x: -50 },
  animate: { opacity: 1, x: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
  exit:    { opacity: 0, x: 50,  transition: { duration: 0.3, ease: "easeInOut" } }
};

function Login() {
  const [email, setEmail] = useState("demo@example.com");
  const [password, setPassword] = useState("password123");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    
    try {
      const data = await authAPI.login(email, password);
      localStorage.setItem("expense_token", data.token);
      localStorage.setItem("expense_user", JSON.stringify({ name: data.name, email: data.email }));
      navigate("/dashboard");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div 
      className="auth-page"
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
    >
      {/* ── Left Hero ── */}
      <div className="auth-hero">
        {/* AURA Vortex rings */}
        <div className="auth-hero-vortex" aria-hidden="true">
          <div className="auth-vortex-core" />
          <div className="auth-vortex-dot" />
          <div className="auth-vortex-ring auth-ring-1" />
          <div className="auth-vortex-ring auth-ring-2" />
          <div className="auth-vortex-ring auth-ring-3" />
        </div>

        <div className="auth-logo">
          <div className="auth-logo-icon"><TrendingUp size={16} /></div>
          <span className="auth-logo-name">SpendSmart</span>
        </div>

        <div className="auth-hero-body">
          <div className="auth-hero-tag">New — AI Insights</div>
          <h1 className="auth-hero-title">
            Take control of your{" "}
            <span>finances</span>
          </h1>
          <p className="auth-hero-sub">
            Track expenses, analyse spending patterns,
            and meet your savings goals — all in one place.
          </p>
          <ul className="auth-features">
            {FEATURES.map((f, i) => (
              <li key={i} className="auth-feature">
                <div className="auth-feature-icon">{f.icon}</div>
                {f.text}
              </li>
            ))}
          </ul>
        </div>

        <div className="auth-hero-footer">
          <div className="auth-stat">
            <p className="auth-stat-val">50K+</p>
            <p className="auth-stat-label">Active users</p>
          </div>
          <div className="auth-stat">
            <p className="auth-stat-val">₹2Cr+</p>
            <p className="auth-stat-label">Tracked monthly</p>
          </div>
          <div className="auth-stat">
            <p className="auth-stat-val" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '2px' }}>
              4.9 <Star size={16} fill="currentColor" />
            </p>
            <p className="auth-stat-label">App rating</p>
          </div>
        </div>
      </div>

      {/* ── Right Form Panel ── */}
      <div className="auth-form-panel">
        <motion.div
          className="auth-form-box"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: [0, 0, 0.2, 1] }}
        >
          <h2 className="auth-form-title">Welcome back</h2>
          <p className="auth-form-subtitle">Sign in to your account to continue</p>

          <form className="auth-form" onSubmit={handleSubmit}>
            {error && <div className="auth-error" style={{ color: "#f43f5e", fontSize: "14px", marginBottom: "12px", background: "rgba(244, 63, 94, 0.1)", padding: "8px 12px", borderRadius: "8px", border: "1px solid rgba(244, 63, 94, 0.2)" }}>{error}</div>}
            <div>
              <label className="auth-field-label">Email address</label>
              <div className="auth-field">
                <Mail size={15} className="auth-field-icon" />
                <input
                  className="auth-input"
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
            </div>

            <div>
              <label className="auth-field-label">Password</label>
              <div className="auth-field">
                <Lock size={15} className="auth-field-icon" />
                <input
                  className="auth-input"
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
            </div>

            <p className="auth-forgot">Forgot password?</p>

            <button type="submit" className="auth-submit" disabled={loading}>
              {loading ? <Loader2 size={15} className="animate-spin" /> : <>Sign in <ArrowRight size={15} /></>}
            </button>
          </form>

          <p className="auth-footer-link">
            Don't have an account?{" "}
            <Link to="/register">Create one</Link>
          </p>
        </motion.div>
      </div>
    </motion.div>
  );
}

export default Login;