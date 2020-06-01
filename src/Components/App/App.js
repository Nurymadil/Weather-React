import React, { Component } from "react";
import "./App.css";
import { render } from "@testing-library/react";
import "bootstrap/dist/css/bootstrap.min.css";
import WeatherList from "../WeatherList/WeatherList";
import Search from "../Search/Search";
import "../App/App.css";
import "../App/switchRadio.css";
import Error from "../Error/error";
const api = {
  url: "http://api.openweathermap.org/data/2.5/",
  key: "eedf6d3736ec6ebb4f97b8e0819a31fa",
};

export default class App extends Component {
  constructor() {
    super();
    navigator.geolocation.getCurrentPosition((position) => {
      console.log(position.coords);
      this.initUserLocation(position.coords);
    });
  }
  state = {
    isResult: false,
    data: [],
    checkedRadio: this.initDarkMode(),
    userPosition: false,
  };
  initDarkMode() {
    localStorage.getItem("weather-dark-mode") == "true"
      ? document.body.classList.add("dark")
      : document.body.classList.add("light");
    return localStorage.getItem("weather-dark-mode") == "true" ? true : false;
  }
  initUserLocation(pos) {
    this.search(true, pos);
  }
  search(init, cityName) {
    if (!init) {
      fetch(
        `${api.url}forecast?q=${cityName}&lang=ru&units=metric&appid=${api.key}`
      )
        .then((res) => res.json())
        .then((result) => {
          console.log(result);
          if (result.cod === "200") {
            this.setState({ isResult: true, data: result });
          }
        })
        .catch((error) => {
          this.setState({ isResult: false });
          alert(error);
        });
    } else {
      fetch(
        `${api.url}forecast?lat=${cityName.latitude}&lon=${cityName.longitude}&lang=ru&units=metric&appid=${api.key}`
      )
        .then((res) => res.json())
        .then((result) => {
          console.log(result);
          this.setState({ userPosition: true, data: result });
        })
        .catch((error) => {
          this.setState({ userPosition: false });
          alert(error);
        });
    }
  }

  updatePosition(position) {
    let lo = position.coords.longitude;
    let la = position.coords.latitude;
    alert(position);
    let cityName = {
      lon: lo,
      lat: la,
    };
    this.search(true, cityName);
  }

  passData = (data) => {
    this.search(false, data);
  };
  handleChangeMode = (e) => {
    if (e.target.checked) {
      document.body.classList.add("dark");
      document.body.classList.remove("light");
      localStorage.setItem("weather-dark-mode", "true");
      this.setState({ checkedRadio: true });
    } else {
      document.body.classList.add("light");
      document.body.classList.remove("dark");
      localStorage.setItem("weather-dark-mode", "false");
      this.setState({ checkedRadio: false });
    }
  };
  render() {
    let cards = this.state.isResult ? (
      <WeatherList data={this.state.data} />
    ) : this.state.userPosition ? (
      <WeatherList data={this.state.data} />
    ) : (
      <Error></Error>
    );
    console.log(this.state.data);
    return (
      <div>
        <nav className="navbar navbar-color navbar-dark d-flex justify-content-center ">
          <Search passData={this.passData} />
          <div className="d-flex text-light justify-content-center m-3">
            <h3 className="mr-2">Light</h3>
            <label class="switch">
              <input
                type="checkbox"
                onChange={(e) => this.handleChangeMode(e)}
                defaultChecked={this.state.checkedRadio}
              ></input>
              <span class="slider round"></span>
            </label>
            <h3 className="ml-2 text-muted">Dark</h3>
          </div>
        </nav>
        <div className="d-flex flex-column flex-wrap">
          <div>{cards}</div>
        </div>
      </div>
    );
  }
}
