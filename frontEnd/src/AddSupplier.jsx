import React, { useState } from 'react';
import './AddCustomer.css'; 

function AddSupplier({ onClose }) {
  const [supplierName, setSupplierName] = useState('');
  const [supplierEmail, setSupplierEmail] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!supplierName || !supplierEmail) {
      setErrorMessage('Please fill in all fields');
      return;
    }

    try {
      const companyID = parseInt(localStorage.getItem('companyId'), 10); // Retrieve companyID from localStorage
      const response = await fetch('http://localhost:8081/create-supplier', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ supplierName, supplierEmail, companyID }) // Include companyID in the request body
      });
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Error occurred while adding the customer.');
      }

      alert('Supplier added successfully');
      onClose(); // Close the AddCustomer form
    } catch (error) {
      setErrorMessage(error.message);
    }
  };

  return (
    <div className="add-customer-container">
      <header className="add-customer-header">
        <h2>Add New Supplier</h2>
      </header>
      <form className="add-customer-form" onSubmit={handleSubmit}>
        <div className="form-field">
          <label>Supplier Name:</label>
          <input
            type="text"
            value={supplierName}
            onChange={(e) => setSupplierName(e.target.value)}
          />
        </div>
        <div className="form-field">
          <label>Supplier Email:</label>
          <input
            type="email"
            value={supplierEmail}
            onChange={(e) => setSupplierEmail(e.target.value)}
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

export default AddSupplier;
