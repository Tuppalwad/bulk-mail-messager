import React from "react";
import Navbar from "./navbar";
import Login from "./login";
import Register from "./register";
export default function index() {
  return (
    <div>
      <Navbar />
      <div className=" m-5">
        <div className="d-flex justify-content-center">
          <ul className="nav nav-pills mb-3" id="pills-tab" role="tablist">
            <li className="nav-item" role="presentation">
              <button
                className="nav-link active"
                id="pills-home-tab"
                data-bs-toggle="pill"
                data-bs-target="#pills-home"
                type="button"
                role="tab"
                aria-controls="pills-home"
                aria-selected="true"
              >
                Login
              </button>
            </li>
            <li className="nav-item" role="presentation">
              <button
                className="nav-link"
                id="pills-profile-tab"
                data-bs-toggle="pill"
                data-bs-target="#pills-profile"
                type="button"
                role="tab"
                aria-controls="pills-profile"
                aria-selected="false"
              >
                Register
              </button>
            </li>
          </ul>
        </div>
        <div className="d-flex justify-content-center">
          <div className="tab-content" id="pills-tabContent">
            <div
              className="tab-pane fade show active p-2"
              id="pills-home"
              role="tabpanel"
              aria-labelledby="pills-home-tab"
              tabindex="0"
            >
              <Login />
            </div>
            <div
              className="tab-pane fade p-2"
              id="pills-profile"
              role="tabpanel"
              aria-labelledby="pills-profile-tab"
              tabindex="0"
            >
              <Register />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
