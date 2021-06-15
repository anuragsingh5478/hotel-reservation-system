import react from "react";
import axios from "axios";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect,
} from "react-router-dom";
import Carousel from "./carousal";
import "./style.css";

function UserDetails(props) {
  var uname = props.name;
  var uphone = props.phone;
  return (
    <div className="card-header">
      <h1>Welcome, {uname} !!!</h1>
    </div>
  );
}

export default class Homepage extends react.Component {
  constructor(props) {
    super(props);
    this.state = { user: {} };
  }
  componentDidMount() {
    console.log(this.props.token);
    var url = "https://hotel-reservation-system-1.herokuapp.com/user/info";
    //console.log(url);
    axios.get(url, { headers: { token: this.props.token } }).then((res) => {
      this.setState({ user: res.data.userData });
      console.log(res.data);
    });
  }
  showUser() {
    return (
      <div>
        <UserDetails name={this.state.user.name} />
      </div>
    );
  }
  render() {
    // console.log(this.props.match.params.id);
    return (
      <div className="bg-light text-secondary container card ">
        {this.showUser()}
        <div className="card-body">
          <Carousel />
        </div>
      </div>
    );
  }
}
