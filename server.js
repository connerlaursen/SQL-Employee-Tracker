//import inquirer, mysql2 and console.table
const inquirer = require('inquirer');
const mysql2 = require('mysql2')
const consoleTable = require('console.table');

require("dotenv").config();
const mysql = require('mysql2');

const db = mysql.createConnection({

  host: "localhost",
  user: "root",
  password: process.env.PW,
  database: "employeesdb",
  socketPath: '/tmp/mysql.sock'

},
  console.log("You are connected to the db!")
)

db.connect();

module.exports = db;

require('dotenv').config()

//user questions

const userQuestions = () => {
  inquirer.prompt([
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
        'Quit']
    }
  ])

    .then((answers) => {

      const { actions } = answers;

      if (actions === "View all departments") {
        viewDepartments();
      }

      if (actions === "View all roles") {
        viewRoles();
      }

      if (actions === "View all employees") {
        viewEmployees();
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

      if (actions === "Quit") {
        db.end()
      };
    });
};

viewDepartments = () => {
  db.query('SELECT * FROM department', function (err, answers) {
    console.table(answers);
    userQuestions();
  })
};

viewRoles = () => {
  db.query('SELECT role.id, role.title, role.salary, department.name FROM role LEFT JOIN department ON role.department_id = department.id', function (err, answers) {
    console.table(answers);
    userQuestions();
  })
};

viewEmployees = () => {
  db.query('SELECT employee.first_name, employee.last_name, employee.manager_id, role.title FROM employee LEFT JOIN role ON employee.role_id = role.id', function (err, answers) {
    console.table(answers);
    userQuestions();
  })
};

addDepartment = () => {
  inquirer.prompt([
    {
      type: 'input',
      name: 'newDepartment',
      message: 'Please input department name'
    }])
    .then((answers) => {
      db.query('INSERT INTO department(name) VALUES (?)', answers.newDepartment), viewDepartments()
    })
};

addRole = () => {
  inquirer.prompt([
    {
      type: "input",
      name: "title",
      message: "What is the title?"

    },
    {
      type: "input",
      name: "salary",
      message: "What is the salary?"

    },
    {
      type: 'list',
      name: 'department',
      message: 'Please select a department id (Sales=1, Engineering=2, Finance=3)',
      choices: [
        '1',
        '2',
        '3'
      ]
    }])
    .then((answers) => {
      db.query('INSERT INTO role(title, salary, department_id) VALUES (?,?,?)', [answers.title, answers.salary, answers.department]), viewRoles()
    })
};

addEmployee = () => {
  inquirer.prompt([
    {
      type: "input",
      name: "firstName",
      message: "What is the their first name?"

    },
    {
      type: "input",
      name: "lastName",
      message: "What is their last name?"

    },
    {
      type: "list",
      name: "role",
      message: "What is their role_id(1=sales Rep and 2=software engineer)?",
      choices: [
        '1',
        '2'
      ]

    },
    {
      type: 'list',
      name: 'manager',
      message: 'Please select a manager id (Conner=1 and manages everyone)',
      choices: [
        '1'
      ]
    }])
    .then((answers) => {
      db.query('INSERT INTO employee(first_name, last_name, role_id, manager_id) VALUES (?,?,?,?)', [answers.firstName, answers.lastName, answers.role, answers.manager]), viewEmployees()
    })
};



updateEmployee = () => {
  db.query('SELECT * FROM role', (err, result) => {
    if (err) throw err;
    roleArray = result.map(role => {
      return {
        name: role.title,
        value: role.id
      };
    });

    db.query('SELECT * FROM employee', (err, result) => {
      if (err) throw err;
      employeeArray = result.map(firstName => {
        return {
          name: firstName.first_name,
          value: firstName.id
        };
      })

      inquirer.prompt([
        {
          type: "list",
          name: "firstName",
          message: "What is the name of the employee you would like to update",
          choices: employeeArray

        },
        {
          type: "list",
          name: "roleChange",
          message: "What is the role you would like to update to?",
          choices: roleArray

        }])
         .then((answers) => {
            db.query('UPDATE employee SET role_id = ? WHERE id = ?;', [answers.roleChange, answers.firstName]), viewEmployees()
          })
    })
  })

};

userQuestions()