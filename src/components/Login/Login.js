import React from "react";
import { Link } from "react-router-dom";

import "./Login.css";

const LoginWindow = () => (
  <form>
    <div className="LoginForm">
      <div className="header">Welcome to GoOut!</div>
      <div className="inputFields">
        <div className="usernameInput">
          <label for="username">
            <b>Username</b>
          </label>
          <input type="text" name="username" required />
        </div>
        <div className="passwordInput">
          <label for="password">
            <b>Password</b>
          </label>
          <input type="text" name="password" required />
        </div>
      </div>
      <div className="signUpRedirect">
        Don't have an account yet? Sign up
        <Link to="/signup"> here</Link>
      </div>
      <div className="loginButton">
        <button className="lButton" type="submit">
          <span>Login</span>
        </button>
      </div>
    </div>
  </form>
);

export default LoginWindow;
