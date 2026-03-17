import React, { useState } from "react";
import { Search, Download, ChevronsUpDown, Coffee, ShoppingBag, Car, Film, Banknote, Lightbulb, Heart, Pin } from "lucide-react";
import "./Transactions.css";

const CATEGORY_META = {
  Food:          { icon: <Coffee size={14} />, color: "#6366f1", bg: "rgba(99,102,241,0.12)"  },
  Shopping:      { icon: <ShoppingBag size={14} />, color: "#f59e0b", bg: "rgba(245,158,11,0.12)" },
  Transport:     { icon: <Car size={14} />, color: "#3b82f6", bg: "rgba(59,130,246,0.12)"  },
  Entertainment: { icon: <Film size={14} />, color: "#a855f7", bg: "rgba(168,85,247,0.12)" },
  Income:        { icon: <Banknote size={14} />, color: "#10b981", bg: "rgba(16,185,129,0.12)"  },
  Bills:         { icon: <Lightbulb size={14} />, color: "#f59e0b", bg: "rgba(245,158,11,0.12)" },
  Health:        { icon: <Heart size={14} />, color: "#f43f5e", bg: "rgba(244,63,94,0.12)"  },
};

const DEFAULT_META = { icon: <Pin size={14} />, color: "#94a3b8", bg: "rgba(148,163,184,0.12)" };

function Transactions({ expenses = [] }) {
  const [search, setSearch] = useState("");

  const filtered = expenses.filter((t) =>
    t.title.toLowerCase().includes(search.toLowerCase()) ||
    t.category.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="tx-wrap">
      {/* Header */}
      <div className="tx-head">
        <div>
          <div className="tx-head-title-row">
            <div className="section-title-bar" style={{ background: "var(--accent)" }} />
            <p className="section-title">Recent Transactions</p>
          </div>
          <p className="tx-head-sub">{filtered.length} records this month</p>
        </div>
        <div className="tx-controls">
          <div className="tx-search-wrap">
            <Search size={13} className="tx-search-icon" />
            <input
              className="tx-search"
              placeholder="Search..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <button className="tx-export-btn" title="Export CSV">
            <Download size={14} />
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="tx-table-scroll">
        <table className="tx-table">
          <thead>
            <tr>
              <th>Transaction</th>
              <th>Category</th>
              <th>Date</th>
              <th style={{ textAlign: "right" }}>Amount</th>
            </tr>
          </thead>
          <tbody>
            {filtered.length === 0 ? (
              <tr>
                <td colSpan={4} className="tx-empty">No transactions found</td>
              </tr>
            ) : (
              filtered.map((t) => {
                const m = CATEGORY_META[t.category] || DEFAULT_META;
                const isIncome = t.amount > 0;
                
                return (
                  <tr key={t._id} className="tx-row">
                    <td>
                      <div className="tx-cell-name">
                        <div className="tx-icon" style={{ background: m.bg, color: m.color }}>
                          {m.icon}
                        </div>
                        <span className="tx-title-text">{t.title}</span>
                      </div>
                    </td>
                    <td>
                      <span className="tx-badge" style={{ color: m.color, background: m.bg }}>
                        {t.category}
                      </span>
                    </td>
                    <td className="tx-date">{new Date(t.date).toLocaleDateString()}</td>
                    <td
                      className="tx-amount"
                      style={{ color: isIncome ? "#10b981" : "#f8fafc" }}
                    >
                      {isIncome ? "+" : "-"}₹{Math.abs(t.amount).toLocaleString()}
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Transactions;