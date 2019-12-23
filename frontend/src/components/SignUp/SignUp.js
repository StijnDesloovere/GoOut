import React from "react";
import "./SignUp.css";
import { withRouter } from "react-router-dom";
import axios from "axios";
import { getToken } from "../../authentication/auth"

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
  birthDateError: "",
  signUpError: ""
};

class SignUpWindow extends React.Component {
  state = initialState;

  /* Update the state with the currect value*/
  handleInputChanges = event => {
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

  // Send a post request to the server to register the user
  authenticateSignUp(email, password1, password2, firstName, lastName, birthDate, gender, phoneNumber, location) {
    axios.post("http://127.0.0.1:8000/rest-auth/registration/", {
      username: email,
      email: email,
      password1: password1,
      password2: password2
    })
    .then(result => {
      const token = result.data.key;
      localStorage.setItem('token', token);
    })
    .catch(error => {
      this.setState({
        ...this.state,
        signUpError: "An account with these credentials couldn't be made"
      })
      return true
    })
    .then(ErrorHappened => {
      if(!ErrorHappened) {
        let user = {}
        axios.defaults.headers = {
          Authorization: getToken()
        }
        axios.get('http://127.0.0.1:8000/api/myuser/')
          .then(response => {
            user = response.data
          })
          .then(() => {
            axios.post('http://127.0.0.1:8000/api/profiles/', {
              user: user.id,
              birthDate: birthDate, 
              gender: gender,
              phoneNumber: phoneNumber,
              location: location,
            })
            axios.put('http://127.0.0.1:8000/api/myuser/', {
              ...user,
              first_name: firstName,
              last_name: lastName
            })
            this.props.history.push("/home");
          })
      }
    })
  }

  /*Validate the form. Either display the correct error messages or send the data*/
  handleSubmit = event => {
    event.preventDefault();

    const valid = this.validate();

    if (valid) {
      this.authenticateSignUp(this.state.email, this.state.password, this.state.confirmPassword,
        this.state.firstName, this.state.lastName,
        event.target.elements.birthDate.value, event.target.elements.gender.value, 
        event.target.elements.phoneNumber.value, event.target.elements.location.value);
    }
  };

  render() {
    return (
      <form className="signUpForm" onSubmit={this.handleSubmit}>
        <div className="formFields">
          <header className="header">Create your account</header>
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
          <div className="radiocontainer" id="gender">
            <input
              className="inputButton"
              id="male"
              name="gender"
              type="radio"
              value="M"
              defaultChecked
            />
            <label className="male">Male</label>
            <input
              className="inputButton"
              id="female"
              name="gender"
              type="radio"
              value="F"
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
          <div className="error">{this.state.signUpError}</div>
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

export default withRouter(SignUpWindow);
