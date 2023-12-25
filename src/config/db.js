require("dotenv").config(); // load .env variables
const mysql = require("mysql"); // import mysql2 library

// connect to database
const connection = mysql.createConnection({
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE,
});

connection.connect((error) => {
  if (error) {
    console.error(error.message)
  } else {
    console.log("DB Connected Successfully!")
  }
});

module.exports = connection;