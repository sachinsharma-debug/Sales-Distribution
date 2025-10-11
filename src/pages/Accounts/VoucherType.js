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
const VoucherType = () => {
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
      "SelectTypeOfVoucher": "",
      "Abbreviation": "",
      "ActivateThisVoucherType": false,
      "MethodOfVoucherNumbering": "",
      "NumberingBehaviourOnInsertionDeletion": "",
      "SetAlterAdditionalNumberingDetails": false,
      "ShowUnusedVoucherNosInTransactionForRetainOriginalVoucherNoBehaviour": false
  })

  // Handle search filter changes
  const handleSearchChange = (field, value) => {
    setSearchFilters((prev) => ({
      ...prev,
      [field]: value,
    }));
  };
  const [VoucherTypeData, setVoucherTypeData] = useState([])
  
  // Filter companies based on search criteria
  const filteredVoucherType = VoucherTypeData
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
    const res = await fetch(BASE_URL + "get_master/VoucherType"); // response object
    const data = await res.json(); // JSON body
    setVoucherTypeData(data?.data || []); // safely update state
  } catch (err) {
    console.error("Error fetching VoucherType:", err);
  }
}

  async function addupdate() {
    let payload = {
      tablename: "VoucherType",
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
          <div style={{ fontSize: 20 }}>Create Voucher</div>
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
                  <label htmlFor="Country" className="form-label">Select type of voucher</label>
                </div>
                <div className="col-5 my-1">
                  <select id="Country" className="form-select w-100"
                  
                  value={formobj.SelectTypeOfVoucher}

                    onChange={(e) => {
                      formobj.SelectTypeOfVoucher = e.target.value
                      setformobj({ ...formobj })
                    }}
                  
                  >
                    <option>Attendance</option>
                  </select>
                </div>

                <div className="col-7 my-auto">
                  <label htmlFor="CompanyCode" className="form-label">Abbreviation</label>
                </div>
                <div className="col-5">
                  <input type="text"
                  
                  value={formobj.Abbreviation}

                    onChange={(e) => {
                      formobj.Abbreviation = e.target.value
                      setformobj({ ...formobj })
                    }}
                  
                  className="form-control" id="CompanyCode" />
                </div>

                <div className="col-7 my-auto">
                  <label htmlFor="Country" className="form-label">Activate this Voucher Type</label>
                </div>
                <div className="col-5 my-1">
                  <select id="Country" className="form-select w-100"
                  
                  value={formobj.ActivateThisVoucherType}

                    onChange={(e) => {
                      formobj.ActivateThisVoucherType = e.target.value
                      setformobj({ ...formobj })
                    }}
                  
                  >
                    <option>No</option>
                    <option>Yes</option>
                  </select>
                </div>

                <div className="col-7 my-auto">
                  <label htmlFor="Country" className="form-label">Method of Voucher Numbering</label>
                </div>
                <div className="col-5 my-1">
                  <select id="Country" className="form-select w-100"
                  
                  value={formobj.MethodOfVoucherNumbering}

                    onChange={(e) => {
                      formobj.MethodOfVoucherNumbering = e.target.value
                      setformobj({ ...formobj })
                    }}
                  
                  >
                    <option>Automatic</option>
                    <option>Manually</option>
                  </select>
                </div>

                <div className="col-7 my-auto">
                  <label htmlFor="Country" className="form-label">Numbering Behaviour on insertion/deletion</label>
                </div>
                <div className="col-5 my-1">
                  <select id="Country" className="form-select w-100"
                  
                  value={formobj.NumberingBehaviourOnInsertionDeletion}

                    onChange={(e) => {
                      formobj.NumberingBehaviourOnInsertionDeletion = e.target.value
                      setformobj({ ...formobj })
                    }}
                  
                  >
                    <option>Retain Orignal Voucher No</option>
                  </select>
                </div>

                <div className="col-7 my-auto">
                  <label htmlFor="Country" className="form-label">Set/Alter additional numbering details</label>
                </div>
                <div className="col-5 my-1">
                  <select id="Country" className="form-select w-100"
                  
                  value={formobj.SetAlterAdditionalNumberingDetails}

                    onChange={(e) => {
                      formobj.SetAlterAdditionalNumberingDetails = e.target.value
                      setformobj({ ...formobj })
                    }}
                  
                  >
                    <option>No</option>
                    <option>Yes</option>
                  </select>
                </div>

                <div className="col-7 my-auto">
                  <label htmlFor="Country" className="form-label">Show unused vch nos. in transaction for Retain Original Voucher No. behaviour </label>
                </div>
                <div className="col-5 my-1">
                  <select id="Country" className="form-select w-100"
                  
                  value={formobj.ShowUnusedVoucherNosInTransactionForRetainOriginalVoucherNoBehaviour}

                    onChange={(e) => {
                      formobj.ShowUnusedVoucherNosInTransactionForRetainOriginalVoucherNoBehaviour = e.target.value
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
          <h2>Voucher Type</h2>
          <button onClick={openModal} className="btn btn-primary new-btn">Create Voucher</button>
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
            Showing 1 to {filteredVoucherType.length} of {filteredVoucherType.length}{" "}
            entries
            {filteredVoucherType.length !== VoucherTypeData.length && (
              <span className="filtered-text">
                {" "}
                (filtered from {VoucherTypeData.length} total entries)
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
                  Voucher Type
                </th>
                <th>
                  Abbreviation
                </th>
                <th>
                  Active Voucher 
                </th>
                <th>
                  Method Of Voucher Numbering
                </th>
                <th>
                  Numbering Behaviour
                </th>
                <th>
                  Additional Numbering Details
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
              {filteredVoucherType.map((VoucherType) => (
                <tr>
                  <td>{VoucherType.Name}</td>
                  <td>{VoucherType.SelectTypeOfVoucher}</td>
                  <td>{VoucherType.Abbreviation}</td>
                  <td>{VoucherType.ActivateThisVoucherType}</td>
                  <td>{VoucherType.MethodOfVoucherNumbering}</td>
                  <td>{VoucherType.NumberingBehaviourOnInsertionDeletion}</td>
                  <td>{VoucherType.SetAlterAdditionalNumberingDetails}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default VoucherType;
