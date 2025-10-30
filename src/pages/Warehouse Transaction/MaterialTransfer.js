import React, { useState, useEffect } from "react";
import "../Settings/Branches.css";
import { BASE_URL } from "../../api/common";
import { Button } from "react-bootstrap";

export default function MaterialTransfer() {

    const [searchFilters, setSearchFilters] = useState({
        name: "",
        parentName: "",
        address: "",
        phone: "",
        mobile: "",
        email: "",
        website: "",
    });

    const [formobj, setformobj] = useState({
        "MasterID": "",
        "AlterID": "",
        "BranchName": "",
        "MailingName": "",
        "Address": "",
        "District": "",
        "State": "",
        "Pincode": "",
        "Telephone": "",
        "Mobile": "",
        "Fax": "",
        "Email": ""
    });


    const [dialogOpen, setDialogOpen] = useState(false);
    const [secondDialogOpen, setSecondDialogOpen] = useState(false);
    const [orderDetailsDialogOpen, setOrderDetailsDialogOpen] = useState(false);
    const [itemAllocationDialogOpen, setItemAllocationDialogOpen] = useState(false);

    const [partyDetailsDialogOpen, setPartyDetailsDialogOpen] = useState(false);
    const [selectedName, setSelectedName] = useState("");
    const [selectedItem, setSelectedItem] = useState("");
    const [SalesEnquiryData, setSalesEnquiryData] = useState([]);

    // Table data state
    const [tableData, setTableData] = useState([
        {
            nameOfItem: "SMA Wire 150mm",
            quantityActual: "50 PCS",
            approvedBilled: "50 PCS",
            reject: ""
        }
    ]);

    // Item Allocation table data
    const [itemAllocationData, setItemAllocationData] = useState([
        {
            trackingNo: "B1664",
            orderNo: "Not Applicable",
            godown: "RM Tech Store",
            batchLotNo: "B1664750104202435",
            quantityActual: "50 PCS",
            quantityBilled: "50 PCS",
            qcTest: "No",
            qcNo: "No",
            qcDate: "",
            inspectionObservation: "",
            insDate: ""
        }
    ]);

    useEffect(() => {
        getmethod();
    }, []);

    // Handle search filter changes
    const handleSearchChange = (field, value) => {
        setSearchFilters((prev) => ({
            ...prev,
            [field]: value,
        }));
    };

    async function getmethod() {
        try {
            const res = await fetch(BASE_URL + "get_master/sales-enquiry");
            const data = await res.json();
            setSalesEnquiryData(data?.data || []);
        } catch (err) {
            console.error("Error fetching sales enquiry:", err);
        }
    }

    async function addupdate() {
        let payload = {
            tablename: "sales-enquiry",
            data: formobj
        };

        let response = await fetch(BASE_URL + "create_master", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(payload),
        });
        response = await response.json();
        getmethod();
        closeDialog();
    }

    // Filter companies based on search criteria
    const filteredSalesEnquiry = SalesEnquiryData;

    function openDialog() {
        setDialogOpen(true);
    }

    function closeDialog() {
        setDialogOpen(false);
        setSecondDialogOpen(false);
        setOrderDetailsDialogOpen(false);
        setItemAllocationDialogOpen(false);
        setPartyDetailsDialogOpen(false);
        setSelectedName("");
        setSelectedItem("");
    }

    function openSecondDialog() {
        setSecondDialogOpen(true);
    }

    function closeSecondDialog() {
        setSecondDialogOpen(false);
    }

    function openOrderDetailsDialog() {
        setOrderDetailsDialogOpen(true);
    }

    function closeOrderDetailsDialog() {
        setOrderDetailsDialogOpen(false);
    }

    function openItemAllocationDialog(itemName) {
        setSelectedItem(itemName);
        setItemAllocationDialogOpen(true);
    }

    function openPartyDetailsDialog() {
        setPartyDetailsDialogOpen(true);
    }

    function closePartyDetailsDialog() {
        setPartyDetailsDialogOpen(false);
    }

    function closeItemAllocationDialog() {
        setItemAllocationDialogOpen(false);
        setSelectedItem("");
    }

    // Handle name selection
    const handleNameSelect = (e) => {
        const selectedValue = e.target.value;
        setformobj({ ...formobj, BranchName: selectedValue });
        setSelectedName(selectedValue);

        // If a name is selected (not empty), open second dialog
        if (selectedValue) {
            openSecondDialog();
        }
    };

    // Handle item selection from dropdown
    const handleItemSelect = (index, value) => {
        if (value) {
            openItemAllocationDialog(value);
        }

        const updatedData = [...tableData];
        updatedData[index] = {
            ...updatedData[index],
            nameOfItem: value
        };
        setTableData(updatedData);
    };

    // Dialog backdrop close handler
    const handleBackdropClick = (e) => {
        if (e.target === e.currentTarget) {
            closeDialog();
        }
    };

    const handleSecondBackdropClick = (e) => {
        if (e.target === e.currentTarget) {
            closeSecondDialog();
        }
    };

    const handleOrderDetailsBackdropClick = (e) => {
        if (e.target === e.currentTarget) {
            closeOrderDetailsDialog();
        }
    };

    const handleItemAllocationBackdropClick = (e) => {
        if (e.target === e.currentTarget) {
            closeItemAllocationDialog();
        }
    };

    const handlePartyDetailsBackdropClick = (e) => {
        if (e.target === e.currentTarget) {
            closePartyDetailsDialog();
        }
    };

    // Handle table data changes
    const handleTableDataChange = (index, field, value) => {
        const updatedData = [...tableData];
        updatedData[index] = {
            ...updatedData[index],
            [field]: value
        };
        setTableData(updatedData);
    };

    // Handle item allocation data changes
    const handleItemAllocationChange = (index, field, value) => {
        const updatedData = [...itemAllocationData];
        updatedData[index] = {
            ...updatedData[index],
            [field]: value
        };
        setItemAllocationData(updatedData);
    };

    // Add new row to table
    const addNewRow = () => {
        setTableData([
            ...tableData,
            {
                nameOfItem: "",
                quantityActual: "",
                approvedBilled: "",
                reject: ""
            }
        ]);
    };

    // Add new row to item allocation table
    const addNewItemAllocationRow = () => {
        setItemAllocationData([
            ...itemAllocationData,
            {
                trackingNo: "",
                orderNo: "",
                godown: "",
                batchLotNo: "",
                quantityActual: "",
                quantityBilled: "",
                qcTest: "No",
                qcNo: "No",
                qcDate: "",
                inspectionObservation: "",
                insDate: ""
            }
        ]);
    };

    // Remove row from table
    const removeRow = (index) => {
        if (tableData.length > 1) {
            const updatedData = tableData.filter((_, i) => i !== index);
            setTableData(updatedData);
        }
    };

    // Remove row from item allocation table
    const removeItemAllocationRow = (index) => {
        const updatedData = itemAllocationData.filter((_, i) => i !== index);
        setItemAllocationData(updatedData);
    };

    // ESC key handler for dialogs
    useEffect(() => {
        const handleEscKey = (event) => {
            if (event.keyCode === 27) {
                if (itemAllocationDialogOpen) {
                    closeItemAllocationDialog();
                } else if (orderDetailsDialogOpen) {
                    closeOrderDetailsDialog();
                } else if (partyDetailsDialogOpen) {
                    closePartyDetailsDialog();
                } else if (secondDialogOpen) {
                    closeSecondDialog();
                } else if (dialogOpen) {
                    closeDialog();
                }
            }
        };

        document.addEventListener('keydown', handleEscKey);
        return () => {
            document.removeEventListener('keydown', handleEscKey);
        };
    }, [dialogOpen, secondDialogOpen, orderDetailsDialogOpen, itemAllocationDialogOpen]);
    return (
        <>
            {/* Order Details Dialog */}
            {orderDetailsDialogOpen && (
                <div
                    className="dialog-backdrop"
                    onClick={handleOrderDetailsBackdropClick}
                    style={{
                        position: 'fixed',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        backgroundColor: 'rgba(0, 0, 0, 0.5)',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        zIndex: 1002,
                    }}
                >
                    <div
                        className="dialog-content"
                        style={{
                            background: 'white',
                            borderRadius: '8px',
                            padding: '20px',
                            minWidth: '800px',
                            maxWidth: '80vw',
                            maxHeight: '80vh',
                            overflow: 'auto',
                            boxShadow: '0 10px 30px rgba(0, 0, 0, 0.3)',
                        }}
                    >
                        <div className="d-flex justify-content-between mb-3"
                            style={{ borderBottom: '1px solid #eee', paddingBottom: '15px' }}
                        >
                            <div style={{ fontSize: '18px', fontWeight: 'bold' }}>
                                Order Details
                            </div>
                            <button
                                onClick={closeOrderDetailsDialog}
                                style={{
                                    border: 'none',
                                    background: 'none',
                                    fontSize: '18px',
                                    cursor: 'pointer',
                                    color: '#6c757d',
                                }}
                            >
                                ×
                            </button>
                        </div>

                        <div className="dialog-body">

                            <div className="row pb-3" style={{ borderBottom: '1px solid #ccc' }}>
                                <div className='col-5 mb-2'>
                                    <div className="row">
                                        <div className='col-4 my-auto'>
                                            <label className="form-label my-auto">Order No :</label>
                                        </div>
                                        <div className='col-7'>
                                            <select
                                                className="form-control form-control-sm py-1 px-2"
                                                style={{ border: '1px solid #ced4da' }}
                                            >
                                                <option>Select Order</option>
                                                <option>Not Applicable</option>
                                                <option>Order 2</option>
                                                <option>Order 3</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-6 offset-1">
                                    <div className="row">
                                        <div className='col-6 my-auto offset-1'>
                                            <label className="form-label">Mode/Terms Of Payment</label>
                                        </div>
                                        <div className='col-5'>
                                            <input
                                                type="text"
                                                className="form-control form-control-sm py-1 px-2"
                                                style={{ border: '1px solid #ced4da' }}
                                            />
                                        </div>

                                        <div className='col-6 mt-2 offset-1'>
                                            <label className="form-label my-auto">Other References</label>
                                        </div>
                                        <div className='col-5 mt-2'>
                                            <input
                                                type="text"
                                                className="form-control form-control-sm py-1 px-2"
                                                style={{ border: '1px solid #ced4da' }}
                                            />
                                        </div>

                                        <div className='col-6 mt-2 offset-1'>
                                            <label className="form-label my-auto">Term Of Delivery</label>
                                        </div>
                                        <div className='col-5 mt-2'>
                                            <input
                                                type="text"
                                                className="form-control form-control-sm py-1 px-2"
                                                style={{ border: '1px solid #ced4da' }}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="row">
                                <div className="col-12 py-3">
                                    <div className="text-center" style={{ fontWeight: 600 }}>Receipt Details</div>
                                </div>
                                <div className="col-12">
                                    <div className="row">
                                        <div className='col-3 my-auto'>
                                            <label className="form-label">Dispatch DOC No</label>
                                        </div>
                                        <div className='col-3'>
                                            <input
                                                type="text"
                                                className="form-control form-control-sm py-1 px-2"
                                                style={{ border: '1px solid #ced4da' }}
                                            />
                                        </div>
                                    </div>
                                    <div className="row mt-2">
                                        <div className='col-3 my-auto'>
                                            <label className="form-label">Dispatched Through</label>
                                        </div>
                                        <div className='col-3'>
                                            <input
                                                type="text"
                                                className="form-control form-control-sm py-1 px-2"
                                                style={{ border: '1px solid #ced4da' }}
                                            />
                                        </div>
                                    </div>

                                    <div className="row mt-2">
                                        <div className='col-3 my-auto'>
                                            <label className="form-label">Designation</label>
                                        </div>
                                        <div className='col-3'>
                                            <input
                                                type="text"
                                                className="form-control form-control-sm py-1 px-2"
                                                style={{ border: '1px solid #ced4da' }}
                                            />
                                        </div>
                                    </div>

                                    
                                    <div className="row mt-2">
                                        <div className='col-3 my-auto'>
                                            <label className="form-label">Carrer Name/Agent</label>
                                        </div>
                                        <div className='col-3'>
                                            <input
                                                type="text"
                                                className="form-control form-control-sm py-1 px-2"
                                                style={{ border: '1px solid #ced4da' }}
                                            />
                                        </div>
                                    </div>

                                    <div className="row mt-2">
                                        <div className='col-3 my-auto'>
                                            <label className="form-label">Bill Of Landing/LR-RR No.</label>
                                        </div>
                                        <div className='col-3'>
                                            <input
                                                type="text"
                                                className="form-control form-control-sm py-1 px-2"
                                                style={{ border: '1px solid #ced4da' }}
                                            />
                                        </div>

                                        <div className='col-2 my-auto offset-1'>
                                            <label className="form-label">Date</label>
                                        </div>
                                        <div className='col-3'>
                                            <input
                                                type="date"
                                                className="form-control form-control-sm py-1 px-2"
                                                style={{ border: '1px solid #ced4da' }}
                                            />
                                        </div>
                                    </div>

                                    <div className="row mt-2">
                                        <div className='col-3 my-auto'>
                                            <label className="form-label">Motor Vehicle No.</label>
                                        </div>
                                        <div className='col-3'>
                                            <input
                                                type="text"
                                                className="form-control form-control-sm py-1 px-2"
                                                style={{ border: '1px solid #ced4da' }}
                                            />
                                        </div>
                                    </div>

                                    

                                    <div className="row mt-2">
                                        <div className='col-3 my-auto'>
                                            <label className="form-label my-auto">Date & Time Of Issue</label>
                                        </div>
                                        <div className='col-3'>
                                            <input
                                                type="date"
                                                className="form-control form-control-sm py-1 px-2"
                                                style={{ border: '1px solid #ced4da' }}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>


                            {/* Footer Buttons */}
                            <div className="d-flex justify-content-end mt-4 pt-3" style={{ borderTop: '1px solid #e9ecef' }}>
                                <button
                                    className="btn btn-outline-secondary me-3"
                                    onClick={closeOrderDetailsDialog}
                                    style={{
                                        padding: '6px 20px',
                                        fontWeight: '600'
                                    }}
                                >
                                    Close
                                </button>
                                <button
                                    className="btn btn-primary"
                                    style={{
                                        padding: '6px 25px',
                                        fontWeight: '600',
                                        background: '#007bff',
                                        border: 'none'
                                    }}
                                >
                                    Save
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Party Details Dialog */}
            {partyDetailsDialogOpen && (
                <div
                    className="dialog-backdrop"
                    onClick={handlePartyDetailsBackdropClick}
                    style={{
                        position: 'fixed',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        backgroundColor: 'rgba(0, 0, 0, 0.5)',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        zIndex: 1003,
                    }}
                >
                    <div
                        className="dialog-content"
                        style={{
                            background: 'white',
                            borderRadius: '8px',
                            padding: '25px',
                            minWidth: '1000px',
                            maxWidth: '90vw',
                            maxHeight: '90vh',
                            overflow: 'auto',
                            boxShadow: '0 10px 30px rgba(0, 0, 0, 0.3)',
                        }}
                    >
                        <div className="d-flex justify-content-between mb-3"
                            style={{ borderBottom: '1px solid #eee', paddingBottom: '15px' }}
                        >
                            <div style={{ fontSize: '20px', fontWeight: 'bold' }}>
                                Party Details
                            </div>
                            <button
                                onClick={closePartyDetailsDialog}
                                style={{
                                    border: 'none',
                                    background: 'none',
                                    fontSize: '18px',
                                    cursor: 'pointer',
                                    color: '#6c757d',
                                }}
                            >
                                ×
                            </button>
                        </div>

                        <div className="dialog-body">
                            <div className="row">
                                <div className="col-6">
                                    <div className="row">
                                        <div className='col-5 mt-1'>
                                            <label className="form-label my-auto">Supplier Bill From</label>
                                        </div>
                                        <div className='col-7 mt-1'>
                                            <select
                                                className="form-control form-control-sm py-1 px-2"
                                                style={{ border: '1px solid #ced4da' }}
                                            >
                                                <option>AM Electronics</option>
                                                <option>Yes</option>
                                            </select>
                                        </div>

                                        <div className='col-5 mt-1'>
                                            <label className="form-label my-auto">Address Type</label>
                                        </div>
                                        <div className='col-7 mt-1'>
                                            <select
                                                className="form-control form-control-sm py-1 px-2"
                                                style={{ border: '1px solid #ced4da' }}
                                            >
                                                <option>Primary</option>
                                                <option>Yes</option>
                                            </select>
                                        </div>

                                        <div className='col-5 mt-1'>
                                            <label className="form-label">Mailing Name</label>
                                        </div>
                                        <div className='col-7 mt-1'>
                                            <input
                                                type="text"
                                                className="form-control form-control-sm py-1 px-2"
                                                style={{ border: '1px solid #ced4da' }}
                                            />
                                        </div>

                                        <div className='col-5 mt-1'>
                                            <label className="form-label">Address</label>
                                        </div>
                                        <div className='col-7 mt-1'>
                                            <textarea
                                                type="text"
                                                className="form-control form-control-sm py-1 px-2"
                                                style={{ border: '1px solid #ced4da' }}
                                            />
                                        </div>

                                        <div className='col-5 mt-1'>
                                            <label className="form-label my-auto">State</label>
                                        </div>
                                        <div className='col-7 mt-1'>
                                            <select
                                                className="form-control form-control-sm py-1 px-2"
                                                style={{ border: '1px solid #ced4da' }}
                                            >
                                                <option>Primary</option>
                                                <option>Yes</option>
                                            </select>
                                        </div>

                                        <div className='col-5 mt-1'>
                                            <label className="form-label my-auto">Country</label>
                                        </div>
                                        <div className='col-7 mt-1'>
                                            <select
                                                className="form-control form-control-sm py-1 px-2"
                                                style={{ border: '1px solid #ced4da' }}
                                            >
                                                <option>Primary</option>
                                                <option>Yes</option>
                                            </select>
                                        </div>

                                        <div className='col-5 mt-1'>
                                            <label className="form-label my-auto">District</label>
                                        </div>
                                        <div className='col-7 mt-1'>
                                            <select
                                                className="form-control form-control-sm py-1 px-2"
                                                style={{ border: '1px solid #ced4da' }}
                                            >
                                                <option>Primary</option>
                                                <option>Yes</option>
                                            </select>
                                        </div>

                                        <div className='col-5 mt-1'>
                                            <label className="form-label my-auto">City</label>
                                        </div>
                                        <div className='col-7 mt-1'>
                                            <select
                                                className="form-control form-control-sm py-1 px-2"
                                                style={{ border: '1px solid #ced4da' }}
                                            >
                                                <option>Primary</option>
                                                <option>Yes</option>
                                            </select>
                                        </div>

                                        <div className='col-5 mt-1'>
                                            <label className="form-label">Pincode</label>
                                        </div>
                                        <div className='col-7 mt-1'>
                                            <input
                                                type="text"
                                                className="form-control form-control-sm py-1 px-2"
                                                style={{ border: '1px solid #ced4da' }}
                                            />
                                        </div>

                                        <div className='col-5 mt-1'>
                                            <label className="form-label my-auto">GST Registration Type</label>
                                        </div>
                                        <div className='col-7 mt-1'>
                                            <select
                                                className="form-control form-control-sm py-1 px-2"
                                                style={{ border: '1px solid #ced4da' }}
                                            >
                                                <option>Unknown</option>
                                                <option>Yes</option>
                                            </select>
                                        </div>

                                        <div className='col-5 mt-1'>
                                            <label className="form-label my-auto">Assessee Of Other Territory</label>
                                        </div>
                                        <div className='col-7 mt-1'>
                                            <select
                                                className="form-control form-control-sm py-1 px-2"
                                                style={{ border: '1px solid #ced4da' }}
                                            >
                                                <option>No</option>
                                                <option>Yes</option>
                                            </select>
                                        </div>

                                        <div className='col-5 mt-1'>
                                            <label className="form-label">GSTIN/UIN</label>
                                        </div>
                                        <div className='col-7 mt-1'>
                                            <input
                                                type="text"
                                                className="form-control form-control-sm py-1 px-2"
                                                style={{ border: '1px solid #ced4da' }}
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className="col-6">
                                    <div className="row">
                                        <div className='col-5 mt-1'>
                                            <label className="form-label my-auto">Consignee (Ship To)</label>
                                        </div>
                                        <div className='col-7 mt-1'>
                                            <select
                                                className="form-control form-control-sm py-1 px-2"
                                                style={{ border: '1px solid #ced4da' }}
                                            >
                                                <option>No</option>
                                                <option>Yes</option>
                                            </select>
                                        </div>

                                        <div className='col-5 mt-1'>
                                            <label className="form-label my-auto">Address Type</label>
                                        </div>
                                        <div className='col-7 mt-1'>
                                            <select
                                                className="form-control form-control-sm py-1 px-2"
                                                style={{ border: '1px solid #ced4da' }}
                                            >
                                                <option>Primary</option>
                                                <option>Yes</option>
                                            </select>
                                        </div>

                                        <div className='col-5 mt-1'>
                                            <label className="form-label">Mailing Name</label>
                                        </div>
                                        <div className='col-7 mt-1'>
                                            <input
                                                type="text"
                                                className="form-control form-control-sm py-1 px-2"
                                                style={{ border: '1px solid #ced4da' }}
                                            />
                                        </div>

                                        <div className='col-5 mt-1'>
                                            <label className="form-label">Address</label>
                                        </div>
                                        <div className='col-7 mt-1'>
                                            <textarea
                                                type="text"
                                                className="form-control form-control-sm py-1 px-2"
                                                style={{ border: '1px solid #ced4da' }}
                                            />
                                        </div>

                                        <div className='col-5 mt-1'>
                                            <label className="form-label my-auto">State</label>
                                        </div>
                                        <div className='col-7 mt-1'>
                                            <select
                                                className="form-control form-control-sm py-1 px-2"
                                                style={{ border: '1px solid #ced4da' }}
                                            >
                                                <option>Primary</option>
                                                <option>Yes</option>
                                            </select>
                                        </div>

                                        <div className='col-5 mt-1'>
                                            <label className="form-label my-auto">Country</label>
                                        </div>
                                        <div className='col-7 mt-1'>
                                            <select
                                                className="form-control form-control-sm py-1 px-2"
                                                style={{ border: '1px solid #ced4da' }}
                                            >
                                                <option>Primary</option>
                                                <option>Yes</option>
                                            </select>
                                        </div>

                                        <div className='col-5 mt-1'>
                                            <label className="form-label my-auto">District</label>
                                        </div>
                                        <div className='col-7 mt-1'>
                                            <select
                                                className="form-control form-control-sm py-1 px-2"
                                                style={{ border: '1px solid #ced4da' }}
                                            >
                                                <option>Primary</option>
                                                <option>Yes</option>
                                            </select>
                                        </div>

                                        <div className='col-5 mt-1'>
                                            <label className="form-label my-auto">City</label>
                                        </div>
                                        <div className='col-7 mt-1'>
                                            <select
                                                className="form-control form-control-sm py-1 px-2"
                                                style={{ border: '1px solid #ced4da' }}
                                            >
                                                <option>Primary</option>
                                                <option>Yes</option>
                                            </select>
                                        </div>

                                        <div className='col-5 mt-1'>
                                            <label className="form-label">Pincode</label>
                                        </div>
                                        <div className='col-7 mt-1'>
                                            <input
                                                type="text"
                                                className="form-control form-control-sm py-1 px-2"
                                                style={{ border: '1px solid #ced4da' }}
                                            />
                                        </div>

                                        <div className='col-5 mt-1'>
                                            <label className="form-label">GSTIN/UIN</label>
                                        </div>
                                        <div className='col-7 mt-1'>
                                            <input
                                                type="text"
                                                className="form-control form-control-sm py-1 px-2"
                                                style={{ border: '1px solid #ced4da' }}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Footer Buttons */}
                            <div className="d-flex justify-content-end mt-4 pt-3" style={{ borderTop: '1px solid #e9ecef' }}>
                                <button
                                    className="btn btn-outline-secondary me-3"
                                    onClick={closePartyDetailsDialog}
                                    style={{
                                        padding: '8px 24px',
                                        fontWeight: '600'
                                    }}
                                >
                                    Close
                                </button>
                                <button
                                    className="btn btn-primary"
                                    style={{
                                        padding: '8px 24px',
                                        fontWeight: '600',
                                        background: '#007bff',
                                        border: 'none'
                                    }}
                                >
                                    Save Details
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}


            {/* Item Allocation Dialog - Exact match to image */}
            {itemAllocationDialogOpen && (
                <div
                    className="dialog-backdrop"
                    onClick={handleItemAllocationBackdropClick}
                    style={{
                        position: 'fixed',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        backgroundColor: 'rgba(0, 0, 0, 0.5)',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        zIndex: 1003,
                    }}
                >
                    <div
                        className="dialog-content"
                        style={{
                            background: 'white',
                            borderRadius: '8px',
                            padding: '25px',
                            minWidth: '1200px',
                            maxWidth: '95vw',
                            maxHeight: '90vh',
                            overflow: 'auto',
                            boxShadow: '0 10px 30px rgba(0, 0, 0, 0.3)',
                        }}
                    >
                        <div className="d-flex justify-content-between mb-3"
                            style={{ borderBottom: '1px solid #eee', paddingBottom: '15px' }}
                        >
                            <div style={{ fontSize: '20px', fontWeight: 'bold' }}>
                                Item Allocations for : <strong>{selectedItem}</strong>
                            </div>
                            <button
                                onClick={closeItemAllocationDialog}
                                style={{
                                    border: 'none',
                                    background: 'none',
                                    fontSize: '18px',
                                    cursor: 'pointer',
                                    color: '#6c757d',
                                }}
                            >
                                ×
                            </button>
                        </div>

                        <div className="dialog-body">
                            {/* Item Allocation Table */}
                            <div className="table-responsive">
                                <table className="table table-bordered" style={{
                                    fontSize: '14px',
                                    border: '2px solid #dee2e6'
                                }}>
                                    <thead>
                                        <tr style={{
                                            backgroundColor: '#007bff',
                                            color: 'white',
                                            border: '2px solid #dee2e6'
                                        }}>
                                            <th style={{
                                                padding: '12px',
                                                textAlign: 'center',
                                                fontWeight: '600',
                                                border: '1px solid #dee2e6',
                                                width: '12%'
                                            }}>Godown</th>
                                            <th style={{
                                                padding: '12px',
                                                textAlign: 'center',
                                                fontWeight: '600',
                                                border: '1px solid #dee2e6',
                                                width: '15%'
                                            }}>Batch/Lot No.</th>
                                            <th colSpan="1" style={{
                                                padding: '12px',
                                                textAlign: 'center',
                                                fontWeight: '600',
                                                border: '1px solid #dee2e6',
                                                width: '16%'
                                            }}>Quantity</th>
                                            <th style={{
                                                padding: '12px',
                                                textAlign: 'center',
                                                fontWeight: '600',
                                                border: '1px solid #dee2e6',
                                                width: '8%'
                                            }}>Rate</th>
                                            <th style={{
                                                padding: '12px',
                                                textAlign: 'center',
                                                fontWeight: '600',
                                                border: '1px solid #dee2e6',
                                                width: '8%'
                                            }}>Amount</th>
                                            <th style={{
                                                padding: '12px',
                                                textAlign: 'center',
                                                fontWeight: '600',
                                                border: '1px solid #dee2e6',
                                                width: '8%'
                                            }}>Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {itemAllocationData.map((row, index) => (
                                            <React.Fragment key={index}>
                                                {/* Tracking and Order Info Row */}
                                                <tr style={{
                                                    backgroundColor: '#f8f9fa',
                                                    border: '2px solid #dee2e6'
                                                }}>
                                                    <td colSpan="9" style={{
                                                        padding: '8px 12px',
                                                        border: '1px solid #dee2e6',
                                                        fontSize: '13px'
                                                    }}>
                                                        <div className="row align-items-center">

                                                            <div className="col-md-3">
                                                                <span style={{
                                                                    fontStyle: 'italic',
                                                                    fontWeight: '500',
                                                                    color: '#495057'
                                                                }}>
                                                                    Order No. :
                                                                </span>
                                                                <select
                                                                    className="form-control form-control-sm d-inline-block py-1 px-2"
                                                                    value={row.orderNo}
                                                                    onChange={(e) => handleItemAllocationChange(index, 'orderNo', e.target.value)}
                                                                    style={{
                                                                        width: 'auto',
                                                                        display: 'inline-block',
                                                                        marginLeft: '8px'
                                                                    }}
                                                                >
                                                                    <option value="">Select Order</option>
                                                                    <option value="Not Applicable">Not Applicable</option>
                                                                    <option value="ORD001">ORD001</option>
                                                                    <option value="ORD002">ORD002</option>
                                                                </select>
                                                            </div>
                                                            <div className="col-md-3">
                                                                <span className="my-auto" style={{
                                                                    fontStyle: 'italic',
                                                                    fontWeight: '500',
                                                                    color: '#495057'
                                                                }}>
                                                                    Due On :
                                                                </span>
                                                                <input
                                                                    className="form-control form-control-sm d-inline-block py-1 px-2"
                                                                    value={row.trackingNo}
                                                                    onChange={(e) => handleItemAllocationChange(index, 'trackingNo', e.target.value)}
                                                                    style={{
                                                                        width: 'auto',
                                                                        display: 'inline-block',
                                                                        marginLeft: '8px'
                                                                    }}
                                                                />
                                                            </div>
                                                            <div className="col-md-3">
                                                                <span style={{
                                                                    fontStyle: 'italic',
                                                                    fontWeight: '500',
                                                                    color: '#495057'
                                                                }}>
                                                                    Component Of :
                                                                </span>
                                                                <select
                                                                    className="form-control form-control-sm d-inline-block py-1 px-2"
                                                                    value={row.orderNo}
                                                                    onChange={(e) => handleItemAllocationChange(index, 'orderNo', e.target.value)}
                                                                    style={{
                                                                        width: 'auto',
                                                                        display: 'inline-block',
                                                                        marginLeft: '8px'
                                                                    }}
                                                                >
                                                                    <option value="">Select Order</option>
                                                                    <option value="Not Applicable">Not Applicable</option>
                                                                    <option value="ORD001">ORD001</option>
                                                                    <option value="ORD002">ORD002</option>
                                                                </select>
                                                            </div>
                                                        </div>
                                                    </td>
                                                </tr>
                                                {/* Data Row */}
                                                <tr style={{
                                                    backgroundColor: index % 2 === 0 ? '#ffffff' : '#f8f9fa',
                                                    border: '2px solid #dee2e6'
                                                }}>
                                                    <td style={{
                                                        padding: '10px',
                                                        border: '1px solid #dee2e6',
                                                        textAlign: 'center'
                                                    }}>
                                                        <input
                                                            type="text"
                                                            className="form-control form-control-sm"
                                                            value={row.godown}
                                                            onChange={(e) => handleItemAllocationChange(index, 'godown', e.target.value)}
                                                            style={{
                                                                border: '1px solid #ced4da',
                                                                textAlign: 'center',
                                                                fontSize: '13px',
                                                                padding: '4px 8px'
                                                            }}
                                                        />
                                                    </td>
                                                    <td style={{
                                                        padding: '10px',
                                                        border: '1px solid #dee2e6',
                                                        textAlign: 'center'
                                                    }}>
                                                        <input
                                                            type="text"
                                                            className="form-control form-control-sm"
                                                            value={row.batchLotNo}
                                                            onChange={(e) => handleItemAllocationChange(index, 'batchLotNo', e.target.value)}
                                                            style={{
                                                                border: '1px solid #ced4da',
                                                                textAlign: 'center',
                                                                fontSize: '13px',
                                                                padding: '4px 8px'
                                                            }}
                                                        />
                                                    </td>
                                                    <td style={{
                                                        padding: '10px',
                                                        border: '1px solid #dee2e6',
                                                        textAlign: 'center'
                                                    }}>
                                                        <input
                                                            type="text"
                                                            className="form-control form-control-sm"
                                                            value={row.quantityActual}
                                                            onChange={(e) => handleItemAllocationChange(index, 'quantityActual', e.target.value)}
                                                            style={{
                                                                border: '1px solid #ced4da',
                                                                textAlign: 'center',
                                                                fontSize: '13px',
                                                                padding: '4px 8px'
                                                            }}
                                                        />
                                                    </td>
                                                    <td style={{
                                                        padding: '10px',
                                                        border: '1px solid #dee2e6',
                                                        textAlign: 'center'
                                                    }}>
                                                        <input
                                                            type="text"
                                                            className="form-control form-control-sm"
                                                            value={row.quantityBilled}
                                                            onChange={(e) => handleItemAllocationChange(index, 'quantityBilled', e.target.value)}
                                                            style={{
                                                                border: '1px solid #ced4da',
                                                                textAlign: 'center',
                                                                fontSize: '13px',
                                                                padding: '4px 8px'
                                                            }}
                                                        />
                                                    </td>
                                                    <td style={{
                                                        padding: '10px',
                                                        border: '1px solid #dee2e6',
                                                        textAlign: 'center'
                                                    }}>
                                                        <input
                                                            type="text"
                                                            className="form-control form-control-sm"
                                                            value={row.qcTest}
                                                            onChange={(e) => handleItemAllocationChange(index, 'qcTest', e.target.value)}
                                                            style={{
                                                                border: '1px solid #ced4da',
                                                                textAlign: 'center',
                                                                fontSize: '13px',
                                                                padding: '4px 8px'
                                                            }}
                                                        />
                                                    </td>
                                                    <td style={{
                                                        padding: '10px',
                                                        border: '1px solid #dee2e6'
                                                    }}>
                                                        <div className="d-flex gap-2">
                                                            <Button
                                                                variant="outline-danger"
                                                                size="sm"
                                                                onClick={() => removeItemAllocationRow(index)}
                                                                disabled={itemAllocationData.length === 1}
                                                                style={{
                                                                    padding: '4px 8px',
                                                                    fontSize: '12px'
                                                                }}
                                                            >
                                                                <i className="fas fa-trash"></i>
                                                            </Button>
                                                            {index === itemAllocationData.length - 1 && (
                                                                <Button
                                                                    variant="primary"
                                                                    size="sm"
                                                                    onClick={addNewItemAllocationRow}
                                                                    style={{
                                                                        padding: '4px 8px',
                                                                        fontSize: '12px'
                                                                    }}
                                                                >
                                                                    <i className="fas fa-plus"></i>
                                                                </Button>
                                                            )}
                                                        </div>
                                                    </td>
                                                </tr>
                                            </React.Fragment>
                                        ))}
                                    </tbody>
                                </table>
                            </div>


                            {/* Footer Buttons */}
                            <div className="d-flex justify-content-end mt-4 pt-3" style={{ borderTop: '1px solid #e9ecef' }}>
                                <button
                                    className="btn btn-outline-secondary me-3"
                                    onClick={closeItemAllocationDialog}
                                    style={{
                                        padding: '8px 24px',
                                        fontWeight: '600'
                                    }}
                                >
                                    Close
                                </button>
                                <button
                                    className="btn btn-primary"
                                    style={{
                                        padding: '8px 24px',
                                        fontWeight: '600',
                                        background: '#007bff',
                                        border: 'none'
                                    }}
                                >
                                    Save Allocations
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}



            <div className="branches-page">
                <div className="d-flex justify-content-between pb-3" style={{ borderBottom: '1px solid #e9ecef' }}>
                    <div style={{ fontSize: '20px' }}>
                        Material Transfer
                    </div>
                    <div>
                        <div className="row">
                            <div className='col-4'>
                                <label className="form-label my-auto">Date</label>
                            </div>
                            <div className='col-8'>
                                <input
                                    type="date"
                                    className="form-control form-control-sm py-1 px-2"
                                    style={{ border: '1px solid #ced4da' }}
                                />
                            </div>
                        </div>
                    </div>
                </div>


                {/* Header Form Section */}
                <div className="row mt-3 company-form" style={{ marginBottom: '10px', borderBottom: '1px solid #e9ecef', paddingBottom: '10px' }}>
                    <div className='col-3 mb-2'>
                        <div className="row">
                            <div className='col-5 my-auto'>
                                <label className="form-label">Track From</label>
                            </div>
                            <div className='col-7'>
                                <select
                                    className="form-control form-control-sm"
                                    style={{ border: '1px solid #ced4da' }}
                                >
                                    <option>Not Applicable</option>
                                    <option>Option 1</option>
                                    <option>Option 2</option>
                                    <option>Option 3</option>
                                </select>
                            </div>
                        </div>
                    </div>
                    <div className='col-3 mb-2'></div>
                    <div className='col-3 mb-2'></div>
                    <div className='col-3 mb-2'></div>

                    <div className='col-3 mb-2'>
                        <div className="row">
                            <div className='col-5 my-auto'>
                                <label className="form-label">DOC No.</label>
                            </div>
                            <div className='col-7'>
                                <select
                                    className="form-control form-control-sm"
                                    style={{ border: '1px solid #ced4da' }}
                                >
                                    <option>End Of List</option>
                                    <option>Option 1</option>
                                    <option>Option 2</option>
                                    <option>Option 3</option>
                                </select>
                            </div>
                        </div>
                    </div>
                    <div className='col-3 mb-2'>
                        <div className="row">
                            <div className='col-5 my-auto'>
                                <label className="form-label">DOC Date</label>
                            </div>
                            <div className='col-7'>
                                <input
                                    type="date"
                                    className="form-control form-control-sm"
                                    style={{ border: '1px solid #ced4da' }}
                                />
                            </div>
                        </div>
                    </div>
                    <div className='col-3'></div>
                    <div className='col-3'></div>
                    <div className='col-3'></div>
                    <div className='col-3'></div>
                    <div className='col-3'></div>
                    <div className='col-3'></div>
                    <div className='col-3'>
                        <div className="row">
                            <div className='col-5 my-auto'>
                                <label className="form-label">Party A/c Name</label>
                            </div>
                            <div className='col-7'>
                                <select
                                    className="form-control form-control-sm"
                                    style={{ border: '1px solid #ced4da' }}
                                >
                                    <option>Select Party</option>
                                    <option>Party 1</option>
                                    <option>Party 2</option>
                                    <option>Party 3</option>
                                </select>
                            </div>
                        </div>
                    </div>
                    <div className='col-3 mb-2 d-flex'>
                        <button
                            className="btn btn-primary me-2 py-1 px-2"
                            onClick={openOrderDetailsDialog}
                        >
                            Order Details
                        </button>
                        {/* <button
                            className="btn btn-primary me-2 py-1 px-2"
                            onClick={openPartyDetailsDialog}
                        >
                            Party Details
                        </button> */}
                    </div>
                    <div className='col-3 mb-2'></div>
                    <div className='col-3 mb-2'></div>
                    <div className='col-3 mb-2'>
                        <div className="row">
                            <div className='col-5 my-auto'>
                                <label className="form-label">Destination Godown</label>
                            </div>
                            <div className='col-7'>
                                <select
                                    className="form-control form-control-sm"
                                    style={{ border: '1px solid #ced4da' }}
                                >
                                    <option>Select Ledger</option>
                                    <option>Ledger 1</option>
                                    <option>Ledger 2</option>
                                    <option>Ledger 3</option>
                                </select>
                            </div>
                        </div>
                    </div>
                    <div className='col-3 mb-2 offset-3'>
                        <div className="row">
                            <div className='col-5 my-auto'>
                                <label className="form-label">Starting Date</label>
                            </div>
                            <div className='col-7'>
                                <input
                                    type="date"
                                    className="form-control form-control-sm"
                                    style={{ border: '1px solid #ced4da' }}
                                />
                            </div>
                        </div>
                    </div>
                    <div className='col-3 mb-2'>
                        <div className="row">
                            <div className='col-5 my-auto'>
                                <label className="form-label">Target Date</label>
                            </div>
                            <div className='col-7'>
                                <input
                                    type="date"
                                    className="form-control form-control-sm"
                                    style={{ border: '1px solid #ced4da' }}
                                />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Enhanced Table as per image */}
                <div className='row mt-4'>
                    <div className='col-12'>
                        <div className="table-responsive">
                            <table className="table" style={{
                                borderRadius: '8px',
                                overflow: 'hidden'
                            }}>
                                <thead>
                                    <tr style={{
                                        backgroundColor: '#007bff',
                                        color: 'white',
                                        textAlign: 'center'
                                    }}>
                                        <th className="bg-light" rowSpan="2" style={{
                                            border: '1px solid #dee2e6',
                                            padding: '15px',
                                            fontWeight: '600',
                                            verticalAlign: 'middle'
                                        }}>
                                            Name of Item
                                        </th>
                                        <th className="bg-light" colSpan="1" style={{
                                            border: '1px solid #dee2e6',
                                            padding: '15px',
                                            fontWeight: '600',
                                        }}>
                                            Quantity
                                        </th>
                                        <th className="bg-light" rowSpan="2" style={{
                                            border: '1px solid #dee2e6',
                                            padding: '15px',
                                            fontWeight: '600',
                                            verticalAlign: 'middle'
                                        }}>
                                            Rate
                                        </th>
                                        <th className="bg-light" rowSpan="2" style={{
                                            border: '1px solid #dee2e6',
                                            padding: '15px',
                                            fontWeight: '600',
                                            verticalAlign: 'middle'
                                        }}>
                                            Amount
                                        </th>
                                        <th className="bg-light" rowSpan="2" style={{
                                            border: '1px solid #dee2e6',
                                            padding: '15px',
                                            fontWeight: '600',
                                            verticalAlign: 'middle'
                                        }}>
                                            Action
                                        </th>
                                    </tr>

                                </thead>
                                <tbody>
                                    {tableData.map((row, index) => (
                                        <tr key={index} style={{
                                            backgroundColor: index % 2 === 0 ? '#f8f9fa' : 'white',
                                            textAlign: 'center'
                                        }}>
                                            <td style={{
                                                border: '1px solid #dee2e6',
                                                padding: '12px'
                                            }}>
                                                <select
                                                    className="form-control form-control-sm name-of-item"
                                                    style={{ border: '1px solid #ced4da' }}
                                                    value={row.nameOfItem}
                                                    onChange={(e) => handleItemSelect(index, e.target.value)}
                                                >
                                                    <option value="">Select Item</option>
                                                    <option value="SMA Wire 150mm">SMA Wire 150mm</option>
                                                    <option value="Copper Wire 200mm">Copper Wire 200mm</option>
                                                    <option value="Fiber Optic Cable">Fiber Optic Cable</option>
                                                    <option value="Network Switch">Network Switch</option>
                                                    <option value="Router Device">Router Device</option>
                                                </select>
                                            </td>
                                            <td style={{
                                                border: '1px solid #dee2e6',
                                                padding: '12px'
                                            }}>
                                                <input
                                                    type="text"
                                                    className="form-control form-control-sm"
                                                    // value={row.approvedBilled}
                                                    onChange={(e) => handleTableDataChange(index, 'approvedBilled', e.target.value)}

                                                    style={{
                                                        border: '1px solid #ced4da',
                                                        textAlign: 'center'
                                                    }}
                                                />
                                            </td>
                                            <td style={{
                                                border: '1px solid #dee2e6',
                                                padding: '12px'
                                            }}>
                                                <input
                                                    type="text"
                                                    className="form-control form-control-sm"
                                                    value={row.reject}
                                                    onChange={(e) => handleTableDataChange(index, 'reject', e.target.value)}

                                                    style={{
                                                        border: '1px solid #ced4da',
                                                        textAlign: 'center'
                                                    }}
                                                />
                                            </td>
                                            <td style={{
                                                border: '1px solid #dee2e6',
                                                padding: '12px'
                                            }}>
                                                <input
                                                    type="text"
                                                    className="form-control form-control-sm"
                                                    value={row.reject}
                                                    onChange={(e) => handleTableDataChange(index, 'reject', e.target.value)}

                                                    style={{
                                                        border: '1px solid #ced4da',
                                                        textAlign: 'center'
                                                    }}
                                                />
                                            </td>
                                            <td className="d-flex justify-content-between" style={{
                                                border: '1px solid #dee2e6',
                                                padding: '12px'
                                            }}>
                                                <Button
                                                    variant="outline-danger"
                                                    size="sm"
                                                    onClick={() => removeRow(index)}
                                                    disabled={tableData.length === 1}
                                                >
                                                    <i className="fas fa-trash"></i>
                                                </Button>
                                                <Button
                                                    variant="primary"
                                                    size="sm"
                                                    onClick={addNewRow}
                                                >
                                                    <i className="fas fa-plus"></i>
                                                </Button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>

                {/* Footer Buttons */}
                <div className="d-flex justify-content-between mt-5 pt-3" style={{ borderTop: '2px solid #e9ecef' }}>
                    <button
                        className="btn btn-outline-secondary"
                        onClick={closeSecondDialog}
                        style={{
                            padding: '8px 25px',
                            fontWeight: '600'
                        }}
                    >
                        ← Back
                    </button>
                    <div className="d-flex">
                        <button
                            className="btn btn-outline-secondary me-3"
                            onClick={closeDialog}
                            style={{
                                padding: '8px 25px',
                                fontWeight: '600'
                            }}
                        >
                            Cancel
                        </button>
                        <button
                            className="btn btn-primary"
                            onClick={addupdate}
                            style={{
                                padding: '8px 30px',
                                fontWeight: '600',
                                background: '#007bff',
                                border: 'none'
                            }}
                        >
                            Save
                        </button>
                    </div>
                </div>
            </div>
        </>
    )
}
