// import React from "react";
// import "./index.css";

// // const result = (props) => {
// //   constructor(props);
// //   {
// //     super(props);
// //     this.state = {
// //       name: props.username,
// //       score: props.score,
// //       time: 20,
// //     };
// //   }
// //   componentDidMount() {
// //     this.addData();
// //   }

// //   addData = () => {
// //     var data = {
// //       name: this.state.name,
// //       score: this.state.email,
// //       time: this.state.time,
// //     };
// //     console.log(data);
// //     fetch("/name/add", {
// //       method: "GET",
// //       headers: { "Content-Type": "application/json" },
// //       body: JSON.stringify(data),
// //     })
// //       .then(function (response) {
// //         if (response.status >= 400) {
// //           throw new Error("Bad response from server");
// //         }
// //         return response.json();
// //       })
// //       .then(function (data) {
// //         console.log(data);
// //         if (data == "success") {
// //           this.setState({ msg: "Thanks for registering" });
// //         }
// //       })
// //       .catch(function (err) {
// //         console.log(err);
// //       });
// //   };
// //   return <div>You won:Rs.{this.state.score}</div>;
// // };
// // export default result;
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
    };
  }

  addData = () => {
    axios
      .post("/name/add", {
        name: this.state.name,
        score: this.state.score,
        time: this.state.time,
      })
      .then(() => {
        console.log("Data has been sent to the server");
      })
      .catch(() => {
        console.log("Internal server error");
      });
  };
  render() {
    return (
      <div>
        <button onClick={this.addData}>Hello</button>
      </div>
    );
  }
}
