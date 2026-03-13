// ExpenseChart.jsx
import React, { useRef, useEffect, useState } from "react";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js";
import { Bar } from "react-chartjs-2";
import PropTypes from "prop-types";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const ExpenseChart = ({ labels, data }) => {
  const chartRef = useRef(null);
  const [gradient, setGradient] = useState(null);

  useEffect(() => {
    const chart = chartRef.current;
    if (!chart) return;

    const ctx = chart.ctx;
    const gradientFill = ctx.createLinearGradient(0, 0, 0, chart.height);
    gradientFill.addColorStop(0, "#6366f1");
    gradientFill.addColorStop(1, "#a5b4fc");
    setGradient(gradientFill);
  }, [labels, data]);

  const chartData = {
    labels,
    datasets: [
      {
        label: "Expenses",
        data,
        backgroundColor: gradient || "#6366f1",
        borderRadius: 8,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        grid: { display: false },
      },
      x: {
        grid: { display: false },
      },
    },
  };

  return (
    <div style={{ height: "300px" }}>
      <Bar ref={chartRef} data={chartData} options={options} />
    </div>
  );
};

ExpenseChart.propTypes = {
  labels: PropTypes.arrayOf(PropTypes.string),
  data: PropTypes.arrayOf(PropTypes.number),
};

ExpenseChart.defaultProps = {
  labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
  data: [500, 1000, 750, 1200, 900, 600],
};

export default ExpenseChart;