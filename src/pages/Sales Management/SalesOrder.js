import React, { useRef, useState } from "react";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";

const SalesOrder = () => {
  const [voucherDialogOpen, setVoucherDialogOpen] = useState(false);
  const [salesOrderDialogOpen, setSalesOrderDialogOpen] = useState(false);
  const [partyDetailsDialogOpen, setPartyDetailsDialogOpen] = useState(false);
  const [voucherType, setVoucherType] = useState("option1");

  // Sales Order Form State
  const [salesOrderData, setSalesOrderData] = useState({
    salesOrderNo: "1",
    date: "19-Apr-25",
    partyName: "",
    salesLedger: "",
    priceLevel: "",
    orderNo: "1",
    items: [{ id: 1, name: "", quantity: "", rate: "", amount: "" }],
    narration: "",
  });

  // Party Details State
  const [partyDetails, setPartyDetails] = useState({
    modeTermsOfPayment: "",
    otherReferences: "",
    termsOfDelivery: "",
    dispatchThrough: "",
    destination: "",
    carrierNameAgent: "",
    billOfLadingLrRrNo: "",
    motorVehicleNo: "",
    date: "",
  });

  const openDialog = () => {
    setVoucherDialogOpen(true);
  };

  const closeDialog = () => {
    setVoucherDialogOpen(false);
  };

  const openSalesOrderDialog = () => {
    setSalesOrderDialogOpen(true);
  };

  const closeSalesOrderDialog = () => {
    setSalesOrderDialogOpen(false);
  };

  const openPartyDetailsDialog = () => {
    setPartyDetailsDialogOpen(true);
  };

  const closePartyDetailsDialog = () => {
    setPartyDetailsDialogOpen(false);
  };

  const handleSave = (e) => {
    e.preventDefault();
    console.log("Save voucher type:", voucherType);
    closeDialog();
    // Open the sales order form dialog
    openSalesOrderDialog();
  };

  const handleSalesOrderSave = (e) => {
    e.preventDefault();
    console.log("Save sales order:", salesOrderData);
    closeSalesOrderDialog();
  };

  const handleInputChange = (field, value) => {
    setSalesOrderData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleItemChange = (index, field, value) => {
    setSalesOrderData((prev) => ({
      ...prev,
      items: prev.items.map((item, i) =>
        i === index ? { ...item, [field]: value } : item
      ),
    }));
  };

  const addNewItem = () => {
    setSalesOrderData((prev) => ({
      ...prev,
      items: [
        ...prev.items,
        { id: Date.now(), name: "", quantity: "", rate: "", amount: "" },
      ],
    }));
  };

  const handlePartyDetailsChange = (field, value) => {
    setPartyDetails((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handlePartyDetailsSave = (e) => {
    e.preventDefault();
    console.log("Save party details:", partyDetails);
    closePartyDetailsDialog();
  };

  return (
    <div className="salesorder-page">
      <div className="d-flex align-items-center justify-content-between mb-3">
        <h3 className="mb-0">Sales Order</h3>
        <button className="btn btn-primary" onClick={openDialog}>
          Add Sales Order
        </button>
      </div>

      {/* Page content placeholder - keep existing layout/children as needed */}
      <div className="card p-3">Put your Sales Order list or form here.</div>

      {/* Voucher Type Dialog using Material-UI */}
      <Dialog
        open={voucherDialogOpen}
        onClose={closeDialog}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>
          <div className="d-flex align-items-start justify-content-between">
            <span>Voucher Type</span>
            <button
              type="button"
              className="btn-close"
              aria-label="Close"
              onClick={closeDialog}
            ></button>
          </div>
        </DialogTitle>

        <DialogContent>
          <form onSubmit={handleSave} id="voucher-form">
            <div className="mb-3 row align-items-center">
              <label className="col-sm-3 col-form-label text-end">Name:</label>
              <div className="col-sm-9">
                <select
                  className="form-select"
                  value={voucherType}
                  onChange={(e) => setVoucherType(e.target.value)}
                  style={{ minHeight: 40 }}
                >
                  <option value="option1">Option 1</option>
                  <option value="option2">Option 2</option>
                  <option value="option3">Option 3</option>
                </select>
              </div>
            </div>
          </form>
        </DialogContent>

        <DialogActions>
          <button
            type="button"
            className="btn btn-secondary"
            onClick={closeDialog}
          >
            Cancel
          </button>
          <button type="submit" form="voucher-form" className="btn btn-primary">
            Save
          </button>
        </DialogActions>
      </Dialog>

      {/* Sales Order Form Dialog using Material-UI */}
      <Dialog
        open={salesOrderDialogOpen}
        onClose={closeSalesOrderDialog}
        maxWidth="lg"
        fullWidth
      >
        <DialogTitle>
          <div className="d-flex align-items-start justify-content-between">
            <span>Sales Order</span>
            <button
              type="button"
              className="btn-close"
              aria-label="Close"
              onClick={closeSalesOrderDialog}
            ></button>
          </div>
        </DialogTitle>

        <DialogContent>
          <form onSubmit={handleSalesOrderSave} id="sales-order-form">
            {/* Header Section */}
            <div className="row mb-3 align-items-center">
              <div className="col-md-3">
                <div className="d-flex align-items-center">
                  <div className="bg-primary text-white p-2 rounded me-2">
                    <strong>Sales Order</strong>
                  </div>
                  <div>
                    <label className="form-label mb-0 me-2">No.</label>
                    <input
                      type="text"
                      className="form-control d-inline-block"
                      value={salesOrderData.salesOrderNo}
                      onChange={(e) =>
                        handleInputChange("salesOrderNo", e.target.value)
                      }
                      style={{ width: "80px" }}
                    />
                  </div>
                </div>
              </div>
              <div className="col-md-3 offset-md-6">
                <div className="text-end">
                  <div>{salesOrderData.date}</div>
                  <div>Saturday</div>
                </div>
              </div>
            </div>

            {/* Customer Details Section */}
            <div className="row mb-3">
              <div className="col-md-6">
                <div className="row mb-2">
                  <label className="col-sm-4 col-form-label">
                    Party A/c name:
                  </label>
                  <div className="col-sm-6">
                    <select
                      className="form-select"
                      value={salesOrderData.partyName}
                      onChange={(e) =>
                        handleInputChange("partyName", e.target.value)
                      }
                    >
                      <option value="">Select Party</option>
                      <option value="ABC Corporation">ABC Corporation</option>
                      <option value="XYZ Industries">XYZ Industries</option>
                      <option value="Global Traders">Global Traders</option>
                      <option value="Metro Suppliers">Metro Suppliers</option>
                    </select>
                  </div>
                  <div className="col-sm-2">
                    <button
                      type="button"
                      className="btn btn-outline-primary btn-sm"
                      onClick={openPartyDetailsDialog}
                      disabled={!salesOrderData.partyName}
                    >
                      Set
                    </button>
                  </div>
                </div>
                <div className="row mb-2">
                  <div className="col-sm-4 text-muted">Current balance</div>
                  <div className="col-sm-8 text-muted">-</div>
                </div>
                <div className="row mb-2">
                  <label className="col-sm-4 col-form-label">
                    Sales ledger:
                  </label>
                  <div className="col-sm-8">
                    <input
                      type="text"
                      className="form-control"
                      value={salesOrderData.salesLedger}
                      onChange={(e) =>
                        handleInputChange("salesLedger", e.target.value)
                      }
                    />
                  </div>
                </div>
                <div className="row mb-2">
                  <div className="col-sm-4 text-muted">Current balance</div>
                  <div className="col-sm-8 text-muted">-</div>
                </div>
              </div>
              <div className="col-md-6">
                <div className="row mb-2">
                  <label className="col-sm-4 col-form-label">
                    Price Level:
                  </label>
                  <div className="col-sm-8">
                    <input
                      type="text"
                      className="form-control"
                      value={salesOrderData.priceLevel}
                      onChange={(e) =>
                        handleInputChange("priceLevel", e.target.value)
                      }
                    />
                  </div>
                </div>
                <div className="row mb-2">
                  <label className="col-sm-4 col-form-label">Order no.:</label>
                  <div className="col-sm-8">
                    <input
                      type="text"
                      className="form-control"
                      value={salesOrderData.orderNo}
                      onChange={(e) =>
                        handleInputChange("orderNo", e.target.value)
                      }
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Items Table */}
            <div className="mb-3">
              <table className="table table-bordered">
                <thead className="table-light">
                  <tr>
                    <th style={{ width: "40%" }}>Name of Item</th>
                    <th style={{ width: "15%" }}>Quantity</th>
                    <th style={{ width: "15%" }}>Rate per</th>
                    <th style={{ width: "15%" }}>Amount</th>
                    <th style={{ width: "15%" }}>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {salesOrderData.items.map((item, index) => (
                    <tr key={item.id}>
                      <td>
                        <input
                          type="text"
                          className="form-control border-0"
                          value={item.name}
                          onChange={(e) =>
                            handleItemChange(index, "name", e.target.value)
                          }
                          placeholder="Enter item name"
                        />
                      </td>
                      <td>
                        <input
                          type="number"
                          className="form-control border-0"
                          value={item.quantity}
                          onChange={(e) =>
                            handleItemChange(index, "quantity", e.target.value)
                          }
                          placeholder="0"
                        />
                      </td>
                      <td>
                        <input
                          type="number"
                          className="form-control border-0"
                          value={item.rate}
                          onChange={(e) =>
                            handleItemChange(index, "rate", e.target.value)
                          }
                          placeholder="0.00"
                          step="0.01"
                        />
                      </td>
                      <td>
                        <input
                          type="number"
                          className="form-control border-0"
                          value={item.amount}
                          onChange={(e) =>
                            handleItemChange(index, "amount", e.target.value)
                          }
                          placeholder="0.00"
                          step="0.01"
                        />
                      </td>
                      <td>
                        <button
                          type="button"
                          className="btn btn-sm btn-outline-primary"
                          onClick={addNewItem}
                        >
                          + Add
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Narration */}
            <div className="mb-3">
              <label className="form-label">Narration:</label>
              <textarea
                className="form-control"
                rows="3"
                value={salesOrderData.narration}
                onChange={(e) => handleInputChange("narration", e.target.value)}
                placeholder="Enter narration..."
              />
            </div>
          </form>
        </DialogContent>

        <DialogActions>
          <button
            type="button"
            className="btn btn-secondary"
            onClick={closeSalesOrderDialog}
          >
            Cancel
          </button>
          <button
            type="submit"
            form="sales-order-form"
            className="btn btn-primary"
          >
            Save Sales Order
          </button>
        </DialogActions>
      </Dialog>

      {/* Party Details Dialog */}
      <Dialog
        open={partyDetailsDialogOpen}
        onClose={closePartyDetailsDialog}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>
          <div className="d-flex align-items-start justify-content-between">
            <span>Party Details</span>
            <button
              type="button"
              className="btn-close"
              aria-label="Close"
              onClick={closePartyDetailsDialog}
            ></button>
          </div>
        </DialogTitle>

        <DialogContent>
          <form onSubmit={handlePartyDetailsSave} id="party-details-form">
            {/* Order Details Section */}
            <div className="mb-4">
              <div className="border-bottom pb-2 mb-3">
                <h6
                  className="text-center mb-0"
                  style={{ backgroundColor: "#f8f9fa", padding: "8px" }}
                >
                  Order Details
                </h6>
              </div>

              <div className="row mb-2">
                <label className="col-sm-3 col-form-label">
                  Mode/Terms of Payment:
                </label>
                <div className="col-sm-9">
                  <input
                    type="text"
                    className="form-control"
                    value={partyDetails.modeTermsOfPayment}
                    onChange={(e) =>
                      handlePartyDetailsChange(
                        "modeTermsOfPayment",
                        e.target.value
                      )
                    }
                  />
                </div>
              </div>

              <div className="row mb-2">
                <label className="col-sm-3 col-form-label">
                  Other References:
                </label>
                <div className="col-sm-9">
                  <input
                    type="text"
                    className="form-control"
                    value={partyDetails.otherReferences}
                    onChange={(e) =>
                      handlePartyDetailsChange(
                        "otherReferences",
                        e.target.value
                      )
                    }
                  />
                </div>
              </div>

              <div className="row mb-2">
                <label className="col-sm-3 col-form-label">
                  Terms of Delivery:
                </label>
                <div className="col-sm-9">
                  <input
                    type="text"
                    className="form-control"
                    value={partyDetails.termsOfDelivery}
                    onChange={(e) =>
                      handlePartyDetailsChange(
                        "termsOfDelivery",
                        e.target.value
                      )
                    }
                  />
                </div>
              </div>
            </div>

            {/* Dispatch Details Section */}
            <div className="mb-4">
              <div className="border-bottom pb-2 mb-3">
                <h6
                  className="text-center mb-0"
                  style={{ backgroundColor: "#f8f9fa", padding: "8px" }}
                >
                  Dispatch Details
                </h6>
              </div>

              <div className="row mb-2">
                <label className="col-sm-3 col-form-label">
                  Dispatch through:
                </label>
                <div className="col-sm-9">
                  <input
                    type="text"
                    className="form-control"
                    value={partyDetails.dispatchThrough}
                    onChange={(e) =>
                      handlePartyDetailsChange(
                        "dispatchThrough",
                        e.target.value
                      )
                    }
                  />
                </div>
              </div>

              <div className="row mb-2">
                <label className="col-sm-3 col-form-label">Destination:</label>
                <div className="col-sm-9">
                  <input
                    type="text"
                    className="form-control"
                    value={partyDetails.destination}
                    onChange={(e) =>
                      handlePartyDetailsChange("destination", e.target.value)
                    }
                  />
                </div>
              </div>

              <div className="row mb-2">
                <label className="col-sm-3 col-form-label">
                  Carrier Name/Agent:
                </label>
                <div className="col-sm-9">
                  <input
                    type="text"
                    className="form-control"
                    value={partyDetails.carrierNameAgent}
                    onChange={(e) =>
                      handlePartyDetailsChange(
                        "carrierNameAgent",
                        e.target.value
                      )
                    }
                  />
                </div>
              </div>

              <div className="row mb-2">
                <label className="col-sm-3 col-form-label">
                  Bill of Lading/LR-RR No.:
                </label>
                <div className="col-sm-6">
                  <input
                    type="text"
                    className="form-control"
                    value={partyDetails.billOfLadingLrRrNo}
                    onChange={(e) =>
                      handlePartyDetailsChange(
                        "billOfLadingLrRrNo",
                        e.target.value
                      )
                    }
                  />
                </div>
                <label className="col-sm-1 col-form-label text-end ">
                  Date:
                </label>
                <div className="col-sm-2 mr-2">
                  <input
                    type="date"
                    className="form-control"
                    value={partyDetails.date}
                    onChange={(e) =>
                      handlePartyDetailsChange("date", e.target.value)
                    }
                  />
                </div>
              </div>

              <div className="row mb-2">
                <label className="col-sm-3 col-form-label">
                  Motor Vehicle No.:
                </label>
                <div className="col-sm-9">
                  <input
                    type="text"
                    className="form-control"
                    value={partyDetails.motorVehicleNo}
                    onChange={(e) =>
                      handlePartyDetailsChange("motorVehicleNo", e.target.value)
                    }
                  />
                </div>
              </div>
            </div>
          </form>
        </DialogContent>

        <DialogActions>
          <button
            type="button"
            className="btn btn-secondary"
            onClick={closePartyDetailsDialog}
          >
            Cancel
          </button>
          <button
            type="submit"
            form="party-details-form"
            className="btn btn-primary"
          >
            Save Details
          </button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default SalesOrder;
