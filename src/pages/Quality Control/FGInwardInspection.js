import React, { useState } from "react";

export default function FGInwardInspection() {
  const [dateFrom, setDateFrom] = useState("");
  const [dateTo, setDateTo] = useState("");
  const [tableData, setTableData] = useState([
    {
      id: 1,
      slNo: 1,
      date: "",
      vchNo: "",
      vchType: "",
      itemName: "",
      batch: "",
      prod: "",
      qty: "",
      passQty: "",
      rejQty: "",
      repQty: "",
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
      slNo: tableData.length + 1,
      date: "",
      vchNo: "",
      vchType: "",
      itemName: "",
      batch: "",
      prod: "",
      qty: "",
      passQty: "",
      rejQty: "",
      repQty: "",
      remarks: "",
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
          FG Inward Inspection
        </h1>
      </div>

      {/* Main Content Container */}
      <div className="bg-white p-4 mx-3 rounded shadow-sm">
        <div className="row mb-4">
          <div className="col-12">
            <div className="d-flex align-items-center">
              <label className="me-3 fw-medium">
                FG Inward Inspection From:
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
                <th>Sl No</th>
                <th>Date</th>
                <th>VCH No.</th>
                <th>VCH Type</th>
                <th>Item Name</th>
                <th>Batch</th>
                <th>Prod</th>
                <th>Qty</th>
                <th>Pass Qty</th>
                <th>Rej Qty</th>
                <th>Rep Qty</th>
                <th>Remarks</th>
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
                      style={{ backgroundColor: "#f8f9fa" }}
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
                      value={row.vchNo}
                      onChange={(e) =>
                        handleInputChange(index, "vchNo", e.target.value)
                      }
                      className="form-control"
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      value={row.vchType}
                      onChange={(e) =>
                        handleInputChange(index, "vchType", e.target.value)
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
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      value={row.batch}
                      onChange={(e) =>
                        handleInputChange(index, "batch", e.target.value)
                      }
                      className="form-control"
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      value={row.prod}
                      onChange={(e) =>
                        handleInputChange(index, "prod", e.target.value)
                      }
                      className="form-control"
                    />
                  </td>
                  <td>
                    <input
                      type="number"
                      value={row.qty}
                      onChange={(e) =>
                        handleInputChange(index, "qty", e.target.value)
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
                    <input
                      type="number"
                      value={row.repQty}
                      onChange={(e) =>
                        handleInputChange(index, "repQty", e.target.value)
                      }
                      className="form-control"
                    />
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
