import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../Settings/Settings.css";

export default function Inventory() {
  const [showModal1, setShowModal1] = useState(false); // Stock Parameter modal
  const [showModal2, setShowModal2] = useState(false); // Details modal
  const [showModal3, setShowModal3] = useState(false); // Create modal

  const openModal1 = () => setShowModal1(true);
  const closeModal1 = () => setShowModal1(false);

  const openModal2 = () => setShowModal2(true);
  const closeModal2 = () => setShowModal2(false);

  const openModal3 = () => setShowModal3(true);
  const closeModal3 = () => setShowModal3(false);

  return (
    <>
      <div className="settings-content">
        <div className="heading">Inventory</div>
        <div className="row">
          <div className="col-3">
            <div className="simple-org-container">
              <div className="org-header">Inventory List</div>
              <div className="org-list">
                <div
                  className="org-tab"
                  onClick={openModal1}
                  style={{ cursor: "pointer" }}
                >
                  Stock Parameter
                </div>

                <Link to="/unit">
                  <div className="org-tab">Unit</div>
                </Link>
                <Link to="/brand">
                  <div className="org-tab">Brand</div>
                </Link>
                <Link to="/stockgroup">
                  <div className="org-tab">Stock Group</div>
                </Link>
                <Link to="/stockcategory">
                  <div className="org-tab">Stock Category</div>
                </Link>
                <Link to="/stockitem">
                  <div className="org-tab">Stock Item</div>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* First Modal - Stock Parameter */}
      {showModal1 && (
        <div className="modal-overlay">
          <div className="modal-box" style={{ width: "400px" }}>
            <div className="modal-header">
              <h5>Stock Parameter</h5>
              <button className="close-button text-end" onClick={closeModal1}>
                &times;
              </button>
            </div>
            <div className="modal-body mt-0">
              <table className="table">
                <thead>
                  <tr>
                    <th scope="col">Sl No.</th>
                    <th scope="col">Name</th>
                  </tr>
                </thead>
                <tbody>
                  <tr
                    onClick={() => {
                      openModal2();
                      closeModal1();
                    }}
                    style={{ cursor: "pointer" }}
                  >
                    <th scope="row">1</th>
                    <td>Mark</td>
                  </tr>
                  <tr>
                    <th scope="row">2</th>
                    <td>Jacob</td>
                  </tr>
                  <tr>
                    <th scope="row">3</th>
                    <td colSpan="2">Larry the Bird</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* Second Modal - Details */}
      {showModal2 && (
        <div className="modal-overlay">
          <div className="modal-box p-3" style={{ width: "1000px" }}>
            <div className="modal-header">
              <h5 className="my-auto">1</h5>
              <button className="close-button" onClick={closeModal2}>
                &times;
              </button>
            </div>

            <div className="text-end">
              <button className="btn btn-primary" onClick={openModal3}>
                Create
              </button>
            </div>

            <table className="table mt-2">
              <thead>
                <tr>
                  <th style={{ backgroundColor: "#4a6db5", color: "#ffffff" }}>
                    Sl No.
                  </th>
                  <th style={{ backgroundColor: "#4a6db5", color: "#ffffff" }}>
                    Master ID
                  </th>
                  <th style={{ backgroundColor: "#4a6db5", color: "#ffffff" }}>
                    Mailing Name
                  </th>
                  <th style={{ backgroundColor: "#4a6db5", color: "#ffffff" }}>
                    Name
                  </th>
                  <th style={{ backgroundColor: "#4a6db5", color: "#ffffff" }}>
                    Abbreviation
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <th scope="row">1</th>
                  <td>Mark</td>
                  <td>Mark</td>
                  <td>Mark</td>
                  <td>Mark</td>
                </tr>
                <tr>
                  <th scope="row">2</th>
                  <td>Jacob</td>
                  <td>Mark</td>
                  <td>Mark</td>
                  <td>Mark</td>
                </tr>
                <tr>
                  <th scope="row">3</th>
                  <td>Larry</td>
                  <td>Mark</td>
                  <td>Mark</td>
                  <td>Mark</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Third Modal - Create */}
      {showModal3 && (
        <div className="modal-overlay">
          <div className="modal-box p-4" style={{ width: "500px" }}>
            <div className="modal-header mb-3">
              <h5 className="my-auto">Create Stock Parameter</h5>
              <button className="close-button" onClick={closeModal3}>
                &times;
              </button>
            </div>

            <div className="modal-body">
              <div className="mb-3 row">
                <div className="col-4 my-auto">
                  <label className="mb-1">Mailing Name</label>
                </div>
                <div className="col-8">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Enter Mailing Name"
                  />
                </div>
              </div>
              <div className="row">
                <div className="col-4 my-auto">
                  <label className="mb-1">Abbreviation</label>
                </div>
                <div className="col-8">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Enter Mailing Name"
                  />
                </div>
              </div>
              <div className="text-end mt-3">
                <button className="btn btn-primary">Save</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
