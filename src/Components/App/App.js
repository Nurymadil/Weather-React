import React, { Component } from "react";
import "./App.css";
import { render } from "@testing-library/react";
import "bootstrap/dist/css/bootstrap.min.css";
import WeatherList from "../WeatherList/WeatherList";
import Search from "../Search/Search";
import "../App/App.css";
import "../App/switchRadio.css";
const api = {
  url: "http://api.openweathermap.org/data/2.5/forecast?q=",
  key: "eedf6d3736ec6ebb4f97b8e0819a31fa",
};

export default class App extends Component {
  state = {
    searchText: "",
    isResult: false,
    data: [],
  };
  search = (cityName) => {
    fetch(`${api.url}${cityName}&lang=ru&units=metric&appid=${api.key}`)
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
  };
  passData = (data) => {
    this.setState({ searchText: data });
    this.search(this.state.searchText);
  };
  handleChangeMode = (e) => {
    if (e.target.checked) {
      document.body.classList.add("dark");
      document.body.classList.remove("light");
    } else {
      document.body.classList.add("light");
      document.body.classList.remove("dark");
    }
  };
  render() {
    let cards = this.state.isResult ? (
      <WeatherList data={this.state.data} />
    ) : null;
    return (
      <div>
        <nav className="navbar navbar-color navbar-dark ">
          <a class="navbar-brand" href="#">
            Weather
          </a>
          <Search passData={this.passData} />

          <div className="d-flex text-light justify-content-center">
            <h3 className="mr-2">Light</h3>
            <label class="switch">
              <input
                type="checkbox"
                onChange={(e) => this.handleChangeMode(e)}
              ></input>
              <span class="slider round"></span>
            </label>
            <h3 className="ml-2 text-muted">Dark</h3>
          </div>
        </nav>
        <div className="container d-flex flex-column flex-wrap">
          <div>{cards}</div>
        </div>
      </div>
    );
  }
}
