import React, { useState } from "react";

export default function TestReport() {
  const [formData, setFormData] = useState({
    testReportNo: "1",
    date: "",
    partyName: "",
    reportType: "",
    sampleInNo: "",
  });

  const [tableData, setTableData] = useState([
    {
      id: 1,
      slNo: 1,
      itemDescription: "",
      partNo: "",
      productCodeNo: "",
    },
  ]);

  const [narration, setNarration] = useState("");

  const handleFormChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleTableInputChange = (index, field, value) => {
    const updatedData = [...tableData];
    updatedData[index][field] = value;
    setTableData(updatedData);
  };

  const addNewRow = () => {
    const newRow = {
      id: tableData.length + 1,
      slNo: tableData.length + 1,
      itemDescription: "",
      partNo: "",
      productCodeNo: "",
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
          Test Report
        </h1>
      </div>

      {/* Main Content Container */}
      <div className="bg-white p-4 mx-3 rounded shadow-sm">
        {/* Test Report Header Section */}
        <div className="row mb-4">
          <div className="col-12">
            <div className="row mb-3">
              <div className="col-6">
                <div className="d-flex align-items-center">
                  <label className="me-2">Test Report No.</label>
                  <span className="me-2">:</span>
                  <input
                    type="text"
                    value={formData.testReportNo}
                    onChange={(e) =>
                      handleFormChange("testReportNo", e.target.value)
                    }
                    className="form-control"
                    style={{ width: "80px" }}
                  />
                </div>
              </div>
              <div className="col-6 text-end">
                <div className="d-flex align-items-center justify-content-end">
                  <span className="me-2">Saturday :</span>
                  <input
                    type="date"
                    value={formData.date}
                    onChange={(e) => handleFormChange("date", e.target.value)}
                    className="form-control"
                    style={{ width: "150px" }}
                  />
                </div>
              </div>
            </div>

            <div className="row mb-3">
              <div className="col-6">
                <div className="d-flex align-items-center">
                  <label className="me-2" style={{ minWidth: "100px" }}>
                    Party Name
                  </label>
                  <span className="me-2">:</span>
                  <input
                    type="text"
                    value={formData.partyName}
                    onChange={(e) =>
                      handleFormChange("partyName", e.target.value)
                    }
                    className="form-control"
                  />
                </div>
              </div>
            </div>

            <div className="row mb-3">
              <div className="col-6">
                <div className="d-flex align-items-center">
                  <label className="me-2" style={{ minWidth: "100px" }}>
                    Report Type
                  </label>
                  <span className="me-2">:</span>
                  <input
                    type="text"
                    value={formData.reportType}
                    onChange={(e) =>
                      handleFormChange("reportType", e.target.value)
                    }
                    className="form-control"
                  />
                </div>
              </div>
            </div>

            <div className="row mb-4">
              <div className="col-6">
                <div className="d-flex align-items-center">
                  <label className="me-2" style={{ minWidth: "100px" }}>
                    Sample In No
                  </label>
                  <span className="me-2">:</span>
                  <input
                    type="text"
                    value={formData.sampleInNo}
                    onChange={(e) =>
                      handleFormChange("sampleInNo", e.target.value)
                    }
                    className="form-control"
                  />
                </div>
              </div>
              <div className="col-6">
                <div className="d-flex align-items-center">
                  <label className="me-2">Date</label>
                  <span className="me-2">:</span>
                  <input type="date" className="form-control" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Add Row Button */}
        <div className="mb-3 justify-content-end d-flex">
          <button onClick={addNewRow} className="btn btn-primary">
            Add Row
          </button>
        </div>

        {/* Table Section */}
        <div className="table-responsive">
          <table className="table table-bordered">
            <thead>
              <tr>
                <th>Sl No</th>
                <th>Item Description</th>
                <th>Part No</th>
                <th>Product Code No</th>
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
                      type="text"
                      value={row.itemDescription}
                      onChange={(e) =>
                        handleTableInputChange(
                          index,
                          "itemDescription",
                          e.target.value
                        )
                      }
                      className="form-control"
                      style={{ minWidth: "200px" }}
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      value={row.partNo}
                      onChange={(e) =>
                        handleTableInputChange(index, "partNo", e.target.value)
                      }
                      className="form-control"
                      style={{ minWidth: "120px" }}
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      value={row.productCodeNo}
                      onChange={(e) =>
                        handleTableInputChange(
                          index,
                          "productCodeNo",
                          e.target.value
                        )
                      }
                      className="form-control"
                      style={{ minWidth: "150px" }}
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

        {/* Narration Section */}
        <div className="row mt-4">
          <div className="col-12">
            <div className="d-flex">
              <label className="me-2" style={{ minWidth: "80px" }}>
                Narration:
              </label>
              <textarea
                value={narration}
                onChange={(e) => setNarration(e.target.value)}
                className="form-control"
                rows="4"
                placeholder="Enter narration here..."
              />
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="mt-3 d-flex justify-content-end">
          <button className="btn btn-primary">Save</button>
        </div>
      </div>
    </>
  );
}
