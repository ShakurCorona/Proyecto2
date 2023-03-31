# Proyecto 2

Frameworks, herramientas, y tecnologias implementadas:
- HTML5.
- CSS.
- Bootstrap.
- Javascript.
- NodeJS.
- MySQL.

## Preparacion del entorno para el proyecto.

Antes de cualquier cosa, es necesario tener instalados NodeJs y MySQL, preferiblemente las versiones mas recientes.
Una vez instalados, sera necesario ejecutar desde CMD, en el directorio del proyecto, el siguiente comando:
```
npm install
```
Este comando ejecutara el Node Package Manager, que instalara todos los modulos necesarios para el uso de este framework en el proyecto.

## Modificaciones.

Es necesario modificar algunos archivos. Para ello, sera necesario tambien instalar algunos paquetes:

```
npm i bcryptjs body-parser connect-flash ejs express: ^4.18.2 express-myconnection express-mysql-session express-session express-validator morgan mysql mysql2 passport passport-local
```

```
npm i nodemon -D
```
Y se deberan editar los campos del archivo:
```
scr/database.js
```
Para que coincidan con el usuario y contraseña necesarios para la conexion a la base de datos (en caso de que tenga un usuario y contraseñas diferentes).

## Ejecución

Para ejecutar el servidor local que hosteara el proyecto, es necesario ejecutar el siguiente comando desde la consola de comandos, en la direccion del proyecto:

```
npm run dev
```
Y listo, ya puede probarlo.
