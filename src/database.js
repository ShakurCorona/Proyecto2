const mysql = require('mysql2');
const { promisify } = require('util');
const { database } = require('./keys');
const conexionDB = mysql.createPool(database);

conexionDB.getConnection((err, conn) => {
    if (err) {
        if (err.code === 'PROTOCOL_CONNECTION_LOST') {
            console.error('Se ha perdido la conexion a la base de datos.');
        }
        if (err.code === 'ER_CON_COUNT_ERROR') {
            console.error('Hay demasiadas conexiones a la base de datos.');
        }
        if (err.code === 'ECONNREFUSED') {
            console.error('Se ha rechazado la conexion a la base de datos.');
        }
    }

    if (conn) {
        conexionDB.query('CREATE DATABASE IF NOT EXISTS `conelpiederecho`;');
        conexionDB.query('CREATE TABLE IF NOT EXISTS `usuarios` ( id INT(4) UNSIGNED AUTO_INCREMENT PRIMARY KEY, nombreUsuario VARCHAR(45) NOT NULL, correo VARCHAR(70) NOT NULL, contrasenia VARCHAR(60) NOT NULL, telefono VARCHAR(10));');
        conexionDB.query('CREATE TABLE IF NOT EXISTS `pies` ( id INT(4) UNSIGNED NOT NULL AUTO_INCREMENT, idUsuario INT(4) UNSIGNED NOT NULL, nombrePie VARCHAR(45) NOT NULL, ingredientes VARCHAR(200) NOT NULL, PRIMARY KEY (id, idUsuario) );');
        conn.release();
    }
    console.log('La base de datos esta conectada.');
    return;
});

conexionDB.query = promisify(conexionDB.query);

module.exports = conexionDB;