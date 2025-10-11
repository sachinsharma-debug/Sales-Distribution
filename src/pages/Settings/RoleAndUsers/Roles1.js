import React, { useState } from 'react';
import './Roles.css';
import Edit from '../../../assets/edit.png'; 
import Delete from '../../../assets/delete.png';

const initialRoles = [
  "ACCOUNTS DELETE", "ACCOUNTS EDIT", "ACCOUNTS PRINT", "SALES EDIT", "A-ACCOUNT",
  "abc", "abcdefg", "Ac Manager", "ACC", "Account Ledger", "Account Manager",
  "accountant", "Accountants", "accountant jemshy", "accounting and voucher"
];

const ROWS_PER_PAGE = 15;

function Roles1() {
  const [roles, setRoles] = useState(initialRoles);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  const filteredRoles = roles.filter(role =>
    role.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(filteredRoles.length / ROWS_PER_PAGE);
  const startIndex = (currentPage - 1) * ROWS_PER_PAGE;
  const visibleRoles = filteredRoles.slice(startIndex, startIndex + ROWS_PER_PAGE);

  const handleDelete = (roleToDelete) => {
    if (window.confirm(`Are you sure to delete: ${roleToDelete}?`)) {
      setRoles(roles.filter(role => role !== roleToDelete));
    }
  };

  const handleEdit = (oldRole) => {
    const newRole = prompt('Edit role:', oldRole);
    if (newRole && newRole.trim()) {
      setRoles(roles.map(role => (role === oldRole ? newRole.trim() : role)));
    }
  };

  const handleAdd = () => {
    const newRole = prompt('Enter new role:');
    if (newRole && newRole.trim()) {
      setRoles([...roles, newRole.trim()]);
      setCurrentPage(1);
    }
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1);
  };

  const goToPage = (page) => {
    setCurrentPage(page);
  };

  return (
    <div className="">
      <div className="top-bar">
        <h2>Roles</h2>
        <button className="new-button" onClick={handleAdd}>+ New</button>
      </div>

      <table>
        <thead>
          <tr>
            <th className='d-flex justify-content-between'>
              <div>Name</div>
              <input
                type="text"
                placeholder="Search roles..."
                value={searchTerm}
                onChange={handleSearchChange}
              />
            </th>
            <th className="actions-header">Action</th>
          </tr>
          
        </thead>
        <tbody>
          {visibleRoles.map((role, index) => (
            <tr key={index}>
              <td>{role}</td>
              <td className="actions">
                <button className="edit" onClick={() => handleEdit(role)}><img src={Edit} alt="Edit" width={22} /></button>
                <button className="delete" onClick={() => handleDelete(role)}><img src={Delete} alt="Delete" width={22} /></button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="pagination">
        <button
          onClick={() => goToPage(currentPage - 1)}
          disabled={currentPage === 1}
        >«</button>

        {[...Array(totalPages)].map((_, i) => (
          <button
            key={i}
            onClick={() => goToPage(i + 1)}
            className={currentPage === i + 1 ? 'active' : ''}
          >
            {i + 1}
          </button>
        ))}

        <button
          onClick={() => goToPage(currentPage + 1)}
          disabled={currentPage === totalPages}
        >»</button>
      </div>
    </div>
  );
}

export default Roles1;
