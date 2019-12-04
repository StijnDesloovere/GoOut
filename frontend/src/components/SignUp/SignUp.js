import React from "react";
import "./SignUp.css";

const initialState = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  confirmPassword: "",
  birthDate: "",
  firstNameError: "",
  lastNameError: "",
  emailError: "",
  passwordError: "",
  confirmPasswordError: "",
  birthDateError: ""
};

class SignUpWindow extends React.Component {
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
    let firstNameError = "";
    let lastNameError = "";
    let emailError = "";
    let passwordError = "";
    let confirmPasswordError = "";
    let birthDateError = "";

    if (!this.state.firstName) {
      firstNameError = "Fill in your first name";
    }

    if (!this.state.lastName) {
      lastNameError = "Fill in your last name";
    }

    if (!this.state.email.includes("@")) {
      emailError = "invalid email";
    }

    if (!this.state.password) {
      passwordError = "Choose a password";
    }

    if (!this.state.confirmPassword) {
      confirmPasswordError = "Confirm your password";
    } else if (this.state.password !== this.state.confirmPassword) {
      confirmPasswordError = "Your passwords don't match";
    }

    if (!this.state.birthDate) {
      birthDateError = "Fill in your birth date";
    }

    if (
      firstNameError ||
      lastNameError ||
      emailError ||
      passwordError ||
      confirmPasswordError ||
      birthDateError
    ) {
      this.setState({
        firstNameError,
        lastNameError,
        emailError,
        passwordError,
        confirmPasswordError,
        birthDateError
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
    }
  };

  render() {
    return (
      <form className="signUpForm" onSubmit={this.handleSubmit}>
        <div className="formFields">
          <div className="header">Create your account</div>
          <div className="signUpFields">
            <p className="firstName">
              <b>First name*</b>
            </p>
            <input
              type="text"
              id="firstName"
              onChange={this.handleInputChanges}
            />
            <div className="error">{this.state.firstNameError}</div>
            <p className="lastName">
              <b>Last name*</b>
            </p>
            <input
              type="text"
              id="lastName"
              onChange={this.handleInputChanges}
            />
            <div className="error">{this.state.lastNameError}</div>
            <p className="email">
              <b>Email*</b>
            </p>
            <input type="text" id="email" onChange={this.handleInputChanges} />
            <div className="error">{this.state.emailError}</div>
            <p className="password">
              <b>Password*</b>
            </p>
            <input
              type="password"
              id="password"
              onChange={this.handleInputChanges}
            />
            <div className="error">{this.state.passwordError}</div>
            <p className="confirmPassword">
              <b>Confirm Password*</b>
            </p>
            <input
              type="password"
              id="confirmPassword"
              onChange={this.handleInputChanges}
            />
            <div className="error">{this.state.confirmPasswordError}</div>
            <p className="birthDate">
              <b>Birth date*</b>
            </p>
            <input
              type="date"
              id="birthDate"
              onChange={this.handleInputChanges}
            />
            <div className="error">{this.state.birthDateError}</div>

            <p className="gender">
              <b>Gender</b>
            </p>
          </div>
          <div className="radiocontainer">
            <input
              className="inputButton"
              id="male"
              name="gender"
              type="radio"
              defaultChecked
            />
            <label className="male">Male</label>
            <input
              className="inputButton"
              id="female"
              name="gender"
              type="radio"
            />
            <label className="female">Female</label>
          </div>
          <div className="signUpFields">
            <p className="location">
              <b>Location</b>
            </p>
            <input type="text" id="location" />
            <p className="phoneNumber">
              <b>Phone number</b>
            </p>
            <input type="text" id="phoneNumber" />
          </div>
        </div>
        <div className="signUpButton">
          <button className="sButton" type="submit">
            <span>Sign Up</span>
          </button>
        </div>
      </form>
    );
  }
}

export default SignUpWindow;
