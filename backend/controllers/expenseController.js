const Expense = require("../models/Expense");

// @desc    Add a new expense
// @route   POST /api/expenses
const addExpense = async (req, res) => {
  try {
    const { title, amount, category, date, description } = req.body;

    const expense = await Expense.create({
      user: req.user._id,
      title,
      amount,
      category,
      date,
      description,
    });

    res.status(201).json(expense);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get all expenses for the logged-in user
// @route   GET /api/expenses
const getExpenses = async (req, res) => {
  try {
    const expenses = await Expense.find({ user: req.user._id }).sort({
      date: -1,
    });
    res.json(expenses);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Update an expense
// @route   PUT /api/expenses/:id
const updateExpense = async (req, res) => {
  try {
    const expense = await Expense.findById(req.params.id);

    if (!expense) {
      return res.status(404).json({ message: "Expense not found" });
    }

    if (expense.user.toString() !== req.user._id.toString()) {
      return res.status(401).json({ message: "Not authorized" });
    }

    const updated = await Expense.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.json(updated);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Delete an expense
// @route   DELETE /api/expenses/:id
const deleteExpense = async (req, res) => {
  try {
    const expense = await Expense.findById(req.params.id);

    if (!expense) {
      return res.status(404).json({ message: "Expense not found" });
    }

    if (expense.user.toString() !== req.user._id.toString()) {
      return res.status(401).json({ message: "Not authorized" });
    }

    await expense.deleteOne();
    res.json({ message: "Expense removed" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get AI insights for user's expenses
// @route   GET /api/expenses/insights
const getInsights = async (req, res) => {
  try {
    const expenses = await Expense.find({ user: req.user._id });

    const now = new Date();
    const thisMonthStart = new Date(now.getFullYear(), now.getMonth(), 1);
    const lastMonthStart = new Date(now.getFullYear(), now.getMonth() - 1, 1);
    const lastMonthEnd   = new Date(now.getFullYear(), now.getMonth(), 0);

    const thisMonth = expenses.filter(e => new Date(e.date) >= thisMonthStart);
    const lastMonth = expenses.filter(e => {
      const d = new Date(e.date);
      return d >= lastMonthStart && d <= lastMonthEnd;
    });

    // Category breakdown (all time)
    const categoryTotals = {};
    expenses.forEach(e => {
      categoryTotals[e.category] = (categoryTotals[e.category] || 0) + Math.abs(e.amount);
    });
    const sortedCategories = Object.entries(categoryTotals).sort((a, b) => b[1] - a[1]);
    const topCategory = sortedCategories[0];

    const thisMonthTotal = thisMonth.reduce((s, e) => s + Math.abs(e.amount), 0);
    const lastMonthTotal = lastMonth.reduce((s, e) => s + Math.abs(e.amount), 0);
    const trend = lastMonthTotal > 0
      ? ((thisMonthTotal - lastMonthTotal) / lastMonthTotal) * 100
      : 0;

    // Predict month-end spend
    const daysInMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0).getDate();
    const daysElapsed = Math.max(now.getDate(), 1);
    const predictedMonthEnd = (thisMonthTotal / daysElapsed) * daysInMonth;

    const insights = [];

    if (expenses.length === 0) {
      insights.push({
        type: 'info',
        title: 'Start Tracking',
        message: 'Add your first transaction to unlock AI-powered insights and personalised spending analysis.',
        icon: '🤖',
      });
    } else {
      if (trend > 15) {
        insights.push({
          type: 'warning',
          title: 'Spending Spike Detected',
          message: `Your spending is up ${trend.toFixed(1)}% vs last month. Your top category is ${topCategory?.[0] || 'Other'} — consider reviewing it.`,
          icon: '⚠️',
        });
      } else if (trend < -10) {
        insights.push({
          type: 'success',
          title: 'Great Savings Progress!',
          message: `You've reduced spending by ${Math.abs(trend).toFixed(1)}% compared to last month. Keep up the excellent momentum!`,
          icon: '✅',
        });
      } else if (trend > 5) {
        insights.push({
          type: 'info',
          title: 'Slight Spending Increase',
          message: `Spending is up ${trend.toFixed(1)}% this month. Everything looks manageable — stay on your current path.`,
          icon: '📊',
        });
      }

      if (topCategory) {
        insights.push({
          type: 'info',
          title: `Top Spend: ${topCategory[0]}`,
          message: `₹${topCategory[1].toFixed(0)} spent on ${topCategory[0]} overall. ${topCategory[1] > thisMonthTotal * 0.4 ? 'This is over 40% of your spending — consider a budget.' : 'Healthy distribution across categories.'}`,
          icon: '📌',
        });
      }

      if (predictedMonthEnd > lastMonthTotal * 1.25 && lastMonthTotal > 0) {
        insights.push({
          type: 'warning',
          title: 'Month-End Forecast Alert',
          message: `At your current pace, you'll spend ₹${predictedMonthEnd.toFixed(0)} this month — 25%+ more than last month (₹${lastMonthTotal.toFixed(0)}).`,
          icon: '🎯',
        });
      }

      if (thisMonth.length >= 5 && thisMonthTotal < lastMonthTotal * 0.8) {
        insights.push({
          type: 'success',
          title: 'On Budget Track',
          message: `You're spending 20%+ less than last month. Your discipline is paying off — projected savings look strong.`,
          icon: '🏆',
        });
      }

      if (insights.length === 0) {
        insights.push({
          type: 'info',
          title: 'Spending Looks Balanced',
          message: 'Your spending patterns are stable this month. Log more transactions to unlock deeper AI insights.',
          icon: '🤖',
        });
      }
    }

    res.json({
      insights,
      summary: {
        thisMonthTotal,
        lastMonthTotal,
        trend: parseFloat(trend.toFixed(1)),
        topCategory: topCategory?.[0] || null,
        topCategoryAmount: topCategory ? parseFloat(topCategory[1].toFixed(0)) : 0,
        predictedMonthEnd: parseFloat(predictedMonthEnd.toFixed(0)),
        totalTransactions: expenses.length,
      },
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { addExpense, getExpenses, updateExpense, deleteExpense, getInsights };
