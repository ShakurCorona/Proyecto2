const encriptador = require('bcryptjs');

const helpFunctions = {};

helpFunctions.encriptarTexto = async (texto) => {
    const salt = await encriptador.genSalt(15);
    const textoHasheado = await encriptador.hash(texto, salt);
    return textoHasheado;
};

helpFunctions.verificarContrasenia = async (contraseniaPeticion, contraseniaReal) => {
    try {
        return await encriptador.compare(contraseniaPeticion, contraseniaReal);
    } catch (e) {
        console.log(e);
    }
};

helpFunctions.existeSesion = (req, res, next) => {
    if (req.isAuthenticated()) {
        return next();
    }
    return res.redirect('/signup');
}

module.exports = helpFunctions;