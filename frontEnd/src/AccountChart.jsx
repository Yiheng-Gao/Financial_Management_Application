import React, { useState, useEffect } from 'react';
import './AccountChart.css'; // CSS for AccountChart
import AddAccount from './AddAccount';

function AccountChart() {
  const [accounts, setAccounts] = useState([]);
  const [showAddForm, setShowAddForm] = useState(false);

  useEffect(() => {
    fetchAccounts();
  }, []);

  const fetchAccounts = () => {
    const companyID = parseInt(localStorage.getItem('companyId'), 10); // Retrieve companyID from localStorage

    fetch(`http://localhost:8081/account-chart?companyID=${companyID}`)
      .then(response => response.json())
      .then(data => setAccounts(data))
      .catch(error => console.error('Error fetching accounts:', error));
  };

  const handleAddAccount = (accountData) => {
    fetch('http://localhost:8081/add-account', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(accountData)
    })
    .then(response => {
      if (!response.ok) {
        return response.json().then(data => Promise.reject(new Error(data.message || 'Error occurred while adding the account.')));
      }
      return response.json();
    })
    .then(data => {
      alert('Account added successfully');
      setShowAddForm(false);
      fetchAccounts(); 
    })
    .catch(error => {
      console.error('Error adding account:', error);
      alert('Error adding account');
    });
  };
  

  return (
    <div className="account-chart-container">
      <header className="account-chart-header">
        <h2>Accounts Chart</h2>
        <button className="new-account-btn" onClick={() => setShowAddForm(true)}>+ Add Account</button>
      </header>
      {showAddForm ? (
        <AddAccount onSave={handleAddAccount} onClose={() => setShowAddForm(false)} />
      ) : (
      <table className="account-chart-table">
        <thead>
          <tr>
            <th>Account ID</th>
            <th>Account Name</th>
            <th>Account Type</th>
          </tr>
        </thead>
        <tbody>
          {accounts.map((account, index) => (
            <tr key={index}>
              <td>{account.AccountID}</td>
              <td>{account.AccountName}</td>
              <td>{account.AccountTypeName}</td>
            </tr>
          ))}
        </tbody>
      </table>
      )}
    </div>
  );
}

export default AccountChart;
