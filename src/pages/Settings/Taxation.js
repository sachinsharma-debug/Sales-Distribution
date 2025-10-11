import React, { useState } from 'react';
import Modal from 'react-modal';

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: '50%',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
  },
};

export default function Taxation() {
  const [modalGSTOpen, setModalGSTOpen] = useState(false);
  const [modalTDSOpen, setModalTDSOpen] = useState(false);
  const [modalTCSOpen, setModalTCSOpen] = useState(false);
  const [modalResponsibleOpen, setModalResponsibleOpen] = useState(false);

  // GST Modal handlers
  const openGSTModal = () => setModalGSTOpen(true);
  const closeGSTModal = () => setModalGSTOpen(false);
  const handleGSTChange = (e) => {
    if (e.target.value === 'Yes') openGSTModal();
  };

  // TDS Modal handlers
  const openTDSModal = () => setModalTDSOpen(true);
  const closeTDSModal = () => setModalTDSOpen(false);
  const handleTDSChange = (e) => {
    if (e.target.value === 'Yes') openTDSModal();
  };

    // TCS Modal handlers
  const openTCSModal = () => setModalTCSOpen(true);
  const closeTCSModal = () => setModalTCSOpen(false);
  const handleTCSChange = (e) => {
    if (e.target.value === 'Yes') openTCSModal();
  };

  // Responsible Person Modal handlers
  const openResponsibleModal = () => setModalResponsibleOpen(true);
  const closeResponsibleModal = () => setModalResponsibleOpen(false);
  const handleResponsibleChange = (e) => {
    if (e.target.value === 'Yes') openResponsibleModal();
  };

  return (
    <>
      {/* GST Modal */}
      <Modal
        isOpen={modalGSTOpen}
        onRequestClose={closeGSTModal}
        style={{customStyles}}
        contentLabel="GST Modal"
        ariaHideApp={false}
      >
        <div className="d-flex justify-content-between pb-2" style={{ borderBottom: '1px solid #eee' }}>
          <div style={{ fontSize: 20 }}>GST Details</div>
          <button type="button" className="btn btn-primary">Save</button>
        </div>

        <form className="mt-2 branch-form" style={{ maxHeight: '500px' }}>
          <div className="row">
            <div className="col-8">
              <div className="mt-3 row">
                <div className="col-6 my-auto"><label className="form-label">State</label></div>
                <div className="col-6 my-1"><select className="form-select w-100"><option>Uttar Pradesh</option></select></div>

                <div className="col-6 my-auto"><label className="form-label">Registration type</label></div>
                <div className="col-6"><select className="form-select w-100"><option>Regular</option></select></div>

                <div className="col-6 my-auto"><label className="form-label">Assessee of Other Territory</label></div>
                <div className="col-6"><select className="form-select w-100"><option>No</option></select></div>

                <div className="col-6 my-auto"><label className="form-label">GSTIN / UIN</label></div>
                <div className="col-6"><input type="text" className="form-control" /></div>

                <div className="col-6 my-auto"><label className="form-label">Periodicity of GSTR-1</label></div>
                <div className="col-6"><select className="form-select w-100"><option>Monthly</option></select></div>
              </div>
            </div>
          </div>
        </form>
      </Modal>

      {/* TDS Modal */}
      <Modal
        isOpen={modalTDSOpen}
        onRequestClose={closeTDSModal}
        style={{customStyles}}
        contentLabel="TDS Modal"
        ariaHideApp={false}
      >
        <div className="d-flex justify-content-between pb-2" style={{ borderBottom: '1px solid #eee' }}>
          <div style={{ fontSize: 20 }}>Company TDS Deductor Details</div>
          <button type="button" className="btn btn-primary">Save</button>
        </div>

        <form className="mt-2 branch-form">
          <div className="row">
            <div className="col-8">
              <div className="row mt-3">
                <div className="col-6 my-auto"><label className="form-label">TAN Registration Number</label></div>
                <div className="col-6"><input type="text" className="form-control" placeholder="Enter TAN number" /></div>

                <div className="col-6 my-auto"><label className="form-label">Tax Deduction and Collection Account Number (TAN)</label></div>
                <div className="col-6"><input type="text" className="form-control" placeholder="Enter TAN number" /></div>

                <div className="col-6 my-auto"><label className="form-label">Deductor Type</label></div>
                <div className="col-6">
                  <select className="form-select">
                    <option>Company</option>
                    <option>Individual/HUF</option>
                  </select>
                </div>

                <div className="col-6 my-auto"><label className="form-label">Deductor Branch / Division</label></div>
                <div className="col-6"><input type="text" className="form-control" placeholder="Enter branch/division" /></div>

                <div className="col-6 my-auto">
                  <label className="form-label">Set/Alter details of person responsible</label>
                </div>
                <div className="col-6">
                  <select className="form-select" onChange={handleResponsibleChange}>
                    <option>No</option>
                    <option>Yes</option>
                  </select>
                </div>

                
              </div>
            </div>
          </div>
        </form>
      </Modal>

      {/* TDS Modal */}
      <Modal
        isOpen={modalTCSOpen}
        onRequestClose={closeTCSModal}
        style={{customStyles}}
        contentLabel="TCS Modal"
        ariaHideApp={false}
      >
        <div className="d-flex justify-content-between pb-2" style={{ borderBottom: '1px solid #eee' }}>
          <div style={{ fontSize: 20 }}>Company TCS Collector Details</div>
          <button type="button" className="btn btn-primary">Save</button>
        </div>

        <form className="mt-2 branch-form">
          <div className="row">
            <div className="col-8">
              <div className="row mt-3">
                <div className="col-6 my-auto"><label className="form-label">TAN Registration Number</label></div>
                <div className="col-6"><input type="text" className="form-control" placeholder="Enter TAN number" /></div>

                <div className="col-6 my-auto"><label className="form-label">Tax Deduction and Collection Account Number (TAN)</label></div>
                <div className="col-6"><input type="text" className="form-control" placeholder="Enter TAN number" /></div>

                <div className="col-6 my-auto"><label className="form-label">Deductor Type</label></div>
                <div className="col-6">
                  <select className="form-select">
                    <option>Company</option>
                    <option>Individual/HUF</option>
                  </select>
                </div>

                <div className="col-6 my-auto"><label className="form-label">Deductor Branch / Division</label></div>
                <div className="col-6"><input type="text" className="form-control" placeholder="Enter branch/division" /></div>

                <div className="col-6 my-auto">
                  <label className="form-label">Set/Alter details of person responsible</label>
                </div>
                <div className="col-6">
                  <select className="form-select" onChange={handleResponsibleChange}>
                    <option>No</option>
                    <option>Yes</option>
                  </select>
                </div>

                
              </div>
            </div>
          </div>
        </form>
      </Modal>

      {/* Responsible Person Modal */}
      <Modal
        isOpen={modalResponsibleOpen}
        onRequestClose={closeResponsibleModal}
        style={{customStyles}}
        contentLabel="Responsible Person Modal"
        ariaHideApp={false}
      >
        <div className="d-flex justify-content-between pb-2" style={{ borderBottom: '1px solid #eee' }}>
          <div style={{ fontSize: 20 }}>Responsible Person Details</div>
          <button type="button" className="btn btn-primary">Save</button>
        </div>

        <form className="row mt-2 branch-form">
            <div className='col-6'>
                <div className="row mt-3">
                    <div className="col-4 my-auto"><label className="form-label">Name</label></div>
                    <div className="col-8"><input type="text" className="form-control" placeholder="Enter name" /></div>

                    <div className="col-4 my-auto"><label className="form-label">Son/Daughter of</label></div>
                    <div className="col-8"><input type="text" className="form-control" placeholder="Enter designation" /></div>

                    <div className="col-4 my-auto"><label className="form-label">Designation</label></div>
                    <div className="col-8"><input type="text" className="form-control" placeholder="Enter designation" /></div>

                    <div className="col-4 my-auto"><label className="form-label">PAN</label></div>
                    <div className="col-8"><input type="text" className="form-control" placeholder="Enter PAN" /></div>

                    <div className="col-4 my-auto"><label className="form-label">Flat Number</label></div>
                    <div className="col-8"><input type="text" className="form-control" placeholder="Enter flat number" /></div>

                    <div className="col-4 my-auto"><label className="form-label">Name of the premises/building</label></div>
                    <div className="col-8"><input type="text" className="form-control" /></div>

                    <div className="col-4 my-auto"><label className="form-label">Road/Street/Lane</label></div>
                    <div className="col-8"><input type="text" className="form-control" /></div>

                    <div className="col-4 my-auto"><label className="form-label">Area/Location</label></div>
                    <div className="col-8"><input type="text" className="form-control" /></div>

                </div>
            </div>
          <div className='col-6 mt-3'>
            <div className='row'>
                <div className="col-4 my-auto"><label className="form-label">Town/City/District</label></div>
                <div className="col-8"><input type="text" className="form-control" /></div>

                <div className="col-4 my-auto">
                    <label className="form-label">State</label>
                </div>
                <div className="col-8">
                    <select className="form-select">
                    <option>Uttar Pradesh</option>
                    <option>Yes</option>
                    </select>
                </div>

                <div className="col-4 my-auto"><label className="form-label">Pincode</label></div>
                <div className="col-8"><input type="text" className="form-control" /></div>

                <div className="col-4 my-auto"><label className="form-label">Mobile Number</label></div>
                <div className="col-8"><input type="text" className="form-control" placeholder="Enter mobile" /></div>

                <div className="col-4 my-auto"><label className="form-label">STD Code</label></div>
                <div className="col-8"><input type="text" className="form-control" /></div>

                <div className="col-4 my-auto"><label className="form-label">Telephone</label></div>
                <div className="col-8"><input type="text" className="form-control" placeholder="Enter telephone" /></div>

                <div className="col-4 my-auto"><label className="form-label">Email</label></div>
                <div className="col-8"><input type="email" className="form-control" placeholder="Enter email" /></div>
            </div>
          </div>
        </form>
      </Modal>

      {/* Main Content */}
      <div className="settings-content">
        <div className="heading">Taxation</div>
        <div className="row">
          <div className="col-8">
            <div className="row mt-3">
              <div className="col-4 my-auto">
                <label htmlFor="gstSelect" className="form-label">Goods and Services Tax (GST)</label>
              </div>
              <div className="col-2">
                <select id="gstSelect" className="form-select w-100" onChange={handleGSTChange}>
                  <option value="No">No</option>
                  <option value="Yes">Yes</option>
                </select>
              </div>
            </div>

            <div className="row mt-3">
              <div className="col-4 my-auto">
                <label htmlFor="tdsSelect" className="form-label">Tax Deducted at Source (TDS)</label>
              </div>
              <div className="col-2">
                <select id="tdsSelect" className="form-select w-100" onChange={handleTDSChange}>
                  <option value="No">No</option>
                  <option value="Yes">Yes</option>
                </select>
              </div>
            </div>

            <div className="row mt-3">
              <div className="col-4 my-auto">
                <label htmlFor="tdsSelect" className="form-label">Tax Collected at Source (TCS)</label>
              </div>
              <div className="col-2">
                <select id="tdsSelect" className="form-select w-100" onChange={handleTCSChange}>
                  <option value="No">No</option>
                  <option value="Yes">Yes</option>
                </select>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
