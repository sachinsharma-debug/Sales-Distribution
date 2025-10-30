import React, { useState, useEffect } from "react";
import "./Branches.css";
import ReactDOM from "react-dom";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import { BASE_URL } from "../../api/common";
import { Country, State, City } from "country-state-city";

const Branches = () => {
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
    MasterID: "",
    AlterID: "",
    BranchName: "",
    MailingName: "",
    Address: "",
    District: "",
    State: "",
    Country: "",
    Pincode: "",
    Telephone: "",
    Mobile: "",
    Fax: "",
    Email: "",
  });

  // Validation errors state
  const [validationErrors, setValidationErrors] = useState({
    Pincode: "",
    Telephone: "",
    Mobile: "",
    Fax: "",
    Email: "",
  });

  // State for countries, states, and cities
  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);

  useEffect(() => {
    getmethod();
    // Load countries
    const countryData = Country.getAllCountries();
    setCountries(countryData);
  }, []);

  // Update states when country changes
  useEffect(() => {
    if (formobj.Country) {
      const stateData = State.getStatesOfCountry(formobj.Country);
      setStates(stateData);

      // Reset state and city when country changes
      setformobj((prev) => ({
        ...prev,
        State: "",
        District: "",
      }));
      setCities([]);
    } else {
      setStates([]);
      setCities([]);
    }
  }, [formobj.Country]);

  // Update cities when state changes
  useEffect(() => {
    if (formobj.Country && formobj.State) {
      const cityData = City.getCitiesOfState(formobj.Country, formobj.State);
      setCities(cityData);

      // Reset city when state changes
      setformobj((prev) => ({
        ...prev,
        District: "",
      }));
    } else {
      setCities([]);
    }
  }, [formobj.Country, formobj.State]);

  // Handle search filter changes
  const handleSearchChange = (field, value) => {
    setSearchFilters((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const [branchesData, setbranchData] = useState([]);

  async function getmethod() {
    try {
      const res = await fetch(BASE_URL + "get_master/branch");
      const data = await res.json();
      setbranchData(data?.data || []);
    } catch (err) {
      console.error("Error fetching branches:", err);
    }
  }

  // Validation functions
  const validatePincode = (value) => {
    if (!value) return "";
    const pincodeRegex = /^\d{4,10}$/;
    return pincodeRegex.test(value) ? "" : "Pincode should be 4-10 digits";
  };

  const validatePhone = (value, fieldName) => {
    if (!value) return "";
    const phoneRegex = /^[\d\s\+\-\(\)]{5,15}$/;
    return phoneRegex.test(value)
      ? ""
      : `${fieldName} should be 5-15 digits with optional + - ( )`;
  };

  const validateEmail = (value) => {
    if (!value) return "";
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(value) ? "" : "Please enter a valid email address";
  };

  // Handle input changes with validation
  const handleInputChange = (field, value) => {
    setformobj((prev) => ({
      ...prev,
      [field]: value,
    }));

    // Validate the field
    let error = "";
    switch (field) {
      case "Pincode":
        error = validatePincode(value);
        break;
      case "Telephone":
        error = validatePhone(value, "Telephone");
        break;
      case "Mobile":
        error = validatePhone(value, "Mobile");
        break;
      case "Fax":
        error = validatePhone(value, "Fax");
        break;
      case "Email":
        error = validateEmail(value);
        break;
      default:
        break;
    }

    setValidationErrors((prev) => ({
      ...prev,
      [field]: error,
    }));
  };

  // Check if form has validation errors
  const hasValidationErrors = () => {
    return Object.values(validationErrors).some((error) => error !== "");
  };

  async function addupdate() {
    // Check for validation errors before submitting
    if (hasValidationErrors()) {
      alert("Please fix validation errors before submitting.");
      return;
    }

    let payload = {
      tablename: "branch",
      data: formobj,
    };

    try {
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
    } catch (error) {
      console.error("Error creating/updating branch:", error);
    }
  }

  // Filter branches based on search criteria
  const filteredBranches = branchesData.filter((branch) => {
    return (
      branch.BranchName.toLowerCase().includes(
        searchFilters.name.toLowerCase()
      ) &&
      branch.MailingName.toLowerCase().includes(
        searchFilters.parentName.toLowerCase()
      ) &&
      (branch.Address || "")
        .toLowerCase()
        .includes(searchFilters.address.toLowerCase()) &&
      (branch.Telephone || "")
        .toLowerCase()
        .includes(searchFilters.phone.toLowerCase()) &&
      (branch.Mobile || "")
        .toLowerCase()
        .includes(searchFilters.mobile.toLowerCase()) &&
      (branch.Email || "")
        .toLowerCase()
        .includes(searchFilters.email.toLowerCase())
    );
  });

  let subtitle;
  const [dialogOpen, setDialogOpen] = React.useState(false);
  const [fetchFromPincode, setFetchFromPincode] = useState(false);
  const [pincodeDialogOpen, setPincodeDialogOpen] = useState(false);
  const [pincodeDialogValue, setPincodeDialogValue] = useState("");

  function openDialog() {
    setDialogOpen(true);
    // Reset form and validation errors when opening dialog for new entry
    setformobj({
      MasterID: "",
      AlterID: "",
      BranchName: "",
      MailingName: "",
      Address: "",
      District: "",
      State: "",
      Country: "",
      Pincode: "",
      Telephone: "",
      Mobile: "",
      Fax: "",
      Email: "",
    });

    setValidationErrors({
      Pincode: "",
      Telephone: "",
      Mobile: "",
      Fax: "",
      Email: "",
    });
  }

  function closeDialog() {
    setDialogOpen(false);
  }

  function openPincodeDialog() {
    setPincodeDialogValue(formobj.Pincode || "");
    setPincodeDialogOpen(true);
  }

  function closePincodeDialog() {
    setPincodeDialogOpen(false);
  }

  function confirmPincodeDialog() {
    // Use handleInputChange so validation runs
    handleInputChange("Pincode", pincodeDialogValue);
    setPincodeDialogOpen(false);
  }

  return (
    <>
      <Dialog
        open={dialogOpen}
        onClose={closeDialog}
        maxWidth="md"
        fullWidth
        PaperProps={{
          style: {
            maxHeight: "95vh",
            overflow: "auto",
            maxWidth: "700px",
          },
        }}
      >
        <DialogTitle>
          <div className="d-flex justify-content-between align-items-center">
            <div style={{ fontSize: 20 }}>Add Branch</div>
            <div className="d-flex gap-3 align-items-center">
              <div className="d-flex align-items-center gap-2">
                <label
                  htmlFor="MasterID"
                  className="form-label mb-0"
                  style={{ fontSize: 14 }}
                >
                  Master ID:
                </label>
                <input
                  type="text"
                  value={formobj.MasterID}
                  onChange={(e) =>
                    handleInputChange("MasterID", e.target.value)
                  }
                  className="form-control"
                  id="MasterID"
                  style={{ width: "100px", height: "32px" }}
                />
              </div>
              <div className="d-flex align-items-center gap-2">
                <label
                  htmlFor="AlterID"
                  className="form-label mb-0"
                  style={{ fontSize: 14 }}
                >
                  Alter ID:
                </label>
                <input
                  type="text"
                  value={formobj.AlterID}
                  onChange={(e) => handleInputChange("AlterID", e.target.value)}
                  className="form-control"
                  id="AlterID"
                  style={{ width: "100px", height: "32px" }}
                />
              </div>
            </div>
          </div>
        </DialogTitle>
        <DialogContent>
          <form className="mt-2 branch-form">
            <div className="row">
              <div className="col-12">
                <div className="mt-3 row">
                  <div className="col-4 my-auto">
                    <label htmlFor="BranchName" className="form-label">
                      Branch Name
                    </label>
                  </div>
                  <div className="col-8">
                    <input
                      type="text"
                      value={formobj.BranchName}
                      onChange={(e) =>
                        handleInputChange("BranchName", e.target.value)
                      }
                      className="form-control"
                      id="BranchName"
                    />
                  </div>

                  <div className="col-4 my-auto">
                    <label htmlFor="MailingName" className="form-label">
                      Mailing Name
                    </label>
                  </div>
                  <div className="col-8">
                    <input
                      type="text"
                      value={formobj.MailingName}
                      onChange={(e) =>
                        handleInputChange("MailingName", e.target.value)
                      }
                      className="form-control"
                      id="MailingName"
                    />
                  </div>

                  <div className="col-4 my-auto">
                    <label className="form-label" htmlFor="Address">
                      Address
                    </label>
                  </div>
                  <div className="col-8">
                    <textarea
                      value={formobj.Address}
                      onChange={(e) =>
                        handleInputChange("Address", e.target.value)
                      }
                      className="form-control w-100"
                      id="Address"
                    />
                  </div>
                  <div className="col-4 my-auto">
                    <label className="form-label">Fetch from Pincode</label>
                  </div>
                  <div
                    className="col-8 d-flex align-items-center"
                    style={{ gap: "8px" }}
                  >
                    <div className="form-check form-switch">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        id="fetchFromPincode"
                        checked={fetchFromPincode}
                        onChange={(e) => setFetchFromPincode(e.target.checked)}
                      />
                      <label
                        className="form-check-label ms-2"
                        htmlFor="fetchFromPincode"
                      >
                        Yes
                      </label>
                    </div>
                    {fetchFromPincode && (
                      <button
                        type="button"
                        className="btn btn-outline-primary btn-sm"
                        style={{
                          padding: "3px 8px",
                          fontSize: "0.75rem",
                          lineHeight: "1",
                        }}
                        onClick={openPincodeDialog}
                      >
                        Set
                      </button>
                    )}
                  </div>

                  <div className="col-4 my-auto">
                    <label htmlFor="Country" className="form-label">
                      Country
                    </label>
                  </div>
                  <div className="col-8 my-1">
                    <select
                      value={formobj.Country}
                      onChange={(e) =>
                        handleInputChange("Country", e.target.value)
                      }
                      id="Country"
                      className="form-select w-100"
                    >
                      <option value="">Select Country</option>
                      {countries.map((country) => (
                        <option key={country.isoCode} value={country.isoCode}>
                          {country.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="col-4 my-auto">
                    <label htmlFor="State" className="form-label">
                      State
                    </label>
                  </div>
                  <div className="col-8">
                    <select
                      value={formobj.State}
                      onChange={(e) =>
                        handleInputChange("State", e.target.value)
                      }
                      id="State"
                      className="form-select w-100"
                      disabled={!formobj.Country}
                    >
                      <option value="">Select State</option>
                      {states.map((state) => (
                        <option key={state.isoCode} value={state.isoCode}>
                          {state.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="col-4 my-auto">
                    <label htmlFor="District" className="form-label">
                      City
                    </label>
                  </div>
                  <div className="col-8">
                    <select
                      value={formobj.District}
                      onChange={(e) =>
                        handleInputChange("District", e.target.value)
                      }
                      id="District"
                      className="form-select w-100"
                      disabled={!formobj.State}
                    >
                      <option value="">Select City</option>
                      {cities.map((city) => (
                        <option key={city.name} value={city.name}>
                          {city.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="col-4 my-auto">
                    <label htmlFor="Pincode" className="form-label">
                      Pincode
                    </label>
                  </div>
                  <div className="col-8">
                    <input
                      type="text"
                      value={formobj.Pincode}
                      onChange={(e) =>
                        handleInputChange("Pincode", e.target.value)
                      }
                      className={`form-control ${
                        validationErrors.Pincode ? "is-invalid" : ""
                      }`}
                      id="Pincode"
                    />
                    {validationErrors.Pincode && (
                      <div className="invalid-feedback">
                        {validationErrors.Pincode}
                      </div>
                    )}
                  </div>

                  <div className="col-4 my-auto">
                    <label htmlFor="Telephone" className="form-label">
                      Telephone
                    </label>
                  </div>
                  <div className="col-8">
                    <input
                      type="text"
                      value={formobj.Telephone}
                      onChange={(e) =>
                        handleInputChange("Telephone", e.target.value)
                      }
                      className={`form-control ${
                        validationErrors.Telephone ? "is-invalid" : ""
                      }`}
                      id="Telephone"
                    />
                    {validationErrors.Telephone && (
                      <div className="invalid-feedback">
                        {validationErrors.Telephone}
                      </div>
                    )}
                  </div>

                  <div className="col-4 my-auto">
                    <label htmlFor="Mobile" className="form-label">
                      Mobile
                    </label>
                  </div>
                  <div className="col-8">
                    <input
                      type="text"
                      value={formobj.Mobile}
                      onChange={(e) =>
                        handleInputChange("Mobile", e.target.value)
                      }
                      className={`form-control ${
                        validationErrors.Mobile ? "is-invalid" : ""
                      }`}
                      id="Mobile"
                    />
                    {validationErrors.Mobile && (
                      <div className="invalid-feedback">
                        {validationErrors.Mobile}
                      </div>
                    )}
                  </div>

                  <div className="col-4 my-auto">
                    <label htmlFor="Fax" className="form-label">
                      Fax
                    </label>
                  </div>
                  <div className="col-8">
                    <input
                      type="text"
                      value={formobj.Fax}
                      onChange={(e) => handleInputChange("Fax", e.target.value)}
                      className={`form-control ${
                        validationErrors.Fax ? "is-invalid" : ""
                      }`}
                      id="Fax"
                    />
                    {validationErrors.Fax && (
                      <div className="invalid-feedback">
                        {validationErrors.Fax}
                      </div>
                    )}
                  </div>

                  <div className="col-4 my-auto">
                    <label htmlFor="Email" className="form-label">
                      Email
                    </label>
                  </div>
                  <div className="col-8">
                    <input
                      type="text"
                      value={formobj.Email}
                      onChange={(e) =>
                        handleInputChange("Email", e.target.value)
                      }
                      className={`form-control ${
                        validationErrors.Email ? "is-invalid" : ""
                      }`}
                      id="Email"
                    />
                    {validationErrors.Email && (
                      <div className="invalid-feedback">
                        {validationErrors.Email}
                      </div>
                    )}
                  </div>
                </div>
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
          <button
            type="button"
            className="btn btn-primary"
            onClick={addupdate}
            disabled={hasValidationErrors()}
          >
            Add
          </button>
        </DialogActions>
      </Dialog>

      {/* Pincode setter dialog */}
      <Dialog
        open={pincodeDialogOpen}
        onClose={closePincodeDialog}
        maxWidth="xs"
        fullWidth
        PaperProps={{ style: { padding: 12 } }}
      >
        <DialogTitle>Set Pincode</DialogTitle>
        <DialogContent>
          <div className="mb-2">
            <label htmlFor="pincodeDialogInput" className="form-label">
              Pincode
            </label>
            <input
              id="pincodeDialogInput"
              type="text"
              className={`form-control ${
                validationErrors.Pincode ? "is-invalid" : ""
              }`}
              value={pincodeDialogValue}
              onChange={(e) => setPincodeDialogValue(e.target.value)}
            />
            {validationErrors.Pincode && (
              <div className="invalid-feedback">{validationErrors.Pincode}</div>
            )}
          </div>
        </DialogContent>
        <DialogActions>
          <button className="btn btn-secondary" onClick={closePincodeDialog}>
            Cancel
          </button>
          <button className="btn btn-primary" onClick={confirmPincodeDialog}>
            Set
          </button>
        </DialogActions>
      </Dialog>

      <div className="branches-page">
        <div className="branches-header">
          <h2>Branches</h2>
          <button onClick={openDialog} className="btn btn-primary new-btn">
            Add Branch
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
            Showing 1 to {filteredBranches.length} of {filteredBranches.length}{" "}
            entries
            {filteredBranches.length !== branchesData.length && (
              <span className="filtered-text">
                {" "}
                (filtered from {branchesData.length} total entries)
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
                <th>Branch Name</th>
                <th>Mailing Name</th>
                <th>State</th>
                <th>City</th>
                <th>Mobile</th>
                <th>Email</th>
                <th>Actions</th>
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
                    placeholder="Search mailing name..."
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
                    placeholder="Search state..."
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
                    placeholder="Search city..."
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
                <th></th>
              </tr>
            </thead>
            <tbody>
              {filteredBranches.map((branch, index) => (
                <tr key={index}>
                  <td>{branch.BranchName}</td>
                  <td>{branch.MailingName}</td>
                  <td>{branch.State}</td>
                  <td>{branch.District}</td>
                  <td>{branch.Mobile}</td>
                  <td>{branch.Email}</td>
                  <td>
                    <button
                      className="btn btn-sm btn-outline-primary"
                      onClick={() => {
                        setformobj(branch);
                        setDialogOpen(true);
                      }}
                    >
                      Edit
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default Branches;