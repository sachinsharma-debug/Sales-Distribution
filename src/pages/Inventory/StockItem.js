import React, { useState } from "react";
import "../Settings/Companies.css";
import ReactDOM from 'react-dom';

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

  // Dialog state
  const [dialogOpen, setDialogOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("basic");
  const [maintainInBatches, setMaintainInBatches] = useState(false);

  // Handle search filter changes
  const handleSearchChange = (field, value) => {
    setSearchFilters((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  // Handle toggle change
  const handleToggleChange = (e) => {
    setMaintainInBatches(e.target.checked);
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

  // Dialog functions
  const openDialog = () => {
    setDialogOpen(true);
    setActiveTab("basic");
    setMaintainInBatches(false); // Reset toggle when dialog opens
  };

  const closeDialog = () => {
    setDialogOpen(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add your form submission logic here
    closeDialog();
  };

  // Render form fields based on active tab
  const renderFormFields = () => {
    switch (activeTab) {
      case "basic":
        return (
          <div className="row">
            <div className="col-5 my-auto">
              <label htmlFor="MasterID" className="form-label">Master ID</label>
            </div>
            <div className="col-7">
              <input type="text" className="form-control" id="MasterID" />
            </div>
            <div className="col-5 my-auto">
              <label htmlFor="AlterID" className="form-label">Alter ID</label>
            </div>
            <div className="col-7">
              <input type="text" className="form-control" id="AlterID" />
            </div>

            <div className="col-5 my-auto">
              <label htmlFor="groupName" className="form-label">Group Name</label>
            </div>
            <div className="col-7">
              <select id="groupName" className="form-select w-100">
                <option>Primary</option>
              </select>
            </div>

            <div className="col-5 my-auto">
              <label htmlFor="itemName" className="form-label">Name</label>
            </div>
            <div className="col-7">
              <input type="text" className="form-control" id="itemName" />
            </div>

            <div className="col-5 my-auto">
              <label htmlFor="under" className="form-label">Under</label>
            </div>
            <div className="col-7">
              <select id="under" className="form-select w-100">
                <option>Primary</option>
              </select>
            </div>

            <div className="col-5 my-auto">
              <label htmlFor="units" className="form-label">Units</label>
            </div>
            <div className="col-7">
              <select id="units" className="form-select w-100">
                <option>Primary</option>
              </select>
            </div>

            <div className="col-5 my-auto">
              <label htmlFor="alternateUnits" className="form-label">Alternate Units</label>
            </div>
            <div className="col-7">
              <select id="alternateUnits" className="form-select w-100">
                <option>Primary</option>
              </select>
            </div>
          </div>
        );

      case "additional":
        return (
          <div className="row">
            <div className="col-5 my-auto">
              <label htmlFor="maintainInBatches" className="form-label">Maintain in batches</label>
            </div>
            <div className="col-7">
              <div className="form-check form-switch">
                <input 
                  className="form-check-input" 
                  type="checkbox" 
                  role="switch" 
                  id="maintainInBatches" 
                  checked={maintainInBatches}
                  onChange={handleToggleChange}
                />
              </div>
            </div>

            {/* Conditionally render these fields based on toggle state */}
            {maintainInBatches && (
              <>
                
                <div className="col-5 my-auto" style={{paddingLeft:30}}>
                  <label htmlFor="trackManufacturingDate" className="form-label">Track date of manufacturing</label>
                </div>
                <div className="col-7">
                  <select id="trackManufacturingDate" className="form-select w-100">
                    <option>No</option>
                    <option>Yes</option>
                  </select>
                </div>

                <div className="col-5 my-auto" style={{paddingLeft:30}}>
                  <label htmlFor="useExpiryDates" className="form-label">Use expiry dates</label>
                </div>
                <div className="col-7">
                  <select id="useExpiryDates" className="form-select w-100">
                    <option>No</option>
                    <option>Yes</option>
                  </select>
                </div>
              </>
            )}

            <div className="col-5 my-auto">
              <label htmlFor="alterComponents" className="form-label">Alter components (BOM)</label>
            </div>
            <div className="col-7">
              <select id="alterComponents" className="form-select w-100">
                <option>No</option>
                <option>Yes</option>
              </select>
            </div>

            <div className="col-5 my-auto">
              <label htmlFor="setAssemblySteps" className="form-label">Set/Alter assembly steps</label>
            </div>
            <div className="col-7">
              <select id="setAssemblySteps" className="form-select w-100">
                <option>No</option>
                <option>Yes</option>
              </select>
            </div>

            <div className="col-5 my-auto">
              <label htmlFor="alterStandardRates" className="form-label">Alter standard rates</label>
            </div>
            <div className="col-7">
              <select id="alterStandardRates" className="form-select w-100">
                <option>No</option>
                <option>Yes</option>
              </select>
            </div>

            <div className="col-5 my-auto">
              <label htmlFor="enableCostTracking" className="form-label">Enable cost tracking</label>
            </div>
            <div className="col-7">
              <select id="enableCostTracking" className="form-select w-100">
                <option>No</option>
                <option>Yes</option>
              </select>
            </div>

            <div className="col-5 my-auto">
              <label htmlFor="costingMethod" className="form-label">Costing method</label>
            </div>
            <div className="col-7">
              <select id="costingMethod" className="form-select w-100">
                <option>No</option>
                <option>Yes</option>
              </select>
            </div>

            <div className="col-5 my-auto">
              <label htmlFor="marketValuationMethod" className="form-label">Market valuation method</label>
            </div>
            <div className="col-7">
              <select id="marketValuationMethod" className="form-select w-100">
                <option>No</option>
                <option>Yes</option>
              </select>
            </div>
          </div>
        );

      case "statutory":
        return (
          <>
            <div className="row">
              <div className="col-5 my-auto">
                <label htmlFor="gstApplicability" className="form-label">GST applicability</label>
              </div>
              <div className="col-7">
                <select id="gstApplicability" className="form-select w-100">
                  <option>Applicable</option>
                  <option>Not Applicable</option>
                </select>
              </div>
            </div>
            <div className="row">
              <div className="col-12 bg-light py-1 my-2 text-center">HSN/SAC</div>
              <div className="col-5 my-auto">
                <label htmlFor="hsnDetails" className="form-label">HSN/SAC details</label>
              </div>
              <div className="col-7">
                <select id="hsnDetails" className="form-select w-100">
                  <option>As per company/stock group</option>
                  <option>Specify details here</option>
                  <option>Use gst classification</option>
                </select>
              </div>

              <div className="col-5 my-auto">
                <label htmlFor="hsnCode" className="form-label">HSN/SAC</label>
              </div>
              <div className="col-7">
                <input type="text" className="form-control" id="hsnCode" />
              </div>

              <div className="col-5 my-auto">
                <label htmlFor="description" className="form-label">Description</label>
              </div>
              <div className="col-7">
                <textarea type="text" className="form-control" id="description" />
              </div>
            </div>
            <div className="row">
              <div className="col-12 bg-light py-1 my-2 text-center">GST Rate</div>
              <div className="col-5 my-auto">
                <label htmlFor="gstRateDetails" className="form-label">GST rate details</label>
              </div>
              <div className="col-7">
                <select id="gstRateDetails" className="form-select w-100">
                  <option>As per company/stock group</option>
                  <option>Specify details here</option>
                  <option>Use gst classification</option>
                </select>
              </div>

              <div className="col-5 my-auto">
                <label htmlFor="taxabilityType" className="form-label">Taxability type</label>
              </div>
              <div className="col-7">
                <select id="taxabilityType" className="form-select w-100">
                  <option>Exempt</option>
                  <option>Nil rated</option>
                  <option>Non gst</option>
                  <option>Taxable</option>
                </select>
              </div>

              <div className="col-5 my-auto">
                <label htmlFor="cgst" className="form-label">GST rate (%)</label>
              </div>
              <div className="col-7">
                <input type="number" className="form-control" id="cgst" step="0.01" />
              </div>

              <div className="col-5 my-auto">
                <label htmlFor="typeOfSupply" className="form-label">Type of supply</label>
              </div>
              <div className="col-7">
                <select id="typeOfSupply" className="form-select w-100">
                  <option>Capital goods</option>
                  <option>Goods</option>
                  <option>Services</option>
                </select>
              </div>

              <div className="col-5 my-auto">
                <label htmlFor="reportingUOM" className="form-label">Reporting UOM (UQC)</label>
              </div>
              <div className="col-7">
                <select id="reportingUOM" className="form-select w-100">
                  <option>NOS</option>
                  <option>PCS</option>
                </select>
              </div>

              <div className="col-5 my-auto">
                <label htmlFor="alterMrpDetails" className="form-label">Set/Alter mrp details</label>
              </div>
              <div className="col-7">
                <select id="alterMrpDetails" className="form-select w-100">
                  <option>NO</option>
                  <option>Yes</option>
                </select>
              </div>

              <div className="col-5 my-auto">
                <label htmlFor="dutyRate" className="form-label">Rate of duty (eg 5)</label>
              </div>
              <div className="col-7">
                <input type="text" className="form-control" id="dutyRate" />
              </div>
            </div>
          </>
        );

      default:
        return null;
    }
  };

  return (
    <>
      {/* Dialog */}
      {dialogOpen && (
        <div className="dialog-overlay">
          <div className="dialog-content stock-item-dialog">
            <div className="pb-2" style={{ borderBottom: '1px solid #eee' }}>
              <div style={{ fontSize: 20 }}>Add Stock Item</div>
            </div>
            <form id="stockItemForm" className="company-form" style={{ maxHeight: '500px' }} onSubmit={handleSubmit}>
              <div className="row">
                <div className="col-12">
                  <div className="mt-3 row">
                    <div className="col-10" style={{ borderRight: '1px solid #e9e9e9ff' }}>
                      <div className="row">
                        {renderFormFields()}
                      </div>
                    </div>
                    <div className="col-2">
                      <div
                        className={`py-1 px-2 text-xs ${activeTab === "basic" ? "active-tab" : ""}`}
                        style={{ borderBottom: '1px solid #e9e9e9ff', cursor: 'pointer' }}
                        onClick={() => setActiveTab("basic")}
                      >
                        Basic
                      </div>
                      <div
                        className={`py-1 px-2 text-xs ${activeTab === "additional" ? "active-tab" : ""}`}
                        style={{ borderBottom: '1px solid #e9e9e9ff', cursor: 'pointer' }}
                        onClick={() => setActiveTab("additional")}
                      >
                        Additional
                      </div>
                      <div
                        className={`py-1 px-2 text-xs ${activeTab === "statutory" ? "active-tab" : ""}`}
                        style={{ borderBottom: '1px solid #e9e9e9ff', cursor: 'pointer' }}
                        onClick={() => setActiveTab("statutory")}
                      >
                        Statutory
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </form>
            <button
              className="dialog-close-btn"
              onClick={closeDialog}
              style={{
                position: 'absolute',
                top: '10px',
                right: '10px',
                background: 'none',
                border: 'none',
                fontSize: '20px',
                cursor: 'pointer'
              }}
            >
              ×
            </button>
            <hr />
            <div className="my-auto text-end">
              <button type="submit" form="stockItemForm" className="btn btn-primary">Add</button>
            </div>
          </div>
        </div>
      )}

      <div className="companies-page">
        <div className="companies-header">
          <h2>Stock Item</h2>
          <button onClick={openDialog} className="btn btn-primary new-btn">Add Stock Item</button>
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
            Showing 1 to {filteredCompanies.length} of {filteredCompanies.length}{" "}
            entries
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