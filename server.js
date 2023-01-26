//import inquirer, mysql2 and console.table
const inquirer = require('inquirer'); 
const mysql2 = require('mysql2')
const consoleTable = require('console.table'); 

require('dotenv').config()

//user questions

const userQuestions = () => {
    inquirer.prompt ([
      {
        type: 'list',
        name: 'actions', 
        message: 'Please select an action',
        choices: [
            'View all departments', 
            'View all roles', 
            'View all employees', 
            'Add a department', 
            'Add a role', 
            'Add an employee', 
            'Update an employee role',
            'No Action']
      }
    ])

    .then((answers) => {
        const { actions } = answers; 
  
        if (actions === "View all departments") {
          showDepartments();
        }
  
        if (actions === "View all roles") {
          showRoles();
        }
  
        if (actions === "View all employees") {
          showEmployees();
        }
  
        if (actions === "Add a department") {
          addDepartment();
        }
  
        if (actions === "Add a role") {
          addRole();
        }
  
        if (actions === "Add an employee") {
          addEmployee();
        }
  
        if (actions === "Update an employee role") {
          updateEmployee();
        }

        if (actions === "No Action Needed") {
          connection.end()
      };
    });
  };

  