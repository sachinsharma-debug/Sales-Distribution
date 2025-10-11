import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Features() {
  const [showSamDialog, setShowSamDialog] = useState(false);
  const [showFixedAssetDialog, setShowFixedAssetDialog] = useState(false);
  const navigate = useNavigate();

  const handleSAMChange = (e) => {
    if (e.target.value === 'Yes') {
      setShowSamDialog(true);
    }
  };

  const handleFixedAssetChange = (e) => {
    if (e.target.value === 'Yes') {
      setShowFixedAssetDialog(true);
    }
  };

  const handleParameterMethodChange = (e) => {
    if (e.target.value === 'Yes') {
      navigate('/ItemMasterCondition');
    }
  };

  const closeSamDialog = () => {
    setShowSamDialog(false);
  };

  const closeFixedAssetDialog = () => {
    setShowFixedAssetDialog(false);
  };

  return (
    <>
      <div className="settings-content">
        <div className="heading">Features</div>
        <div className="row">
          {/* Inventory Management */}
          <div className="col-4">
            <div className="simple-org-container">
              <div className="org-header">Inventory Management</div>
              <div className="org-list mb-3">
                {/* Enable Parameter Method for Stock Item */}
                <div className="d-flex justify-content-between my-2 px-3">
                  <label className="my-auto" style={{ fontSize: 14 }}>
                    Enable Parameter Method for Stock Item
                  </label>
                  <select
                    className="my-input"
                    style={{ width: 70 }}
                    onChange={handleParameterMethodChange}
                  >
                    <option value="No">No</option>
                    <option value="Yes">Yes</option>
                  </select>
                </div>

                {[
                  'Auto Create Batch In Purchase',
                  'Enable Image Management',
                  'Print Party Wise Item Name Print',
                ].map((label, idx) => (
                  <div
                    className={`d-flex justify-content-between ${
                      idx % 2 === 0 ? 'my-2' : ''
                    } px-3`}
                    key={idx}
                  >
                    <label className="my-auto" style={{ fontSize: 14 }}>
                      {label}
                    </label>
                    <select className="my-input" style={{ width: 70 }}>
                      <option value="Yes">Yes</option>
                      <option value="No">No</option>
                    </select>
                  </div>
                ))}
              </div>
            </div>

            <div className="simple-org-container mt-4">
              <div className="org-header">Branch Division Management</div>
              <div className="org-list mb-3">
                <div className="d-flex justify-content-between my-2 px-3">
                  <label className="my-auto" style={{ fontSize: 14 }}>
                    Enable Branch Division Management
                  </label>
                  <select className="my-input" style={{ width: 70 }}>
                    <option value="No">No</option>
                    <option value="Yes">Yes</option>
                  </select>
                </div>

                {['Enable Group Company Customization'].map((label, idx) => (
                  <div
                    className={`d-flex justify-content-between ${
                      idx % 2 === 0 ? 'my-2' : ''
                    } px-3`}
                    key={idx}
                  >
                    <label className="my-auto" style={{ fontSize: 14 }}>
                      {label}
                    </label>
                    <select className="my-input" style={{ width: 70 }}>
                      <option value="Yes">Yes</option>
                      <option value="No">No</option>
                    </select>
                  </div>
                ))}
              </div>
            </div>

            <div className="simple-org-container mt-4">
              <div className="org-header">Accounts Management</div>
              <div className="org-list mb-3">
                <div className="d-flex justify-content-between my-2 px-3">
                  <label className="my-auto" style={{ fontSize: 14 }}>
                    Enable Fixed Assets Management
                  </label>
                  <select
                    className="my-input"
                    style={{ width: 70 }}
                    onChange={handleFixedAssetChange}
                  >
                    <option value="No">No</option>
                    <option value="Yes">Yes</option>
                  </select>
                </div>

                {['Enable Auto TDS'].map((label, idx) => (
                  <div
                    className={`d-flex justify-content-between ${
                      idx % 2 === 0 ? 'my-2' : ''
                    } px-3`}
                    key={idx}
                  >
                    <label className="my-auto" style={{ fontSize: 14 }}>
                      {label}
                    </label>
                    <select className="my-input" style={{ width: 70 }}>
                      <option value="Yes">Yes</option>
                      <option value="No">No</option>
                    </select>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sales Management */}
          <div className="col-4">
            <div className="simple-org-container">
              <div className="org-header">Sales Management</div>
              <div className="org-list mb-3">
                <div className="d-flex justify-content-between my-2 px-3">
                  <label className="my-auto" style={{ fontSize: 14 }}>
                    Enable SAM
                  </label>
                  <select
                    className="my-input"
                    style={{ width: 70 }}
                    onChange={handleSAMChange}
                  >
                    <option value="No">No</option>
                    <option value="Yes">Yes</option>
                  </select>
                </div>

                {[
                  'Enable Sales Enquiry',
                  'Enable Sales Quotation',
                  'Enable Sales Confirmation',
                  'Enable Sample Out Management',
                ].map((label, idx) => (
                  <div
                    className={`d-flex justify-content-between ${
                      idx % 2 === 0 ? 'my-2' : ''
                    } px-3`}
                    key={idx}
                  >
                    <label className="my-auto" style={{ fontSize: 14 }}>
                      {label}
                    </label>
                    <select className="my-input" style={{ width: 70 }}>
                      <option value="Yes">Yes</option>
                      <option value="No">No</option>
                    </select>
                  </div>
                ))}
              </div>
            </div>

            <div className="simple-org-container mt-4">
              <div className="org-header">Scheme & Loyalty Management</div>
              <div className="org-list mb-3">
                <div className="d-flex justify-content-between my-2 px-3">
                  <label className="my-auto" style={{ fontSize: 14 }}>
                    Enable Party Wise Discount
                  </label>
                  <select className="my-input" style={{ width: 70 }}>
                    <option value="No">No</option>
                    <option value="Yes">Yes</option>
                  </select>
                </div>
              </div>
            </div>
          </div>

          {/* Purchase + Production */}
          <div className="col-4">
            <div className="simple-org-container">
              <div className="org-header">Purchase Management</div>
              <div className="org-list mb-3">
                <div className="d-flex justify-content-between my-2 px-3">
                  <label className="my-auto" style={{ fontSize: 14 }}>
                    Enable Indent Management
                  </label>
                  <select className="my-input" style={{ width: 70 }}>
                    <option value="No">No</option>
                    <option value="Yes">Yes</option>
                  </select>
                </div>

                {[
                  'Enable Purchase Enquiry',
                  'Enable QC Control',
                  'Enable Sample In',
                  'Enable Domestic Landed Cost',
                  'Enable Import Management',
                ].map((label, idx) => (
                  <div
                    className={`d-flex justify-content-between ${
                      idx % 2 === 0 ? 'my-2' : ''
                    } px-3`}
                    key={idx}
                  >
                    <label className="my-auto" style={{ fontSize: 14 }}>
                      {label}
                    </label>
                    <select className="my-input" style={{ width: 70 }}>
                      <option value="Yes">Yes</option>
                      <option value="No">No</option>
                    </select>
                  </div>
                ))}
              </div>
            </div>

            <div className="simple-org-container mt-4">
              <div className="org-header">Production Management</div>
              <div className="org-list mb-3">
                <div className="d-flex justify-content-between my-2 px-3">
                  <label className="my-auto" style={{ fontSize: 14 }}>
                    Enable Production Management
                  </label>
                  <select className="my-input" style={{ width: 70 }}>
                    <option value="No">No</option>
                    <option value="Yes">Yes</option>
                  </select>
                </div>

                {['Enable Maintenance Management'].map((label, idx) => (
                  <div
                    className={`d-flex justify-content-between ${
                      idx % 2 === 0 ? 'my-2' : ''
                    } px-3`}
                    key={idx}
                  >
                    <label className="my-auto" style={{ fontSize: 14 }}>
                      {label}
                    </label>
                    <select className="my-input" style={{ width: 70 }}>
                      <option value="Yes">Yes</option>
                      <option value="No">No</option>
                    </select>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ✅ SAM Dialog */}
      {showSamDialog && (
        <div className="modal-overlay">
          <div className="modal-box">
            <div className="modal-header">
              <h5>Sales Man Configuration</h5>
              <button className="close-button" onClick={closeSamDialog}>
                &times;
              </button>
            </div>
            <div className="modal-body">
              {/* ... (same SAM body as before) ... */}
              <p>All your Sales Man configuration options here...</p>
            </div>
            <div className="modal-footer">
              <button className="btn btn-secondary" onClick={closeSamDialog}>
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ✅ Fixed Asset Dialog */}
      {showFixedAssetDialog && (
        <div className="modal-overlay">
          <div className="modal-box" style={{width:540}}>
            <div className="modal-header">
              <h5>Fixed Asset</h5>
              <button className="close-button" onClick={closeFixedAssetDialog}>
                &times;
              </button>
            </div>
            <div className="modal-body">
              <div className="d-flex justify-content-between my-2 px-3">
                <label style={{ fontSize: 14 }}>Set / Alter FA Depreciation Type</label>
                <select className="my-input" style={{ width: 150 }}>
                  <option value="No">Both</option>
                  <option value="Yes">Company Act</option>
                  <option value="Yes">IT Act</option>
                </select>
              </div>

              <div className="d-flex justify-content-between my-2 px-3">
                <label style={{ fontSize: 14 }}>Entity Type</label>
                <select className="my-input" style={{ width: 150 }}>
                  <option value="SLM">General</option>
                  <option value="WDV">Power Generating Units</option>
                </select>
              </div>

              <div className="d-flex justify-content-between my-2 px-3">
                <label style={{ fontSize: 14 }}>Set / Alter MFG Shift</label>
                <select className="my-input" style={{ width: 150 }}>
                  <option value="No">Not Applicable</option>
                  <option value="Yes">Double Shift</option>
                  <option value="Yes">Single Shift</option>
                  <option value="Yes">Triple Shift</option>
                </select>
              </div>

              <div className="d-flex justify-content-between my-2 px-3">
                <label style={{ fontSize: 14 }}>Loss Gain Journal VCH Type</label>
                <select className="my-input" style={{ width: 150 }}>
                  <option value="No">End Of List</option>
                </select>
              </div>

              <div className="d-flex justify-content-between my-2 px-3">
                <label style={{ fontSize: 14 }}>Asset Disposal Income Ledger</label>
                <select className="my-input" style={{ width: 150 }}>
                  <option value="No">End Of List</option>
                </select>
              </div>

              <div className="d-flex justify-content-between my-2 px-3">
                <label style={{ fontSize: 14 }}>Asset Disposal Expense Ledger</label>
                <select className="my-input" style={{ width: 150 }}>
                  <option value="No">End Of List</option>
                </select>
              </div>
            </div>
            <div className="modal-footer">
              <button
                className="btn btn-secondary"
                onClick={closeFixedAssetDialog}
              >
                Close
              </button>
              <button className="btn btn-primary">Save</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
