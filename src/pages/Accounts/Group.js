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
const Group = () => {
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
      "Use_For": "",
      "Employee_Group": "",
      "CC_Group": "",
      "Group_Behaves": "",
      "Net_Debit": "",
      "Use_For_Calculation": "",
      "MethodTo_Allocate": "",
      "Set_Alter": "",
  })

  // Handle search filter changes
  const handleSearchChange = (field, value) => {
    setSearchFilters((prev) => ({
      ...prev,
      [field]: value,
    }));
  };
  const [GroupData, setGroupData] = useState([])
  
  // Filter companies based on search criteria
  const filteredGroup = GroupData
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
    const res = await fetch(BASE_URL + "get_master/group"); // response object
    const data = await res.json(); // JSON body
    setGroupData(data?.data || []); // safely update state
  } catch (err) {
    console.error("Error fetching group:", err);
  }
}

  async function addupdate() {
    let payload = {
      tablename: "group",
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
          <div style={{ fontSize: 20 }}>Create Group</div>
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
                    <option>Capital Account</option>
                  </select>
                </div>

                <div className="col-7 my-auto">
                  <label htmlFor="Country" className="form-label">Use For</label>
                </div>
                <div className="col-5 my-1">
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

                <div className="col-7 my-auto">
                  <label htmlFor="Country" className="form-label">Use as Employee Group</label>
                </div>
                <div className="col-5 my-1">
                  <select id="Country" className="form-select w-100"
                  
                  value={formobj.Employee_Group}

                    onChange={(e) => {
                      formobj.Employee_Group = e.target.value
                      setformobj({ ...formobj })
                    }}
                  
                  >
                    <option>No</option>
                    <option>Yes</option>
                  </select>
                </div>

                <div className="col-7 my-auto">
                  <label htmlFor="Country" className="form-label">CC Group</label>
                </div>
                <div className="col-5 my-1">
                  <select id="Country" className="form-select w-100"
                  
                  value={formobj.CC_Group}

                    onChange={(e) => {
                      formobj.CC_Group = e.target.value
                      setformobj({ ...formobj })
                    }}
                  
                  >
                    <option>Not Applicable</option>
                  </select>
                </div>

                <div className="col-7 my-auto">
                  <label htmlFor="Country" className="form-label">Group behaves like a sub-ledger</label>
                </div>
                <div className="col-5 my-1">
                  <select id="Country" className="form-select w-100"
                  
                  value={formobj.Group_Behaves}

                    onChange={(e) => {
                      formobj.Group_Behaves = e.target.value
                      setformobj({ ...formobj })
                    }}
                  
                  >
                    <option>No</option>
                    <option>Yes</option>
                  </select>
                </div>

                <div className="col-7 my-auto">
                  <label htmlFor="Country" className="form-label">Net Debit / Credit Balance for Reporting</label>
                </div>
                <div className="col-5 my-1">
                  <select id="Country" className="form-select w-100"
                  
                  value={formobj.Net_Debit}

                    onChange={(e) => {
                      formobj.Net_Debit = e.target.value
                      setformobj({ ...formobj })
                    }}
                  
                  >
                    <option>No</option>
                    <option>Yes</option>
                  </select>
                </div>

                <div className="col-7 my-auto">
                  <label htmlFor="Country" className="form-label">Used for calculation (Taxes,Discounts)</label>
                </div>
                <div className="col-5 my-1">
                  <select id="Country" className="form-select w-100"
                  
                  value={formobj.Use_For_Calculation}

                    onChange={(e) => {
                      formobj.Use_For_Calculation = e.target.value
                      setformobj({ ...formobj })
                    }}
                  
                  >
                    <option>No</option>
                    <option>Yes</option>
                  </select>
                </div>

                <div className="col-7 my-auto">
                  <label htmlFor="Country" className="form-label">Method to allocate when used in purchase invoice</label>
                </div>
                <div className="col-5 my-1">
                  <select id="Country" className="form-select w-100">
                    <option>Not Applicable</option>
                  </select>
                </div>

                <div className="col-7 my-auto">
                  <label htmlFor="Country" className="form-label">Set / Alter TDS details</label>
                </div>
                <div className="col-5 my-1">
                  <select id="Country" className="form-select w-100"
                  
                  value={formobj.Set_Alter}

                    onChange={(e) => {
                      formobj.Set_Alter = e.target.value
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
          <h2>Group</h2>
          <button onClick={openModal} className="btn btn-primary new-btn">Create Group</button>
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
            Showing 1 to {filteredGroup.length} of {filteredGroup.length}{" "}
            entries
            {filteredGroup.length !== GroupData.length && (
              <span className="filtered-text">
                {" "}
                (filtered from {GroupData.length} total entries)
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
                  Use For
                </th>
                <th>
                  Use As Employee
                </th>
                <th>
                  CC Group
                </th>
                <th>
                  Group Behaves
                </th>
                <th>
                  Net Debit / Credit
                </th>
                <th>
                  Used for calculation
                </th>
                <th>
                  Set / Alter TDS details
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
              {filteredGroup.map((Group) => (
                <tr>
                  <td>{Group.Name}</td>
                  <td>{Group.Under}</td>
                  <td>{Group.Use_For}</td>
                  <td>{Group.Employee_Group}</td>
                  <td>{Group.CC_Group}</td>
                  <td>{Group.Group_Behaves}</td>
                  <td>{Group.Net_Debit}</td>
                  <td>{Group.Use_For_Calculation}</td>
                  <td>{Group.Set_Alter}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default Group;
