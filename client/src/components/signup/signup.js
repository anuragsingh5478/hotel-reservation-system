import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./style.css";
import VisibilityIcon from "@material-ui/icons/Visibility";
import VisibilityOffIcon from "@material-ui/icons/VisibilityOff";

export default function SignUp({ setToken }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [gender, setGender] = useState("Male");
  const [passwordVisibility, setPasswordVisibility] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const handleSubmission = (e) => {
    e.preventDefault();

    const user = {
      name: name,
      email: email,
      password: password,
      gender: gender,
    };

    axios
      .post(
        "https://hotel-reservation-system-1.herokuapp.com/auth/signup",
        user
      )
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
    <div className="signup">
      <div className="signup-card">
        <p className="signup-card-header">Register</p>
        <form onSubmit={handleSubmission}>
          <div>
            <input
              type="text"
              name="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="name"
            />
          </div>
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
              name="password"
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
          <div>
            <select value={gender} onChange={(e) => setGender(e.target.value)}>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Others">Others</option>
            </select>
          </div>
          <div className="error-msg">{errorMsg}</div>
          <div>
            <input type="submit" value="Register" className="submit-button" />
          </div>
        </form>
        <p className="login-register">
          Already have an account, then <Link to="/login">Login</Link>
        </p>
      </div>
    </div>
  );
}
