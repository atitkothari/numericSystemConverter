import React, { Component } from "react";
import "../App.css";
import ConverterCard from "./ConvertorCard";

export class Form extends Component {
  constructor(props) {
    super(props);

    this.state = {
      userNumber: "",
      indianSystem: "",
      westernSystem: "",
      currency: "",
      convertedINR: "",
      convertedUSD: "",
      unit: "usd",
      conversionRate: "",
    };

    this.textInput = React.createRef();
  }

  componentDidMount() {
    var number = "100000";

    fetch("https://api.exchangeratesapi.io/latest?base=USD")
      .then((res) => res.json())
      .then((data) => {
        this.setState({ conversionRate: data.rates.INR });
        var i = this.IndianNumberSystem(number);
        var w = this.WesternNumberSystem(number);
        var inrToUsd =
          Number(
            this.WesternNumberSystem(number / this.state.conversionRate).number
          ).toFixed(1) +
          " " +
          this.WesternNumberSystem(number / this.state.conversionRate).postfix;

        var usdToInr =
          Number(
            this.IndianNumberSystem(number * this.state.conversionRate).number
          ).toFixed(1) +
          " " +
          this.IndianNumberSystem(number * this.state.conversionRate).postfix;

        this.setState({
          indianSystem: i.number + " " + i.postfix,
          //indianSystem: number + " " + postfix,
          westernSystem: w.number + " " + w.postfix,
          userNumber: number,
          convertedINR: usdToInr,
          convertedUSD: inrToUsd,
        });
      })
      .catch(console.log);

    this.textInput.current.focus();
  }
  IndianNumberSystem = function getIndianNumberSystem(number) {
    var postfix = "";
    var thousand = 1000;
    var lakhs = 100000;
    var cr = 10000000;
    var ab = 1000000000;
    var thousandCr = 10000000000;
    var lakhCr = 1000000000000;
    var CrCr = 100000000000000;
    if (number >= thousand && number < lakhs) {
      postfix = "thousand";
      number /= thousand;
    } else if (number >= lakhs && number < cr) {
      postfix = "lakhs";
      number /= lakhs;
    } else if (number >= cr && number < ab) {
      postfix = "crore";
      number /= cr;
    } else if (number >= ab && number < thousandCr) {
      postfix = "hundred crore";
      number /= ab;
    } else if (number >= thousandCr && number < lakhCr) {
      postfix = "thousand crore";
      number /= thousandCr;
    } else if (number >= lakhCr && number < CrCr) {
      postfix = "lakh crore";
      number /= lakhCr;
    } else if (number >= CrCr) {
      postfix = "crore crore";
      number /= CrCr;
    }
    return { number: number, postfix: postfix };
  };

  WesternNumberSystem = function getIndianNumberSystem(number) {
    var number_w = number;
    var postfix_w = "";
    var thousand_w = 1000;
    var millions_w = 1000000;
    var billion_w = 1000000000;
    var trillion_w = 1000000000000;
    if (number_w >= thousand_w && number_w < millions_w) {
      postfix_w = "thousand";
      number_w /= thousand_w;
    } else if (number_w >= millions_w && number_w < billion_w) {
      postfix_w = "million";
      number_w /= millions_w;
    } else if (number_w >= billion_w && number_w < trillion_w) {
      postfix_w = "billion";
      number_w /= billion_w;
    } else if (number_w >= trillion_w) {
      postfix_w = "trillion";
      number_w /= trillion_w;
    }
    return { number: number_w, postfix: postfix_w };
  };
  handleConversion = (event) => {
    var number = event.target.value;

    var i = this.IndianNumberSystem(number);
    var w = this.WesternNumberSystem(number);
    var inrToUsd =
      Number(
        this.WesternNumberSystem(number / this.state.conversionRate).number
      ).toFixed(1) +
      " " +
      this.WesternNumberSystem(number / this.state.conversionRate).postfix;

    var usdToInr =
      Number(
        this.IndianNumberSystem(number * this.state.conversionRate).number
      ).toFixed(1) +
      " " +
      this.IndianNumberSystem(number * this.state.conversionRate).postfix;

    this.setState({
      userNumber: event.target.value,
      indianSystem: i.number + " " + i.postfix,
      //indianSystem: number + " " + postfix,
      westernSystem: w.number + " " + w.postfix,

      convertedINR: usdToInr,
      convertedUSD: inrToUsd,
    });
  };

  render() {
    return (
      <form>
        <div>
          <div class='form-group'>
            <input
              class='form-control form-control-lg'
              type='number'
              inputMode='numeric'
              placeholder='eg. 10000000'
              id='inputLarge'
              value={this.state.userNumber}
              onChange={this.handleConversion}
              ref={this.textInput}
            />
          </div>
          <div class='grid-container'>
            <div class='card text-white bg-primary mb-3'>
              <div class='card-body'>
                <h4 class='card-title'>{this.state.westernSystem}</h4>
                <p class='card-text'>Western System</p>
              </div>
            </div>
            <div class='card text-white bg-primary mb-3'>
              <div class='card-body'>
                <h4 class='card-title'>{this.state.indianSystem}</h4>
                <p class='card-text'>Indian System</p>
              </div>
            </div>
          </div>
        </div>
        <hr></hr>
        <div>
          <ConverterCard
            valueToConvert={`Rs.  ${this.state.indianSystem}`}
            convvertedValue={`$ ${this.state.convertedUSD}`}
          />
        </div>
        <div>
          <ConverterCard
            valueToConvert={`$  ${this.state.westernSystem}`}
            convvertedValue={`Rs. ${this.state.convertedINR}`}
          />
        </div>
      </form>
    );
  }
}

export default Form;
