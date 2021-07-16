import React from "react";
import axios from "axios";
import { Component } from "react";
import { Link } from "react-router-dom";
import "./bookingList.css";

export default function bookingListCard(props) {
  return (
    <div className="booking-info-card row">
      <div className="col-md-8">
        <div className="booking-info">
          Booking Date:{" "}
          <span className="booking-info-value">{props.booking_date}</span>
        </div>
        <div className="booking-info">
          CheckIn Date:{" "}
          <span className="booking-info-value">{props.checkin_date}</span>
        </div>
        <div className="booking-info">
          CheckOut Date:{" "}
          <span className="booking-info-value">{props.checkout_date}</span>
        </div>
        <div className="booking-info">
          Number of Rooms:{" "}
          <span className="booking-info-value">{props.number_of_rooms}</span>
        </div>
        <div className="booking-info">
          Cost:{" "}
          <span className="booking-info-value">
            {/* Rupee Symbol */}
            <span>&#8377;</span>
            {Math.round(props.cost)}
          </span>
        </div>
      </div>
      <div className="col-md-4">
        <div className="booking-info-action-buttons">
          <button className="btn btn-warning w-100">
            <Link to={"/user/booking/cancel/" + props.booking_id}>
              Full cancellation
            </Link>
          </button>
          <br />
          
            <Link to={"/user/booking/edit/" + props.booking_id}>
                <button className="btn btn-warning w-100">
                  Partial cancellation
                </button>
            </Link>
          
        </div>
      </div>
    </div>
  );
}
