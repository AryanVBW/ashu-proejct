import React from "react";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

function CategoryPieChart() {

  const data = {
    labels: ["Food", "Transport", "Entertainment", "Shopping"],
    datasets: [
      {
        data: [500, 200, 300, 400],
        backgroundColor: [
          "#3b82f6",
          "#22c55e",
          "#f59e0b",
          "#ef4444"
        ]
      }
    ]
  };

  return (
    <div className="pie-chart-card">
      <h3>Expense Categories</h3>
      <Pie data={data} />
    </div>
  );
}

export default CategoryPieChart;