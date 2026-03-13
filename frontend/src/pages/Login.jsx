import React from "react";
import "./Login.css";

function Login() {
  return (
    <div className="login-container">
      <div className="login-card">
        <h2>Smart Expense Tracker</h2>
        <p>Welcome Back</p>

        <input
          type="email"
          placeholder="Enter your email"
        />

        <input
          type="password"
          placeholder="Enter your password"
        />

        <button>Login</button>

        <p className="forgot">Forgot Password?</p>

        <p>
          Don't have an account? <span>Register</span>
        </p>
      </div>
    </div>
  );
}

export default Login;