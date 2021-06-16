import axios from "axios";
import React, { Component } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect,
} from "react-router-dom";
import "./bookingList.css";

function BookingDetailCol(props) {
  return (
    <div className="booking-info-card">
      <div className="booking-info">
        Booking Date:{" "}
        <span className="booking-info-value">{props.booking_date}</span>
      </div>
      <div className="booking-info">
        CheckIn Date:{" "}
        <span className="booking-info-value">{props.checkin_date}</span>
      </div>
      <div className="booking-info">
        CheckOut Date:{" "}
        <span className="booking-info-value">{props.checkout_date}</span>
      </div>
      <div className="booking-info">
        Number of Rooms:{" "}
        <span className="booking-info-value">{props.number_of_rooms}</span>
      </div>
      <div className="booking-info">
        Cost:{" "}
        <span className="booking-info-value">
          {/* Rupee Symbol */}
          <span>&#8377;</span>
          {props.cost}
        </span>
      </div>
      <div className="booking-info-action-buttons">
        <button className="btn btn-warning" style={{ margin: "0px 5px" }}>
          <Link to={"/user/booking/cancel/" + props.booking_id}>
            Full cancellation
          </Link>
        </button>
        <button className="btn btn-warning">
          <Link to={"/user/booking/edit/" + props.booking_id}>
            Partial cancellation
          </Link>
        </button>
      </div>
    </div>
  );
}
export default class BookingList extends Component {
  constructor(props) {
    super(props);
    this.state = { bookings: [] };
  }
  componentDidMount() {
    var url =
      "https://hotel-reservation-system-1.herokuapp.com/booking/userBookingsList";
    axios.get(url, { headers: { token: this.props.token } }).then((res) => {
      this.setState({ bookings: res.data.allBookings });
      console.log(res.data);
    });
  }
  showBooking() {
    return this.state.bookings.map((booking) => {
      return (
        <BookingDetailCol
          booking_id={booking._id}
          booking_date={booking.booking_date.substring(0, 10)}
          checkin_date={booking.checkin_date.substring(0, 10)}
          checkout_date={booking.checkout_date.substring(0, 10)}
          number_of_days={booking.number_of_days}
          number_of_rooms={booking.number_of_rooms}
          cost={booking.cost}
          key={booking._id}
        ></BookingDetailCol>
      );
    });
  }
  render() {
    return (
      <div className="booking-list container">
        <div className="booking-list-heading">My Bookings</div>
        {this.state.bookings.length == 0 ? (
          <div className="booking-list-empty-text">Booking List Is Empty</div>
        ) : (
          this.showBooking()
        )}
      </div>
    );
  }
}
