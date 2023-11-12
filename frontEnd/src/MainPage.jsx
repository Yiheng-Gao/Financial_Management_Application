import React from 'react';
import './MainPage.css';
import SidebarMenu from './SidebarMenu';
import BalanceSheet from './BalanceSheet'; 
import IncomeStatement from './IncomeStatement';

class MainPage extends React.Component {
  state = {
    currentPage: null,
   
    balanceSheetData: {
      companyName: 'abc inc',
      accounts: []
    },
    
    incomeStatementData: {
      companyName: 'abc inc',
      accounts: []
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

  componentDidMount() {
    this.fetchBalanceSheetData();
    this.fetchIncomeStatementData();
  }
  
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
  

  render() {
    const { currentPage, balanceSheetData, incomeStatementData } = this.state;

    return (
      <div className="main-container">
        <header className="main-header">
          <h1>Financial Management</h1>
        </header>
        <aside className="sidebar">
          <SidebarMenu setCurrentPage={this.setCurrentPage} />
        </aside>
        <section className="content">
        {currentPage === 'balanceSheet' && <BalanceSheet {...balanceSheetData} />}
        {currentPage === 'incomeStatement' && <IncomeStatement {...incomeStatementData} />}
        {currentPage === null && <p>Welcome to the main page!</p>}
        </section>
      </div>
    );
  }
}

export default MainPage;
