import React from 'react';
import './CashFlowStatement.css';

function CashFlowStatement({ companyName, cashFlows }) {
  const calculateNetCashFlow = (type) => {
    return cashFlows[type]?.reduce((sum, activity) => sum + activity.amount, 0) || 0;
  };

  const netOperating = calculateNetCashFlow('Operating');
  const netInvesting = calculateNetCashFlow('Investing');
  const netFinancing = calculateNetCashFlow('Financing');
  const totalNetCashFlow = netOperating + netInvesting + netFinancing;

  return (
    <div className="cash-flow-statement-container">
      <h1>{companyName} Cash Flow Statement</h1>
      <div className="basis-and-date">
        <p>Basis: Accrual</p>
        <p>As of 2023/11/10</p>
      </div>
      <table>
        <thead>
          <tr>
            <th></th>
            <th>ACTIVITY</th>
            <th>AMOUNT</th>
          </tr>
        </thead>
        <tbody>

          <tr className="account-type-header">
            <td colSpan="3">Cash Flow From Operating Activities</td>
          </tr>
          {['Cash receipts from customers', 'Wage and salaries', 'Payment made to vendors', 'Interest income', 'Income before income tax', 'Interest paid', 'Income tax paid'].map(activityName => (
            <tr key={activityName}>
              <td></td>
              <td>{activityName}</td>
              <td>${cashFlows['Operating'].find(act => act.name === activityName)?.amount.toLocaleString() || '0'}</td>
            </tr>
          ))}
          <tr className="net-cash-flow">
            <td></td>
            <td>Net Cash Flow</td>
            <td>${calculateNetCashFlow('Operating').toLocaleString()}</td>
          </tr>
  

          <tr className="account-type-header">
            <td colSpan="3">Cash Flow From Investing Activities</td>
          </tr>
          <tr>
            <td></td>
            <td>Equipment</td>
            <td>${cashFlows['Investing'].find(act => act.name === 'Equipment')?.amount.toLocaleString() || '0'}</td>
          </tr>
          <tr className="net-cash-flow">
            <td></td>
            <td>Net Cash Flow</td>
            <td>${calculateNetCashFlow('Investing').toLocaleString()}</td>
          </tr>
  
          <tr className="account-type-header">
            <td colSpan="3">Cash Flow From Financing Activities</td>
          </tr>
          <tr>
            <td></td>
            <td>Notes payable</td>
            <td>${cashFlows['Financing'].find(act => act.name === 'Notes payable')?.amount.toLocaleString() || '0'}</td>
          </tr>
          <tr className="net-cash-flow">
            <td></td>
            <td>Net Cash Flow</td>
            <td>${calculateNetCashFlow('Financing').toLocaleString()}</td>
          </tr>
        </tbody>
      </table>
      <div className="total-net-cash-flow">
        <h2>Total Net Cash Flow</h2>
        <p>${totalNetCashFlow.toLocaleString()}</p>
      </div>
    </div>
  );      
}

export default CashFlowStatement;
