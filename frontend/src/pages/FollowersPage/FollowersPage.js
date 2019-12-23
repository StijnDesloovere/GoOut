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
    axios.get('http://127.0.0.1:8000/api/follow/not_following/')
      .then(response => {
        this.setState({
          ...this.state,
          data: response.data.map((profile) => {
            return {
              key: profile,
              value: profile.user.first_name + " " + profile.user.last_name
            }
          })
        })
      })
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

  onDeleteFollowing(profileID) {
    let profile = this.state.following.find((profile) => { return profile.id === profileID })
    this.setState({
      ...this.state,
      data: this.state.data.concat({
        key: profile,
        value: profile.user.first_name + " " + profile.user.last_name
      }),
      following: this.state.following.filter((profile) => { return profile.id !== profileID })
    })
  }
  
  addFollowing(keyValuePair) {
    axios.defaults.headers = {
      Authorization: getToken()
    }
    axios.post('http://127.0.0.1:8000/api/follow/add_following/', {
      id: keyValuePair.key.id
    })
    this.setState({
      ...this.state,
      data: this.state.data.filter((keyValue) => { return keyValue.key.id !== keyValuePair.key.id }),
      following: this.state.following.concat(keyValuePair.key)
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
            onSelect={this.addFollowing.bind(this)}
          />
        </div>
        <div className="followersPageObject">
          <div className="following">
            <h1>
              <span className="FPtext">Following ({this.state.following.length})</span>
            </h1>
            {this.state.following.map((profile) => {
              return <FollowersComponent
                      key={profile.id}
                      id={profile.id}
                      following={true}
                      firstName={profile.user.first_name}
                      lastName={profile.user.last_name} 
                      image={profile.profilePicture ? 'http://127.0.0.1:8000' + profile.profilePicture : require(`../../images/Logo.png`)}
                      onDelete={this.onDeleteFollowing.bind(this)}
                     />
            })}
          </div>
          <div className="followers">
            <h1>
              <span className="FPtext">Followers ({this.state.followers.length})</span>
            </h1>
            {this.state.followers.map((profile) => {
              return <FollowersComponent 
                      key={profile.id}
                      id={profile.id}
                      following={false}
                      firstName={profile.user.first_name}
                      lastName={profile.user.last_name} 
                      image={profile.profilePicture ? 'http://127.0.0.1:8000' + profile.profilePicture : require(`../../images/Logo.png`)}
                      onDelete={this.onDeleteFollowing.bind(this)}
                      />
            })}
          </div>
        </div>
      </div>
    );
  }
}

export default Followers;
