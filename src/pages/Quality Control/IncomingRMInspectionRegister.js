import React, { useState } from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export default function IncomingRMInspectionRegister() {
  const [dateFrom, setDateFrom] = useState("");
  const [dateTo, setDateTo] = useState("");

  // Chart data
  const chartData = {
    labels: ["1", "5", "10", "15", "20", "25", "30"], // Days in April
    datasets: [
      {
        label: "Incoming RM Inspection",
        data: [2, 4, 3, 5, 7, 6, 8],
        borderColor: "#007bff",
        backgroundColor: "rgba(0, 123, 255, 0.1)",
        tension: 0.1,
        pointBackgroundColor: "#007bff",
        pointBorderColor: "#007bff",
        pointRadius: 4,
      },
    ],
  };

  // Chart options
  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: false,
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: "April",
          color: "#333",
          font: {
            size: 14,
            weight: "bold",
          },
        },
        grid: {
          display: true,
          color: "#e0e0e0",
        },
      },
      y: {
        beginAtZero: true,
        max: 10,
        title: {
          display: false,
        },
        grid: {
          display: true,
          color: "#e0e0e0",
        },
        ticks: {
          stepSize: 2,
        },
      },
    },
  };

  return (
    <>
      {/* Header Container */}
      <div className="bg-white border-bottom p-3 mb-3">
        <div className="heading text-center">
          Incoming RM Inspection Register
        </div>
      </div>

      {/* Main Content Container */}
      <div className="bg-white p-4 mx-3 rounded shadow-sm">
        <div className="row mb-4">
          <div className="col-12">
            <div className="d-flex align-items-center">
              <label className="me-3 fw-medium">
                Incoming RM Inspection Register From:
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

        {/* Chart Container */}
        <div className="row">
          <div className="col-12">
            <div
              className="border rounded p-3"
              style={{ backgroundColor: "#f8f9fa" }}
            >
              <div style={{ height: "400px", position: "relative" }}>
                <Line data={chartData} options={chartOptions} />
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="mt-4 d-flex justify-content-end">
          <button className="btn btn-primary me-2">Generate Report</button>
          <button className="btn btn-success me-2">Export Data</button>
          <button className="btn btn-secondary">Print Chart</button>
        </div>
      </div>
    </>
  );
}
