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
        class="img-rounded"
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
    console.log("constructor");
    console.log(props);
  }
  componentDidMount() {
    var url = "http://localhost:5000/user/" + this.props.match.params.id;
    //console.log(url);
    axios.get(url).then((res) => {
      this.setState({ user: res.data });
      //console.log(res.data);
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
    console.log("render");
    console.log(this.props.match.params.id);
    return (
      <div className="card text-white profile-container">
        <div className="card-header ">
          <div className="font-weight-bold h1 text-dark">My Profile</div>
          <Link
            to={"/home/editprofile/" + this.props.match.params.id}
            className="text-info"
          >
            Edit Profile
          </Link>
        </div>

        <div className="card-body">{this.showUser()}</div>
      </div>
    );
  }
}
