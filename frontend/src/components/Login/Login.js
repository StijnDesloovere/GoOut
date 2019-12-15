import React from "react";
import { Link, withRouter } from "react-router-dom";

import "./Login.css";

const initialState = {
  username: "",
  password: "",
  usernameError: "",
  passwordError: ""
};

class LoginWindow extends React.Component {
  state = initialState;

  /* Update the state with the currect value*/
  handleInputChanges = event => {
    console.log(this.state.password);
    this.setState({
      [event.target.id]: event.target.value
    });
  };

  /*Check if the form is filled in correctly*/
  validate = () => {
    let usernameError = "";
    let passwordError = "";

    if (!this.state.username) {
      usernameError = "Fill in your username";
    }

    if (!this.state.password) {
      passwordError = "Fill in your password";
    }

    if (usernameError || passwordError) {
      this.setState({
        usernameError,
        passwordError
      });
      return false;
    }

    return true;
  };

  /*Validate the form. Either display the correct error messages or send the data*/
  handleSubmit = event => {
    event.preventDefault();

    const valid = this.validate();

    if (valid) {
      console.log(this.state);
      this.setState(initialState);
      this.props.history.push("/home");
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
            <div className="usernameInput">
              <label htmlFor="username">
                <b>Username</b>
              </label>
              <input
                type="text"
                id="username"
                onChange={this.handleInputChanges}
              />
              <div className="errorLogin">{this.state.usernameError}</div>
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
        </div>
      </form>
    );
  }
}

export default withRouter(LoginWindow);
