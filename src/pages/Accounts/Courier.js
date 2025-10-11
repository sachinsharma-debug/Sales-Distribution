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
const Courier = () => {
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
      "MailingName": "",
      "Alias": "",
      "Parent": "",
      "MailingInfo": {
        "Address": "",
        "Country": "India",
        "State": "Delhi",
        "District": "Happy",
        "CityTown": "New Delhi",
        "Pincode": ""
      },
      "OtherInfo": {
        "FaxNo": "",
        "Email": "",
        "CCTo": "",
        "MobileNo": "",
        "PhoneNo": ""
      },
  })

  // Handle search filter changes
  const handleSearchChange = (field, value) => {
    setSearchFilters((prev) => ({
      ...prev,
      [field]: value,
    }));
  };
  const [CourierData, setCourierData] = useState([])
  
  // Filter companies based on search criteria
  const filteredCourier = CourierData
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
    const res = await fetch(BASE_URL + "get_master/Courier"); // response object
    const data = await res.json(); // JSON body
    setCourierData(data?.data || []); // safely update state
  } catch (err) {
    console.error("Error fetching Courier:", err);
  }
}

  async function addupdate() {
    let payload = {
      tablename: "Courier",
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
      >
        <div className="d-flex justify-content-between  pb-2" style={{ borderBottom: '1px solid #eee' }}>
          <div style={{ fontSize: 20 }}>Courier Master</div>
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
          <div className="container-fluid">
            <div className="row pb-4 pt-3" style={{borderBottom:'1px solid rgb(238, 238, 238)'}}>
              <div className="col-3">
                <div className="mt-3 row">
                  <div className="col-3 my-auto">
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
                </div>
              </div>

              <div className="col-3">
                <div className="mt-3 row">
                  <div className="col-4 my-auto px-0">
                    <label htmlFor="CompanyCode" className="form-label">Mailing Name</label>
                  </div>
                  <div className="col-8">
                    <input type="text"
                    
                    value={formobj.MailingName}

                    onChange={(e) => {
                      formobj.MailingName = e.target.value
                      setformobj({ ...formobj })
                    }}
                    
                    className="form-control" id="CompanyCode" />
                  </div>
                </div>
              </div>

              <div className="col-3">
                <div className="mt-3 row">
                  <div className="col-3 my-auto offset-1">
                    <label htmlFor="CompanyCode" className="form-label">Alias</label>
                  </div>
                  <div className="col-8">
                    <input type="text"
                    
                    value={formobj.Alias}

                    onChange={(e) => {
                      formobj.Alias = e.target.value
                      setformobj({ ...formobj })
                    }}
                    
                    className="form-control" id="CompanyCode" />
                  </div>
                </div>
              </div>

              <div className="col-3">
                <div className="mt-3 row">
                  <div className="col-3 my-auto offset-1">
                    <label htmlFor="CompanyCode" className="form-label">Parent</label>
                  </div>
                  <div className="col-8">
                    <input type="text"
                    
                    value={formobj.Parent}

                    onChange={(e) => {
                      formobj.Parent = e.target.value
                      setformobj({ ...formobj })
                    }}
                    
                    className="form-control" id="CompanyCode" />
                  </div>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-6 px-0" style={{borderRight:'1px solid rgb(238, 238, 238)'}}>
                <div className="text-center py-2" style={{borderBottom:'1px solid rgb(238, 238, 238)'}}>Mailing Info</div>
                <div className="row px-4 mt-3">
                  <div className="col-4 my-auto px-0">
                    <label htmlFor="CompanyCode" className="form-label">Address</label>
                  </div>
                  <div className="col-8">
                    <input type="text"
                    
                    value={formobj.MailingInfo.Address}

                    onChange={(e) => {
                      formobj.MailingInfo.Address = e.target.value
                      setformobj({ ...formobj })
                    }}
                    
                    className="form-control" id="CompanyCode" />
                  </div>

                  <div className="col-4 my-auto px-0">
                    <label htmlFor="CompanyCode" className="form-label">Country</label>
                  </div>
                  <div className="col-8">
                    <select id="Country" className="form-select w-100"
                    
                    value={formobj.MailingInfo.Country}

                    onChange={(e) => {
                      formobj.MailingInfo.Country = e.target.value
                      setformobj({ ...formobj })
                    }}
                    
                    >
                      <option>India</option>
                    </select>
                  </div>

                  <div className="col-4 my-auto px-0">
                    <label htmlFor="CompanyCode" className="form-label">State</label>
                  </div>
                  <div className="col-8">
                    <select id="Country" className="form-select w-100"
                    
                    value={formobj.MailingInfo.State}

                    onChange={(e) => {
                      formobj.MailingInfo.State = e.target.value
                      setformobj({ ...formobj })
                    }}
                    
                    >
                      <option>Delhi</option>
                    </select>
                  </div>

                  <div className="col-4 my-auto px-0">
                    <label htmlFor="CompanyCode" className="form-label">District</label>
                  </div>
                  <div className="col-8">
                    <select id="Country" className="form-select w-100"
                    
                    value={formobj.MailingInfo.District}

                    onChange={(e) => {
                      formobj.MailingInfo.District = e.target.value
                      setformobj({ ...formobj })
                    }}
                    
                    >
                      <option>Happy</option>
                    </select>
                  </div>

                  <div className="col-4 my-auto px-0">
                    <label htmlFor="CompanyCode" className="form-label">City / Town</label>
                  </div>
                  <div className="col-8">
                    <select id="Country" className="form-select w-100"
                    
                    value={formobj.MailingInfo.CityTown}

                    onChange={(e) => {
                      formobj.MailingInfo.CityTown = e.target.value
                      setformobj({ ...formobj })
                    }}
                    
                    >
                      <option>New Delhi</option>
                    </select>
                  </div>

                  <div className="col-4 my-auto px-0">
                    <label htmlFor="CompanyCode" className="form-label">Pincode</label>
                  </div>
                  <div className="col-8">
                    <input type="text"
                    
                    value={formobj.MailingInfo.Pincode}

                    onChange={(e) => {
                      formobj.MailingInfo.Pincode = e.target.value
                      setformobj({ ...formobj })
                    }}
                    
                    className="form-control" id="CompanyCode" />
                  </div>
                </div>
              </div>

              <div className="col-6 px-0">
                <div className="text-center py-2" style={{borderBottom:'1px solid rgb(238, 238, 238)'}}>Other Info</div>
                <div className="row px-4 mt-3">
                  <div className="col-4 my-auto px-0">
                    <label htmlFor="CompanyCode" className="form-label">Fax No.</label>
                  </div>
                  <div className="col-8">
                    <input type="text"
                    
                    value={formobj.OtherInfo.FaxNo}

                    onChange={(e) => {
                      formobj.OtherInfo.FaxNo = e.target.value
                      setformobj({ ...formobj })
                    }}
                    
                    className="form-control" id="CompanyCode" />
                  </div>

                  <div className="col-4 my-auto px-0">
                    <label htmlFor="CompanyCode" className="form-label">Email</label>
                  </div>
                  <div className="col-8">
                    <input type="text"
                    
                    value={formobj.OtherInfo.Email}

                    onChange={(e) => {
                      formobj.OtherInfo.Email = e.target.value
                      setformobj({ ...formobj })
                    }}
                    
                    className="form-control" id="CompanyCode" />
                  </div>

                  <div className="col-4 my-auto px-0">
                    <label htmlFor="CompanyCode" className="form-label">CC to (if any)</label>
                  </div>
                  <div className="col-8">
                    <input type="text"
                    
                    value={formobj.OtherInfo.CCTo}

                    onChange={(e) => {
                      formobj.OtherInfo.CCTo = e.target.value
                      setformobj({ ...formobj })
                    }}
                    
                    className="form-control" id="CompanyCode" />
                  </div>

                  <div className="col-4 my-auto px-0">
                    <label htmlFor="CompanyCode" className="form-label">Mobile No.</label>
                  </div>
                  <div className="col-8">
                    <input type="text"
                    
                    value={formobj.OtherInfo.MobileNo}

                    onChange={(e) => {
                      formobj.OtherInfo.MobileNo = e.target.value
                      setformobj({ ...formobj })
                    }}
                    
                    className="form-control" id="CompanyCode" />
                  </div>

                  <div className="col-4 my-auto px-0">
                    <label htmlFor="CompanyCode" className="form-label">Phone No.</label>
                  </div>
                  <div className="col-8">
                    <input type="text"
                    
                    value={formobj.OtherInfo.PhoneNo}

                    onChange={(e) => {
                      formobj.OtherInfo.PhoneNo = e.target.value
                      setformobj({ ...formobj })
                    }}
                    
                    className="form-control" id="CompanyCode" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </form>

      </Modal>
      <div className="companies-page">
        <div className="companies-header">
          <h2>Courier</h2>
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
            Showing 1 to {filteredCourier.length} of {filteredCourier.length}{" "}
            entries
            {filteredCourier.length !== CourierData.length && (
              <span className="filtered-text">
                {" "}
                (filtered from {CourierData.length} total entries)
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
                  Mailing Name
                </th>
                <th>
                  Address
                </th>
                <th>
                  Phone
                </th>
                <th>
                  Mobile No.
                </th>
                <th>
                  Email
                </th>
                <th>
                  State
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
              {filteredCourier.map((Courier) => (
                <tr>
                  <td>{Courier.Name}</td>
                  <td>{Courier.MailingName}</td>
                  <td>{Courier.MailingInfo.Address}</td>
                  <td>{Courier.OtherInfo.PhoneNo}</td>
                  <td>{Courier.OtherInfo.MobileNo}</td>
                  <td>{Courier.OtherInfo.Email}</td>
                  <td>{Courier.MailingInfo.State}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default Courier;
