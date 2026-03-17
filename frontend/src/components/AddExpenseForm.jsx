import React, { useState } from "react";
import { motion } from "framer-motion";
import { Plus, DollarSign, Tag, Calendar, Loader2 } from "lucide-react";
import { expenseAPI } from "../services/api";
import "./AddExpenseForm.css";

const CATEGORIES = ["Food", "Transport", "Shopping", "Bills", "Entertainment", "Health", "Other", "Income"];

function AddExpenseForm({ onAdded }) {
  const [loading,  setLoading]  = useState(false);
  const [type,     setType]     = useState("expense");
  const [title,    setTitle]    = useState("");
  const [amount,   setAmount]   = useState("");
  const [category, setCategory] = useState("");
  const [date,     setDate]     = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title || !amount || !category) return;
    
    setLoading(true);
    try {
      const finalAmount = type === "expense" ? -Math.abs(Number(amount)) : Math.abs(Number(amount));
      
      await expenseAPI.addExpense({
        title,
        amount: finalAmount,
        category,
        date: date || new Date().toISOString()
      });
      
      setTitle(""); setAmount(""); setCategory(""); setDate(""); setType("expense");
      if (onAdded) onAdded();
    } catch (err) {
      console.error(err);
      alert("Failed to add transaction");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className="addform" onSubmit={handleSubmit}>

      {/* Type toggle */}
      <div className="addform-toggle">
        <button
          type="button"
          className={`addform-toggle-btn ${type === "expense" ? "addform-toggle-btn--active addform-toggle-btn--red" : ""}`}
          onClick={() => setType("expense")}
        >
          Expense
        </button>
        <button
          type="button"
          className={`addform-toggle-btn ${type === "income" ? "addform-toggle-btn--active addform-toggle-btn--green" : ""}`}
          onClick={() => setType("income")}
        >
          Income
        </button>
      </div>

      {/* Fields */}
      <div className="addform-fields">
        <div className="addform-field">
          <Tag size={13} className="addform-icon" />
          <input
            className="addform-input"
            type="text"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>

        <div className="addform-field">
          <DollarSign size={13} className="addform-icon" />
          <input
            className="addform-input"
            type="number"
            placeholder="Amount (₹)"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            min="0"
            required
          />
        </div>

        <div className="addform-field">
          <Tag size={13} className="addform-icon" />
          <select
            className="addform-input addform-select"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            required
          >
            <option value="">Category</option>
            {CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
          </select>
        </div>

        <div className="addform-field">
          <Calendar size={13} className="addform-icon" />
          <input
            className="addform-input"
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
        </div>
      </div>

      <motion.button
        type="submit"
        className={`addform-submit ${type === "income" ? "addform-submit--green" : ""}`}
        whileHover={{ scale: 1.015 }}
        whileTap={{ scale: 0.98 }}
        disabled={loading}
      >
        {loading ? <Loader2 size={14} className="animate-spin" /> : <Plus size={14} strokeWidth={2.5} />}
        {loading ? "Adding..." : `Add ${type === "expense" ? "Expense" : "Income"}`}
      </motion.button>
    </form>
  );
}

export default AddExpenseForm;