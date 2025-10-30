import React, { useState, useEffect } from "react";
// import "./Branches.css";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import { BASE_URL } from "../../api/common";

const SalesEnquiry = () => {
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

  const [modalIsOpen, setIsOpen] = React.useState(false);

  const [formobj, setformobj] = useState({
    MasterID: "",
    AlterID: "",
    BranchName: "",
    MailingName: "",
    Address: "",
    District: "",
    State: "",
    Pincode: "",
    Telephone: "",
    Mobile: "",
    Fax: "",
    Email: "",
  });

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
  // Sample branches data

  const [SalesEnquiryData, setSalesEnquiryData] = useState([]);
  const [BomDialogOpen, setBomDialogOpen] = useState(false);
  const [stockName, setStockName] = useState("");
  const [bomName, setBomName] = useState("");
  // BOM configuration dialog (after entering BOM name)
  const [bomConfigOpen, setBomConfigOpen] = useState(false);
  const [bomConfig, setBomConfig] = useState({
    unitToProduce: 0,
    wastageDetails: "No",
    additionalExpense: "No",
    unitOfManufacture: "",
  });
  const [bomItems, setBomItems] = useState([
    {
      id: 1,
      process: "",
      item: "",
      godown: "",
      subType: "",
      quantity: "",
      wastageDetails: "No",
      budgetRate: "",
      vendorName: "",
    },
  ]);

  // Wastage details dialog
  const [wastageDialogOpen, setWastageDialogOpen] = useState(false);
  const [wastageInfo, setWastageInfo] = useState({
    unitToProduce: 0,
  });

  const [wastageItems, setWastageItems] = useState([
    {
      id: 1,
      slNo: 1,
      description: "Wastage",
      percentage: "",
      value: "",
      balance: "1.00",
    },
  ]);

  const addWastageItem = () => {
    setWastageItems((prev) => [
      ...prev,
      {
        id: prev.length ? Math.max(...prev.map((r) => r.id)) + 1 : 1,
        slNo: prev.length + 1,
        description: "",
        percentage: "",
        value: "",
        balance: "",
      },
    ]);
  };

  const updateWastageItem = (id, field, value) => {
    setWastageItems((rows) =>
      rows.map((r) => (r.id === id ? { ...r, [field]: value } : r))
    );
  };

  const deleteWastageItem = (id) => {
    setWastageItems((rows) => rows.filter((r) => r.id !== id));
  };

  // Additional expense dialog
  const [additionalExpenseDialogOpen, setAdditionalExpenseDialogOpen] =
    useState(false);
  const [additionalExpenseItems, setAdditionalExpenseItems] = useState([
    {
      id: 1,
      slNo: 1,
      description: "Samples",
      expenseType: "Samples",
      unit: "",
      uom: "",
      rate: "",
      amount: "",
    },
  ]);

  const addAdditionalExpenseItem = () => {
    setAdditionalExpenseItems((prev) => [
      ...prev,
      {
        id: prev.length ? Math.max(...prev.map((r) => r.id)) + 1 : 1,
        slNo: prev.length + 1,
        description: "",
        expenseType: "",
        unit: "",
        uom: "",
        rate: "",
        amount: "",
      },
    ]);
  };

  const updateAdditionalExpenseItem = (id, field, value) => {
    setAdditionalExpenseItems((rows) =>
      rows.map((r) => (r.id === id ? { ...r, [field]: value } : r))
    );
  };

  const deleteAdditionalExpenseItem = (id) => {
    setAdditionalExpenseItems((rows) => rows.filter((r) => r.id !== id));
  };

  const addBomItem = () => {
    setBomItems((prev) => [
      ...prev,
      {
        id: prev.length ? Math.max(...prev.map((r) => r.id)) + 1 : 1,
        process: "",
        item: "",
        godown: "",
        subType: "",
        quantity: "",
        wastageDetails: "No",
        budgetRate: "",
        vendorName: "",
      },
    ]);
  };

  const updateBomItem = (id, field, value) => {
    setBomItems((rows) =>
      rows.map((r) => (r.id === id ? { ...r, [field]: value } : r))
    );
  };

  const deleteBomItem = (id) => {
    setBomItems((rows) => rows.filter((r) => r.id !== id));
  };

  async function getmethod() {
    try {
      const res = await fetch(BASE_URL + "get_master/sales-enquiry"); // response object
      const data = await res.json(); // JSON body
      setSalesEnquiryData(data?.data || []); // safely update state
    } catch (err) {
      console.error("Error fetching sales enquiry:", err);
    }
  }

  async function addupdate() {
    let payload = {
      tablename: "sales-enquiry",
      data: formobj,
    };

    let response = await fetch(BASE_URL + "create_master", {
      method: "POST", // HTTP method
      headers: {
        "Content-Type": "application/json", // Tell server we’re sending JSON
      },
      body: JSON.stringify(payload),
    });
    response = await response.json();
    // console.log(response)

    getmethod();
    closeModal();
  }

  // Filter companies based on search criteria
  const filteredSalesEnquiry = SalesEnquiryData;

  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }
  return (
    <>
      <Dialog open={modalIsOpen} onClose={closeModal} maxWidth="xl" fullWidth>
        <DialogTitle>
          <div className="d-flex justify-content-between align-items-center">
            <span>Create Sales Enquiry</span>
            <button
              type="button"
              className="btn-close"
              onClick={closeModal}
              aria-label="Close"
            ></button>
          </div>
        </DialogTitle>
        <DialogContent>
          <div className="container-fluid">
            <div className="row mt-3 company-form">
              <div className="col-4">
                <div className="row">
                  <div className="col-4 my-auto">
                    <label htmlFor="CompanyCode" className="form-label">
                      Enquiry Type
                    </label>
                  </div>
                  <div className="col-8">
                    <input
                      type="text"
                      className="form-control"
                      id="CompanyCode"
                    />
                  </div>

                  <div className="col-4 ">
                    <div className="my-auto">
                      <label htmlFor="CompanyCode" className="form-label">
                        Person
                      </label>
                    </div>
                  </div>
                  <div className="col-8 ">
                    <input
                      type="text"
                      className="form-control"
                      id="CompanyCode"
                    />
                  </div>

                  <div className="col-4 ">
                    <div className="my-auto">
                      <label htmlFor="CompanyCode" className="form-label">
                        Email
                      </label>
                    </div>
                  </div>
                  <div className="col-8 ">
                    <input
                      type="text"
                      className="form-control"
                      id="CompanyCode"
                    />
                  </div>

                  <div className="col-4 ">
                    <div className="my-auto">
                      <label htmlFor="CompanyCode" className="form-label">
                        Campaing
                      </label>
                    </div>
                  </div>
                  <div className="col-8 ">
                    <input
                      type="text"
                      className="form-control"
                      id="CompanyCode"
                    />
                  </div>

                  <div className="col-4 ">
                    <div className="my-auto">
                      <label htmlFor="CompanyCode" className="form-label">
                        References
                      </label>
                    </div>
                  </div>
                  <div className="col-8 ">
                    <input
                      type="text"
                      className="form-control"
                      id="CompanyCode"
                    />
                  </div>
                </div>
              </div>

              <div className="col-4">
                <div className="row">
                  <div className="col-4 my-auto">
                    <label htmlFor="CompanyCode" className="form-label">
                      Partner
                    </label>
                  </div>
                  <div className="col-8">
                    <input
                      type="text"
                      className="form-control"
                      id="CompanyCode"
                    />
                  </div>

                  <div className="col-4 ">
                    <div className="my-auto">
                      <label htmlFor="CompanyCode" className="form-label">
                        Department
                      </label>
                    </div>
                  </div>
                  <div className="col-8 ">
                    <input
                      type="text"
                      className="form-control"
                      id="CompanyCode"
                    />
                  </div>

                  <div className="col-4 ">
                    <div className="my-auto">
                      <label htmlFor="CompanyCode" className="form-label">
                        Mobile
                      </label>
                    </div>
                  </div>
                  <div className="col-8 ">
                    <input
                      type="text"
                      className="form-control"
                      id="CompanyCode"
                    />
                  </div>

                  <div className="col-4 ">
                    <div className="my-auto">
                      <label htmlFor="CompanyCode" className="form-label">
                        Enq Source
                      </label>
                    </div>
                  </div>
                  <div className="col-8 ">
                    <input
                      type="text"
                      className="form-control"
                      id="CompanyCode"
                    />
                  </div>
                </div>
              </div>

              <div className="col-4">
                <div className="row">
                  <div className="col-4 my-auto">
                    <label htmlFor="CompanyCode" className="form-label">
                      Amounts
                    </label>
                  </div>
                  <div className="col-8">
                    <input
                      type="text"
                      className="form-control"
                      id="CompanyCode"
                    />
                  </div>

                  <div className="col-4 ">
                    <div className="my-auto">
                      <label htmlFor="CompanyCode" className="form-label">
                        Designation
                      </label>
                    </div>
                  </div>
                  <div className="col-8 ">
                    <input
                      type="text"
                      className="form-control"
                      id="CompanyCode"
                    />
                  </div>

                  <div className="col-4 ">
                    <div className="my-auto">
                      <label htmlFor="CompanyCode" className="form-label">
                        Phone
                      </label>
                    </div>
                  </div>
                  <div className="col-8 ">
                    <input
                      type="text"
                      className="form-control"
                      id="CompanyCode"
                    />
                  </div>

                  <div className="col-4 ">
                    <div className="my-auto">
                      <label htmlFor="CompanyCode" className="form-label">
                        Priority
                      </label>
                    </div>
                  </div>
                  <div className="col-8 ">
                    <input
                      type="text"
                      className="form-control"
                      id="CompanyCode"
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-12">
                <table className="companies-table">
                  <thead>
                    <tr>
                      <th>Product Name</th>
                      <th>Qty</th>
                      <th>Unit</th>
                      <th>Rate</th>
                      <th>Amount</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>ahhss</td>
                      <td>ahhss</td>
                      <td>ahhss</td>
                      <td>ahhss</td>
                      <td>ahhss</td>
                      <td>
                        <button
                          className="btn btn-primary"
                          onClick={() => setBomDialogOpen(true)}
                        >
                          Set BOM
                        </button>
                      </td>
                    </tr>
                    <tr>
                      <td>ahhss</td>
                      <td>ahhss</td>
                      <td>ahhss</td>
                      <td>ahhss</td>
                      <td>ahhss</td>
                      <td>
                        <button className="btn btn-primary">Set BOM</button>
                      </td>
                    </tr>
                    <tr>
                      <td>ahhss</td>
                      <td>ahhss</td>
                      <td>ahhss</td>
                      <td>ahhss</td>
                      <td>ahhss</td>
                      <td>
                        <button className="btn btn-primary">Set BOM</button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div className="col-6 mt-4">
                <div className="">
                  <div className="col-3">
                    <label htmlFor="CompanyCode" className="form-label">
                      Description
                    </label>
                  </div>
                  <div className="col-9">
                    <textarea type="text" className="form-control"></textarea>
                  </div>
                </div>
              </div>
              <div className="col-12 mt-4">
                <div className="text-center border-y">Follow Up</div>
                <div className="row mt-4 company-form">
                  <div className="col-4">
                    <div className="row">
                      <div className="col-5 my-auto">
                        <label htmlFor="CompanyCode" className="form-label">
                          Follow-Up Type
                        </label>
                      </div>
                      <div className="col-7">
                        <input
                          type="text"
                          className="form-control"
                          id="CompanyCode"
                        />
                      </div>

                      <div className="col-5 my-auto">
                        <label htmlFor="CompanyCode" className="form-label">
                          Enquiry Status
                        </label>
                      </div>
                      <div className="col-7">
                        <input
                          type="text"
                          className="form-control"
                          id="CompanyCode"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="col-4">
                    <div className="row">
                      <div className="col-5 my-auto">
                        <label htmlFor="CompanyCode" className="form-label">
                          Follow-Up Date
                        </label>
                      </div>
                      <div className="col-7">
                        <input
                          type="text"
                          className="form-control"
                          id="CompanyCode"
                        />
                      </div>

                      <div className="col-5 my-auto">
                        <label htmlFor="CompanyCode" className="form-label">
                          Executive
                        </label>
                      </div>
                      <div className="col-7">
                        <input
                          type="text"
                          className="form-control"
                          id="CompanyCode"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="col-4">
                    <div className="row">
                      <div className="col-5 my-auto">
                        <label htmlFor="CompanyCode" className="form-label">
                          Follow-Up Time
                        </label>
                      </div>
                      <div className="col-7">
                        <input
                          type="text"
                          className="form-control"
                          id="CompanyCode"
                        />
                      </div>

                      <div className="col-5 my-auto">
                        <label htmlFor="CompanyCode" className="form-label">
                          Executive Date/Time
                        </label>
                      </div>
                      <div className="col-7">
                        <input
                          type="text"
                          className="form-control"
                          id="CompanyCode"
                        />
                      </div>

                      <div className="col-5 my-auto">
                        <label htmlFor="CompanyCode" className="form-label">
                          Company Name
                        </label>
                      </div>
                      <div className="col-7">
                        <input
                          type="text"
                          className="form-control"
                          id="CompanyCode"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="col-8" style={{ marginTop: "-30px" }}>
                    <div className="d-flex justify-content-between">
                      <label
                        htmlFor="CompanyCode"
                        className="form-label my-auto"
                        style={{ width: 213 }}
                      >
                        Reason
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="CompanyCode"
                      />
                    </div>
                  </div>

                  <div className="col-12 mt-1">
                    <div className="d-flex justify-content-between">
                      <label
                        htmlFor="CompanyCode"
                        className="form-label my-auto"
                        style={{ width: 193 }}
                      >
                        Follow-Up Marks
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="CompanyCode"
                      />
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
            onClick={closeModal}
          >
            Cancel
          </button>
          <button
            type="submit"
            className="btn btn-primary"
            onClick={() => {
              addupdate();
            }}
          >
            Add
          </button>
        </DialogActions>
      </Dialog>

      <Dialog
        open={BomDialogOpen}
        onClose={() => setBomDialogOpen(false)}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>BOM Details</DialogTitle>
        <DialogContent>
          <div className="mb-3">
            <label className="form-label">BOM Name</label>
            <input
              type="text"
              className="form-control"
              value={bomName}
              onChange={(e) => setBomName(e.target.value)}
            />
          </div>
        </DialogContent>
        <DialogActions>
          <button
            className="btn btn-secondary"
            onClick={() => setBomDialogOpen(false)}
          >
            Cancel
          </button>
          <button
            className="btn btn-primary"
            onClick={() => {
              setBomDialogOpen(false);
              setBomConfigOpen(true);
            }}
          >
            Save
          </button>
        </DialogActions>
      </Dialog>

      {/* BOM Configuration Dialog (Components of, table, etc.) */}
      <Dialog
        open={bomConfigOpen}
        onClose={() => setBomConfigOpen(false)}
        maxWidth="lg"
        fullWidth
      >
        <DialogTitle>Bill of Materials</DialogTitle>
        <DialogContent>
          <div className="container-fluid">
            <div className="row g-2 align-items-center">
              <div className="col-3 text-end">BoM Name</div>
              <div className="col-9">
                <input
                  type="text"
                  className="form-control form-control-sm"
                  value={bomName}
                  readOnly
                />
              </div>

              <div className="col-3 text-end">Components of</div>
              <div className="col-9">
                <input
                  type="text"
                  className="form-control form-control-sm"
                  value={stockName}
                  placeholder=""
                  readOnly
                />
              </div>

              <div className="col-3 text-end">Unit to produce</div>
              <div className="col-3">
                <input
                  type="number"
                  className="form-control form-control-sm"
                  value={bomConfig.unitToProduce}
                  onChange={(e) =>
                    setBomConfig((c) => ({
                      ...c,
                      unitToProduce: Number(e.target.value),
                    }))
                  }
                />
              </div>
              <div className="col-6">NOS</div>

              <div className="col-3 text-end">Wastage Details</div>
              <div className="col-3">
                <select
                  className="form-select form-select-sm"
                  value={bomConfig.wastageDetails}
                  onChange={(e) => {
                    setBomConfig((c) => ({
                      ...c,
                      wastageDetails: e.target.value,
                    }));
                    if (e.target.value === "Yes") {
                      setWastageDialogOpen(true);
                    }
                  }}
                >
                  <option value="No">No</option>
                  <option value="Yes">Yes</option>
                </select>
              </div>
              <div className="col-3 text-end">Additional Expense</div>
              <div className="col-3">
                <select
                  className="form-select form-select-sm"
                  value={bomConfig.additionalExpense}
                  onChange={(e) => {
                    setBomConfig((c) => ({
                      ...c,
                      additionalExpense: e.target.value,
                    }));
                    if (e.target.value === "Yes") {
                      setAdditionalExpenseDialogOpen(true);
                    }
                  }}
                >
                  <option value="No">No</option>
                  <option value="Yes">Yes</option>
                </select>
              </div>

              <div className="col-3 text-end">Unit of manufacture</div>
              <div className="col-9">
                <input
                  type="text"
                  className="form-control form-control-sm"
                  value={bomConfig.unitOfManufacture}
                  onChange={(e) =>
                    setBomConfig((c) => ({
                      ...c,
                      unitOfManufacture: e.target.value,
                    }))
                  }
                />
              </div>
            </div>

            <div className="table-responsive mt-3">
              <table className="table table-bordered">
                <thead style={{ backgroundColor: "#b8c5d6" }}>
                  <tr>
                    <th>Process</th>
                    <th>Item</th>
                    <th>Godown</th>
                    <th>Sub Type</th>
                    <th>Quantity</th>
                    <th>Wastage Details</th>
                    <th>Budget Rate</th>
                    <th>Vendor Name</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {bomItems.map((row) => (
                    <tr key={row.id}>
                      <td>
                        <input
                          type="text"
                          className="form-control form-control-sm"
                          value={row.process}
                          onChange={(e) =>
                            updateBomItem(row.id, "process", e.target.value)
                          }
                        />
                      </td>
                      <td>
                        <input
                          type="text"
                          className="form-control form-control-sm"
                          value={row.item}
                          onChange={(e) =>
                            updateBomItem(row.id, "item", e.target.value)
                          }
                        />
                      </td>
                      <td>
                        <input
                          type="text"
                          className="form-control form-control-sm"
                          value={row.godown}
                          onChange={(e) =>
                            updateBomItem(row.id, "godown", e.target.value)
                          }
                        />
                      </td>
                      <td>
                        <input
                          type="text"
                          className="form-control form-control-sm"
                          value={row.subType}
                          onChange={(e) =>
                            updateBomItem(row.id, "subType", e.target.value)
                          }
                        />
                      </td>
                      <td>
                        <input
                          type="number"
                          className="form-control form-control-sm"
                          value={row.quantity}
                          onChange={(e) =>
                            updateBomItem(row.id, "quantity", e.target.value)
                          }
                        />
                      </td>
                      <td>
                        <select
                          className="form-select form-select-sm"
                          value={row.wastageDetails}
                          onChange={(e) =>
                            updateBomItem(
                              row.id,
                              "wastageDetails",
                              e.target.value
                            )
                          }
                        >
                          <option value="No">No</option>
                          <option value="Yes">Yes</option>
                        </select>
                      </td>
                      <td>
                        <input
                          type="number"
                          className="form-control form-control-sm"
                          value={row.budgetRate}
                          onChange={(e) =>
                            updateBomItem(row.id, "budgetRate", e.target.value)
                          }
                        />
                      </td>
                      <td>
                        <input
                          type="text"
                          className="form-control form-control-sm"
                          value={row.vendorName}
                          onChange={(e) =>
                            updateBomItem(row.id, "vendorName", e.target.value)
                          }
                        />
                      </td>
                      <td>
                        <button
                          type="button"
                          className="btn btn-danger btn-sm"
                          onClick={() => deleteBomItem(row.id)}
                          disabled={bomItems.length === 1}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="mt-2">
              <button
                type="button"
                className="btn btn-primary"
                onClick={addBomItem}
              >
                Add Row
              </button>
            </div>
          </div>
        </DialogContent>
        <DialogActions>
          <button
            type="button"
            className="btn btn-secondary"
            onClick={() => setBomConfigOpen(false)}
          >
            Cancel
          </button>
          <button
            type="button"
            className="btn btn-primary"
            onClick={() => setBomConfigOpen(false)}
          >
            Save
          </button>
        </DialogActions>
      </Dialog>

      {/* Wastage Details Dialog */}
      <Dialog
        open={wastageDialogOpen}
        onClose={() => setWastageDialogOpen(false)}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>WASTAGE INFO</DialogTitle>
        <DialogContent>
          <div className="container-fluid">
            <div className="row g-2 align-items-center mb-3">
              <div className="col-4 text-end">Unit to produce</div>
              <div className="col-2">
                <input
                  type="number"
                  className="form-control form-control-sm"
                  value={wastageInfo.unitToProduce}
                  onChange={(e) =>
                    setWastageInfo((c) => ({
                      ...c,
                      unitToProduce: Number(e.target.value),
                    }))
                  }
                />
              </div>
              <div className="col-6">NOS</div>
            </div>

            <div className="table-responsive">
              <table className="table table-bordered table-sm">
                <thead style={{ backgroundColor: "#b8c5d6" }}>
                  <tr>
                    <th style={{ width: "10%" }}>Sl No</th>
                    <th style={{ width: "30%" }}>Description</th>
                    <th style={{ width: "20%" }}>Percentage</th>
                    <th style={{ width: "20%" }}>Value</th>
                    <th style={{ width: "20%" }}>Balance</th>
                  </tr>
                </thead>
                <tbody>
                  {wastageItems.map((row) => (
                    <tr key={row.id}>
                      <td>{row.slNo}</td>
                      <td>
                        <input
                          type="text"
                          className="form-control form-control-sm"
                          value={row.description}
                          onChange={(e) =>
                            updateWastageItem(
                              row.id,
                              "description",
                              e.target.value
                            )
                          }
                        />
                      </td>
                      <td>
                        <input
                          type="number"
                          className="form-control form-control-sm"
                          value={row.percentage}
                          onChange={(e) =>
                            updateWastageItem(
                              row.id,
                              "percentage",
                              e.target.value
                            )
                          }
                          style={{ backgroundColor: "#f5d982" }}
                        />
                      </td>
                      <td>
                        <input
                          type="number"
                          className="form-control form-control-sm"
                          value={row.value}
                          onChange={(e) =>
                            updateWastageItem(row.id, "value", e.target.value)
                          }
                        />
                      </td>
                      <td>
                        <input
                          type="text"
                          className="form-control form-control-sm"
                          value={row.balance}
                          onChange={(e) =>
                            updateWastageItem(row.id, "balance", e.target.value)
                          }
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="mt-2">
              <button
                type="button"
                className="btn btn-primary btn-sm"
                onClick={addWastageItem}
              >
                Add Row
              </button>
              {wastageItems.length > 1 && (
                <button
                  type="button"
                  className="btn btn-danger btn-sm ms-2"
                  onClick={() =>
                    deleteWastageItem(wastageItems[wastageItems.length - 1].id)
                  }
                >
                  Delete Row
                </button>
              )}
            </div>
          </div>
        </DialogContent>
        <DialogActions>
          <button
            type="button"
            className="btn btn-secondary"
            onClick={() => setWastageDialogOpen(false)}
          >
            Cancel
          </button>
          <button
            type="button"
            className="btn btn-primary"
            onClick={() => setWastageDialogOpen(false)}
          >
            Save
          </button>
        </DialogActions>
      </Dialog>

      {/* Additional Expense Dialog */}
      <Dialog
        open={additionalExpenseDialogOpen}
        onClose={() => setAdditionalExpenseDialogOpen(false)}
        maxWidth="lg"
        fullWidth
      >
        <DialogTitle>ADDITIONAL EXPENSE</DialogTitle>
        <DialogContent>
          <div className="container-fluid">
            <div className="table-responsive">
              <table className="table table-bordered table-sm">
                <thead style={{ backgroundColor: "#b8c5d6" }}>
                  <tr>
                    <th style={{ width: "10%" }}>Sl No</th>
                    <th style={{ width: "20%" }}>Description</th>
                    <th style={{ width: "20%" }}>Expence Type</th>
                    <th style={{ width: "15%" }}>Unit</th>
                    <th style={{ width: "10%" }}>UOM</th>
                    <th style={{ width: "15%" }}>Rate</th>
                    <th style={{ width: "10%" }}>Amount</th>
                  </tr>
                </thead>
                <tbody>
                  {additionalExpenseItems.map((row) => (
                    <tr key={row.id}>
                      <td>{row.slNo}</td>
                      <td>
                        <input
                          type="text"
                          className="form-control form-control-sm"
                          value={row.description}
                          onChange={(e) =>
                            updateAdditionalExpenseItem(
                              row.id,
                              "description",
                              e.target.value
                            )
                          }
                        />
                      </td>
                      <td>
                        <input
                          type="text"
                          className="form-control form-control-sm"
                          value={row.expenseType}
                          onChange={(e) =>
                            updateAdditionalExpenseItem(
                              row.id,
                              "expenseType",
                              e.target.value
                            )
                          }
                          style={{ backgroundColor: "#f5d982" }}
                        />
                      </td>
                      <td>
                        <input
                          type="text"
                          className="form-control form-control-sm"
                          value={row.unit}
                          onChange={(e) =>
                            updateAdditionalExpenseItem(
                              row.id,
                              "unit",
                              e.target.value
                            )
                          }
                        />
                      </td>
                      <td>
                        <input
                          type="text"
                          className="form-control form-control-sm"
                          value={row.uom}
                          onChange={(e) =>
                            updateAdditionalExpenseItem(
                              row.id,
                              "uom",
                              e.target.value
                            )
                          }
                        />
                      </td>
                      <td>
                        <input
                          type="number"
                          className="form-control form-control-sm"
                          value={row.rate}
                          onChange={(e) =>
                            updateAdditionalExpenseItem(
                              row.id,
                              "rate",
                              e.target.value
                            )
                          }
                        />
                      </td>
                      <td>
                        <input
                          type="number"
                          className="form-control form-control-sm"
                          value={row.amount}
                          onChange={(e) =>
                            updateAdditionalExpenseItem(
                              row.id,
                              "amount",
                              e.target.value
                            )
                          }
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="mt-2">
              <button
                type="button"
                className="btn btn-primary btn-sm"
                onClick={addAdditionalExpenseItem}
              >
                Add Row
              </button>
              {additionalExpenseItems.length > 1 && (
                <button
                  type="button"
                  className="btn btn-danger btn-sm ms-2"
                  onClick={() =>
                    deleteAdditionalExpenseItem(
                      additionalExpenseItems[additionalExpenseItems.length - 1]
                        .id
                    )
                  }
                >
                  Delete Row
                </button>
              )}
            </div>
          </div>
        </DialogContent>
        <DialogActions>
          <button
            type="button"
            className="btn btn-secondary"
            onClick={() => setAdditionalExpenseDialogOpen(false)}
          >
            Cancel
          </button>
          <button
            type="button"
            className="btn btn-primary"
            onClick={() => setAdditionalExpenseDialogOpen(false)}
          >
            Save
          </button>
        </DialogActions>
      </Dialog>

      <div className="branches-page">
        <div className="branches-header">
          <h2>Sales Enquiry</h2>
          <button onClick={openModal} className="btn btn-primary new-btn">
            Add
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
            Showing 1 to {filteredSalesEnquiry.length} of{" "}
            {filteredSalesEnquiry.length} entries
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
                    onChange={(e) =>
                      handleSearchChange("phone", e.target.value)
                    }
                  />
                </th>
                <th>
                  <input
                    type="text"
                    className="search-input"
                    placeholder="Search mobile..."
                    value={searchFilters.mobile}
                    onChange={(e) =>
                      handleSearchChange("mobile", e.target.value)
                    }
                  />
                </th>
                <th>
                  <input
                    type="text"
                    className="search-input"
                    placeholder="Search email..."
                    value={searchFilters.email}
                    onChange={(e) =>
                      handleSearchChange("email", e.target.value)
                    }
                  />
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredSalesEnquiry.map((branch) => (
                <tr>
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

export default SalesEnquiry;
