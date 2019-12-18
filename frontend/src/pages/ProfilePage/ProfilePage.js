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

class ProfilePage extends React.Component {
  componentDidMount() {
    document.title = "Profile | GoOut";
  }

  render() {
    return (
      <div>
        <MenuBar />
        <Profile
          name="Sponge the Bob"
          image="Pfp"
          followers={69}
          following={420}
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
              <MyEventInstance
                title="The first test event"
                image="Pat"
                location="Pleinlaan 2, 1050 Elsene"
                date="November 30"
                time="14:00-23:00"
              />{" "}
              <MyEventInstance
                title="The first test event"
                image="Pat"
                location="Pleinlaan 2, 1050 Elsene"
                date="November 30"
                time="14:00-23:00"
              />{" "}
              <MyEventInstance
                title="The first test event"
                image="Pat"
                location="Pleinlaan 2, 1050 Elsene"
                date="November 30"
                time="14:00-23:00"
              />{" "}
              <MyEventInstance
                title="The first test event"
                image="Pat"
                location="Pleinlaan 2, 1050 Elsene"
                date="November 30"
                time="14:00-23:00"
              />
              <MyEventInstance
                title="The first test event"
                image="Pat"
                location="Pleinlaan 2, 1050 Elsene"
                date="November 30"
                time="14:00-23:00"
              />
              <MyEventInstance
                title="The first test event"
                image="Pat"
                location="Pleinlaan 2, 1050 Elsene"
                date="November 30"
                time="14:00-23:00"
              />{" "}
              <MyEventInstance
                title="The first test event"
                image="Pat"
                location="Pleinlaan 2, 1050 Elsene"
                date="November 30"
                time="14:00-23:00"
              />
            </TabPanel>
            <TabPanel>
              <MyEvents section="You are going to" />
              <MyEventInstance
                title="The first test event"
                image="Pat"
                location="Pleinlaan 2, 1050 Elsene"
                date="November 30"
                time="14:00-23:00"
              />
            </TabPanel>
            <TabPanel>
              <MyEvents section="You are interested in" />
              <MyEventInstance
                title="The first test event"
                image="Pat"
                location="Pleinlaan 2, 1050 Elsene"
                date="November 30"
                time="14:00-23:00"
              />
            </TabPanel>
          </Tabs>
        </div>
      </div>
    );
  }
}

export default ProfilePage;
