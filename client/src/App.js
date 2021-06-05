import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect,
} from "react-router-dom";
import "./App.css";
import Homepage from "./components/homepage/homepage";
import Login from "./components/login/login";
import SignUp from "./components/signup/signup";
import Profile from "./components/profile/profile";
import NewProfile from "./components/profile/newprofile";
import EditProfile from "./components/profile/editprofile";
import Navigation from "./components/navigation/navigation";
import BookingList from "./components/bookingList/bookingList";
import CreateBooking from "./components/createBooking/createBooking";
import EditBooking from "./components/cancelBooking/editBooking";
import CancelBooking from "./components/cancelBooking/cancelBooking";
import Refund from "./components/cancelBooking/refund";
import Default from "./components/Default";

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  // <Route path="*/:id" component={Navigation} />

  render() {
    return (
      <Router>
        <div className="App container">
          {/* paste here */}
          <Switch>
            <Route path="/" exact component={Default} />
            <Route path="/login" exact component={Login} />

            <Route path="/signup" exact component={SignUp} />

            <Route path="/setprofile/:id" exact component={NewProfile} />

            <Route path="/home/:id" exact component={Homepage} />

            <Route path="/home/profile/:id" exact component={Profile} />

            <Route path="/home/editprofile/:id" exact component={EditProfile} />

            <Route path="/home/bookinglist/:id" exact component={BookingList} />

            <Route
              path="/home/editbooking/:id/:bookingid"
              exact
              component={EditBooking}
            />

            <Route
              path="/home/cancel/:id/:bookingid"
              exact
              component={CancelBooking}
            />

            <Route
              path="/home/refund/:id/:bookingid"
              exact
              component={Refund}
            />

            <Route
              path="/home/booking/create/:id"
              exact
              component={CreateBooking}
            />
          </Switch>
        </div>
      </Router>
    );
  }
}
