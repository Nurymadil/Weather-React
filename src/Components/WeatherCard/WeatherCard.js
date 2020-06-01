import React, { Component } from "react";
import "../WeatherCard/WeatherCard.css";
import api from "../Api/api";
import "open-weather-icons";

let moment = require("moment");
export default class WeatherCard extends Component {
  render() {
    const iconUrl = `owf owf-${this.props.data.weather[0].id} owf-5x`;
    const date = moment(this.props.data.dt_txt.replace(" ", "T"));
    return (
      // <div className="weather-card col-2 d-flex flex-column">
      //   <div className="card">
      //     <div className="d-flex justify-content-center">
      //       <h3 className="card-title">
      //         {moment(new Date(date)).format("dddd")}
      //       </h3>
      //     </div>
      //     <div className="d-flex justify-content-center">
      //       <p className="text-muted">
      //         {moment(new Date(date)).format("MMMM Do, h:mm a")}
      //       </p>
      //     </div>
      //     <div className="d-flex flex-column  align-items-center">
      //       <i className={iconUrl}></i>
      //       <h3>{Math.round(this.props.data.main.temp)}℃</h3>
      //     </div>
      //     <div className="card-body">
      //       <p className="card-text d-flex justify-content-center">
      //         {this.props.data.weather[0].description}
      //       </p>
      //     </div>
      //   </div>
      // </div>
      <div className="m-3 col-10 col-md-5 col-lg-5 col-xl-2 card d-flex flex-column align-items-center align-content-md-between align-content-xl-between justify-content-center justify-content-md-between justify-content-xl-between text-light">
        <h2 className="mt=3"> {moment(new Date(date)).format("dddd")} </h2>
        <i className={iconUrl}></i>
        <h1>{Math.round(this.props.data.main.temp)}℃</h1>
        <div className="d-flex justify-content-center ">
          {this.props.data.weather[0].description}
        </div>
        <div className="card-body d-flex justify-content-between align-content-center col-12 mt-3">
          <div className="d-flex flex-column">
            <h4>{Math.round(this.props.data.main.temp_min)}</h4>
            <p className="text-muted">Min</p>
          </div>
          <div className="d-flex flex-column">
            <h4>{Math.round(this.props.data.main.temp_max)}</h4>
            <p className="text-muted">Max</p>
          </div>
        </div>
      </div>
    );
  }
}
