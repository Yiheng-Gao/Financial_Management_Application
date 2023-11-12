// BalanceSheet.js
import React from 'react';
import './BalanceSheet.css'; // Ensure your styles are being applied correctly

function BalanceSheet({ companyName, accounts }) {
  return (
    <div className="balance-sheet-container">
      <h1>{companyName} Balance Sheet</h1>
      <div className="basis-and-date">
        <p>Basis: Accrual</p>
        <p>As of 2023/11/10</p>
      </div>
      <table>
        <thead>
          <tr>
            <th>ACCOUNT</th>
            <th>TOTAL</th>
          </tr>
        </thead>
        <tbody>
          {accounts.map(account => (
            <tr key={account.name}>
              <td>{account.name}</td>
              <td>${account.total.toLocaleString()}</td> {/* Format number as currency */}
            </tr>
          ))}
        </tbody>
      </table>
      <div className="add-temp-note-btn">
        <button>+ Add Temporary Note</button>
      </div>
    </div>
  );
}

export default BalanceSheet;
