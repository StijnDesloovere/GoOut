import React, { Component } from "react";

import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect
} from "react-router-dom";

//pages
import Home from "./pages/HomePage.js";
import Error404 from "./pages/ErrorPage";
import LocationMap from "./pages/MapPage.js";
import Followers from "./pages/FollowersPage.js";
import SignUp from "./pages/SignUpPage.js";
import Login from "./pages/LoginPage.js";
import AccountDetails from "./pages/AccountPage.js";

class App extends Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route exact path="/" component={Login} />
          <Route exact path="/home" component={Home} />
          <Route exact path="/signup" component={SignUp} />
          <Route exact path="/404" component={Error404} />
          <Route exact path="/followers" component={Followers} />
          <Route exact path="/map" component={LocationMap} />
          <Route exact path="/account" component={AccountDetails} />
          <Redirect to="/404" />
        </Switch>
      </Router>
    );
  }
}

export default App;
