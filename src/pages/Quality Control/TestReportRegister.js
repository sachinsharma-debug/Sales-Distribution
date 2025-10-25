import React, { useState } from "react";

export default function TestReportRegister() {
  const [selectedDate, setSelectedDate] = useState("");
  const [tableData, setTableData] = useState([
    {
      id: 1,
      date: "",
      particulars: "",
      vchType: "",
      vchNo: "",
      debitAmountInwards: "",
      debitAmountQty: "",
      creditAmountOutwards: "",
      creditAmountQty: "",
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
      particulars: "",
      vchType: "",
      vchNo: "",
      debitAmountInwards: "",
      debitAmountQty: "",
      creditAmountOutwards: "",
      creditAmountQty: "",
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
        <div className="heading text-center">Test Report Register</div>
      </div>

      {/* Main Content Container */}
      <div className="bg-white p-4 mx-3 rounded shadow-sm">
        {/* Day Book Header */}
        <div className="row mb-4">
          <div className="col-6">
            <h5 className="mb-0">Day Book</h5>
          </div>
          <div className="col-6 text-end">
            <div className="d-flex align-items-center justify-content-end">
              <label className="me-2">For:</label>
              <input
                type="date"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
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

        {/* Table */}
        <div className="table-responsive">
          <table className="table table-bordered">
            <thead>
              <tr>
                <th style={{ width: "10%" }}>Date</th>
                <th style={{ width: "25%" }}>Particulars</th>
                <th style={{ width: "10%" }}>Vch Type</th>
                <th style={{ width: "10%" }}>Vch No.</th>
                <th
                  colSpan="2"
                  className="text-center"
                  style={{ width: "22.5%" }}
                >
                  Debit Amount
                </th>
                <th
                  colSpan="2"
                  className="text-center"
                  style={{ width: "22.5%" }}
                >
                  Credit Amount
                </th>
                <th style={{ width: "10%" }}>Action</th>
              </tr>
              <tr>
                <th></th>
                <th></th>
                <th></th>
                <th></th>
                <th className="text-center">Inwards Qty</th>
                <th className="text-center">Outwards Qty</th>
                <th className="text-center">Inwards Qty</th>
                <th className="text-center">Outwards Qty</th>
                <th></th>
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
                      value={row.particulars}
                      onChange={(e) =>
                        handleInputChange(index, "particulars", e.target.value)
                      }
                      className="form-control"
                      placeholder="Enter particulars"
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
                      value={row.vchNo}
                      onChange={(e) =>
                        handleInputChange(index, "vchNo", e.target.value)
                      }
                      className="form-control"
                    />
                  </td>
                  <td>
                    <input
                      type="number"
                      value={row.debitAmountInwards}
                      onChange={(e) =>
                        handleInputChange(
                          index,
                          "debitAmountInwards",
                          e.target.value
                        )
                      }
                      className="form-control text-end"
                      placeholder="0"
                    />
                  </td>
                  <td>
                    <input
                      type="number"
                      value={row.debitAmountQty}
                      onChange={(e) =>
                        handleInputChange(
                          index,
                          "debitAmountQty",
                          e.target.value
                        )
                      }
                      className="form-control text-end"
                      placeholder="0"
                    />
                  </td>
                  <td>
                    <input
                      type="number"
                      value={row.creditAmountOutwards}
                      onChange={(e) =>
                        handleInputChange(
                          index,
                          "creditAmountOutwards",
                          e.target.value
                        )
                      }
                      className="form-control text-end"
                      placeholder="0"
                    />
                  </td>
                  <td>
                    <input
                      type="number"
                      value={row.creditAmountQty}
                      onChange={(e) =>
                        handleInputChange(
                          index,
                          "creditAmountQty",
                          e.target.value
                        )
                      }
                      className="form-control text-end"
                      placeholder="0"
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
          <button className="btn btn-success me-2">Save Register</button>
          <button className="btn btn-info me-2">Calculate Total</button>
          <button className="btn btn-secondary">Print Register</button>
        </div>
      </div>
    </>
  );
}
