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
import { Button } from "react-bootstrap";

export default class Navigation extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div className="nav bg-dark ">
        <ul>
          <li>
            <Link to={"/"} className="text-white">
              HOME
            </Link>
          </li>
          <li>
            <Link to={"/user/profile/"} className="text-white">
              PROFILE
            </Link>
          </li>
          <li>
            <Link to={"/user/bookinglist/"} className="text-white">
              MY BOOKINGS
            </Link>
          </li>
          <li>
            <Link to={"/user/booking/create/"} className="text-white">
              NEW BOOKINGS
            </Link>
          </li>
          <li>
            <Button
              className="btn btn-info btn-lg"
              onClick={() => {
                this.props.logout();
              }}
            >
              <ExitToAppIcon /> logout
            </Button>
          </li>
        </ul>
      </div>
    );
  }
}
