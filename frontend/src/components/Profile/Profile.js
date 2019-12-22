import React from "react";
import { Link } from "react-router-dom";

import "./Profile.css";

class Profile extends React.Component {
  render() {
    return (
      <div className="profileObject">
        <div className="PFheader">
          <div className="PFpicture">
            <img src={this.props.image} alt="" />
          </div>
          <div className="PFheaderInfo">
            <div className="PFname">
              <h1>{this.props.name}</h1>
            </div>
            <div className="PFfollowerInfo">
              <b>{this.props.following}</b> following
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              <b>{this.props.followers}</b> followers
            </div>
          </div>
          <div className="PFsettingsButton">
            <button>
              <Link className="PFsettingsLink" to="/settings">
                <img
                  className="PFsettingsImage"
                  src={require("../../images/settings.png")}
                  alt=""
                ></img>
                <p className="PFsettingsText">Settings</p>
              </Link>
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default Profile;
