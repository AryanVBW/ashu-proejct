const express = require("express");
const router = express.Router();
const {
  addExpense,
  getExpenses,
  deleteExpense,
  updateExpense,
  getInsights,
} = require("../controllers/expenseController");

const { auth } = require("../middleware/authMiddleware");

router.get("/insights", auth, getInsights);
router.route("/").get(auth, getExpenses).post(auth, addExpense);
router.route("/:id").put(auth, updateExpense).delete(auth, deleteExpense);

module.exports = router;
