import React from "react";
import PropTypes from "prop-types";
import Popup from "reactjs-popup"; //Using the package reactjs-popup from https://www.npmjs.com/package/reactjs-popup
import "./MyEventInstance.css";
import { getToken } from "../../authentication/auth";
import axios from "axios"

const contentStyle = {
  maxWidth: "50%",
  width: "500px",
  backgroundColor: "whitesmoke",
  borderRadius: "10px"
};

class MyEventInstance extends React.Component {
  render() {
    return (
      <div className="myEventInstanceObject">
        <div className="eventImage">
          <img src={require(`../../images/${this.props.image}.jpg`)} alt="" />
        </div>
        <div className="compactEventDetails">
          <p>
            <b>{this.props.title}</b>
          </p>
          <div className="locationDate">
            <img
              className="clockImage"
              src={require("../../images/clock.png")}
              alt=""
            ></img>
            <p className="date">
              {this.props.date} from {this.props.time}
            </p>
            <div className="line"></div>
            <img
              className="locationImage"
              src={require("../../images/location.png")}
              alt=""
            ></img>
            <p className="location">{this.props.location}</p>
          </div>
        </div>
        {this.props.deletable ? 
          <div className="removeButtonComponent">
            <Popup
              modal
              contentStyle={contentStyle}
              trigger={
                <button className="removeButton">
                  <img
                    classname="trashCanButton"
                    src={require("../../images/trashCan.png")}
                    alt=""
                  />
                </button>
              }
            >
              {close => (
                <div className="deleteEventPopup">
                  <div className="deletePopupHeader">Delete event</div>
                  <div className="deletePopupMessage">
                    Are you sure you want to remove this event?
                  </div>
                  <div className="deletePopupButtons">
                    <button
                      onClick={() => {
                        axios.defaults.headers = {
                          Authorization: getToken()
                        }
                        axios.delete(`http://127.0.0.1:8000/api/events/${this.props.id}/`)
                        close();
                      }}
                    >
                      Yes
                    </button>
                    <button
                      onClick={() => {
                        close();
                      }}
                    >
                      No
                    </button>
                  </div>
                </div>
              )}
            </Popup>
          </div> : ""}
      </div>
    );
  }
}

MyEventInstance.propTypes = {
  title: PropTypes.string,
  image: PropTypes.string,
  date: PropTypes.string,
  time: PropTypes.string,
  location: PropTypes.string
};

export default MyEventInstance;
