import React from "react";
import "./Account.css";

const initialState = {
  firstName: "",
  lastName: "",
  birthDate: "",
  firstNameError: "",
  lastNameError: "",
  birthDateError: ""
};

class Account extends React.Component {
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
    let birthDateError = "";

    if (!this.state.firstName) {
      firstNameError = "Fill in your first name";
    }

    if (!this.state.lastName) {
      lastNameError = "Fill in your last name";
    }

    if (!this.state.birthDate) {
      birthDateError = "Fill in your birth date";
    }

    if (firstNameError || lastNameError || birthDateError) {
      this.setState({
        firstNameError,
        lastNameError,
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
      <div className="accountPage">
        <div className="changeProfilePicture">
          <div className="profilePictureTitle">
            <img
              className="profilePictureIcon"
              src={require("../../images/profilePictureIcon.png")}
              alt=""
            />
            <p className="profilePictureTitleText">
              Change your profile picture
            </p>
          </div>
          <form>
            <input className="newProfilePicture" type="file" />
          </form>
        </div>
        <div className="settingsForm">
          <form onSubmit={this.handleSubmit}>
            <div className="userSettings">
              <img
                className="settingsIcon"
                src={require("../../images/settings.png")}
                alt=""
              ></img>
              <p className="settingsText">
                <b>User settings</b>
              </p>
            </div>
            <div className="settingsFields">
              <div className="informationFields">
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
              <div className="radiocontainers">
                <input
                  className="inputButtons"
                  id="male"
                  name="gender"
                  type="radio"
                  defaultChecked
                />
                <label className="male">Male</label>
                <input
                  className="inputButtons"
                  id="female"
                  name="gender"
                  type="radio"
                />
                <label className="female">Female</label>
              </div>
              <div className="informationFields">
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
            <div className="confirmChangesButton">
              <button className="csButton" type="submit">
                <span>Save changes</span>
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default Account;
