import React from "react";
import { FaWallet } from "react-icons/fa";
import { FaArrowUp } from "react-icons/fa";
import { FaArrowDown } from "react-icons/fa";

function DashboardCards() {
  return (
    <div className="cards-container">

      <div className="card balance">
        <FaWallet size={28} />
        <h3>Total Balance</h3>
        <p>₹25,000</p>
      </div>

      <div className="card income">
        <FaArrowUp size={28} />
        <h3>Total Income</h3>
        <p>₹40,000</p>
      </div>

      <div className="card expense">
        <FaArrowDown size={28} />
        <h3>Total Expenses</h3>
        <p>₹15,000</p>
      </div>

    </div>
  );
}

export default DashboardCards;