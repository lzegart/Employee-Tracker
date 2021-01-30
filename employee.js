const mysql = require('mysql');
const inquirer = require('inquirer');
require('dotenv').config()
const figlet = require('figlet');


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
                    'View departments',
                    'View roles',
                    'View employees',
                    'View managers',
                    'Add employee',
                    'Add department',
                    'Add role',
                    'Update employee role',
                    'Update employee manager',
                    'Delete employee',
                    'Delete role',
                    'Delete department',
                    'Exit',
                ]
        })
        .then((answer) => {
            if (answer.task === 'View departments, roles, employees, or managers') {
                view();
            } else if (answer.task === 'Add employee, department, or role') {
                add();
            } else if (answer.task === 'Update roles, managers, or departments') {
                update();
            } else if (answer.task === 'Delete employee, role, or department') {
                deleteEmp();
            } else if (answer.task === 'Exit') {
                console.log("Goodbye")
                connection.end();
        }
        });
};

const view = () => {
    inquirer
        .prompt({
            name: 'viewQ',
            type: 'list',
            message: 'What would you like to view?',
            choices:
                [
                    'View all employees',
                    'View employees by role',
                    'View employees by manager',
                    'View departments',
                    'View roles',
                    'View managers',
                    'Go back to starting menu'
                ]
        })
        .then((answer) => {
            const viewQ = answer.viewQ
            if (viewQ === 'View all employees') {
                const query = `SELECT * FROM employee`
                connection.query(query, (err, res) => {
                    if (err) throw err;
                    for (let i = 0; i < res.length; i++) {
                        console.log(res[i].first_name, res[i].last_name)
                    }
                    // console.table(res)
                    start();
                })
            } else if (viewQ === 'View employees by role') {
                // const query = `SELECT * FROM role`
                connection.query(query, (err, res) => {
                    if (err) throw err;
                    console.table(res);
                    start();
                })
            } else if (viewQ === 'View employees by manager') {
                    // const query = `SELECT first_name, last_name, manager_id from employee`
                    connection.query(query, (err, res) => {
                        if (err) throw err;
                        console.table(res);
                        start();
                    })
            } else if (viewQ === 'View departments') {
                const query = `SELECT * FROM department`
                connection.query(query, (err, res) => {
                    if (err) throw err;
                    console.table(res);
                    start();
                })
            } else if (viewQ === 'View roles') {
                const query = `SELECT * FROM role`
                connection.query(query, (err, res) => {
                    if (err) throw err;
                    console.table(res);
                    start();
                })
            } else if (viewQ === 'View managers') {
                const query = `SELECT manager_id, first_name, last_name FROM employee`
                connection.query(query, (err, res) => {
                    if (err) throw err;
                    console.table(res);
                    start();
                })
            } else if (viewQ === 'Go back to starting menu') {
                start();
            }
        });
};

const add = () => {
    inquirer
        .prompt({
            name: 'addQ',
            type: 'list',
            message: 'What would you like to add?',
            choices:
                [
                    'Add employee',
                    'Add department',
                    'Add role',
                    'Go back to starting menu'
                ]
        })
        .then((answer) => {
            const addQ = answer.addQ
            if (addQ === 'Add employee') {
                inquirer.prompt([
                    {
                        name: 'addFirstName',
                        type: 'input',
                        message: 'What is the first name of the employee?',
                    },
                    {
                        name: 'addLastName',
                        type: 'input',
                        message: 'What is the last name of the employee?',
                    },
                    {
                        name: 'addRole',
                        type: 'input',
                        message: 'What is the role of the employee?',
                    },
                    {
                        name: 'addManager',
                        type: 'input',
                        message: 'What is the name of the manager for the employee?',
                    },
                ])
                    .then((answer) => {
                        const newEmp = `INSERT INTO employee (first_name, last_name,)`
                        connection.query()

                        start();
                    })
            }
        })

        // console.table(res)
        start();
}



const update = () => {
    inquirer
        .prompt({
            name: 'updateQ',
            type: 'list',
            message: 'What would you like to update?',
            choices:
                [
                    'Update role of employee',
                    'Update manager',
                    'Update department of employee',
                    'Go back to starting menu'
                ]
        })
        .then((answer) => {

            //     .prompt([
            //     {
            //         name: 'updateName',
            //         type: 'input',
            //         message: 'What is the name of the employee?',
            //     },
            //     {
            //         name: 'updateRole',
            //         type: 'input',
            //         message: 'What is the role of the employee?',
            //     },
            //     {
            //         name: 'updateDepartment',
            //         type: 'input',
            //         message: 'What department is the employee in?',
            //     },
            //     {
            //         name: 'updateManager',
            //         type: 'input',
            //         message: 'What is the name of the manager for the employee?',
            //     },
            // ])
            // .then((answer) => {
            //     const query = 'SELECT '
            //     connection.query(query, {}, (err, res) => {
            //         res.forEach(({ x }) => console.log(y));
            //         start();
            //     })

        })
};

const deleteEmp = () => {
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