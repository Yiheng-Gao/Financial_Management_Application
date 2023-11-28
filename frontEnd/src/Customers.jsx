import React, { useState, useEffect } from 'react';
import './Customers.css';
import AddCustomer from './AddCustomer';

function Customers() {
  const [customers, setCustomers] = useState([]);
  const [showAddForm, setShowAddForm] = useState(false);

  useEffect(() => {
    const companyID = parseInt(localStorage.getItem('companyId'), 10); // Retrieve companyID from localStorage
  
    fetch(`http://localhost:8081/customers-page?companyID=${companyID}`)
      .then(response => response.json())
      .then(data => setCustomers(data))
      .catch(error => console.error('Error fetching customers:', error));
  }, []);
  
  return (
    <div className="customers-container">
      <header className="customers-header">
        <h2>Customers</h2>
        <button className="new-customer-btn" onClick={() => setShowAddForm(true)}>+ Add Customer</button>
      </header>
      {showAddForm ? (
        <AddCustomer onClose={() => { setShowAddForm(false); fetchCustomers(); }} />
      ) : (
        <table className="customers-table">
          <thead>
            <tr>
              <th>Customer ID</th>
              <th>Customer Name</th>
              <th>Customer Contact</th>
            </tr>
          </thead>
          <tbody>
            {customers.map((customer, index) => (
              <tr key={index}>
                <td>{customer.CustomerID}</td>
                <td>{customer.CustomerName}</td>
                <td>{customer.CustomerEmail}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default Customers;
