import React from "react";
import MenuBar from "../components/Menu/Menu";

class Followers extends React.Component {
  componentDidMount() {
    document.title = "Followers | GoOut";
  }

  render() {
    return (
      <div>
        <MenuBar />
      </div>
    );
  }
}

export default Followers;
