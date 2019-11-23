import React, { Component } from "react";

import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect
} from "react-router-dom";

//pages
import Home from "./frontend/pages/HomePage.js";
import Error404 from "./frontend/pages/ErrorPage";
import LocationMap from "./frontend/pages/MapPage.js";
import Followers from "./frontend/pages/FollowersPage.js";
import SignUp from "./frontend/pages/SignUpPage.js";

class App extends Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/signup" component={SignUp} />
          <Route exact path="/404" component={Error404} />
          <Route exact path="/followers" component={Followers} />
          <Route exact path="/map" component={LocationMap} />
          <Redirect to="/404" />
        </Switch>
      </Router>
    );
  }
}

export default App;
