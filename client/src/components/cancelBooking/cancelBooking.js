import React, { Component } from "react";
import axios from "axios";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useHistory, useParams } from "react-router-dom";

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

export default class CancelBooking extends Component {
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
      _id: this.props.match.params.id,
      booking_date: new Date(),
      checkin_date: this.state.checkin_date,
      checkout_date: this.state.checkout_date,
      number_of_rooms: this.state.number_of_rooms,
    };

    console.log(newBooking);

    axios
      .post("http://localhost:5000/booking/cancel", newBooking, {
        headers: { token: this.props.token },
      })
      .then((res) => console.log(res.data));

    window.location = "/user/booking/refund/" + this.props.match.params.id;
  }

  componentDidMount() {
    let bookingId = this.props.match.params.id;
    var url = "http://localhost:5000/booking/bookinginfo/" + bookingId;
    axios
      .get(url, { headers: { token: this.props.token } })
      .then((res) => {
        this.setState({
          checkin_date: new Date(res.data.checkin_date),
          checkout_date: new Date(res.data.checkout_date),
          number_of_rooms: res.data.number_of_rooms,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  render() {
    return (
      <div className="card container">
        <div className="card-header h1">Cancel Booking</div>
        <div className="card-body">
          <form onSubmit={this.onSubmit} className="container">
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
                value="Cancel Booking"
                className="btn btn-primary"
              />
            </div>
            <Item>back</Item>
          </form>
        </div>
      </div>
    );
  }
}
