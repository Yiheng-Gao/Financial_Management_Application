// BalanceSheet.js
import React from 'react';
import './BalanceSheet.css'; // Ensure your styles are being applied correctly

function BalanceSheet({ companyName, accounts }) {
  const groupedAccounts = accounts.reduce((acc, account) => {
    acc[account.AccountTypeName] = acc[account.AccountTypeName] || [];
    acc[account.AccountTypeName].push(account);
    return acc;
  }, {});

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
          <th>Account type</th>
            <th>ACCOUNT</th>
            <th>TOTAL</th>
          </tr>
        </thead>
        <tbody>
        {Object.entries(groupedAccounts).map(([type, accounts]) => (
            <React.Fragment key={type}>
              <tr className="account-type-header">
                <td colSpan="3">{type}</td>
              </tr>
              {accounts.map(account => (
                <tr key={account.AccountName}>
                  <td></td>
                  <td>{account.AccountName}</td>
                  <td>${account.acctotalamount.toLocaleString()}</td>
                </tr>
              ))}
            </React.Fragment>
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
