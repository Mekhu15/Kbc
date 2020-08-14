import React, { Component } from "react";
import axios from "axios";
export default class History extends Component {
  state = {
    data: [],
    id: 0,
    name: "",
    prize: "",
    time: "",
  };

  componentDidMount() {
    this.getData();
  }
  getData = () => {
    axios
      .get("/history")
      .then((response) => {
        const data = response.data;
        console.log(data);
        this.setState({
          post: data,
          id: 0,
          name: "",
          prize: "",
          time: "",
        });
        console.log("recieved");
      })
      .catch(() => {
        console.log("not received");
      });
  };
  render() {
    return <div>Hello</div>;
  }
}
