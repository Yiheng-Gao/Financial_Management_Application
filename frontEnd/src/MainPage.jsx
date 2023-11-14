import React from 'react';
import './MainPage.css';
import SidebarMenu from './SidebarMenu';
import BalanceSheet from './BalanceSheet'; 
import IncomeStatement from './IncomeStatement';
import CashFlowStatement from './CashFlowStatement';
import AccountTransactions from './AccountTransactions';

class MainPage extends React.Component {
  state = {
    currentPage: null,
    username: '',
    balanceSheetData: {
      companyName: 'abc inc',
      accounts: [],
      isVip: false,
    },
    incomeStatementData: {
      companyName: 'abc inc',
      accounts: []
    },
    cashFlowStatementData: { 
      companyName: 'abc inc',
      cashFlows: {
        Operating: [],
        Investing: [],
        Financing: []
      }
    },
    accountTransactionsData: {
      companyName: 'abc inc',
      transactions: []
    },
  };

  setCurrentPage = (page) => {
    this.setState({ currentPage: page });
  };

  // Method to toggle the Balance Sheet
  toggleBalanceSheet = () => {
    this.setState(prevState => ({
      showBalanceSheet: !prevState.showBalanceSheet,
      showIncomeStatement: false
    }));
  };

  toggleIncomeStatement = () => {
    this.setState(prevState => ({
      showIncomeStatement: !prevState.showIncomeStatement,
      showBalanceSheet: false
    }));
  };

  toggleCashFlowStatement = () => {
    this.setState(prevState => ({
      showCashFlowStatement: !prevState.showCashFlowStatement,
      showBalanceSheet: false,
      showIncomeStatement: false
    }));
  };

  toggleAccountTransactions = () => {
    this.setState(prevState => ({
      showCashFlowStatement: !prevState.showCashFlowStatement,
      showBalanceSheet: false,
      showIncomeStatement: false,
      showCashFlowStatement: false
    }));
  };
  

  componentDidMount() {
    this.fetchBalanceSheetData();
    this.fetchIncomeStatementData();
    this.fetchCashFlowStatementData();
    this.fetchUsername(); // Fetch the username when the component mounts

    //current username display
    const username = localStorage.getItem('username');
    if (username) {
        this.setState({ username });
    }
  }

  fetchUsername = () => {
    // Logic to fetch the username, assuming it is stored in localStorage or a similar place
    const username = localStorage.getItem('username'); // Replace with actual logic to get the username
    this.setState({ username });
  };

  handleLogout = () => {
    // Logic for logout; it could involve clearing the localStorage, etc.
    localStorage.clear(); // Example of clearing localStorage
    this.props.navigate('/signin'); // Redirect to sign-in page
  };

  handleUpgradeToVip = () => {
    // Logic to handle the upgrade to VIP status
    console.log('Upgrade to VIP clicked');
    this.setState({ isVip: true });
    // You might call an API endpoint here and then update the state accordingly
  };

  fetchBalanceSheetData = () => {
    fetch('http://localhost:8081/balance-sheet')
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
    fetch('http://localhost:8081/income-statement')
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
    // Optional: Fetch cash flow statement data from an API or other source
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
    // Fetch account transactions data from an API or other source
    fetch('http://localhost:8081/account-transactions')
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
    const { currentPage, balanceSheetData, incomeStatementData, cashFlowStatementData, accountTransactionsData, username, isVip } = this.state;

    return (
        <div className="main-container">
            <header className="main-header">
                <h1>Financial Management</h1>
                <div className="user-info">
                    {username && <span>Welcome, {username}</span>}
                    {!isVip && username && <span className="vip-icon" onClick={this.handleUpgradeToVip}>⭐</span>}
                    {isVip && <span className="vip-icon-upgraded">🌟</span>} {/* Different VIP icon */}
                    <button onClick={this.handleLogout} className="logout-button">Log Out</button>
                </div>
            </header>
        <aside className="sidebar">
          <SidebarMenu setCurrentPage={this.setCurrentPage} />
        </aside>
        <section className="content">
            {currentPage === 'balanceSheet' && <BalanceSheet {...balanceSheetData} />}
            {currentPage === 'incomeStatement' && <IncomeStatement {...incomeStatementData} />}
            {currentPage === 'cashFlowStatement' && <CashFlowStatement {...cashFlowStatementData} />}
            {currentPage === 'accountTransactions' && <AccountTransactions {...accountTransactionsData} />}
            {currentPage === null && <p>Welcome to the main page!</p>}
        </section>
      </div>
    );
  }
}

export default MainPage;
