import React, { Component } from "react";
import Game from "./Game";
import GoogleLogin from "react-google-login";
export default class User extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      start: false,
    };
    this.startGame = this.startGame.bind(this);
  }

  setUsername = (event) => {
    this.setState({
      username: event.target.value,
    });
  };

  startGame() {
    if (this.state.username !== "") {
      this.setState({
        start: true,
      });
    }
  }

  render() {
    const { start } = this.state;
    if (start === true) {
      return (
        <div>
          <Game username={this.state.username}></Game>
        </div>
      );
    }

    const responseGoogle = (response) => {
      this.setState({
        username: response.profileObj.name,
      });
      // console.log(response);
    };

    return (
      <div>
        <div className="container">
          <div className="home">
            <h1>
              Welcome to the KBC <sub className="rel">Reloaded</sub>
            </h1>
            <br />
            Enter your Name to start <br />
            <input
              type="text"
              onChange={this.setUsername}
              value={this.state.username}
            />
            <br />
            <br />
            <GoogleLogin
              className="google"
              clientId="826813629504-kg9qb57sthjubjsdamj9fk7lafuola66.apps.googleusercontent.com"
              buttonText="Login with Google"
              onSuccess={responseGoogle}
              onFailure={responseGoogle}
              cookiePolicy={"single_host_origin"}
            />
            <br />
            <br />
            <button
              className="button"
              disabled={this.state.username.length < 1}
              onClick={this.startGame}
            >
              Let's Play
            </button>
          </div>
        </div>
      </div>
    );
  }
}
