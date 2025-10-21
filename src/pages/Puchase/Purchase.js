import React from 'react'
import { Link } from 'react-router-dom';
import '../Settings/Settings.css';

export default function Purchase() {
    return (
        <div className="settings-content">
            <div className="heading">Purchase</div>
            <div className="row">
                <div className="col-3">
                    <div className="simple-org-container">
                        <div className="org-header">Purchase List</div>
                        <div className="org-list">
                            <Link to="/Vendor"><div className="org-tab">Vendor</div></Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
