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
                </div>
            </div>
        </>
    )
}
