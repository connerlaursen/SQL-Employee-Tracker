DROP DATABASE IF EXISTS employeesdb;
CREATE DATABASE employeesdb;

USE employeesdb;

CREATE TABLE department(
id INT PRIMARY KEY AUTO_INCREMENT,
name varchar(30)
);

CREATE TABLE role(
id INT PRIMARY KEY AUTO_INCREMENT,
title VARCHAR(30),
salary DECIMAL,
department_id INT,
FOREIGN KEY(department_id)
REFERENCES department(id)
ON DELETE CASCADE
);

CREATE TABLE employee(
id INT PRIMARY KEY AUTO_INCREMENT,
first_name VARCHAR(30),
last_name VARCHAR(30),
role_id INT,
manager_id INT,
FOREIGN KEY(role_id)
REFERENCES role (id)
ON DELETE CASCADE,
FOREIGN KEY(manager_id)
REFERENCES employee(id)
ON DELETE SET NULL
);
