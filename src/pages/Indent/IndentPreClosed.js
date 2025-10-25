import React from 'react'
import "../Dashboard/DashboardCard1.css";

export default function IndentPreClosed() {
    return (
        <>
            <div className="settings-content">
                <div className=' d-flex justify-content-between pb-3' style={{ borderBottom: '1px solid #e6e6e6ff' }}>
                    <div className="heading mb-0 pb-0" style={{ borderBottom: 'none' }}>Indent Pre-Closed</div>
                    <div className='d-flex'>
                        <input type="date" className="form-control px-2 py-1" />
                        <div className='mx-2 my-auto'>To</div>
                        <input type="date" className="form-control px-2 py-1" />
                    </div>
                </div>
                <div className="table-responsive" style={{ overflowX: 'auto' }}>
                    <table className="table table-bordered mt-3" style={{ minWidth: '1000px', tableLayout: 'fixed' }}>
                        <thead>
                            <tr>
                                <th style={{border: '1px solid #dee2e6', padding: '8px 12px', fontWeight: '600', textAlign: 'center', width: '80px',background:'#f8f9fa',color:'#495057'}}>Date</th>
                                <th style={{border: '1px solid #dee2e6', padding: '8px 12px', fontWeight: '600', textAlign: 'center', width: '80px',background:'#f8f9fa',color:'#495057'}}>Vch No</th>
                                <th style={{border: '1px solid #dee2e6', padding: '8px 12px', fontWeight: '600', textAlign: 'center', width: '120px',background:'#f8f9fa',color:'#495057'}}>Party</th>
                                <th style={{border: '1px solid #dee2e6', padding: '8px 12px', fontWeight: '600', textAlign: 'center', width: '150px',background:'#f8f9fa',color:'#495057'}}>Department</th>
                                <th style={{border: '1px solid #dee2e6', padding: '8px 12px', fontWeight: '600', textAlign: 'center', width: '120px',background:'#f8f9fa',color:'#495057'}}>Item Name</th>
                                <th style={{border: '1px solid #dee2e6', padding: '8px 12px', fontWeight: '600', textAlign: 'center', width: '110px',background:'#f8f9fa',color:'#495057'}}>Pending Qty</th>
                                
                                
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td style={{border: '1px solid #dee2e6', padding: '8px 12px', textAlign: 'center'}}>01-06-2024</td>
                                <td style={{border: '1px solid #dee2e6', padding: '8px 12px', textAlign: 'center'}}>V001</td>
                                <td style={{border: '1px solid #dee2e6', padding: '8px 12px', textAlign: 'center'}}>Regular</td>
                                <td style={{border: '1px solid #dee2e6', padding: '8px 12px', textAlign: 'center'}}>Main Branch</td>
                                <td style={{border: '1px solid #dee2e6', padding: '8px 12px', textAlign: 'center'}}>Purchase Department</td>
                                <td style={{border: '1px solid #dee2e6', padding: '8px 12px', textAlign: 'center'}}>North Division</td>
                            </tr>
                            {/* Add more rows as needed */}
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    )
}