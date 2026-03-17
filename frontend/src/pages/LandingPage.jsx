import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Bot, Brain, LineChart, Target, Zap, Bell, BarChart2, Search, Moon, Lock, Sparkles } from 'lucide-react';
import './LandingPage.css';

function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll('.reveal');
    const io = new IntersectionObserver(
      (entries) => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('active'); }),
      { threshold: 0.1 }
    );
    els.forEach(el => io.observe(el));
    return () => io.disconnect();
  }, []);
}

function useNavbarScroll() {
  useEffect(() => {
    const nav = document.getElementById('sp-navbar');
    const onScroll = () => nav?.classList.toggle('scrolled', window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
}

export default function LandingPage() {
  const navigate = useNavigate();
  useReveal();
  useNavbarScroll();

  return (
    <div className="lp-root">

      {/* BACKGROUND */}
      <div className="lp-bg-layer" aria-hidden="true">
        <div className="ambient-glow lp-glow-1" />
        <div className="ambient-glow lp-glow-2" />
        <div className="ambient-glow lp-glow-3" />
        <div className="bg-grid-space lp-grid" />
      </div>

      {/* NAVBAR */}
      <header className="lp-header">
        <nav className="glass-panel lp-nav" id="sp-navbar">
          <div className="lp-logo font-display" onClick={() => navigate('/')}>
            <div className="lp-logo-icon"><Sparkles size={18} /></div>
            SpendSmart
          </div>
          <ul className="lp-nav-links">
            {[['Features', '#features'], ['How it works', '#how-it-works'], ['AI Insights', '#ai-section']].map(([l, h]) => (
              <li key={l}><a href={h} className="lp-nav-link">{l}</a></li>
            ))}
          </ul>
          <div className="lp-nav-cta">
            <button className="lp-btn-ghost" onClick={() => navigate('/login')}>Sign in</button>
            <button className="lp-btn-primary btn-glow" onClick={() => navigate('/register')}>Get started →</button>
          </div>
        </nav>
      </header>

      {/* HERO */}
      <section className="lp-hero" id="hero">
        <div className="lp-vortex" aria-hidden="true">
          <div className="lp-core-glow" />
          <div className="lp-core-dot" />
          <div className="lp-vortex-ring lp-ring-1" />
          <div className="lp-vortex-ring lp-ring-2" />
          <div className="lp-vortex-ring lp-ring-3" />
          <svg className="lp-particles" viewBox="0 0 800 800">
            <circle cx="400" cy="80"  r="3" fill="#fff" opacity="0.7" />
            <circle cx="700" cy="500" r="2" fill="#ddd" opacity="0.5" />
            <circle cx="120" cy="600" r="4" fill="#aaa" opacity="0.3" />
            <circle cx="650" cy="160" r="2" fill="#fff" opacity="0.4" />
            <circle cx="200" cy="200" r="2" fill="#818cf8" opacity="0.6" />
            <circle cx="580" cy="380" r="3" fill="#6366f1" opacity="0.4" />
          </svg>
        </div>

        <div className="lp-hero-content">
          <div className="reveal active">
            <span className="lp-badge" style={{ display: 'flex', alignItems: 'center', gap: '6px' }}><Sparkles size={14} /> AI-Powered · Zero Effort · Real Insights</span>
          </div>
          <h1 className="lp-title font-display reveal reveal-scale active">
            Your AI finance<br />
            <span className="text-gradient-ai">tracker is here.</span>
          </h1>
          <p className="lp-subtitle reveal active">
            SpendSmart uses intelligent pattern analysis to automatically categorise your spending,
            detect unusual activity, and deliver personalised insights — so you always know where your money goes.
          </p>
          <div className="lp-hero-btns reveal active">
            <button className="lp-btn-primary btn-glow lp-btn-lg" onClick={() => navigate('/register')}>
              Start tracking free →
            </button>
            <button className="lp-btn-ghost lp-btn-lg" onClick={() => navigate('/login')}>
              Sign in
            </button>
          </div>
          <div className="lp-proof-strip reveal active">
            <div className="lp-proof-item">
              <span className="lp-proof-num">50K+</span>
              <span className="lp-proof-label">Active users</span>
            </div>
            <div className="lp-proof-divider" />
            <div className="lp-proof-item">
              <span className="lp-proof-num">₹2Cr+</span>
              <span className="lp-proof-label">Tracked monthly</span>
            </div>
            <div className="lp-proof-divider" />
            <div className="lp-proof-item">
              <span className="lp-proof-num">AI</span>
              <span className="lp-proof-label">Smart insights</span>
            </div>
          </div>
        </div>

        {/* Floating preview cards */}
        <div className="lp-preview-cards" aria-hidden="true">
          <div className="glass-panel lp-card lp-card-1 animate-float">
            <div className="lp-mock-label">Total Balance</div>
            <div className="lp-mock-value">₹25,000</div>
            <div className="lp-mock-badge lp-mock-up">↑ +8.2%</div>
            <div className="lp-mock-bar" style={{ background: 'rgba(99,102,241,0.5)' }} />
          </div>
          <div className="glass-panel lp-card lp-card-2 animate-float-delayed">
            <div className="lp-mock-label">AI Insight</div>
            <div className="lp-mock-ai-badge" style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><Bot size={13} /> Pattern Detected</div>
            <div className="lp-mock-ai-text">Food spending ↑18% this week. Set a budget to stay on track.</div>
          </div>
          <div className="glass-panel lp-card lp-card-3 animate-float">
            <div className="lp-mock-label">Budget</div>
            {[['Food', 62, '#6366f1'], ['Transport', 40, '#10b981'], ['Shopping', 88, '#f43f5e']].map(([name, pct, col]) => (
              <div key={name} className="lp-mock-budget-row">
                <span>{name}</span>
                <div className="lp-mock-track">
                  <div className="lp-mock-fill" style={{ width: `${pct}%`, background: col }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* AI SECTION */}
      <section className="lp-ai-section lp-section" id="ai-section" aria-label="AI Features">
        <div className="lp-section-inner">
          <div className="lp-section-head reveal">
            <span className="lp-badge" style={{ display: 'flex', alignItems: 'center', gap: '6px' }}><Bot size={14} /> Powered by intelligence</span>
            <h2 className="font-display lp-section-title" style={{ marginTop: '16px' }}>
              AI that actually <span className="text-gradient-ai">understands your money.</span>
            </h2>
            <p className="lp-section-sub">
              No manual categorisation. No guesswork. Our AI engine analyses every transaction and surfaces what matters most to you.
            </p>
          </div>

          <div className="lp-ai-grid">
            {[
              {
                icon: <Brain size={24} />,
                title: 'Smart Pattern Detection',
                desc: 'AI analyses your transaction history to detect spending spikes, recurring charges, and unusual activity automatically.',
                tag: 'Automatic'
              },
              {
                icon: <LineChart size={24} />,
                title: 'Predictive Spend Forecast',
                desc: 'Know your projected month-end spend before the month ends. Our model uses daily rate analysis to warn you early.',
                tag: 'Proactive'
              },
              {
                icon: <Target size={24} />,
                title: 'Personalised Recommendations',
                desc: 'Get tailored tips based on your unique spending DNA — not generic advice, but insights built for your habits.',
                tag: 'Tailored'
              },
              {
                icon: <Zap size={24} />,
                title: 'Instant Categorisation',
                desc: 'Every transaction is categorised the moment you add it. Choose from Food, Transport, Shopping, Bills, Health & more.',
                tag: 'Real-time'
              },
              {
                icon: <Bell size={24} />,
                title: 'Budget Overspend Alerts',
                desc: 'AI watches your budget progress and alerts you before you overshoot — with colour-coded visual warnings.',
                tag: 'Smart alerts'
              },
              {
                icon: <BarChart2 size={24} />,
                title: 'Trend Analytics',
                desc: 'Month-over-month charts show you exactly how your spending evolves. Spot bad habits before they become problems.',
                tag: 'Visual'
              },
            ].map(({ icon, title, desc, tag }) => (
              <div key={title} className="lp-ai-card glass-panel reveal">
                <div className="lp-ai-card-top">
                  <div className="lp-feature-icon">{icon}</div>
                  <span className="lp-ai-tag">{tag}</span>
                </div>
                <h3 className="lp-feature-title font-display">{title}</h3>
                <p className="lp-feature-desc">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section className="lp-features lp-section bg-grid-space" id="features" aria-label="Features">
        <div className="lp-section-inner">
          <div className="lp-section-head reveal">
            <h2 className="font-display lp-section-title">
              Everything you need to <span className="text-gradient-white">take control.</span>
            </h2>
            <p className="lp-section-sub">
              Beautiful analytics, smart budgets, and instant logging — built for how real people manage money.
            </p>
          </div>
          <div className="lp-features-grid">
            {[
              { icon: <BarChart2 size={24} />, title: 'Visual Analytics', desc: 'Area charts, donut breakdowns, and trend arrows so you always know the story behind your numbers.' },
              { icon: <Target size={24} />, title: 'Smart Budgets', desc: 'Set monthly limits per category. Visual progress bars warn you before you overshoot.' },
              { icon: <Zap size={24} />, title: 'Instant Logging', desc: 'Add an expense in under 5 seconds. Switch between expense and income in one click.' },
              { icon: <Search size={24} />, title: 'Full History', desc: 'Searchable, filterable transaction table with date, category, and amount for every entry.' },
              { icon: <Moon size={24} />, title: 'Dark-mode First', desc: 'Pixel-perfect deep-space dark mode. Easy on the eyes for late-night finance sessions.' },
              { icon: <Lock size={24} />, title: 'Secure & Private', desc: 'JWT-authenticated API. Your data stays yours — no ads, no third parties, no data mining.' },
            ].map(({ icon, title, desc }) => (
              <div key={title} className="glass-panel lp-feature-card reveal">
                <div className="lp-feature-icon">{icon}</div>
                <h3 className="lp-feature-title font-display">{title}</h3>
                <p className="lp-feature-desc">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TOPOLOGY MAP — "Recognized by Architects" */}
      <section className="lp-topology" id="features" aria-label="Feature Topology">
        <div className="lp-topology-header reveal">
          <h2 className="font-display lp-section-title">
            Topological <span className="text-gradient-white">Map.</span>
          </h2>
          <p className="lp-section-sub">
            Every feature node connects organically. Hover to inspect system states.
          </p>
        </div>
        <div className="container" style={{ maxWidth: '1100px', margin: '0 auto' }}>
          {/* Desktop constellation */}
          <div className="lp-constellation reveal reveal-scale">
            {/* Center Hub */}
            <div className="lp-core">
              <div className="lp-core-g3" />
              <div className="lp-core-g2" />
              <div className="lp-core-g1" />
              <div className="lp-core-orbit" />
              <div className="lp-core-ring" />
              <div className="lp-core-cdot" />
            </div>

            {/* Node 1 */}
            <div className="lp-topo-node lp-topo-node-1 lp-node-1">
              <div className="lp-node-dot-wrap"><div className="lp-node-dot" /></div>
              <h3>AI Pattern Engine</h3>
              <p>Detects spending spikes and recurring charges automatically.</p>
            </div>

            {/* Node 2 */}
            <div className="lp-topo-node lp-topo-node-2 lp-node-2">
              <div className="lp-node-dot-wrap"><div className="lp-node-dot" /></div>
              <h3>Smart Budgeting</h3>
              <p>Visual progress bars warn you before you overshoot.</p>
            </div>

            {/* Node 3 */}
            <div className="lp-topo-node lp-topo-node-3 lp-node-3">
              <div className="lp-node-dot-wrap"><div className="lp-node-dot" /></div>
              <h3>Expense Logger</h3>
              <p>Add any transaction in under 5 seconds — income or expense.</p>
            </div>

            {/* Node 4 */}
            <div className="lp-topo-node lp-topo-node-4 lp-node-4">
              <div className="lp-node-dot-wrap"><div className="lp-node-dot" /></div>
              <h3>Analytics Core</h3>
              <p>Month-over-month charts surface habits at a glance.</p>
            </div>

            {/* Node 5 */}
            <div className="lp-topo-node lp-topo-node-5 lp-node-5">
              <div className="lp-node-dot-wrap"><div className="lp-node-dot" /></div>
              <h3>Forecast Model</h3>
              <p>Predicts month-end spend from daily rate analysis.</p>
            </div>

            {/* Node 6 */}
            <div className="lp-topo-node lp-topo-node-6 lp-node-6">
              <div className="lp-node-dot-wrap"><div className="lp-node-dot" /></div>
              <h3>Secure Vault</h3>
              <p>JWT-authenticated. Your data stays yours — always.</p>
            </div>

            {/* Base dashed network lines */}
            <svg className="lp-base-net" viewBox="0 0 1000 600" preserveAspectRatio="none">
              <path d="M 230 120 Q 305 205 250 300" fill="none" stroke="rgba(255,255,255,0.16)" strokeWidth="1.2" strokeDasharray="4 6" strokeLinecap="round"/>
              <path d="M 820 175 Q 730 290 800 380" fill="none" stroke="rgba(255,255,255,0.14)" strokeWidth="1.2" strokeDasharray="4 6" strokeLinecap="round"/>
              <path d="M 140 310 Q 270 380 350 495" fill="none" stroke="rgba(255,255,255,0.12)" strokeWidth="1.2" strokeDasharray="4 6" strokeLinecap="round"/>
              <path d="M 900 375 Q 820 470 700 545" fill="none" stroke="rgba(255,255,255,0.10)" strokeWidth="1.2" strokeDasharray="4 6" strokeLinecap="round"/>
            </svg>

            {/* Active hover signal lines */}
            <svg className="lp-signal-net" viewBox="0 0 1000 600" preserveAspectRatio="none">
              <path className="lp-sig-glow n1" d="M 230 120 Q 355 180 500 300" fill="none" stroke="rgba(255,255,255,0.14)" strokeWidth="5" strokeLinecap="round"/>
              <path className="lp-sig-line n1" d="M 230 120 Q 355 180 500 300" fill="none" stroke="rgba(255,255,255,0.92)" strokeWidth="1.6" strokeLinecap="round"/>
              <path className="lp-sig-glow n2" d="M 820 175 Q 655 205 500 300" fill="none" stroke="rgba(255,255,255,0.14)" strokeWidth="5" strokeLinecap="round"/>
              <path className="lp-sig-line n2" d="M 820 175 Q 655 205 500 300" fill="none" stroke="rgba(255,255,255,0.92)" strokeWidth="1.6" strokeLinecap="round"/>
              <path className="lp-sig-glow n3" d="M 140 310 Q 315 260 500 300" fill="none" stroke="rgba(255,255,255,0.14)" strokeWidth="5" strokeLinecap="round"/>
              <path className="lp-sig-line n3" d="M 140 310 Q 315 260 500 300" fill="none" stroke="rgba(255,255,255,0.92)" strokeWidth="1.6" strokeLinecap="round"/>
              <path className="lp-sig-glow n4" d="M 900 375 Q 705 335 500 300" fill="none" stroke="rgba(255,255,255,0.14)" strokeWidth="5" strokeLinecap="round"/>
              <path className="lp-sig-line n4" d="M 900 375 Q 705 335 500 300" fill="none" stroke="rgba(255,255,255,0.92)" strokeWidth="1.6" strokeLinecap="round"/>
              <path className="lp-sig-glow n5" d="M 350 495 Q 405 375 500 300" fill="none" stroke="rgba(255,255,255,0.14)" strokeWidth="5" strokeLinecap="round"/>
              <path className="lp-sig-line n5" d="M 350 495 Q 405 375 500 300" fill="none" stroke="rgba(255,255,255,0.92)" strokeWidth="1.6" strokeLinecap="round"/>
              <path className="lp-sig-glow n6" d="M 700 545 Q 610 405 500 300" fill="none" stroke="rgba(255,255,255,0.14)" strokeWidth="5" strokeLinecap="round"/>
              <path className="lp-sig-line n6" d="M 700 545 Q 610 405 500 300" fill="none" stroke="rgba(255,255,255,0.92)" strokeWidth="1.6" strokeLinecap="round"/>
            </svg>
          </div>

          {/* Mobile fallback grid */}
          <div className="lp-topo-mobile">
            {[
              ['AI Pattern Engine', 'Detects spending spikes automatically.'],
              ['Smart Budgeting', 'Visual warnings before you overshoot.'],
              ['Expense Logger', 'Add transactions in 5 seconds.'],
              ['Analytics Core', 'Month-over-month habit charts.'],
              ['Forecast Model', 'Predicts your month-end spend.'],
              ['Secure Vault', 'JWT-auth. Your data stays yours.'],
            ].map(([title, desc]) => (
              <div key={title} className="lp-topo-mobile-card">
                <h3>{title}</h3>
                <p>{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ENGINE REVEALED — 3D Stacked Panels */}
      <section className="lp-engine" id="engine" aria-label="The Engine Revealed">
        <div className="lp-engine-glow" aria-hidden="true" />
        <div className="lp-engine-layout">
          {/* Left info */}
          <div className="lp-engine-info reveal reveal-left">
            <h2>
              The Engine<br />
              <span style={{ color: '#fff' }}>Revealed.</span>
            </h2>
            <p>Observe data streams as they process through our multi-layered intelligence matrix. Unprecedented financial visibility.</p>
            <div className="lp-engine-steps">
              <div className="lp-engine-step">
                <div className="lp-engine-step-num">01</div>
                <span>Data Ingestion</span>
              </div>
              <div className="lp-engine-step">
                <div className="lp-engine-step-num">02</div>
                <span>AI Processing Matrix</span>
              </div>
              <div className="lp-engine-step">
                <div className="lp-engine-step-num active">03</div>
                <span className="active">Insight Synthesis</span>
              </div>
            </div>
          </div>

          {/* Right 3D showcase */}
          <div className="lp-engine-showcase reveal reveal-right">
            <div className="lp-engine-stack">
              {/* Bottom panel */}
              <div className="lp-engine-panel lp-panel-bottom" style={{ padding: '24px' }}>
                <div style={{ width: '33%', height: '4px', background: 'rgba(255,255,255,0.08)', borderRadius: '99px' }} />
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginTop: 'auto', paddingTop: '80px' }}>
                  <div style={{ aspectRatio: '2/1', background: 'rgba(255,255,255,0.02)', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.02)' }} />
                  <div style={{ aspectRatio: '2/1', background: 'rgba(255,255,255,0.02)', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.02)' }} />
                </div>
              </div>

              {/* Middle panel */}
              <div className="lp-engine-panel lp-panel-middle" style={{ padding: '32px', display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: '24px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', borderBottom: '1px solid rgba(255,255,255,0.04)', paddingBottom: '16px' }}>
                  <div style={{ width: '40px', height: '40px', borderRadius: '8px', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.04)' }} />
                  <div style={{ width: '50%', height: '4px', background: 'rgba(255,255,255,0.04)', borderRadius: '99px' }} />
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  {[100, 83, 66].map((w, i) => (
                    <div key={i} style={{ height: '6px', width: `${w}%`, background: 'rgba(255,255,255,0.04)', borderRadius: '99px' }} />
                  ))}
                </div>
              </div>

              {/* Top panel */}
              <div className="lp-engine-panel lp-panel-top">
                <div className="lp-panel-content-top">
                  <div className="lp-panel-ring">
                    <div className="lp-panel-ring-inner" />
                    <div className="lp-panel-orbit-dot">
                      <div className="lp-panel-core-dot" />
                    </div>
                  </div>
                  <div className="lp-panel-mono">Synthesis_Active</div>
                  <div className="lp-panel-divider-h" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SEQUENCE OF EVENTS — How It Works (upgraded) */}
      <section className="lp-sequence" id="how-it-works" aria-label="How it works">
        <div className="lp-sequence-header reveal">
          <h2 className="lp-seq-title">
            Sequence of <span>Events.</span>
          </h2>
          <p className="lp-seq-sub">
            Follow the exact lifecycle of your money as it enters SpendSmart. Fully transparent, instantly observable, and radically efficient.
          </p>
        </div>

        <div className="lp-seq-container">
          {/* Track line */}
          <div className="lp-seq-track" aria-hidden="true" />

          {/* Step 1 */}
          <div className="lp-seq-step reveal">
            <div className="lp-seq-dot-wrap"><div className="lp-seq-dot" /></div>
            <div className="lp-seq-text seq-fade-up">
              <div className="lp-seq-tag">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 12h-4l-3 9L9 3l-3 9H2"/></svg>
                Account Ready &lt; 2 min
              </div>
              <h3 className="lp-seq-step-title">Create Account</h3>
              <p className="lp-seq-step-desc">Sign up free in under 2 minutes. No credit card needed. Your data is encrypted end-to-end from day one.</p>
            </div>
            <div className="lp-seq-visual seq-fade-up">
              <div className="lp-seq-card">
                <div style={{ display: 'flex', gap: '6px', marginBottom: '16px', borderBottom: '1px solid rgba(255,255,255,0.05)', paddingBottom: '16px' }}>
                  {[0,0,0].map((_, i) => <div key={i} style={{ width: '10px', height: '10px', borderRadius: '50%', background: 'rgba(255,255,255,0.1)' }} />)}
                </div>
                <div className="seq-code" style={{ fontFamily: 'monospace', fontSize: '13px', color: 'rgba(209,213,219,1)', animationDelay: '500ms' }}>
                  <span style={{ color: 'rgba(255,255,255,0.4)' }}>~</span> spendsmart register
                </div>
                <div style={{ fontFamily: 'monospace', fontSize: '11px', color: 'rgba(107,114,128,1)', marginTop: '12px', display: 'flex', flexDirection: 'column', gap: '4px' }}>
                  <div className="seq-code" style={{ animationDelay: '700ms' }}>&gt; encrypting credentials...</div>
                  <div className="seq-code" style={{ color: 'rgba(209,213,219,0.8)', animationDelay: '900ms' }}>&gt; account created. ✓</div>
                </div>
              </div>
            </div>
          </div>

          {/* Step 2 — reversed */}
          <div className="lp-seq-step lp-seq-reverse reveal">
            <div className="lp-seq-dot-wrap"><div className="lp-seq-dot" /></div>
            <div className="lp-seq-text seq-fade-up">
              <div className="lp-seq-tag">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h18"/><path d="M9 21V9"/></svg>
                AI Categorised Instantly
              </div>
              <h3 className="lp-seq-step-title">Log Transactions</h3>
              <p className="lp-seq-step-desc">Add income and expenses with the quick-add form. AI instantly categorises and analyses each entry in real-time.</p>
            </div>
            <div className="lp-seq-visual seq-fade-up">
              <div className="lp-seq-card">
                <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '20px' }}>
                  <div style={{ width: '40px', height: '40px', borderRadius: '10px', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="rgba(209,213,219,1)" strokeWidth="2"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h18"/><path d="M9 21V9"/></svg>
                  </div>
                  <div>
                    <div style={{ fontSize: '14px', color: 'rgba(255,255,255,0.9)', fontWeight: 500 }}>AI Scan</div>
                    <div style={{ fontSize: '11px', fontFamily: 'monospace', color: 'rgba(107,114,128,1)', marginTop: '2px' }}>Mapping categories...</div>
                  </div>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  <div style={{ height: '6px', width: '100%', background: 'rgba(255,255,255,0.05)', borderRadius: '99px', overflow: 'hidden' }}>
                    <div className="seq-prog" style={{ height: '100%', background: 'rgba(209,213,219,0.8)', borderRadius: '99px', '--target-width': '78%', '--duration': '1.5s', animationDelay: '700ms' }} />
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '10px', fontFamily: 'monospace', color: 'rgba(107,114,128,1)' }}>
                    <span className="seq-code" style={{ animationDelay: '600ms' }}>Processing...</span>
                    <span className="seq-code" style={{ color: 'rgba(209,213,219,0.9)', animationDelay: '1800ms' }}>78%</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Step 3 */}
          <div className="lp-seq-step reveal">
            <div className="lp-seq-dot-wrap"><div className="lp-seq-dot" /></div>
            <div className="lp-seq-text seq-fade-up">
              <div className="lp-seq-tag">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polygon points="12 2 2 7 12 12 22 7 12 2"/><polyline points="2 17 12 22 22 17"/><polyline points="2 12 12 17 22 12"/></svg>
                Insights Projected Live
              </div>
              <h3 className="lp-seq-step-title">Get AI Insights</h3>
              <p className="lp-seq-step-desc">Your personalised AI dashboard surfaces patterns, predicts trends, and recommends budget actions automatically.</p>
            </div>
            <div className="lp-seq-visual seq-fade-up">
              <div className="lp-seq-card" style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                  <div className="seq-ui" style={{ width: '48px', height: '48px', borderRadius: '12px', background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.06)', display: 'flex', alignItems: 'center', justifyContent: 'center', animationDelay: '700ms' }}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="rgba(156,163,175,1)" strokeWidth="2"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"/><line x1="3" y1="9" x2="21" y2="9"/><line x1="9" y1="21" x2="9" y2="9"/></svg>
                  </div>
                  <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    <div className="seq-ui" style={{ height: '8px', width: '75%', background: 'rgba(255,255,255,0.1)', borderRadius: '99px', animationDelay: '850ms' }} />
                    <div className="seq-ui" style={{ height: '8px', width: '50%', background: 'rgba(255,255,255,0.05)', borderRadius: '99px', animationDelay: '1000ms' }} />
                  </div>
                </div>
                <div className="seq-ui" style={{ height: '80px', width: '100%', borderRadius: '12px', background: 'linear-gradient(135deg, rgba(255,255,255,0.02), rgba(255,255,255,0.05))', border: '1px solid rgba(255,255,255,0.05)', animationDelay: '1150ms' }} />
              </div>
            </div>
          </div>

        </div>
      </section>


      {/* STATS */}
      <section className="lp-stats-band bg-grid-space" aria-label="Statistics">
        <div className="lp-stats-inner">
          {[
            { val: '50K', label: 'users', suffix: '+' },
            { val: '₹2Cr', label: 'tracked', suffix: '+' },
            { val: '4.9', label: 'rating', suffix: '★' },
            { val: '99', label: 'uptime', suffix: '%' },
          ].map(({ val, label, suffix }) => (
            <div key={label} className="lp-stat-item reveal">
              <div className="stat-text font-display" data-val={`${val}${suffix}`}>{val}{suffix}</div>
              <div className="lp-stat-label">{label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="lp-cta" id="pricing" aria-label="Call to action">
        <div className="lp-portal-ring lp-pr-1" aria-hidden="true" />
        <div className="lp-portal-ring lp-pr-2" aria-hidden="true" />
        <div className="lp-portal-ring lp-pr-3" aria-hidden="true" />
        <div className="lp-cta-inner reveal">
          <span className="lp-badge" style={{ display: 'flex', alignItems: 'center', gap: '6px' }}><Bot size={14} /> Free forever · No credit card · AI included</span>
          <h2 className="font-display lp-cta-title">
            Ready to spend smarter?
          </h2>
          <p className="lp-cta-sub">
            Join thousands of users who have unlocked AI-powered financial clarity.
          </p>
          <button className="lp-btn-primary btn-glow lp-btn-xl" onClick={() => navigate('/register')}>
            Create your free account →
          </button>
          <p className="lp-cta-note">Already have an account? <span className="lp-cta-link" onClick={() => navigate('/login')}>Sign in</span></p>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="lp-footer">
        <div className="lp-footer-inner">
          <div className="lp-logo font-display" style={{ opacity: 0.5 }}>
            <div className="lp-logo-icon lp-logo-icon-sm"><Sparkles size={12} /></div>
            SpendSmart
          </div>
          <p className="lp-footer-copy">© 2026 SpendSmart · AI-powered finance tracker · Built with care</p>
        </div>
      </footer>
    </div>
  );
}
