import React from "react";
import "./NewEventTab.css";
import axios from "axios";
import { getToken } from "../../authentication/auth";

const initialState = {
  eventName: "",
  date: "",
  description: "",
  eventNameError: "",
  dateError: "",
  descriptionError: ""
};

class NewEventBar extends React.Component {
  state = initialState;

  /* Update the state with the currect value*/
  handleInputChanges = event => {
    this.setState({
      [event.target.id]: event.target.value
    });
  };

  /*Check if the form is filled in correctly*/
  validate = () => {
    let eventNameError = "";
    let dateError = "";
    let descriptionError = "";

    if (!this.state.eventName) {
      eventNameError = "Choose an event name";
    }

    if (!this.state.date) {
      dateError = "Choose a date for your event";
    }

    if (!this.state.description) {
      descriptionError = "Write a description for your event";
    }

    if (eventNameError || dateError || descriptionError) {
      this.setState({
        eventNameError,
        dateError,
        descriptionError
      });
      return false;
    }

    return true;
  };

  /*Validate the form. Either display the correct error messages or send the data*/
  handleSubmit = event => {
    event.preventDefault();
    event.persist();

    const valid = this.validate();

    if (valid) {
      let user = {}

      axios.defaults.headers = {
        Authorization: getToken()
      }
      axios.get('http://127.0.0.1:8000/api/myprofile/')
        .then(response => {
          user = response.data.user
        })
        .then(() => {
          let formData = new FormData();
          if(event.target.elements.image.files.length) { // if the user uploaded an image, add it to the form
            formData.append("image", event.target.elements.image.files[0]);
          }
          let eventData = {
            name: event.target.elements.eventName.value,
            creator: user.id,
            description: event.target.elements.description.value,
            category: event.target.elements.eventCategory.value,
            date: event.target.elements.date.value,
            startTime: event.target.elements.startTimeHour.value + ":" + event.target.elements.startTimeMinute.value,
            endTime: event.target.elements.endTimeHour.value + ":" + event.target.elements.endTimeMinute.value,
            location: event.target.elements.eventLocation.value
          }
          for(var propName in eventData) { // add all the data about the event to the form
            formData.append(propName, eventData[propName])
          }
          // Send a post request to the server
          axios.post('http://127.0.0.1:8000/api/events/', formData, {
            headers: {
              'Content-Type': 'multipart/form-data'
            }
          })})
        .then(() => {
          super.setState(initialState)
        })
    }
  };

  /* Collapsible menu, code inspired from https://medium.com/@subalerts/implememting-a-simple-collapsible-component-in-react-js-67c796e64652 */
  constructor(props) {
    super(props);
    this.state = {
      open: false
    };
    this.togglePanel = this.togglePanel.bind(this);
  }

  togglePanel(e) {
    this.setState({ open: !this.state.open });
  }

  render() {
    return (
      <div className="newEventBlock">
        {/* Collapsible menu */}
        <div onClick={e => this.togglePanel(e)} className="displayBar">
          <b>+ NEW EVENT</b>
        </div>
        {this.state.open ? (
          <div className="newEventForm">
            {/* New event form*/}
            <form onSubmit={this.handleSubmit}>
              <div className="firstRow">
                <div className="eventName">
                  <p>
                    <b>Event name</b>
                  </p>
                  <input
                    value={this.state.eventName || ""}
                    type="text"
                    id="eventName"
                    onChange={this.handleInputChanges}
                  ></input>
                  <div className="newEventError">
                    {this.state.eventNameError}
                  </div>
                </div>
                <div className="eventCategory">
                  <p>
                    <b>Event category</b>
                  </p>
                  <select id="eventCategory">
                    <option value="PA" defaultValue="">Party</option>
                    <option value="CO">Concert</option>
                    <option value="CF">Conference</option>
                    <option value="FF">Food Festival</option>
                    <option value="CM">Competition</option>
                    <option value="MU">Meetup</option>
                    <option value="SE">Sporting Event</option>
                    <option value="FE">Festival</option>
                    <option value="FI">Film</option>
                    <option value="TH">Theater</option>
                    <option value="CS">Comedy Show</option>
                    <option value="AE">Art Exhibition</option>
                    <option value="OT">Other</option>
                  </select>
                </div>
              </div>
              <div className="secondRow">
                <div className="eventDate">
                  <p>
                    <b>Date</b>
                  </p>
                  <input
                    type="date"
                    id="date"
                    value={this.state.date || ""}
                    onChange={this.handleInputChanges}
                  ></input>
                  <div className="newEventError">{this.state.dateError}</div>
                </div>
                <div className="eventImage">
                  <p>
                    <b>Image</b>
                  </p>
                  <input type="file" id="image"></input>
                </div>
              </div>
              <div className="thirdRow">
                <div className="startTime">
                  <p>
                    <b>From</b>
                  </p>
                  <div className="timeInput">
                    <input type="number" min="0" max="24" defaultValue="0" id="startTimeHour"/>
                    <p> : </p>
                    <input type="number" min="0" max="60" defaultValue="0" id="startTimeMinute"/>
                  </div>
                </div>
                <div className="endTime">
                  <p>
                    <b>To</b>
                  </p>
                  <div className="timeInput">
                    <input
                      type="number"
                      min="0"
                      max="24"
                      defaultValue="0"
                      id="endTimeHour"
                    ></input>
                    <p> : </p>
                    <input
                      type="number"
                      min="0"
                      max="60"
                      defaultValue="0"
                      id="endTimeMinute"
                    ></input>
                  </div>
                </div>
              </div>
              <div className="forthRow">
                <div className="eventLocation">
                  <p>
                    <b>Location</b>
                  </p>
                  <input type="text" id="eventLocation"></input>
                </div>
              </div>
              <div className="fifthRow">
                <p>
                  <b>Description</b>
                </p>
                <textarea
                  id="description"
                  value={this.state.description || ""}
                  onChange={this.handleInputChanges}
                ></textarea>
                <div className="newEventError">
                  {this.state.descriptionError}
                </div>
              </div>
              <div className="submitEvent">
                <button className="submitEventButton" type="submit">
                  <b>Create event</b>
                </button>
              </div>
            </form>
          </div>
        ) : null}
      </div>
    );
  }
}

export default NewEventBar;
