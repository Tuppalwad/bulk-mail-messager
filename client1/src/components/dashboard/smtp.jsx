import React, { useState } from "react";
import Navbar from "./navbar";
import swal from "sweetalert";

export default function Smtp() {
  const [serverAddress, setServerAddress] = useState("");
  const [port, setPort] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const saveSMTP = (e) => {
    e.preventDefault();
    try {
      const user = JSON.parse(localStorage.getItem("user")).username;
      const packet = {
        user: user,
        smtp: {
          serverAddress: serverAddress,
          port: port,
          email: email,
          password: password,
        },
      };
      console.log(packet);
      fetch("http://localhost:5000/smtpConfig", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
        body: JSON.stringify(packet),
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(".................");
          console.log(data);
          swal(data.code, data.message, data.code.toLowerCase()).then(() => {
            localStorage.setItem(
              "smtpConfig",
              JSON.stringify(data.data.smtpConfig)
            );
            window.location.href = "/dashboard/profile";
          });
        });
    } catch (err) {
      swal("Error", "Please login again *Front end error*", "error");
    }
  };

  return (
    <>
      <Navbar />
      <div className="container mt-5 mb-3">
        <div className="card rounded border border-dark">
          <div className="card-header border-bottom border-dark">
            <h4 className="card-title">Configure your SMTP server</h4>
          </div>
          <div className="card-body">
            <form onSubmit={saveSMTP}>
              <div className="form-group row mb-3">
                <label className="col-sm-2 col-form-label">
                  Enter SMTP Host
                </label>
                <div className="col-sm-10">
                  <input
                    required
                    type="text"
                    className="form-control"
                    placeholder="example : smtp.gmail.com"
                    onChange={(e) => {
                      setServerAddress(e.target.value);
                    }}
                  />
                </div>
              </div>
              <div className="form-group row mb-3">
                <label className="col-sm-2 col-form-label">
                  Enter SMTP Port
                </label>
                <div className="col-sm-10">
                  <input
                    required
                    type="number"
                    className="form-control"
                    placeholder="example : 587"
                    onChange={(e) => {
                      setPort(e.target.value);
                    }}
                  />
                </div>
              </div>
              <div className="form-group row mb-3">
                <label className="col-sm-2 col-form-label">
                  Enter SMTP Email address
                </label>
                <div className="col-sm-10">
                  <input
                    required
                    type="email"
                    className="form-control"
                    placeholder="example : admin@yourdomain.com"
                    onChange={(e) => {
                      setEmail(e.target.value);
                    }}
                  />
                </div>
              </div>
              <div className="form-group row mb-3">
                <label className="col-sm-2 col-form-label">
                  Enter SMTP Email password
                </label>
                <div className="col-sm-10">
                  <input
                    required
                    type="password"
                    className="form-control"
                    placeholder="example : ********"
                    onChange={(e) => {
                      setPassword(e.target.value);
                    }}
                  />
                </div>
              </div>
              <div className="text-center">
                <button type="submit" className="btn btn-lg btn-success">
                  Save or Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
