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
import bg from "./img/hotel1.jpg";

export default class Login extends React.Component {
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
      .post("http://localhost:5000/userauth/login", user)
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
      <div
        className="Login container"
        style={{ backgroundImage: `url(${bg})`, backgroundSize: "cover" }}
      >
        <div className="form-container">
          <form onSubmit={this.handleSubmit} className="bg-white form">
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
              <input type="submit" value="Login" className="btn btn-primary" />
            </div>
            {this.state.message}
            {this.state.message == "success" ? (
              <Redirect to={"/home/" + this.state.id}></Redirect>
            ) : (
              <Redirect to="/login"></Redirect>
            )}
            <p>
              Or, Don't have a account, <Link to="/signup">SignUp</Link>
            </p>
          </form>
        </div>
      </div>
    );
  }
}
