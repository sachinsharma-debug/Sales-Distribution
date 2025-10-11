import React, { useState, useEffect } from "react";
import "./Branches.css";
import ReactDOM from 'react-dom';
import Modal from 'react-modal';
import { BASE_URL } from "../../api/common";
import { Country, State, City } from "country-state-city";

const CustomStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    maxWidth: '90vw',
    width: 'auto',
    maxHeight: '90vh',
    overflow: 'auto'
  },
};

const Plants = () => {
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
    "PlantName": "",
    "MailingName": "",
    "Address": "",
    "District": "",
    "State": "",
    "Country": "",
    "Pincode": "",
    "Telephone": "",
    "Mobile": "",
    "Fax": "",
    "Email": ""
  });

  // Validation errors state
  const [validationErrors, setValidationErrors] = useState({
    Pincode: "",
    Telephone: "",
    Mobile: "",
    Fax: "",
    Email: ""
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
      setformobj(prev => ({
        ...prev,
        State: "",
        District: ""
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
      setformobj(prev => ({
        ...prev,
        District: ""
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

  const [plantsData, setplantsData] = useState([]);

  async function getmethod() {
    try {
      const res = await fetch(BASE_URL + "get_master/plants");
      const data = await res.json();
      setplantsData(data?.data || []);
    } catch (err) {
      console.error("Error fetching plants:", err);
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
    return phoneRegex.test(value) ? "" : `${fieldName} should be 5-15 digits with optional + - ( )`;
  };

  const validateEmail = (value) => {
    if (!value) return "";
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(value) ? "" : "Please enter a valid email address";
  };

  // Handle input changes with validation
  const handleInputChange = (field, value) => {
    setformobj(prev => ({
      ...prev,
      [field]: value
    }));

    // Validate the field
    let error = "";
    switch(field) {
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

    setValidationErrors(prev => ({
      ...prev,
      [field]: error
    }));
  };

  // Check if form has validation errors
  const hasValidationErrors = () => {
    return Object.values(validationErrors).some(error => error !== "");
  };

  async function addupdate() {
    // Check for validation errors before submitting
    if (hasValidationErrors()) {
      alert("Please fix validation errors before submitting.");
      return;
    }

    let payload = {
      tablename: "plants",
      data: formobj
    }

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
      closeModal();
    } catch (error) {
      console.error("Error creating/updating plant:", error);
    }
  }

  // Filter plants based on search criteria
  const filteredPlant = plantsData.filter(plant => {
    return (
      plant.PlantName.toLowerCase().includes(searchFilters.name.toLowerCase()) &&
      plant.MailingName.toLowerCase().includes(searchFilters.parentName.toLowerCase()) &&
      (plant.Address || "").toLowerCase().includes(searchFilters.address.toLowerCase()) &&
      (plant.Telephone || "").toLowerCase().includes(searchFilters.phone.toLowerCase()) &&
      (plant.Mobile || "").toLowerCase().includes(searchFilters.mobile.toLowerCase()) &&
      (plant.Email || "").toLowerCase().includes(searchFilters.email.toLowerCase())
    );
  });

  let subtitle;
  const [modalIsOpen, setIsOpen] = React.useState(false);

  function openModal() {
    setIsOpen(true);
    // Reset form and validation errors when opening modal for new entry
    setformobj({
      "MasterID": "",
      "AlterID": "",
      "PlantName": "",
      "MailingName": "",
      "Address": "",
      "District": "",
      "State": "",
      "Country": "",
      "Pincode": "",
      "Telephone": "",
      "Mobile": "",
      "Fax": "",
      "Email": ""
    });
    
    setValidationErrors({
      Pincode: "",
      Telephone: "",
      Mobile: "",
      Fax: "",
      Email: ""
    });
  }

  function afterOpenModal() {
    // references are now sync'd and can be accessed.
  }

  function closeModal() {
    setIsOpen(false);
  }

  return (
    <>
      <Modal
        isOpen={modalIsOpen}
        onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        style={CustomStyles}
        contentLabel="Plant Modal"
        ariaHideApp={false}
      >
        <div className="d-flex justify-content-between pb-2" style={{ borderBottom: '1px solid #eee' }}>
          <div style={{ fontSize: 20 }}>Add Plant</div>
          <div className="my-auto">
            <button 
              type="submit" 
              className="btn btn-primary"
              onClick={addupdate}
              disabled={hasValidationErrors()}
            >Add</button>
          </div>
        </div>
        <form className="mt-2 branch-form" style={{ maxHeight: '500px', overflowY: 'auto' }}>
          <div className="row">
            <div className="col-12">
              <div className="mt-3 row">
                <div className="col-4 my-auto">
                  <label htmlFor="MasterID" className="form-label">Master ID</label>
                </div>
                <div className="col-8">
                  <input 
                    type="text"
                    value={formobj.MasterID}
                    onChange={(e) => handleInputChange("MasterID", e.target.value)}
                    className="form-control" 
                    id="MasterID" 
                  />
                </div>
                
                <div className="col-4 my-auto">
                  <label htmlFor="AlterID" className="form-label">Alter ID</label>
                </div>
                <div className="col-8">
                  <input 
                    type="text"
                    value={formobj.AlterID}
                    onChange={(e) => handleInputChange("AlterID", e.target.value)}
                    className="form-control" 
                    id="AlterID" 
                  />
                </div>

                <div className="col-4 my-auto">
                  <label htmlFor="PlantName" className="form-label">Plant Name</label>
                </div>
                <div className="col-8">
                  <input 
                    type="text"
                    value={formobj.PlantName}
                    onChange={(e) => handleInputChange("PlantName", e.target.value)}
                    className="form-control" 
                    id="PlantName" 
                  />
                </div>

                <div className="col-4 my-auto">
                  <label htmlFor="MailingName" className="form-label">Mailing Name</label>
                </div>
                <div className="col-8">
                  <input 
                    type="text"
                    value={formobj.MailingName}
                    onChange={(e) => handleInputChange("MailingName", e.target.value)}
                    className="form-control" 
                    id="MailingName" 
                  />
                </div>

                <div className="col-4 my-auto">
                  <label className="form-label" htmlFor="Address">Address</label>
                </div>
                <div className="col-8">
                  <textarea
                    value={formobj.Address}
                    onChange={(e) => handleInputChange("Address", e.target.value)}
                    className="form-control w-100" 
                    id="Address" 
                  />
                </div>

                <div className="col-4 my-auto">
                  <label htmlFor="Country" className="form-label">Country</label>
                </div>
                <div className="col-8 my-1">
                  <select
                    value={formobj.Country}
                    onChange={(e) => handleInputChange("Country", e.target.value)}
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
                  <label htmlFor="State" className="form-label">State</label>
                </div>
                <div className="col-8">
                  <select
                    value={formobj.State}
                    onChange={(e) => handleInputChange("State", e.target.value)}
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
                  <label htmlFor="District" className="form-label">City</label>
                </div>
                <div className="col-8">
                  <select
                    value={formobj.District}
                    onChange={(e) => handleInputChange("District", e.target.value)}
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
                  <label htmlFor="Pincode" className="form-label">Pincode</label>
                </div>
                <div className="col-8">
                  <input 
                    type="text"
                    value={formobj.Pincode}
                    onChange={(e) => handleInputChange("Pincode", e.target.value)}
                    className={`form-control ${validationErrors.Pincode ? 'is-invalid' : ''}`} 
                    id="Pincode" 
                  />
                  {validationErrors.Pincode && (
                    <div className="invalid-feedback">{validationErrors.Pincode}</div>
                  )}
                </div>

                <div className="col-4 my-auto">
                  <label htmlFor="Telephone" className="form-label">Telephone</label>
                </div>
                <div className="col-8">
                  <input 
                    type="text"
                    value={formobj.Telephone}
                    onChange={(e) => handleInputChange("Telephone", e.target.value)}
                    className={`form-control ${validationErrors.Telephone ? 'is-invalid' : ''}`} 
                    id="Telephone" 
                  />
                  {validationErrors.Telephone && (
                    <div className="invalid-feedback">{validationErrors.Telephone}</div>
                  )}
                </div>

                <div className="col-4 my-auto">
                  <label htmlFor="Mobile" className="form-label">Mobile</label>
                </div>
                <div className="col-8">
                  <input 
                    type="text"
                    value={formobj.Mobile}
                    onChange={(e) => handleInputChange("Mobile", e.target.value)}
                    className={`form-control ${validationErrors.Mobile ? 'is-invalid' : ''}`} 
                    id="Mobile" 
                  />
                  {validationErrors.Mobile && (
                    <div className="invalid-feedback">{validationErrors.Mobile}</div>
                  )}
                </div>

                <div className="col-4 my-auto">
                  <label htmlFor="Fax" className="form-label">Fax</label>
                </div>
                <div className="col-8">
                  <input 
                    type="text"
                    value={formobj.Fax}
                    onChange={(e) => handleInputChange("Fax", e.target.value)}
                    className={`form-control ${validationErrors.Fax ? 'is-invalid' : ''}`} 
                    id="Fax" 
                  />
                  {validationErrors.Fax && (
                    <div className="invalid-feedback">{validationErrors.Fax}</div>
                  )}
                </div>

                <div className="col-4 my-auto">
                  <label htmlFor="Email" className="form-label">Email</label>
                </div>
                <div className="col-8">
                  <input 
                    type="text"
                    value={formobj.Email}
                    onChange={(e) => handleInputChange("Email", e.target.value)}
                    className={`form-control ${validationErrors.Email ? 'is-invalid' : ''}`} 
                    id="Email" 
                  />
                  {validationErrors.Email && (
                    <div className="invalid-feedback">{validationErrors.Email}</div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </form>
      </Modal>
      
      <div className="branches-page">
        <div className="branches-header">
          <h2>Plants</h2>
          <button onClick={openModal} className="btn btn-primary new-btn">Add Plant</button>
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
            Showing 1 to {filteredPlant.length} of {filteredPlant.length}{" "}
            entries
            {filteredPlant.length !== plantsData.length && (
              <span className="filtered-text">
                {" "}
                (filtered from {plantsData.length} total entries)
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
                <th>Plant Name</th>
                <th>Mailing Name<span className="sort-icon">⇅</span></th>
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
                    onChange={(e) => handleSearchChange("parentName", e.target.value)}
                  />
                </th>
                <th>
                  <input
                    type="text"
                    className="search-input"
                    placeholder="Search state..."
                    value={searchFilters.address}
                    onChange={(e) => handleSearchChange("address", e.target.value)}
                  />
                </th>
                <th>
                  <input
                    type="text"
                    className="search-input"
                    placeholder="Search city..."
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
                <th></th>
              </tr>
            </thead>
            <tbody>
              {filteredPlant.map((plant, index) => (
                <tr key={index}>
                  <td>{plant.PlantName}</td>
                  <td>{plant.MailingName}</td>
                  <td>{plant.State}</td>
                  <td>{plant.District}</td>
                  <td>{plant.Mobile}</td>
                  <td>{plant.Email}</td>
                  <td>
                    <button 
                      className="btn btn-sm btn-outline-primary"
                      onClick={() => {
                        setformobj(plant);
                        setIsOpen(true);
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

export default Plants;