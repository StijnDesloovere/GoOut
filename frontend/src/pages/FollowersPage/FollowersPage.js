import React from "react";
import MenuBar from "../../components/Menu/Menu";
import "./FollowersPage.css";
import FollowersComponent from "../../components/Followers/Followers";
import ReactSearchBox from "react-search-box";

class Followers extends React.Component {
  componentDidMount() {
    document.title = "Followers | GoOut";
  }

  data = [
    {
      key: "john",
      value: "John Doe"
    },
    {
      key: "jane",
      value: "Jane Doe"
    },
    {
      key: "mary",
      value: "Mary Phillips"
    },
    {
      key: "robert",
      value: "Robert"
    },
    {
      key: "karius",
      value: "Karius"
    }
  ];

  render() {
    return (
      <div className="followersPage">
        <MenuBar />
        <div className="searchBox">
          <header>Add followers</header>
          <ReactSearchBox
            value="search"
            data={this.data}
            callback={record => console.log(record)}
          />
        </div>
        <div className="followersPageObject">
          <div className="following">
            <h1>
              <span className="FPtext">Following (X)</span>
            </h1>
            <FollowersComponent name="Stijn Desloovere" image="Pat" />
            <FollowersComponent name="Pat" image="Pat" />
            <FollowersComponent name="Pat" image="Pat" />
          </div>
          <div className="followers">
            <h1>
              <span className="FPtext">Followers (X)</span>
            </h1>
            <FollowersComponent name="Pat" image="Pat" />
          </div>
        </div>
      </div>
    );
  }
}

export default Followers;
