const mysql = require('mysql');
const inquirer = require('inquirer');

// connection for sql database
const connection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    port: 3306,
    database: 'employees_db',
});

// function to prompt user to enter/view/edit employee info with inquirer
const start = () => {
    inquirer
        .prompt({
            name: 'task',
            type: 'list',
            message: 'What would you like to do?',
            choices:
                [
                    'View employee',
                    'Add employee',
                    'Update employee info',
                    'Delete employee'
                ]
        })
        .then((answer) => {
            if (answer.task === 'View employee') {
                viewEmployee();
            } else if (answer.task === 'Add employee') {
                addEmployee();
            } else if (answer.task === 'Update employee info') {
                updateEmployee();
            } else if (answer.task === 'Delete employee') {
                deleteEmployee();
            }
        });
};

const viewEmployee = () => {
    inquirer
        .prompt({
            name: 'viewEmp',
            type: 'list',
            message: 'How would you like to view employees?',
            choices:
                [
                    'View all employess',
                    'View employees by role',
                    'View employees by manager'
                ]
        })
        .then((answer) => {
            const viewEmp = answer.viewEmp
            if (viewEmp === 'View all employees') {
                const query = 'SELECT * FROM employee'
                connection.query(query, (err, res) => {
                    if (err) throw err;
                    start();
                })
            } else if (viewEmp === 'View employees by role') {
                const query = 'SELECT * FROM role'
                connection.query(query, (err, res) => {
                    if (err) throw err;
                    start();
                })
            // } else if (viewEmp ===
            }
        })
};

const addEmployee = () => {
    inquirer
        .prompt([
            {
                name: 'addName',
                type: 'input',
                message: 'What is the name of the employee?',
            },
            {
                name: 'addRole',
                type: 'input',
                message: 'What is the role of the employee?',
            },
            {
                name: 'addDepartment',
                type: 'input',
                message: 'What department is the employee in?',
            },
            {
                name: 'addManager',
                type: 'input',
                message: 'What is the name of the manager for the employee?',
            },
            {
                name: 'addSalary',
                type: 'input',
                message: 'What is the salary of the employee?',
            },
        ])
        .then((answer) => {
            const query = ' '
            connection.query(query, { employee: answer.employee }, (err, res) => {
                res.forEach(({ x }) => console.log(y));
                start();
            })
        })
};

const updateEmployee = () => {
    inquirer
        .prompt([
            {
                name: 'updateName',
                type: 'input',
                message: 'What is the name of the employee?',
            },
            {
                name: 'updateRole',
                type: 'input',
                message: 'What is the role of the employee?',
            },
            {
                name: 'updateDepartment',
                type: 'input',
                message: 'What department is the employee in?',
            },
            {
                name: 'updateManager',
                type: 'input',
                message: 'What is the name of the manager for the employee?',
            },
        ])
        .then((answer) => {
            const query = 'SELECT '
            connection.query(query, {}, (err, res) => {
                res.forEach(({ x }) => console.log(y));
                start();
            })

        })
};

const deleteEmployee = () => {
    inquirer
        .prompt({
            name: 'delete',
            type: 'input',
            message: 'Which employee would you like to remove?',
        })
        .then((answer) => {
            const query = 'SELECT '
            connection.query(query, { delete: answer.delete }, (err, res) => {
                res.forEach(({ x }) => console.log(y));
                start();
            })
        })
};

// connect to the mysql server and sql database
connection.connect((err) => {
    if (err) throw err;
    // run the start function after the connection is made to prompt the user
    start();
});