import React from "react";
import "./App.css";
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
import Default from "./components/Default";

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

// export default class App extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = {};
//   }

//   render() {
//     return (
//       <Router>
//         <div className="App container">
//           <Route path="*/:id" component={Navigation} />

//           <Switch>
//             <Route path="/" exact component={Default} />
//             <Route path="/login" exact component={Login} />

//             <Route path="/signup" exact component={SignUp} />

//             <Route path="/setprofile/:id" exact component={NewProfile} />

//             <Route path="/home/:id" exact component={Homepage} />

//             <Route path="/home/profile/:id" exact component={Profile} />

//             <Route path="/home/editprofile/:id" exact component={EditProfile} />

//             <Route path="/home/bookinglist/:id" exact component={BookingList} />

//             <Route
//               path="/home/editbooking/:id/:bookingid"
//               exact
//               component={EditBooking}
//             />

//             <Route
//               path="/home/cancel/:id/:bookingid"
//               exact
//               component={CancelBooking}
//             />

//             <Route
//               path="/home/refund/:id/:bookingid"
//               exact
//               component={Refund}
//             />

//             <Route
//               path="/home/booking/create/:id"
//               exact
//               component={CreateBooking}
//             />
//           </Switch>
//         </div>
//       </Router>
//     );
//   }
// }
