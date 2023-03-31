const express = require('express');
const morgan = require('morgan');
const path = require('path');
const sesion = require('express-session');
const MySQLStore = require('express-mysql-session')(sesion);
const miConexion = require('express-myconnection');
const pp = require('passport');
const { database } = require('./keys');
const flash = require('connect-flash');
const bodyParser = require('body-parser');

const app = express();
require('./lib/passport');

// Configuraciones.
app.set('port', process.env.PORT || 3000);
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Archivos estaticos.
app.use(express.static(path.join(__dirname, 'public')));

// Middlewares.
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(sesion({
    key: 'TestDriveSession',
    secret: 'TestDriveSecret',
    resave: false,
    saveUninitialized: false,
    store: new MySQLStore(database)
}));
app.use(pp.initialize());
app.use(pp.session());
app.use(flash());

// Variables globales.
app.use((req, res, next) => {
    app.locals.exito = req.flash('exito');
    app.locals.error = req.flash('error');
    app.locals.usuario = req.user;
    next();
  });

// Rutas.
app.use(require('./routes'));
app.use(require('./routes/auth'));

// Iniciando el servidor.
app.listen(app.get('port'), () => {
    console.log('Servidor en puerto 3000');
});