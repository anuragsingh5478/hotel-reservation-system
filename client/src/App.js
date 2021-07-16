import React from "react";
import "./App.css";
import Header from "./components/header/Header";
import Homepage from "./components/homepage/homepage";
import Login from "./components/login/login";
import SignUp from "./components/signup/signup";
import Profile from "./components/profile/profile";
import EditProfile from "./components/profile/editprofile";
import Navigation from "./components/navigation/navigation";
import BookingList from "./components/bookingList/bookingList";
import CreateBooking from "./components/createBooking/createBooking";
import EditBooking from "./components/cancelBooking/editBooking";
import CancelBooking from "./components/cancelBooking/cancelBooking";
import Refund from "./components/cancelBooking/refund";

import useToken from "./useToken";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";

export default function App() {
  const { token, setToken, logout } = useToken();
  if (!token) {
    return (
      <Router>
        <div className="App">
          <Switch>
            <Route path="/login" exact>
              <Login setToken={setToken} />
            </Route>
            <Route path="/signup" exact>
              <SignUp setToken={setToken} />
            </Route>
            <Redirect to="/login" />
          </Switch>
        </div>
      </Router>
    );
  }

  // if user is authenicated
  return (
    <Router>
      <div className="App">
        <Navigation logout={logout} />
        <Header />
        <Switch>
          <Route path="/" exact>
            <Homepage token={token} />
          </Route>
          <Route path="/user/profile" exact>
            <Profile token={token} />
          </Route>
          <Route path="/user/editprofile" exact>
            <EditProfile token={token} />
          </Route>
          <Route path="/user/bookinglist" exact>
            <BookingList token={token} />
          </Route>
          <Route path="/user/booking/create" exact>
            <CreateBooking token={token} />
          </Route>

          <Route
            path="/user/booking/refund/:id"
            exact
            render={({ location, match }) => (
              <Refund token={token} match={match} />
            )}
          ></Route>
          <Route
            path="/user/booking/cancel/:id"
            exact
            render={({ location, match }) => (
              <CancelBooking token={token} match={match} />
            )}
          ></Route>
          <Route
            path="/user/booking/edit/:id"
            exact
            render={({ location, match }) => (
              <EditBooking token={token} match={match} />
            )}
          ></Route>

          <Redirect to="/" />
        </Switch>
      </div>
    </Router>
  );
}

