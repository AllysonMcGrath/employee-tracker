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
    fetch('http://localhost:3001/api/departments')
    .then(response => {
        return response.json();
    })
    .then(response => {
        console.table(response.data);
        initialOptions();
    })
};

const viewRoles = () => {
    fetch('http://localhost:3001/api/roles')
    .then(response => {
        return response.json();
    })
    .then(response => {
        console.table(response.data);
        initialOptions();
    })
};

const viewEmployees = () => {
    fetch('http://localhost:3001/api/employees')
    .then(response => {
        return response.json();
    })
    .then(response => {
        console.table(response.data);
        initialOptions();
    })
};

const fetchRoles = () => {
    let roleData = fetch('http://localhost:3001/api/roles')
                    .then(response => {
                        return response.json();
                    })
                    .then(response => {
                        response.data.forEach(element => roleChoices[element.title] = element.id);
                        response.data.forEach(element => roleChoicesList.push(element.title));
                    })
};

async function getRoleChoices() {
    await fetchRoles();
}

const addEmployee = () => {
    getRoleChoices();
    return inquirer.prompt([
        {
            type: "input",
            name: "first_name",
            message: "What is the employee's first name?",
            validate: first_nameInput => {
              if(first_nameInput) {
                return true;
              }
              else {
                console.log("Please enter the employee's name");
                return false;
              }
            },
            
        },
        {
            type: "input",
            name: "last_name",
            message: "What is the employee's last name?",
            validate: last_nameInput => {
              if(last_nameInput) {
                return true;
              }
              else {
                console.log("Please enter the employee's name");
                return false;
              }
            }
        },
        {
            type: "list",
            name: "role_id",
            message: "What is the employee's role?",
            choices: roleChoicesList
        },
        // {
        //     type: "list",
        //     name: "manager_id",
        //     message: "Who is the employee's manager?",
        //     choices: managerChoices
        // }
        ]).then(response => {
            response.role_id = roleChoices[response.role_id];
            console.log(response);
            fetch('http://localhost:3001/api/employees', {
                method: 'post',
                body: response
            })
        .then(function(response) {
            console.log(response);
            console.log("it posted!")
            initialOptions();
        });
};

initialOptions();