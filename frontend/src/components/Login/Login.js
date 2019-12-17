import React from "react";
import { Link, withRouter } from "react-router-dom";
import axios from "axios"

import "./Login.css";

const initialState = {
  email: "",
  password: "",
  emailError: "",
  passwordError: "",
  loginError: ""
};

class LoginWindow extends React.Component {
  state = initialState;

  /* Update the state with the currect value*/
  handleInputChanges = event => {
    this.setState({
      [event.target.id]: event.target.value
    });
  };

  /*Check if the form is filled in correctly*/
  validate = () => {
    let emailError = "";
    let passwordError = "";

    if (!this.state.email) {
      emailError = "Fill in your email";
    }

    if (!this.state.password) {
      passwordError = "Fill in your password";
    }

    if (emailError || passwordError) {
      this.setState({
        emailError,
        passwordError
      });
      return false;
    }

    return true;
  };

  // Tries to log in with the specified email and password
  authenticateLogin(email, password) {
    axios.post("http://127.0.0.1:8000/rest-auth/login/", {
      username: email,
      password: password
    })
    .then(result => {
      const token = result.data.key;
      localStorage.setItem('token', token);
    })
    .catch(error => {
      this.setState({
        loginError: "Wrong combination of email and password"
      })
      return false
    })
    return true
  }

  /*Validate the form. Either display the correct error messages or send the data*/
  handleSubmit = event => {
    event.preventDefault();

    const valid = this.validate();

    if (valid) {
      const loggedIn = this.authenticateLogin(this.state.email, this.state.password);
      if(loggedIn) {
        this.props.history.push("/home");
      }
    }
  };

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <div className="loginForm">
          <div className="header">
            <img src={require(`../../images/Logo.png`)} alt="" />
          </div>
          <div className="inputFields">
            <div className="emailInput">
              <label htmlFor="email">
                <b>Email</b>
              </label>
              <input
                type="text"
                id="email"
                onChange={this.handleInputChanges}
              />
              <div className="errorLogin">{this.state.emailError}</div>
            </div>
            <div className="passwordInput">
              <label htmlFor="password">
                <b>Password</b>
              </label>
              <input
                type="password"
                id="password"
                onChange={this.handleInputChanges}
              />
              <div className="errorLogin">{this.state.passwordError}</div>
            </div>
          </div>
          <div className="signUpRedirect">
            <pre>
              Don't have an account yet? Sign up <Link to="/signup">here</Link>
            </pre>
          </div>
          <div className="loginButton">
            <button className="lButton" type="submit">
              <span>Login</span>
            </button>
          </div>
          <div className="errorLogin" id="loginError">{this.state.loginError}</div>
        </div>
      </form>
    );
  }
}

export default withRouter(LoginWindow);
