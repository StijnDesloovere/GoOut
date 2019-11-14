import React from "react";
import { Link } from "react-router-dom";

const MenuBar = props => (
  <header>
    <div>
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
  </header>
);

export default MenuBar;
