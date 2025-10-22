import React, { useState } from "react";
import "./Settings.css";
import "./Companies.css";

export default function PurchaseEnquiry() {
  const [showVoucherDialog, setShowVoucherDialog] = useState(false);
  const [showPurchaseEnquiryDialog, setShowPurchaseEnquiryDialog] =
    useState(false);

  const [formData, setFormData] = useState({
    date: "20-Apr-24",
    trackFrom: "",
    docNo: "",
    docDate: "",
    vendorType: "",
    vendorName: "",
  });

  const [items, setItems] = useState([
    {
      itemName: "",
      quantity: "",
      rate: "",
      unit: "",
      amount: "",
      dueDate: "",
      setRate: "",
    },
  ]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleItemChange = (index, field, value) => {
    const updatedItems = [...items];
    updatedItems[index][field] = value;

    // Auto-calculate amount when quantity and rate change
    if (field === "quantity" || field === "rate") {
      const qty = parseFloat(updatedItems[index].quantity) || 0;
      const rate = parseFloat(updatedItems[index].rate) || 0;
      updatedItems[index].amount = (qty * rate).toFixed(2);
    }

    setItems(updatedItems);
  };

  const addNewRow = () => {
    setItems([
      ...items,
      {
        itemName: "",
        quantity: "",
        rate: "",
        unit: "",
        amount: "",
        dueDate: "",
        setRate: "",
      },
    ]);
  };

  const removeRow = (index) => {
    if (items.length > 1) {
      const updatedItems = items.filter((_, i) => i !== index);
      setItems(updatedItems);
    }
  };

  const handleVoucherSelect = (voucherType) => {
    if (voucherType === "purchase-enquiry") {
      setShowVoucherDialog(false);
      setShowPurchaseEnquiryDialog(true);
    }
  };

  const closeAllDialogs = () => {
    setShowVoucherDialog(false);
    setShowPurchaseEnquiryDialog(false);
  };

  // Voucher Type Dialog Component
  const VoucherTypeDialog = () => {
    const [selectedVoucher, setSelectedVoucher] = useState("");
    const [searchTerm, setSearchTerm] = useState("");

    const voucherOptions = [
      {
        value: "purchase-enquiry",
        label: "GRN - Capital Goods Intangible",
        category: "Purchase",
      },
      {
        value: "capital-goods-tangible",
        label: "GRN - Capital Goods Tangible",
        category: "Purchase",
      },
      { value: "cash", label: "GRN - Cash", category: "Purchase" },
      { value: "domestic", label: "GRN - Domestic", category: "Purchase" },
      { value: "git", label: "GRN - GIT", category: "Purchase" },
      {
        value: "git-capital-intangible",
        label: "GRN - GIT Capital Goods Intangible",
        category: "Purchase",
      },
      {
        value: "git-capital-tangible",
        label: "GRN - GIT Capital Goods Tangible",
        category: "Purchase",
      },
      { value: "git-ss", label: "GRN GIT-SS", category: "Purchase" },
      { value: "import", label: "GRN - Import", category: "Purchase" },
      { value: "mix-hk-p&s", label: "GRN - MIX-HK&P&S", category: "Purchase" },
      {
        value: "repair-maintenance",
        label: "GRN - Repair & Maintenance",
        category: "Purchase",
      },
      { value: "service", label: "GRN - Service", category: "Purchase" },
      { value: "receipt-note", label: "Receipt Note", category: "Purchase" },
    ];

    const filteredVouchers = voucherOptions.filter((voucher) =>
      voucher.label.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleVoucherClick = (voucher) => {
      setSelectedVoucher(voucher.value);
      setSearchTerm(voucher.label);
    };

    const handleSelectChange = (e) => {
      const selectedValue = e.target.value;
      setSelectedVoucher(selectedValue);
      const selectedOption = voucherOptions.find(
        (voucher) => voucher.value === selectedValue
      );
      setSearchTerm(selectedOption ? selectedOption.label : "");
    };

    const handleSearchChange = (e) => {
      setSearchTerm(e.target.value);
      const exactMatch = voucherOptions.find(
        (voucher) =>
          voucher.label.toLowerCase() === e.target.value.toLowerCase()
      );
      if (exactMatch) {
        setSelectedVoucher(exactMatch.value);
      } else {
        setSelectedVoucher("");
      }
    };

    const handleConfirmSelection = () => {
      if (selectedVoucher) {
        handleVoucherSelect(selectedVoucher);
      }
    };

    return (
      <div
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          backgroundColor: "rgba(0, 0, 0, 0.5)",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          zIndex: 1050,
        }}
      >
        <div
          style={{
            backgroundColor: "white",
            borderRadius: "8px",
            width: "600px",
            maxWidth: "90%",
            boxShadow: "0 4px 15px rgba(0, 0, 0, 0.3)",
            overflow: "hidden",
          }}
        >
          {/* Header */}
          <div
            style={{
              backgroundColor: "#f8f9fa",
              padding: "15px 20px",
              borderBottom: "1px solid #dee2e6",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <h5 style={{ margin: 0, color: "#495057", fontWeight: "600" }}>
              Voucher Type
            </h5>
            <button
              onClick={() => setShowVoucherDialog(false)}
              style={{
                background: "none",
                border: "none",
                fontSize: "24px",
                cursor: "pointer",
                color: "#6c757d",
              }}
            >
              ×
            </button>
          </div>

          {/* Body */}
          <div style={{ padding: "20px" }}>
            <div
              style={{
                display: "flex",
                gap: "20px",
                height: "350px",
              }}
            >
              {/* Left side - Name selection */}
              <div style={{ flex: "1" }}>
                <label
                  style={{
                    display: "block",
                    marginBottom: "8px",
                    fontWeight: "500",
                    color: "#495057",
                  }}
                >
                  Name
                </label>

                {/* Dropdown Select */}
                <select
                  value={selectedVoucher}
                  onChange={handleSelectChange}
                  style={{
                    width: "100%",
                    padding: "10px",
                    border: "2px solid #ced4da",
                    borderRadius: "6px",
                    fontSize: "14px",
                    backgroundColor: selectedVoucher ? "#fff3cd" : "#fff",
                    marginBottom: "15px",
                  }}
                >
                  <option value="">Select Voucher Type...</option>
                  {voucherOptions.map((voucher) => (
                    <option key={voucher.value} value={voucher.value}>
                      {voucher.label}
                    </option>
                  ))}
                </select>

                {/* Search Input */}
                <label
                  style={{
                    display: "block",
                    marginBottom: "8px",
                    fontWeight: "500",
                    color: "#495057",
                  }}
                >
                  Search
                </label>
                <input
                  type="text"
                  value={searchTerm}
                  onChange={handleSearchChange}
                  style={{
                    width: "100%",
                    padding: "10px",
                    border: "1px solid #ced4da",
                    borderRadius: "6px",
                    fontSize: "14px",
                  }}
                  placeholder="Type to search or see selection above..."
                />

                {/* Selected Info */}
                {selectedVoucher && (
                  <div
                    style={{
                      marginTop: "15px",
                      padding: "10px",
                      backgroundColor: "#d4edda",
                      border: "1px solid #c3e6cb",
                      borderRadius: "4px",
                      fontSize: "13px",
                      color: "#155724",
                    }}
                  >
                    <strong>Selected:</strong>{" "}
                    {
                      voucherOptions.find((v) => v.value === selectedVoucher)
                        ?.label
                    }
                  </div>
                )}
              </div>

              {/* Right side - Voucher list */}
              <div style={{ flex: "1" }}>
                <div
                  style={{
                    border: "1px solid #dee2e6",
                    borderRadius: "6px",
                    height: "100%",
                    overflow: "hidden",
                  }}
                >
                  <div
                    style={{
                      backgroundColor: "#486ebe",
                      color: "white",
                      padding: "10px 15px",
                      fontWeight: "600",
                      fontSize: "14px",
                    }}
                  >
                    List of Voucher
                  </div>

                  <div
                    style={{
                      maxHeight: "310px",
                      overflowY: "auto",
                    }}
                  >
                    {filteredVouchers.map((voucher) => (
                      <div
                        key={voucher.value}
                        onClick={() => handleVoucherClick(voucher)}
                        style={{
                          padding: "10px 15px",
                          cursor: "pointer",
                          borderBottom: "1px solid #e9ecef",
                          fontSize: "13px",
                          backgroundColor:
                            selectedVoucher === voucher.value
                              ? "#fff3cd"
                              : "#fff",
                          transition: "background-color 0.2s",
                          borderLeft:
                            selectedVoucher === voucher.value
                              ? "3px solid #ffc107"
                              : "3px solid transparent",
                        }}
                        onMouseEnter={(e) => {
                          if (selectedVoucher !== voucher.value) {
                            e.target.style.backgroundColor = "#f8f9fa";
                          }
                        }}
                        onMouseLeave={(e) => {
                          if (selectedVoucher !== voucher.value) {
                            e.target.style.backgroundColor = "#fff";
                          } else {
                            e.target.style.backgroundColor = "#fff3cd";
                          }
                        }}
                      >
                        {voucher.label}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div
              style={{
                display: "flex",
                justifyContent: "flex-end",
                gap: "10px",
                marginTop: "20px",
              }}
            >
              <button
                onClick={() => setShowVoucherDialog(false)}
                style={{
                  backgroundColor: "#6c757d",
                  color: "white",
                  border: "none",
                  padding: "8px 16px",
                  borderRadius: "4px",
                  cursor: "pointer",
                  fontSize: "14px",
                }}
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmSelection}
                disabled={!selectedVoucher}
                style={{
                  backgroundColor: selectedVoucher ? "#007bff" : "#cccccc",
                  color: "white",
                  border: "none",
                  padding: "8px 16px",
                  borderRadius: "4px",
                  cursor: selectedVoucher ? "pointer" : "not-allowed",
                  fontSize: "14px",
                }}
              >
                OK
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // Purchase Enquiry Form Dialog Component
  const PurchaseEnquiryDialog = () => (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 1050,
        padding: "20px",
      }}
    >
      <div
        style={{
          backgroundColor: "white",
          borderRadius: "8px",
          width: "95%",
          maxWidth: "1200px",
          maxHeight: "90vh",
          overflowY: "auto",
          boxShadow: "0 4px 15px rgba(0, 0, 0, 0.3)",
        }}
      >
        {/* Header */}
        <div
          style={{
            backgroundColor: "#f8f9fa",
            padding: "15px 20px",
            borderBottom: "1px solid #dee2e6",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            position: "sticky",
            top: 0,
            zIndex: 1,
          }}
        >
          <h4 style={{ margin: 0, color: "#495057" }}>Purchase Enquiry</h4>
          <button
            onClick={closeAllDialogs}
            style={{
              background: "none",
              border: "none",
              fontSize: "24px",
              cursor: "pointer",
              color: "#6c757d",
            }}
          >
            ×
          </button>
        </div>

        {/* Body */}
        <div style={{ padding: "20px" }}>
          {/* Date Input */}
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: "20px",
            }}
          >
            <h5 style={{ margin: 0, color: "#495057" }}>
              Purchase Enquiry Details
            </h5>
            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              <span style={{ color: "#6c757d", fontSize: "14px" }}>Date:</span>
              <input
                type="text"
                name="date"
                value={formData.date}
                onChange={handleInputChange}
                style={{
                  width: "120px",
                  padding: "6px 10px",
                  border: "1px solid #ced4da",
                  borderRadius: "4px",
                  fontSize: "14px",
                }}
              />
            </div>
          </div>

          {/* Form Fields */}
          <div
            style={{
              backgroundColor: "#f8f9fa",
              padding: "20px",
              borderRadius: "6px",
              marginBottom: "20px",
            }}
          >
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
                gap: "15px",
              }}
            >
              <div>
                <label
                  style={{
                    display: "block",
                    marginBottom: "5px",
                    fontWeight: "500",
                    color: "#495057",
                  }}
                >
                  Track From
                </label>
                <input
                  type="text"
                  name="trackFrom"
                  value={formData.trackFrom}
                  onChange={handleInputChange}
                  style={{
                    width: "100%",
                    padding: "8px 12px",
                    border: "1px solid #ced4da",
                    borderRadius: "4px",
                    fontSize: "14px",
                  }}
                  placeholder="Enter track from"
                />
              </div>
              <div>
                <label
                  style={{
                    display: "block",
                    marginBottom: "5px",
                    fontWeight: "500",
                    color: "#495057",
                  }}
                >
                  DOC No.
                </label>
                <input
                  type="text"
                  name="docNo"
                  value={formData.docNo}
                  onChange={handleInputChange}
                  style={{
                    width: "100%",
                    padding: "8px 12px",
                    border: "1px solid #ced4da",
                    borderRadius: "4px",
                    fontSize: "14px",
                  }}
                  placeholder="Enter document number"
                />
              </div>
              <div>
                <label
                  style={{
                    display: "block",
                    marginBottom: "5px",
                    fontWeight: "500",
                    color: "#495057",
                  }}
                >
                  DOC Date
                </label>
                <input
                  type="date"
                  name="docDate"
                  value={formData.docDate}
                  onChange={handleInputChange}
                  style={{
                    width: "100%",
                    padding: "8px 12px",
                    border: "1px solid #ced4da",
                    borderRadius: "4px",
                    fontSize: "14px",
                  }}
                />
              </div>
              <div>
                <label
                  style={{
                    display: "block",
                    marginBottom: "5px",
                    fontWeight: "500",
                    color: "#495057",
                  }}
                >
                  Vendor Type
                </label>
                <select
                  name="vendorType"
                  value={formData.vendorType}
                  onChange={handleInputChange}
                  style={{
                    width: "100%",
                    padding: "8px 12px",
                    border: "1px solid #ced4da",
                    borderRadius: "4px",
                    fontSize: "14px",
                  }}
                >
                  <option value="">Select vendor type</option>
                  <option value="supplier">Supplier</option>
                  <option value="manufacturer">Manufacturer</option>
                  <option value="distributor">Distributor</option>
                  <option value="wholesaler">Wholesaler</option>
                </select>
              </div>
              <div>
                <label
                  style={{
                    display: "block",
                    marginBottom: "5px",
                    fontWeight: "500",
                    color: "#495057",
                  }}
                >
                  Vendor Name
                </label>
                <input
                  type="text"
                  name="vendorName"
                  value={formData.vendorName}
                  onChange={handleInputChange}
                  style={{
                    width: "100%",
                    padding: "8px 12px",
                    border: "1px solid #ced4da",
                    borderRadius: "4px",
                    fontSize: "14px",
                  }}
                  placeholder="Enter vendor name"
                />
              </div>
            </div>
          </div>

          {/* Items Table */}
          <div
            style={{
              border: "1px solid #dee2e6",
              borderRadius: "6px",
              overflow: "hidden",
              marginBottom: "20px",
            }}
          >
            <div
              style={{
                backgroundColor: "#f8f9fa",
                padding: "15px 20px",
                borderBottom: "1px solid #dee2e6",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <h6 style={{ margin: 0, color: "#495057" }}>Items Details</h6>
              <button
                onClick={addNewRow}
                style={{
                  backgroundColor: "#007bff",
                  color: "white",
                  border: "none",
                  padding: "6px 12px",
                  borderRadius: "4px",
                  fontSize: "12px",
                  cursor: "pointer",
                }}
              >
                + Add Row
              </button>
            </div>

            <div style={{ overflowX: "auto" }}>
              <table
                style={{
                  width: "100%",
                  borderCollapse: "collapse",
                  fontSize: "13px",
                }}
              >
                <thead>
                  <tr style={{ backgroundColor: "#f8f9fa" }}>
                    <th
                      style={{
                        padding: "12px 8px",
                        borderRight: "1px solid #dee2e6",
                        textAlign: "left",
                        fontWeight: "600",
                        color: "#495057",
                        minWidth: "150px",
                      }}
                    >
                      Item Name
                    </th>
                    <th
                      style={{
                        padding: "12px 8px",
                        borderRight: "1px solid #dee2e6",
                        textAlign: "left",
                        fontWeight: "600",
                        color: "#495057",
                        minWidth: "80px",
                      }}
                    >
                      Quantity
                    </th>
                    <th
                      style={{
                        padding: "12px 8px",
                        borderRight: "1px solid #dee2e6",
                        textAlign: "left",
                        fontWeight: "600",
                        color: "#495057",
                        minWidth: "80px",
                      }}
                    >
                      Rate
                    </th>
                    <th
                      style={{
                        padding: "12px 8px",
                        borderRight: "1px solid #dee2e6",
                        textAlign: "left",
                        fontWeight: "600",
                        color: "#495057",
                        minWidth: "80px",
                      }}
                    >
                      Unit
                    </th>
                    <th
                      style={{
                        padding: "12px 8px",
                        borderRight: "1px solid #dee2e6",
                        textAlign: "left",
                        fontWeight: "600",
                        color: "#495057",
                        minWidth: "80px",
                      }}
                    >
                      Amount
                    </th>
                    <th
                      style={{
                        padding: "12px 8px",
                        borderRight: "1px solid #dee2e6",
                        textAlign: "left",
                        fontWeight: "600",
                        color: "#495057",
                        minWidth: "120px",
                      }}
                    >
                      Due Date
                    </th>
                    <th
                      style={{
                        padding: "12px 8px",
                        borderRight: "1px solid #dee2e6",
                        textAlign: "left",
                        fontWeight: "600",
                        color: "#495057",
                        minWidth: "80px",
                      }}
                    >
                      Set Rate
                    </th>
                    <th
                      style={{
                        padding: "12px 8px",
                        textAlign: "center",
                        fontWeight: "600",
                        color: "#495057",
                        minWidth: "60px",
                      }}
                    >
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {items.map((item, index) => (
                    <tr
                      key={index}
                      style={{ borderBottom: "1px solid #e9ecef" }}
                    >
                      <td style={{ padding: "8px" }}>
                        <input
                          type="text"
                          value={item.itemName}
                          onChange={(e) =>
                            handleItemChange(index, "itemName", e.target.value)
                          }
                          style={{
                            width: "100%",
                            padding: "4px 6px",
                            border: "1px solid #ced4da",
                            borderRadius: "3px",
                            fontSize: "12px",
                          }}
                          placeholder="Enter item name"
                        />
                      </td>
                      <td style={{ padding: "8px" }}>
                        <input
                          type="number"
                          value={item.quantity}
                          onChange={(e) =>
                            handleItemChange(index, "quantity", e.target.value)
                          }
                          style={{
                            width: "100%",
                            padding: "4px 6px",
                            border: "1px solid #ced4da",
                            borderRadius: "3px",
                            fontSize: "12px",
                          }}
                          placeholder="0"
                          min="0"
                          step="0.01"
                        />
                      </td>
                      <td style={{ padding: "8px" }}>
                        <input
                          type="number"
                          value={item.rate}
                          onChange={(e) =>
                            handleItemChange(index, "rate", e.target.value)
                          }
                          style={{
                            width: "100%",
                            padding: "4px 6px",
                            border: "1px solid #ced4da",
                            borderRadius: "3px",
                            fontSize: "12px",
                          }}
                          placeholder="0.00"
                          min="0"
                          step="0.01"
                        />
                      </td>
                      <td style={{ padding: "8px" }}>
                        <select
                          value={item.unit}
                          onChange={(e) =>
                            handleItemChange(index, "unit", e.target.value)
                          }
                          style={{
                            width: "100%",
                            padding: "4px 6px",
                            border: "1px solid #ced4da",
                            borderRadius: "3px",
                            fontSize: "12px",
                          }}
                        >
                          <option value="">Unit</option>
                          <option value="pcs">Pieces</option>
                          <option value="kg">Kg</option>
                          <option value="ltr">Liter</option>
                          <option value="box">Box</option>
                          <option value="mtr">Meter</option>
                        </select>
                      </td>
                      <td style={{ padding: "8px" }}>
                        <input
                          type="text"
                          value={item.amount}
                          readOnly
                          style={{
                            width: "100%",
                            padding: "4px 6px",
                            border: "1px solid #ced4da",
                            borderRadius: "3px",
                            fontSize: "12px",
                            backgroundColor: "#f8f9fa",
                          }}
                          placeholder="0.00"
                        />
                      </td>
                      <td style={{ padding: "8px" }}>
                        <input
                          type="date"
                          value={item.dueDate}
                          onChange={(e) =>
                            handleItemChange(index, "dueDate", e.target.value)
                          }
                          style={{
                            width: "100%",
                            padding: "4px 6px",
                            border: "1px solid #ced4da",
                            borderRadius: "3px",
                            fontSize: "12px",
                          }}
                        />
                      </td>
                      <td style={{ padding: "8px" }}>
                        <input
                          type="number"
                          value={item.setRate}
                          onChange={(e) =>
                            handleItemChange(index, "setRate", e.target.value)
                          }
                          style={{
                            width: "100%",
                            padding: "4px 6px",
                            border: "1px solid #ced4da",
                            borderRadius: "3px",
                            fontSize: "12px",
                          }}
                          placeholder="0.00"
                          min="0"
                          step="0.01"
                        />
                      </td>
                      <td style={{ padding: "8px", textAlign: "center" }}>
                        {items.length > 1 && (
                          <button
                            onClick={() => removeRow(index)}
                            style={{
                              backgroundColor: "#dc3545",
                              color: "white",
                              border: "none",
                              padding: "4px 8px",
                              borderRadius: "3px",
                              fontSize: "11px",
                              cursor: "pointer",
                            }}
                            title="Remove row"
                          >
                            🗑️
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Action Buttons */}
          <div
            style={{
              display: "flex",
              justifyContent: "flex-end",
              gap: "10px",
              paddingTop: "15px",
              borderTop: "1px solid #dee2e6",
            }}
          >
            <button
              onClick={closeAllDialogs}
              style={{
                backgroundColor: "#6c757d",
                color: "white",
                border: "none",
                padding: "8px 16px",
                borderRadius: "4px",
                cursor: "pointer",
                fontSize: "14px",
              }}
            >
              Cancel
            </button>
            <button
              style={{
                backgroundColor: "#17a2b8",
                color: "white",
                border: "none",
                padding: "8px 16px",
                borderRadius: "4px",
                cursor: "pointer",
                fontSize: "14px",
              }}
            >
              Save Draft
            </button>
            <button
              style={{
                backgroundColor: "#007bff",
                color: "white",
                border: "none",
                padding: "8px 16px",
                borderRadius: "4px",
                cursor: "pointer",
                fontSize: "14px",
              }}
            >
              Submit Enquiry
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="settings-content">
      {/* Main Page Header */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "20px 0",
          borderBottom: "1px solid #dee2e6",
          marginBottom: "20px",
        }}
      >
        <h2
          style={{
            margin: 0,
            color: "#2c3e50",
            fontSize: "1.8rem",
            fontWeight: "600",
          }}
        >
          Purchase Enquiry
        </h2>
        <button
          onClick={() => setShowVoucherDialog(true)}
          style={{
            backgroundColor: "#007bff",
            color: "white",
            border: "none",
            padding: "10px 20px",
            borderRadius: "6px",
            cursor: "pointer",
            fontSize: "14px",
            fontWeight: "500",
            boxShadow: "0 2px 4px rgba(0, 123, 255, 0.2)",
          }}
        >
          + Add Purchase Enquiry
        </button>
      </div>

      {/* Main Content Area */}
      <div
        style={{
          backgroundColor: "#f8f9fa",
          padding: "40px",
          borderRadius: "8px",
          textAlign: "center",
          color: "#6c757d",
        }}
      >
        <div style={{ fontSize: "48px", marginBottom: "20px" }}>📋</div>
        <h4 style={{ marginBottom: "10px", color: "#495057" }}>
          No Purchase Enquiries Yet
        </h4>
        <p style={{ marginBottom: "20px" }}>
          Click "Add Purchase Enquiry" to create your first enquiry.
        </p>
      </div>

      {/* Render Dialogs */}
      {showVoucherDialog && <VoucherTypeDialog />}
      {showPurchaseEnquiryDialog && <PurchaseEnquiryDialog />}
    </div>
  );
}