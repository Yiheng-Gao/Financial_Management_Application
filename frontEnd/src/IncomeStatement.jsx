import React from 'react';
import './BalanceSheet.css'; 

function IncomeStatement({ companyName, accounts }) {
  const groupedAccounts = accounts.reduce((acc, account) => {
    if (account.AccountTypeName === 'Expense' || account.AccountTypeName === 'Revenue'){
      acc[account.AccountTypeName] = acc[account.AccountTypeName] || [];
      acc[account.AccountTypeName].push(account);
    }
    return acc;
  }, {});

  const calculateTotal = (type) => {
    return groupedAccounts[type]?.reduce((sum, account) => sum + account.acctotalamount, 0) || 0;
  };

  const totalExpense = calculateTotal('Expense');
  const totalRevenue = calculateTotal('Revenue');
  const netProfit = totalRevenue - totalExpense;

  const netProfitMargin = totalRevenue === 0 ? 0 : (netProfit / totalRevenue) * 100;
  let profitability = "good";

  if (netProfitMargin < 0) {
    profitability = "bad";
  } else if (netProfitMargin < 20) {
    profitability = "medium";
  }

  const formattedNetProfitMargin = netProfitMargin.toFixed(2)


  return (
    <div className="balance-sheet-container">
      <h1>{companyName} Income Statement</h1>
      <div className="basis-and-date">
        <p>Basis: Accrual</p>
        <p>As of 2023/11/30</p>
      </div>
      <table>
        <thead>
          <tr>
          <th></th>
            <th>ACCOUNT</th>
            <th>TOTAL</th>
          </tr>
        </thead>
        <tbody>
        {Object.entries(groupedAccounts).map(([type, accounts]) => (
            <React.Fragment key={type}>
              <tr className="account-type-header">
                <td colSpan="3">{type}</td>
              </tr>
              {accounts.map(account => (
                <tr key={account.AccountName}>
                  <td></td>
                  <td>{account.AccountName}</td>
                  <td>${account.acctotalamount.toLocaleString()}</td>
                </tr>
              ))}
              {type === 'Revenue' && (
                <tr>
                  <td>Total Revenue</td>
                  <td></td>
                  <td>${totalRevenue.toLocaleString()}</td>
                </tr>
              )}
              {type === 'Expense' && (
                <tr>
                  <td>Total Expense</td>
                  <td></td>
                  <td>${totalExpense.toLocaleString()}</td>
                </tr>
              )}
            </React.Fragment>
          ))}
          <tr className="account-type-header">
            <td colSpan="3">Net Income</td>
          </tr>
          <tr>
            <td></td>
            <td></td>
            <td>${netProfit.toLocaleString()}</td>
          </tr>
        </tbody>
      </table>
      <div className="profitability-note">
        <p>Your Net Profit Margin is {formattedNetProfitMargin}%. Your profitability is {profitability}.</p>
      </div>
      

    </div>
  );
}

export default IncomeStatement;
