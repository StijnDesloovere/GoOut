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
import Followers from "./pages/FollowersPage/FollowersPage";
import SignUp from "./pages/SignUpPage.js";
import Login from "./pages/LoginPage.js";
import AccountDetails from "./pages/AccountPage.js";
import myEvents from "./pages/MyEventsPage.js";
import DetailedEvent from "./pages/DetailedEventPage.js";
import ProfilePage from "./pages/ProfilePage/ProfilePage.js";

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
          <Route exact path="/settings" component={AccountDetails} />
          <Route exact path="/myevents" component={myEvents} />
          <Route exact path="/event/:eventID" component={DetailedEvent} />
          <Route exact path="/profile" component={ProfilePage} />
          <Redirect to="/404" />
        </Switch>
      </Router>
    );
  }
}

export default App;
