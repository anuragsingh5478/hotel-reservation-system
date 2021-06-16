import React, { useState, useEffect } from "react";
import "./style.css";
import { Link } from "react-router-dom";
import MenuIcon from "@material-ui/icons/Menu";
import { IconButton } from "@material-ui/core";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import { Button } from "react-bootstrap";
export default function Navigation(props) {
  const [menuVisible, setmenuVisible] = useState(false);
  useEffect(() => {
    var sidebarMenu = document.getElementById("sidebar-menu");
    if (menuVisible) {
      sidebarMenu.style.transform = "translateX(0%)";
      sidebarMenu.style.transition = "transform 2s";
    } else {
      sidebarMenu.style.transform = "translateX(-100%)";
      sidebarMenu.style.transition = "transform 2s";
    }
  }, [menuVisible]);
  return (
    <div className="navigation">
      <div className="menu_button">
        <IconButton onClick={() => setmenuVisible(!menuVisible)}>
          <MenuIcon fontSize="large" />
        </IconButton>
      </div>

      <div id="sidebar-menu" className="sidebar-menu">
        <ul>
          <li>
            <Link
              to={"/"}
              className="menu-item"
              onClick={() => setmenuVisible(!menuVisible)}
            >
              HOME
            </Link>
          </li>
          <li>
            <Link
              to={"/user/profile/"}
              className="menu-item"
              onClick={() => setmenuVisible(!menuVisible)}
            >
              PROFILE
            </Link>
          </li>
          <li>
            <Link
              to={"/user/bookinglist/"}
              className="menu-item"
              onClick={() => setmenuVisible(!menuVisible)}
            >
              MY BOOKINGS
            </Link>
          </li>
          <li>
            <Link
              to={"/user/booking/create/"}
              className="menu-item"
              onClick={() => setmenuVisible(!menuVisible)}
            >
              NEW BOOKINGS
            </Link>
          </li>
          <li>
            <Button
              className="btn btn-warning btn-lg logout-button"
              onClick={() => {
                props.logout();
              }}
            >
              <ExitToAppIcon /> logout
            </Button>
          </li>
        </ul>
      </div>
    </div>
  );
}

// import React, { Component } from "react";
// import {
//   BrowserRouter as Router,
//   Switch,
//   Route,
//   Link,
//   Redirect,
// } from "react-router-dom";
// import "./style.css";
// import ExitToAppIcon from "@material-ui/icons/ExitToApp";
// import { Button } from "react-bootstrap";

// export default class Navigation extends Component {
//   constructor(props) {
//     super(props);
//   }
//   render() {
//     return (
//       <div className="nav  ">
//         <ul>
//           <li>
//             <Link to={"/"} className="text-white">
//               HOME
//             </Link>
//           </li>
//           <li>
//             <Link to={"/user/profile/"} className="text-white">
//               PROFILE
//             </Link>
//           </li>
//           <li>
//             <Link to={"/user/bookinglist/"} className="text-white">
//               MY BOOKINGS
//             </Link>
//           </li>
//           <li>
//             <Link to={"/user/booking/create/"} className="text-white">
//               NEW BOOKINGS
//             </Link>
//           </li>
//           <li>
//             <Button
//               className="btn btn-info btn-lg"
//               onClick={() => {
//                 this.props.logout();
//               }}
//             >
//               <ExitToAppIcon /> logout
//             </Button>
//           </li>
//         </ul>
//       </div>
//     );
//   }
// }
