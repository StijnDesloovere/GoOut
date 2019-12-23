import React from "react";
import axios from "axios";

import EventComponent from "../components/EventInfo/EventInfo";
import { getToken } from "../authentication/auth";
import MenuBar from "../components/Menu/Menu";
import NewEventBar from "../components/NewEventTab/NewEventTab";


class Home extends React.Component {
  state = {
    events: []
  }

  getEvents() {
    axios.defaults.headers = {
      Authorization: getToken(),
      'EventType': 'all'
    }
    axios.get('http://127.0.0.1:8000/api/myevents/')
      .then(response => {
        this.setState({
          ...this.state,
          events: response.data
        })
      })
      axios.get('http://127.0.0.1:8000/api/myprofile/')
        .then(response => {
          this.setState({
            ...this.state,
            profile: response.data
          })
        })
  }

  componentDidMount() {
    document.title = "Home | GoOut";

    this.getEvents()
  }
  render() {
    return (
      <div>
        <MenuBar />
        <NewEventBar
          onEventCreation={this.getEvents.bind(this)}
        />

        {this.state.events.map((data, i) => (
          <EventComponent
            key={i}
            id={data.id}
            userID={this.state.profile.id}
            title={data.name}
            creator={data.creator.user.first_name + " " + data.creator.user.last_name}
            eventType={data.category}
            image={data.image ? data.image : require(`../images/Logo.png`)}
            location={data.location}
            date={data.date}
            startTime={data.startTime}
            endTime={data.endTime}
            description={data.description}
            going={data.going}
            interested={data.interested}
          />
        ))}
      </div>
    );
  }
}

export default Home;
