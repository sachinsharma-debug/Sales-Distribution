import React from "react";
import DashboardCard from "../../component/DashboradCard";
// import "./DashboardCard1.css";
import { Link } from "react-router-dom";

const Salesmanagement = () => {
  return (
    <div className="settings-content">
      <div className="heading">Transaction</div>
      <div className="row">
        <div className="col-3">
          <div className="simple-org-container">
            <div className="org-header">Transaction</div>
            <div className="org-list">
              <Link to="/salesEnquiry">
                <div className="org-tab">Sales Enquiry</div>
              </Link>
              <Link to="/salesQuotation">
                <div className="org-tab">Sales Quotation</div>
              </Link>
              <Link to="/salesorder">
                <div className="org-tab">Sales Order</div>
              </Link>
              <Link to="/sales-confirmation">
                <div className="org-tab">Sales Confirmation</div>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Salesmanagement;
