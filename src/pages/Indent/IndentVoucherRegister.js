import React from 'react'
import "../Dashboard/DashboardCard1.css";

export default function IndentVoucherRegister() {
    return (
        <>
            <div className="settings-content">
                <div className=' d-flex justify-content-between pb-3' style={{ borderBottom: '1px solid #e6e6e6ff' }}>
                    <div className="heading mb-0 pb-0" style={{ borderBottom: 'none' }}>Indent Voucher Register</div>
                    <div className='d-flex'>
                        <input type="date" className="form-control px-2 py-1" />
                        <div className='mx-2 my-auto'>To</div>
                        <input type="date" className="form-control px-2 py-1" />
                    </div>
                </div>
                <div className="table-responsive" style={{ overflowX: 'auto' }}>
                    <table className="table table-bordered mt-3" style={{ minWidth: '3000px', tableLayout: 'fixed' }}>
                        <thead>
                            <tr>
                                <th style={{border: '1px solid #dadadaff', padding: '8px 12px', fontWeight: '600', textAlign: 'center', width: '70px',background:'#f8f9fa',color:'#495057'}}>SL No</th>
                                <th style={{border: '1px solid #dee2e6', padding: '8px 12px', fontWeight: '600', textAlign: 'center', width: '80px',background:'#f8f9fa',color:'#495057'}}>Date</th>
                                <th style={{border: '1px solid #dee2e6', padding: '8px 12px', fontWeight: '600', textAlign: 'center', width: '80px',background:'#f8f9fa',color:'#495057'}}>Vch No</th>
                                <th style={{border: '1px solid #dee2e6', padding: '8px 12px', fontWeight: '600', textAlign: 'center', width: '110px',background:'#f8f9fa',color:'#495057'}}>Indent Type</th>
                                <th style={{border: '1px solid #dee2e6', padding: '8px 12px', fontWeight: '600', textAlign: 'center', width: '120px',background:'#f8f9fa',color:'#495057'}}>Branch</th>
                                <th style={{border: '1px solid #dee2e6', padding: '8px 12px', fontWeight: '600', textAlign: 'center', width: '150px',background:'#f8f9fa',color:'#495057'}}>Department Name</th>
                                <th style={{border: '1px solid #dee2e6', padding: '8px 12px', fontWeight: '600', textAlign: 'center', width: '120px',background:'#f8f9fa',color:'#495057'}}>Division</th>
                                <th style={{border: '1px solid #dee2e6', padding: '8px 12px', fontWeight: '600', textAlign: 'center', width: '120px',background:'#f8f9fa',color:'#495057'}}>Project</th>
                                <th style={{border: '1px solid #dee2e6', padding: '8px 12px', fontWeight: '600', textAlign: 'center', width: '60px',background:'#f8f9fa',color:'#495057'}}>Hold</th>
                                <th style={{border: '1px solid #dee2e6', padding: '8px 12px', fontWeight: '600', textAlign: 'center', width: '120px',background:'#f8f9fa',color:'#495057'}}>Requested By</th>
                                <th style={{border: '1px solid #dee2e6', padding: '8px 12px', fontWeight: '600', textAlign: 'center', width: '120px',background:'#f8f9fa',color:'#495057'}}>Party Name</th>
                                <th style={{border: '1px solid #dee2e6', padding: '8px 12px', fontWeight: '600', textAlign: 'center', width: '80px',background:'#f8f9fa',color:'#495057'}}>Unit</th>
                                <th style={{border: '1px solid #dee2e6', padding: '8px 12px', fontWeight: '600', textAlign: 'center', width: '100px',background:'#f8f9fa',color:'#495057'}}>Indent No</th>
                                <th style={{border: '1px solid #dee2e6', padding: '8px 12px', fontWeight: '600', textAlign: 'center', width: '100px',background:'#f8f9fa',color:'#495057'}}>Indent Date</th>
                                <th style={{border: '1px solid #dee2e6', padding: '8px 12px', fontWeight: '600', textAlign: 'center', width: '100px',background:'#f8f9fa',color:'#495057'}}>Target Date</th>
                                <th style={{border: '1px solid #dee2e6', padding: '8px 12px', fontWeight: '600', textAlign: 'center', width: '150px',background:'#f8f9fa',color:'#495057'}}>Notes</th>
                                <th style={{border: '1px solid #dee2e6', padding: '8px 12px', fontWeight: '600', textAlign: 'center', width: '130px',background:'#f8f9fa',color:'#495057'}}>Contact Person</th>
                                <th style={{border: '1px solid #dee2e6', padding: '8px 12px', fontWeight: '600', textAlign: 'center', width: '100px',background:'#f8f9fa',color:'#495057'}}>Mobile No</th>
                                <th style={{border: '1px solid #dee2e6', padding: '8px 12px', fontWeight: '600', textAlign: 'center', width: '150px',background:'#f8f9fa',color:'#495057'}}>Email</th>
                                <th style={{border: '1px solid #dee2e6', padding: '8px 12px', fontWeight: '600', textAlign: 'center', width: '120px',background:'#f8f9fa',color:'#495057'}}>Item Name</th>
                                <th style={{border: '1px solid #dee2e6', padding: '8px 12px', fontWeight: '600', textAlign: 'center', width: '120px',background:'#f8f9fa',color:'#495057'}}>Schedule Date</th>
                                <th style={{border: '1px solid #dee2e6', padding: '8px 12px', fontWeight: '600', textAlign: 'center', width: '110px',background:'#f8f9fa',color:'#495057'}}>Schedule Qty</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td style={{border: '1px solid #dee2e6', padding: '8px 12px', textAlign: 'center'}}>1</td>
                                <td style={{border: '1px solid #dee2e6', padding: '8px 12px', textAlign: 'center'}}>01-06-2024</td>
                                <td style={{border: '1px solid #dee2e6', padding: '8px 12px', textAlign: 'center'}}>V001</td>
                                <td style={{border: '1px solid #dee2e6', padding: '8px 12px', textAlign: 'center'}}>Regular</td>
                                <td style={{border: '1px solid #dee2e6', padding: '8px 12px', textAlign: 'center'}}>Main Branch</td>
                                <td style={{border: '1px solid #dee2e6', padding: '8px 12px', textAlign: 'center'}}>Purchase Department</td>
                                <td style={{border: '1px solid #dee2e6', padding: '8px 12px', textAlign: 'center'}}>North Division</td>
                                <td style={{border: '1px solid #dee2e6', padding: '8px 12px', textAlign: 'center'}}>Project Alpha</td>
                                <td style={{border: '1px solid #dee2e6', padding: '8px 12px', textAlign: 'center'}}>No</td>
                                <td style={{border: '1px solid #dee2e6', padding: '8px 12px', textAlign: 'center'}}>John Doe</td>
                                <td style={{border: '1px solid #dee2e6', padding: '8px 12px', textAlign: 'center'}}>ABC Suppliers</td>
                                <td style={{border: '1px solid #dee2e6', padding: '8px 12px', textAlign: 'center'}}>Pieces</td>
                                <td style={{border: '1px solid #dee2e6', padding: '8px 12px', textAlign: 'center'}}>IND-001</td>
                                <td style={{border: '1px solid #dee2e6', padding: '8px 12px', textAlign: 'center'}}>01-06-2024</td>
                                <td style={{border: '1px solid #dee2e6', padding: '8px 12px', textAlign: 'center'}}>15-06-2024</td>
                                <td style={{border: '1px solid #dee2e6', padding: '8px 12px', textAlign: 'center'}}>Urgent requirement</td>
                                <td style={{border: '1px solid #dee2e6', padding: '8px 12px', textAlign: 'center'}}>Jane Smith</td>
                                <td style={{border: '1px solid #dee2e6', padding: '8px 12px', textAlign: 'center'}}>9876543210</td>
                                <td style={{border: '1px solid #dee2e6', padding: '8px 12px', textAlign: 'center'}}>jane@example.com</td>
                                <td style={{border: '1px solid #dee2e6', padding: '8px 12px', textAlign: 'center'}}>Laptop</td>
                                <td style={{border: '1px solid #dee2e6', padding: '8px 12px', textAlign: 'center'}}>10-06-2024</td>
                                <td style={{border: '1px solid #dee2e6', padding: '8px 12px', textAlign: 'center'}}>5</td>
                            </tr>
                            {/* Add more rows as needed */}
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    )
}