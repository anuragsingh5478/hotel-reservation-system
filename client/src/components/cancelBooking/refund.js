import React, { Component } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect,
} from "react-router-dom";

export const Item = () => {
  let history = useHistory();
  return (
    <>
      <button onClick={() => history.goBack()} className="btn btn-warning">
        Back
      </button>
    </>
  );
};

export default class Refund extends Component {
  constructor(props) {
    super(props);

    this.state = {
      refund: 0,
      msg: "",
    };
  }

  componentDidMount() {
    var url =
      "https://hotel-reservation-system-1.herokuapp.com/booking/bookinginfo/" +
      this.props.match.params.id;
    axios
      .get(url, {
        headers: { token: this.props.token },
      })
      .then((res) => {
        this.setState({
          refund: res.data.refund,
          msg: res.data.msg,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  showRefund() {
    const refundAmount = (Math.floor(this.state.refund) >= 0)?(Math.floor(this.state.refund)):0;
    return (
      <div>
        <h1>
          The refund is {/* Rupee Symbol */}
          <span>&#8377;</span>
          {refundAmount}
        </h1>
      </div>
    );
  }

  render() {
    return (
      <div className="booking-cancellation container">
        <div className="main-title">Refund</div>
        <div className="booking-cancellation-card">
          {this.showRefund()}
          <Link to={"/home/" + this.props.match.params.id}>back to Home</Link>
        </div>
      </div>
    );
  }
}
