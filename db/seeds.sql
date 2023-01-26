USE employeesdb;

INSERT INTO department(name)
VALUES
    ("sales"),
    ("engineering"),
    ("finance");

INSERT INTO role(title, salary, department_id)
VALUES
    ("sales_rep", 80000, 1),
    ("software_engineer", 100000, 2),
    ("finance_manager", 90000, 3);

INSERT INTO employee(first_name, last_name, role_id, manager_id)
VALUES
    ("Conner", "Laursen", 3, NULL),
    ("John", "Doe", 1, 1),
    ("Elyse", "Kelsey", 2, 2)
