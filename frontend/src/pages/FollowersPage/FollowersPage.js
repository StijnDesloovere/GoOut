import React from "react";
import MenuBar from "../../components/Menu/Menu";
import axios from 'axios';
import "./FollowersPage.css";
import FollowersComponent from "../../components/Followers/Followers";
import ReactSearchBox from "react-search-box";
import { getToken } from "../../authentication/auth";


class Followers extends React.Component {

  state = {
    data: [],
    followers: [],
    following: []
  }

  componentDidMount() {
    document.title = "Followers | GoOut";

    axios.defaults.headers = {
      Authorization: getToken()
    }
    axios.get('http://127.0.0.1:8000/api/follow/following/')
      .then(response => {
        this.setState({
          ...this.state,
          following: response.data
        })
      })
    axios.get('http://127.0.0.1:8000/api/follow/followers/')
    .then(response => {
      this.setState({
        ...this.state,
        followers: response.data
      })
    })
  }

  

  render() {
    return (
      <div className="followersPage">
        <MenuBar />
        <div className="searchBox">
          <header>Add followers</header>
          <ReactSearchBox
            placeholder="search"
            data={this.state.data}
            onSelect={record => console.log(record)}
          />
        </div>
        <div className="followersPageObject">
          <div className="following">
            <h1>
              <span className="FPtext">Following (X)</span>
            </h1>
            {this.state.following.map((profile) => {
              return <FollowersComponent 
                      firstName={profile.user.first_name}
                      lastName={profile.user.last_name} 
                      image={profile.profilePicture ? 'http://127.0.0.1:8000' + profile.profilePicture : require(`../../images/Logo.png`)}
                     />
            })}
          </div>
          <div className="followers">
            <h1>
              <span className="FPtext">Followers (X)</span>
            </h1>
            {this.state.followers.map((profile) => {
              return <FollowersComponent 
                      firstName={profile.user.first_name}
                      lastName={profile.user.last_name} 
                      image={profile.profilePicture ? 'http://127.0.0.1:8000' + profile.profilePicture : require(`../../images/Logo.png`)}
                     />
            })}
          </div>
        </div>
      </div>
    );
  }
}

export default Followers;
