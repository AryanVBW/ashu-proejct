import React, { useState } from "react";

function AddExpenseForm() {

  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    const newExpense = {
      title,
      amount,
      category
    };

    console.log(newExpense);

    setTitle("");
    setAmount("");
    setCategory("");
  };

  return (
    <div className="form-container">

      <h3>Add Expense</h3>

      <form onSubmit={handleSubmit}>

        <input
          type="text"
          placeholder="Expense Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <input
          type="number"
          placeholder="Amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />

        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option value="">Select Category</option>
          <option>Food</option>
          <option>Transport</option>
          <option>Shopping</option>
          <option>Bills</option>
        </select>

        <button type="submit">Add Expense</button>

      </form>

    </div>
  );
}

export default AddExpenseForm;