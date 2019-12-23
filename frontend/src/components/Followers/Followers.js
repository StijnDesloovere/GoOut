import React from "react";
import "./Followers.css";

class FollowersComponent extends React.Component {
  render() {
    return (
      <div className="followerComponent">
        <div className="followerPFP">
          <img src={this.props.image} alt="" />
        </div>
        <div className="followerName">
          <p>
            <b>{this.props.firstName + " " + this.props.lastName}</b>
          </p>
        </div>
      </div>
    );
  }
}

export default FollowersComponent;
