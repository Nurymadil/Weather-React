import React, { Component } from "react";

export default class Search extends Component {
  constructor() {
    super();
    this.state = {
      value: "",
    };
  }
  handleChange = (e) => {
    this.setState({ value: e.target.value });
  };
  handlePassData = () => {
    this.props.passData(this.state.value);
  };
  render() {
    return (
      <div className="d-flex  col-8">
        <input
          type="text"
          className="col-8"
          placeholder="Введите город..."
          onChange={(e) => {
            this.handleChange(e);
          }}
        ></input>
        <button
          type="button"
          className="btn btn-info col-xl-1 col-md-2 col-6"
          onClick={this.handlePassData}
        >
          Поиск
        </button>
      </div>
    );
  }
}
