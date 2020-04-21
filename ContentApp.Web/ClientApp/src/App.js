import React, { Component } from "react";
import Content from "./Content";

export default class App extends Component {
  componentDidMount() {
    document.title = "Content App";
  }
  render() {
    return <Content />;
  }
}
