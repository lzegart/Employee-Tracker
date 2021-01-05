const mysql = require('mysql');
const inquirer = require('inquirer');

// connection for sql database
const connection = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: '',
    database: 'employees_db',
});

// function to prompt user to enter/view/edit employee info with inquirer
const start = () => {
    inquirer
        .prompt({
            name: 'task',
            type: 'list',
            message: 'What would you like to do?',
            choices: ['View employees', 'Add employee info', 'Update or delete employee info']
        })
        .then((answer) => {
            if (answer.task === 'View employees') {
                viewEmployee();
            } else if (answer.task === 'Add employee info') {
                addEmployee();
            } else if (answer.task === 'Update or delete employee info') {
                updateEmployee();
            }
        });
}

['View all employees', 
            'Search employee by name', 
            'Search employee by department', 
            'Search employee by role', 
            'Search employee by manager', 
            'Add employee', 
            'add department', 'role', 'employee'],
            // Add/ view/ update
            // roles/ department/ employee
            // 

// connect to the mysql server and sql database
connection.connect((err) => {
    if (err) throw err;
    // run the start function after the connection is made to prompt the user
    start();
  });