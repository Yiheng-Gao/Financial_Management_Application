import React from 'react'
import './ManualJournals.css';


function ManualJournals({ journals, setAddNewJournalPage }) {
  function formatDate(isoDateString) {
    const date = new Date(isoDateString);
    return date.toISOString().split('T')[0];
  }
  
  return (
    <div className="manual-journals-container">
      <header className="manual-journals-header">
        <h2>Manual Journals</h2>
        <button className="new-journal-btn" onClick={setAddNewJournalPage}>+ New Journal</button>
      </header>
      <div className="manual-journals-table-container">
        <table className="manual-journals-table">
          <thead>
            <tr>
              <th>Transaction ID</th>
              <th>Date</th>
              <th>Amount</th>
              <th>Description</th>
            </tr>
          </thead>
          <tbody>
            {journals.map((journal) => (
              <tr key={journal.TransactionID}>
                <td>{journal.TransactionID}</td>
                <td>{formatDate(journal.Date)}</td>
                <td>${journal.Amount.toFixed(2)}</td>
                <td>{journal.Description}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default ManualJournals;
