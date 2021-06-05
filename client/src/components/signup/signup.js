import React from "react";
import axios from "axios";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect,
} from "react-router-dom";
import "./style.css";

export default class SignUp extends React.Component {
  constructor(props) {
    super(props);
    this.state = { email: "", password: "", message: "", id: "" };

    this.handleChangedEmail = this.handleChangedEmail.bind(this);
    this.handleChangedPassword = this.handleChangedPassword.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChangedEmail(event) {
    this.setState({ email: event.target.value });
  }
  handleChangedPassword(event) {
    this.setState({ password: event.target.value });
  }

  handleSubmit(event) {
    event.preventDefault();
    const user = {
      email: this.state.email,
      password: this.state.password,
    };
    axios
      .post("http://localhost:5000/userauth/signup", user)
      .then((res) => {
        if (res.data.msg == "success") {
          this.setState({ message: res.data.msg, id: res.data.user_id });
        } else {
          this.setState({ message: res.data.msg });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }

  render() {
    return (
      <div className="signup-container">
        <div className="form-container">
          <form onSubmit={this.handleSubmit}>
            <div className="form-group">
              <label>
                Email:
                <br />
                <input
                  name="email"
                  type="text"
                  value={this.state.email}
                  onChange={this.handleChangedEmail}
                />
              </label>
            </div>
            <div className="form-group">
              <label>
                Password:
                <br />
                <input
                  name="password"
                  type="text"
                  value={this.state.password}
                  onChange={this.handleChangedPassword}
                />
              </label>
            </div>
            <div className="form-group">
              <input type="submit" value="SignUp" className="btn btn-primary" />
            </div>
            {this.state.message}
            <div>
              Already have an Account, <Link to="/login">Login</Link>
            </div>
            {this.state.message == "success" ? (
              <Redirect to={"/setprofile/" + this.state.id}></Redirect>
            ) : (
              <Redirect to="/signup"></Redirect>
            )}
          </form>
        </div>
      </div>
    );
  }
}
