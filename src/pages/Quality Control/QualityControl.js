import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom"; // ✅ Add useNavigate
// import "./Settings.css";

export default function QualityControl() {
  return (
    <>
      <div className="settings-content">
        <div className="heading">Quality Control</div>
        <div className="row">
          <div className="col-3">
            <div className="simple-org-container">
              <div className="org-header">RM Inspection</div>
              <div className="org-list">
                <Link to="/rminward-inspection">
                  <div className="org-tab">RM Inward Inspection</div>
                </Link>
                <Link to="/rmsample-inspection">
                  <div className="org-tab">RM Sample Inspection</div>
                </Link>
                <Link to="/fginward-inspection">
                  <div className="org-tab">FG Inward Inspection</div>
                </Link>
                <Link to="/test-report">
                  <div className="org-tab">Test Report</div>
                </Link>
              </div>
            </div>
          </div>

          <div className="col-3">
            <div className="simple-org-container">
              <div className="org-header">Report</div>
              <div className="org-list">
                <Link to="/oc-analysis">
                  <div className="org-tab">OC Analysis</div>
                </Link>
                <Link to="/incoming-rm-inspection-register">
                  <div className="org-tab">INcoming RM Inspection Register</div>
                </Link>
                <Link to="/rejection-graph">
                  <div className="org-tab">Rejection Graph</div>
                </Link>
                <Link to="/test-report-register">
                  <div className="org-tab">TEst Report Register</div>
                </Link>
              </div>
            </div>
          </div>

          <div className="col-3">
            <div className="simple-org-container">
              <div className="org-header">Utility</div>
              <div className="org-list">
                <Link to="/update-item">
                  <div className="org-tab">Update Item</div>
                </Link>
                <Link to="/update-multi-item">
                  <div className="org-tab">Update Multi Item</div>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}