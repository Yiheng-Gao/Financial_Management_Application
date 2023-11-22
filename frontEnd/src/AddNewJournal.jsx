import React, { useState, useEffect } from 'react'
import './AddNewJournal.css'

const initialRow = { account: '', accountType: '', description: '', debit: 0, credit: 0 }

function AddNewJournal() {
  const [rows, setRows] = useState([initialRow, initialRow])
  const [journalDate, setJournalDate] = useState('');
  const [journalNote, setJournalNote] = useState('');
  const [errorMessage, setErrorMessage] = useState(''); 
  const [accountsByType, setAccountsByType] = useState({});
  const [successMessage, setSuccessMessage] = useState('');

  useEffect(() => {
    fetch('http://localhost:8081/accounts')
      .then(response => response.json())
      .then(data => {
        setAccountsByType(data);
      })
      .catch(error => console.error('Error fetching accounts:', error));
  }, []);

  const handleAddRow = () => {
    setRows([...rows, initialRow])
  }

  const handleChange = (index, column, value) => {
    const updatedRows = rows.map((row, i) => {
      if (index === i) {
        return { ...row, [column]: value }
      }
      return row
    })
    setRows(updatedRows)
  }

  const handleAccountChange = (index, value) => {
    const accountInfo = JSON.parse(value);
    const updatedRows = rows.map((row, i) => {
      if (index === i) {
        return { ...row, account: accountInfo.AccountID, accountType: accountInfo.AccountTypeName };
      }
      return row;
    });
    setRows(updatedRows);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const totalDebits = rows.reduce(
      (sum, row) => sum + (Number(row.debit) || 0),
      0
    );
    const totalCredits = rows.reduce(
      (sum, row) => sum + (Number(row.credit) || 0),
      0
    );

    if (totalDebits !== totalCredits) {
      setErrorMessage('Debit and credit must have the same amount.');
    } 
    else {
      setErrorMessage('');
      
      const transactions = rows.map(row => {

        let accountType = '';
      for (const type in accountsByType) {
        if (accountsByType[type].some(account => account.AccountID === row.account)) {
          accountType = type;
          break;
        }
      }

        let amount = 0;
        if (["Asset", "Expense"].includes(accountType)) {
          amount = parseFloat(row.debit) - parseFloat(row.credit);
        } else if (["Liability", "Equity", "Revenue"].includes(accountType)) {
          amount = parseFloat(row.credit) - parseFloat(row.debit);
        }
    
        return {
          accountID: row.account,
          date: journalDate,
          amount: amount,
          description: journalNote,
          transactionType: 1,
        };
      });

      fetch('http://localhost:8081/add-transactions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(transactions),
    })
    .then(response => response.json())
    .then(data => {
      console.log('Success:', data);
      setSuccessMessage("Journal added successfully");
      setRows([initialRow, initialRow]);
      setJournalDate('');
      setJournalNote('');
    })
    .catch((error) => {
      console.error('Error:', error);
    });
  
      console.log('Submitted data: ', rows);
      
    }
  };

  const handleCancel = () => {
    // Handle the cancel action
  }

  const totalDebits = rows.reduce(
    (sum, row) => sum + (Number(row.debit) || 0),
    0
  )
  const totalCredits = rows.reduce(
    (sum, row) => sum + (Number(row.credit) || 0),
    0
  )

  return (
    <div className="add-new-journal-container">
      <header className="add-new-journal-header">
        <h2>Add New Journal</h2>
      </header>
      <form className="add-new-journal-form" onSubmit={handleSubmit}>
        <div className="add-new-journal-metadata">
          <div className="add-new-journal-metadata-field">
            <label htmlFor="journalDate">Date:</label>
            <input
              type="date"
              id="journalDate"
              value={journalDate}
              onChange={(e) => setJournalDate(e.target.value)}
            />
          </div>
          <div className="add-new-journal-metadata-field">
            <label htmlFor="journalNote">Note:</label>
            <input
              type="text"
              id="journalNote"
              value={journalNote}
              onChange={(e) => setJournalNote(e.target.value)}
            />
          </div>
        </div>
        <table className="add-new-journal-table">
          <thead>
            <tr>
              <th>Account</th>
              <th>Debit</th>
              <th>Credit</th>   
            </tr>
          </thead>
          <tbody>
            {rows.map((row, index) => (
              <tr key={index}>
                <td>
                <select
                  value={row.account ? JSON.stringify({ AccountID: row.account, AccountTypeName: row.accountType }) : ""}
                  onChange={(e) => handleAccountChange(index, e.target.value)}
                  required
                >
                  <option value="" disabled>Select Account</option>
                  {Object.entries(accountsByType).map(([typeName, accounts]) => (
                    <optgroup label={typeName} key={typeName}>
                      {accounts.map(({ AccountID, AccountName }) => (
                        <option value={JSON.stringify({ AccountID, AccountTypeName: typeName })} key={AccountID}>
                          {AccountName}
                        </option>
                      ))}
                    </optgroup>
                  ))}
                </select>


              </td>
                
                <td>
                  <input
                    type="number"
                    value={row.debit}
                    onChange={(e) =>
                      handleChange(index, 'debit', e.target.value)
                    }
                  />
                </td>
                <td>
                  <input
                    type="number"
                    value={row.credit}
                    onChange={(e) =>
                      handleChange(index, 'credit', e.target.value)
                    }
                  />
                </td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr>
              <td></td> {/* Empty cell for alignment */}
              <td></td> {/* Empty cell for alignment */}
              <td>Total Debits: {totalDebits.toFixed(2)}</td>
              <td>Total Credits: {totalCredits.toFixed(2)}</td>
            </tr>
          </tfoot>
        </table>
        <button
          type="button"
          className="add-new-journal-button"
          onClick={handleAddRow}>
          Add New Row
        </button>
        <div>
          <button type="submit" className="add-new-journal-submit">
            Submit
          </button>
          
          <button
            type="button"
            className="add-new-journal-cancel"
            onClick={handleCancel}>
            Cancel
          </button>
          {errorMessage && <p className="add-new-journal-error">{errorMessage}</p>}
          {successMessage && <p className="add-new-journal-success">{successMessage}</p>}
        </div>
      </form>
    </div>
  )
}

export default AddNewJournal