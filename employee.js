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




//         .then((answer) => {
//             if (answer.task === 'View departments') {
//                 const query = `SELECT * FROM department`
//                 connection.query(query, (err, res) => {
//                     if (err) throw err;
//                     console.table(res);
//                     start();
//                 })
//             } else if (answer.task === 'View roles') {
//                 const query = `SELECT * FROM role`
//                 connection.query(query, (err, res) => {
//                     if (err) throw err;
//                     console.table(res);
//                     start();
//                 })
//             } else if (answer.task === 'View employees') {
//                 const query = `SELECT * FROM employee`
//                 connection.query(query, (err, res) => {
//                     if (err) throw err;
//                     for (let i = 0; i < res.length; i++) {
//                         console.log(res[i].first_name, res[i].last_name)
//                     }
//                     // console.table(res)
//                     start();
//                 })
//             } else if (answer.task === 'View managers') {
//                 const query = `SELECT manager_id, first_name, last_name FROM employee`
//                 connection.query(query, (err, res) => {
//                     if (err) throw err;
//                     console.table(res);
//                     start();
//                 })
//             } else if (answer.task === 'Add employee') {
//                 inquirer.prompt([
//                     {
//                         name: 'addFirstName',
//                         type: 'input',
//                         message: 'What is the first name of the employee?',
//                     },
//                     {
//                         name: 'addLastName',
//                         type: 'input',
//                         message: 'What is the last name of the employee?',
//                     },
//                     {
//                         name: 'addEmpRole',
//                         type: 'input',
//                         message: 'What is the role of the employee?',
//                     },
//                     {
//                         name: 'addEmpManager',
//                         type: 'input',
//                         message: 'What is the name of the manager for the employee?',
//                     },
//                 ])
//                     .then((answer) => {
//                         const newEmp = `INSERT INTO employee (first_name, last_name, role_id, manager_id)`
//                         connection.query()

//                         start();
//                     })
//             } else if (answer.task === 'Add department') {
//                 inquirer.prompt([
//                     {
//                         name: 'addDepartment',
//                         type: 'input',
//                         message: 'What is the department you want to add?',
//                     },
//                 ])
//                     .then((answer) => {
//                         const newDept = `INSERT INTO department SET ? (name)`
//                         connection.query()

//                         start();
//                     })
//             } else if (answer.task === 'Add role') {
//                 inquirer.prompt([
//                     {
//                         name: 'addRole',
//                         type: 'input',
//                         message: 'What is the role you want to add?',
//                     },
//                     {
//                         name: 'addRoleSalary',
//                         type: 'input',
//                         message: 'What is the salary of the new role?',
//                     },
//                     {
//                         name: 'addRoleDept',
//                         type: 'input',
//                         message: 'What is the department for the new role?',
//                     },
//                 ])
//                     .then((answer) => {
//                         const newDept = `INSERT INTO role (title, salary, department_id)`
//                         connection.query()

//                         start();
//                     })
//             } else if (answer.task === 'Update employee role') {
//                 inquirer.prompt([
//                     {
//                         name: 'updateEmp',
//                         type: 'input',
//                         message: 'Which employee would you like to update?',
//                     },
//                     {
//                         name: 'updateEmpRole',
//                         type: 'input',
//                         message: 'What is their new role?',
//                     },
//                 ])
//                     .then((answer) => {
//                         const newDept = `INSERT INTO department (name)`
//                         connection.query()

//                         start();
//                     })
//             // } else if (answer.task === 'Update employee manager') {

//             // } else if (answer.task === 'Delete employee') {

//             // } else if (answer.task === 'Delete role') {

//             // } else if (answer.task === 'Delete department') {

//             } else if (answer.task === 'Exit') {
//                 console.log("Goodbye")
//                 connection.end();
//         }
//         });
// };