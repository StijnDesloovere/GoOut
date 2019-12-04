import React from "react";
import MenuBar from "../components/Menu/Menu";
import Account from "../components/Account/Account";

class AccountDetails extends React.Component {
  componentDidMount() {
    document.title = "Account | GoOut";
  }

  render() {
    return (
      <div>
        <MenuBar />
        <Account />
      </div>
    );
  }
}

export default AccountDetails;
