import React from 'react';
import './Invoices.css'; 

function Invoices({ invoices, setAddInvoicePage }) {
  function formatDate(isoDateString) {
    const date = new Date(isoDateString);
    return date.toISOString().split('T')[0];
  }

  return (
    <div className="invoices-container">
      <header className="invoices-header">
        <h2>Invoices</h2>
        <button className="new-invoice-btn" onClick={setAddInvoicePage}>+ New Invoice</button> 
      </header>
      <div className="invoices-table-container">
        <table className="invoices-table">
          <thead>
            <tr>
              <th>InvoiceID</th>
              <th>Issue Date</th>
              <th>Amount</th>
              <th>Customer Name</th>
              <th>Due Date</th>
              <th>PaymentStatus</th>
            </tr>
          </thead>
          <tbody>
            {invoices.map((invoice) => (
              <tr key={invoice.InvoiceID}>
                <td>{invoice.InvoiceID}</td>
                <td>{formatDate(invoice.Date)}</td>
                <td>${invoice.Amount.toFixed(2)}</td>
                <td>{invoice.CustomerName}</td>
                <td>{formatDate(invoice.DueDate)}</td>
                <td>{invoice.PaymentStatus}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Invoices;
