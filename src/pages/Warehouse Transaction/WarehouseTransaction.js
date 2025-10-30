import React from 'react'
import "../Dashboard/DashboardCard1.css";
import { Link } from "react-router-dom";

export default function WarehouseTransaction() {
    const approvalItems = [
        { title: "Items", count: 1 },
        { title: "Ledgers", count: 2 },
    ];

    const submissionItems = [
        { title: "Purchase Invoice", count: 1 },
    ];
    return (
        <>
            <div className="settings-content">
                <div className="heading">Warehouse Transaction</div>
                <div className="row">
                    <div className="col-3">
                        <div className="simple-org-container">
                            <div className="org-header">Warehouse Transaction</div>
                            <div className="org-list">
                                <Link to="/GRN-Page"><div className="org-tab">GRN</div></Link>
                                <Link to="/StockJournal"><div className="org-tab">Stock Journal</div></Link>
                                <Link to="/MaterialTransfer"><div className="org-tab">Material Transfer</div></Link>
                                <Link to="/PurchaseRequisition"><div className="org-tab">Purchase Requisition</div></Link>
                                <Link to="/PhysicalStock"><div className="org-tab">Physical Stock</div></Link>
                                <Link to="/ReorderStatus"><div className="org-tab">Reorder Status</div></Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
