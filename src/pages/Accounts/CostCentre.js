import React, { useState,useEffect } from "react";
import "../Settings/Companies.css";
import ReactDOM from 'react-dom';
import Modal from 'react-modal';
import { BASE_URL } from "../../api/common";
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
const CostCentre = () => {
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
    
      "Name": "",
      "Under": "",
      "ShowOpeningBalanceForRevenueItemsInReports": false,
      "ProvideBankDetails": false,
      "EmailID": "",
      "UseForBranch": "",
      "VendorName": "",
      "AccountingGroup": "",
      "UseFor": ""
  })

  // Handle search filter changes
  const handleSearchChange = (field, value) => {
    setSearchFilters((prev) => ({
      ...prev,
      [field]: value,
    }));
  };
  const [CostCentreData, setCostCentreData] = useState([])
  
  // Filter companies based on search criteria
  const filteredCostCentre = CostCentreData
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



useEffect(()=>{
getmethod()
},[])



  function edit(objedit) {

    setformobj(objedit)



  }
  async function getmethod() {
  try {
    const res = await fetch(BASE_URL + "get_master/Cost_Centre"); // response object
    const data = await res.json(); // JSON body
    setCostCentreData(data?.data || []); // safely update state
  } catch (err) {
    console.error("Error fetching Cost_Centre:", err);
  }
}

  async function addupdate() {
    let payload = {
      tablename: "Cost_Centre",
      data: formobj
    }

    let response = await fetch(BASE_URL + "create_master", {
      method: "POST", // HTTP method
      headers: {
        "Content-Type": "application/json", // Tell server we’re sending JSON
      },
      body: JSON.stringify(payload),
    })
    response = await response.json()
    // console.log(response)

  getmethod()
  closeModal()

  }
  return (
    <>
      <Modal
        isOpen={modalIsOpen}
        onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        style={{ CustomStyles }}
        contentLabel="Example Modal"
        className="my-modal"
      >
        <div className="d-flex justify-content-between  pb-2" style={{ borderBottom: '1px solid #eee' }}>
          <div style={{ fontSize: 20 }}>Create Cost Centre</div>
          <div className="my-auto">
            <button type="submit" className="btn btn-primary"
              onClick={() => {
                addupdate()
                // closeModal()
              }}
            >Create</button>
          </div>
        </div>
        <form className="company-form" style={{ maxHeight: '500px' }}>
          <div className="row">
            <div className="col-12">
              <div className="mt-3 row">

                <div className="col-7 my-auto">
                  <label htmlFor="CompanyCode" className="form-label">Name</label>
                </div>
                <div className="col-5">
                  <input type="text"
                  
                  value={formobj.Name}

                    onChange={(e) => {
                      formobj.Name = e.target.value
                      setformobj({ ...formobj })
                    }}
                  
                  className="form-control" id="CompanyCode" />
                </div>

                <div className="col-7 my-auto">
                  <label htmlFor="Country" className="form-label">Under</label>
                </div>
                <div className="col-5 my-1">
                  <select id="Country" className="form-select w-100"
                  
                  value={formobj.Under}

                    onChange={(e) => {
                      formobj.Under = e.target.value
                      setformobj({ ...formobj })
                    }}
                  
                  >
                    <option>Primary</option>
                  </select>
                </div>

                <div className="col-7 my-auto">
                  <label htmlFor="CompanyCode" className="form-label">Show opening balance for revenue items in reports</label>
                </div>
                <div className="col-5 my-1">
                  <select id="Country" className="form-select w-100"
                  
                  value={formobj.ShowOpeningBalanceForRevenueItemsInReports}

                    onChange={(e) => {
                      formobj.ShowOpeningBalanceForRevenueItemsInReports = e.target.value
                      setformobj({ ...formobj })
                    }}
                  
                  >
                    <option>No</option>
                    <option>Yes</option>
                  </select>
                </div>

                <div className="col-7 my-auto">
                  <label htmlFor="Country" className="form-label">Provide bank details</label>
                </div>
                <div className="col-5 my-1">
                  <select id="Country" className="form-select w-100"
                  
                  value={formobj.ProvideBankDetails}

                    onChange={(e) => {
                      formobj.ProvideBankDetails = e.target.value
                      setformobj({ ...formobj })
                    }}
                  
                  >
                    <option>No</option>
                    <option>Yes</option>
                  </select>
                </div>

                <div className="col-7 my-auto">
                  <label htmlFor="Country" className="form-label">Email ID</label>
                </div>
                <div className="col-5">
                  <input type="text"
                  
                  value={formobj.EmailID}

                    onChange={(e) => {
                      formobj.EmailID = e.target.value
                      setformobj({ ...formobj })
                    }}
                  
                  className="form-control" id="CompanyCode" />
                </div>

                <div className="col-7 my-auto">
                  <label htmlFor="Country" className="form-label">Use for Branch</label>
                </div>
                <div className="col-5 my-1">
                  <select id="Country" className="form-select w-100"
                  
                  value={formobj.UseForBranch}

                    onChange={(e) => {
                      formobj.UseForBranch = e.target.value
                      setformobj({ ...formobj })
                    }}
                  
                  >
                    <option>No</option>
                    <option>Yes</option>
                  </select>
                </div>

                <div className="col-7 my-auto">
                  <label htmlFor="Country" className="form-label">Vendor Name</label>
                </div>
                <div className="col-5 my-1">
                  <select id="Country" className="form-select w-100"
                  
                  value={formobj.VendorName}

                    onChange={(e) => {
                      formobj.VendorName = e.target.value
                      setformobj({ ...formobj })
                    }}
                  
                  >
                    <option>End Of List</option>
                  </select>
                </div>

                <div className="col-7 my-auto">
                  <label htmlFor="Country" className="form-label">Accounting Group</label>
                </div>
                <div className="col-5 my-1">
                  <select id="Country" className="form-select w-100"
                  
                  value={formobj.AccountingGroup}

                    onChange={(e) => {
                      formobj.AccountingGroup = e.target.value
                      setformobj({ ...formobj })
                    }}
                  
                  >
                    <option>Not Applicable</option>
                  </select>
                </div>

                <div className="col-7 my-auto">
                  <label htmlFor="Country" className="form-label">Use For</label>
                </div>
                <div className="col-5 my-1">
                  <select id="Country" className="form-select w-100"
                  
                  value={formobj.UseFor}

                    onChange={(e) => {
                      formobj.UseFor = e.target.value
                      setformobj({ ...formobj })
                    }}
                  
                  >
                    <option>Not Applicable</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
        </form>

      </Modal>
      <div className="companies-page">
        <div className="companies-header">
          <h2>Cost Centre</h2>
          <button onClick={openModal} className="btn btn-primary new-btn">Create Cost Centre</button>
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
            Showing 1 to {filteredCostCentre.length} of {filteredCostCentre.length}{" "}
            entries
            {filteredCostCentre.length !== CostCentreData.length && (
              <span className="filtered-text">
                {" "}
                (filtered from {CostCentreData.length} total entries)
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
                  Name
                </th>
                <th>
                  Under
                </th>
                <th>
                  Provide Bank Details
                </th>
                <th>
                  Email ID
                </th>
                <th>
                  Use For Branch
                </th>
                <th>
                  Vendor Name
                </th>
                <th>
                  Use For
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
                    onChange={(e) =>
                      handleSearchChange("website", e.target.value)
                    }
                  />
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredCostCentre.map((CostCentre) => (
                <tr>
                  <td>{CostCentre.Name}</td>
                  <td>{CostCentre.Under}</td>
                  <td>{CostCentre.ProvideBankDetails}</td>
                  <td>{CostCentre.EmailID}</td>
                  <td>{CostCentre.UseForBranch}</td>
                  <td>{CostCentre.VendorName}</td>
                  <td>{CostCentre.AccountingGroup}</td>
                  <td>{CostCentre.UseFor}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default CostCentre;
