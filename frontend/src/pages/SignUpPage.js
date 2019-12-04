import React from "react";
import SignUpWindow from "../components/SignUp/SignUp";

class SignUp extends React.Component {
  componentDidMount() {
    document.title = "Sign-up | GoOut";
  }
  render() {
    return (
      <div>
        <SignUpWindow />
      </div>
    );
  }
}

export default SignUp;
