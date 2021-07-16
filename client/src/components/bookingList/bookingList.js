import axios from "axios";
import React, { Component } from "react";
import { Link } from "react-router-dom";
import BookingListCard from "./bookingListCard";
import "./bookingList.css";

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
    });
  }
  showBooking() {
    return this.state.bookings.map((booking) => {
      return (
        <BookingListCard
          booking_id={booking._id}
          booking_date={booking.booking_date.substring(0, 10)}
          checkin_date={booking.checkin_date.substring(0, 10)}
          checkout_date={booking.checkout_date.substring(0, 10)}
          number_of_days={booking.number_of_days}
          number_of_rooms={booking.number_of_rooms}
          cost={booking.cost}
          key={booking._id}
        ></BookingListCard>
      );
    });
  }
  render() {
    return (
      <div className="booking-list container">
        <div className="main-title">My Bookings</div>
        <div className="container">
          {this.state.bookings.length == 0 ? (
            <div className="booking-list-empty-text">Booking List Is Empty</div>
          ) : (
            this.showBooking()
          )}
        </div>
      </div>
    );
  }
}
