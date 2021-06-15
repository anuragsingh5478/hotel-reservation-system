import React, { Component } from "react";
import axios from "axios";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./style.css";
import { Redirect } from "react-router";

export default class CreateExercise extends Component {
  constructor(props) {
    super(props);

    this.onChangeCheckinDate = this.onChangeCheckinDate.bind(this);
    this.onChangeCheckoutDate = this.onChangeCheckoutDate.bind(this);
    this.onChangeRoom = this.onChangeRoom.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      checkin_date: new Date(),
      checkout_date: new Date(),
      number_of_rooms: 0,
      msg: "",
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

  onSubmit(e) {
    e.preventDefault();

    const newBooking = {
      booking_date: new Date(),
      checkin_date: this.state.checkin_date,
      checkout_date: this.state.checkout_date,
      number_of_rooms: this.state.number_of_rooms,
    };

    console.log(newBooking);
    axios
      .post(
        "https://hotel-reservation-system-1.herokuapp.com/booking/create",
        newBooking,
        {
          headers: { token: this.props.token },
        }
      )
      .then((res) => this.setState({ msg: res.data.msg }));

    // window.location = "/home/bookinglist/" + this.props.match.params.id;
  }

  render() {
    return (
      <div className="my-container">
        <div className="card-header h1">Create New Booking</div>
        <div className="card-body container">
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
