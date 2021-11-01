const db = require('./db/connection');
const inquirer = require('inquirer');


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
  const sql = `SELECT role.id, role.title, department.name AS department
               FROM role
               INNER JOIN department ON role.department_id = department.id`;

  db.query(sql, (err, res) => {
    if (err) throw err;
    console.table(res);
    initialOptions();
  });
};

const viewEmployees = () => {
  let sql = `SELECT employee.id, 
  employee.first_name, 
  employee.last_name, 
  role.title, 
  department.name AS department,
  role.salary, 
  CONCAT (manager.first_name, " ", manager.last_name) AS manager
FROM employee
  LEFT JOIN role ON employee.role_id = role.id
  LEFT JOIN department ON role.department_id = department.id
  LEFT JOIN employee manager ON employee.manager_id = manager.id`;

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

const addEmployee = () => {
  db.query('SELECT title, id FROM role', (err, data) => {
    if (err) throw err;

  const roles = data.map(({ title, id }) => ({ name: title, value: id }));
  return inquirer.prompt([
            {
                type: "input",
                name: "firstName",
                message: "What is the first name of the new employee?",
                validate: firstNameInput => {
                  if(firstNameInput) {
                    return true;
                  }
                  else {
                    console.log("Please enter the employee's first name");
                    return false;
                  }
                }
                
            },
            {
              type: "input",
                name: "lastName",
                message: "What is the last name of the new employee?",
                validate: lastNameInput => {
                  if(lastNameInput) {
                    return true;
                  }
                  else {
                    console.log("Please enter the employee's last name");
                    return false;
                }
              } 
          },
          {
            type: "list",
            name: "roleName",
            message: "What is their role?",
            choices: roles
          }
          ])
          .then(response => {
            const params = [response.firstName, response.lastName, roles[response.roleName].value];

            db.query(`SELECT * FROM employee`, (err, data) => {
              const managers = data.map(({ id, first_name, last_name }) => ({ name: first_name + " " + last_name, value: id}));

              if (err) throw err;

              inquirer.prompt ([
                {
                  type: 'list',
                  name: 'manager',
                  message: "Who is the employee's manager?",
                  choices: managers
                }
              ]).then(response => {
                if(response.manager == 'no manager') {
                  response.manager = null;
                  params.push(response.manager);
                }
                params.push(response.manager);
    
              const sql = `INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?,?,?,?)`;
                db.query(sql, params, (err, response) => {
                  if (err) throw err;
                  viewEmployees();
                  initialOptions();
                });
          });
          })
          

        })
      })
    };


const updateEmployeeRole = () => {
  db.query('SELECT * from employee', (err, data) => {
    if (err) throw err;

  const employees = data.map(({ id, first_name, last_name }) => ({ name: first_name + " " + last_name, value: id }));
  return inquirer.prompt([
            {
                type: "list",
                name: "employeeName",
                message: "Which employee would you like to update?",
                choices: employees
                
            }  
          ])
          .then(response => {
            const employee = response.employeeName;
            let params = [];
            params.push(employee);

          db.query(`SELECT * FROM role`, (err, data) => {
            if (err) throw err;
            const roles = data.map(({ id, title }) => ({ name: title, value: id}));
            inquirer.prompt([
              {
                type: 'list',
                name: 'role',
                message: "What is the employee's new role?",
                choices: roles
              }
            ])
            .then(response2 => {
              params = [response2.role, params[0]];
              db.query(`UPDATE employee SET role_id = ? WHERE id = ?`, params, (err, result) => {
                if (err) throw err;
                viewEmployees();
              })
            })
          })
        })
  })              
};



initialOptions();
