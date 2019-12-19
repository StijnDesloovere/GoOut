import React from "react";
import MenuBar from "../components/Menu/Menu";
import DetailedEventInfoComponent from "../components/DetailedEventInfo/DetailedEventInfo";
import EVENTTYPE_CHOICES from "../components/EventInfo/EventCategories"
import axios from "axios";

class DetailedEvent extends React.Component {

  state = {
    event: {}
  }

  componentDidMount() {
    document.title = "Event | GoOut";

    const eventID = this.props.match.params.eventID;
    axios.get(`http://127.0.0.1:8000/api/events/${eventID}`)
        .then(result => {
          this.setState({
            event: result.data
          })
        })
  }
  render() {
    return (
      <div>
        <MenuBar />
        <DetailedEventInfoComponent
          title={this.state.event.name}
          creator="PATRICK"
          eventType={EVENTTYPE_CHOICES[this.state.event.category]}
          image="Logo.png"
          location={this.state.event.location}
          date={this.state.event.date}
          time={((this.state.event.hasOwnProperty('startTime')) ? this.state.event.startTime.substring(0, this.state.event.startTime.length - 3) : "")
            +"-"+
            ((this.state.event.hasOwnProperty('endTime')) ? this.state.event.endTime.substring(0, this.state.event.endTime.length - 3) : "")}
          description={this.state.event.description}
          peopleGoing={(this.state.event.hasOwnProperty('going')) ? this.state.event.going.length : 0}
          peopleInterested={(this.state.event.hasOwnProperty('interested')) ? this.state.event.interested.length : 0}
          friendsGoing={0}
          friendsInterested={0}
        />
      </div>
    );
  }
}

export default DetailedEvent;
