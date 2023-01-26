USE employeesdb;

INSERT INTO department(name)
VALUES
    ("sales"),
    ("engineering"),
    ("finance");

INSERT INTO role(title, salary, department_id)
VALUES
    ("sales_rep", 50000, 1),
    ("sales_manager", 70000, 2)
    ("software_engineer", 100000, 2),
    ("software_engineer_manager", 120000, 2),
    ("accountant", 70000, 3)
    ("finance_manager", 100000, 3);

INSERT INTO employee(first_name, last_name, role_id, manager_id)
VALUES
    ("Conner", "Laursen", 4, NULL),
    ("John", "Doe", 1, 3),
    ("Elyse", "Kelsey", 2, NULL),
    ("Austin", "Sears", 5, 5),
    ("Ryan", "Pak", 6, NULL),
    ("Gunnar", "Olson", 3, 1);


