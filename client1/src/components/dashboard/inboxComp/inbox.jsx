import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import Navbar from "../navbar";
export default function Inbox() {
  const usersdata = JSON.parse(localStorage.getItem("user"))["username"];
  function deleteMail(item, usersdata) {
    console.log("claiddd");
    // localStorage.removeItem(user)[item][usersdata];
    fetch("http://localhost:5000/deleteMail", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify(item, usersdata),
    }).then((res) => {
      res.json().then((data) => {
        localStorage.setItem(
          "usermails",
          JSON.stringify(data.mails[usersdata])
        );
      });
    });
  }
  useEffect(() => {
    deleteMail();
  }, []);
  return (
    <div>
      <Navbar />
      <div></div>
      <div className="m-5">
        <div className="row">
          <div className="col-md-2  mt-2">
            <ul className="list-group mt-3">
              <Link className="list-group-item" to="/dashboard">
                Compose Mail
              </Link>
              <Link className="list-group-item active" to="/dashboard/inbox">
                Inbox
              </Link>
            </ul>
          </div>
          <div className="col-md-10 mt-2 shadow-lg p-3 mb-5 rounded">
            <div className="card rounded border">
              <div className="card-header border-bottom border-dark">
                <h4 className="card-title my-2 mx-4">Inbox</h4>

                <div className="card-body">
                  <div className="table-responsive">
                    <table className="table table-hover">
                      <thead>
                        <tr>
                          <th>Username</th>
                          <th>From</th>
                          <th>Subject</th>
                          <th>Message</th>
                          <th>Time</th>
                          <th>Delete</th>
                        </tr>
                      </thead>
                      <tbody>
                        {Object.keys(
                          JSON.parse(localStorage.getItem("usermails"))["mails"]
                        ).map((item) => {
                          return (
                            <tr>
                              <td>{usersdata}</td>
                              <td>
                                {
                                  JSON.parse(localStorage.getItem("usermails"))[
                                    "mails"
                                  ][item]["from"]
                                }
                              </td>
                              <td>
                                {
                                  JSON.parse(localStorage.getItem("usermails"))[
                                    "mails"
                                  ][item]["subject"]
                                }
                              </td>
                              <td>
                                {
                                  JSON.parse(localStorage.getItem("usermails"))[
                                    "mails"
                                  ][item]["message"]
                                }
                              </td>
                              <td>
                                {
                                  JSON.parse(localStorage.getItem("usermails"))[
                                    "mails"
                                  ][item]["time"]
                                }
                              </td>
                              <td>
                                <button
                                  className="btn btn-danger"
                                  onClick={deleteMail(item, usersdata)}
                                >
                                  Delete
                                </button>
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
