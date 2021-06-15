import React, { Component } from "react";
import axios from "axios";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useHistory, Redirect } from "react-router-dom";

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

export default class EditBooking extends Component {
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

    const updatedBooking = {
      _id: this.props.match.params.id,
      booking_date: new Date(),
      checkin_date: this.state.checkin_date,
      checkout_date: this.state.checkout_date,
      number_of_rooms: this.state.number_of_rooms,
    };

    axios
      .post(
        "https://hotel-reservation-system-1.herokuapp.com/booking/edit",
        updatedBooking,
        {
          headers: { token: this.props.token },
        }
      )
      .then((res) => this.setState({ msg: res.data.msg }));

    // window.location = "/user/booking/refund/" + this.props.match.params.id;
  }

  componentDidMount() {
    var url =
      "https://hotel-reservation-system-1.herokuapp.com/booking/bookinginfo/" +
      this.props.match.params.id;
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
        <div className="card-header h1">Edit Booking</div>
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
                value="Save Booking"
                className="btn btn-primary"
              />
            </div>
            <Item>Back</Item>
          </form>
        </div>
        {this.state.msg === "success" && (
          <Redirect to={"/user/booking/refund/" + this.props.match.params.id} />
        )}
      </div>
    );
  }
}
