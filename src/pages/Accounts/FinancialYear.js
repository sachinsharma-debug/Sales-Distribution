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
const FinancialYear = () => {
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
    "Period": "",
    "PeriodFrom": "",
    "PeriodTo": "",
    "UseAsCurrentPeriod": false
  })

  // Handle search filter changes
  const handleSearchChange = (field, value) => {
    setSearchFilters((prev) => ({
      ...prev,
      [field]: value,
    }));
  };
  const [FinancialYearData, setFinancialYearData] = useState([])
  
  // Filter companies based on search criteria
  const filteredFinancialYear = FinancialYearData
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
    const res = await fetch(BASE_URL + "get_master/FinancialYear"); // response object
    const data = await res.json(); // JSON body
    setFinancialYearData(data?.data || []); // safely update state
  } catch (err) {
    console.error("Error fetching FinancialYear:", err);
  }
}

  async function addupdate() {
    let payload = {
      tablename: "FinancialYear",
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
        className="my-modal1"
      >
        <div className="d-flex justify-content-between  pb-2" style={{ borderBottom: '1px solid #eee' }}>
          <div style={{ fontSize: 20 }}>Financial Year</div>
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

                <div className="col-6 my-auto">
                  <label htmlFor="CompanyCode" className="form-label">Period</label>
                </div>
                <div className="col-6">
                  <input type="text"
                  
                  value={formobj.Period}

                    onChange={(e) => {
                      formobj.Period = e.target.value
                      setformobj({ ...formobj })
                    }}
                  
                  className="form-control" id="CompanyCode" />
                </div>

                <div className="col-6 my-auto">
                  <label htmlFor="Country" className="form-label">Period From</label>
                </div>
                <div className="col-6">
                  <input type="text"
                  
                  value={formobj.PeriodFrom}

                    onChange={(e) => {
                      formobj.PeriodFrom = e.target.value
                      setformobj({ ...formobj })
                    }}
                  
                  className="form-control" id="CompanyCode" />
                </div>

                <div className="col-6 my-auto">
                  <label htmlFor="Country" className="form-label">Period To</label>
                </div>
                <div className="col-6">
                  <input type="text"
                  
                  value={formobj.PeriodTo}

                    onChange={(e) => {
                      formobj.PeriodTo = e.target.value
                      setformobj({ ...formobj })
                    }}
                  
                  className="form-control" id="CompanyCode" />
                </div>

                <div className="col-6 my-auto">
                    <label htmlFor="CompanyCode" className="form-label">Use As Current Period</label>
                  </div>
                  <div className="col-6">
                    <select id="Country" className="form-select w-100"
                    
                     value={formobj.UseAsCurrentPeriod}
                    onChange={(e) => {
                      formobj.UseAsCurrentPeriod = e.target.value
                      setformobj({ ...formobj })

                    }}
                    
                    >
                      <option>No</option>
                      <option>Yes</option>
                    </select>
                  </div>
              </div>
            </div>
          </div>
        </form>

      </Modal>
      <div className="companies-page">
        <div className="companies-header">
          <h2>Financial Year</h2>
          <button onClick={openModal} className="btn btn-primary new-btn">Create</button>
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
            Showing 1 to {filteredFinancialYear.length} of {filteredFinancialYear.length}{" "}
            entries
            {filteredFinancialYear.length !== FinancialYearData.length && (
              <span className="filtered-text">
                {" "}
                (filtered from {FinancialYearData.length} total entries)
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
                  Period
                </th>
                <th>
                  Period From
                </th>
                <th>
                  Period To
                </th>
                <th>
                  Use As Current Period
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
              {filteredFinancialYear.map((FinancialYear) => (
                <tr>
                  <td>{FinancialYear.Period}</td>
                  <td>{FinancialYear.PeriodFrom}</td>
                  <td>{FinancialYear.PeriodTo}</td>
                  <td>{FinancialYear.UseAsCurrentPeriod}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default FinancialYear;
