# Employee Tracker-Node.js and MySQL

## Description

This project allows users to view and enter in employee data from the command line with Node.js. The data is then inserted into tables with SQL. The purpose of this project was to learn how to combine node.js, inquirer, and SQL to create a content management system that allows the user tto manage a company's employee data. The user can view and add departments, roles, and employees.


## Installation

To install this project, you can clone the repository by using the command prompt

$ git clone https://github.com/AllysonMcGrath/employee-tracker.git

Detailed instructions for cloning GitHub repositories can be found [here.](https://docs.github.com/en/github/creating-cloning-and-archiving-repositories/cloning-a-repository-from-github/cloning-a-repository)



## Usage

When displaying correctly, the terminal should look like the below image:

![Command line with question prompts](/assets/employeetracker.JPG)

To use this application, you need to install the dependencies with the following commands:

npm install<br/>
npm install inquirer<br/>
npm install dotenv<br/>
npm install mysql2<br/>
npm install console.tables<br/>

To create the databases:<br/>
mysql -u <username> -p <password><br/>
source db/db.sql<br/>
source db/schema.sql<br/>

To start the application:

node index.js

## Credits

Trilogy Education Services, LLC, a 2U, Inc. brand

[Coding Boot Camp at UT](https://github.com/the-Coding-Boot-Camp-at-UT)



## License

MIT License

Copyright (c) 2021 Allyson McGrath

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
