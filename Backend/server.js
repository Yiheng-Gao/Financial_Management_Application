const express = require("express");
const mysql = require("mysql");
const cors = require("cors");
const bcrypt = require("bcrypt"); // Add bcrypt for password hashing

const app = express();
app.use(cors());
app.use(express.json()); // Add this middleware to parse JSON bodies

const db = mysql.createConnection({
  host: "127.0.0.1",
  user: "root",
  password: "20231111ABC",
  database: "accviewd",
});

app.get("/", (re, res) => {
  return res.json("From BAckend Side");
});

app.get("/users", (req, res) => {
  const sql = "SELECT * FROM user";
  db.query(sql, (err, data) => {
    if (err) return res.json(err);
    return res.json(data);
  });
});

// ...

// server.js

app.get("/accounts", (req, res) => {
  const sql = `
    SELECT AccountID, AccountTypeName, AccountName
    FROM accountchart
    ORDER BY AccountTypeName, AccountName;`;

  db.query(sql, (err, results) => {
    if (err) {
      return res.status(500).json({ message: "Error querying the database", error: err });
    } else {
      const groupedAccounts = results.reduce((acc, { AccountTypeName, AccountID, AccountName }) => {
        if (!acc[AccountTypeName]) {
          acc[AccountTypeName] = [];
        }
        acc[AccountTypeName].push({ AccountID, AccountName });
        return acc;
      }, {});

      return res.json(groupedAccounts);
    }
  });
});


app.get("/account-chart", (req, res) => {
  const sql = "SELECT AccountID, AccountName, AccountTypeName FROM accountchart";
  db.query(sql, (err, results) => {
    if (err) {
      res.status(500).json({ message: "Error querying the database", error: err });
    } else {
      res.json(results);
    }
  });
});



app.post("/add-account", (req, res) => {
  const { accountTypeID, companyID, accountName, accountNote } = req.body;

  const sql = "INSERT INTO account (AccountTypeID, CompanyID, AccountName, AccountNote) VALUES (?, ?, ?, ?)";
  
  db.query(sql, [accountTypeID, companyID, accountName, accountNote], (err, result) => {
    if (err) {
      res.status(500).json({ message: "Error adding new account", error: err.message });
    } else {
      res.status(201).json({ message: "Account added successfully", accountID: result.insertId });
    }
  });
});




app.get("/invoices", (req, res) => {
  const sql = `
    SELECT InvoiceID, Date, Amount, CustomerName, DueDate, PaymentStatus
    FROM invoices`; // Replace 'invoices' with your actual table or view name
  db.query(sql, (err, results) => {
    if (err) {
      return res.status(500).json({ message: "Error querying the database for invoices", error: err });
    } else {
      // If you need to format the date or other fields, do so here
      return res.json(results);
    }
  });
});


app.get("/bills", (req, res) => {
  const sql = `
    SELECT BillID, Date, Amount, SupplierName, DueDate, PaymentStatus
    FROM bills`;
  db.query(sql, (err, results) => {
    if (err) {
      return res.status(500).json({ message: "Error querying the database for bills", error: err });
    } else {
      return res.json(results);
    }
  });
});

app.get("/customers", (req, res) => {
  const sql = "SELECT DISTINCT CustomerID, CustomerName FROM customer";
  db.query(sql, (err, results) => {
    if (err) {
      return res.status(500).json({ message: "Error querying the database", error: err });
    } else {
      return res.json(results);
    }
  });
});

app.get("/customers-page", (req, res) => {
  const sql = "SELECT CustomerID, CustomerName, CustomerEmail FROM customer";
  db.query(sql, (err, results) => {
    if (err) {
      return res.status(500).json({ message: "Error querying the database", error: err });
    }
    res.json(results);
  });
});

app.post("/create-customer", (req, res) => {
  const { customerName, customerEmail } = req.body;
  const sql = "INSERT INTO customer (CustomerName, CustomerEmail) VALUES (?, ?)";
  db.query(sql, [customerName, customerEmail], (err, result) => {
    if (err) {
      res.status(500).json({ message: "Error adding new customer", error: err });
    } else {
      res.status(201).json({ message: "Customer added successfully", customerID: result.insertId });
    }
  });
});

app.post("/create-supplier", (req, res) => {
  const { supplierName, supplierEmail } = req.body;
  const sql = "INSERT INTO supplier (SupplierName, SupplierEmail) VALUES (?, ?)";
  db.query(sql, [supplierName, supplierEmail], (err, result) => {
    if (err) {
      res.status(500).json({ message: "Error adding new supplier", error: err });
    } else {
      res.status(201).json({ message: "Supplier added successfully", supplierID: result.insertId });
    }
  });
});


app.get("/suppliers-page", (req, res) => {
  const sql = "SELECT SupplierID, SupplierName, SupplierEmail FROM supplier";
  db.query(sql, (err, results) => {
    if (err) {
      return res.status(500).json({ message: "Error querying the database", error: err });
    }
    res.json(results);
  });
});


app.get("/suppliers", (req, res) => {
  const sql = "SELECT DISTINCT SupplierID, SupplierName FROM supplier";
  db.query(sql, (err, results) => {
    if (err) {
      return res.status(500).json({ message: "Error querying the database", error: err });
    } else {
      return res.json(results);
    }
  });
});




app.get("/balance-sheet", (req, res) => {
  const sql =
    "SELECT AccountTypeName, AccountName, acctotalamount FROM balancesheetc"; // Modify according to your table structure
  db.query(sql, (err, data) => {
    if (err) {
      return res.json(err);
    } else {
      return res.json(data);
    }
  });
});

app.get("/income-statement", (req, res) => {
  const sql =
    "SELECT AccountTypeName, AccountName, acctotalamount FROM balancesheetc"; // Modify according to your table structure
  db.query(sql, (err, data) => {
    if (err) {
      return res.json(err);
    } else {
      return res.json(data);
    }
  });
});


app.get("/manual-journals", (req, res) => {
  const sql = `
    SELECT TransactionID, Date, Amount, Description
    FROM transactionsheet`; // Ensure this matches the actual view and columns in your database
  db.query(sql, (err, data) => {
    if (err) {
      return res.status(500).json({ message: "Error querying the database", error: err });
    } else {
      return res.json(data);
    }
  });
});

// ... (Other parts of the server remain unchanged)

app.post("/add-transactions", (req, res) => {
  const transactions = req.body;

  // Start a transaction
  db.beginTransaction(err => {
    if (err) {
      return res.status(500).json({ message: "Error starting transaction", error: err });
    }

    // Execute all queries in a batch
    const transactionPromises = transactions.map(({ accountID, date, amount, description, transactionType }) => {
      const sql = `INSERT INTO transaction (AccountID, Date, Amount, Description, TransactionType) VALUES (?, ?, ?, ?, ?);`;
      return new Promise((resolve, reject) => {
        db.query(sql, [accountID, date, amount, description, transactionType], (error, results) => {
          if (error) {
            reject(error);
          } else {
            resolve(results);
          }
        });
      });
    });

    Promise.all(transactionPromises).then(() => {
      db.commit(err => {
        if (err) {
          return db.rollback(() => {
            res.status(500).json({ message: "Error committing transaction", error: err });
          });
        }
        res.status(200).json({ message: "Transactions added successfully"});
      });
    }).catch(error => {
      db.rollback(() => {
        res.status(500).json({ message: "Error inserting transactions", error: error });
      });
    });
  });
});


app.post("/add-invoice-transactions", (req, res) => {
  const { invoiceItems, issueDate, customerID, note, dueDate } = req.body;
  let invoiceTransactions = [];

  db.beginTransaction(err => {
    if (err) return res.status(500).json({ message: "Error starting transaction", error: err });

    const transactionPromises = invoiceItems.map(item => {
      return new Promise((resolve, reject) => {
        const sqlInsertTransaction = `INSERT INTO transaction (AccountID, Date, Amount, Description, TransactionType) VALUES (?, ?, ?, ?, 2);`;
        db.query(sqlInsertTransaction, [item.AccountID, issueDate, item.Amount, note], (error, results) => {
          if (error) reject(error);
          else if (item.AccountID === 14) { // Only push transactions with AccountID 14 for invoice entries
            invoiceTransactions.push({ transactionID: results.insertId, customerID, item: item.Description, dueDate });
          }
          resolve();
        });
      });
    });

    Promise.all(transactionPromises)
      .then(() => {
        const invoicePromises = invoiceTransactions.map(({ transactionID, customerID, item, dueDate }) => {
          return new Promise((resolve, reject) => {
            const sqlInsertInvoice = `INSERT INTO invoice (TransactionID, CustomerID, InvoiceItem, DueDate, PaymentStatus) VALUES (?, ?, ?, ?, 'Unpaid');`;
            db.query(sqlInsertInvoice, [transactionID, customerID, item, dueDate], (error) => {
              if (error) reject(error);
              else resolve();
            });
          });
        });
        return Promise.all(invoicePromises);
      })
      .then(() => {
        db.commit(err => {
          if (err) return db.rollback(() => res.status(500).json({ message: "Error committing transaction", error: err }));
          res.status(200).json({ message: "Invoice transactions added successfully" });
        });
      })
      .catch(error => {
        db.rollback(() => res.status(500).json({ message: "Error inserting transactions", error }));
      });
  });
});


app.post("/add-bill-transactions", (req, res) => {
  const { billItems, issueDate, supplierID, note, dueDate } = req.body;
  let billTransactions = [];

  db.beginTransaction(err => {
    if (err) return res.status(500).json({ message: "Error starting transaction", error: err });

    const transactionPromises = billItems.map(item => {
      return new Promise((resolve, reject) => {
        const sqlInsertTransaction = `INSERT INTO transaction (AccountID, Date, Amount, Description, TransactionType) VALUES (?, ?, ?, ?, 3);`;
        db.query(sqlInsertTransaction, [item.AccountID, issueDate, item.Amount, note], (error, results) => {
          if (error) reject(error);
          else if (item.AccountID === 11) { 
            billTransactions.push({ transactionID: results.insertId, supplierID, item: item.Description, dueDate });
          }
          resolve();
        });
      });
    });

    Promise.all(transactionPromises)
      .then(() => {
        const billPromises = billTransactions.map(({ transactionID, supplierID, item, dueDate }) => {
          return new Promise((resolve, reject) => {
            const sqlInsertBill = `INSERT INTO bill (TransactionID, SupplierID, BillItem, DueDate, PaymentStatus) VALUES (?, ?, ?, ?, 'Unpaid');`;
            db.query(sqlInsertBill, [transactionID, supplierID, item, dueDate], (error) => {
              if (error) reject(error);
              else resolve();
            });
          });
        });
        return Promise.all(billPromises);
      })
      .then(() => {
        db.commit(err => {
          if (err) return db.rollback(() => res.status(500).json({ message: "Error committing transaction", error: err }));
          res.status(200).json({ message: "Bill transactions added successfully" });
        });
      })
      .catch(error => {
        db.rollback(() => res.status(500).json({ message: "Error inserting transactions", error }));
      });
  });
});



// Endpoint for user sign-up
app.post("/api/signup", (req, res) => {
  const { username, password, email, companyName } = req.body;
  const defaultUserType = 'normal'; // Assuming 'normal' is your default user type

  // Hash the password
  bcrypt.hash(password, 10, (err, hash) => {
    if (err) {
      return res.status(500).send({ message: "Error hashing password" });
    }

    // Insert the new user into the database with the default user type
    const insertUserSql = "INSERT INTO user (Username, password, UserEmail, UserType) VALUES (?, ?, ?, ?)";
    db.query(insertUserSql, [username, hash, email, defaultUserType], (err, userResult) => {
      if (err) {
        console.error("Database error:", err);
        return res.status(500).send({ message: "Error registering user" });
      } else {
        // Now insert the company name using the new user's ID
        const userId = userResult.insertId;
        const insertCompanySql = "INSERT INTO company (CompanyName, UserID) VALUES (?, ?)";
        db.query(insertCompanySql, [companyName, userId], (err, companyResult) => {
          if (err) {
            console.error("Database error:", err);
            return res.status(500).send({ message: "Error registering company" });
          } else {
            return res.status(201).send({ message: "User and company registered successfully" });
          }
        });
      }
    });
  });
});

app.get('/account-transactions', (req, res) => {
  const sql = `
    SELECT 
      TransactionID, 
      Date, 
      AccountName, 
      AccountTypeName, 
      Description, 
      Amount 
    FROM 
      transactionsheet 
    ORDER BY 
      Date DESC`;

  db.query(sql, (err, results) => {
    if (err) {
      res.status(500).json({ message: 'Error querying the database', error: err });
    } else {
      res.json(results);
    }
  });
});


// Endpoint for user sign-in
app.post('/api/signin', (req, res) => {
  const { username, password } = req.body;
  // Updated SQL to also select the Username
  const sql = `
    SELECT user.UserID, user.Username, user.UserType, user.password, company.CompanyID
    FROM user
    LEFT JOIN company ON user.UserID = company.UserID
    WHERE user.Username = ?`;
  db.query(sql, [username], (err, result) => {
    if (err) {
      res.status(500).send({ message: "Error fetching user" });
    } else if (result.length > 0) {
      bcrypt.compare(password, result[0].password, (err, isMatch) => {
        if (err) {
          res.status(500).send({ message: "Error comparing passwords" });
        } else if (isMatch) {
          // Include Username in the response along with UserId, CompanyId, and UserType
          res.send({
            message: "Sign-in successful",
            username: result[0].Username, // Add this line to include the username
            userId: result[0].UserID,
            companyId: result[0].CompanyID,
            userType: result[0].UserType
          });
        } else {
          res.status(401).send({ message: "Invalid credentials" });
        }
      });
    } else {
      res.status(404).send({ message: "User not found" });
    }
  });
});
// Endpoint to upgrade to premium
app.post('/api/upgrade-to-premium', (req, res) => {
  const { userId } = req.body; // Retrieve userId from request body
  const sqlUpdate = "UPDATE user SET UserType = 'premium' WHERE UserID = ?";
  db.query(sqlUpdate, [userId], (err, result) => {
    if (err) {
      console.error("Database error:", err);
      return res.status(500).send({ message: "Error upgrading user to premium" });
    }
    if (result.affectedRows === 0) {
      return res.status(404).send({ message: "User not found" });
    }
    return res.status(200).send({ message: "User upgraded to premium successfully" });
  });
});

app.listen(8081, () => {
  console.log("Server is listening on port 8081");
});
