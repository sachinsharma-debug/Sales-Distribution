import React, { useState, useEffect } from "react";
import "../Settings/Branches.css";
import { BASE_URL } from "../../api/common";
import { Button } from "react-bootstrap";

const Indent = () => {
    // Search filters state
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
    const [selectedName, setSelectedName] = useState("");
    const [SalesEnquiryData, setSalesEnquiryData] = useState([]);

    // Table data state
    const [tableData, setTableData] = useState([
        {
            slNo: "1",
            itemDescription: "0.1/275vAC",
            uom: "PCS",
            indentQty: "12",
            estimatedRate: "12",
            estimatedValue: "144.00"
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
        setSelectedName("");
    }

    function openSecondDialog() {
        setSecondDialogOpen(true);
    }

    function closeSecondDialog() {
        setSecondDialogOpen(false);
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

    // Handle table data changes
    const handleTableDataChange = (index, field, value) => {
        const updatedData = [...tableData];
        updatedData[index] = {
            ...updatedData[index],
            [field]: value
        };

        // Auto-calculate estimated value if quantity or rate changes
        if (field === 'indentQty' || field === 'estimatedRate') {
            const qty = field === 'indentQty' ? value : updatedData[index].indentQty;
            const rate = field === 'estimatedRate' ? value : updatedData[index].estimatedRate;
            const calculatedValue = (parseFloat(qty) || 0) * (parseFloat(rate) || 0);
            updatedData[index].estimatedValue = calculatedValue.toFixed(2);
        }

        setTableData(updatedData);
    };

    // Add new row to table
    const addNewRow = () => {
        const newSlNo = (tableData.length + 1).toString();
        setTableData([
            ...tableData,
            {
                slNo: newSlNo,
                itemDescription: "",
                uom: "",
                indentQty: "",
                estimatedRate: "",
                estimatedValue: "0.00"
            }
        ]);
    };

    // Remove row from table
    const removeRow = (index) => {
        if (tableData.length > 1) {
            const updatedData = tableData.filter((_, i) => i !== index);
            // Update serial numbers
            const renumberedData = updatedData.map((item, i) => ({
                ...item,
                slNo: (i + 1).toString()
            }));
            setTableData(renumberedData);
        }
    };

    // Calculate totals
    const calculateTotals = () => {
        const totalQty = tableData.reduce((sum, row) => sum + (parseFloat(row.indentQty) || 0), 0);
        const totalValue = tableData.reduce((sum, row) => sum + (parseFloat(row.estimatedValue) || 0), 0);
        return { totalQty, totalValue };
    };

    const { totalQty, totalValue } = calculateTotals();

    // ESC key handler for dialogs
    useEffect(() => {
        const handleEscKey = (event) => {
            if (event.keyCode === 27) {
                if (secondDialogOpen) {
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
    }, [dialogOpen, secondDialogOpen]);

    return (
        <>
            {/* First Dialog - Voucher Type */}
            {dialogOpen && (
                <div
                    className="dialog-backdrop"
                    onClick={handleBackdropClick}
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
                        zIndex: 1000,
                    }}
                >
                    <div
                        className="dialog-content"
                        style={{
                            background: 'white',
                            borderRadius: '8px',
                            padding: '20px',
                            minWidth: '400px',
                            maxWidth: '30vw',
                            maxHeight: '90vh',
                            overflow: 'auto',
                            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                        }}
                    >
                        <div
                            className="d-flex justify-content-between pb-2"
                            style={{ borderBottom: '1px solid #eee', marginBottom: '20px' }}
                        >
                            <div style={{ fontSize: 20, fontWeight: 'bold' }}>Voucher Type</div>
                            <button
                                onClick={closeDialog}
                                style={{
                                    background: 'none',
                                    border: 'none',
                                    fontSize: '18px',
                                    cursor: 'pointer',
                                    color: '#666'
                                }}
                            >
                                ×
                            </button>
                        </div>

                        <div className="dialog-body">
                            <div className="form-group">
                                <div className="row">
                                    <div className="col-2 my-auto">
                                        <label className="my-auto">Name:</label>
                                    </div>
                                    <div className="col-10">
                                        <select
                                            className="form-control"
                                            value={formobj.BranchName}
                                            onChange={handleNameSelect}
                                        >
                                            <option value="">Select Name</option>
                                            <option value="Option1">Option 1</option>
                                            <option value="Option2">Option 2</option>
                                            <option value="Option3">Option 3</option>
                                            <option value="Option4">Option 4</option>
                                            <option value="Option5">Option 5</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Second Dialog - Opens when name is selected */}
            {secondDialogOpen && (
                <div
                    className="dialog-backdrop"
                    onClick={handleSecondBackdropClick}
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
                        zIndex: 1001,
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
                            maxHeight: '95vh',
                            overflow: 'auto',
                            boxShadow: '0 10px 30px rgba(0, 0, 0, 0.3)',
                        }}
                    >
                        <div className="d-flex justify-content-between pb-2 mb-3"
                            style={{
                                borderBottom: '1px solid #eee',
                                alignItems: 'center'
                            }}
                        >
                            <div style={{
                                fontSize: '20px'
                            }}>
                                Create Indent
                            </div>
                            <button
                                onClick={closeSecondDialog}
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

                        {/* Header Information */}
                        <div className="row company-form pb-1">
                            <div className="col-4">
                                <div className='row'>
                                    <div className='col-6 my-auto'>
                                        <label className="form-label">Indent Voucher No.</label>
                                    </div>
                                    <div className='col-6'>
                                        <input
                                            type="text"
                                            className="form-control form-control-sm"
                                            style={{ border: '1px solid #ced4da' }}
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="col-4 offset-4">
                                <div className="row">
                                    <div className='col-3 my-auto offset-3'>
                                        <label className="form-label">Date</label>
                                    </div>
                                    <div className='col-6'>
                                        <input
                                            type="date"
                                            className="form-control form-control-sm"
                                            style={{ border: '1px solid #ced4da' }}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="row company-form pb-3"
                            style={{
                                borderBottom: '1px solid #eee',
                                marginBottom: '25px',
                                alignItems: 'center'
                            }}
                        >
                            <div className="col-4">
                                <div className='row'>
                                    <div className='col-6 my-auto'>
                                        <label className="form-label">Sub Division</label>
                                    </div>
                                    <div className='col-6'>
                                        <input
                                            type="text"
                                            className="form-control form-control-sm"
                                            style={{ border: '1px solid #ced4da' }}
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="col-4 offset-4">
                                <div className="row">
                                    <div className='col-3 my-auto offset-3'>
                                        <label className="form-label">Project</label>
                                    </div>
                                    <div className='col-6'>
                                        <input
                                            type="text"
                                            className="form-control form-control-sm"
                                            style={{ border: '1px solid #ced4da' }}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="dialog-body">
                            {/* Header Form Section */}
                            <div className="row mt-3 company-form" style={{ marginBottom: '10px', borderBottom: '1px solid #e9ecef', paddingBottom: '10px' }}>

                                <div className='col-6 mb-2'>
                                    <div className="row">
                                        <div className='col-5 my-auto'>
                                            <label className="form-label">Indent Category</label>
                                        </div>
                                        <div className='col-7'>
                                            <input
                                                type="text"
                                                className="form-control form-control-sm"
                                                style={{ border: '1px solid #ced4da' }}
                                            />
                                        </div>
                                    </div>

                                    <div className="row">
                                        <div className='col-5 my-auto'>
                                            <label className="form-label">Indent Type</label>
                                        </div>
                                        <div className='col-7'>
                                            <input
                                                type="text"
                                                className="form-control form-control-sm"
                                                style={{ border: '1px solid #ced4da' }}
                                            />
                                        </div>
                                    </div>

                                    <div className="row">
                                        <div className='col-5 my-auto'>
                                            <label className="form-label">Indent Sub Type</label>
                                        </div>
                                        <div className='col-7'>
                                            <select
                                                className="form-control form-control-sm"
                                                style={{ border: '1px solid #ced4da' }}
                                            >
                                                <option value="">Not Applicable</option>
                                                <option value="category1">Goods</option>
                                                <option value="category2">Goods & Services</option>
                                            </select>
                                        </div>
                                    </div>

                                    <div className="row">
                                        <div className='col-5 my-auto'>
                                            <label className="form-label">Branch</label>
                                        </div>
                                        <div className='col-7'>
                                            <select
                                                className="form-control form-control-sm"
                                                style={{ border: '1px solid #ced4da' }}
                                            >
                                                <option value="">End Of List</option>
                                                <option value="category1">Head Office</option>
                                                <option value="category2">Branch Office</option>
                                            </select>
                                        </div>
                                    </div>

                                    <div className="row">
                                        <div className='col-5 my-auto'>
                                            <label className="form-label">Division</label>
                                        </div>
                                        <div className='col-7'>
                                            <select
                                                className="form-control form-control-sm"
                                                style={{ border: '1px solid #ced4da' }}
                                            >
                                                <option value="">Not Applicable</option>
                                            </select>
                                        </div>
                                    </div>

                                    <div className="row">
                                        <div className='col-5 my-auto'>
                                            <label className="form-label">Department Name</label>
                                        </div>
                                        <div className='col-7'>
                                            <select
                                                className="form-control form-control-sm"
                                                style={{ border: '1px solid #ced4da' }}
                                            >
                                                <option value="">Not Applicable</option>
                                            </select>
                                        </div>
                                    </div>

                                    <div className="row">
                                        <div className='col-5 my-auto'>
                                            <label className="form-label">HOD</label>
                                        </div>
                                        <div className='col-7'>
                                            <select
                                                className="form-control form-control-sm"
                                                style={{ border: '1px solid #ced4da' }}
                                            >
                                                <option value="">Not Applicable</option>
                                            </select>
                                        </div>
                                    </div>

                                    <div className="row">
                                        <div className='col-5 my-auto'>
                                            <label className="form-label">Request By</label>
                                        </div>
                                        <div className='col-7'>
                                            <select
                                                className="form-control form-control-sm"
                                                style={{ border: '1px solid #ced4da' }}
                                            >
                                                <option value="">Not Applicable</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>

                                <div className='col-6 mb-2'>
                                    <div className="row">
                                        <div className='col-5 my-auto'>
                                            <label className="form-label">Mfg Plan No.</label>
                                        </div>
                                        <div className='col-7'>
                                            <input
                                                type="text"
                                                className="form-control form-control-sm"
                                                style={{ border: '1px solid #ced4da' }}
                                            />
                                        </div>
                                    </div>

                                    <div className="row">
                                        <div className='col-5 my-auto'>
                                            <label className="form-label">Mfg Plan Date</label>
                                        </div>
                                        <div className='col-7'>
                                            <input
                                                type="text"
                                                className="form-control form-control-sm"
                                                style={{ border: '1px solid #ced4da' }}
                                            />
                                        </div>
                                    </div>

                                    <div className="row">
                                        <div className='col-5 my-auto'>
                                            <label className="form-label">Dept Indent No.</label>
                                        </div>
                                        <div className='col-7'>
                                            <input
                                                type="text"
                                                className="form-control form-control-sm"
                                                style={{ border: '1px solid #ced4da' }}
                                            />
                                        </div>
                                    </div>

                                    <div className="row">
                                        <div className='col-5 my-auto'>
                                            <label className="form-label">Dept Indent Date</label>
                                        </div>
                                        <div className='col-7'>
                                            <input
                                                type="text"
                                                className="form-control form-control-sm"
                                                style={{ border: '1px solid #ced4da' }}
                                            />
                                        </div>
                                    </div>

                                    <div className="row">
                                        <div className='col-5 my-auto'>
                                            <label className="form-label">Target Date</label>
                                        </div>
                                        <div className='col-7'>
                                            <input
                                                type="text"
                                                className="form-control form-control-sm"
                                                style={{ border: '1px solid #ced4da' }}
                                            />
                                        </div>
                                    </div>

                                    <div className="row">
                                        <div className='col-5 my-auto'>
                                            <label className="form-label">Supplier Name</label>
                                        </div>
                                        <div className='col-7'>
                                            <select
                                                className="form-control form-control-sm"
                                                style={{ border: '1px solid #ced4da' }}
                                            >
                                                <option value="">Not Applicable</option>
                                            </select>
                                        </div>
                                    </div>

                                    <div className="row">
                                        <div className='col-5 my-auto'>
                                            <label className="form-label">Payment Terms</label>
                                        </div>
                                        <div className='col-7'>
                                            <select
                                                className="form-control form-control-sm"
                                                style={{ border: '1px solid #ced4da' }}
                                            >
                                                <option value="">Not Applicable</option>
                                            </select>
                                        </div>
                                    </div>

                                    <div className="row">
                                        <div className='col-5 my-auto'>
                                            <label className="form-label">Note</label>
                                        </div>
                                        <div className='col-7'>
                                            <textarea className="form-control form-control-sm" />
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Main Table - Matching the image exactly */}
                            <div className="table-container mt-4">
                                <table className="indent-table" style={{ width: '100%', borderCollapse: 'collapse', fontSize: '14px' }}>
                                    <thead>
                                        <tr>
                                            <th className="bg-light" style={{border: '1px solid #dee2e6',padding: '8px 12px',fontWeight: '600',textAlign: 'center'}}>Sl No</th>
                                            <th className="bg-light" style={{border: '1px solid #dee2e6',padding: '8px 12px',fontWeight: '600',textAlign: 'center'}}>Item / Services Description</th>
                                            <th className="bg-light" style={{border: '1px solid #dee2e6',padding: '8px 12px',fontWeight: '600',textAlign: 'center'}}>UOM</th>
                                            <th className="bg-light" style={{border: '1px solid #dee2e6',padding: '8px 12px',fontWeight: '600',textAlign: 'center'}}>Indent Qty</th>
                                            <th className="bg-light" style={{border: '1px solid #dee2e6',padding: '8px 12px',fontWeight: '600',textAlign: 'center'}}>Estimated Rate</th>
                                            <th className="bg-light" style={{border: '1px solid #dee2e6',padding: '8px 12px',fontWeight: '600',textAlign: 'center'}}>Estimated Value</th>
                                            <th className="bg-light" style={{border: '1px solid #dee2e6',padding: '8px 12px',fontWeight: '600',textAlign: 'center'}}>Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {tableData.map((row, index) => (
                                            <tr key={index} style={{
                                                        backgroundColor: index % 2 === 0 ? '#f8f9fa' : 'white',
                                                        textAlign: 'center'
                                                    }}>
                                                <td style={{border: '1px solid #dee2e6',padding: '12px'}}>
                                                    {row.slNo}
                                                </td>
                                                <td style={{border: '1px solid #dee2e6',padding: '12px'}}>
                                                    <input
                                                        type="text"
                                                        className="form-control form-control-sm"
                                                        style={{
                                                                    border: '1px solid #ced4da',
                                                                    textAlign: 'center'
                                                                }}
                                                        value={row.itemDescription}
                                                        onChange={(e) => handleTableDataChange(index, 'itemDescription', e.target.value)}
                                                    />
                                                </td>
                                                <td style={{border: '1px solid #dee2e6',padding: '12px'}}>
                                                    <input
                                                        type="text"
                                                        className="form-control form-control-sm"
                                                        style={{
                                                                    border: '1px solid #ced4da',
                                                                    textAlign: 'center'
                                                                }}
                                                        value={row.uom}
                                                        onChange={(e) => handleTableDataChange(index, 'uom', e.target.value)}
                                                    />
                                                </td>
                                                <td style={{border: '1px solid #dee2e6',padding: '12px'}}>
                                                    <input
                                                        type="number"
                                                        className="form-control form-control-sm"
                                                        style={{
                                                                    border: '1px solid #ced4da',
                                                                    textAlign: 'center'
                                                                }}
                                                        value={row.indentQty}
                                                        onChange={(e) => handleTableDataChange(index, 'indentQty', e.target.value)}
                                                    />
                                                </td>
                                                <td style={{border: '1px solid #dee2e6',padding: '12px'}}>
                                                    <input
                                                        type="number"
                                                        className="form-control form-control-sm"
                                                        style={{
                                                                    border: '1px solid #ced4da',
                                                                    textAlign: 'center'
                                                                }}
                                                        value={row.estimatedRate}
                                                        onChange={(e) => handleTableDataChange(index, 'estimatedRate', e.target.value)}
                                                    />
                                                </td>
                                                <td style={{border: '1px solid #dee2e6',padding: '12px'}}>
                                                    {row.estimatedValue}
                                                </td>
                                                <td style={{ border: '1px solid #dee2e6', padding: '12px'}}>
                                                    <div className="d-flex">
                                                        <button
                                                            className="btn btn-outline-primary btn-sm py-1 px-2"
                                                            onClick={addNewRow}
                                                            style={{ marginRight: '10px' }}
                                                        >
                                                            + 
                                                        </button>
                                                        {tableData.length > 1 && (
                                                            <button
                                                                className="btn btn-outline-danger btn-sm py-1 px-2"
                                                                onClick={() => removeRow(tableData.length - 1)}
                                                            >
                                                                - 
                                                            </button>
                                                        )}
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                        {/* Totals Row */}
                                        <tr>
                                            <td colSpan="3" style={{ border: '1px solid #dee2e6', padding: '12px', textAlign: 'left', fontWeight: 'bold' }}>
                                                Instructions:
                                            </td>
                                            <td style={{ border: '1px solid #dee2e6', padding: '12px', textAlign: 'center', fontWeight: 'bold' }}>
                                                {totalQty}
                                            </td>
                                            <td style={{ border: '1px solid #dee2e6', padding: '12px', textAlign: 'center', fontWeight: 'bold' }}>
                                                Totals
                                            </td>
                                            <td style={{ border: '1px solid #dee2e6', padding: '12px', textAlign: 'right', fontWeight: 'bold' }}>
                                                {totalValue.toFixed(2)}
                                            </td>
                                            <td style={{ border: '1px solid #dee2e6', padding: '12px' }}></td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>

                            {/* Add Row Button */}


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
                                        Save Indent
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Main Page Content */}
            <div className="branches-page">
                <div className="branches-header">
                    <h2>Indent</h2>
                    <button onClick={openDialog} className="btn btn-primary new-btn">
                        + Create Indent
                    </button>
                </div>

                <div className="pagination-container">
                    <div className="entries-info">
                        <select className="entries-select">
                            <option value="15">15</option>
                            <option value="25">25</option>
                            <option value="50">50</option>
                        </select>
                        <span>entries per page</span>
                    </div>
                    <div className="pagination-info">
                        Showing 1 to {filteredSalesEnquiry.length} of {filteredSalesEnquiry.length}{" "}
                        entries
                        {filteredSalesEnquiry.length !== SalesEnquiryData.length && (
                            <span className="filtered-text">
                                {" "}
                                (filtered from {SalesEnquiryData.length} total entries)
                            </span>
                        )}
                    </div>
                    <div className="pagination">
                        <button className="page-btn active">1</button>
                        <button className="page-btn">2</button>
                        <button className="page-btn">›</button>
                        <button className="page-btn">»</button>
                    </div>
                </div>

                <div className="companies-table-container">
                    <table className="companies-table">
                        <thead>
                            <tr>
                                <th>Sales Name</th>
                                <th>Mailing Name</th>
                                <th>State</th>
                                <th>City</th>
                                <th>Mobile</th>
                                <th>Email</th>
                            </tr>
                            <tr className="search-row">
                                <th>
                                    <input
                                        type="text"
                                        className="search-input"
                                        placeholder="Search name..."
                                        value={searchFilters.name}
                                        onChange={(e) => handleSearchChange("name", e.target.value)}
                                    />
                                </th>
                                <th>
                                    <input
                                        type="text"
                                        className="search-input"
                                        placeholder="Search parent..."
                                        value={searchFilters.parentName}
                                        onChange={(e) =>
                                            handleSearchChange("parentName", e.target.value)
                                        }
                                    />
                                </th>
                                <th>
                                    <input
                                        type="text"
                                        className="search-input"
                                        placeholder="Search address..."
                                        value={searchFilters.address}
                                        onChange={(e) =>
                                            handleSearchChange("address", e.target.value)
                                        }
                                    />
                                </th>
                                <th>
                                    <input
                                        type="text"
                                        className="search-input"
                                        placeholder="Search phone..."
                                        value={searchFilters.phone}
                                        onChange={(e) => handleSearchChange("phone", e.target.value)}
                                    />
                                </th>
                                <th>
                                    <input
                                        type="text"
                                        className="search-input"
                                        placeholder="Search mobile..."
                                        value={searchFilters.mobile}
                                        onChange={(e) => handleSearchChange("mobile", e.target.value)}
                                    />
                                </th>
                                <th>
                                    <input
                                        type="text"
                                        className="search-input"
                                        placeholder="Search email..."
                                        value={searchFilters.email}
                                        onChange={(e) => handleSearchChange("email", e.target.value)}
                                    />
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredSalesEnquiry.map((branch, index) => (
                                <tr key={index}>
                                    <td>{branch.BranchName}</td>
                                    <td>{branch.MailingName}</td>
                                    <td>{branch.State}</td>
                                    <td>{branch.District}</td>
                                    <td>{branch.Mobile}</td>
                                    <td>{branch.Email}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    );
};

export default Indent;