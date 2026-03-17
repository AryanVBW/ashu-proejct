import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Loader2 } from "lucide-react";
import { expenseAPI } from "../services/api";
import DashboardCards from "../components/DashboardCards";
import ExpenseChart from "../components/ExpenseChart";
import CategoryPieChart from "../components/CategoryPieChart";
import AddExpenseForm from "../components/AddExpenseForm";
import Transactions from "../components/Transactions";
import BudgetProgressCard from "../components/BudgetProgressCard";
import AIInsights from "../components/AIInsights";
import "./Dashboard.css";

const fadeUp = {
  hidden: { opacity: 0, y: 16 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.35, ease: [0,0,0.2,1] } },
};

const stagger = {
  hidden: {},
  show:   { transition: { staggerChildren: 0.07 } },
};

function Dashboard() {
  const [expenses, setExpenses] = useState([]);
  const [insights, setInsights] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchData = async () => {
    try {
      setLoading(true);
      const [expensesData, insightsData] = await Promise.all([
        expenseAPI.getExpenses(),
        expenseAPI.getInsights()
      ]);
      setExpenses(expensesData || []);
      setInsights(insightsData || null);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (loading) {
    return (
      <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100%", color: "var(--text-muted)" }}>
        <Loader2 className="animate-spin" size={32} />
      </div>
    );
  }

  if (error) {
    return (
      <div style={{ padding: "40px", color: "var(--red)", textAlign: "center" }}>
        <h3>Error loading dashboard</h3>
        <p>{error}</p>
        <button className="section-pill" onClick={fetchData} style={{ marginTop: "16px", margin: "16px auto" }}>Retry</button>
      </div>
    );
  }

  return (
    <motion.div
      className="dashboard-grid"
      variants={stagger}
      initial="hidden"
      animate="show"
    >
      {/* Stat Cards */}
      <motion.section variants={fadeUp}>
        <DashboardCards expenses={expenses} summary={insights?.summary} />
      </motion.section>

      {/* AI Insights */}
      <motion.section variants={fadeUp}>
        <AIInsights data={insights} />
      </motion.section>

      {/* Charts Row */}
      <motion.section className="charts-row" variants={fadeUp}>
        <div className="chart-card">
          <div className="section-header">
            <div className="section-title-wrap">
              <div className="section-title-bar" />
              <div>
                <p className="section-title">Monthly Overview</p>
                <p className="section-sub">Income vs Expenses — 2026</p>
              </div>
            </div>
            <button className="section-pill">This Year</button>
          </div>
          <ExpenseChart expenses={expenses} />
        </div>

        <div className="chart-card chart-card--narrow">
          <div className="section-header">
            <div className="section-title-wrap">
              <div className="section-title-bar" />
              <div>
                <p className="section-title">By Category</p>
                <p className="section-sub">This Month</p>
              </div>
            </div>
          </div>
          <CategoryPieChart expenses={expenses} />
        </div>
      </motion.section>

      {/* Bottom Row */}
      <motion.section className="bottom-row" variants={fadeUp}>
        <div className="bottom-left">
          <div className="chart-card">
            <div className="section-header">
              <div className="section-title-wrap">
                <div className="section-title-bar" />
                <div>
                  <p className="section-title">Budget Tracker</p>
                  <p className="section-sub">Monthly limits</p>
                </div>
              </div>
            </div>
            <BudgetProgressCard expenses={expenses} />
          </div>

          <div className="chart-card">
            <div className="section-header">
              <div className="section-title-wrap">
                <div className="section-title-bar" style={{ background: "var(--green)" }} />
                <div>
                  <p className="section-title">Add Transaction</p>
                  <p className="section-sub">Record income or expense</p>
                </div>
              </div>
            </div>
            <AddExpenseForm onAdded={fetchData} />
          </div>
        </div>

        <div className="chart-card bottom-right">
          <Transactions expenses={expenses} />
        </div>
      </motion.section>
    </motion.div>
  );
}

export default Dashboard;
