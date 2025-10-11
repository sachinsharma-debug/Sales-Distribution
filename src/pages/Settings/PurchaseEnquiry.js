import React from 'react'
import './Settings.css'
import { Link } from 'react-router-dom'

export default function PurchaseEnquiry() {
    return (
        <>
            <div className="settings-content company-form">
                <div className='d-flex justify-content-between heading'>
                    <div className="pb-0">Purchase Enquiry</div>
                    <input type="text" value={"05-09-2025"} className='form-control' style={{width:91}} />
                </div>
                <div className="row mt-3">
                    <div className='col-4'>
                        <div className='row'>
                            <div className='col-5 my-auto'>
                                <label htmlFor="CompanyCode" className="form-label">Track From</label>
                            </div>
                            <div className='col-7'>
                                <input type="text" className="form-control" id="CompanyCode" />
                            </div>

                            <div className='col-5 '>
                                <div className='my-auto'>
                                    <label htmlFor="CompanyCode" className="form-label">DOC No.</label>
                                </div>
                            </div>
                            <div className='col-7 '>
                                <input type="text" className="form-control" id="CompanyCode" />
                            </div>

                            <div className='col-5 '>
                                <div className='my-auto'>
                                    <label htmlFor="CompanyCode" className="form-label">DOC Date</label>
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
                                <label htmlFor="CompanyCode" className="form-label">Vendor Type</label>
                            </div>
                            <div className='col-7'>
                                <input type="text" className="form-control" id="CompanyCode" />
                            </div>

                            <div className='col-5 '>
                                <div className='my-auto'>
                                    <label htmlFor="CompanyCode" className="form-label">Vendor Name</label>
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
                                    <th>Unit</th>
                                    <th>Amount</th>
                                    <th>Due Date</th>
                                    <th>Set Rate</th>
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
                                </tr>
                                <tr>
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
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </>
    )
}
