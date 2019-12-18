import React from "react";
import MenuBar from "../../components/Menu/Menu";
import Profile from "../../components/Profile/Profile";
import "react-tabs/style/react-tabs.css";
import {
  Tab,
  Tabs,
  TabList,
  TabPanel
} from "react-tabs"; /* From https://github.com/reactjs/react-tabs */
import "./ProfilePage.css";
import MyEvents from "../../components/MyEvents/MyEvents";
import MyEventInstance from "../../components/MyEventsInstance/MyEventInstance";

import axios from "axios"
import { getToken } from "../../authentication/auth.js"

class ProfilePage extends React.Component {
  state = {
    myEvents: [],
    interestedEvents: [],
    goingEvents: [],
  }


  componentDidMount() {
    document.title = "Profile | GoOut";

    // get my events
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
    axios.defaults.headers = {
      'Content-Type': 'application/json',
      Authorization: getToken(),
      'EventType': 'created'
    }
    axios.get('http://127.0.0.1:8000/api/myevents/')
    .then(response => {
        this.setState({
          ...this.state,
          myEvents: response.data
        })
    })
    axios.defaults.headers = {
      'Content-Type': 'application/json',
      Authorization: getToken(),
      'EventType': 'going'
    }
    // get events user is going to
    axios.get('http://127.0.0.1:8000/api/myevents/')
    .then(response => {
        this.setState({
          ...this.state,
          goingEvents: response.data
        })
    })
    axios.defaults.headers = {
      'Content-Type': 'application/json',
      Authorization: getToken(),
      'EventType': 'interested'
    }
    // get events user is interested in
    axios.get('http://127.0.0.1:8000/api/myevents/')
    .then(response => {
        this.setState({
          ...this.state,
          interestedEvents: response.data
        })
    })
    
  }

  render() {
    return (
      <div>
        <MenuBar />
        <Profile
          name={typeof this.state.profile !== 'undefined' ? this.state.profile.user.first_name + " " + this.state.profile.user.last_name : ""}
          image="Pfp"
          followers={0}
          following={typeof this.state.profile !== 'undefined' ? this.state.profile.following.length : 0}
        />
        <div className="PFcontent">
          <Tabs>
            <TabList>
              <Tab>
                <b>Your events</b>
              </Tab>
              <Tab>
                <b>Going</b>
              </Tab>
              <Tab>
                <b>Interested</b>
              </Tab>
            </TabList>

            <TabPanel>
              <MyEvents section="Your events" />
              {this.state.myEvents.map(event => {
                return <MyEventInstance
                        key={event.id}
                        title={event.name}
                        image="Pat"
                        location={event.location}
                        date={event.date}
                        time={event.startTime.substring(0, event.startTime.length - 3) + "-" + event.endTime.substring(0, event.endTime.length - 3)}
                        deletable={true}
                      />
              })}
              
            </TabPanel>
            <TabPanel>
              <MyEvents section="You are going to" />
              {this.state.goingEvents.map(event => {
                return <MyEventInstance
                        key={event.id}
                        title={event.name}
                        image="Pat"
                        location={event.location}
                        date={event.date}
                        time={event.startTime.substring(0, event.startTime.length - 3) + "-" + event.endTime.substring(0, event.endTime.length - 3)}
                        deletable={false}
                      />
              })}
            </TabPanel>
            <TabPanel>
              <MyEvents section="You are interested in" />
              {this.state.interestedEvents.map(event => {
                return <MyEventInstance
                        key={event.id}
                        title={event.name}
                        image="Pat"
                        location={event.location}
                        date={event.date}
                        time={event.startTime.substring(0, event.startTime.length - 3) + "-" + event.endTime.substring(0, event.endTime.length - 3)}
                        deletable={false}
                      />
              })}
            </TabPanel>
          </Tabs>
        </div>
      </div>
    );
  }
}

export default ProfilePage;
