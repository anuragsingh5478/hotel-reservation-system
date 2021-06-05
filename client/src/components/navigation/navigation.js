import React, { Component } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect,
} from "react-router-dom";
import "./style.css";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";

export default class Navigation extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div className="nav bg-dark ">
        <ul>
          <li>
            <Link
              to={"/home/" + this.props.match.params.id}
              className="text-white"
            >
              HOME
            </Link>
          </li>
          <li>
            <Link
              to={"/home/profile/" + this.props.match.params.id}
              className="text-white"
            >
              PROFILE
            </Link>
          </li>
          <li>
            <Link
              to={"/home/bookinglist/" + this.props.match.params.id}
              className="text-white"
            >
              MY BOOKINGS
            </Link>
          </li>
          <li>
            <Link
              to={"/home/booking/create/" + this.props.match.params.id}
              className="text-white"
            >
              NEW BOOKINGS
            </Link>
          </li>
          <li>
            <Link to={"/login"} className="text-white">
              <span className="btn btn-info btn-lg">
                <ExitToAppIcon /> Log out
              </span>
            </Link>
          </li>
        </ul>
      </div>
    );
  }
}
