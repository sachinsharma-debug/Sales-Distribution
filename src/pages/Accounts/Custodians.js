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
const Custodians = () => {
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
      "Mobile_No": "",
      "Email": "",
      "Incharge": ""
  })

  // Handle search filter changes
  const handleSearchChange = (field, value) => {
    setSearchFilters((prev) => ({
      ...prev,
      [field]: value,
    }));
  };
  const [CustodiansData, setCustodiansData] = useState([])
  
  // Filter companies based on search criteria
  const filteredCustodians = CustodiansData
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
    const res = await fetch(BASE_URL + "get_master/Custodians"); // response object
    const data = await res.json(); // JSON body
    setCustodiansData(data?.data || []); // safely update state
  } catch (err) {
    console.error("Error fetching Custodians:", err);
  }
}

  async function addupdate() {
    let payload = {
      tablename: "Custodians",
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
          <div style={{ fontSize: 20 }}>Custodians</div>
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
                  <label htmlFor="CompanyCode" className="form-label">Name</label>
                </div>
                <div className="col-6">
                  <input type="text"
                  
                  value={formobj.Name}

                    onChange={(e) => {
                      formobj.Name = e.target.value
                      setformobj({ ...formobj })
                    }}
                  
                  className="form-control" id="CompanyCode" />
                </div>

                <div className="col-6 my-auto">
                  <label htmlFor="CompanyCode" className="form-label">Under</label>
                </div>
                <div className="col-6">
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

                <div className="col-6 my-auto">
                  <label htmlFor="Country" className="form-label">Mobile No.</label>
                </div>
                <div className="col-6">
                  <input type="text"
                  
                  value={formobj.Mobile_No}

                    onChange={(e) => {
                      formobj.Mobile_No = e.target.value
                      setformobj({ ...formobj })
                    }}
                  
                  className="form-control" id="CompanyCode" />
                </div>

                <div className="col-6 my-auto">
                  <label htmlFor="Country" className="form-label">Email</label>
                </div>
                <div className="col-6">
                  <input type="text"
                  
                  value={formobj.Email}

                    onChange={(e) => {
                      formobj.Email = e.target.value
                      setformobj({ ...formobj })
                    }}
                  
                  className="form-control" id="CompanyCode" />
                </div>

                <div className="col-6 my-auto">
                  <label htmlFor="Country" className="form-label">Incharge</label>
                </div>
                <div className="col-6">
                  <input type="text"
                  
                  value={formobj.Incharge}

                    onChange={(e) => {
                      formobj.Incharge = e.target.value
                      setformobj({ ...formobj })
                    }}
                  
                  className="form-control" id="CompanyCode" />
                </div>
              </div>
            </div>
          </div>
        </form>

      </Modal>
      <div className="companies-page">
        <div className="companies-header">
          <h2>Custodians</h2>
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
            Showing 1 to {filteredCustodians.length} of {filteredCustodians.length}{" "}
            entries
            {filteredCustodians.length !== CustodiansData.length && (
              <span className="filtered-text">
                {" "}
                (filtered from {CustodiansData.length} total entries)
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
                  Mobile No.
                </th>
                <th>
                  Email
                </th>
                <th>
                  Incharge
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
              </tr>
            </thead>
            <tbody>
              {filteredCustodians.map((Custodians) => (
                <tr>
                  <td>{Custodians.Name}</td>
                  <td>{Custodians.Under}</td>
                  <td>{Custodians.Mobile_No}</td>
                  <td>{Custodians.Email}</td>
                  <td>{Custodians.Incharge}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default Custodians;
