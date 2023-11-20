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
// Endpoint for user sign-up
app.post("/api/signup", (req, res) => {
  const { username, password, email } = req.body; // Now including email in the destructure

  // You would add more validation logic here, for username, password, and email

  // Hash the password
  bcrypt.hash(password, 10, (err, hash) => {
    if (err) {
      res.status(500).send({ message: "Error hashing password" });
    } else {
      // Insert the new user into the database
      const sql =
        "INSERT INTO user (Username, password, UserEmail) VALUES (?, ?, ?)"; // Assuming your column names are correct
      console.log("Received sign-up data:", req.body);
      db.query(sql, [username, hash, email], (err, result) => {
        if (err) {
          console.error("Database error:", err);
          res.status(500).send({ message: "Error registering user" });
        } else {
          console.log("User signed up:", result);
          res.status(201).send({ message: "User registered successfully" });
        }
      });
    }
  });
});
// Endpoint for user sign-in
app.post('/api/signin', (req, res) => {
  const { username, password } = req.body;

  // Fetch user from the database
  const sql = "SELECT * FROM user WHERE Username = ?";
  db.query(sql, [username], (err, result) => {
    console.log(result);
    if (err) {
      res.status(500).send({ message: "Error fetching user" });
    } else if (result.length > 0) {
      // Compare hashed password
      bcrypt.compare(password, result[0].password, (err, isMatch) => {
        console.log(isMatch);
        if (err) {
          res.status(500).send({ message: "Error comparing passwords" });
        } else if (isMatch) {
          res.send({ message: "Sign-in successful" });
        } else {
          res.status(401).send({ message: "Invalid credentials" });
        }
      });
    } else {
      res.status(404).send({ message: "User not found" });
    }
  });
});

app.listen(8081, () => {
  console.log("Server is listening on port 8081");
});
