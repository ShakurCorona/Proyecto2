const express = require('express');
const router = express.Router();
const conexionDB = require('../database');

const controladorUsuario = require('../controllers/usuariocontroller');

router.get('/', controladorUsuario.inicio);
router.get('/pieList', controladorUsuario.listarPies);
router.post('/add', controladorUsuario.guardarPie);
router.get('/update:id', controladorUsuario.editarPies);
router.post('/update:id', controladorUsuario.actualizarPies);
router.get('/delete/:id', controladorUsuario.borrarPie);

module.exports = router;