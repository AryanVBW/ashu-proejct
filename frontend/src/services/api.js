export const API_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000/api";
// Helper to get auth header
const getAuthHeaders = () => {
  const token = localStorage.getItem("expense_token");
  return {
    "Content-Type": "application/json",
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };
};

export const authAPI = {
  login: async (email, password) => {
    const res = await fetch(`${API_URL}/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });
    if (!res.ok) {
      const error = await res.json();
      throw new Error(error.message || "Failed to login");
    }
    return res.json();
  },
  
  register: async (name, email, password) => {
    const res = await fetch(`${API_URL}/auth/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, password }),
    });
    if (!res.ok) {
      const error = await res.json();
      throw new Error(error.message || "Failed to register");
    }
    return res.json();
  }
};

export const expenseAPI = {
  getExpenses: async () => {
    const res = await fetch(`${API_URL}/expenses`, {
      headers: getAuthHeaders(),
    });
    if (!res.ok) throw new Error("Failed to fetch expenses");
    return res.json();
  },

  getInsights: async () => {
    const res = await fetch(`${API_URL}/expenses/insights`, {
      headers: getAuthHeaders(),
    });
    if (!res.ok) throw new Error("Failed to fetch insights");
    return res.json();
  },

  addExpense: async (expenseData) => {
    const res = await fetch(`${API_URL}/expenses`, {
      method: "POST",
      headers: getAuthHeaders(),
      body: JSON.stringify(expenseData),
    });
    if (!res.ok) throw new Error("Failed to add expense");
    return res.json();
  }
};
