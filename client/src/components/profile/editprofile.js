import React from "react";
import axios from "axios";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect,
} from "react-router-dom";

export default class EditProfile extends React.Component {
  constructor(props) {
    super(props);
    this.state = { name: "", phone: "", gender: "", message: "", id: "" };

    this.handleChangedName = this.handleChangedName.bind(this);
    this.handleChangedGender = this.handleChangedGender.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChangedName(event) {
    this.setState({ name: event.target.value });
  }
  handleChangedGender(event) {
    this.setState({ gender: event.target.value });
  }

  handleSubmit(event) {
    event.preventDefault();
    const user = {
      name: this.state.name,
      gender: this.state.gender,
    };
    var url = "https://hotel-reservation-system-1.herokuapp.com/user/edit/";
    axios

      .put(url, user, { headers: { token: this.props.token } })
      .then((res) => {
        if (res.data.msg == "success") {
          this.setState({ message: res.data.msg });
        } else {
          this.setState({ message: res.data.msg });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }

  componentDidMount() {
    var url = "https://hotel-reservation-system-1.herokuapp.com/user/info";
    axios.get(url, { headers: { token: this.props.token } }).then((res) => {
      this.setState({
        name: res.data.userData.name,
        email: res.data.userData.email,
        gender: res.data.userData.gender,
      });
    });
  }

  render() {
    return (
      <div className="profile-container ">
        <div className="card-header h1">Edit Profile</div>
        <div className="card-body">
          <form onSubmit={this.handleSubmit} className="profile-card">
            <div className="form-group">
              <label>
                Name:
                <br />
                <input
                  name="name"
                  type="text"
                  value={this.state.name}
                  onChange={this.handleChangedName}
                />
              </label>
            </div>
            <div className="form-group">
              <label>
                Email:
                <br />
                <input
                  name="email"
                  type="text"
                  value={this.state.email}
                  disabled
                />
              </label>
            </div>
            <div className="form-group">
              <label>
                Gender:
                <br />
                <input
                  name="gender"
                  type="text"
                  value={this.state.gender}
                  onChange={this.handleChangedGender}
                />
              </label>
            </div>
            <div className="form-group">
              <input
                type="submit"
                value="Save Details"
                className="btn btn-primary"
              />
            </div>
            {this.state.message}
            {this.state.message == "success" && (
              <Redirect to={"/user/profile/"}></Redirect>
            )}
          </form>
        </div>
      </div>
    );
  }
}
