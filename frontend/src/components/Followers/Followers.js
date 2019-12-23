import React from "react";
import "./Followers.css";
import axios from "axios";
import { getToken } from "../../authentication/auth";

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
        {this.props.following ? 
            <button
              className="unFollowButton"
              onClick={() => {
                axios.defaults.headers = {
                  Authorization: getToken()
                }
                axios.post('http://127.0.0.1:8000/api/follow/remove_following/', {
                  id: this.props.id
                })
                this.props.onDelete(this.props.id)
              }}
            >
              <img 
                className="unFollowImage"
                src={require("../../images/Delete.png")}
                alt="unfollow"
              />
            </button>
          : ""}
      </div>
    );
  }
}

export default FollowersComponent;
