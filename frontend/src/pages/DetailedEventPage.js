import React from "react";
import MenuBar from "../components/Menu/Menu";
import DetailedEventInfoComponent from "../components/DetailedEventInfo/DetailedEventInfo";
import EVENTTYPE_CHOICES from "../components/EventInfo/EventCategories"
import axios from "axios";

class DetailedEvent extends React.Component {

  state = {}

  componentDidMount() {
    document.title = "Event | GoOut";

    axios.get('http://127.0.0.1:8000/api/myprofile/')
      .then(response => {
        this.setState({
          ...this.state,
          profile: response.data
        })
      })
      // Get the event
      .then(() => {
        const eventID = this.props.match.params.eventID;
        axios.get(`http://127.0.0.1:8000/api/events/${eventID}`)
            .then(result => {
              this.setState({
                ...this.state,
                event: result.data
              })
            })
            .then(()=> {
              axios.get(`http://127.0.0.1:8000/api/profiles/${this.state.event.creator.id}`)
                .then(result => {
                  axios.get(`http://127.0.0.1:8000/api/user/${result.data.user}`) // get the user object of the creator (to get their name)
                    .then(result => {
                      this.setState({
                        ...this.state,
                      user: result.data
                      })
                    })
                })
            })
      })
  }
  render() {
    return (
      <div>
        <MenuBar />
        {this.state.hasOwnProperty('event') ? 
          <DetailedEventInfoComponent
            userID={this.state.profile.id}
            id={this.state.event.id}
            title={this.state.event.name}
            creator={this.state.user ? this.state.user.first_name + " " + this.state.user.last_name : ""}
            eventType={EVENTTYPE_CHOICES[this.state.event.category]}
            image={this.state.event.image ? this.state.event.image : require(`../images/Logo.png`)}
            location={this.state.event.location}
            date={this.state.event.date}
            time={((this.state.event.hasOwnProperty('startTime')) ? this.state.event.startTime.substring(0, this.state.event.startTime.length - 3) : "")
              +"-"+
              ((this.state.event.hasOwnProperty('endTime')) ? this.state.event.endTime.substring(0, this.state.event.endTime.length - 3) : "")}
            description={this.state.event.description}
            peopleGoing={(this.state.event.hasOwnProperty('going')) ? this.state.event.going : []}
            peopleInterested={(this.state.event.hasOwnProperty('interested')) ? this.state.event.interested : []}
            friendsGoing={0}
            friendsInterested={0}
          />
          : ""
        }
      </div>
    );
  }
}

export default DetailedEvent;
