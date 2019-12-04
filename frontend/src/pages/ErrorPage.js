import React from "react";

class Error404 extends React.Component {
  componentDidMount() {
    document.title = "Error | GoOut";
  }
  render() {
    return (
      <div>
        <h2>404 Page not found!</h2>
      </div>
    );
  }
}

export default Error404;
