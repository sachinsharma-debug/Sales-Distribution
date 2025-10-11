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
const AssetGroup = () => {
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
    "AssetClassification": "",
    "Nature": "",
    "AssetType": "",
    "UseFullLife": false,
    "SalvagePercent": 0,
    "MaintainAutoAssetID": false
  })

  // Handle search filter changes
  const handleSearchChange = (field, value) => {
    setSearchFilters((prev) => ({
      ...prev,
      [field]: value,
    }));
  };
  const [AssetGroupData, setAssetGroupData] = useState([])
  
  // Filter companies based on search criteria
  const filteredAssetGroup = AssetGroupData
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
    const res = await fetch(BASE_URL + "get_master/AssetGroup"); // response object
    const data = await res.json(); // JSON body
    setAssetGroupData(data?.data || []); // safely update state
  } catch (err) {
    console.error("Error fetching AssetGroup:", err);
  }
}

  async function addupdate() {
    let payload = {
      tablename: "AssetGroup",
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
          <div style={{ fontSize: 20 }}>Asset Group</div>
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
                  <label htmlFor="Country" className="form-label">Asset Classification</label>
                </div>
                <div className="col-5 my-1">
                  <select id="Country" className="form-select w-100"
                  
                  value={formobj.AssetClassification}
                    onChange={(e) => {
                      formobj.AssetClassification = e.target.value
                      setformobj({ ...formobj })

                    }}
                  
                  >
                    <option>Fixed Assets</option>
                    <option>Motor Car</option>
                    <option>Office Building-WIP</option>
                    <option>Office Equipments</option>
                    <option>Plant & Machinery</option>
                  </select>
                </div>

                <div className="col-7 my-auto">
                  <label htmlFor="Country" className="form-label">Nature</label>
                </div>
                <div className="col-5 my-1">
                  <select id="Country" className="form-select w-100"
                  
                  value={formobj.Nature}
                    onChange={(e) => {
                      formobj.Nature = e.target.value
                      setformobj({ ...formobj })

                    }}
                  
                  >
                    <option>Not Applicable</option>
                  </select>
                </div>

                <div className="col-7 my-auto">
                  <label htmlFor="Country" className="form-label">Asset Type</label>
                </div>
                <div className="col-5 my-1">
                  <select id="Country" className="form-select w-100"
                  
                  value={formobj.AssetType}
                    onChange={(e) => {
                      formobj.AssetType = e.target.value
                      setformobj({ ...formobj })

                    }}
                  
                  >
                    <option>Intangible Assets</option>
                    <option>Tangible Assets</option>
                  </select>
                </div>

                <div className="col-7 my-auto">
                  <label htmlFor="CompanyCode" className="form-label">Use Full Life</label>
                </div>
                <div className="col-5">
                  <input type="text"
                  
                  value={formobj.UseFullLife}

                    onChange={(e) => {
                      formobj.UseFullLife = e.target.value
                      setformobj({ ...formobj })
                    }}
                  
                  className="form-control" id="CompanyCode" />
                </div>

                <div className="col-7 my-auto">
                  <label htmlFor="CompanyCode" className="form-label">Salvage %</label>
                </div>
                <div className="col-5">
                  <input type="text"
                  
                  value={formobj.SalvagePercent}

                    onChange={(e) => {
                      formobj.SalvagePercent = e.target.value
                      setformobj({ ...formobj })
                    }}
                  
                  className="form-control" id="CompanyCode" />
                </div>

                <div className="col-7 my-auto">
                  <label htmlFor="Country" className="form-label">Maintain Auto Asset ID</label>
                </div>
                <div className="col-5 my-1">
                  <select id="Country" className="form-select w-100"
                  
                  value={formobj.MaintainAutoAssetID}

                    onChange={(e) => {
                      formobj.MaintainAutoAssetID = e.target.value
                      setformobj({ ...formobj })
                    }}
                  
                  >
                    <option>No</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
        </form>

      </Modal>
      <div className="companies-page">
        <div className="companies-header">
          <h2>Asset Group</h2>
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
            Showing 1 to {filteredAssetGroup.length} of {filteredAssetGroup.length}{" "}
            entries
            {filteredAssetGroup.length !== AssetGroupData.length && (
              <span className="filtered-text">
                {" "}
                (filtered from {AssetGroupData.length} total entries)
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
                  Asset Classification
                </th>
                <th>
                  Nature
                </th>
                <th>
                  Asset Type
                </th>
                <th>
                  Use Full Life
                </th>
                <th>
                  Salvage %
                </th>
                <th>
                  Maintain Auto Asset ID
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
                    value={searchFilters.text}
                    onChange={(e) => handleSearchChange("text", e.target.value)}
                  />
                </th>
                <th>
                  <input
                    type="text"
                    className="search-input"
                    placeholder="Search email..."
                    value={searchFilters.text}
                    onChange={(e) => handleSearchChange("text", e.target.value)}
                  />
                </th>
                <th>
                  <input
                    type="text"
                    className="search-input"
                    placeholder="Search website..."
                    value={searchFilters.text}
                    onChange={(e) =>
                      handleSearchChange("website", e.target.value)
                    }
                  />
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredAssetGroup.map((AssetGroup) => (
                <tr>
                  <td>{AssetGroup.Name}</td>
                  <td>{AssetGroup.Under}</td>
                  <td>{AssetGroup.AssetClassification}</td>
                  <td>{AssetGroup.Nature}</td>
                  <td>{AssetGroup.AssetType}</td>
                  <td>{AssetGroup.UseFullLife}</td>
                  <td>{AssetGroup.SalvagePercent}</td>
                  <td>{AssetGroup.MaintainAutoAssetID}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default AssetGroup;
