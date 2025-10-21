import React, { useState } from "react";
import "../Settings/Companies.css";
import ReactDOM from 'react-dom';
import Modal from 'react-modal';
const CustomStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
  },
};
const AccountsLedger = () => {

  const [expandedGroups, setExpandedGroups] = useState(new Set(['Account Groups']));
  const [searchTerm, setSearchTerm] = useState('');

  const accountStructure = [
    {
      name: "Account Groups",
      expanded: true,
      subGroups: [
        {
          name: "Assets",
          subGroups: [
            "Current Assets",
            "Fixed Assets", 
            "Investments",
            "Misc. Expenses (ASSET)"
          ]
        },
        {
          name: "Expenses",
          subGroups: [
            "Direct Expenses",
            "Indirect Expenses",
            "Purchase Accounts"
          ]
        },
        {
          name: "Incomes", 
          subGroups: [
            "Direct Incomes",
            "Indirect Incomes", 
            "Sales Accounts"
          ]
        },
        {
          name: "Liabilities",
          subGroups: []
        }
      ]
    }
  ];

  const toggleGroup = (groupName) => {
    const newExpandedGroups = new Set(expandedGroups);
    if (newExpandedGroups.has(groupName)) {
      newExpandedGroups.delete(groupName);
    } else {
      newExpandedGroups.add(groupName);
    }
    setExpandedGroups(newExpandedGroups);
  };

  const expandAll = () => {
    const allGroups = new Set();
    allGroups.add('Account Groups');
    accountStructure[0].subGroups.forEach(group => {
      allGroups.add(group.name);
    });
    setExpandedGroups(allGroups);
  };

  const collapseAll = () => {
    setExpandedGroups(new Set(['Account Groups']));
  };


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
      address:
        "410, Pinnacle Business Park, Corporate Road, Prahadnagar, Ahmedabad - 380019",
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
    {
      id: 3,
      name: "Demo Company",
      parentName: "",
      address:
        "71 Soi Putthabucha-4, Bangmod Pattana road,Kwaeng Bangmod, Khet Jomthong, Bangkok-10150-abcd",
      phone: "0522",
      mobile: "123456789",
      email: "demo@gmail.com",
      website: "https://www.karnavatiaumall.com",
    },
    {
      id: 4,
      name: "DEMO COMPANY 1",
      parentName: "WEBSOL",
      address: "",
      phone: "",
      mobile: "",
      email: "ziperpdemo@gmail.com",
      website: "",
    },
    {
      id: 5,
      name: "Demo ENGINEERING INDUSTRIES",
      parentName: "",
      address: "",
      phone: "",
      mobile: "",
      email: "ziperpdemo@de.com",
      website: "",
    },
    {
      id: 6,
      name: "Demo Jaydip",
      parentName: "",
      address: "Ahmedabad",
      phone: "",
      mobile: "",
      email: "",
      website: "",
    },
    {
      id: 7,
      name: "Demo LLC - Oman",
      parentName: "",
      address: "",
      phone: "",
      mobile: "",
      email: "ziperpdemo",
      website: "",
    },
    {
      id: 8,
      name: "Demo Mumbai",
      parentName: "",
      address: "",
      phone: "",
      mobile: "",
      email: "Admin@gmail.com",
      website: "",
    },
    {
      id: 9,
      name: "Demo Oman LLC",
      parentName: "",
      address: "",
      phone: "",
      mobile: "",
      email: "ziperpdemo",
      website: "",
    },
    {
      id: 10,
      name: "Demo Solar Pvt Ltd.",
      parentName: "",
      address:
        "A-503, JMR WHITE LOTUS APARTMENTS, OU COLONY ROAD H.S DARGAH, SHAIKPET",
      phone: "04032902344",
      mobile: "",
      email: "info@argosolar.in",
      website: "www.argosolar.in",
    },
    {
      id: 11,
      name: "HRMS DEMO WEBSOL",
      parentName: "",
      address: "",
      phone: "",
      mobile: "",
      email: "",
      website: "",
    },
    {
      id: 12,
      name: "SIMPLE RETAIL SOFTWARE",
      parentName: "",
      address: "1443 Acropolice Mall Thaltej Cross Road Ahmedabad 380015",
      phone: "0792561466",
      mobile: "8401236744",
      email: "zipbookinfo@gmail.com",
      website: "www.salesindia.com",
    },
    {
      id: 13,
      name: "Simple Software",
      parentName: "",
      address: "",
      phone: "",
      mobile: "",
      email: "Admin",
      website: "",
    },
    {
      id: 14,
      name: "Testing",
      parentName: "",
      address: "test",
      phone: "",
      mobile: "",
      email: "test@gmail.com",
      website: "",
    },
    {
      id: 15,
      name: "WEBSOL DEMO COMPANY",
      parentName: "",
      address: "",
      phone: "",
      mobile: "",
      email: "",
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
  let subtitle;
  const [modalIsOpen, setIsOpen] = React.useState(false);

  function openModal() {
    setIsOpen(true);
  }

  function afterOpenModal() {
    // references are now sync'd and can be accessed.
    // subtitle.style.color = '#f00';
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
        style={{ CustomStyles }}
        contentLabel="Example Modal"
      >
        <div className="d-flex justify-content-between  pb-2" style={{ borderBottom: '1px solid #eee' }}>
          <div style={{ fontSize: 20 }}>Add New Company</div>
          <div className="my-auto">
            <button type="submit" className="btn btn-primary">Add</button>
          </div>
        </div>
        {/* <form className="mt-2  company-form" style={{maxHeight: '500px'}}>
        <div className="row">
          <div className="col-8" style={{borderRight: '1px solid #eee'}}>
            <div className="mt-3 row">
              <div className="col-2 my-auto">
                <label htmlFor="MasterID" className="form-label">Master ID</label>
              </div>
              <div className="col-10">
                <input type="text" className="form-control" id="MasterID" />
              </div>
              <div className="col-2 my-auto">
                <label htmlFor="AlterID" className="form-label">Alter ID</label>
              </div>
              <div className="col-10">
                <input type="text" className="form-control" id="AlterID" />
              </div>

              <div className="col-2 my-auto">
                <label htmlFor="CompanyCode" className="form-label">Company Code</label>
              </div>
              <div className="col-10">
                <input type="text" className="form-control" id="CompanyCode" />
              </div>

              <div className="col-2 my-auto">
                <label htmlFor="Company" className="form-label">Company Name</label>
              </div>
              <div className="col-10">
                <input type="text" className="form-control" id="Company" />
              </div>

              <div className="col-2 my-auto">
                <label htmlFor="Mailing Name" className="form-label">Mailing Name</label>
              </div>
              <div className="col-10">
                <input type="text" className="form-control" id="Mailing Name"/>
              </div>

              <div className="col-2 my-auto">
                <label className="form-label" for="Address">Address</label>
              </div>
              <div className="col-10">
                <textarea className="form-control w-100" id="Address" />
              </div>

              <div className="col-2 my-auto">
                <label htmlFor="Country" className="form-label">Country</label>
              </div>
              <div className="col-10 my-1">
                <select id="Country" className="form-select w-100">
                  <option>Disabled select</option>
                </select>
              </div>

              <div className="col-2 my-auto">
                <label htmlFor="State" className="form-label">State</label>
              </div>
              <div className="col-10">
                <select id="State" className="form-select w-100">
                  <option>Disabled select</option>
                </select>
              </div>

              <div className="col-2 my-auto">
                <label htmlFor="Pincode" className="form-label">Pincode</label>
              </div>
              <div className="col-10">
                <input type="text" className="form-control" id="Pincode" />
              </div>

              <div className="col-2 my-auto">
                <label htmlFor="Telephone" className="form-label">Telephone</label>
              </div>
              <div className="col-10">
                <input type="text" className="form-control" id="Telephone"/>
              </div>

              <div className="col-2 my-auto">
                <label htmlFor="Mobile" className="form-label">Mobile</label>
              </div>
              <div className="col-10">
                <input type="text" className="form-control" id="Mobile"/>
              </div>

              <div className="col-2 my-auto">
                <label htmlFor="Fax" className="form-label">Fax</label>
              </div>
              <div className="col-10">
                <input type="text" className="form-control" id="Fax"/>
              </div>

              <div className="col-2 my-auto">
                <label htmlFor="Email" className="form-label">Email</label>
              </div>
              <div className="col-10">
                <input type="text" className="form-control" id="Email" />
              </div>

              <div className="col-2 my-auto">
                <label htmlFor="Website" className="form-label">Website</label>
              </div>
              <div className="col-10">
                <input type="text" className="form-control" id="Website"/>
              </div>

            </div>
          </div>
          <div className="col-4">
            <div className="mt-3 row">
              <div className="col-6 my-auto">
                <label htmlFor="FinancialYear" className="form-label">Financial year beginning from</label>
              </div>
              <div className="col-6">
                <input type="text" className="form-control" id="FinancialYear"/>
              </div>

              <div className="col-6 my-auto">
                <label htmlFor="Books" className="form-label">Books beginning from</label>
              </div>
              <div className="col-6">
                <input type="text" className="form-control" id="Books"/>
              </div>

              <div className="col-6 my-auto">
                <label htmlFor="Base" className="form-label">Base currency symbol</label>
              </div>
              <div className="col-6">
                <input type="text" className="form-control" id="Base"/>
              </div>

              <div className="col-6 my-auto">
                <label htmlFor="Formal" className="form-label">Formal Name</label>
              </div>
              <div className="col-6">
                <input type="text" className="form-control" id="Formal"/>
              </div>

              <div className="col-8 my-auto">
                <label htmlFor="Provide" className="form-label">Provide Additional Base Currency details</label>
              </div>
              <div className="col-4">
                <label className="switch">
                  <input type="checkbox" />
                  <span className="slider round"></span>
                </label>
              </div>

              <div className="col-6 my-auto">
                <label htmlFor="Suffix" className="form-label">Suffix symbol to amount</label>
              </div>
              <div className="col-6">
                <select id="Suffix" className="form-select w-100">
                  <option>Yes</option>
                  <option>No</option>
                </select>
              </div>

              <div className="col-6 my-auto">
                <label htmlFor="SpaceBetween" className="form-label">Add space between amount & symbol</label>
              </div>
              <div className="col-6">
                <select id="SpaceBetween" className="form-select w-100">
                  <option>Yes</option>
                  <option>No</option>
                </select>
              </div>

              <div className="col-6 my-auto">
                <label htmlFor="ShowInMillions" className="form-label">Show amount in millions</label>
              </div>
              <div className="col-6">
                <select id="ShowInMillions" className="form-select w-100">
                  <option>Yes</option>
                  <option>No</option>
                </select>
              </div>

              <div className="col-6 my-auto">
                <label htmlFor="WordAfterDecimal" className="form-label">Word representing amount after decimal</label>
              </div>
              <div className="col-6">
                <input type="text" className="form-control" id="WordAfterDecimal"/>
              </div>

              <div className="col-6 my-auto">
                <label htmlFor="Formal" className="form-label">No of decimal places for amount in word</label>
              </div>
              <div className="col-6">
                <input type="text" className="form-control" id="Formal"/>
              </div>
            </div>
          </div>
          
          
        </div>
      </form> */}

      </Modal>

      <div>
        <div className="companies-page">
          <div className="companies-header">
            <h2>Account</h2>
            <button onClick={openModal} className="btn btn-primary new-btn">Add Account</button>
          </div>
          <div className="row">
            <div className="col-8">
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
                      <th>
                        Code
                      </th>
                      <th>
                        Name
                      </th>
                      <th>
                        Parent Group
                      </th>
                      <th>
                        Approval Status
                      </th>
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
                          onChange={(e) => handleSearchChange("phone", e.target.value)}
                        />
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredCompanies.map((company) => (
                      <tr key={company.id}>
                        <td>{company.name}</td>
                        <td>{company.parentName}</td>
                        <td>{company.address}</td>
                        <td>{company.phone}</td>

                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
            <div className="col-4">
              <div className="chart-of-accounts">
                <div className="header">
                  <div className="header-top">
                    <h2>Chart of Accounts</h2><br/>
                    <div className="search-container">
                    {/* <div className="search-icon">🔍</div> */}
                    <input
                      type="text"
                      placeholder="Search accounts..."
                      className="search-input"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </div>
                    <div className="button-group">
                      <button className="btn btn-outline" onClick={collapseAll}>
                        <span className="btn-icon">−</span>
                        Collapse All
                      </button>
                      <button className="btn btn-primary" onClick={expandAll}>
                        <span className="btn-icon">+</span>
                        Expand All
                      </button>
                    </div>
                  </div>

                  
                </div>

                <div className="accounts-tree">
                  <div className="tree-container">
                    <ul className="tree-list">
                      {accountStructure.map((mainGroup) => (
                        <li key={mainGroup.name} className="tree-item main-group">
                          <div
                            className={`group-header main-header ${expandedGroups.has(mainGroup.name) ? 'expanded' : ''}`}
                            onClick={() => toggleGroup(mainGroup.name)}
                          >
                            <span className="expand-icon">
                              {mainGroup.subGroups.length > 0 && (
                                expandedGroups.has(mainGroup.name) ? '🔽' : '▶️'
                              )}
                            </span>
                            <span className="group-name">
                              {/* <span className="group-number">1</span> */}
                              {mainGroup.name}
                            </span>
                          </div>

                          {mainGroup.subGroups.length > 0 && expandedGroups.has(mainGroup.name) && (
                            <ul className="subgroup-list">
                              {mainGroup.subGroups.map((group) => (
                                <li key={group.name} className="subgroup-item group-item">
                                  <div
                                    className={`subgroup-header ${expandedGroups.has(group.name) ? 'expanded' : ''}`}
                                    onClick={() => toggleGroup(group.name)}
                                  >
                                    <span className="expand-icon">
                                      {group.subGroups.length > 0 && (
                                        expandedGroups.has(group.name) ? '🔽' : '▶️'
                                      )}
                                    </span>
                                    <span className="group-name">{group.name}</span>
                                    <span className="item-count">{group.subGroups.length}</span>
                                  </div>

                                  {group.subGroups.length > 0 && expandedGroups.has(group.name) && (
                                    <ul className="sub-subgroup-list">
                                      {group.subGroups.map((subGroup) => (
                                        <li key={subGroup} className="sub-subgroup-item">
                                          <div className="subgroup-content">
                                            <span className="bullet">•</span>
                                            {subGroup}
                                          </div>
                                        </li>
                                      ))}
                                    </ul>
                                  )}
                                </li>
                              ))}
                            </ul>
                          )}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AccountsLedger;
