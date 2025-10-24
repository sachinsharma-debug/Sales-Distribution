import React from "react";
import "./Header.css";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Clear any session/local storage if needed
    // localStorage.clear(); // optional
    // sessionStorage.clear(); // optional

    // Redirect to login page
    navigate("/");
  };

  const handleSettingsClick = () => {
    navigate("/settings");
  };

  return (
    <header className="top-header">
      <div className="left">
        <span className="logo">📘 ERP</span>
        <span className="dropdown">▼</span>
      </div>
      <div className="center">
        <div>
          <strong>DEMO COMPANY</strong>
          <div>01 Apr 2024 to 31 Mar 2025</div>
        </div>
      </div>
      <div>
        <strong>Date</strong>
        <div>22 OCT 2025</div>
      </div>
      <div className="right">
        <span>🔔</span>
        <span>💼</span>
        <span onClick={handleSettingsClick} style={{ cursor: "pointer" }}>
          ⚙️
        </span>
        <span>↩️</span>
        {/* <div className="user-avatar">JZ</div> */}
        <div class="dropdown">
          <button
            className="user-avatar btn btn-secondary dropdown-toggle"
            type="button"
            id="dropdownMenuButton1"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            D A
          </button>
          <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
            <li>
              <button class="dropdown-item" onClick={handleLogout}>
                Logout
              </button>
            </li>
            <li>
              <button
                class="dropdown-item"
                onClick={() => console.log("Action clicked")}
              >
                Another action
              </button>
            </li>
            <li>
              <button
                class="dropdown-item"
                onClick={() => console.log("Settings clicked")}
              >
                Something else here
              </button>
            </li>
          </ul>
        </div>
        <span>Demo Account</span>
      </div>
    </header>
  );
};

export default Header;