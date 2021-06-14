import axios from "axios";
import React, { Component } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect,
} from "react-router-dom";

function BookingDetail(props) {
  return (
    <tr>
      <td>{props.booking_date}</td>
      <td>{props.checkin_date}</td>
      <td>{props.checkout_date}</td>
      <td>{props.number_of_rooms}</td>
      <td>{props.cost}</td>
      <td>
        <button className="btn btn-warning" style={{ margin: "0px 5px" }}>
          <Link to={"/user/booking/cancel/" + props.booking_id}>
            Full cancellation
          </Link>
        </button>
        {/* <button className="btn btn-warning">
          <Link
            to={"/user/editbooking/" + props.user_id + "/" + props.booking_id}
          >
            Partial cancellation
          </Link>
        </button> */}
      </td>
    </tr>
  );
}
export default class BookingList extends Component {
  constructor(props) {
    super(props);
    this.state = { bookings: [] };
  }
  componentDidMount() {
    var url = "http://localhost:5000/booking/userBookingsList";
    axios.get(url, { headers: { token: this.props.token } }).then((res) => {
      this.setState({ bookings: res.data.allBookings });
      console.log(res.data);
    });
  }
  showBooking() {
    return this.state.bookings.map((booking) => {
      return (
        <BookingDetail
          booking_id={booking._id}
          booking_date={booking.booking_date.substring(0, 10)}
          checkin_date={booking.checkin_date.substring(0, 10)}
          checkout_date={booking.checkout_date.substring(0, 10)}
          number_of_days={booking.number_of_days}
          number_of_rooms={booking.number_of_rooms}
          cost={booking.cost}
          key={booking._id}
        ></BookingDetail>
      );
    });
  }
  render() {
    return (
      <div className="card container">
        <div className="card-header h1">MY Bookings</div>
        <table className="table">
          <thead className="thead-light">
            <tr>
              <th>Booking Date</th>
              <th>Checkin-date</th>
              <th>Checkout-date</th>
              <th>Rooms</th>
              <th>Cost</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>{this.showBooking()}</tbody>
        </table>
      </div>
    );
  }
}
