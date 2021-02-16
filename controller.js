const inquirer = require('inquirer');
const mysql = require('mysql');
const { createConnection } = require('net');
// const util = require('util')
// require('dotenv').config()

module.exports = {
    taskList: async function() {
        const { startMenu } = await inquirer.prompt({
            name: 'startMenu',
            type: 'list',
            message: 'What would you like to do?',
            choices: [
                'View departments',
                'View roles',
                'View employees',
                'View managers',
                'Add employee',
                'Add department',
                'Add role',
                'Update employee role',
    //                     // 'Update employee manager',
    //                     // 'Delete employee',
    //                     // 'Delete role',
    //                     // 'Delete department',
                'Exit',
               ], 
        });
        console.log(startMenu);

        switch (startMenu) {
            case 'View employees':
                this.viewEmployees();
                break;

            case 'View departments':
                this.viewDepartments();
                break;

            case 'View roles':
                this.viewRoles();
                    break;

            case 'View managers':
                this.viewManagers();
                break;

            case 'Add employee':
                this.addEmployee();
                break;

            case 'Add department':
                this.addDeptartment();
                break;

            case 'Add role':
                this.addRole();
                break;

            case 'Update employee role':
                this.updateEmpRole();
                break;

            // case 'Update employee manager':
            //     break;
            // case 'Delete employee':
            //     break;
            // case 'Delete department':
            //     break;
            // case 'Delete role':
            //     break;
            case 'Exit':
                break;
                
            default:
                console.log("Bye!");
                process.exit();
                break;
        }
    },
  viewEmployees: async function () {

  },
  
  viewDepartments: async function () {
    const departments = await connection.query(`SELECT * FROM department`);
    console.table(
        departments.map((department) => {
        return { id: department.id, department: department.name };
        })
    );
    this.startMenu();
  },

  viewRoles: async function () {
    const roles = await connection.query(`SELECT * FROM role LEFT JOIN department ON role.department_id = department.id`);
    console.table(roles.map(({ title, salary, name }) => {
        return {
            title, salary, department: name
        };
    }));
    this.startMenu();
  },

  addEmployee: async function (){
    const newEmployee = await inquirer.prompt([
        {
            name: 'first_name',
            type: 'text',
            message: 'What is the first name of the employee?',
        },
        {
            name: 'last_name',
            type: 'text',
            message: 'What is the last name of the employee?',
        },  
    ]);
    const departments = await connection.query(`SELECT * FROM department`);
    const { department_id } = await inquirer.prompt({
        name: 'department_id',
        type: 'list',
        message: 'What department is the employee in?',
        choices: departments.map((department) => {
            return {
                name: department.name,
                value: department.id,
            };
        }),
    });
    console.log(department_id);
    const roles = await connection.query(`SELECT * FROM role WHERE department_id = ?`, [department_id]);
    const { role_id } = await inquirer.prompt ({
        name: 'role_id',
        type: 'list',
        message: 'What is the role of the employee?',
        choices: roles.map((role) => {
            return {
                name: role.title,
                value: role.id,
            };
        }),
    });
    newEmployee.role_id = role_id;
    const { hasManager } = await inquirer.prompt({
        name: 'hasManager',
        type: 'confirm',
        message: 'Does the employee have a manager?',
    });
    if (!hasManager) {
        const res = await connection.query(`INSERT INTO employee SET ?`, [newEmployee]);
        console.log("Success!");
        this.startMenu
    } else {
        const employees = await connection.query(`SELECT * FROM employee`);
        const employeeData = employees.map((employee) => {
            return {
                name: `${employee.first_name} ${employee.last_name}`,
                value: employee.id,
            };
        });
        const { manager_id } = inquirer.prompt({
            name: 'manager_id',
            type: 'list',
            message: 'Who is the manager of the employee?',
            choices: employeeData,
        });
        console.log(manager_id);
        console.log("Success!");
        this.startMenu();
    }
    console.log("New employee added! Data:", newEmployee, department_id, role_id);
    this.startMenu();
  },

  addDeptartment: async function () {
    const { name } = await inquirer.prompt({
        name: 'name',
        type: 'text',
        message: 'What is the department you want to add?',
    });
    await connection.query(`INSERT INTO department SET ?`, [{ name }]);
    console.log("Department added!");
    this.startMenu();
  },

  addRole: async function () {
    const departments = await connection.query(`SELECT * FROM department`);
    const { title, salary, department_id } = await inquirer.prompt([
        {
            name: 'title',
            type: 'text',
            message: 'What is the title of the role you want to add?',
        },    
        {
            name: 'salary',
            type: 'number',
            message: 'What is the salary for this role?',
        },    
        {
            name: 'department_id',
            type: 'list',
            message: 'What department is this role in?',
            choices: departments.map((department) => {
                return { name: department.name, value: department.id }
            }),
        },    
    ]);
    await connection.query(`INSERT INTO role SET ?, ?, ?`, [{ title }, { salary }, { department_id }]);
    console.log("Role added! Data:", title, salary, department_id);
    this.startMenu();
  },  
};

updateEmpRole: 