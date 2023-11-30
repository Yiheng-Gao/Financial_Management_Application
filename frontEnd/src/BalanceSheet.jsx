import React from 'react';
import './BalanceSheet.css'; 

function BalanceSheet({ companyName, accounts }) {
  const groupedAccounts = accounts.reduce((acc, account) => {
    if (account.AccountTypeName === 'Asset' || account.AccountTypeName === 'Liability'|| account.AccountTypeName === 'Equity'){
      acc[account.AccountTypeName] = acc[account.AccountTypeName] || [];
      acc[account.AccountTypeName].push(account);
    }
    return acc;
  }, {});

  const allAccounts = accounts.reduce((acc, account) => {
      acc[account.AccountTypeName] = acc[account.AccountTypeName] || [];
      acc[account.AccountTypeName].push(account);
    return acc;
  }, {});

  const calculateTotal = (type) => {
    return allAccounts[type]?.reduce((sum, account) => sum + account.acctotalamount, 0) || 0;
  };

  const totalAssets = calculateTotal('Asset');
  const totalLiabilities = calculateTotal('Liability');
  const totalRevenue = calculateTotal('Revenue');
  const totalExpense = calculateTotal('Expense');
  const equity = calculateTotal('Equity');
  const retainedEarning = totalRevenue-totalExpense;
  const totalEquity = equity+retainedEarning;
  const accountTypesOrder = ['Asset', 'Liability', 'Equity'];
  const balanceCheck = totalAssets - totalLiabilities - totalEquity;

  const debtRatio = totalLiabilities / totalAssets * 100;
  let financialHealth = "good";

  if (debtRatio > 100) {
    financialHealth = "bad";
  } else if (debtRatio >= 50) {
    financialHealth = "medium";
  }

  const formattedDebtRatio = debtRatio.toFixed(2);


  return (
    <div className="balance-sheet-container">
      <h1>{companyName} Balance Sheet</h1>
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
          {accountTypesOrder.map(type => (
            <React.Fragment key={type}>
              <tr className="account-type-header">
                <td colSpan="3">{type}</td>
              </tr>
              {groupedAccounts[type].map(account => (
                <tr key={account.AccountName}>
                  <td></td>
                  <td>{account.AccountName}</td>
                  <td>${account.acctotalamount.toLocaleString()}</td>
                </tr>
              ))}
              {type === 'Asset' && (
                <tr>
                  <td>Total Asset</td>
                  <td></td>
                  <td>${totalAssets.toLocaleString()}</td>
                </tr>
              )}
              {type === 'Liability' && (
                <tr>
                  <td>Total Liability</td>
                  <td></td>
                  <td>${totalLiabilities.toLocaleString()}</td>
                </tr>
              )}
              {type === 'Equity' && (
                <>
                  <tr>
                    <td></td>
                    <td>Retained Earnings</td>
                    <td>${retainedEarning.toLocaleString()}</td>
                  </tr>
                  <tr>
                    <td>Total Equity</td>
                    <td></td>
                    <td>${totalEquity.toLocaleString()}</td>
                  </tr>
                </>
              )}
            </React.Fragment>
          ))}
        </tbody>
      </table>
      <div className="financial-health-note">
        <p>Your Debt Ratio is {formattedDebtRatio}%. Your financial health is {financialHealth}.</p>
      </div>
    </div>
  );
}

export default BalanceSheet;
