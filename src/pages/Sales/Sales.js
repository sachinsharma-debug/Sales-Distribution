import React from 'react'
import { Link } from 'react-router-dom';
import '../Settings/Settings.css';

export default function Sales() {
    return (
        <div className="settings-content">
            <div className="heading">Sales</div>
            <div className="row">
                <div className="col-3">
                    <div className="simple-org-container">
                        <div className="org-header">Sales List</div>
                        <div className="org-list">
                            <Link to="/Customer"><div className="org-tab">Customer</div></Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
