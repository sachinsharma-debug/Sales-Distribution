import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom"; // ✅ Add useNavigate
import "./Settings.css";

export default function Settings() {

  return (
    <>
      <div className="settings-content">
        <div className="heading">General Settings</div>
        <div className="row">
          <div className="col-3">
            <div className="simple-org-container">
              <div className="org-header">Organisation Structure</div>
              <div className="org-list">
                <Link to="/companies"><div className="org-tab">Companies</div></Link>
                <Link to="/features"><div className="org-tab">Features</div></Link>
                <Link to="/taxation"><div className="org-tab">Taxation</div></Link>
                <Link to="/branches"><div className="org-tab">Branches</div></Link>
                <Link to="/plants"><div className="org-tab">Plants</div></Link>
                <Link to="/store"><div className="org-tab">Store</div></Link>
              </div>
            </div>
          </div>

          <div className="col-3">
            <div className="simple-org-container">
              <div className="org-header">Users And Roles</div>
              <div className="org-list">
                <Link to="/roles">
                  <div className="org-tab">Roles</div>
                </Link>
                <Link to="/Users">
                  <div className="org-tab">Users</div>
                </Link>
                <Link to="/plants">
                  <div className="org-tab">Login Security</div>
                </Link>
                <Link to="/store">
                  <div className="org-tab">Password Policies</div>
                </Link>
              </div>
            </div>
          </div>

          <div className="col-3">
            <div className="simple-org-container">
              <div className="org-header">General</div>
              <div className="org-list">
                <div className="org-tab">SMS Configration</div>
                <div className="org-tab">SMS Integration</div>
                <div className="org-tab">Email Configuration</div>
                <div className="org-tab">Email Integration</div>
                <div className="org-tab">Whatsapp Setting</div>
                <div className="org-tab">Whatsapp Integration for trans</div>
                <div className="org-tab">Email And SMS Scheduler </div>
                <div className="org-tab">Email Schedule Event Status Report</div>
              </div>
            </div>
          </div>
        </div>
      </div>

    </>
  );
}
