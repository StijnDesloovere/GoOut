import React from "react";
import { Link } from "react-router-dom";

import "./Menu.css";

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
    this.setState({ open: !this.state.open });
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
          <li>
            <button>
              <Link className="menuRedirect" to="/followers">
                Followers
              </Link>
            </button>
          </li>
        </ul>
        <div
          onClick={e => this.togglePanel(e)}
          className="accountButtonProperties"
        >
          <button className="accountButton">
            <img
              className="profilePicture"
              src={require("../../images/Pfp.jpg")}
              alt=""
            />
            <div className="accountButtonText">
              <b>Account</b>
            </div>
          </button>
          {this.state.open ? (
            <ul className="accountMenu">
              <li>
                <Link className="accountTab" to="/account">
                  Account
                </Link>
              </li>
              <li>
                <div className="horizontalMenuLine" />
              </li>
              <li>
                <Link className="eventsTab" to="/account">
                  My events
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
