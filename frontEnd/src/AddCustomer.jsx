import React, { useState } from 'react';
import './AddCustomer.css'; 

function AddCustomer({ onClose }) {
  const [customerName, setCustomerName] = useState('');
  const [customerEmail, setCustomerEmail] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!customerName || !customerEmail) {
      setErrorMessage('Please fill in all fields');
      return;
    }

    try {
      const companyID = parseInt(localStorage.getItem('companyId'), 10);
      const response = await fetch('http://localhost:8081/create-customer', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ customerName, customerEmail, companyID }) 
      });
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Error occurred while adding the customer.');
      }

      alert('Customer added successfully');
      onClose(); 
    } catch (error) {
      setErrorMessage(error.message);
    }
  };

  return (
    <div className="add-customer-container">
      <header className="add-customer-header">
        <h2>Add New Customer</h2>
      </header>
      <form className="add-customer-form" onSubmit={handleSubmit}>
        <div className="form-field">
          <label>Customer Name:</label>
          <input
            type="text"
            value={customerName}
            onChange={(e) => setCustomerName(e.target.value)}
          />
        </div>
        <div className="form-field">
          <label>Customer Email:</label>
          <input
            type="email"
            value={customerEmail}
            onChange={(e) => setCustomerEmail(e.target.value)}
          />
        </div>
        {errorMessage && <p className="error-message">{errorMessage}</p>}
        <div className="form-actions">
          <button type="submit" className="submit-button">Submit</button>
          <button type="button" className="cancel-button" onClick={onClose}>Cancel</button>
        </div>
      </form>
    </div>
  );
}

export default AddCustomer;
