import React from "react";
import { Coffee, Car, Film, ShoppingBag, Lightbulb } from "lucide-react";

const BUDGET_LIMITS = [
  { category: "Food",          icon: <Coffee size={15} />, limit: 8000,  color: "#6366f1" },
  { category: "Transport",     icon: <Car size={15} />, limit: 5000,  color: "#3b82f6" },
  { category: "Entertainment", icon: <Film size={15} />, limit: 3000,  color: "#f43f5e" },
  { category: "Shopping",      icon: <ShoppingBag size={15} />, limit: 6000,  color: "#f59e0b" },
  { category: "Bills",         icon: <Lightbulb size={15} />, limit: 4000,  color: "#10b981" },
];

function BudgetProgressCard({ expenses = [] }) {
  if (expenses.length === 0) {
    return (
      <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
        {BUDGET_LIMITS.map((b) => (
          <div key={b.category} style={{ opacity: 0.6 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6 }}>
              <span style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>{b.icon}</span>
              <span style={{ fontSize: 12.5, fontWeight: 500, color: "var(--text-primary)", flex: 1 }}>{b.category}</span>
              <span style={{ fontSize: 11, fontWeight: 600, color: "var(--text-muted)" }}>
                ₹0 <span style={{ fontWeight: 400 }}>/ ₹{b.limit.toLocaleString()}</span>
              </span>
            </div>
            <div style={{ height: 5, background: "rgba(255,255,255,0.05)", borderRadius: 99 }} />
          </div>
        ))}
      </div>
    );
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
      {BUDGET_LIMITS.map((b) => {
        const spent = expenses.filter(e => e.category === b.category && e.amount < 0)
                              .reduce((s, e) => s + Math.abs(e.amount), 0);
        const pct    = Math.min((spent / b.limit) * 100, 100);
        const isOver = spent >= b.limit;
        const barColor = isOver ? "#f43f5e" : b.color;

        return (
          <div key={b.category}>
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6 }}>
              <span style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>{b.icon}</span>
              <span style={{ fontSize: 12.5, fontWeight: 500, color: "var(--text-primary)", flex: 1 }}>
                {b.category}
              </span>
              <span style={{
                fontSize: 11,
                fontWeight: 600,
                color: isOver ? "#f43f5e" : "var(--text-primary)",
              }}>
                ₹{spent.toLocaleString()}
                <span style={{ fontWeight: 400, color: "var(--text-muted)" }}>
                  {" "}/ ₹{b.limit.toLocaleString()}
                </span>
              </span>
            </div>

            {/* Track */}
            <div style={{
              height: 5,
              background: "var(--bg-elevated)",
              borderRadius: 99,
              overflow: "hidden",
            }}>
              <div style={{
                width: `${pct}%`,
                height: "100%",
                background: barColor,
                borderRadius: 99,
                transition: "width 0.6s ease",
                boxShadow: isOver ? `0 0 6px ${barColor}80` : "none",
              }} />
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default BudgetProgressCard;
