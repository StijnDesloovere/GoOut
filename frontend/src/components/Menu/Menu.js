import React from "react";
import { Link } from "react-router-dom";
import axios from "axios"

import "./Menu.css";
import { getToken } from "../../authentication/auth";

class MenuBar extends React.Component {
  /* Collapsible menu, code inspired from https://medium.com/@subalerts/implememting-a-simple-collapsible-component-in-react-js-67c796e64652 */
  constructor(props) {
    super(props);
    this.state = {
      open: false
    };
    this.togglePanel = this.togglePanel.bind(this);
  }

  togglePanel(e) {
    this.setState({ 
      ...this.state,
      open: !this.state.open 
    });
  }

  logout() {
    localStorage.removeItem('token');
  }

  componentDidMount() {
    // get my profle
    axios.defaults.headers = {
      Authorization: getToken()
    }
    axios.get('http://127.0.0.1:8000/api/myprofile/')
      .then(response => {
        this.setState({
          ...this.state,
          profile: response.data
        })
      })
  }

  render() {
    return (
      <div className="menuBar">
        <div className="Logo">
          <img
            className="goOutLogo"
            src={require("../../images/Logo.png")}
            alt=""
          ></img>
        </div>
        <ul className="menuItems">
          <li>
            <button>
              <Link className="menuRedirect" to="/home">
                Home
              </Link>
            </button>
          </li>
          <li>
            <div className="horizontalLine" />
          </li>
          <li>
            <button>
              <Link className="menuRedirect" to="/map">
                Map
              </Link>
            </button>
          </li>
          <li>
            <div className="horizontalLine" />
          </li>
        </ul>
        <div
          onClick={e => this.togglePanel(e)}
          className="accountButtonProperties"
        >
          <button className="accountButton">
            <img
              className="profilePicture"
              src={this.state.profile && this.state.profile.profilePicture ? this.state.profile.profilePicture : require(`../../images/Logo.png`)}
              alt=""
            />
            <div className="accountButtonText">
              <b>Account</b>
            </div>
          </button>
          {this.state.open ? (
            <ul className="accountMenu">
              <li>
                <Link className="tabEntry" to="/profile">
                  Profile
                </Link>
              </li>
              <li>
                <Link className="tabEntry" to="/followers">
                  Followers
                </Link>
              </li>
              <li>
                <div className="horizontalMenuLine" />
              </li>
              <li>
                <Link className="tabEntry" to="/settings">
                  Settings
                </Link>
              </li>
              <li>
                <div className="horizontalMenuLine" />
              </li>
              <li>
                <Link className="tabEntry" onClick={this.logout} to="/">
                  Logout
                </Link>
              </li>
            </ul>
          ) : null}
        </div>
      </div>
    );
  }
}

export default MenuBar;
