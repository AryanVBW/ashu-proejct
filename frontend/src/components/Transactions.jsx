import React, { useState } from "react";

function Transactions() {

  const [search, setSearch] = useState("");

  const transactions = [
    { id: 1, title: "Food", amount: 500, category: "Food" },
    { id: 2, title: "Shopping", amount: 1200, category: "Shopping" },
    { id: 3, title: "Transport", amount: 300, category: "Transport" },
    { id: 4, title: "Movie", amount: 400, category: "Entertainment" },
    { id: 5, title: "Salary", amount: 40000, category: "Income" }
  ];

  const filteredTransactions = transactions.filter((t) =>
    t.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="transactions">

      {/* Header */}
      <div className="transaction-header">
        <h2>Transactions</h2>

        <input
          type="text"
          placeholder="Search transactions..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="search-bar"
        />
      </div>

      {/* Transactions Table */}
      <table className="transaction-table">
        <thead>
          <tr>
            <th>Title</th>
            <th>Category</th>
            <th>Amount</th>
          </tr>
        </thead>

        <tbody>
          {filteredTransactions.map((t) => (
            <tr key={t.id}>
              <td>{t.title}</td>
              <td>{t.category}</td>
              <td>₹{t.amount}</td>
            </tr>
          ))}
        </tbody>

      </table>

    </div>
  );
}

export default Transactions;
// import React from "react";

// function Transactions() {

//   const transactions = [
//     { id: 1, title: "Groceries", amount: 500, category: "Food" },
//     { id: 2, title: "Bus Ticket", amount: 100, category: "Transport" },
//     { id: 3, title: "Netflix", amount: 800, category: "Entertainment" }
//   ];

//   return (
//     <div className="table-container">

//       <h3>Recent Transactions</h3>

//       <table>

//         <thead>
//           <tr>
//             <th>Title</th>
//             <th>Amount</th>
//             <th>Category</th>
//           </tr>
//         </thead>

//         <tbody>

//           {transactions.map((t) => (
//             <tr key={t.id}>
//               <td>{t.title}</td>
//               <td>₹{t.amount}</td>

//               <td>
//                 <span className={`category ${t.category.toLowerCase()}`}>
//                   {t.category}
//                 </span>
//               </td>

//             </tr>
//           ))}

//         </tbody>

//       </table>

//     </div>
//   );
// }

// export default Transactions;