import React from 'react';
import './AccountTransactions.css';

function AccountTransactions({ companyName, transactions }) {
  return (
    <div className="account-transactions-container">
      <h1>{companyName} Account Transactions</h1>
      <div className="account-transactions-basis">
        <p>Basis: Accrual</p>
        <p>From 2023-11-01 To 2023-11-30</p>
      </div>
      <table className="account-transactions-table">
        <thead>
          <tr>
            <th>DATE</th>
            <th>ACCOUNT</th>
            <th>TRANSACTION DETAILS</th>
            <th>TRANSACTION TYPE</th>
            <th>TRANSACTION#</th>
            <th>REFERENCE#</th>
            <th>DEBIT</th>
            <th>CREDIT</th>
            <th>AMOUNT</th>
          </tr>
        </thead>
        <tbody>
          {transactions.length > 0 ? (
            transactions.map((transaction, index) => (
              <tr key={index}>
                <td>{transaction.date}</td>
                <td>{transaction.account}</td>
                <td>{transaction.details}</td>
                <td>{transaction.type}</td>
                <td>{transaction.transactionNumber}</td>
                <td>{transaction.referenceNumber}</td>
                <td>{transaction.debit}</td>
                <td>{transaction.credit}</td>
                <td>{transaction.amount}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="9">No data to display</td>
            </tr>
          )}
        </tbody>
      </table>
      <div className="add-temp-note-btn">
        <button>+ Add Temporary Note</button>
      </div>
    </div>
  );
}

export default AccountTransactions;
