import React from "react";
import { Link } from "react-router-dom";

import "./Login.css";

class LoginWindow extends React.Component {
  render() {
    return (
      <form>
        <div className="loginForm">
          <div className="header">Welcome to GoOut!</div>
          <div className="inputFields">
            <div className="usernameInput">
              <label htmlFor="username">
                <b>Username</b>
              </label>
              <input type="text" id="username" required />
            </div>
            <div className="passwordInput">
              <label htmlFor="password">
                <b>Password</b>
              </label>
              <input type="password" id="password" required />
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
  }
}

export default LoginWindow;
