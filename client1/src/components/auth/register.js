import React, { useState } from "react";
import register from "./functions/registerService";
import swal from "sweetalert";
export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordc, setPasswordc] = useState("");
  const [name, setName] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const artical = { email, password, passwordc, name };
    if (password !== passwordc) {
      alert("Password not match");
    } else {
      register(artical).then((data) => {
        if (data.code === "Success") {
          swal(data.code, data.message, data.code.toLowerCase()).then(() => {
            window.location.href = "/";
          });
        } else {
          swal(data.code, data.message, data.code.toLowerCase());
        }
      });
    }
  };
  const passShow = () => {
    const pass = document.getElementById("passwordr");
    const pass2 = document.getElementById("passwordcr");
    if (pass.type === "password") {
      pass.type = "text";
      pass2.type = "text";
      // change the icon
      document.querySelector(".passeye").classList.remove("fa-eye");
      document.querySelector(".passeye").classList.add("fa-eye-slash");
    } else {
      pass.type = "password";
      pass2.type = "password";
      document.querySelector(".passeye").classList.remove("fa-eye-slash");
      document.querySelector(".passeye").classList.add("fa-eye");
    }
  };
  return (
    <div className="shadow-lg p-3 mb-5 bg-body rounded">
      <div className="card">
        <div className="card-body">
          <h3 className="card-title text-center">Login here</h3>
          <form className="m-4" onSubmit={handleSubmit}>
            <div className="form-group mb-3">
              <label for="">Email address</label>
              <input
                required
                type="email"
                className="form-control"
                aria-describedby="emailHelp"
                placeholder="Enter email"
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
              />
            </div>
            <div className="form-group">
              <label for="">Enter Name</label>
              <input
                required
                type="text"
                className="form-control"
                placeholder="Enter Name"
                onChange={(e) => {
                  setName(e.target.value);
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
                  id="passwordr"
                  className="form-control"
                  onChange={(e) => {
                    setPassword(e.target.value);
                  }}
                />
                <span className="input-group-text">
                  <i
                    className="fa-solid fa-eye eye passeye"
                    onClick={passShow}
                  ></i>
                </span>
              </div>
            </div>

            <div className="form-group mb-3">
              <label for="">Confirm Password</label>
              <input
                required
                type="password"
                className="form-control"
                id="passwordcr"
                placeholder="Confirm Password"
                onChange={(e) => {
                  setPasswordc(e.target.value);
                }}
              />
            </div>

            <div className="text-center">
              <button type="submit" className="btn btn-primary w-100">
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
