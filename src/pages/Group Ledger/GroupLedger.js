import React from 'react'

export default function GroupLedger() {
  return (
    <>
    <div className="companies-page">
      <div className="companies-header">
        <h2>Group Ledger</h2>
        <button className="btn btn-primary new-btn">Add Group</button>
      </div>
      <div className='p-4 bg-white'>
        <div className="mt-3 row">
            <div className="col-2 my-auto">
            <label htmlFor="MasterID" className="form-label">Master ID</label>
            </div>
            <div className="col-10">
            <input type="text" className="form-control" id="MasterID" />
            </div>
            <div className="col-2 my-auto">
            <label htmlFor="Country" className="form-label">Country</label>
            </div>
            <div className="col-10 my-1">
            <select id="Country" className="form-select w-100">
                <option>Disabled select</option>
            </select>
            </div>

        </div>
      </div>
    </div>
    </>
  )
}
