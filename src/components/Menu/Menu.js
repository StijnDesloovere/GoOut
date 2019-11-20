import React from "react";
import { Link } from "react-router-dom";

import "./Menu.css";

const MenuBar = props => (
  <header className="menu">
    <div className="dropdown_menu">
      <input type="checkbox" id="menu" />
      <label for="menu">Menu</label>
      <div className="menu_items">
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/map">Map</Link>
          </li>
          <li>
            <Link to="/followers">Followers</Link>
          </li>
        </ul>
      </div>
    </div>
  </header>
);

export default MenuBar;
