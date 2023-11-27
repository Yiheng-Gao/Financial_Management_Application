import React from 'react';
import './Invoices.css'; // You can use the same styles as ManualJournals.css if they are similar

function Bills({ bills, setAddBillPage }) {
  function formatDate(isoDateString) {
    const date = new Date(isoDateString);
    return date.toISOString().split('T')[0];
  }

  return (
    <div className="invoices-container">
      <header className="invoices-header">
        <h2>Bills</h2>
        <button className="new-invoice-btn" onClick={setAddBillPage}>+ New Bill</button> 
      </header>
      <div className="invoices-table-container">
        <table className="invoices-table">
          <thead>
            <tr>
              <th>Bill ID</th>
              <th>Issue Date</th>
              <th>Amount</th>
              <th>Supplier Name</th>
              <th>Due Date</th>
              <th>PaymentStatus</th>
            </tr>
          </thead>
          <tbody>
            {bills.map((bill) => (
              <tr key={bill.BillID}>
                <td>{bill.BillID}</td>
                <td>{formatDate(bill.Date)}</td>
                <td>${bill.Amount.toFixed(2)}</td>
                <td>{bill.SupplierName}</td>
                <td>{formatDate(bill.DueDate)}</td>
                <td>{bill.PaymentStatus}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Bills;
