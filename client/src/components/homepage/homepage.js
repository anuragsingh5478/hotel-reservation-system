import react, { useState, useEffect } from "react";
import axios from "axios";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect,
} from "react-router-dom";
import hotel1 from "./img/hotel1.jpg";
import hotel2 from "./img/hotel2.jpg";
import hotel3 from "./img/hotel3.jpg";
import "./style.css";

import React from "react";

export default function Homepage(props) {
  const [name, setName] = useState("");
  useEffect(() => {
    var url = "https://hotel-reservation-system-1.herokuapp.com/user/info";
    axios.get(url, { headers: { token: props.token } }).then((res) => {
      setName(res.data.userData.name);
    });
  }, []);
  return (
    <div className="homepage container">
      <div className="homepage-content">
        <div className="welcome-back-text">
          Welcome back, <span className="name">{name}.</span>
        </div>
        <div className="tagline-text">The best place to be.</div>
      </div>

      <div className="homepage-gallery ">
        <div className="row">
          <div className="col-sm-4">
            <img src={hotel1} alt="pic" />
            <div className="gallery-img-text">
              The finest hotel at the best price.
            </div>
          </div>
          <div className="col-sm-4">
            <img src={hotel2} alt="pic" />
            <div className="gallery-img-text">Best in Class facilities.</div>
          </div>
          <div className="col-sm-4">
            <img src={hotel3} alt="pic" />
            <div className="gallery-img-text">Hotels for all desires.</div>
          </div>
        </div>
      </div>

      <div className="homepage-info">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua. Aliquam faucibus
        purus in massa tempor. Purus semper eget duis at. Amet mattis vulputate
        enim nulla aliquet porttitor lacus luctus. Nulla aliquet porttitor lacus
        luctus accumsan tortor posuere. Elit eget gravida cum sociis. Augue
        lacus viverra vitae congue eu. Non diam phasellus vestibulum lorem. Sed
        nisi lacus sed viverra tellus in hac. Lacus vestibulum sed arcu non odio
        euismod lacinia at quis. Iaculis nunc sed augue lacus. Mollis nunc sed
        id semper risus in hendrerit gravida. Quis ipsum suspendisse ultrices
        gravida dictum fusce ut placerat orci. Tincidunt dui ut ornare lectus
        sit amet.
      </div>

      <div className="homepage-info">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua. Aliquam faucibus
        purus in massa tempor. Purus semper eget duis at. Amet mattis vulputate
        enim nulla aliquet porttitor lacus luctus. Nulla aliquet porttitor lacus
        luctus accumsan tortor posuere. Elit eget gravida cum sociis. Augue
        lacus viverra vitae congue eu. Non diam phasellus vestibulum lorem. Sed
        nisi lacus sed viverra tellus in hac. Lacus vestibulum sed arcu non odio
        euismod lacinia at quis. Iaculis nunc sed augue lacus. Mollis nunc sed
        id semper risus in hendrerit gravida. Quis ipsum suspendisse ultrices
        gravida dictum fusce ut placerat orci. Tincidunt dui ut ornare lectus
        sit amet.
      </div>

      <div className="footer">
        <div className="h3">Thankyou For Visiting The Website.</div>
        <div>
          Website Devloped By: Anurag Singh(
          <a href="https://github.com/anuragsingh5478" target="_blank">
            github
          </a>
          )
        </div>
      </div>
    </div>
  );
}
