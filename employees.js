const mysql = require('mysql');
const inquirer = require('inquirer');

// connection for sql database
const connection = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: '',
    database: 'employees_DB',
});

