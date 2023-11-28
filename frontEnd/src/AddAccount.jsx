import React, { useState } from 'react';
import './AddAccount.css'; // Ensure you have the CSS file

function AddAccount({ onSave, onClose }) {
  const [accountName, setAccountName] = useState('');
  const [accountType, setAccountType] = useState('');
  const [accountNote, setAccountNote] = useState('');

  const accountTypeToID = {
    'Asset': 1,
    'Liability': 2,
    'Expense': 3,
    'Revenue': 4,
    'Equity': 5
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const accountTypeID = accountTypeToID[accountType] || null;
    if (!accountName || !accountTypeID) {
      alert('Please fill in all fields correctly');
      return;
    }

    const companyID = parseInt(localStorage.getItem('companyId'), 10);

    const accountData = {
      accountTypeID,
      companyID: companyID,
      accountName,
      accountNote
    };

    onSave(accountData);
  };

  return (
    <div className="add-account-container">
      <header className="add-account-header">
        <h2>Add New Account</h2>
      </header>
      <form className="add-account-form" onSubmit={handleSubmit}>
        <div className="form-field">
          <label>Account Name:</label>
          <input
            type="text"
            value={accountName}
            onChange={(e) => setAccountName(e.target.value)}
          />
        </div>
        <div className="form-field">
          <label>Account Type:</label>
          <select
            value={accountType}
            onChange={(e) => setAccountType(e.target.value)}
          >
            <option value="">Select Type</option>
            <option value="Asset">Asset</option>
            <option value="Liability">Liability</option>
            <option value="Expense">Expense</option>
            <option value="Revenue">Revenue</option>
            <option value="Equity">Equity</option>
          </select>
        </div>
        <div className="form-field">
          <label>Account Note:</label>
          <textarea
            value={accountNote}
            onChange={(e) => setAccountNote(e.target.value)}
          ></textarea>
        </div>
        <div className="form-actions">
          <button type="submit" className="submit-button">Submit</button>
          <button type="button" className="cancel-button" onClick={onClose}>Cancel</button>
        </div>
      </form>
    </div>
  );
}

export default AddAccount;
