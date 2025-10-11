import React, { useState } from "react";
import "../Settings/Companies.css";
import ReactDOM from 'react-dom';
import Modal from 'react-modal';
const CustomStyles  = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    // transform: 'translate(-50%, -50%)',
  },
};
const StockCategory = () => {
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
        "",
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
      style={{CustomStyles}}
      contentLabel="Example Modal"
      className={"custom-modal stock-item-modal"}
    >
      <div className="d-flex justify-content-between  pb-2" style={{borderBottom: '1px solid #eee'}}>
        <div style={{fontSize:20}}>Add Stock Category</div>
        <div className="my-auto">
          <button type="submit" className="btn btn-primary">Add</button>
        </div>
      </div>
      <form className="company-form" style={{maxHeight: '500px'}}>
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
            </div>
          </div>
        </div>
      </form>

    </Modal>
    <div className="companies-page">
      <div className="companies-header">
        <h2>Stock Category</h2>
        <button onClick={openModal} className="btn btn-primary new-btn">Add Stock Category</button>
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
              <th>
                Name
              </th>
              <th>
                Under
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

export default StockCategory;