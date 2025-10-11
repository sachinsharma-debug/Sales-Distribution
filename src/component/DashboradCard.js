import React from "react";
import "./Dashboard.css";

const DashboardCard = ({ title, icon, count, items, color }) => {
  return (
    <div className="dashboard-card" style={{ borderTop: `4px solid ${color}` }}>
      <div className="dashboard-card-header">
        <span style={{ fontSize: "24px", color }}>{icon}</span>
        <h4>{title}</h4>
      </div>
      <h2 style={{ color }}>{count}</h2>
      <table>
        <thead>
          <tr>
            <th>Title</th>
            <th>Count</th>
          </tr>
        </thead>
        <tbody>
          {items?.map((item, index) => (
            <tr key={index}>
              <td>{item.title}</td>
              <td>{item.count}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DashboardCard;
