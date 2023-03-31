const pp = require('passport');
const ppL = require('passport-local').Strategy;
const miConexion = require('../database');
const helpFunctions = require('../lib/helpFunctions');

pp.use('local.login', new ppL({
    usernameField: 'correo',
    passwordField: 'contrasenia',
    passReqToCallback: true
}, async (req, correo, contrasenia, done) => {
    const respuesta = await miConexion.query('SELECT * FROM usuarios WHERE correo = ?', [correo]);
    if (respuesta.length > 0) {
        const usuario = respuesta[0];
        const ingreso = await helpFunctions.verificarContrasenia(contrasenia, usuario.contrasenia); 
        if (ingreso) {
            console.log(usuario);
            done(null, usuario, req.flash('exito', 'Bienvenido, ' + usuario.nombreUsuario));
        } else {
            done(null, false, req.flash('error', 'Contraseña incorrecta.'));
        }
    } else {
        return done(null, false, req.flash('error', 'Correo inexistente.'));
    }
}));

pp.use('local.signup', new ppL({
    usernameField: 'nombreUsuario',
    passwordField: 'contrasenia',
    passReqToCallback: true
}, async (req, nombreUsuario, contrasenia, done) => {
    const { correo } = req.body;
    const nuevoUsuario = {
        nombreUsuario,
        correo,
        contrasenia
    };

    nuevoUsuario.contrasenia = await helpFunctions.encriptarTexto(contrasenia);
    const resultado = await miConexion.query('INSERT INTO usuarios SET ?', [nuevoUsuario]);
    nuevoUsuario.id = resultado.insertId;
    return done(null, nuevoUsuario);
}));

pp.serializeUser((user, done) => {
    done(null, user.id);
});

pp.deserializeUser(async (id, done) => {
    const respuesta = await miConexion.query('SELECT * FROM usuarios WHERE id = ?', [id]);
    done(null, respuesta[0]);
});