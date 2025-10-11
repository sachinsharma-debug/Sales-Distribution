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

const SalesQuotation = () => {
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

  const [SalesQuotationData, setSalesQuotationData] = useState([])



  async function getmethod() {
    try {
      const res = await fetch(BASE_URL + "get_master/sales-Quotation"); // response object
      const data = await res.json(); // JSON body
      setSalesQuotationData(data?.data || []); // safely update state
    } catch (err) {
      console.error("Error fetching sales Quotation:", err);
    }
  }

  async function addupdate() {
    let payload = {
      tablename: "sales-Quotation",
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
  const filteredSalesQuotation = SalesQuotationData

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
          <div style={{ fontSize: 20 }}>Create Sales Quotation</div>
          <div className="my-auto">
            <button type="submit" className="btn btn-primary"

              onClick={() => {
                addupdate()
                // closeModal()
              }}

            >Add</button>
          </div>
        </div>
        <div className="company-form">
            <div className="row mt-3">
                    <div className='col-4'>
                        <div className='row'>
                            <div className='col-5 my-auto'>
                                <label htmlFor="CompanyCode" className="form-label">Reference No.</label>
                            </div>
                            <div className='col-7'>
                                <input type="text" className="form-control" id="CompanyCode" />
                            </div>

                            <div className='col-5 '>
                                <div className='my-auto'>
                                    <label htmlFor="CompanyCode" className="form-label">Enquiry No.</label>
                                </div>
                            </div>
                            <div className='col-7 '>
                                <input type="text" className="form-control" id="CompanyCode" />
                            </div>

                            <div className='col-5 '>
                                <div className='my-auto'>
                                    <label htmlFor="CompanyCode" className="form-label">Last Quotation No.</label>
                                </div>
                            </div>
                            <div className='col-7 '>
                                <input type="text" className="form-control" id="CompanyCode" />
                            </div>
                        </div>
                    </div>

                    <div className='col-4'>
                        <div className='row'>
                            <div className='col-5 my-auto'>
                                <label htmlFor="CompanyCode" className="form-label">Part Name</label>
                            </div>
                            <div className='col-7'>
                                <input type="text" className="form-control" id="CompanyCode" />
                            </div>

                            <div className='col-5 '>
                                <div className='my-auto'>
                                    <label htmlFor="CompanyCode" className="form-label">Last Quotation Date</label>
                                </div>
                            </div>
                            <div className='col-7 '>
                                <input type="text" className="form-control" id="CompanyCode" />
                            </div>

                            <div className='col-5 '>
                                <div className='my-auto'>
                                    <label htmlFor="CompanyCode" className="form-label">Quote Type</label>
                                </div>
                            </div>
                            <div className='col-7 '>
                                <input type="text" className="form-control" id="CompanyCode" />
                            </div>
                        </div>
                    </div>

                    <div className='col-4'>
                        <div className='row'>
                            <div className='col-5 my-auto'>
                                <label htmlFor="CompanyCode" className="form-label">Valid Until Days</label>
                            </div>
                            <div className='col-7'>
                                <input type="text" className="form-control" id="CompanyCode" />
                            </div>

                            <div className='col-5 '>
                                <div className='my-auto'>
                                    <label htmlFor="CompanyCode" className="form-label">Quote Stage</label>
                                </div>
                            </div>
                            <div className='col-7 '>
                                <input type="text" className="form-control" id="CompanyCode" />
                            </div>

                            <div className='col-5 '>
                                <div className='my-auto'>
                                    <label htmlFor="CompanyCode" className="form-label">Valid Until</label>
                                </div>
                            </div>
                            <div className='col-7 '>
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
                                    <th>Item Name</th>
                                    <th>Qty</th>
                                    <th>Rate</th>
                                    <th>Disc %</th>
                                    <th>Sub Total</th>
                                    <th>Tax %</th>
                                    <th>Tax Amount</th>
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
                                    <td>ahhss</td>
                                    <td>ahhss</td>
                                    <td>ahhss</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <div className='col-6 mt-5'>
                        <div className='row'>
                            <div className='col-2'>
                                <label htmlFor="CompanyCode" className="form-label">Narration</label>
                            </div>
                            <div className='col-5'>
                                <input type="text" className="form-control" />
                            </div>
                        </div>
                    </div>
                </div>
        </div>

      </Modal>
      <div className="branches-page">
        <div className="branches-header">
          <h2>Sales Quotation</h2>
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
            Showing 1 to {filteredSalesQuotation.length} of {filteredSalesQuotation.length}{" "}
            entries
            {filteredSalesQuotation.length !== SalesQuotationData.length && (
              <span className="filtered-text">
                {" "}
                (filtered from {SalesQuotationData.length} total entries)
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
              {filteredSalesQuotation.map((branch) => (
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

export default SalesQuotation;
