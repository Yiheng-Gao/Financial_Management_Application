import React, { useState, useEffect } from 'react';
import './Customers.css';
import AddSupplier from './AddSupplier';

function Suppliers() {
  const [suppliers, setSuppliers] = useState([]);
  const [showAddForm, setShowAddForm] = useState(false);

  useEffect(() => {
    const companyID = parseInt(localStorage.getItem('companyId'), 10); // Retrieve companyID from localStorage
  
    fetch(`http://localhost:8081/suppliers-page?companyID=${companyID}`)
      .then(response => response.json())
      .then(data => setSuppliers(data))
      .catch(error => console.error('Error fetching suppliers:', error));
  }, []);
  

  return (
    <div className="customers-container">
      <header className="customers-header">
        <h2>Suppliers</h2>
        <button className="new-customer-btn" onClick={() => setShowAddForm(true)}>+ Add Supplier</button>
      </header>
      {showAddForm ? (
        <AddSupplier onClose={() => { setShowAddForm(false); fetchCustomers(); }} />
      ) : (
      <table className="customers-table">
        <thead>
          <tr>
            <th>Supplier ID</th>
            <th>Supplier Name</th>
            <th>Supplier Contact</th>
          </tr>
        </thead>
        <tbody>
          {suppliers.map((supplier, index) => (
            <tr key={index}>
              <td>{supplier.SupplierID}</td>
              <td>{supplier.SupplierName}</td>
              <td>{supplier.SupplierEmail}</td>
            </tr>
          ))}
        </tbody>
      </table>
      )}
    </div>
  );
}

export default Suppliers;
