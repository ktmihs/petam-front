import "../style.css";
import "../Components/button/Button.css";
import React, { Component } from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import SignButton from './sign/SignButton';

export default class TopBar extends Component {
  render = () => (
    <div>
      {/* nav태그의 mb-3은 content와 간격 띄우기 */}
      <nav class=" shadow-sm navbar navbar-expand navbar-light bg-primary topbar  static-top shadow">
        <div className=" col-12">
          <Link to="/main">
            <h3
              class="main-button"
            >
              <span className="text-pet h4">
                <b>pet</b>
              </span>
              <span className="text-white">
                <b>A</b>
              </span>
              <span className="text-2140C h4">
                <b>m</b>
              </span>

            </h3>
          </Link>

          <div className="   sign-component col-3">
             <Link to='/jlogin'>
            <button
              class="signin"
            >
             Login
          </button>
          </Link>
            <Link to='/jregister'>
            <button
              class="signup"
            >
              Sign Up
              </button>
              </Link>
          </div>
        </div>
      </nav>
    </div>
  );
}
