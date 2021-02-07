const inquirer = require('inquirer');
const mysql = require('mysql');
const util = require('util')
require('dotenv').config()

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
    }
    
}