import React from 'react';
import './MainPage.css';
import SidebarMenu from './SidebarMenu';
import BalanceSheet from './BalanceSheet'; // Import BalanceSheet here

class MainPage extends React.Component {
  state = {
    showBalanceSheet: false, // Add state to manage the visibility of the Balance Sheet
    // Other state variables as needed...
    balanceSheetData: {
      companyName: 'abc inc',
      accounts: []
    },
  };

  // Method to toggle the Balance Sheet
  toggleBalanceSheet = () => {
    this.setState(prevState => ({
      showBalanceSheet: !prevState.showBalanceSheet
    }));
  };

  componentDidMount() {
    this.fetchBalanceSheetData();
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
  

  render() {
    const { showBalanceSheet, balanceSheetData } = this.state;

    return (
      <div className="main-container">
        <header className="main-header">
          <h1>Financial Management</h1>
        </header>
        <aside className="sidebar">
          <SidebarMenu toggleBalanceSheet={this.toggleBalanceSheet} /> {/* Pass the toggle method as a prop */}
        </aside>
        <section className="content">
          {showBalanceSheet && <BalanceSheet {...balanceSheetData} />}
          {!showBalanceSheet && <p>Welcome to the main page!</p>}
        </section>
      </div>
    );
  }
}

export default MainPage;
