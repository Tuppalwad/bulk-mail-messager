import React, { useEffect, useState } from "react";
import swal from "sweetalert";
import { Link } from "react-router-dom";
import Navbar from "./navbar";
export default function Profile() {
  const userProfile = JSON.parse(localStorage.getItem("user"));
  const [demo, setDemo] = useState([]);

  // delete contact list function on btn call
  const deleteContact = async (contactList) => {
    try {
      const btnid = contactList;
      const user = JSON.parse(localStorage.getItem("user"));

      fetch("http://localhost:5000/deleteContact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
        body: JSON.stringify({ user: user.username, contact: btnid }),
      })
        .then((res) => res.json())
        .then((data) => {
          // console.log(data);
          swal(data.code, data.message, data.code.toLowerCase()).then(() => {
            setDemo(
              localStorage.setItem(
                "segmentConfig",
                JSON.stringify(data.data.contactList)
              )
            );
            console.log(demo);
          });
        });
    } catch (err) {
      swal("Error", "Something went wrong " + { err }, "error");
    }
  };

  // this is return html contant function inside try catch inorder to return html contant based on user data
  try {
    const smtpData = JSON.parse(localStorage.getItem("smtpConfig"));
    const contactLists = Object.keys(
      JSON.parse(localStorage.getItem("segmentConfig"))
    );
    const openInNewTab = (url) => {
      window.open(url, "_blank", "noreferrer");
    };
    return (
      <div>
        <Navbar />
        <div className="container m-5">
          <div className="row">
            <div className="col-md-4">
              <div className="card border border-primary">
                <div className="card-body">
                  <div className="d-flex flex-column align-items-center text-center">
                    <img
                      src="https://bootdey.com/img/Content/avatar/avatar7.png"
                      alt="Admin_Image"
                      className="rounded-circle"
                      width="150"
                    />
                    <div className="mt-3">
                      <h4>{userProfile.name}</h4>
                    </div>
                  </div>
                </div>
              </div>
              <div className="card mt-3 border border-primary">
                <ul className="list-group list-group-flush">
                  <li className="list-group-item d-flex justify-content-between align-items-center flex-wrap">
                    <h6 className="mb-0">
                      <i className="fas fa-calendar"></i> Name
                    </h6>
                    <span className="text-secondary">{userProfile.name}</span>
                  </li>
                  <li className="list-group-item d-flex justify-content-between align-items-center flex-wrap">
                    <h6 className="mb-0">
                      <i className="fas fa-globe"></i> Username
                    </h6>
                    <span className="text-secondary">
                      {userProfile.username}
                    </span>
                  </li>
                  <li className="list-group-item d-flex justify-content-between align-items-center flex-wrap">
                    <h6 className="mb-0">
                      <i className="fas fa-envelope"></i> Email
                    </h6>
                    <span className="text-secondary">{userProfile.email}</span>
                  </li>
                  <li className="list-group-item d-flex justify-content-between align-items-center flex-wrap">
                    <h6 className="mb-0">
                      <i className="fas fa-password"></i> Password
                    </h6>
                    <span className="text-secondary">
                      {userProfile.password}
                    </span>
                  </li>
                </ul>
              </div>
              <Link
                to="/updateProfile"
                className="btn my-2 btn-primary btn-block"
              >
                Update Profile
              </Link>
              <button
                className="btn mx-4 btn-primary btn-block"
                onClick={() =>
                  openInNewTab("https://www.youtube.com/watch?v=qk8nJmIRbxk")
                }
              >
                Help to SMTP Configuration
              </button>
            </div>
            <div className="col-md-8">
              <div className="card mb-3 border border-primary">
                <div class="card-header bg-primary text-center text-white">
                  <h4>Your SMTP Configuration</h4>
                </div>
                <div className="card-body">
                  <div className="row">
                    <div className="col-sm-3">
                      <h6 className="mb-0">HOST address</h6>
                    </div>
                    <div className="col-sm-9 text-secondary">
                      {smtpData.host}
                    </div>
                  </div>
                  <hr />
                  <div className="row">
                    <div className="col-sm-3">
                      <h6 className="mb-0">PORT address</h6>
                    </div>
                    <div className="col-sm-9 text-secondary">
                      {smtpData.port}
                    </div>
                  </div>
                  <hr />
                  <div className="row">
                    <div className="col-sm-3">
                      <h6 className="mb-0">User Email</h6>
                    </div>
                    <div className="col-sm-9 text-secondary">
                      {smtpData.email}
                    </div>
                  </div>
                  <hr />
                  <div className="row">
                    <div className="col-sm-3">
                      <h6 className="mb-0">Email password</h6>
                    </div>
                    <div className="col-sm-9 text-secondary">
                      {smtpData.password}
                    </div>
                  </div>
                </div>
              </div>
              <div className="card mb-3 border border-primary">
                <div class="card-header bg-primary text-center text-white">
                  <div className="row">
                    <div className="col">
                      <h4>Your Contct Lists</h4>
                    </div>
                    <div className="col text-center">
                      <Link
                        to="/dashboard/segments"
                        className="btn btn-success"
                      >
                        Create New List
                      </Link>
                    </div>
                  </div>
                </div>
                <div className="card-body">
                  {contactLists.map((contactList) => {
                    return (
                      <>
                        <div className="row">
                          <div className="col font-weight-bold text-center">
                            <h5>{contactList}</h5>
                          </div>
                          <div className="col text-center">
                            <button
                              id={contactList}
                              className="btn btn-danger"
                              value={contactList}
                              onClick={() => {
                                setDemo((prev) => prev + 1);
                                swal({
                                  title: "Are you sure?",
                                  text: "Once deleted , you will not be able to recover this!",
                                  icon: "warning",
                                  buttons: true,
                                  dangerMode: true,
                                }).then((willDelete) => {
                                  if (willDelete) {
                                    // call function that delets data
                                    deleteContact(contactList);
                                  }
                                });
                              }}
                            >
                              Delete
                            </button>
                          </div>
                        </div>
                        <hr />
                      </>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  } catch {
    swal(
      "Error",
      "Your profile is not correctly set\nPlease configure SMTP server and Create contact lists to start",
      "error"
    );
    if (localStorage.getItem("smtpConfig") == null) {
      return (
        <>
          <Navbar />
          <div className="container mt-5">
            <div className="text-center">
              <Link to="/dashboard/smtpconfig" className="btn btn-warning w-50">
                Your profile is incomplete <br />
                Please configure SMTP server
                <br /> *Click Here*
              </Link>
            </div>
          </div>
          <div className="d-flex justify-content-center m-5">
            <div className="card p-4 rounded border-primary">
              <div className="card-body">
                <div className="text-center">
                  <img
                    src="https://bootdey.com/img/Content/avatar/avatar7.png"
                    alt="Admin_Image"
                    className="rounded-circle"
                    width="150"
                  />
                </div>
                <h3 className="card-title text-center">{userProfile.name}</h3>
                <p className="card-text text-center">
                  This is your profile page. You can see your profile details
                  here.
                </p>
                <div className="container m-4">
                  <table className="table">
                    <tbody>
                      <tr>
                        <th>Name</th>
                        <td>{userProfile.name}</td>
                      </tr>
                      <tr>
                        <th>Username</th>
                        <td>{userProfile.username}</td>
                      </tr>
                      <tr>
                        <th>Email</th>
                        <td>{userProfile.email}</td>
                      </tr>
                      <tr>
                        <th>Password</th>
                        <td>{userProfile.password}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </>
      );
    } else if (localStorage.getItem("contactList") == null) {
      return (
        <>
          <Navbar />

          <div className="container mt-5">
            <div className="text-center">
              <Link to="/dashboard/segments" className="btn btn-warning w-50">
                Your profile is incomplete <br /> Please create a contact
                segment <br /> *Click Here*
              </Link>
            </div>
          </div>

          <div className="d-flex justify-content-center m-5">
            <div className="card p-4 rounded border-primary">
              <div className="card-body">
                <div className="text-center">
                  <img
                    src="https://bootdey.com/img/Content/avatar/avatar7.png"
                    alt="Admin_Image"
                    className="rounded-circle"
                    width="150"
                  />
                </div>
                <h3 className="card-title text-center">{userProfile.name}</h3>
                <p className="card-text text-center">
                  This is your profile page. You can see your profile details
                  here.
                </p>
                <div className="container m-4">
                  <table className="table">
                    <tbody>
                      <tr>
                        <th>Name</th>
                        <td>{userProfile.name}</td>
                      </tr>
                      <tr>
                        <th>Username</th>
                        <td>{userProfile.username}</td>
                      </tr>
                      <tr>
                        <th>Email</th>
                        <td>{userProfile.email}</td>
                      </tr>
                      <tr>
                        <th>Password</th>
                        <td>{userProfile.password}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </>
      );
    }
  }
}
