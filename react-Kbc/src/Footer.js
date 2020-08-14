import React, { Component } from "react";
import "./index.css";
import cash from "./cashprize.json";

export default class Footer extends Component {
  render() {
    let prize = cash.map((cash) => <div>{cash}</div>);
    return <div class="flex-container">{prize}</div>;
  }
}
