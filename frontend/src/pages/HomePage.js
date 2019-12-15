import React from "react";
import MenuBar from "../components/Menu/Menu";
import NewEventBar from "../components/NewEventTab/NewEventTab";
import EventList from "../components/EventList/EventList";

class Home extends React.Component {
  componentDidMount() {
    document.title = "Home | GoOut";
  }
  render() {
    return (
      <div>
        <MenuBar />
        <NewEventBar />
        <EventList />
      </div>
    );
  }
}

export default Home;
