import React, { Component } from "react";

export class ConvertorCard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      title: "hi",
      indianSystem: "",
      westernSystem: "",
      currency: "",
      unit: "usd",
    };
  }
  render() {
    return (
      <div class='card border-dark mb-3'>
        <div class='card-body'>
          <p class='card-text'>{this.props.valueToConvert} is</p>
          <h4 class='card-title'>{this.props.convvertedValue}</h4>
        </div>
      </div>
    );
  }
}

export default ConvertorCard;
