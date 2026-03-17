import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles } from 'lucide-react';
import './AIInsights.css';

const TYPE_STYLES = {
  warning: { bg: 'rgba(245,158,11,0.08)', border: 'rgba(245,158,11,0.2)', dot: '#f59e0b' },
  success: { bg: 'rgba(16,185,129,0.08)', border: 'rgba(16,185,129,0.2)', dot: '#10b981' },
  info:    { bg: 'rgba(99,102,241,0.08)',  border: 'rgba(99,102,241,0.2)',  dot: '#6366f1' },
};

function AIInsights({ data }) {
  const [active, setActive] = useState(0);

  // Auto-rotate insights
  useEffect(() => {
    if (!data?.insights?.length) return;
    const id = setInterval(() => {
      setActive(a => (a + 1) % data.insights.length);
    }, 5000);
    return () => clearInterval(id);
  }, [data]);

  if (!data || !data.insights?.length || !data.summary) {
    return (
      <div className="ai-insights-card" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '160px', color: 'rgba(255,255,255,0.5)' }}>
        No insights available yet. Add some transactions first!
      </div>
    );
  }

  const { insights, summary } = data;
  const current = insights[active];
  const style = TYPE_STYLES[current?.type] || TYPE_STYLES.info;

  return (
    <div className="ai-insights-card">
      {/* Header */}
      <div className="ai-header">
        <div className="ai-header-left">
          <div className="ai-dot-pulse" />
          <span className="ai-label">AI Insights</span>
        </div>
        <span className="ai-powered" style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><Sparkles size={12} /> SpendSmart AI</span>
      </div>

      {/* Active insight */}
      <AnimatePresence mode="wait">
        <motion.div
          key={active}
          className="ai-insight-body"
          style={{ background: style.bg, borderColor: style.border }}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.3 }}
        >
          <div className="ai-insight-icon">{current.icon}</div>
          <div className="ai-insight-text">
            <p className="ai-insight-title">{current.title}</p>
            <p className="ai-insight-msg">{current.message}</p>
          </div>
          <div className="ai-type-dot" style={{ background: style.dot }} />
        </motion.div>
      </AnimatePresence>

      {/* Dots navigation */}
      {insights.length > 1 && (
        <div className="ai-dots">
          {insights.map((_, i) => (
            <button
              key={i}
              className={`ai-dot ${i === active ? 'ai-dot--active' : ''}`}
              onClick={() => setActive(i)}
              aria-label={`Insight ${i + 1}`}
            />
          ))}
        </div>
      )}

      {/* Mini summary row */}
      <div className="ai-summary-row">
        <div className="ai-summary-item">
          <span className="ai-summary-val">₹{(summary.thisMonthTotal || 0).toLocaleString('en-IN', { maximumFractionDigits: 0 })}</span>
          <span className="ai-summary-key">This month</span>
        </div>
        <div className="ai-summary-divider" />
        <div className="ai-summary-item">
          <span className={`ai-summary-val ${summary.trend > 0 ? 'ai-val-warn' : 'ai-val-good'}`}>
            {summary.trend > 0 ? '↑' : '↓'} {Math.abs(summary.trend)}%
          </span>
          <span className="ai-summary-key">vs last month</span>
        </div>
        <div className="ai-summary-divider" />
        <div className="ai-summary-item">
          <span className="ai-summary-val">₹{(summary.predictedMonthEnd || 0).toLocaleString('en-IN', { maximumFractionDigits: 0 })}</span>
          <span className="ai-summary-key">Forecast</span>
        </div>
      </div>
    </div>
  );
}

export default AIInsights;
