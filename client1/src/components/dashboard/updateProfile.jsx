import React, { useState } from "react";
import Navbar from "./navbar";
import axios from "axios";
import updateProfiledata from "./updatadata";
import swal from "sweetalert";
function UpdateProfile() {
  const user = JSON.parse(localStorage.getItem("user"))["username"];
  const pass = JSON.parse(localStorage.getItem("user"))["password"];
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [oldPassword, setOldPassword] = useState("");
  // how to write code for update profile
  const handleSubmit = (event) => {
    event.preventDefault();
    const artical = { name, email, password, user };
    if (pass !== oldPassword) {
      alert("Old Password not match");
    } else {
      updateProfiledata(artical).then((data) => {
        if (data.code === "Success") {
          localStorage.setItem("user", JSON.stringify(data.data));
          swal(data.code, data.message, data.code.toLowerCase()).then(() => {
            window.location.href = "/dashboard/profile";
          });
        } else {
          swal(data.code, data.message, data.code.toLowerCase());
        }
      });
    }
  };

  return (
    <>
      <Navbar></Navbar>
      {/* how to write code for update profile */}
      <div className="container mx-auto my-4">
        <div className="row">
          <div className="col-md-12">
            <div className="card">
              <div className="card-header">
                <h3>Update Profile</h3>
              </div>
              <div className="card-body">
                <form onSubmit={handleSubmit}>
                  <div className="form-group">
                    <label htmlFor="name">Name</label>
                    <input
                      type="text"
                      className="form-control"
                      id="name"
                      name="name"
                      onChange={(event) => setName(event.target.value)}
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input
                      type="email"
                      className="form-control"
                      id="email"
                      name="email"
                      onChange={(event) => setEmail(event.target.value)}
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="password">Old Password</label>
                    <input
                      type="password"
                      className="form-control"
                      id="password"
                      name="password"
                      onChange={(event) => setOldPassword(event.target.value)}
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input
                      type="password"
                      className="form-control"
                      id="password"
                      name="password"
                      onChange={(event) => setPassword(event.target.value)}
                    />
                  </div>
                  <button type="submit" className="btn btn-primary my-3">
                    Update Profile
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default UpdateProfile;
