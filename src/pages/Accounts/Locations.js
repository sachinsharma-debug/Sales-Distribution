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
const Locations = () => {
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
      "Mailing_Name": "",
      "Name": "",
      "Under": "",
      "Use_For": ""
  })

  // Handle search filter changes
  const handleSearchChange = (field, value) => {
    setSearchFilters((prev) => ({
      ...prev,
      [field]: value,
    }));
  };
  const [LocationsData, setLocationsData] = useState([])
  
  // Filter companies based on search criteria
  const filteredLocations = LocationsData
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
    const res = await fetch(BASE_URL + "get_master/Locations"); // response object
    const data = await res.json(); // JSON body
    setLocationsData(data?.data || []); // safely update state
  } catch (err) {
    console.error("Error fetching Locations:", err);
  }
}

  async function addupdate() {
    let payload = {
      tablename: "Locations",
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
          <div style={{ fontSize: 20 }}>Godown</div>
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

                <div className="col-4 my-auto">
                  <label htmlFor="CompanyCode" className="form-label">Mailing Name</label>
                </div>
                <div className="col-8">
                  <input type="text"
                  
                  value={formobj.Mailing_Name}

                    onChange={(e) => {
                      formobj.Mailing_Name = e.target.value
                      setformobj({ ...formobj })
                    }}
                  
                  className="form-control" id="CompanyCode" />
                </div>

                <div className="col-4 my-auto">
                  <label htmlFor="CompanyCode" className="form-label">Name</label>
                </div>
                <div className="col-8">
                  <input type="text"
                  
                  value={formobj.Name}

                    onChange={(e) => {
                      formobj.Name = e.target.value
                      setformobj({ ...formobj })
                    }}
                  
                  className="form-control" id="CompanyCode" />
                </div>

                <div className="col-4 my-auto">
                  <label htmlFor="CompanyCode" className="form-label">Under</label>
                </div>
                <div className="col-8">
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

                <div className="col-4 my-auto">
                  <label htmlFor="Country" className="form-label">Use For</label>
                </div>
                <div className="col-8">
                  <select id="Country" className="form-select w-100"
                  
                  value={formobj.Use_For}

                    onChange={(e) => {
                      formobj.Use_For = e.target.value
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
          <h2>Godown</h2>
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
            Showing 1 to {filteredLocations.length} of {filteredLocations.length}{" "}
            entries
            {filteredLocations.length !== LocationsData.length && (
              <span className="filtered-text">
                {" "}
                (filtered from {LocationsData.length} total entries)
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
                  Mailing Name
                </th>
                <th>
                  Name
                </th>
                <th>
                  Under
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
              </tr>
            </thead>
            <tbody>
              {filteredLocations.map((Locations) => (
                <tr>
                  <td>{Locations.Mailing_Name}</td>
                  <td>{Locations.Name}</td>
                  <td>{Locations.Under}</td>
                  <td>{Locations.Use_For}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default Locations;
