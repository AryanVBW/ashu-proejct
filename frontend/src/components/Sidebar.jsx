import React from "react";
import { FaHome } from "react-icons/fa";
import { FaPlusCircle } from "react-icons/fa";
import { FaExchangeAlt } from "react-icons/fa";
import { FaChartPie } from "react-icons/fa";
import { FaSignOutAlt } from "react-icons/fa";

function Sidebar() {
  return (
    <div className="sidebar">
      <h2 className="logo">
  Expense <br /> Tracker
</h2>

      <ul className="menu">
        <li>
          <FaHome /> Dashboard
        </li>

        <li>
          <FaPlusCircle /> Add Expense
        </li>

        <li>
          <FaExchangeAlt /> Transactions
        </li>

        <li>
          <FaChartPie /> Reports
        </li>

        <li>
          <FaSignOutAlt /> Logout
        </li>
      </ul>
    </div>
  );
}

export default Sidebar;