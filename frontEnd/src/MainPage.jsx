import React, { useState } from 'react';
import './MainPage.css';
import SidebarMenu from './SidebarMenu';
import BalanceSheet from './BalanceSheet'; 
import IncomeStatement from './IncomeStatement';
import CashFlowStatement from './CashFlowStatement';
import AccountTransactions from './AccountTransactions';
import ManualJournals from './ManualJournals';
import AddNewJournal from './AddNewJournal';
import Invoices from './Invoices';
import mainBackground from '/src/main.jfif';
import AddInvoice from './AddInvoice';
import Bills from './Bills';
import AddBill from './AddBill';
import Customers from './Customers';
import Suppliers from './Suppliers';
import AccountChart from './AccountChart';


class MainPage extends React.Component {
  


  state = {
    showAddAccountForm: false,
    currentPage: null,
    username: '',
    balanceSheetData: {
      companyName: localStorage.getItem('companyName'),
      accounts: [],
      isVip: false,
    },
    incomeStatementData: {
      companyName: localStorage.getItem('companyName'),
      accounts: []
    },
    cashFlowStatementData: { 
      companyName: localStorage.getItem('companyName'),
      cashFlows: {
        Operating: [],
        Investing: [],
        Financing: []
      }
    },
    accountTransactionsData: {
      companyName: localStorage.getItem('companyName'),
      transactions: []
    },
    invoicesData: {
      companyName: localStorage.getItem('companyName'),
      invoices: [] 
    },

    billsData: {
      companyName: localStorage.getItem('companyName'),
      bills: [] 
    },
    customersData: {
      customers: []
    },

    suppliersData: {
      customers: []
    }
  };

  

  

  

  setCurrentPage = (page) => {
    this.setState({ currentPage: page });
  };

  setAddNewJournalPage = () => {
    this.setState({ currentPage: 'addNewJournal' });
  };

  setAddInvoicePage=()=>{
    this.setState({currentPage:'AddInvoice'});
  }

  setAddBillPage=()=>{
    this.setState({currentPage:'AddBill'});
  }


  componentDidMount() {
    this.fetchBalanceSheetData();
    this.fetchIncomeStatementData();
    this.fetchCashFlowStatementData();
    this.fetchManualJournalsData();
    this.fetchUsername(); 
    this.fetchInvoicesData();
    this.fetchBillsData();

  
    const username = localStorage.getItem("username");
    const userType = localStorage.getItem("userType");
    const isVip = userType === "premium"; 
    if (username) {
      this.setState({ username, isVip });
    }
  }

  fetchUsername = () => {
    const username = localStorage.getItem('username'); 
    this.setState({ username });
  };

  handleLogout = () => {
    localStorage.clear(); 
    this.props.navigate('/signin'); 
  };

  handleUpgradeToVip = () => {
    console.log('Upgrade to VIP clicked');
    this.setState({ isVip: true });
  };

  

  fetchInvoicesData = () => {
    const companyID = parseInt(localStorage.getItem('companyId'), 10); 
    fetch(`http://localhost:8081/invoices?companyID=${companyID}`)
      .then(response => response.json())
      .then(data => {
        this.setState({
          invoicesData: {
            ...this.state.invoicesData,
            invoices: data
          }
        });
      })
      .catch(error => console.error('Fetch error:', error));
  };
  

  fetchBillsData = () => {
    const companyID = parseInt(localStorage.getItem('companyId'), 10); 
    fetch(`http://localhost:8081/bills?companyID=${companyID}`)
      .then(response => response.json())
      .then(data => {
        this.setState({
          billsData: {
            ...this.state.billsData,
            bills: data
          }
        });
      })
      .catch(error => console.error('Fetch error:', error));
  };
  
  
  

  

  fetchManualJournalsData = () => {
    const companyID = parseInt(localStorage.getItem('companyId'), 10); 
  
    fetch(`http://localhost:8081/manual-journals?companyID=${companyID}`)
      .then(response => response.json())
      .then(data => {
        this.setState({
          manualJournalsData: {
            ...this.state.manualJournalsData,
            journals: data
          }
        });
      })
      .catch(error => console.error('Fetch error:', error));
  };
  

  fetchBalanceSheetData = () => {
    const companyId = parseInt(localStorage.getItem('companyId'), 10); 
    fetch(`http://localhost:8081/balance-sheet?companyID=${companyId}`)
      .then(response => response.json())
      .then(data => {
        this.setState(prevState => ({
          balanceSheetData: {
            ...prevState.balanceSheetData,
            accounts: data
          }
        }));
      })
      .catch(error => console.error('Fetch error:', error));
  };
  

  fetchIncomeStatementData = () => {
    const companyId = parseInt(localStorage.getItem('companyId'), 10);
    fetch(`http://localhost:8081/income-statement?companyID=${companyId}`)
      .then(response => response.json())
      .then(data => {
        this.setState(prevState => ({
          incomeStatementData: {
            ...prevState.incomeStatementData,
            accounts: data
          }
        }));
      })
      .catch(error => console.error('Fetch error:', error));
  };

  fetchCashFlowStatementData = () => {
    fetch('http://localhost:8081/cash-flow-statement')
      .then(response => response.json())
      .then(data => {
        this.setState(prevState => ({
          cashFlowStatementData: {
            ...prevState.cashFlowStatementData,
            cashFlows: data
          }
        }));
      })
      .catch(error => console.error('Fetch error:', error));
  };

  fetchAccountTransactionsData = () => {
    const companyID =parseInt(localStorage.getItem('companyId'),10) ; 
    console.log(companyID);
    fetch(`http://localhost:8081/account-transactions?companyID=${companyID}`)
      .then(response => response.json())
      .then(data => {
        this.setState({
          accountTransactionsData: {
            ...this.state.accountTransactionsData,
            transactions: data
          }
        });
      })
      .catch(error => console.error('Fetch error:', error));
  };
  
  
  render() {

    const userId = localStorage.getItem('userId');
    const userType = localStorage.getItem('userType');

    const { currentPage, balanceSheetData, incomeStatementData, cashFlowStatementData, accountTransactionsData, username, isVip, manualJournalsData, invoicesData, billsData, customersData, suppliersData } = this.state;
    const welcomeMessage = username ? `Welcome, ${username}! You are currently logged in as a ${isVip ? 'premium' : 'normal'} user.` : 'Welcome! Please sign in.';


    return (
        <div className="main-container">
            <header className="main-header">
                <h1>Financial Management</h1>
                
                <div className="user-info">
                <span>{welcomeMessage}</span>
          {isVip && <span className="vip-icon-upgraded">🌟</span>} 
          <button onClick={this.handleLogout} className="logout-button">Log Out</button>
                </div>
            </header>
        <aside className="sidebar">
        <SidebarMenu setCurrentPage={this.setCurrentPage} userId={userId} userType={userType} />
        </aside>
        <section className="content">
            {currentPage === 'balanceSheet' && <BalanceSheet {...balanceSheetData} />}
            {currentPage === 'incomeStatement' && <IncomeStatement {...incomeStatementData} />}
            {currentPage === 'cashFlowStatement' && <CashFlowStatement {...cashFlowStatementData} />}
            {currentPage === 'accountTransactions' && <AccountTransactions {...accountTransactionsData} />}
            {currentPage === 'manualJournals' && <ManualJournals {...manualJournalsData} setAddNewJournalPage={this.setAddNewJournalPage}/>}
            {currentPage === 'addNewJournal' && <AddNewJournal />}
            {currentPage === 'invoices' && <Invoices {...invoicesData} setAddInvoicePage={this.setAddInvoicePage} />}
            {currentPage === 'bills' && <Bills {...billsData} setAddBillPage={this.setAddBillPage} />}
            {currentPage==='AddInvoice'&&<AddInvoice />}
            {currentPage==='AddBill'&&<AddBill />}
            {currentPage === 'customers' && <Customers {...customersData} />}
            {currentPage === 'suppliers' && <Suppliers {...suppliersData} />}
            {currentPage === 'accountChart' && <AccountChart />}
            {currentPage === null && <p>Welcome to the main page!</p>}
        </section>
      </div>
    );
  }
}

export default MainPage;
