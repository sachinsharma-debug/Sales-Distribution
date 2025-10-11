import React, { useState, useEffect } from "react";
import "./Branches.css";
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

const SalesEnquiry = () => {
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
      "BranchName": "",
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
  // Sample branches data

  const [SalesEnquiryData, setSalesEnquiryData] = useState([])



  async function getmethod() {
    try {
      const res = await fetch(BASE_URL + "get_master/sales-enquiry"); // response object
      const data = await res.json(); // JSON body
      setSalesEnquiryData(data?.data || []); // safely update state
    } catch (err) {
      console.error("Error fetching sales enquiry:", err);
    }
  }

  async function addupdate() {
    let payload = {
      tablename: "sales-enquiry",
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
  const filteredSalesEnquiry = SalesEnquiryData

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
        // style={{width:'800px'}}
        // className="my-modal"
      // contentLabel="Example Modal "
      >
        <div className="d-flex justify-content-between pb-2" style={{ borderBottom: '1px solid #eee' }}>
          <div style={{ fontSize: 20 }}>Create Sales Enquiry</div>
          <div className="my-auto">
            <button type="submit" className="btn btn-primary"

              onClick={() => {
                addupdate()
                // closeModal()
              }}

            >Add</button>
          </div>
        </div>
        <div className="row mt-3 company-form">
            <div className='col-4'>
                <div className='row'>
                    <div className='col-4 my-auto'>

                        <label htmlFor="CompanyCode" className="form-label">Enquiry Type</label>

                    </div>
                    <div className='col-8'>
                        <input type="text" className="form-control" id="CompanyCode" />
                    </div>

                    <div className='col-4 '>
                        <div className='my-auto'>
                            <label htmlFor="CompanyCode" className="form-label">Person</label>
                        </div>
                    </div>
                    <div className='col-8 '>
                        <input type="text" className="form-control" id="CompanyCode" />
                    </div>

                    <div className='col-4 '>
                        <div className='my-auto'>
                            <label htmlFor="CompanyCode" className="form-label">Email</label>
                        </div>
                    </div>
                    <div className='col-8 '>
                        <input type="text" className="form-control" id="CompanyCode" />
                    </div>

                    <div className='col-4 '>
                        <div className='my-auto'>
                            <label htmlFor="CompanyCode" className="form-label">Campaing</label>
                        </div>
                    </div>
                    <div className='col-8 '>
                        <input type="text" className="form-control" id="CompanyCode" />
                    </div>

                    <div className='col-4 '>
                        <div className='my-auto'>
                            <label htmlFor="CompanyCode" className="form-label">References</label>
                        </div>
                    </div>
                    <div className='col-8 '>
                        <input type="text" className="form-control" id="CompanyCode" />
                    </div>
                </div>
            </div>

            <div className='col-4'>
                <div className='row'>
                    <div className='col-4 my-auto'>
                        <label htmlFor="CompanyCode" className="form-label">Partner</label>
                    </div>
                    <div className='col-8'>
                        <input type="text" className="form-control" id="CompanyCode" />
                    </div>

                    <div className='col-4 '>
                        <div className='my-auto'>
                            <label htmlFor="CompanyCode" className="form-label">Department</label>
                        </div>
                    </div>
                    <div className='col-8 '>
                        <input type="text" className="form-control" id="CompanyCode" />
                    </div>

                    <div className='col-4 '>
                        <div className='my-auto'>
                            <label htmlFor="CompanyCode" className="form-label">Mobile</label>
                        </div>
                    </div>
                    <div className='col-8 '>
                        <input type="text" className="form-control" id="CompanyCode" />
                    </div>

                    <div className='col-4 '>
                        <div className='my-auto'>
                            <label htmlFor="CompanyCode" className="form-label">Enq Source</label>
                        </div>
                    </div>
                    <div className='col-8 '>
                        <input type="text" className="form-control" id="CompanyCode" />
                    </div>
                </div>
            </div>

            <div className='col-4'>
                <div className='row'>
                    <div className='col-4 my-auto'>
                        <label htmlFor="CompanyCode" className="form-label">Amounts</label>
                    </div>
                    <div className='col-8'>
                        <input type="text" className="form-control" id="CompanyCode" />
                    </div>

                    <div className='col-4 '>
                        <div className='my-auto'>
                            <label htmlFor="CompanyCode" className="form-label">Designation</label>
                        </div>
                    </div>
                    <div className='col-8 '>
                        <input type="text" className="form-control" id="CompanyCode" />
                    </div>

                    <div className='col-4 '>
                        <div className='my-auto'>
                            <label htmlFor="CompanyCode" className="form-label">Phone</label>
                        </div>
                    </div>
                    <div className='col-8 '>
                        <input type="text" className="form-control" id="CompanyCode" />
                    </div>

                    <div className='col-4 '>
                        <div className='my-auto'>
                            <label htmlFor="CompanyCode" className="form-label">Priority</label>
                        </div>
                    </div>
                    <div className='col-8 '>
                        <input type="text" className="form-control" id="CompanyCode" />
                    </div>
                </div>
            </div>
        </div>
        <div className='row'>
            <div className='col-12'>
                <table className="companies-table">
                    <thead>
                        <tr>
                            <th>Product Name</th>
                            <th>Qty</th>
                            <th>Unit</th>
                            <th>Rate</th>
                            <th>Amount</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>ahhss</td>
                            <td>ahhss</td>
                            <td>ahhss</td>
                            <td>ahhss</td>
                            <td>ahhss</td>
                        </tr>
                        <tr>
                            <td>ahhss</td>
                            <td>ahhss</td>
                            <td>ahhss</td>
                            <td>ahhss</td>
                            <td>ahhss</td>
                        </tr>
                        <tr>
                            <td>ahhss</td>
                            <td>ahhss</td>
                            <td>ahhss</td>
                            <td>ahhss</td>
                            <td>ahhss</td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div className='col-6 mt-4'>
                <div className=''>
                    <div className='col-3'>
                        <label htmlFor="CompanyCode" className="form-label">Description</label>
                    </div>
                    <div className='col-9'>
                        <textarea type="text" className="form-control"></textarea>
                    </div>
                </div>
            </div>
            <div className='col-12 mt-4'>
                <div className='text-center border-y'>Follow Up</div>
                <div className='row mt-4 company-form'>
                    <div className='col-4'>
                        <div className='row'>
                            <div className='col-5 my-auto'>
                                <label htmlFor="CompanyCode" className="form-label">Follow-Up Type</label>
                            </div>
                            <div className='col-7'>
                                <input type="text" className="form-control" id="CompanyCode" />
                            </div>

                            <div className='col-5 my-auto'>
                                <label htmlFor="CompanyCode" className="form-label">Enquiry Status</label>
                            </div>
                            <div className='col-7'>
                                <input type="text" className="form-control" id="CompanyCode" />
                            </div>

                            
                        </div>
                    </div>
                    <div className='col-4'>
                        <div className='row'>
                            <div className='col-5 my-auto'>
                                <label htmlFor="CompanyCode" className="form-label">Follow-Up Date</label>
                            </div>
                            <div className='col-7'>
                                <input type="text" className="form-control" id="CompanyCode" />
                            </div>

                            <div className='col-5 my-auto'>
                                <label htmlFor="CompanyCode" className="form-label">Executive</label>
                            </div>
                            <div className='col-7'>
                                <input type="text" className="form-control" id="CompanyCode" />
                            </div>
                        </div>
                    </div>
                    <div className='col-4'>
                        <div className='row'>
                            <div className='col-5 my-auto'>
                                <label htmlFor="CompanyCode" className="form-label">Follow-Up Time</label>
                            </div>
                            <div className='col-7'>
                                <input type="text" className="form-control" id="CompanyCode" />
                            </div>

                            <div className='col-5 my-auto'>
                                <label htmlFor="CompanyCode" className="form-label">Executive Date/Time</label>
                            </div>
                            <div className='col-7'>
                                <input type="text" className="form-control" id="CompanyCode" />
                            </div>

                            <div className='col-5 my-auto'>
                                <label htmlFor="CompanyCode" className="form-label">Company Name</label>
                            </div>
                            <div className='col-7'>
                                <input type="text" className="form-control" id="CompanyCode" />
                            </div>
                        </div>
                    </div>

                    <div className='col-8' style={{marginTop:'-30px'}}>
                        <div className='d-flex justify-content-between'>
                            <label htmlFor="CompanyCode" className="form-label my-auto" style={{width:213}}>Reason</label>
                            <input type="text" className="form-control" id="CompanyCode" />
                        </div>
                    </div>

                    <div className='col-12 mt-1'>
                        <div className='d-flex justify-content-between'>
                            <label htmlFor="CompanyCode" className="form-label my-auto" style={{width:193}}>Follow-Up Marks</label>
                            <input type="text" className="form-control" id="CompanyCode" />
                        </div>
                    </div>
                </div>
            </div>
        </div>

      </Modal>
      <div className="branches-page">
        <div className="branches-header">
          <h2>Sales Enquiry</h2>
          <button onClick={openModal} className="btn btn-primary new-btn">Add</button>
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
            Showing 1 to {filteredSalesEnquiry.length} of {filteredSalesEnquiry.length}{" "}
            entries
            {filteredSalesEnquiry.length !== SalesEnquiryData.length && (
              <span className="filtered-text">
                {" "}
                (filtered from {SalesEnquiryData.length} total entries)
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
                  Sales Name
                </th>
                <th>
                  Mailing Name
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
              {filteredSalesEnquiry.map((branch) => (
                <tr>
                  <td>{branch.BranchName}</td>
                  <td>{branch.MailingName}</td>
                  <td>{branch.State}</td>
                  <td>{branch.District}</td>
                  <td>{branch.Mobile}</td>
                  <td>{branch.Email}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default SalesEnquiry;
