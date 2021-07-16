import React, { Component } from "react";
import axios from "axios";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./style.css";
import { Redirect } from "react-router";

export default class CreateBooking extends Component {
  constructor(props) {
    super(props);

    this.onChangeCheckinDate = this.onChangeCheckinDate.bind(this);
    this.onChangeCheckoutDate = this.onChangeCheckoutDate.bind(this);
    this.onChangeRoom = this.onChangeRoom.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.dataValidator = this.dataValidator.bind(this);

    this.state = {
      checkin_date: new Date(),
      checkout_date: new Date(),
      number_of_rooms: 1,
      msg: "",
      validatorMsg: "",
    };
  }

  onChangeCheckinDate(date) {
    this.setState({
      checkin_date: date,
    });
  }

  onChangeCheckoutDate(date) {
    this.setState({
      checkout_date: date,
    });
  }

  onChangeRoom(e) {
    this.setState({
      number_of_rooms: e.target.value,
    });
  }

  dataValidator() {
    if (this.state.checkin_date < Date.now()) {
      let minimumCheckInDate = new Date();
      minimumCheckInDate.setDate(minimumCheckInDate.getDate() + 1);
      this.setState({
        msg:
          "CheckIn Starts From " +
          minimumCheckInDate.toString().substr(3, 12) +
          "(i.e. tomorrow)",
      });
      return false;
    }
    if (this.state.checkout_date < this.state.checkin_date) {
      this.setState({
        msg: "CheckOut Date Can't Be In Earlier than CheckIn Date",
      });
      return false;
    }
    if (this.state.number_of_rooms < 1) {
      this.setState({
        msg: "Number Of Rooms Can't Be Less Than 1",
      });
      return false;
    }
    return true;
  }

  onSubmit(e) {
    e.preventDefault();

    if (!this.dataValidator()) {
      return;
    }

    const newBooking = {
      booking_date: new Date(),
      checkin_date: this.state.checkin_date,
      checkout_date: this.state.checkout_date,
      number_of_rooms: this.state.number_of_rooms,
    };

    axios
      .post(
        "https://hotel-reservation-system-1.herokuapp.com/booking/create",
        newBooking,
        {
          headers: { token: this.props.token },
        }
      )
      .then((res) => this.setState({ msg: res.data.msg }));
  }

  render() {
    return (
      <div className="booking-creation container">
        <div className="main-title">Create New Booking</div>
        <div className="booking-creation-card">
          <form onSubmit={this.onSubmit} className="">
            <div className="form-group">
              <label>Checkin-Date: </label>
              <div>
                <DatePicker
                  selected={this.state.checkin_date}
                  onChange={this.onChangeCheckinDate}
                />
              </div>
            </div>
            <div className="form-group">
              <label>Checkout-Date: </label>
              <div>
                <DatePicker
                  selected={this.state.checkout_date}
                  onChange={this.onChangeCheckoutDate}
                />
              </div>
            </div>
            <div className="form-group">
              <label>Number of Rooms: </label>
              <input
                type="text"
                required
                className="form-control"
                value={this.state.number_of_rooms}
                onChange={this.onChangeRoom}
              />
            </div>
            <div className="info-text">{this.state.msg}</div>
            <div className="form-group">
              <input
                type="submit"
                value="Create Booking"
                className="btn btn-primary"
              />
            </div>
          </form>
        </div>
        {this.state.msg === "success" && <Redirect to="/user/bookinglist" />}
      </div>
    );
  }
}
