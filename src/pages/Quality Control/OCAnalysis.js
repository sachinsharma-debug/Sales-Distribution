import React, { useState } from "react";

export default function OCAnalysis() {
  const [dateFrom, setDateFrom] = useState("");
  const [dateTo, setDateTo] = useState("");
  const [tableData, setTableData] = useState([
    {
      id: 1,
      slNo: 1,
      date: "",
      itemName: "",
      batchName: "",
      type: "",
      billedQty: "",
      passQty: "",
      rejectQty: "",
      reProcessQty: "",
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
      slNo: tableData.length + 1,
      date: "",
      itemName: "",
      batchName: "",
      type: "",
      billedQty: "",
      passQty: "",
      rejectQty: "",
      reProcessQty: "",
    };
    setTableData([...tableData, newRow]);
  };

  const deleteRow = (index) => {
    if (tableData.length > 1) {
      const updatedData = tableData.filter((_, i) => i !== index);
      // Update serial numbers
      const reNumberedData = updatedData.map((row, idx) => ({
        ...row,
        slNo: idx + 1,
      }));
      setTableData(reNumberedData);
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
          OC Analysis
        </h1>
      </div>

      {/* Main Content Container */}
      <div className="bg-white p-4 mx-3 rounded shadow-sm">
        <div className="row mb-4">
          <div className="col-12">
            <div className="d-flex align-items-center">
              <label className="me-3 fw-medium">OC Analysis From:</label>
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

        {/* Add Row Button */}
        <div className="mb-3 d-flex justify-content-end">
          <button onClick={addNewRow} className="btn btn-primary">
            Add Row
          </button>
        </div>

        <div className="table-responsive">
          <table className="table table-bordered">
            <thead>
              <tr>
                <th>SL No</th>
                <th>Date</th>
                <th>Item Name</th>
                <th>Batch Name</th>
                <th>Type</th>
                <th>Billed Qty</th>
                <th>Pass Qty</th>
                <th>Reject Qty</th>
                <th>Re Process Qty</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {tableData.map((row, index) => (
                <tr key={row.id}>
                  <td>
                    <input
                      type="number"
                      value={row.slNo}
                      readOnly
                      className="form-control"
                      style={{ backgroundColor: "#f8f9fa", width: "60px" }}
                    />
                  </td>
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
                      value={row.itemName}
                      onChange={(e) =>
                        handleInputChange(index, "itemName", e.target.value)
                      }
                      className="form-control"
                      style={{ minWidth: "150px" }}
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      value={row.batchName}
                      onChange={(e) =>
                        handleInputChange(index, "batchName", e.target.value)
                      }
                      className="form-control"
                      style={{ minWidth: "120px" }}
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      value={row.type}
                      onChange={(e) =>
                        handleInputChange(index, "type", e.target.value)
                      }
                      className="form-control"
                      style={{ minWidth: "100px" }}
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
                      style={{ minWidth: "100px" }}
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
                      style={{ minWidth: "100px" }}
                    />
                  </td>
                  <td>
                    <input
                      type="number"
                      value={row.rejectQty}
                      onChange={(e) =>
                        handleInputChange(index, "rejectQty", e.target.value)
                      }
                      className="form-control"
                      style={{ minWidth: "100px" }}
                    />
                  </td>
                  <td>
                    <input
                      type="number"
                      value={row.reProcessQty}
                      onChange={(e) =>
                        handleInputChange(index, "reProcessQty", e.target.value)
                      }
                      className="form-control"
                      style={{ minWidth: "120px" }}
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

        {/* Action Buttons */}
        <div className="mt-3 d-flex justify-content-end">
          <button className="btn btn-primary me-2">Save Analysis</button>
        </div>
      </div>
    </>
  );
}
