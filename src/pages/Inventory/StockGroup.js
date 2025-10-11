import React, { useState } from "react";
import "../Settings/Companies.css";
import Modal from 'react-modal';
import './StockGroup.css'

const CustomStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    transform: 'translate(-50%, -50%)',
  },
};

const StockGroup = () => {
  const [modalIsOpen, setIsOpen] = useState(false);
  const [parameterModalOpen, setParameterModalOpen] = useState(false); // New modal
  const [parameterValue, setParameterValue] = useState("No");

  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);
  const closeParameterModal = () => setParameterModalOpen(false);

  const handleParameterChange = (e) => {
    const value = e.target.value;
    setParameterValue(value);
    if (value === "Yes") {
      setParameterModalOpen(true);
    }
  };

  // Search filters state
  const [searchFilters, setSearchFilters] = useState({
    name: "",
    parentName: "",
  });

  const handleSearchChange = (field, value) => {
    setSearchFilters((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const companiesData = [
    {
      id: 1,
      name: "AccuZip Solutions Pvt. Ltd.",
      parentName: "",
    },
    {
      id: 2,
      name: "Demo Ankit",
      parentName: "",
    },
  ];

  const filteredCompanies = companiesData.filter((company) => {
    return (
      company.name.toLowerCase().includes(searchFilters.name.toLowerCase()) &&
      company.parentName
        .toLowerCase()
        .includes(searchFilters.parentName.toLowerCase())
    );
  });

  return (
    <>
      {/* Add Stock Group Modal */}
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={CustomStyles}
        contentLabel="Add Stock Group"
        className={"custom-modal"}
      >
        <div className="d-flex justify-content-between pb-2" style={{ borderBottom: '1px solid #eee' }}>
          <div style={{ fontSize: 20 }}>Add Stock Group</div>
          <div className="my-auto">
            <button type="submit" className="btn btn-primary">Add</button>
          </div>
        </div>

        <form className="company-form" style={{ maxHeight: '500px' }}>
          <div className="row">
            <div className="col-12">
              <div className="mt-3 row">
                <div className="col-4 my-auto">
                  <label htmlFor="MasterID" className="form-label">Master ID</label>
                </div>
                <div className="col-8">
                  <input type="text" className="form-control" id="MasterID" />
                </div>

                <div className="col-4 my-auto">
                  <label htmlFor="AlterID" className="form-label">Alter ID</label>
                </div>
                <div className="col-8">
                  <input type="text" className="form-control" id="AlterID" />
                </div>

                <div className="col-4 my-auto">
                  <label htmlFor="CompanyCode" className="form-label">Name</label>
                </div>
                <div className="col-8">
                  <input type="text" className="form-control" id="Symbol" />
                </div>

                <div className="col-4 my-auto">
                  <label htmlFor="under" className="form-label">Under</label>
                </div>
                <div className="col-8">
                  <select id="under" className="form-select w-100">
                    <option>Primary</option>
                  </select>
                </div>

                <div className="col-4 my-auto">
                  <label htmlFor="alterParams" className="form-label">Set / Alter Parameters Info</label>
                </div>
                <div className="col-8">
                  <select
                    id="alterParams"
                    className="form-select w-100"
                    value={parameterValue}
                    onChange={handleParameterChange}
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

      {/* Modal triggered by "Yes" selection */}
      <Modal
        isOpen={parameterModalOpen}
        onRequestClose={closeParameterModal}
        style={CustomStyles}
        contentLabel="Parameter Modal"
        className="custom-modal perameter-modal"
        
      >
        <div className="d-flex justify-content-between pb-2" style={{ borderBottom: '1px solid #eee' }}>
          <div style={{ fontSize: 20 }}>Set Parameters Info</div>
          <button className="close-button" onClick={closeParameterModal}>&times;</button>
        </div>

        <div className="pt-3">
          <div className="mb-3 row">
            <div className="col-4 my-auto">
              <label>Mailing Name Position After Line No</label>
            </div>
            <div className="col-3">
              <input type="text" className="form-control" placeholder="Enter value..." />
            </div>
          </div>

          <table className="table">
            <thead className="parameter-table">
              <tr>
                <th scope="col">Sl No.</th>
                <th scope="col">Parameters</th>
                <th scope="col">Title</th>
                <th scope="col">Input Type</th>
                <th scope="col">Usage</th>
                <th scope="col">Print Type</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th scope="row">1</th>
                <td>Parameters 1</td>
                <td><input className="px-2" type="text" placeholder="Enter value..." style={{border:'1px solid #cccccc',borderRadius:5,fontSize:14,outline:'none'}} /></td>
                <td><input className="px-2" type="text" placeholder="Enter value..." style={{border:'1px solid #cccccc',borderRadius:5,fontSize:14,outline:'none'}} /></td>
                <td><input className="px-2" type="text" placeholder="Enter value..." style={{border:'1px solid #cccccc',borderRadius:5,fontSize:14,outline:'none'}} /></td>
                <td><input className="px-2" type="text" placeholder="Enter value..." style={{border:'1px solid #cccccc',borderRadius:5,fontSize:14,outline:'none'}} /></td>
              </tr>
              <tr>
                <th scope="row">2</th>
                <td>Jacob</td>
                <td>Mark</td>
                <td>Mark</td>
                <td>Mark</td>
                <td>Mark</td>
              </tr>
              <tr>
                <th scope="row">3</th>
                <td>Larry the Bird</td>
                <td>Mark</td>
                <td>Mark</td>
                <td>Mark</td>
                <td>Mark</td>
              </tr>
            </tbody>
          </table>
        </div>
      </Modal>

      {/* Main Page */}
      <div className="companies-page">
        <div className="companies-header">
          <h2>Stock Group</h2>
          <button onClick={openModal} className="btn btn-primary new-btn">Add Stock Group</button>
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
            Showing 1 to {filteredCompanies.length} of {filteredCompanies.length} entries
            {filteredCompanies.length !== companiesData.length && (
              <span className="filtered-text"> (filtered from {companiesData.length} total entries)</span>
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
                    onChange={(e) => handleSearchChange("parentName", e.target.value)}
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

export default StockGroup;
