USE employees_db;

INSERT INTO department 
    (name)
VALUES 
    ("Sales"), 
    ("Engineering"), 
    ("Legal"), 
    ("Finance");

INSERT INTO role
    (title, salary, department_id)
VALUES
    ("Sales Lead", 100000, 1),
    ("Salesperson", 80000, 1),
    ("Lead Engineer", 150000, 2),
    ("Software Engineer", 120000, 2),
    ("Accountant", 125000, 4),
    ("Legal Team Lead", 250000, 3),
    ("Lawyer", 190000, 3);

INSERT INTO employee
    (first_name, last_name, role_id, manager_id)
VALUES
    ("Scrouge", "McDuck", 6, null),
    ("Bugs", "Bunny", 5, null),
    ("Daisy", "Duck", 3, null),
    ("Mickey", "Mouse", 1, 2),
    ("Minnie", "Mouse", 7, 1),
    ("Donald", "Duck", 2, 4),
    ("Tweety", "Bird", 4, 3),
    ("Sylvester", "Cat", 4, 3),
    ("Pluto", "Dog", 2, 4);
