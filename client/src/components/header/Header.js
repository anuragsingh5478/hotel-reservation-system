import { Link } from "react-router-dom";
import React from "react";
import "./header.css";
export default function Header() {
  return (
    <div>
      <div className="homepage-heading">
        <Link to="/" style={{ textDecoration: "none" }}>
          <span id="hotel-name">Awesome Hotels</span>
        </Link>
      </div>
    </div>
  );
}
