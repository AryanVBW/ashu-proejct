import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, Lock, User, TrendingUp, BarChart3, ShieldCheck, ArrowRight } from "lucide-react";
import "./Login.css"; // shared auth styles

const FEATURES = [
  { icon: <BarChart3 size={14} />, text: "Detailed category breakdowns" },
  { icon: <TrendingUp size={14} />, text: "Monthly trend reports" },
  { icon: <ShieldCheck size={14} />, text: "Your data stays private" },
];

const pageVariants = {
  initial: { opacity: 0, x: 50 },
  animate: { opacity: 1, x: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
  exit: { opacity: 0, x: -50, transition: { duration: 0.3, ease: "easeInOut" } }
};

function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate("/dashboard");
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
          <div className="auth-hero-tag">Free to get started</div>
          <h1 className="auth-hero-title">
            Start your journey to{" "}
            <span>financial freedom</span>
          </h1>
          <p className="auth-hero-sub">
            Join thousands of users who already track and
            grow their money with SpendSmart.
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
            <p className="auth-stat-label">Users joined</p>
          </div>
          <div className="auth-stat">
            <p className="auth-stat-val">Free</p>
            <p className="auth-stat-label">No credit card</p>
          </div>
          <div className="auth-stat">
            <p className="auth-stat-val">2 min</p>
            <p className="auth-stat-label">Setup time</p>
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
          <h2 className="auth-form-title">Create account</h2>
          <p className="auth-form-subtitle">Get started for free — no credit card needed</p>

          <form className="auth-form" onSubmit={handleSubmit}>
            <div>
              <label className="auth-field-label">Full name</label>
              <div className="auth-field">
                <User size={15} className="auth-field-icon" />
                <input
                  className="auth-input"
                  type="text"
                  placeholder="Ashu Wagadare"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>
            </div>

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
                  placeholder="At least 8 characters"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
            </div>

            <div>
              <label className="auth-field-label">Confirm password</label>
              <div className="auth-field">
                <Lock size={15} className="auth-field-icon" />
                <input
                  className="auth-input"
                  type="password"
                  placeholder="••••••••"
                  value={confirm}
                  onChange={(e) => setConfirm(e.target.value)}
                  required
                />
              </div>
            </div>

            <button type="submit" className="auth-submit">
              Create my account <ArrowRight size={15} />
            </button>
          </form>

          <p className="auth-footer-link">
            Already have an account?{" "}
            <Link to="/login">Sign in</Link>
          </p>
        </motion.div>
      </div>
    </motion.div>
  );
}

export default Register;