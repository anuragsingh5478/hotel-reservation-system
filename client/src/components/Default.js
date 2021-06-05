import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect,
} from "react-router-dom";

export default function Default() {
  return (
    <div>
      <h1>It's working</h1>
      <Link to="/login">Click to login</Link>
    </div>
  );
}
