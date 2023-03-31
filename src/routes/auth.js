const express = require('express');
const router = express.Router();
const pp = require('passport');
const { existeSesion } = require('../lib/helpFunctions');

router.get('/signup', (req, res) => {
    res.render('signlog/signup', {
        title: "Inicio de sesion",
    });
});

router.post('/signup', pp.authenticate('local.signup', {
    successRedirect: '/profile',
    failureRedirect: '/signup',
    failureFlash: true
}));

router.get('/login', (req, res) => {
    res.render('signlog/login', {
        title: "Registro de usuarios",
    });
});

router.post('/login', (req, res, next) => {
    pp.authenticate('local.login', {
        successRedirect: '/profile',
        failureRedirect: '/login',
        failureFlash: true
    })(req, res, next);
});

router.get('/logout', (req, res, next) => {
    req.logout((err) => {
        if (err) { return next(err); }
        res.redirect('/');
      });
    res.redirect('/login');
});

router.get('/profile', existeSesion, (req, res) => {
    res.render('./profile', {
        title: "Perfil"
    });
});

module.exports = router;