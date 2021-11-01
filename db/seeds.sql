INSERT INTO department (name)
VALUES
  ('Transportation'),
  ('Communications'),
  ('Social Media');

INSERT INTO role (title, salary, department_id)
VALUES
('Manager', 60, 1),
('Engineer', 50, 2),
('Intern', 15, 3);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES
('John', 'Doe', 1, NULL),
('Jane', 'Smith', 2, 1),
('Darcy', 'Lewis', 3, 2),
('Jane', 'Foster', 1, NULL),
('Bobbi', 'Morse', 1, NULL);