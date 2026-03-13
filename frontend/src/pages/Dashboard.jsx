import React from "react";
import "./Dashboard.css";
import Sidebar from "../components/Sidebar";
import DashboardCards from "../components/DashboardCards";
import ExpenseChart from "../components/ExpenseChart";
import CategoryPieChart from "../components/CategoryPieChart";
import AddExpenseForm from "../components/AddExpenseForm";
import Transactions from "../components/Transactions";

function Dashboard() {
  return (
    <div className="dashboard">

      <Sidebar />

      <div className="main-content">
        <h1>Dashboard</h1>

        <DashboardCards />

        <h2>Expense Overview</h2>

        {/* Chart Section */}
        <div className="charts-section">
          <ExpenseChart />
          <CategoryPieChart />
        </div>

        <div className="bottom-section">
          <AddExpenseForm />
          <Transactions />
        </div>

      </div>

    </div>
  );
}

export default Dashboard;