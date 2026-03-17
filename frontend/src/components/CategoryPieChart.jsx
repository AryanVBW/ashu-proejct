import React from "react";
import {
  PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend
} from "recharts";

import { PieChart as PieChartIcon } from "lucide-react";

// Color mapping for categories
const CATEGORY_COLORS = {
  "Food": "#6366f1",
  "Shopping": "#f59e0b",
  "Transport": "#3b82f6",
  "Entertainment": "#a855f7",
  "Bills": "#10b981",
  "Health": "#ec4899",
  "Other": "#94a3b8"
};

const CustomTooltip = ({ active, payload }) => {
  if (!active || !payload?.length) return null;
  const d = payload[0];
  return (
    <div style={{
      background: "#0d1420",
      border: "1px solid rgba(255,255,255,0.08)",
      borderRadius: 8,
      padding: "8px 12px",
      boxShadow: "0 8px 24px rgba(0,0,0,0.5)",
      fontSize: 12,
    }}>
      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
        <div style={{ width: 8, height: 8, borderRadius: "50%", background: d.payload.color }} />
        <span style={{ color: "#94a3b8" }}>{d.name}</span>
        <span style={{ marginLeft: 8, fontWeight: 700, color: "#f8fafc" }}>
          ₹{d.value.toLocaleString()}
        </span>
        <span style={{ color: "#475569" }}>
          ({((d.value / total) * 100).toFixed(0)}%)
        </span>
      </div>
    </div>
  );
};

function CategoryPieChart({ expenses = [] }) {
  if (expenses.length === 0) {
    return (
      <div style={{ height: "180px", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", color: "#64748b", gap: "12px", border: "1px dashed rgba(255,255,255,0.1)", borderRadius: "12px", background: "rgba(255,255,255,0.02)", marginTop: "12px" }}>
        <PieChartIcon size={32} style={{ opacity: 0.5 }} />
        <p style={{ fontSize: "13px", fontWeight: "500" }}>No category data</p>
      </div>
    );
  }

  const categoryTotals = {};
  expenses.forEach(e => {
    const amount = Math.abs(e.amount); // Treat all as absolute spending to get breakdown
    categoryTotals[e.category] = (categoryTotals[e.category] || 0) + amount;
  });

  const chartData = Object.entries(categoryTotals)
    .map(([name, value]) => ({ name, value, color: CATEGORY_COLORS[name] || "#94a3b8" }))
    .sort((a, b) => b.value - a.value);

  const total = chartData.reduce((a, d) => a + d.value, 0);

  return (
    <div style={{ flex: 1 }}>
      <ResponsiveContainer width="100%" height={180}>
        <PieChart>
          <Pie
            data={chartData}
            cx="50%"
            cy="50%"
            innerRadius={52}
            outerRadius={76}
            paddingAngle={3}
            dataKey="value"
          >
            {chartData.map((entry, i) => (
              <Cell key={i} fill={entry.color} stroke="transparent" />
            ))}
          </Pie>
          <Tooltip content={<CustomTooltip />} />
        </PieChart>
      </ResponsiveContainer>

      {/* Custom legend */}
      <div style={{ display: "flex", flexDirection: "column", gap: 8, marginTop: 4 }}>
        {chartData.slice(0, 5).map((d) => (
          <div key={d.name} style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <div style={{
              width: 8, height: 8, borderRadius: "50%", background: d.color, flexShrink: 0
            }} />
            <span style={{ fontSize: 12, color: "#94a3b8", flex: 1 }}>{d.name}</span>
            <span style={{ fontSize: 12, fontWeight: 700, color: "#f8fafc" }}>
              ₹{d.value.toLocaleString()}
            </span>
            <span style={{ fontSize: 11, color: "#475569", width: 32, textAlign: "right" }}>
              {((d.value / total) * 100).toFixed(0)}%
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default CategoryPieChart;