import React from "react";

import "./MyEvents.css";

class MyEvents extends React.Component {
  render() {
    return (
      <div className="myEventsObject">
        <h1>{this.props.section}</h1>
      </div>
    );
  }
}

export default MyEvents;
