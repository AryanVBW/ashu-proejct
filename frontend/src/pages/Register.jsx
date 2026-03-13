import React from "react";  
import "./Register.css";

function Register() {
  return (
    <div className="login-container">
      <div className="login-card">

        <h2>Create Account</h2>

        <input type="text" placeholder="Name" />
        <input type="email" placeholder="Email" />
        <input type="password" placeholder="Password" />
        <input type="password" placeholder="Confirm Password" />

        <button>Register</button>

        <p className="login-link">
          Already have an account? <a href="/">Login</a>
        </p>

      </div>
    </div>
  );
}

export default Register;