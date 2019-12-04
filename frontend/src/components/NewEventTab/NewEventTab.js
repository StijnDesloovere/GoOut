import React from "react";
import "./NewEventTab.css";

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
    console.log(this.state.password);
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

    const valid = this.validate();

    console.log(valid);
    console.log(this.state.eventName);

    if (valid) {
      console.log(this.state);
      this.setState(initialState);
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
                  <select>
                    <option value="Conference">Conference</option>
                    <option value="Meetup">Meetup</option>
                    <option value="Party">Party</option>
                    <option value="Sporting event">Sporting event</option>
                  </select>
                </div>
              </div>
              <div className="secondRow">
                <div className="eventDate">
                  <p>
                    <b>Date</b>
                  </p>
                  <input
                    type="Date"
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
                  <input type="file"></input>
                </div>
              </div>
              <div className="thirdRow">
                <div className="startTime">
                  <p>
                    <b>From</b>
                  </p>
                  <div className="timeInput">
                    <input type="number" min="0" max="24" defaultValue="0" />
                    <p> : </p>
                    <input type="number" min="0" max="60" defaultValue="0" />
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
                    ></input>
                    <p> : </p>
                    <input
                      type="number"
                      min="0"
                      max="60"
                      defaultValue="0"
                    ></input>
                  </div>
                </div>
              </div>
              <div className="forthRow">
                <div className="eventLocation">
                  <p>
                    <b>Location</b>
                  </p>
                  <input type="text"></input>
                </div>
              </div>
              <div className="fifthRow">
                <p>
                  <b>Description</b>
                </p>
                <textarea
                  maxLength="10"
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
