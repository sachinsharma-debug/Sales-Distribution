import React from 'react'
import { Link } from 'react-router-dom'

export default function PurchaseManagement() {
    return (
        <>
            <div className="settings-content">
                <div className="heading">Purchase Management</div>
                <div className="row">
                    <div className="col-3">
                        <div className="simple-org-container">
                            <div className="org-header">Purchase Management</div>
                            <div className="org-list">
                                <Link to="/PurchaseEnquiry"><div className="org-tab">Purchase Enquiry</div></Link>
                                <Link to="/PoCapital"><div className="org-tab">Purchase Order</div></Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
