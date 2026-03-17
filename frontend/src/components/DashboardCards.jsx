import React from "react";
import { motion } from "framer-motion";
import { Wallet, TrendingUp, TrendingDown, PiggyBank, ArrowUpRight, ArrowDownRight } from "lucide-react";
import "./DashboardCards.css";

function DashboardCards({ expenses = [], summary }) {
  const totalIncome = expenses.filter(e => e.amount > 0).reduce((s, e) => s + e.amount, 0);
  const totalExpense = expenses.filter(e => e.amount < 0).reduce((s, e) => s + Math.abs(e.amount), 0);
  const balance = totalIncome - totalExpense;
  const savingsRate = totalIncome > 0 ? ((balance / totalIncome) * 100).toFixed(1) : 0;

  // Use summary for changes if available, else 0
  const trend = summary?.trend || 0;

  const cards = [
    {
      id:       "balance",
      label:    "Total Balance",
      value:    `₹${balance.toLocaleString()}`,
      change:   trend > 0 ? `+${trend}%` : `${trend}%`,
      sub:      "vs last month",
      positive: balance >= 0,
      icon:     <Wallet size={18} />,
      color:    "#6366f1",
      glow:     "rgba(99,102,241,0.20)",
      dim:      "rgba(99,102,241,0.10)",
    },
    {
      id:       "income",
      label:    "Total Income",
      value:    `₹${totalIncome.toLocaleString()}`,
      change:   "+0.0%",
      sub:      "all time",
      positive: true,
      icon:     <TrendingUp size={18} />,
      color:    "#10b981",
      glow:     "rgba(16,185,129,0.20)",
      dim:      "rgba(16,185,129,0.10)",
    },
    {
      id:       "expenses",
      label:    "Total Expenses",
      value:    `₹${totalExpense.toLocaleString()}`,
      change:   `${trend}%`,
      sub:      "vs last month",
      positive: trend <= 0,
      icon:     <TrendingDown size={18} />,
      color:    "#f43f5e",
      glow:     "rgba(244,63,94,0.20)",
      dim:      "rgba(244,63,94,0.10)",
    },
    {
      id:       "savings",
      label:    "Savings Rate",
      value:    `${savingsRate}%`,
      change:   "+0.0%",
      sub:      "of total income",
      positive: savingsRate > 0,
      icon:     <PiggyBank size={18} />,
      color:    "#f59e0b",
      glow:     "rgba(245,158,11,0.20)",
      dim:      "rgba(245,158,11,0.10)",
    },
  ];

  if (expenses.length === 0) {
    return (
      <div className="stat-grid">
        {cards.map((card, i) => (
          <div key={card.id} className="stat-card" style={{ opacity: 0.5, borderStyle: 'dashed' }}>
             <div className="stat-card-top">
              <span className="stat-label">{card.label}</span>
              <div className="stat-icon" style={{ color: card.color, background: card.dim }}>{card.icon}</div>
             </div>
             <p className="stat-value" style={{ color: "var(--text-primary)" }}>₹0</p>
             <div className="stat-footer">
               <span className="stat-badge" style={{ color: "#64748b", background: "rgba(255,255,255,0.05)" }}>0%</span>
               <span className="stat-footer-sub">No data yet</span>
             </div>
             <div className="stat-accent-line" style={{ background: card.color }} />
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="stat-grid">
      {cards.map((card, i) => (
        <motion.div
          key={card.id}
          className="stat-card"
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.06, duration: 0.3, ease: [0, 0, 0.2, 1] }}
          whileHover={{ y: -3, boxShadow: `0 16px 36px ${card.glow}` }}
        >
          {/* Top Row */}
          <div className="stat-card-top">
            <span className="stat-label">{card.label}</span>
            <div className="stat-icon" style={{ color: card.color, background: card.dim }}>
              {card.icon}
            </div>
          </div>

          {/* Value */}
          <p className="stat-value" style={{ color: "var(--text-primary)" }}>
            {card.value}
          </p>

          {/* Badge */}
          <div className="stat-footer">
            <span
              className="stat-badge"
              style={{
                color:      card.positive ? "#10b981" : "#f43f5e",
                background: card.positive ? "rgba(16,185,129,0.10)" : "rgba(244,63,94,0.10)",
              }}
            >
              {card.positive
                ? <ArrowUpRight size={11} />
                : <ArrowDownRight size={11} />}
              {card.change}
            </span>
            <span className="stat-footer-sub">{card.sub}</span>
          </div>

          {/* Accent line */}
          <div className="stat-accent-line" style={{ background: card.color }} />
        </motion.div>
      ))}
    </div>
  );
}

export default DashboardCards;
