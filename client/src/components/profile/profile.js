import react, { useState, useEffect } from "react";
import axios from "axios";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect,
} from "react-router-dom";
import "./style.css";
import profilepic from "./img/profile.jpg";

import React from "react";
import { IconButton } from "@material-ui/core";
import EditIcon from "@material-ui/icons/Edit";
export default function Profile(props) {
  const [user, setUser] = useState({});
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [gender, setGender] = useState("");

  useEffect(() => {
    var url = "https://hotel-reservation-system-1.herokuapp.com/user/info";
    axios.get(url, { headers: { token: props.token } }).then((res) => {
      setUser(res.data.userData);
    });
  }, []);
  return (
    <div className="profile container">
      <div className="main-title">My Profile</div>
      <div className="profile-card">
        <Link to={"/user/editprofile/"}>
          <IconButton>
            <EditIcon />
          </IconButton>
          Edit Profile
        </Link>
        <div className="profile-card-pic">
          <img src={profilepic} />
        </div>
        <div className="profile-card-info-item">
          Name:{" "}
          <span className="profile-card-info-item-value">{user.name}</span>
        </div>
        <div className="profile-card-info-item">
          Email:{" "}
          <span className="profile-card-info-item-value">{user.email}</span>
        </div>
        <div className="profile-card-info-item">
          Gender:{" "}
          <span className="profile-card-info-item-value">{user.gender}</span>
        </div>
      </div>
    </div>
  );
}
