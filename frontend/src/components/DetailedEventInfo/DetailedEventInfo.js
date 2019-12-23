import React from "react";
import PropTypes from "prop-types";
import axios from "axios";
import "./DetailedEventInfo.css";
import { getToken } from "../../authentication/auth";

class DetailedEventInfoComponent extends React.Component {
  state = {
    interested: [],
    going: []
  }

  componentDidMount() {
    this.setState({
      interested: this.props.peopleInterested,
      going: this.props.peopleGoing
    })
  }

  render() {
    return (
      <div className="eventInfoObject">
        <div className="eventInfoTopObject">
          <div className="detailedEventImage">
            <img src={this.props.image} alt="" />
          </div>
          <div className="detailedEventInfo">
            <div className="detailedEventInfoTitle">{this.props.title}</div>
            <div className="DElocationDate">
              <img
                className="DEclockImage"
                src={require("../../images/clock.png")}
                alt=""
              ></img>
              <p className="DEdate">
                {this.props.date} from {this.props.time}
              </p>
              <div className="DEline"></div>
              <img
                className="DElocationImage"
                src={require("../../images/location.png")}
                alt=""
              ></img>
              <p className="DElocation">{this.props.location}</p>
            </div>
            <div className="DEorganizer">
              <p>
                <b>{this.props.eventType}</b> organized by{" "}
                <b>{this.props.creator}</b>
              </p>
            </div>
          </div>
        </div>
        <div className="eventInfoBottomObject">
          <p className="DEdescription">{this.props.description}</p>
          <div className="DEbuttons">
            <button
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
            >
              <img
                className="DEgoingImage"
                src={require(this.state.going.indexOf(this.props.userID) === -1 ? "../../images/going.png" : "../../images/going_active.png")}
                alt=""
                
              />
              <b>Going</b>
            </button>
            <button
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
            >
              <img
                className="DEinterestedImage"
                src={require(this.state.interested.indexOf(this.props.userID) === -1 ? "../../images/interested.png" : "../../images/interested_active.png")}
                alt=""
              />
              <b>Interested</b>
            </button>
          </div>
          <p className="DEpeopleGoing">
            - <b> {this.state.going.length} </b> {this.state.going.length === 1 ? " Person is" : " People are"} going
          </p>
          <p className="DEpeopleInterested">
            - <b> {this.state.interested.length} </b> {this.state.interested.length === 1 ? " Person is" : " People are"} interested
          </p>
        </div>
      </div>
    );
  }
}

DetailedEventInfoComponent.propTypes = {
  title: PropTypes.string,
  creator: PropTypes.string,
  eventType: PropTypes.string,
  image: PropTypes.string,
  date: PropTypes.string,
  time: PropTypes.string,
  location: PropTypes.string,
  description: PropTypes.string,
  friendsGoing: PropTypes.number,
  friendsInterested: PropTypes.number,
  peopleGoing: PropTypes.array,
  peopleInterested: PropTypes.array
};

export default DetailedEventInfoComponent;
