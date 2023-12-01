import React, { useState, useEffect } from 'react';
import './AddInvoice.css'; 

const initialInvoiceItem = { item: '', amount: 0 };

function AddInvoice() {
  const [invoiceItems, setInvoiceItems] = useState([initialInvoiceItem]);
  const [issueDate, setIssueDate] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [selectedCustomer, setSelectedCustomer] = useState({});
  const [note, setNote] = useState('');
  const [totalAmount, setTotalAmount] = useState(0);

  const [errorMessage, setErrorMessage] = useState('');
const [successMessage, setSuccessMessage] = useState('');
const [customers, setCustomers] = useState([]);
const [accountIds, setAccountIds] = useState({});


useEffect(() => {
  const companyID = parseInt(localStorage.getItem('companyId'), 10); 
  fetch(`http://localhost:8081/customers?companyID=${companyID}`)
    .then(response => response.json())
    .then(data => {
      setCustomers(data);
    })
    .catch(error => console.error('Error fetching customers:', error));

    fetch(`http://localhost:8081/account-ids?companyID=${companyID}`)
      .then(response => response.json())
      .then(data => {
        setAccountIds(data);
      })
      .catch(error => console.error('Error fetching account IDs:', error));
}, []);



  const handleAddItem = () => {
    setInvoiceItems([...invoiceItems, initialInvoiceItem]);
  };

  const handleItemChange = (index, column, value) => {
    const updatedItems = invoiceItems.map((item, i) => {
      if (index === i) {
        return { ...item, [column]: value };
      }
      return item;
    });
    setInvoiceItems(updatedItems);
  
    if (column === 'amount') {
      const newTotal = updatedItems.reduce((total, currentItem) => total + Number(currentItem.amount || 0), 0);
      setTotalAmount(newTotal);
    }
  };
  
  const handleCustomerChange = (e) => {
    const customer = JSON.parse(e.target.value);
    setSelectedCustomer(customer);
  };
  

  const handleSubmit = async (e) => {
    e.preventDefault();
    const accountReceivableId = accountIds['Account Receivable'];
    const revenueAccountId = accountIds['Revenue'];
  
 
    const invoiceData = {
      issueDate: issueDate,
      dueDate: dueDate,
      customerID: selectedCustomer.CustomerID,
      note: note,
      revenueAccountId: revenueAccountId,
      invoiceItems: invoiceItems.flatMap(item => ([
        {
          AccountID: accountReceivableId, 
          Date: issueDate,
          Amount: item.amount,
          Description: note
        },
        {
          AccountID: revenueAccountId, 
          Date: issueDate,
          Amount: item.amount,
          Description: note
        }
      ]))
    };
  
    try {
      const response = await fetch('http://localhost:8081/add-invoice-transactions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(invoiceData)
      });
  
      const data = await response.json();
      if (!response.ok) throw new Error(data.message || 'Error occurred while adding the invoice.');
      
      setInvoiceItems([initialInvoiceItem]);
      setIssueDate('');
      setDueDate('');
      setSelectedCustomer({});
      setNote('');
      setTotalAmount(0);
      setSuccessMessage('Invoice added successfully.');
      setErrorMessage('');
    } catch (error) {
      setErrorMessage(error.message);
      setSuccessMessage('');
    }
  };
  
  
  

  const handleCancel = () => {
  };

  return (
    <div className="add-invoice-container">
      <header className="add-invoice-header">
        <h2>Add New Invoice</h2>
      </header>
      <form className="add-invoice-form" onSubmit={handleSubmit}>
  <div className="add-invoice-metadata">
    <div className="add-invoice-metadata-field">
      <label htmlFor="issueDate">Issue Date:</label>
      <input
        type="date"
        id="issueDate"
        value={issueDate}
        onChange={(e) => setIssueDate(e.target.value)}
      />
    </div>
    <div className="add-invoice-metadata-field">
      <label htmlFor="dueDate">Due Date:</label>
      <input
        type="date"
        id="dueDate"
        value={dueDate}
        onChange={(e) => setDueDate(e.target.value)}
      />
    </div>
    
    <div className="add-invoice-metadata-field">
      <label htmlFor="customer">Customer:</label>
      <select
        id="customer"
        value={JSON.stringify(selectedCustomer)}
        onChange={handleCustomerChange}
        required
      >
        <option value="">Select Customer</option>
        {customers.map(customer => (
          <option key={customer.CustomerID} value={JSON.stringify(customer)}>
            {customer.CustomerName}
          </option>
        ))}
      </select>

    </div>

    <div className="add-invoice-metadata-field">
      <label htmlFor="note">Note:</label>
      <input
        type="text"
        id="note"
        value={note}
        onChange={(e) => setNote(e.target.value)}
      />
    </div>
  </div>
  <table className="add-invoice-table">
    <thead>
      <tr>
        <th>Invoice Item</th>
        <th>Amount</th>
      </tr>
    </thead>
    <tbody>
  {invoiceItems.map((item, index) => (
    <tr key={index}>
      <td>
        <input
          type="text"
          value={item.item}
          onChange={(e) => handleItemChange(index, 'item', e.target.value)}
        />
      </td>
      <td>
        <input
          type="number"
          value={item.amount}
          onChange={(e) => handleItemChange(index, 'amount', e.target.value)}
        />
      </td>
    </tr>
  ))}
</tbody>

    <tfoot>
      <tr>
        <td>Total</td>
        <td>${totalAmount.toFixed(2)}</td>
      </tr>
    </tfoot>
  </table>
  <div className="form-actions">
    <button type="button" className="add-item-button" onClick={handleAddItem}>Add New Item</button>
    <button type="submit" className="submit-button">Submit</button>
    <button type="button" className="cancel-button" onClick={handleCancel}>Cancel</button>
  </div>
  {errorMessage && <p className="error-message">{errorMessage}</p>}
  {successMessage && <p className="success-message">{successMessage}</p>}
</form>

    </div>
  );
}

export default AddInvoice;
