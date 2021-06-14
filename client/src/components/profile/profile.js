import react from "react";
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
function UserDetails(props) {
  var uname = props.name;
  var uphone = props.phone;
  var ugender = props.gender;
  return (
    <div className="bg-light text-dark text-center h4 pb-100 profile-card">
      <img
        src={profilepic}
        className="img-rounded"
        width="100px"
        height="100px"
      ></img>
      <div>
        Name:<span className="text-info">{uname}</span>
      </div>
      <div>
        Phone:<span className="text-info">{uphone}</span>
      </div>
      <div>
        Gender:<span className="text-info">{ugender}</span>
      </div>
    </div>
  );
}

export default class Profile extends react.Component {
  constructor(props) {
    super(props);
    this.state = { user: {} };
  }
  componentDidMount() {
    var url = "http://localhost:5000/user/info";
    //console.log(url);
    axios.get(url, { headers: { token: this.props.token } }).then((res) => {
      this.setState({ user: res.data.userData });
    });
  }
  showUser() {
    return (
      <div>
        <UserDetails
          name={this.state.user.name}
          phone={this.state.user.phone}
          gender={this.state.user.gender}
        />
      </div>
    );
  }
  render() {
    return (
      <div className="card text-white profile-container">
        <div className="card-header ">
          <div className="font-weight-bold h1 text-dark">My Profile</div>
          <Link to={"/user/editprofile/"} className="text-info">
            Edit Profile
          </Link>
        </div>

        <div className="card-body">{this.showUser()}</div>
      </div>
    );
  }
}
