import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // ⬅️ Import navigate
import './ModalComp.css';

const companies = [
  { id: 1, name: 'Demo Company' },
  { id: 2, name: 'Testing' },
];

const ModalComp = ({ isOpen, onClose }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCompany, setSelectedCompany] = useState(null);
  const navigate = useNavigate(); // ⬅️ Hook for navigation

  if (!isOpen) return null;

  const filteredCompanies = companies.filter((c) =>
    c.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSelect = (company) => {
    setSelectedCompany(company);

    // Optionally store company in localStorage/session
    localStorage.setItem('selectedCompany', JSON.stringify(company));

    onClose(); // Close modal
    navigate('/dashboard'); // ⬅️ Navigate to dashboard
  };

  return (
    <div className="modal-overlay">
      <div className="modal-box">
        <div className="modal-header">
          <h3>Select Company</h3>
          <button className="close-btn" onClick={onClose}>
            &times;
          </button>
        </div>

        <input
          type="text"
          placeholder="Enter Company/Branch name"
          className="modal-search-input"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        <ul className="company-list">
          {filteredCompanies.map((company) => (
            <li
              key={company.id}
              className={`company-item ${selectedCompany?.id === company.id ? 'selected' : ''}`}
              onClick={() => handleSelect(company)}
            >
              <span role="img" aria-label="building" className="icon">🏢</span>
              {company.name}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ModalComp;
