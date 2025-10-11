import React, { useState, useEffect } from "react";
import "./Companies.css";
import Modal from 'react-modal';
import { BASE_URL } from "../../api/common";
import { Country, State } from "country-state-city";

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

const Companies = () => {
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
    "company_information": {
      "master_id": "",
      "alter_id": "",
      "company_code": "",
      "company_name": "",
      "mailing_name": "",
      "address": "",
      "country": "",
      "state": "",
      "pincode": "",
      "telephone": "",
      "mobile": "",
      "fax": "",
      "email": "",
      "website": ""
    },
    "financial_settings": {
      "financial_year_beginning_from": "",
      "books_beginning_from": "",
      "base_currency_symbol": "",
      "formal_name": "",
      "provide_additional_base_currency_details": false,
      "suffix_symbol_to_amount": false,
      "add_space_between_amount_and_symbol": false,
      "show_amount_in_millions": false,
      "word_representing_amount_after_decimal": "",
      "no_of_decimal_places_for_amount_in_word": ""
    }
  });

  // Validation errors state
  const [validationErrors, setValidationErrors] = useState({
    pincode: "",
    telephone: "",
    mobile: "",
    fax: "",
    email: "",
    website: ""
  });

  // Handle search filter changes
  const handleSearchChange = (field, value) => {
    setSearchFilters((prev) => ({
      ...prev,
      [field]: value,
    }));
  };
  
  const [companiesData, setcompaniesData] = useState([]);
  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);
  
  // Filter companies based on search criteria
  const filteredCompanies = companiesData.filter(company => {
    return (
      company.company_information.company_name.toLowerCase().includes(searchFilters.name.toLowerCase()) &&
      company.company_information.mailing_name.toLowerCase().includes(searchFilters.parentName.toLowerCase()) &&
      company.company_information.address.toLowerCase().includes(searchFilters.address.toLowerCase()) &&
      company.company_information.telephone.toLowerCase().includes(searchFilters.phone.toLowerCase()) &&
      company.company_information.mobile.toLowerCase().includes(searchFilters.mobile.toLowerCase()) &&
      company.company_information.email.toLowerCase().includes(searchFilters.email.toLowerCase()) &&
      company.company_information.website.toLowerCase().includes(searchFilters.website.toLowerCase())
    );
  });
  
  let subtitle;
  const [modalIsOpen, setIsOpen] = React.useState(false);

  function openModal() {
    setIsOpen(true);
    // Reset form and validation errors when opening modal for new entry
    setformobj({
      "company_information": {
        "master_id": "",
        "alter_id": "",
        "company_code": "",
        "company_name": "",
        "mailing_name": "",
        "address": "",
        "country": "",
        "state": "",
        "pincode": "",
        "telephone": "",
        "mobile": "",
        "fax": "",
        "email": "",
        "website": ""
      },
      "financial_settings": {
        "financial_year_beginning_from": "",
        "books_beginning_from": "",
        "base_currency_symbol": "",
        "formal_name": "",
        "provide_additional_base_currency_details": false,
        "suffix_symbol_to_amount": false,
        "add_space_between_amount_and_symbol": false,
        "show_amount_in_millions": false,
        "word_representing_amount_after_decimal": "",
        "no_of_decimal_places_for_amount_in_word": ""
      }
    });
    
    setValidationErrors({
      pincode: "",
      telephone: "",
      mobile: "",
      fax: "",
      email: "",
      website: ""
    });
  }

  function afterOpenModal() {
    // references are now sync'd and can be accessed.
    // subtitle.style.color = '#f00';
  }

  function closeModal() {
    setIsOpen(false);
  }

  useEffect(() => {
    getmethod();
    // Load countries
    const countryData = Country.getAllCountries();
    setCountries(countryData);
  }, []);

  // Update states when country changes
  useEffect(() => {
    if (formobj.company_information.country) {
      const countryCode = formobj.company_information.country;
      const stateData = State.getStatesOfCountry(countryCode);
      setStates(stateData);
      
      // Reset state when country changes
      setformobj(prev => ({
        ...prev,
        company_information: {
          ...prev.company_information,
          state: ""
        }
      }));
    } else {
      setStates([]);
    }
  }, [formobj.company_information.country]);

  function edit(objedit) {
    setformobj(objedit);
    setIsOpen(true);
    
    // Reset validation errors when editing
    setValidationErrors({
      pincode: "",
      telephone: "",
      mobile: "",
      fax: "",
      email: "",
      website: ""
    });
    
    // Load states for the selected country when editing
    if (objedit.company_information.country) {
      const stateData = State.getStatesOfCountry(objedit.company_information.country);
      setStates(stateData);
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

  const validateWebsite = (value) => {
    if (!value) return "";
    const websiteRegex = /^(https?:\/\/)?(www\.)?[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/i;
    return websiteRegex.test(value) ? "" : "Please enter a valid website URL";
  };

  // Handle input changes with validation
  const handleInputChange = (section, field, value) => {
    setformobj(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value
      }
    }));

    // Validate the field
    let error = "";
    switch(field) {
      case "pincode":
        error = validatePincode(value);
        break;
      case "telephone":
        error = validatePhone(value, "Telephone");
        break;
      case "mobile":
        error = validatePhone(value, "Mobile");
        break;
      case "fax":
        error = validatePhone(value, "Fax");
        break;
      case "email":
        error = validateEmail(value);
        break;
      case "website":
        error = validateWebsite(value);
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

  async function getmethod() {
    try {
      const res = await fetch(BASE_URL + "get_master/company");
      const data = await res.json();
      setcompaniesData(data?.data || []);
    } catch (err) {
      console.error("Error fetching companies:", err);
    }
  }

  async function addupdate() {
    // Check for validation errors before submitting
    if (hasValidationErrors()) {
      alert("Please fix validation errors before submitting.");
      return;
    }

    let payload = {
      tablename: "company",
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
      console.error("Error creating/updating company:", error);
    }
  }

  return (
    <>
      <Modal
        isOpen={modalIsOpen}
        onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        style={CustomStyles}
        contentLabel="Example Modal"
        ariaHideApp={false}
      >
        <div className="d-flex justify-content-between pb-2" style={{ borderBottom: '1px solid #eee' }}>
          <div style={{ fontSize: 20 }}>{formobj.company_information.master_id ? "Edit" : "Add New"} Company</div>
          <div className="row">
             <div className="col-5 my-auto">
                  <label htmlFor="CompanyCode" className="form-label">Company Code</label>
                </div>
                <div className="col-7">
                  <input type="text"
                    value={formobj.company_information.company_code}
                    onChange={(e) => {
                      setformobj({
                        ...formobj,
                        company_information: {
                          ...formobj.company_information,
                          company_code: e.target.value
                        }
                      });
                    }}
                    className="form-control" id="CompanyCode" />
                </div>
          </div>
          <div className="my-auto">
            <button type="submit" className="btn btn-primary"
              onClick={addupdate}
              disabled={hasValidationErrors()}
            >Save</button>
          </div>
        </div>
        <form className="company-form" style={{ maxHeight: '500px', overflowY: 'auto' }}>
          <div className="row">
            <div className="col-12 col-md-6" style={{ borderRight: '1px solid #eee' }}>
              <div className="mt-3 row">

                <div className="col-4 my-auto">
                  <label htmlFor="MasterId" className="form-label">Master Id</label>
                </div>
                <div className="col-8">
                  <input type="text"
                    value={formobj.company_information.master_id}
                    onChange={(e) => {
                      setformobj({
                        ...formobj,
                        company_information: {
                          ...formobj.company_information,
                          master_id: e.target.value
                        }
                      });
                    }}
                    className="form-control" id="MasterId" />
                </div>

                <div className="col-4 my-auto">
                  <label htmlFor="AlterId" className="form-label">Alter Id</label>
                </div>
                <div className="col-8">
                  <input type="text"
                    value={formobj.company_information.alter_id}
                    onChange={(e) => {
                      setformobj({
                        ...formobj,
                        company_information: {
                          ...formobj.company_information,
                          alter_id: e.target.value
                        }
                      });
                    }}
                    className="form-control" id="AlterId" />
                </div>

                <div className="col-4 my-auto">
                  <label htmlFor="Company" className="form-label">Company Name</label>
                </div>
                <div className="col-8">
                  <input type="text"
                    value={formobj.company_information.company_name}
                    onChange={(e) => {
                      setformobj({
                        ...formobj,
                        company_information: {
                          ...formobj.company_information,
                          company_name: e.target.value
                        }
                      });
                    }}
                    className="form-control" id="Company" />
                </div>

                <div className="col-4 my-auto">
                  <label htmlFor="MailingName" className="form-label">Mailing Name</label>
                </div>
                <div className="col-8">
                  <input type="text"
                    value={formobj.company_information.mailing_name}
                    onChange={(e) => {
                      setformobj({
                        ...formobj,
                        company_information: {
                          ...formobj.company_information,
                          mailing_name: e.target.value
                        }
                      });
                    }}
                    className="form-control" id="MailingName" />
                </div>

                <div className="col-4 my-auto">
                  <label className="form-label" htmlFor="Address">Address</label>
                </div>
                <div className="col-8">
                  <textarea
                    value={formobj.company_information.address}
                    onChange={(e) => {
                      setformobj({
                        ...formobj,
                        company_information: {
                          ...formobj.company_information,
                          address: e.target.value
                        }
                      });
                    }}
                    className="form-control w-100" id="Address" />
                </div>

                <div className="col-4 my-auto">
                  <label htmlFor="Country" className="form-label">Country</label>
                </div>
                <div className="col-8 my-1">
                  <select 
                    id="Country" 
                    className="form-select w-100"
                    value={formobj.company_information.country}
                    onChange={(e) => {
                      setformobj({
                        ...formobj,
                        company_information: {
                          ...formobj.company_information,
                          country: e.target.value
                        }
                      });
                    }}
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
                    id="State" 
                    className="form-select w-100"
                    value={formobj.company_information.state}
                    onChange={(e) => {
                      setformobj({
                        ...formobj,
                        company_information: {
                          ...formobj.company_information,
                          state: e.target.value
                        }
                      });
                    }}
                    disabled={!formobj.company_information.country}
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
                  <label htmlFor="Pincode" className="form-label">Pincode</label>
                </div>
                <div className="col-8">
                  <input 
                    type="text"
                    value={formobj.company_information.pincode}
                    onChange={(e) => handleInputChange("company_information", "pincode", e.target.value)}
                    className={`form-control ${validationErrors.pincode ? 'is-invalid' : ''}`} 
                    id="Pincode" 
                  />
                  {validationErrors.pincode && (
                    <div className="invalid-feedback">{validationErrors.pincode}</div>
                  )}
                </div>

                <div className="col-4 my-auto">
                  <label htmlFor="Telephone" className="form-label">Telephone</label>
                </div>
                <div className="col-8">
                  <input 
                    type="text"
                    value={formobj.company_information.telephone}
                    onChange={(e) => handleInputChange("company_information", "telephone", e.target.value)}
                    className={`form-control ${validationErrors.telephone ? 'is-invalid' : ''}`} 
                    id="Telephone" 
                  />
                  {validationErrors.telephone && (
                    <div className="invalid-feedback">{validationErrors.telephone}</div>
                  )}
                </div>

                <div className="col-4 my-auto">
                  <label htmlFor="Mobile" className="form-label">Mobile</label>
                </div>
                <div className="col-8">
                  <input 
                    type="text"
                    value={formobj.company_information.mobile}
                    onChange={(e) => handleInputChange("company_information", "mobile", e.target.value)}
                    className={`form-control ${validationErrors.mobile ? 'is-invalid' : ''}`} 
                    id="Mobile" 
                  />
                  {validationErrors.mobile && (
                    <div className="invalid-feedback">{validationErrors.mobile}</div>
                  )}
                </div>

                <div className="col-4 my-auto">
                  <label htmlFor="Fax" className="form-label">Fax</label>
                </div>
                <div className="col-8">
                  <input 
                    type="text"
                    value={formobj.company_information.fax}
                    onChange={(e) => handleInputChange("company_information", "fax", e.target.value)}
                    className={`form-control ${validationErrors.fax ? 'is-invalid' : ''}`} 
                    id="Fax" 
                  />
                  {validationErrors.fax && (
                    <div className="invalid-feedback">{validationErrors.fax}</div>
                  )}
                </div>

                <div className="col-4 my-auto">
                  <label htmlFor="Email" className="form-label">Email</label>
                </div>
                <div className="col-8">
                  <input 
                    type="text"
                    value={formobj.company_information.email}
                    onChange={(e) => handleInputChange("company_information", "email", e.target.value)}
                    className={`form-control ${validationErrors.email ? 'is-invalid' : ''}`} 
                    id="Email" 
                  />
                  {validationErrors.email && (
                    <div className="invalid-feedback">{validationErrors.email}</div>
                  )}
                </div>

                <div className="col-4 my-auto">
                  <label htmlFor="Website" className="form-label">Website</label>
                </div>
                <div className="col-8">
                  <input 
                    type="text"
                    value={formobj.company_information.website}
                    onChange={(e) => handleInputChange("company_information", "website", e.target.value)}
                    className={`form-control ${validationErrors.website ? 'is-invalid' : ''}`} 
                    id="Website" 
                  />
                  {validationErrors.website && (
                    <div className="invalid-feedback">{validationErrors.website}</div>
                  )}
                </div>
              </div>
            </div>
            <div className="col-12 col-md-6">
              <div className="mt-3 row">
                <div className="col-6 my-auto">
                  <label htmlFor="FinancialYear" className="form-label">Financial year beginning from</label>
                </div>
                <div className="col-6">
                  <input type="text"
                    value={formobj.financial_settings.financial_year_beginning_from}
                    onChange={(e) => {
                      setformobj({
                        ...formobj,
                        financial_settings: {
                          ...formobj.financial_settings,
                          financial_year_beginning_from: e.target.value
                        }
                      });
                    }}
                    className="form-control" id="FinancialYear" />
                </div>

                <div className="col-6 my-auto">
                  <label htmlFor="Books" className="form-label">Books beginning from</label>
                </div>
                <div className="col-6">
                  <input type="text"
                    value={formobj.financial_settings.books_beginning_from}
                    onChange={(e) => {
                      setformobj({
                        ...formobj,
                        financial_settings: {
                          ...formobj.financial_settings,
                          books_beginning_from: e.target.value
                        }
                      });
                    }}
                    className="form-control" id="Books" />
                </div>

                <div className="col-6 my-auto">
                  <label htmlFor="Base" className="form-label">Base currency symbol</label>
                </div>
                <div className="col-6">
                  <input type="text"
                    value={formobj.financial_settings.base_currency_symbol}
                    onChange={(e) => {
                      setformobj({
                        ...formobj,
                        financial_settings: {
                          ...formobj.financial_settings,
                          base_currency_symbol: e.target.value
                        }
                      });
                    }}
                    className="form-control" id="Base" />
                </div>

                <div className="col-6 my-auto">
                  <label htmlFor="Formal" className="form-label">Formal Name</label>
                </div>
                <div className="col-6">
                  <input type="text"
                    value={formobj.financial_settings.formal_name}
                    onChange={(e) => {
                      setformobj({
                        ...formobj,
                        financial_settings: {
                          ...formobj.financial_settings,
                          formal_name: e.target.value
                        }
                      });
                    }}
                    className="form-control" id="Formal" />
                </div>

                <div className="col-8 my-auto">
                  <label htmlFor="Provide" className="form-label">Provide Additional Base Currency details</label>
                </div>
                <div className="col-4">
                  <label className="switch">
                    <input 
                      type="checkbox" 
                      checked={formobj.financial_settings.provide_additional_base_currency_details}
                      onChange={(e) => {
                        setformobj({
                          ...formobj,
                          financial_settings: {
                            ...formobj.financial_settings,
                            provide_additional_base_currency_details: e.target.checked
                          }
                        });
                      }}
                    />
                    <span className="slider round"></span>
                  </label>
                </div>

                {/* Conditionally render these fields based on the checkbox */}
                {formobj.financial_settings.provide_additional_base_currency_details && (
                  <>
                    <div className="col-6 my-auto">
                      <label htmlFor="Suffix" className="form-label">Suffix symbol to amount</label>
                    </div>
                    <div className="col-6">
                      <select 
                        id="Suffix" 
                        className="form-select w-100"
                        value={formobj.financial_settings.suffix_symbol_to_amount ? "Yes" : "No"}
                        onChange={(e) => {
                          setformobj({
                            ...formobj,
                            financial_settings: {
                              ...formobj.financial_settings,
                              suffix_symbol_to_amount: e.target.value === "Yes"
                            }
                          });
                        }}
                      >
                        <option value="Yes">Yes</option>
                        <option value="No">No</option>
                      </select>
                    </div>

                    <div className="col-6 my-auto">
                      <label htmlFor="SpaceBetween" className="form-label">Add space between amount & symbol</label>
                    </div>
                    <div className="col-6">
                      <select 
                        id="SpaceBetween" 
                        className="form-select w-100"
                        value={formobj.financial_settings.add_space_between_amount_and_symbol ? "Yes" : "No"}
                        onChange={(e) => {
                          setformobj({
                            ...formobj,
                            financial_settings: {
                              ...formobj.financial_settings,
                              add_space_between_amount_and_symbol: e.target.value === "Yes"
                            }
                          });
                        }}
                      >
                        <option value="Yes">Yes</option>
                        <option value="No">No</option>
                      </select>
                    </div>

                    <div className="col-6 my-auto">
                      <label htmlFor="ShowInMillions" className="form-label">Show amount in millions</label>
                    </div>
                    <div className="col-6">
                      <select 
                        id="ShowInMillions" 
                        className="form-select w-100"
                        value={formobj.financial_settings.show_amount_in_millions ? "Yes" : "No"}
                        onChange={(e) => {
                          setformobj({
                            ...formobj,
                            financial_settings: {
                              ...formobj.financial_settings,
                              show_amount_in_millions: e.target.value === "Yes"
                            }
                          });
                        }}
                      >
                        <option value="Yes">Yes</option>
                        <option value="No">No</option>
                      </select>
                    </div>

                    <div className="col-6 my-auto">
                      <label htmlFor="WordAfterDecimal" className="form-label">Word representing amount after decimal</label>
                    </div>
                    <div className="col-6">
                      <input type="text"
                        value={formobj.financial_settings.word_representing_amount_after_decimal}
                        onChange={(e) => {
                          setformobj({
                            ...formobj,
                            financial_settings: {
                              ...formobj.financial_settings,
                              word_representing_amount_after_decimal: e.target.value
                            }
                          });
                        }}
                        className="form-control" id="WordAfterDecimal" />
                    </div>

                    <div className="col-6 my-auto">
                      <label htmlFor="DecimalPlaces" className="form-label">No of decimal places for amount in word</label>
                    </div>
                    <div className="col-6">
                      <input type="text"
                        value={formobj.financial_settings.no_of_decimal_places_for_amount_in_word}
                        onChange={(e) => {
                          setformobj({
                            ...formobj,
                            financial_settings: {
                              ...formobj.financial_settings,
                              no_of_decimal_places_for_amount_in_word: e.target.value
                            }
                          });
                        }}
                        className="form-control" id="DecimalPlaces" />
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </form>
      </Modal>
      
      <div className="companies-page">
        <div className="companies-header">
          <h2>Companies</h2>
          <button onClick={openModal} className="btn btn-primary new-btn">Add Company</button>
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
                <th>Mailing Name</th>
                <th>Address</th>
                <th>Phone</th>
                <th>Mobile No.</th>
                <th>Email</th>
                <th>Website</th>
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
                    placeholder="Search address..."
                    value={searchFilters.address}
                    onChange={(e) => handleSearchChange("address", e.target.value)}
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
                <th>
                  <input
                    type="text"
                    className="search-input"
                    placeholder="Search website..."
                    value={searchFilters.website}
                    onChange={(e) => handleSearchChange("website", e.target.value)}
                  />
                </th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {filteredCompanies.map((company) => (
                <tr key={company.id}>
                  <td>{company.company_information.company_name}</td>
                  <td>{company.company_information.mailing_name}</td>
                  <td>{company.company_information.address}</td>
                  <td>{company.company_information.telephone}</td>
                  <td>{company.company_information.mobile}</td>
                  <td>{company.company_information.email}</td>
                  <td>{company.company_information.website}</td>
                  <td>
                    <button 
                      className="btn btn-sm btn-outline-primary"
                      onClick={() => edit(company)}
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

export default Companies;