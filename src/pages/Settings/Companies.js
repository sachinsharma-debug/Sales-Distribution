import React, { useState, useEffect } from "react";
import "./Companies.css";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import { BASE_URL } from "../../api/common";
import { Country, State } from "country-state-city";

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
    company_information: {
      master_id: "",
      alter_id: "",
      company_code: "",
      company_name: "",
      mailing_name: "",
      address: "",
      country: "",
      state: "",
      pincode: "",
      longitude: "",
      latitude: "",
      telephone: "",
      mobile: "",
      fax: "",
      email: "",
      website: "",
    },
    financial_settings: {
      financial_year_beginning_from: "",
      books_beginning_from: "",
      base_currency_symbol: "",
      formal_name: "",
      provide_additional_base_currency_details: false,
      suffix_symbol_to_amount: false,
      add_space_between_amount_and_symbol: false,
      show_amount_in_millions: false,
      word_representing_amount_after_decimal: "",
      no_of_decimal_places_for_amount_in_word: "",
    },
  });

  // Validation errors state
  const [validationErrors, setValidationErrors] = useState({
    pincode: "",
    telephone: "",
    mobile: "",
    fax: "",
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

  const [companiesData, setcompaniesData] = useState([]);
  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);

  // Search states for dropdowns
  const [countrySearch, setCountrySearch] = useState("");
  const [stateSearch, setStateSearch] = useState("");
  const [showCountryOptions, setShowCountryOptions] = useState(false);
  const [showStateOptions, setShowStateOptions] = useState(false);
  // Fetch from pincode UI state
  const [fetchFromPincode, setFetchFromPincode] = useState(false);
  const [fetchDialogOpen, setFetchDialogOpen] = useState(false);
  const [fetchPincodeInput, setFetchPincodeInput] = useState("");

  // Filter companies based on search criteria
  const filteredCompanies = companiesData.filter((company) => {
    return (
      company.company_information.company_name
        .toLowerCase()
        .includes(searchFilters.name.toLowerCase()) &&
      company.company_information.mailing_name
        .toLowerCase()
        .includes(searchFilters.parentName.toLowerCase()) &&
      company.company_information.address
        .toLowerCase()
        .includes(searchFilters.address.toLowerCase()) &&
      company.company_information.telephone
        .toLowerCase()
        .includes(searchFilters.phone.toLowerCase()) &&
      company.company_information.mobile
        .toLowerCase()
        .includes(searchFilters.mobile.toLowerCase()) &&
      company.company_information.email
        .toLowerCase()
        .includes(searchFilters.email.toLowerCase()) &&
      company.company_information.website
        .toLowerCase()
        .includes(searchFilters.website.toLowerCase())
    );
  });

  const [dialogOpen, setDialogOpen] = React.useState(false);

  function openModal() {
    setDialogOpen(true);
    // Reset form and validation errors when opening modal for new entry
    setformobj({
      company_information: {
        master_id: "",
        alter_id: "",
        company_code: "",
        company_name: "",
        mailing_name: "",
        address: "",
        country: "",
        state: "",
        pincode: "",
        longitude: "",
        latitude: "",
        telephone: "",
        mobile: "",
        fax: "",
        email: "",
        website: "",
      },
      financial_settings: {
        financial_year_beginning_from: "",
        books_beginning_from: "",
        base_currency_symbol: "",
        formal_name: "",
        provide_additional_base_currency_details: false,
        suffix_symbol_to_amount: false,
        add_space_between_amount_and_symbol: false,
        show_amount_in_millions: false,
        word_representing_amount_after_decimal: "",
        no_of_decimal_places_for_amount_in_word: "",
      },
    });

    setValidationErrors({
      pincode: "",
      telephone: "",
      mobile: "",
      fax: "",
      email: "",
      website: "",
    });

    // Reset search states
    setCountrySearch("");
    setStateSearch("");
    setShowCountryOptions(false);
    setShowStateOptions(false);
    // Reset fetch-from-pincode UI
    setFetchFromPincode(false);
    setFetchPincodeInput("");
    setFetchDialogOpen(false);
  }

  function closeModal() {
    setDialogOpen(false);
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
      setformobj((prev) => ({
        ...prev,
        company_information: {
          ...prev.company_information,
          state: "",
        },
      }));

      // Reset state search
      setStateSearch("");
    } else {
      setStates([]);
      setStateSearch("");
    }
  }, [formobj.company_information.country]);

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest(".searchable-dropdown")) {
        setShowCountryOptions(false);
        setShowStateOptions(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  function edit(objedit) {
    setformobj(objedit);
    setDialogOpen(true);

    // Reset validation errors when editing
    setValidationErrors({
      pincode: "",
      telephone: "",
      mobile: "",
      fax: "",
      email: "",
      website: "",
    });

    // Load states for the selected country when editing
    if (objedit.company_information.country) {
      const stateData = State.getStatesOfCountry(
        objedit.company_information.country
      );
      setStates(stateData);

      // Set display values for editing
      const country = countries.find(
        (c) => c.isoCode === objedit.company_information.country
      );
      if (country) {
        setCountrySearch(country.name);
      }

      if (objedit.company_information.state) {
        const state = stateData.find(
          (s) => s.isoCode === objedit.company_information.state
        );
        if (state) {
          setStateSearch(state.name);
        }
      }
    }

    setShowCountryOptions(false);
    setShowStateOptions(false);
    // Initialize fetch-from-pincode state when editing
    setFetchFromPincode(Boolean(objedit?.company_information?.pincode));
    setFetchPincodeInput(objedit?.company_information?.pincode || "");
  }

  // Handlers for fetch pincode dialog
  const openFetchDialog = () => setFetchDialogOpen(true);
  const closeFetchDialog = () => setFetchDialogOpen(false);
  const saveFetchPincode = () => {
    // Save entered pincode into the form pincode field
    setformobj((prev) => ({
      ...prev,
      company_information: {
        ...prev.company_information,
        pincode: fetchPincodeInput,
      },
    }));
    setFetchDialogOpen(false);
  };

  // Validation functions
  const validatePincode = (value) => {
    if (!value) return "";
    const pincodeRegex = /^\d{4,10}$/;
    return pincodeRegex.test(value) ? "" : "Pincode should be 4-10 digits";
  };

  const validatePhone = (value, fieldName) => {
    if (!value) return "";
    const phoneRegex = /^[\d\s+\-()]{5,15}$/;
    return phoneRegex.test(value)
      ? ""
      : `${fieldName} should be 5-15 digits with optional + - ( )`;
  };

  const validateEmail = (value) => {
    if (!value) return "";
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(value) ? "" : "Please enter a valid email address";
  };

  const validateWebsite = (value) => {
    if (!value) return "";
    const websiteRegex =
      /^(https?:\/\/)?(www\.)?[a-z0-9]+([-.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/i;
    return websiteRegex.test(value) ? "" : "Please enter a valid website URL";
  };

  // Handle input changes with validation
  const handleInputChange = (section, field, value) => {
    setformobj((prev) => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value,
      },
    }));

    // Validate the field
    let error = "";
    switch (field) {
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

    setValidationErrors((prev) => ({
      ...prev,
      [field]: error,
    }));
  };

  // Check if form has validation errors
  const hasValidationErrors = () => {
    return Object.values(validationErrors).some((error) => error !== "");
  };

  // Filter countries based on search
  const filteredCountries = countries.filter((country) =>
    country.name.toLowerCase().includes(countrySearch.toLowerCase())
  );

  // Filter states based on search
  const filteredStates = states.filter((state) =>
    state.name.toLowerCase().includes(stateSearch.toLowerCase())
  );

  // Get selected country name for display
  const getCountryDisplayValue = () => {
    if (formobj.company_information.country && !showCountryOptions) {
      const country = countries.find(
        (c) => c.isoCode === formobj.company_information.country
      );
      return country ? country.name : "";
    }
    return countrySearch;
  };

  // Get selected state name for display
  const getStateDisplayValue = () => {
    if (formobj.company_information.state && !showStateOptions) {
      const state = states.find(
        (s) => s.isoCode === formobj.company_information.state
      );
      return state ? state.name : "";
    }
    return stateSearch;
  };

  function openPincodeDialog() {
    setFetchPincodeInput(formobj.company_information.pincode || "");
    setFetchDialogOpen(true);
  }

  // Handle country selection
  const handleCountrySelect = (countryCode, countryName) => {
    setformobj({
      ...formobj,
      company_information: {
        ...formobj.company_information,
        country: countryCode,
      },
    });
    setCountrySearch(countryName);
    setShowCountryOptions(false);
  };

  // Handle state selection
  const handleStateSelect = (stateCode, stateName) => {
    setformobj({
      ...formobj,
      company_information: {
        ...formobj.company_information,
        state: stateCode,
      },
    });
    setStateSearch(stateName);
    setShowStateOptions(false);
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
      await response.json();
      getmethod();
      closeModal();
    } catch (error) {
      console.error("Error creating/updating company:", error);
    }
  }

  return (
    <>
      <Dialog
        open={dialogOpen}
        onClose={closeModal}
        maxWidth="lg"
        fullWidth
        PaperProps={{
          style: {
            maxHeight: "100vh",
            overflow: "auto",
          },
        }}
      >
        <DialogTitle>
          <div className="d-flex align-items-center justify-content-between border-bottom border-2 border-dark pb-2">
            <div style={{ fontSize: 20, marginRight: 20 }}>
              {formobj.company_information.master_id ? "Edit" : "Add New"}{" "}
              Company
            </div>
            <div className="d-flex gap-3">
              <div style={{ minWidth: 120 }}>
                <label
                  htmlFor="MasterIdHeader"
                  className="form-label small mb-1"
                >
                  Master Id
                </label>
                <input
                  type="text"
                  value={formobj.company_information.master_id}
                  onChange={(e) => {
                    setformobj({
                      ...formobj,
                      company_information: {
                        ...formobj.company_information,
                        master_id: e.target.value,
                      },
                    });
                  }}
                  className="form-control form-control-sm"
                  id="MasterIdHeader"
                />
              </div>

              <div style={{ minWidth: 120 }}>
                <label
                  htmlFor="AlterIdHeader"
                  className="form-label small mb-1"
                >
                  Alter Id
                </label>
                <input
                  type="text"
                  value={formobj.company_information.alter_id}
                  onChange={(e) => {
                    setformobj({
                      ...formobj,
                      company_information: {
                        ...formobj.company_information,
                        alter_id: e.target.value,
                      },
                    });
                  }}
                  className="form-control form-control-sm"
                  id="AlterIdHeader"
                />
              </div>

              <div style={{ minWidth: 120 }}>
                <label htmlFor="CompanyCode" className="form-label small mb-1">
                  Company Code
                </label>
                <input
                  type="text"
                  value={formobj.company_information.company_code}
                  onChange={(e) => {
                    setformobj({
                      ...formobj,
                      company_information: {
                        ...formobj.company_information,
                        company_code: e.target.value,
                      },
                    });
                  }}
                  className="form-control form-control-sm"
                  id="CompanyCode"
                />
              </div>

              <div style={{ minWidth: 120 }}>
                <label htmlFor="CompanyId" className="form-label small mb-1">
                  Company Id
                </label>
                <input
                  type="text"
                  value={formobj.company_information.company_id || ""}
                  onChange={(e) => {
                    setformobj({
                      ...formobj,
                      company_information: {
                        ...formobj.company_information,
                        company_id: e.target.value,
                      },
                    });
                  }}
                  className="form-control form-control-sm"
                  id="CompanyId"
                />
              </div>
            </div>
          </div>
        </DialogTitle>
        <DialogContent>
          <form
            className="company-form"
            onSubmit={(e) => {
              e.preventDefault();
              addupdate();
            }}
          >
            <div className="row">
              <div
                className="col-12 col-md-6"
                style={{ borderRight: "1px solid #eee" }}
              >
                <div className="mt-3 row">
                  <div className="col-12">
                    <h5 className="mb-3">Basic Info</h5>
                  </div>
                  <div className="col-4 my-auto">
                    <label htmlFor="Company" className="form-label">
                      Company Name
                    </label>
                  </div>
                  <div className="col-8">
                    <input
                      type="text"
                      value={formobj.company_information.company_name}
                      onChange={(e) => {
                        setformobj({
                          ...formobj,
                          company_information: {
                            ...formobj.company_information,
                            company_name: e.target.value,
                          },
                        });
                      }}
                      className="form-control"
                      id="Company"
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
                      value={formobj.company_information.mailing_name}
                      onChange={(e) => {
                        setformobj({
                          ...formobj,
                          company_information: {
                            ...formobj.company_information,
                            mailing_name: e.target.value,
                          },
                        });
                      }}
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
                      value={formobj.company_information.address}
                      onChange={(e) => {
                        setformobj({
                          ...formobj,
                          company_information: {
                            ...formobj.company_information,
                            address: e.target.value,
                          },
                        });
                      }}
                      className="form-control w-100"
                      id="Address"
                    />
                  </div>

                  {/* Fetch field after Pincode */}
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
                    <div className="searchable-dropdown">
                      <input
                        type="text"
                        placeholder="Type to search countries..."
                        value={getCountryDisplayValue()}
                        onChange={(e) => {
                          setCountrySearch(e.target.value);
                          setShowCountryOptions(true);
                          if (!e.target.value) {
                            setformobj({
                              ...formobj,
                              company_information: {
                                ...formobj.company_information,
                                country: "",
                              },
                            });
                          }
                        }}
                        onFocus={() => {
                          setShowCountryOptions(true);
                          setCountrySearch("");
                        }}
                        className="form-control"
                        id="Country"
                      />
                      {showCountryOptions && (
                        <div className="dropdown-options">
                          <div className="options-container">
                            {filteredCountries.length > 0 ? (
                              filteredCountries.map((country) => (
                                <div
                                  key={country.isoCode}
                                  className="option-item"
                                  onClick={() =>
                                    handleCountrySelect(
                                      country.isoCode,
                                      country.name
                                    )
                                  }
                                >
                                  {country.name}
                                </div>
                              ))
                            ) : (
                              <div className="option-item no-results">
                                No countries found
                              </div>
                            )}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="col-4 my-auto">
                    <label htmlFor="State" className="form-label">
                      State
                    </label>
                  </div>
                  <div className="col-8">
                    <div className="searchable-dropdown">
                      <input
                        type="text"
                        placeholder={
                          !formobj.company_information.country
                            ? "Select country first..."
                            : "Type to search states..."
                        }
                        value={getStateDisplayValue()}
                        onChange={(e) => {
                          setStateSearch(e.target.value);
                          setShowStateOptions(true);
                          if (!e.target.value) {
                            setformobj({
                              ...formobj,
                              company_information: {
                                ...formobj.company_information,
                                state: "",
                              },
                            });
                          }
                        }}
                        onFocus={() => {
                          if (formobj.company_information.country) {
                            setShowStateOptions(true);
                            setStateSearch("");
                          }
                        }}
                        disabled={!formobj.company_information.country}
                        className="form-control"
                        id="State"
                      />
                      {showStateOptions &&
                        formobj.company_information.country && (
                          <div className="dropdown-options">
                            <div className="options-container">
                              {filteredStates.length > 0 ? (
                                filteredStates.map((state) => (
                                  <div
                                    key={state.isoCode}
                                    className="option-item"
                                    onClick={() =>
                                      handleStateSelect(
                                        state.isoCode,
                                        state.name
                                      )
                                    }
                                  >
                                    {state.name}
                                  </div>
                                ))
                              ) : (
                                <div className="option-item no-results">
                                  No states found
                                </div>
                              )}
                            </div>
                          </div>
                        )}
                    </div>
                  </div>

                  <div className="col-4 my-auto">
                    <label htmlFor="Pincode" className="form-label">
                      Pincode
                    </label>
                  </div>
                  <div className="col-8">
                    <input
                      type="text"
                      value={formobj.company_information.pincode}
                      onChange={(e) =>
                        handleInputChange(
                          "company_information",
                          "pincode",
                          e.target.value
                        )
                      }
                      className={`form-control ${
                        validationErrors.pincode ? "is-invalid" : ""
                      }`}
                      id="Pincode"
                    />
                    {validationErrors.pincode && (
                      <div className="invalid-feedback">
                        {validationErrors.pincode}
                      </div>
                    )}
                  </div>
                  <div className="col-4 my-auto">
                    <label htmlFor="Longitude" className="form-label">
                      Longitude
                    </label>
                  </div>
                  <div className="col-8">
                    <input
                      type="text"
                      value={formobj.company_information.longitude}
                      onChange={(e) =>
                        handleInputChange(
                          "company_information",
                          "longitude",
                          e.target.value
                        )
                      }
                      className="form-control"
                      id="Longitude"
                    />
                  </div>

                  <div className="col-4 my-auto">
                    <label htmlFor="Latitude" className="form-label">
                      Latitude
                    </label>
                  </div>
                  <div className="col-8">
                    <input
                      type="text"
                      value={formobj.company_information.latitude}
                      onChange={(e) =>
                        handleInputChange(
                          "company_information",
                          "latitude",
                          e.target.value
                        )
                      }
                      className="form-control"
                      id="Latitude"
                    />
                  </div>

                  <div className="col-4 my-auto">
                    <label htmlFor="Telephone" className="form-label">
                      Telephone
                    </label>
                  </div>
                  <div className="col-8">
                    <input
                      type="text"
                      value={formobj.company_information.telephone}
                      onChange={(e) =>
                        handleInputChange(
                          "company_information",
                          "telephone",
                          e.target.value
                        )
                      }
                      className={`form-control ${
                        validationErrors.telephone ? "is-invalid" : ""
                      }`}
                      id="Telephone"
                    />
                    {validationErrors.telephone && (
                      <div className="invalid-feedback">
                        {validationErrors.telephone}
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
                      value={formobj.company_information.mobile}
                      onChange={(e) =>
                        handleInputChange(
                          "company_information",
                          "mobile",
                          e.target.value
                        )
                      }
                      className={`form-control ${
                        validationErrors.mobile ? "is-invalid" : ""
                      }`}
                      id="Mobile"
                    />
                    {validationErrors.mobile && (
                      <div className="invalid-feedback">
                        {validationErrors.mobile}
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
                      value={formobj.company_information.fax}
                      onChange={(e) =>
                        handleInputChange(
                          "company_information",
                          "fax",
                          e.target.value
                        )
                      }
                      className={`form-control ${
                        validationErrors.fax ? "is-invalid" : ""
                      }`}
                      id="Fax"
                    />
                    {validationErrors.fax && (
                      <div className="invalid-feedback">
                        {validationErrors.fax}
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
                      value={formobj.company_information.email}
                      onChange={(e) =>
                        handleInputChange(
                          "company_information",
                          "email",
                          e.target.value
                        )
                      }
                      className={`form-control ${
                        validationErrors.email ? "is-invalid" : ""
                      }`}
                      id="Email"
                    />
                    {validationErrors.email && (
                      <div className="invalid-feedback">
                        {validationErrors.email}
                      </div>
                    )}
                  </div>

                  <div className="col-4 my-auto">
                    <label htmlFor="Website" className="form-label">
                      Website
                    </label>
                  </div>
                  <div className="col-8">
                    <input
                      type="text"
                      value={formobj.company_information.website}
                      onChange={(e) =>
                        handleInputChange(
                          "company_information",
                          "website",
                          e.target.value
                        )
                      }
                      className={`form-control ${
                        validationErrors.website ? "is-invalid" : ""
                      }`}
                      id="Website"
                    />
                    {validationErrors.website && (
                      <div className="invalid-feedback">
                        {validationErrors.website}
                      </div>
                    )}
                  </div>
                </div>
              </div>
              <div className="col-12 col-md-6">
                <div className="mt-3 row">
                  <div className="col-12">
                    <h6 className="mb-3">Financial Info</h6>
                  </div>
                  <div className="col-6 my-auto">
                    <label htmlFor="FinancialYear" className="form-label">
                      Financial year beginning from
                    </label>
                  </div>
                  <div className="col-6">
                    <input
                      type="date"
                      value={
                        formobj.financial_settings.financial_year_beginning_from
                      }
                      onChange={(e) => {
                        setformobj({
                          ...formobj,
                          financial_settings: {
                            ...formobj.financial_settings,
                            financial_year_beginning_from: e.target.value,
                          },
                        });
                      }}
                      className="form-control"
                      id="FinancialYear"
                    />
                  </div>

                  <div className="col-6 my-auto">
                    <label htmlFor="Books" className="form-label">
                      Books beginning from
                    </label>
                  </div>
                  <div className="col-6">
                    <input
                      type="date"
                      value={formobj.financial_settings.books_beginning_from}
                      onChange={(e) => {
                        setformobj({
                          ...formobj,
                          financial_settings: {
                            ...formobj.financial_settings,
                            books_beginning_from: e.target.value,
                          },
                        });
                      }}
                      className="form-control"
                      id="Books"
                    />
                  </div>
                  <div className="col-12">
                    <h6 className="mb-2 mt-3">Currency Info</h6>
                  </div>
                  <div className="col-6 my-auto">
                    <label htmlFor="Base" className="form-label">
                      Base currency symbol
                    </label>
                  </div>
                  <div className="col-6">
                    <input
                      type="text"
                      value={formobj.financial_settings.base_currency_symbol}
                      onChange={(e) => {
                        setformobj({
                          ...formobj,
                          financial_settings: {
                            ...formobj.financial_settings,
                            base_currency_symbol: e.target.value,
                          },
                        });
                      }}
                      className="form-control"
                      id="Base"
                    />
                  </div>
                  <div className="col-6 my-auto">
                    <label htmlFor="Formal" className="form-label">
                      Formal Name
                    </label>
                  </div>
                  <div className="col-6">
                    <input
                      type="text"
                      value={formobj.financial_settings.formal_name}
                      onChange={(e) => {
                        setformobj({
                          ...formobj,
                          financial_settings: {
                            ...formobj.financial_settings,
                            formal_name: e.target.value,
                          },
                        });
                      }}
                      className="form-control"
                      id="Formal"
                    />
                  </div>
                  <div className="col-6 my-auto">
                    <label htmlFor="Provide" className="form-label">
                      Provide Additional Base Currency details
                    </label>
                  </div>
                  <div className="col-6 my-auto d-flex align-items-center">
                    <label className="switch mb-0">
                      <input
                        type="checkbox"
                        checked={
                          formobj.financial_settings
                            .provide_additional_base_currency_details
                        }
                        onChange={(e) => {
                          setformobj({
                            ...formobj,
                            financial_settings: {
                              ...formobj.financial_settings,
                              provide_additional_base_currency_details:
                                e.target.checked,
                            },
                          });
                        }}
                      />
                      <span className="slider round"></span>
                    </label>
                  </div>
                  {/* Conditionally render these fields based on the checkbox */}

                  {formobj.financial_settings
                    .provide_additional_base_currency_details && (
                    <>
                      <div className="col-6 my-auto">
                        <label htmlFor="Suffix" className="form-label">
                          Suffix symbol to amount
                        </label>
                      </div>
                      <div className="col-6 my-auto d-flex align-items-center">
                        <label className="switch mb-0">
                          <input
                            type="checkbox"
                            checked={
                              formobj.financial_settings.suffix_symbol_to_amount
                            }
                            onChange={(e) => {
                              setformobj({
                                ...formobj,
                                financial_settings: {
                                  ...formobj.financial_settings,
                                  suffix_symbol_to_amount: e.target.checked,
                                },
                              });
                            }}
                          />
                          <span className="slider round"></span>
                        </label>
                      </div>

                      <div className="col-6 my-auto">
                        <label htmlFor="SpaceBetween" className="form-label">
                          Add space between amount & symbol
                        </label>
                      </div>
                      <div className="col-6 my-auto d-flex align-items-center">
                        <label className="switch mb-0">
                          <input
                            type="checkbox"
                            checked={
                              formobj.financial_settings
                                .add_space_between_amount_and_symbol
                            }
                            onChange={(e) => {
                              setformobj({
                                ...formobj,
                                financial_settings: {
                                  ...formobj.financial_settings,
                                  add_space_between_amount_and_symbol:
                                    e.target.checked,
                                },
                              });
                            }}
                          />
                          <span className="slider round"></span>
                        </label>
                      </div>

                      <div className="col-6 my-auto">
                        <label htmlFor="ShowInMillions" className="form-label">
                          Show amount in millions
                        </label>
                      </div>
                      <div className="col-6 my-auto d-flex align-items-center">
                        <label className="switch mb-0">
                          <input
                            type="checkbox"
                            checked={
                              formobj.financial_settings.show_amount_in_millions
                            }
                            onChange={(e) => {
                              setformobj({
                                ...formobj,
                                financial_settings: {
                                  ...formobj.financial_settings,
                                  show_amount_in_millions: e.target.checked,
                                },
                              });
                            }}
                          />
                          <span className="slider round"></span>
                        </label>
                      </div>

                      <div className="col-6 my-auto">
                        <label
                          htmlFor="WordAfterDecimal"
                          className="form-label"
                        >
                          Word representing amount after decimal
                        </label>
                      </div>
                      <div className="col-6">
                        <input
                          type="text"
                          value={
                            formobj.financial_settings
                              .word_representing_amount_after_decimal
                          }
                          onChange={(e) => {
                            setformobj({
                              ...formobj,
                              financial_settings: {
                                ...formobj.financial_settings,
                                word_representing_amount_after_decimal:
                                  e.target.value,
                              },
                            });
                          }}
                          className="form-control"
                          id="WordAfterDecimal"
                        />
                      </div>

                      <div className="col-6 my-auto">
                        <label htmlFor="DecimalPlaces" className="form-label">
                          No of decimal places for amount in word
                        </label>
                      </div>
                      <div className="col-6">
                        <input
                          type="text"
                          value={
                            formobj.financial_settings
                              .no_of_decimal_places_for_amount_in_word
                          }
                          onChange={(e) => {
                            setformobj({
                              ...formobj,
                              financial_settings: {
                                ...formobj.financial_settings,
                                no_of_decimal_places_for_amount_in_word:
                                  e.target.value,
                              },
                            });
                          }}
                          className="form-control"
                          id="DecimalPlaces"
                        />
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>
          </form>
        </DialogContent>
        <DialogActions className="companies-actions">
          <button
            type="button"
            className="btn btn-danger"
            onClick={closeModal}
            style={{
              opacity: 1,
              visibility: "visible",
              pointerEvents: "auto",
              display: "inline-flex",
            }}
          >
            Cancel
          </button>
          <button
            type="button"
            className="btn btn-dark"
            style={{
              opacity: 1,
              visibility: "visible",
              pointerEvents: "auto",
              display: "inline-flex",
            }}
          >
            Reset
          </button>
          <button
            type="submit"
            className="btn btn-primary"
            onClick={addupdate}
            disabled={hasValidationErrors()}
            style={{
              opacity: hasValidationErrors() ? 0.6 : 1,
              visibility: "visible",
              pointerEvents: hasValidationErrors() ? "none" : "auto",
              display: "inline-flex",
            }}
          >
            Save
          </button>
        </DialogActions>
      </Dialog>

      {/* Dialog for entering pincode when 'Fetch from Pincode' toggle is used */}
      <Dialog
        open={fetchDialogOpen}
        onClose={closeFetchDialog}
        maxWidth="xs"
        fullWidth
      >
        <DialogTitle>Enter Pincode</DialogTitle>
        <DialogContent>
          <div className="mb-3">
            <label className="form-label">Pincode</label>
            <input
              type="text"
              className="form-control"
              value={fetchPincodeInput}
              onChange={(e) => setFetchPincodeInput(e.target.value)}
            />
          </div>
        </DialogContent>
        <DialogActions>
          <button
            type="button"
            className="btn btn-secondary"
            onClick={closeFetchDialog}
          >
            Cancel
          </button>
          <button
            type="button"
            className="btn btn-primary"
            onClick={saveFetchPincode}
          >
            Save
          </button>
        </DialogActions>
      </Dialog>

      <div className="companies-page">
        <div className="companies-header">
          <h2>Companies</h2>
          <button onClick={openModal} className="btn btn-primary new-btn">
            Add Company
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
                <th>Company Name</th>
                <th>Mailing Name</th>
                <th>Address</th>
                <th>Country</th>
                <th>State</th>
                <th>Pincode</th>

                <th>Actions</th>
              </tr>
              <tr className="search-row">
                <th>
                  <input
                    type="text"
                    className="search-input"
                    placeholder="Search Company name..."
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
                    placeholder="Search country"
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
                    placeholder="Search state"
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
                    placeholder="Search pincode..."
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