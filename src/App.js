import React, { Component } from "react";
import SeasonDisplay from "./SeasonDisplay";
import Spinner from "./Spinner";

export default class App extends Component {
  state = {
    latitude: null,
    errMessage: "",
  };

  componentDidMount() {
    window.navigator.geolocation.getCurrentPosition(
      (position) => {
        this.setState({
          latitude: position.coords.latitude,
        });
      },
      (err) => {
        this.setState({
          errMessage: err.message,
        });
      }
    );
  }

  renderContent = () => {
    if (this.state.latitude && !this.state.errMessage) {
      return <SeasonDisplay lat={this.state.latitude} />;
    } else if (!this.state.latitude && this.state.errMessage) {
      return <div> Error: {this.state.errMessage}</div>;
    } else {
      return <Spinner message="Please accept location request"/>;
    }
  };
  render() {
    return <div className="border red">{this.renderContent()}</div>;
  }
}
