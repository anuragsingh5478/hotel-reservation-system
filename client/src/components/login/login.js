import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./style.css";
import VisibilityIcon from "@material-ui/icons/Visibility";
import VisibilityOffIcon from "@material-ui/icons/VisibilityOff";

export default function Login({ setToken }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [passwordVisibility, setPasswordVisibility] = useState(false);

  const handleSubmission = (e) => {
    e.preventDefault();

    const user = {
      email: email,
      password: password,
    };

    axios
      .post("https://hotel-reservation-system-1.herokuapp.com/auth/login", user)
      .then((res) => {
        const msg = res.data.msg;
        if (msg === "success") {
          setErrorMsg(msg);
          setToken(res.data.token);
        } else setErrorMsg(msg);
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="login">
      <div className="login-card">
        <p className="login-card-header">Login</p>
        <form onSubmit={handleSubmission}>
          <div>
            <input
              type="text"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="email id"
            />
          </div>
          <div>
            <input
              type={passwordVisibility ? "text" : "password"}
              name="email"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="password"
            />
            <span
              className="eye"
              onClick={() => setPasswordVisibility(!passwordVisibility)}
            >
              {passwordVisibility ? <VisibilityOffIcon /> : <VisibilityIcon />}
            </span>
          </div>
          <div className="error-msg">{errorMsg}</div>
          <div>
            <input type="submit" value="Login" className="submit-button" />
          </div>
        </form>
        <p className="login-register">
          Don't have an account, then <Link to="/signup">SignUp</Link>
        </p>
      </div>
    </div>
  );
}
