const mysql = require('mysql');
const util = require('util')
require('dotenv').config()
const figlet = require('figlet');
const start = require("./controller");

// connection for sql database
const connection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    port: 3306,
    database: 'employees_db',
});

// connect to the mysql server and sql database
connection.connect((err) => {
    if (err) throw err;
});
// turns cb into promise and lets you use .then:
connection.query = util.promisify(connection.query)

module.exports = connection;

// figlet for opening title in command line
figlet('Welcome to the Employee-Tracker!!', async (err, transformed) => {
    if (err) throw err;
    console.log(transformed);
    await start.startMenu();
});
