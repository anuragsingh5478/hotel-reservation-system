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
    this.handleChangedPhone = this.handleChangedPhone.bind(this);
    this.handleChangedGender = this.handleChangedGender.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChangedName(event) {
    this.setState({ name: event.target.value });
  }
  handleChangedPhone(event) {
    this.setState({ phone: event.target.value });
  }
  handleChangedGender(event) {
    this.setState({ gender: event.target.value });
  }

  handleSubmit(event) {
    event.preventDefault();
    const user = {
      _id: this.props.match.params.id,
      name: this.state.name,
      phone: this.state.phone,
      gender: this.state.gender,
    };
    var url = "http://localhost:5000/user/edit/" + this.props.match.params.id;
    axios

      .put(url, user)
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

  componentDidMount() {
    var url = "http://localhost:5000/user/" + this.props.match.params.id;
    console.log(url);
    axios.get(url).then((res) => {
      console.log(res.data);
      this.setState({
        name: res.data.name,
        phone: res.data.phone,
        gender: res.data.gender,
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
                Phone:
                <br />
                <input
                  name="phone"
                  type="text"
                  value={this.state.phone}
                  onChange={this.handleChangedPhone}
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
            {this.state.message == "User updated!" ? (
              <Redirect
                to={"/home/profile/" + this.props.match.params.id}
              ></Redirect>
            ) : (
              <Redirect
                to={"/home/editprofile/" + this.props.match.params.id}
              ></Redirect>
            )}
          </form>
        </div>
      </div>
    );
  }
}
