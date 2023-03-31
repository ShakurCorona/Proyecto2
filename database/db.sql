-- Creando la base de datos.
CREATE DATABASE conelpiederecho;

-- Utilizando la base de datos.
USE conelpiederecho;

-- Creando las tablas.
CREATE TABLE usuarios (
    id INT(4) UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    nombreUsuario VARCHAR(45) NOT NULL,
    correo VARCHAR(70) NOT NULL,
    contrasenia VARCHAR(60) NOT NULL,
    telefono VARCHAR(10)
);

CREATE TABLE IF NOT EXISTS usuarios (
    id INT(4) UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    nombreUsuario VARCHAR(45) NOT NULL,
    correo VARCHAR(70) NOT NULL,
    contrasenia VARCHAR(60) NOT NULL,
    telefono VARCHAR(10)
);

CREATE TABLE IF NOT EXISTS pies (
    id INT(4) UNSIGNED NOT NULL AUTO_INCREMENT,
    idUsuario INT(4) UNSIGNED NOT NULL,
    nombrePie VARCHAR(45) NOT NULL,
    ingredientes VARCHAR(200) NOT NULL,
    PRIMARY KEY (id, idUsuario)
);

-- Mostrando todas las tablas.
SHOW TABLES;

-- Describiendo la tabla.
DESCRIBE usuarios;