import React, { useState, useEffect } from "react";
import "../Settings/Branches.css";
import { BASE_URL } from "../../api/common";
import { Button } from "react-bootstrap";

const GRN = () => {
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
            nameOfItem: "SMA Wire 150mm",
            quantityActual: "50 PCS",
            approvedBilled: "50 PCS",
            reject: ""
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
        setTableData(updatedData);
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

    // Remove row from table
    const removeRow = (index) => {
        if (tableData.length > 1) {
            const updatedData = tableData.filter((_, i) => i !== index);
            setTableData(updatedData);
        }
    };

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

                            <div className="d-flex justify-content-end mt-3">
                                <button
                                    className="btn btn-secondary me-2"
                                    onClick={closeDialog}
                                >
                                    Cancel
                                </button>
                                <button
                                    className="btn btn-primary"
                                    onClick={addupdate}
                                >
                                    Save
                                </button>
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
                            minWidth: '1300px',
                            maxWidth: '95vw',
                            maxHeight: '95vh',
                            overflow: 'auto',
                            boxShadow: '0 10px 30px rgba(0, 0, 0, 0.3)',
                        }}
                    >
                        <div
                            className="d-flex justify-content-between pb-3"
                            style={{
                                borderBottom: '1px solid #eee',
                                marginBottom: '25px',
                                alignItems: 'center'
                            }}
                        >
                            <div style={{
                                fontSize: '20px'
                            }}>
                                GRN - Goods Receipt Note
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

                        <div className="dialog-body">
                            {/* Header Form Section */}
                            <div className="row mt-3 company-form" style={{ marginBottom: '10px', borderBottom: '1px solid #e9ecef', paddingBottom: '10px' }}>
                                <div className='col-4 mb-3'>
                                    <div className='row'>
                                        <div className='col-5 my-auto'>
                                            <label className="form-label">GRN Service No.</label>
                                        </div>
                                        <div className='col-7'>
                                            <input
                                                type="text"
                                                className="form-control form-control-sm"
                                                style={{ border: '1px solid #ced4da' }}
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className='col-4 mb-3'>
                                    <div className="row">
                                        <div className='col-5 my-auto'>
                                            <label className="form-label">Reference No</label>
                                        </div>
                                        <div className='col-7'>
                                            <input
                                                type="text"
                                                className="form-control form-control-sm"
                                                style={{ border: '1px solid #ced4da' }}
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className='col-4 mb-3'>
                                    <div className="row">
                                        <div className='col-5 my-auto'>
                                            <label className="form-label">Date</label>
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
                                <div className='col-4 mb-3'>
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
                                <div className='col-4 mb-3'>
                                    <div className="row">
                                        <div className='col-5 my-auto'>
                                            <label className="form-label">Purchase Ledger</label>
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
                                                    <th className="bg-light" colSpan="2" style={{
                                                        border: '1px solid #dee2e6',
                                                        padding: '0px 12px',
                                                        fontWeight: '600',
                                                        textAlign: 'center'
                                                    }}>
                                                        Quantity
                                                        <div>
                                                            <tr style={{ backgroundColor: '#e3f2fd', textAlign: 'center', width: '100%' }}>
                                                                <th className="bg-light" style={{ border: '1px solid #dee2e6', padding: '0px 12px', fontWeight: '600', width: '24%', textAlign: 'center' }}>
                                                                    Actual
                                                                </th>
                                                                <th className="bg-light" style={{ border: '1px solid #dee2e6', padding: '0px 12px', fontWeight: '600', width: '24%', textAlign: 'center' }}>
                                                                    Approved Billed
                                                                </th>
                                                            </tr>
                                                        </div>
                                                    </th>
                                                    <th className="bg-light" rowSpan="2" style={{
                                                        border: '1px solid #dee2e6',
                                                        padding: '15px',
                                                        fontWeight: '600',
                                                        verticalAlign: 'middle'
                                                    }}>
                                                        Reject
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
                                                            <input
                                                                type="text"
                                                                className="form-control form-control-sm"
                                                                value={row.nameOfItem}
                                                                onChange={(e) => handleTableDataChange(index, 'nameOfItem', e.target.value)}
                                                                placeholder="Enter item name"
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
                                                                value={row.quantityActual}
                                                                onChange={(e) => handleTableDataChange(index, 'quantityActual', e.target.value)}
                                                                placeholder="Enter quantity"
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
                                                                value={row.approvedBilled}
                                                                onChange={(e) => handleTableDataChange(index, 'approvedBilled', e.target.value)}
                                                                placeholder="Enter approved billed"
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
                                                                placeholder="Enter reject"
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
                                        // borderRadius: '25px',
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
                                            // borderRadius: '25px',
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
                                            // borderRadius: '25px',
                                            padding: '8px 30px',
                                            fontWeight: '600',
                                            background: '#007bff',
                                            border: 'none'
                                        }}
                                    >
                                        Save GRN
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
                    <h2>GRN Management</h2>
                    <button onClick={openDialog} className="btn btn-primary new-btn">
                        + Create New GRN
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

export default GRN;