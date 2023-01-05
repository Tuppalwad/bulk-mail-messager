import React, { useState } from "react";
import Navbar from "./navbar";
import { Link, Navigate, useNavigate } from "react-router-dom";
import swal from "sweetalert";
import readXlsxFile from "read-excel-file";

export default function Segments() {
  let navigate = useNavigate();
  const [segmentName, setSegmentName] = useState("");
  const [rows, setSegmentData] = useState([]);

  const [demo2, setDemo2] = useState([]);
  // const [formStatus, setFormStatus] = useState(false);

  // read excel sheet data
  const readExcel = (e) => {
    e.preventDefault();
    const file = e.target.files[0];
    readXlsxFile(file).then((rows) => {
      // `rows` is an array of rows
      // each row being an array of cells.
      console.log(rows);
      setSegmentData(rows);
    });
  };

  const saveSegment = (e) => {
    e.preventDefault();
    try {
      const user = JSON.parse(localStorage.getItem("user")).username;
      const packet = {
        user: user,
        segment: {
          segmentName: segmentName,
          segmentData: rows,
        },
      };
      console.log(packet);
      fetch("http://localhost:5000/contactList", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
        body: JSON.stringify(packet),
      })
        .then((res) => res.json())
        .then((data) => {
          swal(data.code, data.message, data.code.toLowerCase()).then(() => {
            setDemo2(
              localStorage.setItem(
                "segmentConfig",
                JSON.stringify(data.data.contactList)
              )
            );
            navigate("/dashboard/profile");
          });
        });
    } catch (err) {
      swal("Error", "Please login again (Front end error)", "error");
    }
  };

  return (
    <div>
      <Navbar />
      <div className="container mt-5 mb-3">
        <div className="card rounded border border-dark">
          <div className="card-header border-bottom border-dark">
            <h4 className="card-title">Configure your Contact Segments</h4>
          </div>
          <div className="card-body">
            <form onSubmit={saveSegment}>
              <div className="form-group row mb-3">
                <label className="col-sm-2 col-form-label">Segment Name</label>
                <div className="col-sm-10">
                  <input
                    required
                    type="text"
                    className="form-control"
                    placeholder="Enter segment contact list name"
                    onChange={(e) => {
                      setSegmentName(e.target.value);
                    }}
                  />
                </div>
              </div>
              <div className="form-group row mb-3">
                <label className="col-sm-2 col-form-label">
                  Select Excel file containing emails
                </label>
                <div className="col-sm-10">
                  <input
                    required
                    type="file"
                    className="form-control"
                    onChange={readExcel}
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
    </div>
  );
}
