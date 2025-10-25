import React, { useState } from "react";

export default function RMSampleInspection() {
  const [dateFrom, setDateFrom] = useState("");
  const [dateTo, setDateTo] = useState("");
  const [tableData, setTableData] = useState([
    {
      id: 1,
      date: "",
      voucherType: "",
      branchName: "",
      inwardNo: "",
      billedQty: "",
      sampleQty: "",
      passQty: "",
      rejQty: "",
      status: "",
      remarks: "",
    },
  ]);

  const handleInputChange = (index, field, value) => {
    const updatedData = [...tableData];
    updatedData[index][field] = value;
    setTableData(updatedData);
  };

  const addNewRow = () => {
    const newRow = {
      id: tableData.length + 1,
      date: "",
      voucherType: "",
      branchName: "",
      inwardNo: "",
      billedQty: "",
      sampleQty: "",
      passQty: "",
      rejQty: "",
      status: "",
      remarks: "",
    };
    setTableData([...tableData, newRow]);
  };

  const deleteRow = (index) => {
    if (tableData.length > 1) {
      const updatedData = tableData.filter((_, i) => i !== index);
      setTableData(updatedData);
    }
  };

  return (
    <>
      {/* Header Container */}
      <div className="bg-white border-bottom p-3 mb-3">
        <h1
          className="text-center mb-0"
          style={{ fontSize: "2.5rem", fontWeight: 700 }}
        >
          RM Sample Inspection
        </h1>
      </div>

      {/* Main Content Container */}
      <div className="bg-white p-4 mx-3 rounded shadow-sm">
        <div className="row mb-4">
          <div className="col-12">
            <div className="d-flex align-items-center">
              <label className="me-3 fw-medium">
                RM Sample Inspection From:
              </label>
              <input
                type="date"
                value={dateFrom}
                onChange={(e) => setDateFrom(e.target.value)}
                className="form-control me-2"
                style={{ width: "150px" }}
              />
              <span className="me-2">to</span>
              <input
                type="date"
                value={dateTo}
                onChange={(e) => setDateTo(e.target.value)}
                className="form-control"
                style={{ width: "150px" }}
              />
            </div>
          </div>
        </div>

        <div className="table-responsive">
          <table className="table table-bordered">
            <thead>
              <tr>
                <th>Date</th>
                <th>Voucher Type</th>
                <th>Branch Name</th>
                <th>InWard No</th>
                <th>Billed Qty</th>
                <th>Sample Qty</th>
                <th>Pass Qty</th>
                <th>Rej Qty</th>
                <th>Status</th>
                <th>Remarks</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {tableData.map((row, index) => (
                <tr key={row.id}>
                  <td>
                    <input
                      type="date"
                      value={row.date}
                      onChange={(e) =>
                        handleInputChange(index, "date", e.target.value)
                      }
                      className="form-control"
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      value={row.voucherType}
                      onChange={(e) =>
                        handleInputChange(index, "voucherType", e.target.value)
                      }
                      className="form-control"
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      value={row.branchName}
                      onChange={(e) =>
                        handleInputChange(index, "branchName", e.target.value)
                      }
                      className="form-control"
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      value={row.inwardNo}
                      onChange={(e) =>
                        handleInputChange(index, "inwardNo", e.target.value)
                      }
                      className="form-control"
                    />
                  </td>
                  <td>
                    <input
                      type="number"
                      value={row.billedQty}
                      onChange={(e) =>
                        handleInputChange(index, "billedQty", e.target.value)
                      }
                      className="form-control"
                    />
                  </td>
                  <td>
                    <input
                      type="number"
                      value={row.sampleQty}
                      onChange={(e) =>
                        handleInputChange(index, "sampleQty", e.target.value)
                      }
                      className="form-control"
                    />
                  </td>
                  <td>
                    <input
                      type="number"
                      value={row.passQty}
                      onChange={(e) =>
                        handleInputChange(index, "passQty", e.target.value)
                      }
                      className="form-control"
                    />
                  </td>
                  <td>
                    <input
                      type="number"
                      value={row.rejQty}
                      onChange={(e) =>
                        handleInputChange(index, "rejQty", e.target.value)
                      }
                      className="form-control"
                    />
                  </td>
                  <td>
                    <select
                      value={row.status}
                      onChange={(e) =>
                        handleInputChange(index, "status", e.target.value)
                      }
                      className="form-control"
                    >
                      <option value="">Select</option>
                      <option value="Pending">Pending</option>
                      <option value="Approved">Approved</option>
                      <option value="Rejected">Rejected</option>
                    </select>
                  </td>
                  <td>
                    <input
                      type="text"
                      value={row.remarks}
                      onChange={(e) =>
                        handleInputChange(index, "remarks", e.target.value)
                      }
                      className="form-control"
                    />
                  </td>
                  <td>
                    <button
                      type="button"
                      onClick={() => deleteRow(index)}
                      className="btn btn-danger btn-sm"
                      disabled={tableData.length === 1}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="mt-3">
          <button onClick={addNewRow} className="btn btn-primary">
            Add Row
          </button>
        </div>
      </div>
    </>
  );
}
