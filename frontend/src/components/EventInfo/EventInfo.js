import React from "react";
import PropTypes from "prop-types";
import "./EventInfo.css";

// Dictionary of all possible event types
const EVENTTYPE_CHOICES = {
  "PA": "Party",
  "CO": "Concert",
  "CF": "Conference",
  "CM": "Competition",
  "MU": "Meetup",
  "SE": "Sporting Event",
  "FE": "Festival",
  "FI": "Film",
  "TH": "Theater",
  "CS": "Comedy Show",
  "AE": "Art Exhibition",
  "OT": "Other"
}

class EventComponent extends React.Component {
  render() {
    return (
      <div className="eventInfoBlock">
        <div className="title">
          <p className="header">
            <b>{this.props.title}</b>
          </p>
        </div>
        <div className="creatorInfo">
          <p className="creator">
            <b>{EVENTTYPE_CHOICES[this.props.eventType]}</b> organized by{" "}
            <b>{this.props.creator}</b>
          </p>
        </div>
        <div className="locationDate">
          <img
            className="clockImage"
            src={require("../../images/clock.png")}
            alt=""
          ></img>
          <p className="date">
            {this.props.date} from {this.props.startTime}-{this.props.endTime}
          </p>
          <div className="line"></div>
          <img
            className="locationImage"
            src={require("../../images/location.png")}
            alt=""
          ></img>
          <p className="location">{this.props.location}</p>
        </div>
        <div className="imageDescBox">
          <div className="image">
            <img src={require(`../../images/${this.props.image}.jpg`)} alt="" />
          </div>
          <div className="rightText">
            <p className="description">{this.props.description}</p>
          </div>
        </div>
        <div className="friends">
          <img
            className="friendImage"
            src={require("../../images/people.png")}
            alt=""
          ></img>
          <p className="going">{this.props.friendsGoing} friends are going</p>
          <div className="line"></div>
          <p className="interested">
            {this.props.friendsInterested} friends are interested
          </p>
        </div>
        <div className="eventButtons">
          <button className="goingButton">
            <img
              className="goingImage"
              src={require("../../images/going.png")}
              alt=""
            />
            <b>Going</b>
          </button>
          <button className="interestedButton">
            <img
              className="interestedImage"
              src={require("../../images/interested.png")}
              alt=""
            />
            <b>Interested</b>
          </button>
        </div>
      </div>
    );
  }
}

EventComponent.propTypes = {
  title: PropTypes.string,
  creator: PropTypes.string,
  eventType: PropTypes.string,
  image: PropTypes.string,
  date: PropTypes.string,
  startTime: PropTypes.string,
  endTime: PropTypes.string,
  location: PropTypes.string,
  description: PropTypes.string,
  friendsGoing: PropTypes.number,
  friendsInterested: PropTypes.number
};

export default EventComponent;
