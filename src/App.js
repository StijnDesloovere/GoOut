import React, { Component } from "react";

import {
  BrowserRouter as Router,
  Route,
  Switch,
  Link,
  Redirect
} from "react-router-dom";

//pages
import Home from "./pages/HomePage";
import Error404 from "./pages/ErrorPage";
import LocationMap from "./pages/MapPage";
import Followers from "./pages/FollowersPage";

class App extends Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route exact path="/" component={Home} />
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
