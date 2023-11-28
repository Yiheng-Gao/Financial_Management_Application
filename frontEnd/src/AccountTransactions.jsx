import React, { useState, useEffect } from 'react';
import './AccountTransactions.css';

function AccountTransactions({ companyName }) {
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    const companyID = parseInt(localStorage.getItem('companyId'), 10);
    fetch(`http://localhost:8081/account-transactions?companyID=${companyID}`)
      .then(response => response.json())
      .then(data => {
        const formattedTransactions = data.map(transaction => formatTransactionRow(transaction));
        setTransactions(formattedTransactions);
  
        // Calculate totals
        let totalDebit = 0;
        let totalCredit = 0;
        formattedTransactions.forEach((transaction) => {
          totalDebit += transaction.debit;
          totalCredit += transaction.credit;
        });
  
        setTotalDebit(totalDebit);
        setTotalCredit(totalCredit);
      })
      .catch(error => console.error('Error fetching transactions:', error));
  }, []);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toISOString().split('T')[0]; // Converts to yyyy-mm-dd format
  };

  const formatTransactionRow = (transaction) => {
    let debit = 0;
    let credit = 0; 
    const formattedDate = formatDate(transaction.Date);
  
    if (transaction.AccountTypeName === 'Asset' || transaction.AccountTypeName === 'Expense') {
      if (transaction.Amount >= 0) {
        debit = transaction.Amount;
      } else {
        credit = -transaction.Amount; // Convert to positive for display
      }
    } else if (transaction.AccountTypeName === 'Liability' || transaction.AccountTypeName === 'Equity' || transaction.AccountTypeName === 'Revenue') {
      if (transaction.Amount >= 0) {
        credit = transaction.Amount;
      } else {
        debit = -transaction.Amount; // Convert to positive for display
      }
    }
  
    return {
      ...transaction,
      Date: formattedDate,
      debit: parseFloat(debit),
    credit: parseFloat(credit)
    };
  };


  let totalDebit = 0;
  let totalCredit = 0;

  transactions.forEach((transaction) => {
    if (transaction.debit) totalDebit += parseFloat(transaction.debit);
    if (transaction.credit) totalCredit += parseFloat(transaction.credit);
  });
  

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
            <th>TRANSACTION#</th>
            <th>DATE</th>
            <th>ACCOUNT</th>
            <th>ACCOUNT TYPE</th>
            <th>TRANSACTION DETAILS</th>
            <th>DEBIT</th>
            <th>CREDIT</th>
          </tr>
        </thead>
        <tbody>
          {transactions.length > 0 ? (
            transactions.map((transaction, index) => {
              const formattedTransaction = formatTransactionRow(transaction);
              return (
                <tr key={index}>
                  <td>{formattedTransaction.TransactionID}</td>
                  <td>{formattedTransaction.Date}</td>
                  <td>{formattedTransaction.AccountName}</td>
                  <td>{formattedTransaction.AccountTypeName}</td>
                  <td>{formattedTransaction.Description}</td>
                  <td>{formattedTransaction.debit}</td>
                  <td>{formattedTransaction.credit}</td>
                </tr>
              );
            })
          ) : (
            <tr>
              <td colSpan="7">No data to display</td>
            </tr>
          )}
        </tbody>
        <tfoot>
          <tr>
            <th colSpan="5">Total:</th>
            <th>{totalDebit.toFixed(2)}</th>
            <th>{totalCredit.toFixed(2)}</th>
          </tr>
        </tfoot>
      </table>
      <div className="add-temp-note-btn">
        <button>+ Add Temporary Note</button>
      </div>
    </div>
  );
}

export default AccountTransactions;
