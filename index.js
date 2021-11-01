const db = require('./db/connection');
const inquirer = require('inquirer');
let roleChoices = {};
let roleChoicesList = [];


const initialOptions = () => {
    return inquirer.prompt([
      {
          type: "list",
          name: "initialChoices",
          message: "What do you want to do?",
          choices: [
            "view all departments", 
            "view all roles", 
            "view all employees", 
            "add a department", 
            "add a role", 
            "add an employee",
            "update an employee role"
          ]
      }
      
  ]).then(data => {
    if (data.initialChoices == "view all departments") {
        viewDepartments();
      }
      else if (data.initialChoices == "view all roles") {
        viewRoles();
      }

      else if (data.initialChoices == "view all employees") {
        viewEmployees();
      }
      else if (data.initialChoices == "add a department") {
        addDepartment();
      }
      else if (data.initialChoices == "add a role") {
        addRole();
      }
      else if (data.initialChoices == "add an employee") {
        addEmployee();
      }
      else {
        updateEmployeeRole();
      }
  });
};

const viewDepartments = () => {
  let sql = `SELECT * FROM department`;

  db.query(sql, (err, res) => {
    if (err) throw err;
    console.table(res);
    initialOptions();
  });
};

const viewRoles = () => {
  let sql = `SELECT * FROM role`;

  db.query(sql, (err, res) => {
    if (err) throw err;
    console.table(res);
    initialOptions();
  });
};

const viewEmployees = () => {
  let sql = `SELECT * FROM employee`;

  db.query(sql, (err, res) => {
    if (err) throw err;
    console.table(res);
    initialOptions();
  });
};


const addDepartment = () => {
  return inquirer.prompt([
            {
                type: "input",
                name: "newDepartment",
                message: "What is the name of the new department?",
                validate: newDepartmentInput => {
                  if(newDepartmentInput) {
                    return true;
                  }
                  else {
                    console.log("Please enter the department's name");
                    return false;
                  }
                }
                
            }
          ])
          .then(response => {
            const sql = `INSERT INTO department (name) VALUES (?)`;
              db.query(sql, response.newDepartment, (err, response) => {
                if (err) throw err;
                viewDepartments();
                initialOptions();
              });
          });
}

const addRole = () => {
  db.query('SELECT name, id FROM department', (err, data) => {
    if (err) throw err;

    const departments = data.map(({ name, id }) => ({ name: name, value: id }));
  return inquirer.prompt([
            {
                type: "input",
                name: "title",
                message: "What is the name of the new role?",
                validate: titleInput => {
                  if(titleInput) {
                    return true;
                  }
                  else {
                    console.log("Please enter the role's name");
                    return false;
                  }
                }
                
            },
            {
              type: "input",
              name: "salary",
              message: "What is the salary?",
              validate: salaryInput => {
                if(salaryInput) {
                  return true;
                }
                else {
                  console.log("Please enter the salary");
                  return false;
                }
              } 
          },
          {
            type: "list",
            name: "departmentName",
            message: "What is the department name?",
            choices: departments
          }
          ])
          .then(response => {
            const sql = `INSERT INTO role (title, salary, department_id) VALUES (?,?,?)`;
              db.query(sql, [response.title, response.salary, departments[response.departmentName].value], (err, response) => {
                if (err) throw err;
                viewRoles();
                initialOptions();
              });
          });

        })
      };

      

initialOptions();