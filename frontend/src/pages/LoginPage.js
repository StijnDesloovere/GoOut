import React from "react";
import LoginWindow from "../components/Login/Login";

class Login extends React.Component {
  componentDidMount() {
    document.title = "Login | GoOut";
  }
  render() {
    return (
      <div>
        <LoginWindow />
      </div>
    );
  }
}

export default Login;
