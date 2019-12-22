import React from "react";
import axios from 'axios';

import "./Account.css";
import { getToken } from "../../authentication/auth";

const initialState = {
  firstName: "",
  lastName: "",
  birthDate: "",
  gender: "",
  location: "",
  phoneNumber: "",
  firstNameError: "",
  lastNameError: "",
  birthDateError: ""
};

class Account extends React.Component {
  componentDidMount() {
    axios.defaults.headers = {
      Authorization: getToken()
    }
    axios.get('http://127.0.0.1:8000/api/myprofile/')
      .then(response => {
        let profile = response.data
        this.setState({
          ...this.state,
          id: profile.id,
          firstName: profile.user.first_name,
          lastName: profile.user.last_name,
          birthDate: profile.birthDate,
          gender: profile.gender,
          location: profile.location,
          phoneNumber: profile.phoneNumber
        })
      })
  }

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
      let formData = new FormData();
      if (event.target.elements.image.files.length) { // if the user uploaded an image, add the image to the form which has to be sent
        formData.append("profilePicture", event.target.elements.image.files[0]);
      }
      let profileFields = {
        birthDate: this.state.birthDate,
        gender: this.state.gender,
        phoneNumber: this.state.phoneNumber,
        location: this.state.location,
      }
      for (var propName in profileFields) { // add all the profile data to the form
        formData.append(propName, profileFields[propName])
      }
      // send the data to the backend
      axios.patch(`http://127.0.0.1:8000/api/profiles/${this.state.id}/`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })
      axios.patch('http://127.0.0.1:8000/api/myuser/', {
        first_name: this.state.firstName,
        last_name: this.state.lastName
      })
    }
  };

  render() {
    return (
      <div className="accountPage">
        <div className="settingsForm">
          <form onSubmit={this.handleSubmit}>
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
              <input className="newProfilePicture" id="image" type="file" />
            </div>
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
                  value={this.state.firstName}
                />
                <div className="error">{this.state.firstNameError}</div>
                <p className="lastName">
                  <b>Last name*</b>
                </p>
                <input
                  type="text"
                  id="lastName"
                  onChange={this.handleInputChanges}
                  value={this.state.lastName}
                />
                <div className="error">{this.state.lastNameError}</div>
                <p className="birthDate">
                  <b>Birth date*</b>
                </p>
                <input
                  type="date"
                  id="birthDate"
                  onChange={this.handleInputChanges}
                  value={this.state.birthDate}
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
                  value="M"
                  onClick={() => {
                    this.setState({
                      ...this.state,
                      gender: "M"
                    })
                  }}
                  checked={this.state.gender === "M" ? true : false}
                />
                <label className="male">Male</label>
                <input
                  className="inputButtons"
                  id="female"
                  name="gender"
                  type="radio"
                  value="F"
                  onClick={() => {
                    this.setState({
                      ...this.state,
                      gender: "F"
                    })
                  }}
                  checked={this.state.gender === "F" ? true : false}
                />
                <label className="female">Female</label>
              </div>
              <div className="informationFields">
                <p className="location">
                  <b>Location</b>
                </p>
                <input
                  type="text"
                  id="location"
                  onChange={this.handleInputChanges}
                  value={this.state.location}
                />
                <p className="phoneNumber">
                  <b>Phone number</b>
                </p>
                <input
                  type="text"
                  id="phoneNumber"
                  onChange={this.handleInputChanges}
                  value={this.state.phoneNumber}
                />
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
