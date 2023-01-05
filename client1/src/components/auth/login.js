import React, { useState } from "react";
import login from "./functions/loginService";
import { Link } from "react-router-dom";
import swal from "sweetalert";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const handleSubmit = (e) => {
    e.preventDefault();
    const artical = { email, password };
    login(artical).then((data) => {
      if (data.code === "Success") {
        const user = {
          username: data.data.username,
          email: data.data.email,
          password: data.data.password,
          name: data.data.name,
        };
        localStorage.setItem("user", JSON.stringify(user));
        localStorage.setItem("token", data.token);

        // check id smtpConfig is present or not in localStorage
        if (data.data.smtpConfig && data.data.contactList) {
          localStorage.setItem(
            "smtpConfig",
            JSON.stringify(data.data.smtpConfig)
          );
          localStorage.setItem(
            "segmentConfig",
            JSON.stringify(data.data.contactList)
          );
        } else {
          if (data.data.contactList == null) {
            if (data.data.smtpConfig == null) {
              window.location.href = "/dashboard/profile";
            } else {
              localStorage.setItem(
                "smtpConfig",
                JSON.stringify(data.data.smtpConfig)
              );
            }
          } else if (data.data.smtpConfig == null) {
            if (data.data.contactList == null) {
              window.location.href = "/dashboard/profile";
            } else {
              localStorage.setItem(
                "segmentConfig",
                JSON.stringify(data.data.contactList)
              );
            }
          }
        }
        fetch("http://localhost:5000/getmail").then((res) => {
          res.json().then((data) => {
            localStorage.setItem(
              "usermails",
              JSON.stringify(data.mails[user.username])
            );
          });
        });
        swal(data.code, data.message, data.code.toLowerCase()).then(() => {
          window.location.href = "/dashboard";
        });
      } else {
        swal(data.code, data.message, data.code.toLowerCase());
      }
    });
  };

  const passShow = () => {
    const pass = document.getElementById("password");
    if (pass.type === "password") {
      pass.type = "text";
      // change the icon
      document.querySelector(".eye").classList.remove("fa-eye");
      document.querySelector(".eye").classList.add("fa-eye-slash");
    } else {
      pass.type = "password";
      document.querySelector(".eye").classList.remove("fa-eye-slash");
      document.querySelector(".eye").classList.add("fa-eye");
    }
  };

  return (
    <div className="shadow-lg p-3 mb-5 bg-body rounded">
      <div class="card">
        <div class="card-body">
          <h3 class="card-title text-center">Login here</h3>
          <form className="m-4" onSubmit={handleSubmit}>
            <div class="form-group mb-3">
              <label for="">Email address</label>
              <input
                required
                type="email"
                class="form-control"
                aria-describedby="emailHelp"
                placeholder="Enter email"
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
              />
            </div>
            <div className="form-group mb-3">
              <label className="form-label">Password</label> <br />
              <div className="input-group">
                <input
                  required
                  placeholder="Password"
                  type="password"
                  id="password"
                  className="form-control"
                  onChange={(e) => {
                    setPassword(e.target.value);
                  }}
                />
                <span className="input-group-text">
                  <i className="fa-solid fa-eye eye" onClick={passShow}></i>
                </span>
              </div>
            </div>

            <div className="text-center">
              <button type="submit" class="btn btn-primary w-100">
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
