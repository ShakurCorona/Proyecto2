const conexionDB = require('../database');

const controller = {};

controller.inicio = (req, res) => {
    res.render('index', {
        title: "Inicio",
        signlog: "Iniciar sesion"
    });
}

controller.listarPies = (req, res) => {
    conexionDB.getConnection((err, conn) => {
        conn.query('SELECT * FROM pies where idUsuario = ?', [req.user.id], (err, pies) => {
            if (err) {
                next(err);
            }
            res.render('pies', {
                data: pies,
                title: "Lista de pies"
            });
        });
    });
};

controller.guardarPie = (req, res) => {
    const { nombrePie } = req.body;
    const { ingredientes } = req.body;
    const idUsuario = req.user.id;
    const nuevoPie = {
        idUsuario,
        nombrePie,
        ingredientes
    }

    conexionDB.getConnection((err, conn) => {
        conn.query('INSERT INTO pies SET ? ', [nuevoPie], (err, usuario) => {
            res.redirect('/pieList');
        });
    });
};

controller.editarPies = (req, res) => {
    const { id } = req.params;
    conexionDB.getConnection((err, conn) => {
        conn.query('SELECT * FROM pies WHERE id = ? ', [id], (err, pies) => {
            res.render('editarPies', {
                title: "Editar mis pies",
                data: pies[0]
            });
        });
    });
};

controller.actualizarPies = (req, res) => {
    const { id } = req.params;
    const pieEditado = req.body;
    conexionDB.getConnection((err, conn) => {
        conn.query('UPDATE pies SET ? WHERE id = ? ', [pieEditado, id], (err, pieEditado) => {
            res.redirect('/pieList');
        });
    });
};

controller.borrarPie = (req, res) => {
    const { id } = req.params;
    conexionDB.getConnection((err, conn) => {
        conn.query('DELETE FROM pies WHERE id = ?', [id], (err, pie) => {
            res.redirect('/pieList');
        });
    });
};

module.exports = controller;