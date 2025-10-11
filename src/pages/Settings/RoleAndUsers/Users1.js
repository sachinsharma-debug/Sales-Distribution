import React, { useState,useEffect } from "react";
import "../Company/Company.css";
import ReactDOM from 'react-dom';
import Modal from 'react-modal';
import { BASE_URL } from "../../../api/common";


const CustomStyles  = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
  },
};
const Users1 = () => {
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

  const [formobj, setformobj] = useState(
      {
        "MasterID": "",
        "AlterID": "",
        "UserName": "",
        "MailingName": "",
        "Address": "",
        "District": "",
        "State": "",
        "Pincode": "",
        "Telephone": "",
        "Mobile": "",
        "Fax": "",
        "Email": ""
      }
    )
    useEffect(() => {
      getmethod()
    }, [])

  // Handle search filter changes
  const handleSearchChange = (field, value) => {
    setSearchFilters((prev) => ({
      ...prev,
      [field]: value,
    }));
  };
  // Sample companies data
  const [UserData, setUserData] = useState([])

  async function getmethod() {
    try {
      const res = await fetch(BASE_URL + "get_master/user"); // response object
      const data = await res.json(); // JSON body
      setUserData(data?.data || []); // safely update state
    } catch (err) {
      console.error("Error fetching store:", err);
    }
  }

  async function addupdate() {
    let payload = {
      tablename: "user",
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

  // Filter companies based on search criteria
  const filteredUser = UserData

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
      style={CustomStyles}
      contentLabel="Example Modal"
      className="my-modal"
    >
      {/* <div className="text-center" style={{fontSize:24}}>Add Users</div> */}
          <div className="d-flex justify-content-between pb-2" style={{borderBottom: '1px solid #eee'}}>
            <div style={{fontSize:20}}>Add Users</div>
            <div className="my-auto">
              <button type="submit"
              
              onClick={() => {
                addupdate()
              }}
              
              className="btn btn-primary">Add</button>
            </div>
          </div>
          <form className="mt-2 branch-form" style={{maxHeight: '500px'}}>
            <div className="row">
              <div className="col-12">
                <div className="mt-3 row">
                  <div className="col-4 my-auto">
                    <label htmlFor="MasterID" className="form-label">Master ID</label>
                  </div>
                  <div className="col-8">
                    <input type="text"
                    
                    value={formobj.MasterID}

                    onChange={(e) => {
                      formobj.MasterID = e.target.value
                      setformobj({ ...formobj })
                    }}
                    
                    className="form-control" id="MasterID" />
                  </div>
                  <div className="col-4 my-auto">
                    <label htmlFor="AlterID" className="form-label">Alter ID</label>
                  </div>
                  <div className="col-8">
                    <input type="text"
                    
                    value={formobj.AlterID}

                    onChange={(e) => {
                      formobj.AlterID = e.target.value
                      setformobj({ ...formobj })
                    }}
                    
                    className="form-control" id="AlterID" />
                  </div>

                  <div className="col-4 my-auto">
                    <label htmlFor="Company" className="form-label">User Name</label>
                  </div>
                  <div className="col-8">
                    <input type="text"
                    
                    value={formobj.UserName}

                    onChange={(e) => {
                      formobj.UserName = e.target.value
                      setformobj({ ...formobj })
                    }}
                    
                    className="form-control" id="Company" />
                  </div>

                  <div className="col-4 my-auto">
                    <label htmlFor="Mailing Name" className="form-label">Mailing Name</label>
                  </div>
                  <div className="col-8">
                    <input type="text"
                    
                    value={formobj.MailingName}

                    onChange={(e) => {
                      formobj.MailingName = e.target.value
                      setformobj({ ...formobj })
                    }}
                    
                    className="form-control" id="Mailing Name"/>
                  </div>

                  <div className="col-4 my-auto">
                    <label className="form-label" for="Address">Address</label>
                  </div>
                  <div className="col-8">
                    <textarea 
                    
                    value={formobj.Address}

                    onChange={(e) => {
                      formobj.Address = e.target.value
                      setformobj({ ...formobj })
                    }}
                    
                    className="form-control w-100" id="Address" />
                  </div>

                  <div className="col-4 my-auto">
                  <label htmlFor="State" className="form-label">State</label>
                </div>
                <div className="col-8 my-1">
                  <select

                    value={formobj.State}
                    onChange={(e) => {
                      formobj.State = e.target.value
                      setformobj({ ...formobj })

                    }}

                    id="State" className="form-select w-100">
                    <option>Disabled select</option>
                  </select>
                </div>

                <div className="col-4 my-auto">
                  <label htmlFor="Country" className="form-label">City / District</label>
                </div>
                <div className="col-8">
                  <select

                    value={formobj.District}
                    onChange={(e) => {
                      formobj.District = e.target.value
                      setformobj({ ...formobj })

                    }}

                    id="Country" className="form-select w-100">
                    <option>Disabled select</option>
                  </select>
                </div>

                  <div className="col-4 my-auto">
                    <label htmlFor="Pincode" className="form-label">Pincode</label>
                  </div>
                  <div className="col-8">
                    <input type="text"
                    
                    value={formobj.Pincode}

                    onChange={(e) => {
                      formobj.Pincode = e.target.value
                      setformobj({ ...formobj })
                    }}
                    
                    className="form-control" id="Pincode" />
                  </div>

                  <div className="col-4 my-auto">
                    <label htmlFor="Telephone" className="form-label">Telephone</label>
                  </div>
                  <div className="col-8">
                    <input type="text"
                    
                    value={formobj.Telephone}

                    onChange={(e) => {
                      formobj.Telephone = e.target.value
                      setformobj({ ...formobj })
                    }}
                    
                    className="form-control" id="Telephone"/>
                  </div>

                  <div className="col-4 my-auto">
                    <label htmlFor="Mobile" className="form-label">Mobile</label>
                  </div>
                  <div className="col-8">
                    <input type="text"
                    
                    value={formobj.Mobile}

                    onChange={(e) => {
                      formobj.Mobile = e.target.value
                      setformobj({ ...formobj })
                    }}
                    
                    className="form-control" id="Mobile"/>
                  </div>

                  <div className="col-4 my-auto">
                    <label htmlFor="Fax" className="form-label">Fax</label>
                  </div>
                  <div className="col-8">
                    <input type="text"
                    
                    value={formobj.Fax}

                    onChange={(e) => {
                      formobj.Fax = e.target.value
                      setformobj({ ...formobj })
                    }}
                    
                    className="form-control" id="Fax"/>
                  </div>

                  <div className="col-4 my-auto">
                    <label htmlFor="Email" className="form-label">Email</label>
                  </div>
                  <div className="col-8">
                    <input type="text"
                    
                    value={formobj.Email}

                    onChange={(e) => {
                      formobj.Email = e.target.value
                      setformobj({ ...formobj })
                    }}
                    
                    className="form-control" id="Email" />
                  </div>
                </div>
              </div>
            </div>
          </form>
    </Modal>
    <div className="companies-page">
      <div className="companies-header">
        <h2>Users</h2>
        <button onClick={openModal} className="btn btn-primary new-btn">Add Users</button>
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
          Showing 1 to {filteredUser.length} of {filteredUser.length}{" "}
          entries
          {filteredUser.length !== UserData.length && (
            <span className="filtered-text">
              {" "}
              (filtered from {UserData.length} total entries)
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
                  User Name
                </th>
                <th>
                  Mailing Name<span className="sort-icon">⇅</span>
                </th>
                <th>
                  State
                </th>
                <th>
                  City
                </th>
                <th>
                  Mobile
                </th>
                <th>
                  Email
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
              </tr>
            </thead>
            <tbody>
              {filteredUser.map((User) => (
                <tr>
                  <td>{User.UserName}</td>
                  <td>{User.MailingName}</td>
                  <td>{User.State}</td>
                  <td>{User.District}</td>
                  <td>{User.Mobile}</td>
                  <td>{User.Email}</td>
                </tr>
              ))}
            </tbody>
          </table>
      </div>
    </div>
    </>
  );
};

export default Users1;
