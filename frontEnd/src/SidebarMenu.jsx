import React, { useState, useEffect } from 'react';
import './SidebarMenu.css';
import BalanceSheet from './BalanceSheet';
import CashFlowStatement from './CashFlowStatement';
import lockIcon from './lock-icon.gif';


function SidebarMenu({ setCurrentPage, userType, userId }) {
  const [openedDropdowns, setOpenedDropdowns] = useState([]);
  const [isPremium, setIsPremium] = useState(userType === 'premium');

  const toggleDropdown = (menuName) => {
    if (openedDropdowns.includes(menuName)) {
      setOpenedDropdowns(prev => prev.filter(item => item !== menuName));
    } else {
      setOpenedDropdowns(prev => [...prev, menuName]);
    }
  };

  const handleManualJournalsClick = () => {
    setCurrentPage('manualJournals'); // Make sure 'manualJournals' matches the identifier used in MainPage.jsx
    toggleDropdown('Accountant');
  };

  const handleBalanceSheetClick = () => {
    setCurrentPage('balanceSheet');
    toggleDropdown('Reports');
  };

  const handleIncomeStatementClick = () => {
    setCurrentPage('incomeStatement');
    toggleDropdown('Reports');
  };

  const handleCashFlowStatementClick = () => {
    setCurrentPage('cashFlowStatement');
    toggleDropdown('Reports');
  };

  const handleAccountTransactionsClick = () => {
    setCurrentPage('accountTransactions'); // This should match the identifier used in MainPage.jsx
    toggleDropdown('Reports');
  };

  const handleInvoicesClick = () => {
    setCurrentPage('invoices');
    toggleDropdown('Sales');
  };

  const handleBillsClick = () => {
    setCurrentPage('bills');
    toggleDropdown('Purchases');
  };

  const handleCustomersClick = () => {
    setCurrentPage('customers');
    toggleDropdown('Sales');
  };

  const handleSuppliersClick = () => {
    setCurrentPage('suppliers');
    toggleDropdown('Sales');
  };
  

  const handleUpgradePrompt = () => {
    const wantsToUpgrade = window.confirm("Do you want to become a premium member?");
    if (wantsToUpgrade) {
      // Ensure you get the userId from props or local storage
      const userId = localStorage.getItem("userId");
  
      fetch("http://localhost:8081/api/upgrade-to-premium", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId }), // Send userId in the request body
      })
        .then((response) => {
          if (!response.ok) {
            // If the HTTP status code is not 2xx, throw an error to be caught by the catch block
            throw new Error(`Server responded with status: ${response.status}`);
          }
          return response.json();
        })
        .then((data) => {
          console.log("Upgrade process here", data);
          setIsPremium(true); // Update the state to reflect the premium status
          localStorage.setItem('userType', 'premium'); // Update userType in localStorage
          alert("You are now a premium member!");
        })
        .catch((error) => {
          console.error("Error upgrading to premium:", error);
          alert("There was a problem upgrading your account. " + error.message);
        });
    }
  };
 
  

  const handleChartOfAccountsClick = () => {
    setCurrentPage('accountChart');
    toggleDropdown('Accountant');
  };


  return (
    <div className="sidebar-menu">
      <div className="sidebar-header">Menu</div>

      <div className="menu-item" onClick={() => toggleDropdown('Accountant')}>
        Accountant
        <span className={`arrow ${openedDropdowns.includes('Accountant') ? 'open' : ''}`}>►</span>
        {openedDropdowns.includes('Accountant') && (
          <div className="sub-menu">
            <div className="sub-menu-item" onClick={handleManualJournalsClick}>Manual Journals</div>
            <div className="sub-menu-item" onClick={handleChartOfAccountsClick}>Chart of Accounts</div>
          </div>
        )}
      </div>

      <div className="menu-item" onClick={() => toggleDropdown('Reports')}>
        Reports
        <span className={`arrow ${openedDropdowns.includes('Reports') ? 'open' : ''}`}>►</span>
        {openedDropdowns.includes('Reports') && (
          <div className="sub-menu">
            <div className="sub-menu-item" onClick={handleBalanceSheetClick}>Balance Sheet</div>
            <div className="sub-menu-item" onClick={handleIncomeStatementClick}>Income Statement</div>
            {/* <div className="sub-menu-item" onClick={handleCashFlowStatementClick}>Cash Flow Statement</div> */}
            <div className="sub-menu-item" onClick={handleAccountTransactionsClick}>Transaction Sheet</div>
          </div>
        )}
      </div>

      <div className="menu-item">
        Sales

        {isPremium ? (
          <span className={`arrow ${openedDropdowns.includes('Sales') ? 'open' : ''}`} onClick={() => toggleDropdown('Sales')}>►</span>
        ) : (
          <img src={lockIcon} alt="Locked" className="lock-icon" onClick={handleUpgradePrompt} />

        )}{openedDropdowns.includes('Sales') && (
          <div className="sub-menu">
            <div className="sub-menu-item" onClick={handleCustomersClick}>Customer</div>
            <div className="sub-menu-item" onClick={handleInvoicesClick}>Invoices</div>
          </div>

        )}
      </div>
      <div className="menu-item">
        Purchases

        {isPremium ? (
          <span className={`arrow ${openedDropdowns.includes('Purchases') ? 'open' : ''}`} onClick={() => toggleDropdown('Purchases')}>►</span>
        ) : (
          <img src={lockIcon} alt="Locked" className="lock-icon" onClick={handleUpgradePrompt} />
        
        )}{openedDropdowns.includes('Purchases') && (
          <div className="sub-menu">
            <div className="sub-menu-item" onClick={handleSuppliersClick}>Supplier</div>
            <div className="sub-menu-item" onClick={handleBillsClick}>Bills</div>
          </div>

        )}
      </div>
      
    </div>
  );
}

export default SidebarMenu;
