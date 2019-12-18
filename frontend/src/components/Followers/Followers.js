import React from "react";
import "./Followers.css";

class FollowersComponent extends React.Component {
  render() {
    return (
      <div className="followerComponent">
        <div className="followerPFP">
          <img src={require(`../../images/${this.props.image}.jpg`)} alt="" />
        </div>
        <div className="followerName">
          <p>
            <b>{this.props.name}</b>
          </p>
        </div>
      </div>
    );
  }
}

export default FollowersComponent;
