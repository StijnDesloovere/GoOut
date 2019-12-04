import React from "react";
import MenuBar from "../components/Menu/Menu";

class LocationMap extends React.Component {
  componentDidMount() {
    document.title = "Map | GoOut";
  }
  render() {
    return (
      <div>
        <MenuBar />
      </div>
    );
  }
}

export default LocationMap;
