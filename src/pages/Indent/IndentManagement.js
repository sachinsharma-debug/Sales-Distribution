import React from 'react'
import "../Dashboard/DashboardCard1.css";
import { Link } from "react-router-dom";

export default function IndentManagement() {
    return (
        <>
            <div className="settings-content">
                <div className="heading">Indent Menu</div>
                <div className="row">
                    <div className="col-3">
                        <div className="simple-org-container">
                            <div className="org-header">Pre-Purchase Management</div>
                            <div className="org-list">
                                <Link to="/Indent-Page"><div className="org-tab">Indent</div></Link>
                            </div>
                        </div>
                    </div>
                    <div className="col-3">
                        <div className="simple-org-container">
                            <div className="org-header">Indent Register</div>
                            <div className="org-list">
                                <Link to="/Indent-Page"><div className="org-tab">Monthly Indent Register</div></Link>
                                <Link to="/Indent-Voucher-Register"><div className="org-tab">Indent Voucher Register</div></Link>
                                <Link to="/Indent-Voucher-Pending"><div className="org-tab">Indent Voucher Pending</div></Link>
                                <Link to="/Indent-Closed"><div className="org-tab">Indent Closed</div></Link>
                                <Link to="/Indent-Pre-Closed"><div className="org-tab">Indent Pre-Closed</div></Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
