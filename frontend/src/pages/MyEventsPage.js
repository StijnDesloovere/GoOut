import React from "react";
import MenuBar from "../components/Menu/Menu";
import MyEvents from "../components/MyEvents/MyEvents";
import MyEventInstance from "../components/MyEventsInstance/MyEventInstance";

class myEvents extends React.Component {
  componentDidMount() {
    document.title = "My events | GoOut";
  }
  render() {
    return (
      <div>
        <MenuBar />
        <MyEvents />
        <MyEventInstance
          title="Jellyfishing"
          image="Pat"
          location="Pleinlaan 2, 1050 Elsene"
          date="November 30"
          time="14:00-23:00"
        />{" "}
        <MyEventInstance
          title="The first test event"
          image="Pat"
          location="Pleinlaan 2, 1050 Elsene"
          date="November 30"
          time="14:00-23:00"
        />{" "}
        <MyEventInstance
          title="The first test event"
          image="Pat"
          location="Pleinlaan 2, 1050 Elsene"
          date="November 30"
          time="14:00-23:00"
        />{" "}
        <MyEventInstance
          title="The first test event"
          image="Pat"
          location="Pleinlaan 2, 1050 Elsene"
          date="November 30"
          time="14:00-23:00"
        />
      </div>
    );
  }
}

export default myEvents;
