import React, { useState, useEffect } from 'react';
import './SidebarMenu.css';
import BalanceSheet from './BalanceSheet';

function SidebarMenu({ toggleBalanceSheet }) {
  const [openedDropdowns, setOpenedDropdowns] = useState([]);
  const toggleDropdown = (menuName) => {
    if (openedDropdowns.includes(menuName)) {
      setOpenedDropdowns(prev => prev.filter(item => item !== menuName));
    } else {
      setOpenedDropdowns(prev => [...prev, menuName]);
    }
  };


  const handleBalanceSheetClick = () => {
    toggleBalanceSheet(); // Call the method passed down from MainPage to toggle the Balance Sheet
    toggleDropdown('Reports');
  };

  return (
    <div className="sidebar-menu">
      <div className="sidebar-header">Menu</div>

      <div className="menu-item" onClick={() => toggleDropdown('Accountant')}>
        Accountant
        <span className={`arrow ${openedDropdowns.includes('Accountant') ? 'open' : ''}`}>►</span>
        {openedDropdowns.includes('Accountant') && (
          <div className="sub-menu">
            <div className="sub-menu-item">Manual Journals</div>
            <div className="sub-menu-item">Chart of Accounts</div>
          </div>
        )}
      </div>

      <div className="menu-item" onClick={() => toggleDropdown('Reports')}>
        Reports
        <span className={`arrow ${openedDropdowns.includes('Reports') ? 'open' : ''}`}>►</span>
        {openedDropdowns.includes('Reports') && (
          <div className="sub-menu">
            <div className="sub-menu-item" onClick={handleBalanceSheetClick}>Balance Sheet</div>
            <div className="sub-menu-item">Profit and Loss</div>
            <div className="sub-menu-item">Cash Flow Statement</div>
            <div className="sub-menu-item">Account Transactions</div>
          </div>
        )}
      </div>

      <div className="menu-item" onClick={() => toggleDropdown('Sales')}>
        Sales
        <span className={`arrow ${openedDropdowns.includes('Sales') ? 'open' : ''}`}>►</span>
        {openedDropdowns.includes('Sales') && (
          <div className="sub-menu">
            <div className="sub-menu-item">Customer</div>
            <div className="sub-menu-item">Invoices</div>
          </div>
        )}
      </div>

      <div className="menu-item" onClick={() => toggleDropdown('Purchases')}>
        Purchases
        <span className={`arrow ${openedDropdowns.includes('Purchases') ? 'open' : ''}`}>►</span>
        {openedDropdowns.includes('Purchases') && (
          <div className="sub-menu">
            <div className="sub-menu-item">Vendors</div>
            <div className="sub-menu-item">Expenses</div>
          </div>
        )}
      </div>
      
    </div>
  );
}

export default SidebarMenu;
