import { Link } from "react-router-dom";
import React from "react";
import "./header.css";
export default function Header() {
  return (
    <div>
      <div className="homepage-heading">
        <Link to="/">AS Hotels</Link>
      </div>
    </div>
  );
}
