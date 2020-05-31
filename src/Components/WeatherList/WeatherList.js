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
    console.log(temp);
    return temp;
  }
  cards = () => {
    return this.state.days.map((data) => (
      <WeatherCard className="d-flex" data={data} />
    ));
  };
  render() {
    return (
      <div>
        <h1 className="display-1 d-flex justify-content-center">
          {this.props.data.city.name}
        </h1>
        <div className="d-flex justify-content-between align-content-center flex-wrap row">
          {this.cards()}
        </div>
      </div>
    );
  }
}
