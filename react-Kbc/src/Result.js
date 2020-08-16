import React, { Component } from "react";
import axios from "axios";
export default class Result extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: props.username,
      score: props.score,
      score1: props.score1,
      score2: props.score2,
      time: 20,
      count: props.count,
      option: props.option,
      quit: props.quit,
      finalScore: 0,
      count1: 0,
      count2: props.count,
    };
  }

  addData = () => {
    var final = 0;
    var d = new Date();
    var n = d.getSeconds();
    this.setState({
      count1: n,
    });
    if (this.state.score1 === undefined && this.state.score2 === undefined)
      final = this.state.score;
    else if (this.state.score1 === undefined && this.state.score === undefined)
      final = this.state.score2;
    else if (this.state.score === undefined && this.state.score2 === undefined)
      final = this.state.score1;
    axios
      .post("/name/add", {
        name: this.state.name,
        prize: final,
        time: this.state.count1,
      })
      .then(() => {
        console.log("Data has been sent to the server");
      })
      .catch(() => {
        console.log("Internal server error");
      });
  };
  render() {
    // var finalScore = this.state.score + this.state.score1 + this.state.score2;
    let text = "";
    if (this.state.count === 0) text = "Your time is up!!";
    else if (this.state.option) text = "You Loose on this Question";
    else if (this.state.quit) text = "You Quit this game";
    // else text = "Congatulations!!!";
    return (
      <div>
        <div>
          <p>{text}</p>
          <p>
            You Won Rs.{this.state.score}
            {this.state.score1} {this.state.score2}
          </p>
        </div>
        <button className="save" onClick={this.addData}>
          Save the Game
        </button>
      </div>
    );
  }
}
