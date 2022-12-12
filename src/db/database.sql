CREATE DATABASE IF NOT EXISTS common_auth_db DEFAULT CHARACTER SET utf8 COLLATE utf8_general_ci;

USE common_auth_db;

CREATE TABLE IF NOT EXISTS admin (
    id_admin VARCHAR(512) NOT NULL PRIMARY KEY UNIQUE,
    email VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL,
    createdAt TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS application (
    id_application VARCHAR(512) NOT NULL PRIMARY KEY UNIQUE,
    name VARCHAR(255) NOT NULL,
    description VARCHAR(255) NOT NULL,
    manager_password VARCHAR(255) NOT NULL,
    redirect_url VARCHAR(255) NOT NULL,
    createdAt TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    id_admin VARCHAR(512) NOT NULL,
    FOREIGN KEY (id_admin) REFERENCES admin(id_admin)
);

CREATE TABLE IF NOT EXISTS application_image ( 
    id_application_image INT NOT NULL AUTO_INCREMENT PRIMARY KEY UNIQUE,
    id_image VARCHAR(512) NOT NULL,
    image_url VARCHAR(255) NOT NULL,
    id_application VARCHAR(512) NOT NULL UNIQUE,
    FOREIGN KEY (id_application) REFERENCES application(id_application)
);

CREATE TABLE IF NOT EXISTS rol (
    id_rol INT NOT NULL AUTO_INCREMENT PRIMARY KEY UNIQUE,
    name VARCHAR(255) NOT NULL,
    is_default BOOLEAN NOT NULL,
    id_application VARCHAR(512) NOT NULL,
    FOREIGN KEY (id_application) REFERENCES application(id_application)
);

CREATE TABLE IF NOT EXISTS user (
    id_user VARCHAR(512) NOT NULL PRIMARY KEY UNIQUE,
    email VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL,
    createdAt TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS user_image (
    id_user_image INT NOT NULL AUTO_INCREMENT PRIMARY KEY UNIQUE,
    id_image VARCHAR(512) NOT NULL,
    image_url VARCHAR(255) NOT NULL,
    id_user VARCHAR(512) NOT NULL UNIQUE,
    FOREIGN KEY (id_user) REFERENCES user(id_user)
);

CREATE TABLE IF NOT EXISTS user_rol (
    id_user VARCHAR(512) NOT NULL PRIMARY KEY,
    id_rol INT NOT NULL,
    FOREIGN KEY (id_user) REFERENCES user(id_user),
    FOREIGN KEY (id_rol) REFERENCES rol(id_rol)
);
