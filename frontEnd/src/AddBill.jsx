import React, { useState, useEffect } from 'react';
import './AddInvoice.css'; // This CSS file will need to be created

const initialBillItem = { item: '', amount: 0 };

function AddBill() {
  const [billItems, setBillItems] = useState([initialBillItem]);
  const [issueDate, setIssueDate] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [selectedSupplier, setSelectedSupplier] = useState({});
  const [note, setNote] = useState('');
  const [totalAmount, setTotalAmount] = useState(0);

  const [errorMessage, setErrorMessage] = useState('');
const [successMessage, setSuccessMessage] = useState('');
const [suppliers, setSuppliers] = useState([]);
const [accountIds, setAccountIds] = useState({});


useEffect(() => {
  const companyID = parseInt(localStorage.getItem('companyId'), 10); // Retrieve companyID from localStorage
  fetch(`http://localhost:8081/suppliers?companyID=${companyID}`)
    .then(response => response.json())
    .then(data => {
      setSuppliers(data);
    })
    .catch(error => console.error('Error fetching suppliers:', error));

    fetch(`http://localhost:8081/bill-account-ids?companyID=${companyID}`)
      .then(response => response.json())
      .then(data => setAccountIds(data))
      .catch(error => console.error('Error fetching account IDs:', error));
}, []);



  const handleAddItem = () => {
    setBillItems([...billItems, initialBillItem]);
  };

  const handleItemChange = (index, column, value) => {
    const updatedItems = billItems.map((item, i) => {
      if (index === i) {
        return { ...item, [column]: value };
      }
      return item;
    });
    setBillItems(updatedItems);
  
    if (column === 'amount') {
      const newTotal = updatedItems.reduce((total, currentItem) => total + Number(currentItem.amount || 0), 0);
      setTotalAmount(newTotal);
    }
  };
  
  const handleSupplierChange = (e) => {
    const supplier = JSON.parse(e.target.value);
    setSelectedSupplier(supplier);
  };
  

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payableAccountId = accountIds["Account Payable"];
    const expenseAccountId = accountIds["Expense"];
  
  
    const billData = {
      issueDate: issueDate,
      dueDate: dueDate,
      supplierID: selectedSupplier.SupplierID,
      note: note,
      expenseAccountId: expenseAccountId,
      billItems: billItems.flatMap(item => ([
        {
          AccountID: payableAccountId, 
          Date: issueDate,
          Amount: item.amount,
          Description: note
        },
        {
          AccountID: expenseAccountId, 
          Date: issueDate,
          Amount: item.amount,
          Description: note
        }
      ]))
    };
  
    try {
      const response = await fetch('http://localhost:8081/add-bill-transactions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(billData)
      });
  
      const data = await response.json();
      if (!response.ok) throw new Error(data.message || 'Error occurred while adding the bill.');
      
      setBillItems([initialBillItem]);
      setIssueDate('');
      setDueDate('');
      setSelectedSupplier({});
      setNote('');
      setTotalAmount(0);
      setSuccessMessage('Bill added successfully.');
      setErrorMessage('');
    } catch (error) {
      setErrorMessage(error.message);
      setSuccessMessage('');
    }
  };
  
  
  

  const handleCancel = () => {
    // Cancel logic here
  };

  return (
    <div className="add-invoice-container">
      <header className="add-invoice-header">
        <h2>Add New Bill</h2>
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
      <label htmlFor="supplier">Supplier:</label>
      <select
        id="supplier"
        value={JSON.stringify(selectedSupplier)}
        onChange={handleSupplierChange}
        required
      >
        <option value="">Select Supplier</option>
        {suppliers.map(supplier => (
          <option key={supplier.SupplierID} value={JSON.stringify(supplier)}>
            {supplier.SupplierName}
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
        <th>Bill Item</th>
        <th>Amount</th>
      </tr>
    </thead>
    <tbody>
  {billItems.map((item, index) => (
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

export default AddBill;
