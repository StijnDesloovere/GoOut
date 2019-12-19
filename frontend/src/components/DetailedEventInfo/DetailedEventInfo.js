import React from "react";
import PropTypes from "prop-types";
import "./DetailedEventInfo.css";

class DetailedEventInfoComponent extends React.Component {
  render() {
    return (
      <div className="eventInfoObject">
        <div className="eventInfoTopObject">
          <div className="detailedEventImage">
            <img src={require(`../../images/${this.props.image}`)} alt="" />
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
            <button>
              <img
                className="DEgoingImage"
                src={require("../../images/going.png")}
                alt=""
              />
              <b>Going</b>
            </button>
            <button>
              <img
                className="DEinterestedImage"
                src={require("../../images/interested.png")}
                alt=""
              />
              <b>Interested</b>
            </button>
          </div>
          <p className="DEpeopleGoing">
            - <b>{this.props.peopleGoing} People</b> are going including{" "}
            <b>{this.props.friendsGoing} friends</b>
          </p>
          <p className="DEpeopleInterested">
            - <b>{this.props.peopleInterested} People</b> are interested
            including <b>{this.props.friendsInterested} friends</b>
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
  peopleGoing: PropTypes.number,
  peopleInterested: PropTypes.number
};

export default DetailedEventInfoComponent;
