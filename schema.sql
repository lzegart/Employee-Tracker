DROP DATABASE IF EXISTS employees_db;

CREATE DATABASE employees_db;

USE employees_db;

CREATE TABLE department (
id INT NOT NULL AUTO_INCREMENT KEY,
name VARCHAR(30) NOT NULL,
PRIMARY KEY (id)
);

CREATE TABLE role (
id INT NOT NULL AUTO_INCREMENT KEY,
title VARCHAR(30) NOT NULL,
salary DECIMAL (10,2),
department_id INT,
PRIMARY KEY (id)
);

CREATE TABLE employee (
id INT AUTO_INCREMENT KEY,
first_name VARCHAR(30) NOT NULL,
last_name VARCHAR(30) NOT NULL,
role_id INT,
manager_id INT,
PRIMARY KEY (id)
);
