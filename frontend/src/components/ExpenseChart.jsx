import React from "react";
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend
} from "recharts";

import { PlusCircle } from "lucide-react";

// Helper to format chart data
const CustomTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null;
  return (
    <div style={{
      background: "#0d1420",
      border: "1px solid rgba(255,255,255,0.08)",
      borderRadius: 10,
      padding: "10px 14px",
      boxShadow: "0 8px 24px rgba(0,0,0,0.5)",
      fontSize: 12,
    }}>
      <p style={{ color: "#64748b", fontWeight: 600, marginBottom: 6, fontSize: 11, textTransform: "uppercase", letterSpacing: "0.6px" }}>{label}</p>
      {payload.map((p) => (
        <div key={p.name} style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 3 }}>
          <div style={{ width: 8, height: 8, borderRadius: "50%", background: p.color, flexShrink: 0 }} />
          <span style={{ color: "#94a3b8" }}>{p.name === "income" ? "Income" : "Expenses"}</span>
          <span style={{ marginLeft: "auto", fontWeight: 700, color: "#f8fafc", paddingLeft: 16 }}>
            ₹{p.value.toLocaleString()}
          </span>
        </div>
      ))}
    </div>
  );
};

function ExpenseChart({ expenses = [] }) {
  if (expenses.length === 0) {
    return (
      <div style={{ height: "200px", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", color: "#64748b", gap: "12px", border: "1px dashed rgba(255,255,255,0.1)", borderRadius: "12px", background: "rgba(255,255,255,0.02)" }}>
        <PlusCircle size={32} style={{ opacity: 0.5 }} />
        <p style={{ fontSize: "14px", fontWeight: "500" }}>No chart data available</p>
        <p style={{ fontSize: "12px", opacity: 0.7 }}>Add transactions to see your monthly overview.</p>
      </div>
    );
  }

  // Calculate monthly aggregations
  const monthlyData = {};
  expenses.forEach(e => {
    const d = new Date(e.date);
    const month = d.toLocaleString('default', { month: 'short' });
    if (!monthlyData[month]) monthlyData[month] = { month, income: 0, expenses: 0, order: d.getMonth() };
    
    // If backend only stores positive amounts, we can attempt to infer from category or type. Assuming amount > 0 is income if specified.
    if (e.amount > 0) monthlyData[month].income += e.amount;
    else monthlyData[month].expenses += Math.abs(e.amount);
  });
  
  // Sort by month index and take last 6
  let chartData = Object.values(monthlyData).sort((a,b) => a.order - b.order).slice(-6);

  return (
    <ResponsiveContainer width="100%" height={200}>
      <AreaChart data={chartData} margin={{ top: 4, right: 4, bottom: 0, left: 0 }}>
        <defs>
          <linearGradient id="incomeGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%"  stopColor="#10b981" stopOpacity={0.25} />
            <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
          </linearGradient>
          <linearGradient id="expGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%"  stopColor="#6366f1" stopOpacity={0.25} />
            <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
          </linearGradient>
        </defs>
        <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
        <XAxis
          dataKey="month"
          tick={{ fill: "#475569", fontSize: 11, fontFamily: "Inter" }}
          axisLine={false}
          tickLine={false}
        />
        <YAxis
          tick={{ fill: "#475569", fontSize: 11, fontFamily: "Inter" }}
          axisLine={false}
          tickLine={false}
          tickFormatter={(v) => `₹${(v/1000).toFixed(0)}k`}
          width={44}
        />
        <Tooltip content={<CustomTooltip />} />
        <Area type="monotone" dataKey="income"   stroke="#10b981" strokeWidth={2} fill="url(#incomeGrad)" dot={false} />
        <Area type="monotone" dataKey="expenses" stroke="#6366f1" strokeWidth={2} fill="url(#expGrad)"    dot={false} />
        <Legend
          wrapperStyle={{ fontSize: 11, color: "#64748b", paddingTop: 12 }}
          formatter={(v) => v === "income" ? "Income" : "Expenses"}
        />
      </AreaChart>
    </ResponsiveContainer>
  );
}

export default ExpenseChart;