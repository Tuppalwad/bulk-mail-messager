import React, { useEffect, useState } from "react";
// import checkData from "./helper/checkData"
import swal from "sweetalert";
import { Link } from "react-router-dom";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import Navbar from "./navbar";
export default function Compose() {
  const [to, setmail] = useState("");
  const [message, setMessage] = useState("");
  const [subject, setSubject] = useState("");
  const [clist, setClist] = useState("");
  const [btn, setBtn] = useState("");
  const [inbox, setinbox] = useState([]);
  const user = JSON.parse(localStorage.getItem("user")).username;
  const list_of_mail = JSON.parse(localStorage.getItem("segmentConfig"));

  const smtpconfigdata = JSON.parse(localStorage.getItem("smtpConfig"));
  let txt;
  function clickHandler1() {
    txt = document.getElementById("btn1").innerText;
    setBtn(txt);
  }

  function clickHandler3() {
    txt = document.getElementById("btn3").innerText;
    setBtn(txt);
  }
  function clickHandler2() {
    txt = document.getElementById("btn2").innerText;
    setBtn(txt);
  }
  const sendata = (e) => {
    e.preventDefault();

    const data = {
      to,
      subject,
      message,
      list_of_mail,
      smtpconfigdata,
      clist,
      btn,
      user,
    };
    console.log(to, subject, message, clist, btn, user);

    fetch("http://localhost:5000/composemail", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((data) => {
        setinbox(data);
        swal(data.code, data.message, data.code.toLowerCase()).then(() => {
          window.location.href = "/dashboard";
        });
      });
  };

  useEffect(() => {
    fetch("http://localhost:5000/getmail").then((res) => {
      res.json().then((data) => {
        localStorage.setItem("usermails", JSON.stringify(data.mails[user]));
      });
    });
  }, []);

  try {
    return (
      <>
        <Navbar />
        <div className="m-5">
          <div className="row">
            <div className="col-md-2  mt-2">
              <ul className="list-group mt-3">
                <Link className="list-group-item active" to="/dashboard">
                  Compose Mail
                </Link>
                <Link className="list-group-item " to="/dashboard/inbox">
                  Sends Mails
                </Link>
              </ul>
            </div>
            <div className="col-md-10 mt-2 shadow-lg p-3 mb-5 rounded">
              <div className="card rounded border">
                <div className="card-header">
                  <h3>Compose a mail</h3>
                </div>
                <div className="card-body">
                  <form onSubmit={sendata}>
                    <div className="form-group mb-3">
                      <label className="form-label">Email address</label>
                      <input
                        type="email"
                        className="form-control"
                        placeholder="Enter the mail"
                        onChange={(e) => {
                          setmail(e.target.value);
                        }}
                      />
                      <label className="form-label my-2 ">Subject</label>
                      <input
                        type="text"
                        className="form-control "
                        placeholder="Enter mail subject"
                        onChange={(e) => {
                          setSubject(e.target.value);
                        }}
                      />
                    </div>
                    <div className="form-group mb-3">
                      <label className="form-label">
                        Type message in editor
                      </label>
                      <CKEditor
                        required
                        editor={ClassicEditor}
                        onReady={(editor) => {
                          console.log("You are ready to use the editor");
                        }}
                        onChange={(event, editor) => {
                          const data = editor.getData();
                          setMessage(data);
                        }}
                      />
                    </div>

                    <div className="form-group mb-3">
                      <label className="form-label">
                        Select target segment
                      </label>
                      <select
                        className="form-control"
                        onChange={(e) => {
                          setClist(e.target.value);
                        }}
                      >
                        <option value="" selected>
                          Choose list item
                        </option>
                        {Object.keys(
                          JSON.parse(localStorage.getItem("segmentConfig"))
                        ).map((item) => {
                          return (
                            <option value={item} key={item}>
                              {item}
                            </option>
                          );
                        })}
                      </select>
                    </div>

                    <div className="text-center">
                      <button
                        type="submit"
                        className="btn btn-success m-3"
                        id="btn1"
                        value="cc"
                        onClick={clickHandler1}
                      >
                        Send Mail
                      </button>

                      <button
                        type="submit"
                        className="btn btn-info m-3"
                        id="btn2"
                        value="cc"
                        onClick={clickHandler2}
                      >
                        Send Mail as CC
                      </button>
                      <button
                        type="submit"
                        id="btn3"
                        className="btn btn-primary m-3"
                        value="bcc"
                        onClick={clickHandler3}
                      >
                        Send Mail as BCC
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  } catch (err) {
    swal("Error", "Configure segments first to get started with", "error");
  }
}
