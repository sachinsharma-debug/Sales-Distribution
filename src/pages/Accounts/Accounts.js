import React from 'react'
import { Link } from 'react-router-dom'

export default function Accounts() {
  return (
    <>
    <div className="settings-content">
        <div className="heading">Accounting Master</div>
        <div className='row'>
            <div className='col-3'>
                <div className="simple-org-container">
                    <div className="org-list">
                        <Link to="/accounts-ledger"><div className="org-tab">Accounting Ledger</div></Link>
                        <Link to="/group"><div className="org-tab">Group</div></Link>
                        <Link to="/cost-centre"><div className="org-tab">Cost Centre</div></Link>
                        <Link to="/voucher-type"><div className="org-tab">Voucher Type</div></Link>
                    </div>
                </div>
            </div>

            <div className='col-3'>
                <div className="simple-org-container">
                    <div className="org-list">
                        <Link to="/mode-terms"><div className="org-tab">Mode Terms Of Payment</div></Link>
                        <Link to="/term-of-delivery"><div className="org-tab">Terms Of Delivery</div></Link>
                        <Link to="/sales-man"><div className="org-tab">Sales Man</div></Link>
                        <Link to="/transporter"><div className="org-tab">Transporter</div></Link>
                        <Link to="/courier"><div className="org-tab">Courier</div></Link>
                    </div>
                </div>
            </div>

            <div className='col-3'>
                <div className="simple-org-container">
                    <div className="org-list">
                        <Link to="/financial-year"><div className="org-tab">Financial Year</div></Link>
                        <Link to="/department"><div className="org-tab">Department</div></Link>
                        <Link to="/division"><div className="org-tab">Division</div></Link>
                        <Link to="/"><div className="org-tab">Nature Of Assets</div></Link>
                        <Link to="/depreciation-method"><div className="org-tab">Depreciation Method</div></Link>
                        <Link to="/asset-classification"><div className="org-tab">Asset Classification</div></Link>
                        <Link to="/asset-group"><div className="org-tab">Asset Group</div></Link>
                        <Link to="/asset-category"><div className="org-tab">Asset Category</div></Link>
                        <Link to="/custodians"><div className="org-tab">Custodians</div></Link>
                        <Link to="/locations"><div className="org-tab">Locations</div></Link>
                        <Link to="/insurance-type"><div className="org-tab">Insurance Type</div></Link>
                        <Link to="/service-type"><div className="org-tab">Service Type</div></Link>
                        <Link to="/fa-ledger"><div className="org-tab">FA Ledger</div></Link>
                        <Link to="/courier"><div className="org-tab">Asset Item</div></Link>
                    </div>
                </div>
            </div>
        </div>
    </div>
    </>
  )
}
