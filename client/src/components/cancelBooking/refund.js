import React, { Component } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect,
} from "react-router-dom";

export const Item = () => {
  let history = useHistory();
  return (
    <>
      <button onClick={() => history.goBack()} className="btn btn-warning">
        Back
      </button>
    </>
  );
};

export default class Refund extends Component {
  constructor(props) {
    super(props);

    this.state = {
      refund: 0,
      msg: "",
    };
  }

  componentDidMount() {
    var url =
      "http://localhost:5000/booking/user/bookinginfo/" +
      this.props.match.params.bookingid;
    axios
      .get(url)
      .then((res) => {
        this.setState({
          refund: res.data.refund,
          msg: res.data.msg,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  showRefund() {
    return (
      <div>
        <h1>The refund is {this.state.refund}</h1>
      </div>
    );
  }

  render() {
    return (
      <div className="card container">
        <div className="card-header h1">Refund</div>
        <div className="card-body">
          {this.showRefund()}
          <Link to={"/home/" + this.props.match.params.id}>back to Home</Link>
        </div>
      </div>
    );
  }
}
