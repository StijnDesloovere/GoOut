import React from "react";
import axios from "axios";
import PropTypes from "prop-types";
import "./EventInfo.css";
import EVENTTYPE_CHOICES from "./EventCategories"
import { Link } from "react-router-dom";
import { getToken } from "../../authentication/auth";

class EventComponent extends React.Component {
  state = {
    interested: [],
    going: []
  }

  componentDidMount() {
    this.setState({
      interested: this.props.interested,
      going: this.props.going
    })
  }

  render() {
    return (
      <div className="eventInfoBlock">
        <div className="title">
          <p className="header">
            <Link to={`/event/${this.props.id}`} style={{ textDecoration: 'none', color: 'white'}}>
              <b>{this.props.title}</b>
            </Link>
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
            <img src={this.props.image} alt=""/>
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
          <p className="going"> 
            {this.state.going.length === 1 ? "1 person is" : this.state.going.length + " people are"} going
            </p>
          <div className="line"></div>
          <p className="interested">
            {this.state.interested.length === 1 ? "1 person is" : this.state.interested.length + " people are"} interested
          </p>
        </div>
        <div className="eventButtons">
          <button 
            className="goingButton"
            onClick={() => {
              axios.defaults.headers = {
                Authorization: getToken()
              }
              if(this.state.going.indexOf(this.props.userID) === -1) { // if user is not going, add them to 'going'
                axios.post('http://127.0.0.1:8000/api/interested-going/', {
                  type: 'going',
                  eventID: this.props.id
                })
                axios.post('http://127.0.0.1:8000/api/interested-going/', {
                  type: 'remove-interested',
                  eventID: this.props.id
                })
                this.setState( {
                  going: this.state.going.indexOf(this.props.userID) === -1 ? this.state.going.concat(this.props.userID) : this.state.going,
                  interested: this.state.interested.filter((id) => { return id !== this.props.userID })
                })
              } else { // if user is going and clicks the button, remove them from 'going'
                axios.post('http://127.0.0.1:8000/api/interested-going/', {
                  type: 'remove-going',
                  eventID: this.props.id
                })
                this.setState({
                  ...this.state,
                  going: this.state.going.filter((id) => { return id !== this.props.userID })
                })
              }
            }}
            style={ { backgroundColor: this.state.going.indexOf(this.props.userID) === -1 ? "#1e90ff" : "#51a9ff" } }
          >
            <img
              className="goingImage"
              src={require("../../images/going.png")}
              alt=""
            />
            <b>Going</b>
          </button>
          <button 
            className="interestedButton"
            onClick={() => {
              axios.defaults.headers = {
                Authorization: getToken()
              }
              if(this.state.interested.indexOf(this.props.userID) === -1) { // if user is not interested, add them to 'interested'
                axios.post('http://127.0.0.1:8000/api/interested-going/', {
                  type: 'interested',
                  eventID: this.props.id
                })
                axios.post('http://127.0.0.1:8000/api/interested-going/', {
                  type: 'remove-going',
                  eventID: this.props.id
                })
                this.setState( {
                  interested: this.state.interested.indexOf(this.props.userID) === -1 ? this.state.interested.concat(this.props.userID) : this.state.interested,
                  going: this.state.going.filter((id) => { return id !== this.props.userID })
                })
              } else { // if the user is already interested, remove them from 'interested'
                axios.post('http://127.0.0.1:8000/api/interested-going/', {
                  type: 'remove-interested',
                  eventID: this.props.id
                })
                this.setState({
                  ...this.state,
                  interested: this.state.interested.filter((id) => { return id !== this.props.userID })
                })
              }
            }}
            style={ { backgroundColor: this.state.interested.indexOf(this.props.userID) === -1 ? "#1e90ff" : "#51a9ff" } }
          >
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
  id: PropTypes.number,
  title: PropTypes.string,
  creator: PropTypes.string,
  userID: PropTypes.number,
  eventType: PropTypes.string,
  image: PropTypes.string,
  date: PropTypes.string,
  startTime: PropTypes.string,
  endTime: PropTypes.string,
  location: PropTypes.string,
  description: PropTypes.string,
  going: PropTypes.array,
  interested: PropTypes.array
};

export default EventComponent;
