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

INSERT INTO employee (first_name, last_name, role_id)
VALUES
('John', 'Doe', 1),
('Jane', 'Smith', 2),
('Darcy', 'Lewis', 3);