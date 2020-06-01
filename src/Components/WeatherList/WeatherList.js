import React, { Component } from "react";
import WeatherCard from "../WeatherCard/WeatherCard";
export default class WeatherList extends Component {
  state = {
    days: this.init(),
  };
  init() {
    let temp = [];
    for (let i = 0; i < this.props.data.list.length; i += 8) {
      temp.push(this.props.data.list[i]);
    }
    return temp;
  }
  updateData() {
    let temp = [];
    for (let i = 0; i < this.props.data.list.length; i += 8) {
      temp.push(this.props.data.list[i]);
    }
    this.setState({ days: temp });
  }
  componentDidUpdate(prevProps) {
    if (this.props.data !== prevProps.data) {
      this.updateData();
    }
  }
  render() {
    let cards = () => {
      return this.state.days.map((data) => (
        <WeatherCard className="d-flex" data={data} />
      ));
    };
    return (
      <div>
        <h1 className="display-1 d-flex justify-content-center">
          {this.props.data.city.name}
        </h1>
        <div
          className="d-flex justify-content-center  align-content-center flex-wrap row
        justify-content-md-around align-content-lg-around
        "
        >
          {cards()}
        </div>
      </div>
    );
  }
}
