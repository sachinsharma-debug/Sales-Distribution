import React, { useState } from "react";
import "../Settings/Companies.css";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import { Tabs, Tab, Box } from "@mui/material";
// ...existing code...
const StockItem = () => {
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

  // Handle search filter changes
  const handleSearchChange = (field, value) => {
    setSearchFilters((prev) => ({
      ...prev,
      [field]: value,
    }));
  };
  // Sample companies data
  const companiesData = [
    {
      id: 1,
      name: "AccuZip Solutions Pvt. Ltd.",
      parentName: "",
      address: "",
      phone: "07967219000",
      mobile: "",
      email: "hr@sal.edu.in",
      website: "www.sal.edu.in",
    },
    {
      id: 2,
      name: "Demo Ankit",
      parentName: "",
      address: "",
      phone: "",
      mobile: "",
      email: "Ankit@gmail.com",
      website: "",
    },
  ];

  // Filter companies based on search criteria
  const filteredCompanies = companiesData.filter((company) => {
    return (
      company.name.toLowerCase().includes(searchFilters.name.toLowerCase()) &&
      company.parentName
        .toLowerCase()
        .includes(searchFilters.parentName.toLowerCase()) &&
      company.address
        .toLowerCase()
        .includes(searchFilters.address.toLowerCase()) &&
      company.phone.toLowerCase().includes(searchFilters.phone.toLowerCase()) &&
      company.mobile
        .toLowerCase()
        .includes(searchFilters.mobile.toLowerCase()) &&
      company.email.toLowerCase().includes(searchFilters.email.toLowerCase()) &&
      company.website
        .toLowerCase()
        .includes(searchFilters.website.toLowerCase())
    );
  });
  const [dialogOpen, setDialogOpen] = useState(false);
  const [activeTab, setActiveTab] = useState(0);
  const [maintainBatches, setMaintainBatches] = useState("No");
  const [assemblyStepsDialog, setAssemblyStepsDialog] = useState(false);
  const [assemblySteps, setAssemblySteps] = useState([
    { id: 1, process: "Assembling", subProcess: "", cycleTimeMinutes: "0" },
  ]);
  const [bomDialogOpen, setBomDialogOpen] = useState(false);
  const [bomName, setBomName] = useState("");
  // Basic tab - Stock Name for referencing in BOM config
  const [stockName, setStockName] = useState("");

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

  function openDialog() {
    setDialogOpen(true);
  }

  function closeDialog() {
    setDialogOpen(false);
  }

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  const handleAssemblyStepsChange = (value) => {
    if (value === "Yes") {
      setAssemblyStepsDialog(true);
    }
  };

  const addAssemblyStep = () => {
    const newStep = {
      id: assemblySteps.length + 1,
      process: "",
      subProcess: "",
      cycleTimeMinutes: "0",
    };
    setAssemblySteps([...assemblySteps, newStep]);
  };

  const updateAssemblyStep = (id, field, value) => {
    setAssemblySteps(
      assemblySteps.map((step) =>
        step.id === id ? { ...step, [field]: value } : step
      )
    );
  };

  const deleteAssemblyStep = (id) => {
    setAssemblySteps(assemblySteps.filter((step) => step.id !== id));
  };

  // Prevent form submit default and close dialog on Add
  const handleDialogAdd = (e) => {
    e.preventDefault();
    // Add logic here if needed
    closeDialog();
  };
  return (
    <>
      <Dialog open={dialogOpen} onClose={closeDialog} maxWidth="md" fullWidth>
        <DialogTitle>Add Stock Item</DialogTitle>
        <DialogContent>
          <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
            <Tabs
              value={activeTab}
              onChange={handleTabChange}
              aria-label="stock item tabs"
            >
              <Tab label="Basic Details" />
              <Tab label="Additional Details" />
            </Tabs>
          </Box>

          {/* Basic Details Tab */}
          {activeTab === 0 && (
            <Box sx={{ pt: 2 }}>
              <form
                className="company-form"
                style={{ maxHeight: "500px" }}
                onSubmit={handleDialogAdd}
              >
                <div className="row">
                  <div className="col-12">
                    <div className="mt-3 row">
                      <div className="col-4 my-auto">
                        <label htmlFor="MasterID" className="form-label">
                          Master ID
                        </label>
                      </div>
                      <div className="col-8">
                        <input
                          type="text"
                          className="form-control"
                          id="MasterID"
                        />
                      </div>
                      <div className="col-4 my-auto">
                        <label htmlFor="AlterID" className="form-label">
                          Alter ID
                        </label>
                      </div>
                      <div className="col-8">
                        <input
                          type="text"
                          className="form-control"
                          id="AlterID"
                        />
                      </div>

                      <div className="col-4 my-auto">
                        <label htmlFor="GroupName" className="form-label">
                          Group Name
                        </label>
                      </div>
                      <div className="col-8">
                        <select id="GroupName" className="form-select w-100">
                          <option>Primary</option>
                        </select>
                      </div>

                      <div className="col-4 my-auto">
                        <label htmlFor="StockName" className="form-label">
                          Name
                        </label>
                      </div>
                      <div className="col-8">
                        <input
                          type="text"
                          className="form-control"
                          id="StockName"
                          value={stockName}
                          onChange={(e) => setStockName(e.target.value)}
                        />
                      </div>

                      <div className="col-4 my-auto">
                        <label htmlFor="Under" className="form-label">
                          Under
                        </label>
                      </div>
                      <div className="col-8">
                        <select id="Under" className="form-select w-100">
                          <option>Primary</option>
                        </select>
                      </div>

                      <div className="col-4 my-auto">
                        <label htmlFor="Units" className="form-label">
                          Units
                        </label>
                      </div>
                      <div className="col-8">
                        <select id="Units" className="form-select w-100">
                          <option>Primary</option>
                        </select>
                      </div>

                      <div className="col-4 my-auto">
                        <label htmlFor="AlternateUnits" className="form-label">
                          Alternate Units
                        </label>
                      </div>
                      <div className="col-8">
                        <select
                          id="AlternateUnits"
                          className="form-select w-100"
                        >
                          <option>Primary</option>
                        </select>
                      </div>
                    </div>
                  </div>
                </div>
              </form>
            </Box>
          )}

          {/* Additional Details Tab */}
          {activeTab === 1 && (
            <Box sx={{ pt: 2 }}>
              <form className="company-form" style={{ maxHeight: "500px" }}>
                <div className="row">
                  <div className="col-12">
                    <div className="mt-3 row">
                      <div className="col-4 my-auto">
                        <label htmlFor="MaintainBatches" className="form-label">
                          Maintain in batches
                        </label>
                      </div>
                      <div className="col-8">
                        <select
                          id="MaintainBatches"
                          className="form-select w-100"
                          value={maintainBatches}
                          onChange={(e) => setMaintainBatches(e.target.value)}
                        >
                          <option value="Yes">Yes</option>
                          <option value="No">No</option>
                        </select>
                      </div>

                      {maintainBatches === "Yes" && (
                        <>
                          <div
                            className="col-4 my-auto"
                            style={{ paddingLeft: "30px" }}
                          >
                            <label
                              htmlFor="TrackDateManufacturing"
                              className="form-label"
                            >
                              Track date of manufacturing
                            </label>
                          </div>
                          <div className="col-8">
                            <select
                              id="TrackDateManufacturing"
                              className="form-select w-100"
                            >
                              <option value="Yes">Yes</option>
                              <option value="No">No</option>
                            </select>
                          </div>

                          <div
                            className="col-4 my-auto"
                            style={{ paddingLeft: "30px" }}
                          >
                            <label
                              htmlFor="UseExpiryDates"
                              className="form-label"
                            >
                              Use expiry dates
                            </label>
                          </div>
                          <div className="col-8">
                            <select
                              id="UseExpiryDates"
                              className="form-select w-100"
                            >
                              <option value="No">No</option>
                              <option value="Yes">Yes</option>
                            </select>
                          </div>
                        </>
                      )}

                      <div className="col-4 my-auto">
                        <label
                          htmlFor="AlterComponentsBOM"
                          className="form-label"
                        >
                          Alter Components (BOM)
                        </label>
                      </div>
                      <div className="col-8">
                        <select
                          id="AlterComponentsBOM"
                          className="form-select w-100"
                          onChange={(e) => {
                            if (e.target.value === "Yes")
                              setBomDialogOpen(true);
                          }}
                        >
                          <option value="No">No</option>
                          <option value="Yes">Yes</option>
                        </select>
                      </div>

                      <div className="col-4 my-auto">
                        <label
                          htmlFor="SetAlterAssemblySteps"
                          className="form-label"
                        >
                          Set/Alter Assembly Steps
                        </label>
                      </div>
                      <div className="col-8">
                        <select
                          id="SetAlterAssemblySteps"
                          className="form-select w-100"
                          onChange={(e) =>
                            handleAssemblyStepsChange(e.target.value)
                          }
                        >
                          <option value="No">No</option>
                          <option value="Yes">Yes</option>
                        </select>
                      </div>
                    </div>
                  </div>
                </div>
              </form>
            </Box>
          )}
        </DialogContent>
        <DialogActions>
          <button
            type="button"
            className="btn btn-secondary"
            onClick={closeDialog}
          >
            Cancel
          </button>
          <button type="submit" className="btn btn-primary" form="">
            Add
          </button>
        </DialogActions>
      </Dialog>

      {/* Assembly Steps Dialog */}
      <Dialog
        open={assemblyStepsDialog}
        onClose={() => setAssemblyStepsDialog(false)}
        maxWidth="lg"
        fullWidth
      >
        <DialogTitle>Assembly Steps</DialogTitle>
        <DialogContent>
          <div className="table-responsive mt-3">
            <table className="table table-bordered">
              <thead style={{ backgroundColor: "#b8c5d6" }}>
                <tr>
                  <th>Sl No</th>
                  <th>Process</th>
                  <th>Sub Process</th>
                  <th>Cycle Time in Minutes</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {assemblySteps.map((step, index) => (
                  <tr key={step.id}>
                    <td>{index + 1}</td>
                    <td>
                      <input
                        type="text"
                        className="form-control form-control-sm"
                        value={step.process}
                        onChange={(e) =>
                          updateAssemblyStep(step.id, "process", e.target.value)
                        }
                        style={{
                          backgroundColor: step.id === 1 ? "#f5d982" : "white",
                        }}
                      />
                    </td>
                    <td>
                      <input
                        type="text"
                        className="form-control form-control-sm"
                        value={step.subProcess}
                        onChange={(e) =>
                          updateAssemblyStep(
                            step.id,
                            "subProcess",
                            e.target.value
                          )
                        }
                      />
                    </td>
                    <td>
                      <input
                        type="number"
                        className="form-control form-control-sm"
                        value={step.cycleTimeMinutes}
                        onChange={(e) =>
                          updateAssemblyStep(
                            step.id,
                            "cycleTimeMinutes",
                            e.target.value
                          )
                        }
                      />
                    </td>
                    <td>
                      <button
                        type="button"
                        className="btn btn-danger btn-sm"
                        onClick={() => deleteAssemblyStep(step.id)}
                        disabled={assemblySteps.length === 1}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="mt-3">
            <button
              type="button"
              className="btn btn-primary"
              onClick={addAssemblyStep}
            >
              Add Row
            </button>
          </div>
        </DialogContent>
        <DialogActions>
          <button
            type="button"
            className="btn btn-secondary"
            onClick={() => setAssemblyStepsDialog(false)}
          >
            Cancel
          </button>
          <button
            type="button"
            className="btn btn-primary"
            onClick={() => setAssemblyStepsDialog(false)}
          >
            Save
          </button>
        </DialogActions>
      </Dialog>

      {/* BOM Dialog */}
      <Dialog
        open={bomDialogOpen}
        onClose={() => setBomDialogOpen(false)}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>BOM Details</DialogTitle>
        <DialogContent>
          <div className="mb-3">
            <label htmlFor="bomName" className="form-label">
              Name of BOM
            </label>
            <input
              type="text"
              className="form-control form-control-sm"
              id="bomName"
              value={bomName}
              onChange={(e) => setBomName(e.target.value)}
            />
          </div>
        </DialogContent>
        <DialogActions>
          <button
            type="button"
            className="btn btn-secondary"
            onClick={() => setBomDialogOpen(false)}
          >
            Cancel
          </button>
          <button
            type="button"
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

      <div className="companies-page">
        <div className="companies-header">
          <h2>Stock Item</h2>
          <button onClick={openDialog} className="btn btn-primary new-btn">
            Add Stock Item
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
            Showing 1 to {filteredCompanies.length} of{" "}
            {filteredCompanies.length} entries
            {filteredCompanies.length !== companiesData.length && (
              <span className="filtered-text">
                {" "}
                (filtered from {companiesData.length} total entries)
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
                <th>Name</th>
                <th>Under</th>
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
              </tr>
            </thead>
            <tbody>
              {filteredCompanies.map((company) => (
                <tr key={company.id}>
                  <td>{company.name}</td>
                  <td>{company.parentName}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default StockItem;