import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom"; // ✅ Add useNavigate
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
// import "./Settings.css";

// Sample stock items data
const stockItems = [
  "0.1 Disc",
  "Raw Material A",
  "Component X",
  "Finished Product A",
  "Packaging Material",
  "Chemical Additive",
  "Steel Rod",
  "Plastic Sheet",
];

// Sample stock groups data
const stockGroups = [
  "Raw Materials",
  "Finished Goods",
  "Work in Progress",
  "Components",
  "Packaging Materials",
  "Chemicals",
  "Steel Products",
  "Plastic Products",
  "Electronic Components",
  "Hardware Items",
];

export default function QualityControl() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isParameterDialogOpen, setIsParameterDialogOpen] = useState(false);
  const [isMultiItemDialogOpen, setIsMultiItemDialogOpen] = useState(false);
  const [isMultiItemTableDialogOpen, setIsMultiItemTableDialogOpen] =
    useState(false);
  const [itemName, setItemName] = useState("");
  const [groupName, setGroupName] = useState("");
  const [selectedItem, setSelectedItem] = useState("");
  const [selectedGroup, setSelectedGroup] = useState("");

  // Dynamic grouped items state
  const [groupedItems, setGroupedItems] = useState({
    "Raw Materials": [
      { id: 1, name: "Steel Rod 10mm", under: "Raw Materials" },
      { id: 2, name: "Aluminum Sheet", under: "Raw Materials" },
    ],
    Components: [{ id: 3, name: "Air Compressor", under: "Components" }],
    "Finished Goods": [],
    "Work in Progress": [],
    "Packaging Materials": [],
    Chemicals: [],
    "Steel Products": [],
    "Plastic Products": [],
    "Electronic Components": [],
    "Hardware Items": [],
  });

  // QC Specification state
  const [qcSpecificationRows, setQCSpecificationRows] = useState([
    {
      id: 1,
      slNo: 1,
      specification: "",
      standard: "",
    },
  ]);
  const [copyQCParametersFrom, setCopyQCParametersFrom] =
    useState("Not Applicable");
  const [setPartyWiseSpecification, setSetPartyWiseSpecification] =
    useState("No");

  // Party Wise Specification state
  const [
    partyWiseSpecificationDialogOpen,
    setPartyWiseSpecificationDialogOpen,
  ] = useState(false);
  const [partyWiseSpecificationRows, setPartyWiseSpecificationRows] = useState([
    {
      id: 1,
      slNo: 1,
      partyName: "",
      setAlterSpecification: false,
    },
  ]);

  const handleUpdateItemClick = (e) => {
    e.preventDefault();
    setIsDialogOpen(true);
  };

  const handleUpdateMultiItemClick = (e) => {
    e.preventDefault();
    setIsMultiItemDialogOpen(true);
  };

  const handleDialogClose = () => {
    setIsDialogOpen(false);
    setItemName("");
  };

  const handleMultiItemDialogClose = () => {
    setIsMultiItemDialogOpen(false);
    setGroupName("");
  };

  const handleMultiItemTableDialogClose = () => {
    setIsMultiItemTableDialogOpen(false);
    setGroupName("");
    setSelectedGroup("");
  };

  const handleGroupOkClick = () => {
    if (groupName) {
      setSelectedGroup(groupName);
      setIsMultiItemDialogOpen(false);
      setIsMultiItemTableDialogOpen(true);
    }
  };

  // Add new empty row to the selected group
  const addNewRow = () => {
    if (selectedGroup) {
      const newId = Date.now();
      const newItem = {
        id: newId,
        name: "",
        under: selectedGroup,
      };

      setGroupedItems((prev) => ({
        ...prev,
        [selectedGroup]: [...(prev[selectedGroup] || []), newItem],
      }));
    }
  };

  // Update item in the table
  const updateItemInGroup = (itemId, field, value) => {
    setGroupedItems((prev) => ({
      ...prev,
      [selectedGroup]: prev[selectedGroup].map((item) =>
        item.id === itemId ? { ...item, [field]: value } : item
      ),
    }));
  };

  // Delete item from group
  const deleteItemFromGroup = (itemId) => {
    setGroupedItems((prev) => ({
      ...prev,
      [selectedGroup]: prev[selectedGroup].filter((item) => item.id !== itemId),
    }));
  };

  const handleItemSelect = (item) => {
    setItemName(item);
  };

  const handleGroupSelect = (group) => {
    setGroupName(group);
  };

  const handleOkClick = () => {
    if (itemName) {
      setSelectedItem(itemName);
      setIsDialogOpen(false);
      setIsParameterDialogOpen(true);
    }
  };

  const handleParameterDialogClose = () => {
    setIsParameterDialogOpen(false);
    setItemName("");
    setSelectedItem("");
    setQCSpecificationRows([
      {
        id: 1,
        slNo: 1,
        specification: "",
        standard: "",
      },
    ]);
    setCopyQCParametersFrom("Not Applicable");
    setSetPartyWiseSpecification("No");
  };

  // QC Specification rows handlers
  const updateQCSpecificationRow = (id, field, value) => {
    setQCSpecificationRows((prev) =>
      prev.map((row) => (row.id === id ? { ...row, [field]: value } : row))
    );
  };

  const addQCSpecificationRow = () => {
    const newRow = {
      id: qcSpecificationRows.length + 1,
      slNo: qcSpecificationRows.length + 1,
      specification: "",
      standard: "",
    };
    setQCSpecificationRows([...qcSpecificationRows, newRow]);
  };

  const deleteQCSpecificationRow = (id) => {
    setQCSpecificationRows((prev) => prev.filter((row) => row.id !== id));
  };

  // Party Wise Specification handlers
  const updatePartyWiseSpecificationRow = (id, field, value) => {
    setPartyWiseSpecificationRows((prev) =>
      prev.map((row) => (row.id === id ? { ...row, [field]: value } : row))
    );
  };

  const addPartyWiseSpecificationRow = () => {
    const newRow = {
      id: partyWiseSpecificationRows.length + 1,
      slNo: partyWiseSpecificationRows.length + 1,
      partyName: "",
      setAlterSpecification: false,
    };
    setPartyWiseSpecificationRows([...partyWiseSpecificationRows, newRow]);
  };

  const deletePartyWiseSpecificationRow = (id) => {
    setPartyWiseSpecificationRows((prev) =>
      prev.filter((row) => row.id !== id)
    );
  };
  return (
    <>
      <div className="settings-content">
        <div className="heading">Quality Control</div>
        <div className="row">
          <div className="col-3">
            <div className="simple-org-container">
              <div className="org-header">RM Inspection</div>
              <div className="org-list">
                <Link to="/rminward-inspection">
                  <div className="org-tab">RM Inward Inspection</div>
                </Link>
                <Link to="/rmsample-inspection">
                  <div className="org-tab">RM Sample Inspection</div>
                </Link>
                <Link to="/fginward-inspection">
                  <div className="org-tab">FG Inward Inspection</div>
                </Link>
                <Link to="/test-report">
                  <div className="org-tab">Test Report</div>
                </Link>
              </div>
            </div>
          </div>

          <div className="col-3">
            <div className="simple-org-container">
              <div className="org-header">Report</div>
              <div className="org-list">
                <Link to="/oc-analysis">
                  <div className="org-tab">OC Analysis</div>
                </Link>
                <Link to="/incoming-rm-inspection-register">
                  <div className="org-tab">INcoming RM Inspection Register</div>
                </Link>
                <Link to="/rejection-graph">
                  <div className="org-tab">Rejection Graph</div>
                </Link>
                <Link to="/test-report-register">
                  <div className="org-tab">TEst Report Register</div>
                </Link>
              </div>
            </div>
          </div>

          <div className="col-3">
            <div className="simple-org-container">
              <div className="org-header">Utility</div>
              <div className="org-list">
                <div
                  className="org-tab"
                  onClick={handleUpdateItemClick}
                  style={{ cursor: "pointer" }}
                >
                  Update Item
                </div>
                <div
                  className="org-tab"
                  onClick={handleUpdateMultiItemClick}
                  style={{ cursor: "pointer" }}
                >
                  Update Multi Item
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Simple Update Item Dialog */}
      {isDialogOpen && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(0,0,0,0.5)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 1000,
          }}
        >
          <div
            style={{
              backgroundColor: "white",
              width: "400px",
              border: "1px solid #ccc",
              borderRadius: "4px",
              overflow: "hidden",
            }}
          >
            {/* Header */}
            <div
              style={{
                backgroundColor: "#f0f0f0",
                padding: "10px 15px",
                borderBottom: "1px solid #ccc",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <span style={{ fontWeight: "bold" }}>Update Item</span>
              <button
                onClick={handleDialogClose}
                style={{
                  background: "none",
                  border: "none",
                  fontSize: "16px",
                  cursor: "pointer",
                }}
              >
                ✕
              </button>
            </div>

            {/* Content */}
            <div style={{ padding: "15px" }}>
              <div style={{ marginBottom: "15px" }}>
                <label
                  style={{
                    display: "block",
                    marginBottom: "5px",
                    fontWeight: "bold",
                    color: "#333",
                  }}
                >
                  Name of Item
                </label>
                <input
                  type="text"
                  value={itemName}
                  onChange={(e) => setItemName(e.target.value)}
                  style={{
                    width: "100%",
                    padding: "8px",
                    border: "1px solid #ccc",
                    borderRadius: "3px",
                    fontSize: "14px",
                    boxSizing: "border-box",
                  }}
                />
              </div>

              <div>
                <div
                  style={{
                    backgroundColor: "#4472C4",
                    color: "white",
                    padding: "8px 12px",
                    marginBottom: "5px",
                    fontWeight: "bold",
                  }}
                >
                  List of Stock Items
                </div>
                <div
                  style={{
                    border: "1px solid #ccc",
                    maxHeight: "200px",
                    overflowY: "auto",
                  }}
                >
                  {stockItems.map((item, index) => (
                    <div
                      key={index}
                      onClick={() => handleItemSelect(item)}
                      style={{
                        padding: "8px 12px",
                        borderBottom:
                          index < stockItems.length - 1
                            ? "1px solid #eee"
                            : "none",
                        cursor: "pointer",
                        backgroundColor:
                          itemName === item ? "#e3f2fd" : "white",
                      }}
                      onMouseEnter={(e) => {
                        if (itemName !== item) {
                          e.target.style.backgroundColor = "#f5f5f5";
                        }
                      }}
                      onMouseLeave={(e) => {
                        if (itemName !== item) {
                          e.target.style.backgroundColor = "white";
                        }
                      }}
                    >
                      {item}
                    </div>
                  ))}
                </div>
              </div>

              <div
                style={{
                  marginTop: "20px",
                  textAlign: "right",
                }}
              >
                <button
                  onClick={handleDialogClose}
                  style={{
                    marginRight: "10px",
                    padding: "8px 16px",
                    backgroundColor: "#6c757d",
                    color: "white",
                    border: "none",
                    borderRadius: "3px",
                    cursor: "pointer",
                  }}
                >
                  Cancel
                </button>
                <button
                  onClick={handleOkClick}
                  style={{
                    padding: "8px 16px",
                    backgroundColor: "#007bff",
                    color: "white",
                    border: "none",
                    borderRadius: "3px",
                    cursor: "pointer",
                  }}
                >
                  OK
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Update Multi Item Dialog */}
      {isMultiItemDialogOpen && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(0,0,0,0.5)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 1000,
          }}
        >
          <div
            style={{
              backgroundColor: "white",
              width: "400px",
              border: "1px solid #ccc",
              borderRadius: "4px",
              overflow: "hidden",
            }}
          >
            {/* Header */}
            <div
              style={{
                backgroundColor: "#f0f0f0",
                padding: "10px 15px",
                borderBottom: "1px solid #ccc",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <span style={{ fontWeight: "bold" }}>Update Multi Item</span>
              <button
                onClick={handleMultiItemDialogClose}
                style={{
                  background: "none",
                  border: "none",
                  fontSize: "16px",
                  cursor: "pointer",
                }}
              >
                ✕
              </button>
            </div>

            {/* Content */}
            <div style={{ padding: "15px" }}>
              <div style={{ marginBottom: "15px" }}>
                <label
                  style={{
                    display: "block",
                    marginBottom: "5px",
                    fontWeight: "bold",
                    color: "#333",
                  }}
                >
                  Name of Group
                </label>
                <input
                  type="text"
                  value={groupName}
                  onChange={(e) => setGroupName(e.target.value)}
                  style={{
                    width: "100%",
                    padding: "8px",
                    border: "1px solid #ccc",
                    borderRadius: "3px",
                    fontSize: "14px",
                    boxSizing: "border-box",
                  }}
                />
              </div>

              <div>
                <div
                  style={{
                    backgroundColor: "#4472C4",
                    color: "white",
                    padding: "8px 12px",
                    marginBottom: "5px",
                    fontWeight: "bold",
                  }}
                >
                  List of Stock Groups
                </div>
                <div
                  style={{
                    border: "1px solid #ccc",
                    maxHeight: "200px",
                    overflowY: "auto",
                  }}
                >
                  {stockGroups.map((group, index) => (
                    <div
                      key={index}
                      onClick={() => handleGroupSelect(group)}
                      style={{
                        padding: "8px 12px",
                        borderBottom:
                          index < stockGroups.length - 1
                            ? "1px solid #eee"
                            : "none",
                        cursor: "pointer",
                        backgroundColor:
                          groupName === group ? "#e3f2fd" : "white",
                      }}
                      onMouseEnter={(e) => {
                        if (groupName !== group) {
                          e.target.style.backgroundColor = "#f5f5f5";
                        }
                      }}
                      onMouseLeave={(e) => {
                        if (groupName !== group) {
                          e.target.style.backgroundColor = "white";
                        }
                      }}
                    >
                      {group}
                    </div>
                  ))}
                </div>
              </div>

              <div
                style={{
                  marginTop: "20px",
                  textAlign: "right",
                }}
              >
                <button
                  onClick={handleMultiItemDialogClose}
                  style={{
                    marginRight: "10px",
                    padding: "8px 16px",
                    backgroundColor: "#6c757d",
                    color: "white",
                    border: "none",
                    borderRadius: "3px",
                    cursor: "pointer",
                  }}
                >
                  Cancel
                </button>
                <button
                  onClick={handleGroupOkClick}
                  style={{
                    padding: "8px 16px",
                    backgroundColor: "#007bff",
                    color: "white",
                    border: "none",
                    borderRadius: "3px",
                    cursor: "pointer",
                  }}
                >
                  OK
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Multi Item Table Dialog */}
      <Dialog
        open={isMultiItemTableDialogOpen}
        onClose={handleMultiItemTableDialogClose}
        maxWidth="xl"
        fullWidth
      >
        <DialogTitle>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <span>Update Multi Item</span>
            <span style={{ fontSize: "14px", fontWeight: "normal" }}>
              1-Apr-24 to 20-Apr-24
            </span>
          </div>
        </DialogTitle>
        <DialogContent>
          <div className="container-fluid">
            {/* Under Group Section */}
            <div className="row mb-3">
              <div className="col-12 d-flex align-items-center">
                <label style={{ fontWeight: "bold", marginRight: "10px" }}>
                  Under Group:
                </label>
                <span style={{ color: "#007bff", fontWeight: "500" }}>
                  {selectedGroup}
                </span>
              </div>
            </div>

            {/* Items Table */}
            <div className="row">
              <div className="col-12">
                <div className="d-flex justify-content-end align-items-center mb-3">
                  <button
                    type="button"
                    className="btn btn-primary btn-sm"
                    onClick={addNewRow}
                  >
                    Add Row
                  </button>
                </div>

                <table className="table table-bordered">
                  <thead style={{ backgroundColor: "#f8f9fa" }}>
                    <tr>
                      <th style={{ width: "8%" }}>S.No.</th>
                      <th style={{ width: "35%" }}>Name of Item</th>
                      <th style={{ width: "26%" }}>Under</th>
                      <th style={{ width: "31%" }}>QC Testing</th>
                    </tr>
                  </thead>
                  <tbody>
                    {(groupedItems[selectedGroup] || []).map((item, index) => (
                      <tr key={item.id}>
                        <td className="text-center">{index + 1}</td>
                        <td>
                          <input
                            type="text"
                            className="form-control form-control-sm"
                            value={item.name}
                            onChange={(e) =>
                              updateItemInGroup(item.id, "name", e.target.value)
                            }
                            placeholder="Enter item name"
                            style={{
                              border: "none",
                              background: "transparent",
                            }}
                          />
                        </td>
                        <td>
                          <input
                            type="text"
                            className="form-control form-control-sm"
                            value={item.under}
                            onChange={(e) =>
                              updateItemInGroup(
                                item.id,
                                "under",
                                e.target.value
                              )
                            }
                            placeholder="Enter category"
                            style={{
                              border: "none",
                              background: "transparent",
                            }}
                          />
                        </td>
                        <td className="text-center">
                          <button
                            type="button"
                            className="btn btn-outline-primary btn-sm"
                            onClick={() => {
                              setSelectedItem(item.name);
                              setIsParameterDialogOpen(true);
                            }}
                            disabled={!item.name.trim()}
                          >
                            Set QC Parameters
                          </button>
                        </td>
                        {/* <td className="text-center">
                          <button
                            type="button"
                            className="btn btn-danger btn-sm"
                            onClick={() => deleteItemFromGroup(item.id)}
                            title="Delete item"
                          >
                            ×
                          </button>
                        </td> */}
                      </tr>
                    ))}
                    {(!groupedItems[selectedGroup] ||
                      groupedItems[selectedGroup].length === 0) && (
                      <tr>
                        <td colSpan="5" className="text-center text-muted">
                          No items in this group. Click "Add Row" to add new
                          items.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </DialogContent>
        <DialogActions>
          <button
            type="button"
            className="btn btn-secondary"
            onClick={handleMultiItemTableDialogClose}
          >
            Close
          </button>
          <button
            type="button"
            className="btn btn-primary"
            onClick={() => {
              console.log(
                "Multi-item update completed for group:",
                selectedGroup
              );
              handleMultiItemTableDialogClose();
            }}
          >
            Update All
          </button>
        </DialogActions>
      </Dialog>

      {/* QC Testing Parameter Dialog */}
      <Dialog
        open={isParameterDialogOpen}
        onClose={handleParameterDialogClose}
        maxWidth="lg"
        fullWidth
      >
        <DialogTitle>QC TESTING PARAMETER</DialogTitle>
        <DialogContent>
          <div className="container-fluid">
            {/* Copy QC Parameters From Section */}
            <div className="row mb-3">
              <div className="col-8 d-flex align-items-center">
                <label
                  className="form-label me-3 mb-0"
                  style={{ minWidth: "200px" }}
                >
                  Copy QC Parameters From
                </label>
                <select
                  className="form-control"
                  value={selectedItem}
                  readOnly
                  style={{ backgroundColor: "#f9f9f9" }}
                >
                  <option value={selectedItem}>{selectedItem}</option>
                </select>
              </div>
            </div>

            {/* QC Parameters Table */}
            <div className="row">
              <div className="col-12">
                <div className="d-flex justify-content-end align-items-center mb-3">
                  <button
                    type="button"
                    className="btn btn-primary btn-sm"
                    onClick={addQCSpecificationRow}
                  >
                    Add Row
                  </button>
                </div>
                <table className="table table-bordered">
                  <thead>
                    <tr>
                      <th style={{ width: "10%" }}>Sl. No</th>
                      <th style={{ width: "40%" }}>Specification</th>
                      <th style={{ width: "40%" }}>Standard</th>
                      <th style={{ width: "10%" }}>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {qcSpecificationRows.map((row) => (
                      <tr key={row.id}>
                        <td className="text-center">{row.slNo}</td>
                        <td>
                          <select
                            className="form-control form-control-sm"
                            value={row.specification}
                            onChange={(e) =>
                              updateQCSpecificationRow(
                                row.id,
                                "specification",
                                e.target.value
                              )
                            }
                          >
                            <option value="">Select Specification</option>
                            <option value="Create">Create</option>
                            <option value="Not Applicable">
                              Not Applicable
                            </option>
                            <option value="Weight">Weight</option>
                            <option value="Dimension">Dimension</option>
                            <option value="Color">Color</option>
                            <option value="Quality">Quality</option>
                            <option value="Temperature">Temperature</option>
                            <option value="Pressure">Pressure</option>
                            <option value="Hardness">Hardness</option>
                            <option value="Thickness">Thickness</option>
                          </select>
                        </td>
                        <td>
                          <input
                            type="text"
                            className="form-control form-control-sm"
                            value={row.standard}
                            onChange={(e) =>
                              updateQCSpecificationRow(
                                row.id,
                                "standard",
                                e.target.value
                              )
                            }
                            placeholder="Enter standard"
                          />
                        </td>
                        <td className="text-center">
                          <button
                            type="button"
                            className="btn btn-danger btn-sm"
                            onClick={() => deleteQCSpecificationRow(row.id)}
                            disabled={qcSpecificationRows.length === 1}
                          >
                            ×
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <div className="row mt-3">
                  <div className="col-8 d-flex align-items-center">
                    <label
                      className="form-label me-3 mb-0"
                      style={{ minWidth: "200px" }}
                    >
                      Set Party Wise Specification
                    </label>
                    <span className="me-2">:</span>
                    <div className="form-check form-switch">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        checked={setPartyWiseSpecification === "Yes"}
                        onChange={(e) =>
                          setSetPartyWiseSpecification(
                            e.target.checked ? "Yes" : "No"
                          )
                        }
                      />
                      <label className="form-check-label">
                        {setPartyWiseSpecification === "Yes" ? "Yes" : "No"}
                      </label>
                      {setPartyWiseSpecification === "Yes" && (
                        <button
                          type="button"
                          className="btn btn-outline-primary btn-sm ms-3"
                          onClick={() =>
                            setPartyWiseSpecificationDialogOpen(true)
                          }
                        >
                          Set
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </DialogContent>
        <DialogActions>
          <button
            type="button"
            className="btn btn-secondary"
            onClick={handleParameterDialogClose}
          >
            Cancel
          </button>
          <button
            type="button"
            className="btn btn-primary"
            onClick={() => {
              console.log("QC Parameters saved:", qcSpecificationRows);
              handleParameterDialogClose();
            }}
          >
            Save
          </button>
        </DialogActions>
      </Dialog>

      {/* Party Wise Specification Dialog */}
      <Dialog
        open={partyWiseSpecificationDialogOpen}
        onClose={() => setPartyWiseSpecificationDialogOpen(false)}
        maxWidth="lg"
        fullWidth
      >
        <DialogTitle>SPECIFICATION</DialogTitle>
        <DialogContent>
          <div className="container-fluid">
            <div className="row">
              <div className="col-12">
                <div className="d-flex justify-content-end align-items-center mb-3">
                  <button
                    type="button"
                    className="btn btn-primary btn-sm"
                    onClick={addPartyWiseSpecificationRow}
                  >
                    Add Row
                  </button>
                </div>

                <table className="table table-bordered">
                  <thead style={{ backgroundColor: "#f8f9fa" }}>
                    <tr>
                      <th style={{ width: "10%" }}>SL No</th>
                      <th style={{ width: "60%" }}>Party Name</th>
                      <th style={{ width: "30%" }}>Set/Alter Specification</th>
                    </tr>
                  </thead>
                  <tbody>
                    {partyWiseSpecificationRows.map((row) => (
                      <tr key={row.id}>
                        <td className="text-center">{row.slNo}</td>
                        <td>
                          <input
                            type="text"
                            className="form-control form-control-sm"
                            value={row.partyName}
                            onChange={(e) =>
                              updatePartyWiseSpecificationRow(
                                row.id,
                                "partyName",
                                e.target.value
                              )
                            }
                            placeholder="Enter party name"
                            style={{
                              border: "none",
                              background: "transparent",
                            }}
                          />
                        </td>
                        <td className="text-center">
                          <div className="form-check form-switch d-flex justify-content-center">
                            <input
                              className="form-check-input"
                              type="checkbox"
                              checked={row.setAlterSpecification}
                              onChange={(e) =>
                                updatePartyWiseSpecificationRow(
                                  row.id,
                                  "setAlterSpecification",
                                  e.target.checked
                                )
                              }
                            />
                            <label className="form-check-label ms-2">
                              {row.setAlterSpecification ? "Yes" : "No"}
                            </label>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </DialogContent>
        <DialogActions>
          <button
            type="button"
            className="btn btn-secondary"
            onClick={() => setPartyWiseSpecificationDialogOpen(false)}
          >
            Cancel
          </button>
          <button
            type="button"
            className="btn btn-primary"
            onClick={() => {
              console.log(
                "Party Wise Specifications saved:",
                partyWiseSpecificationRows
              );
              setPartyWiseSpecificationDialogOpen(false);
            }}
          >
            Save
          </button>
        </DialogActions>
      </Dialog>
    </>
  );
}