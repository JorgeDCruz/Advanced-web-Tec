const express = require('express');
const router = express.Router();
const passport = require('passport');
const { isLoggedIn, isNotLoggedIn } = require('../lib/auth');
const { encryptPassword, matchPassword } = require('../lib/helpers')

const pool = require('../database');

router.get('/signin', isNotLoggedIn, (req, res) => {
    res.render('auth/signin')
})

//Pedimos que se renderise la pantalla de signup 
router.get('/signup', isNotLoggedIn, (req, res) => {
    res.render('auth/signup')
})

router.post('/signin', isNotLoggedIn, (req, res, next) => {
    passport.authenticate('local.signin', {
        successRedirect: '/profile',
        failureRedirect: '/signin',
        failureFlash: true
    })(req, res, next)
})

router.post('/signup', isNotLoggedIn, async (req, res) => {
    //Obtenemos ambos campos
    const {username, password} = req.body;

    const rows = await pool.query("SELECT * FROM USER WHERE username = \"" + username + "\"");
    console.log(rows);
    if(rows.length == 0){
        const encPassword = await encryptPassword(password);
        await pool.query("Insert INTO user (id, username, password) values(" + 1 + ", \"" + username + "\", " + "\"" + encPassword + "\")")
        
        req.flash('message', 'Usuario creado con exito');
        res.redirect('/signin')
    }else{
        req.flash('message', 'Ya existe el usuario');
        res.redirect('/signup');
    }
})

router.get('/profile', isLoggedIn, (req, res) => {
    res.render('profile');
})

router.get('/logout', isLoggedIn, (req, res) => {
    req.logOut();
    res.redirect('/signin');
})

router.post('/change-password', isLoggedIn, async (req, res) => {
    const { newPassword, repeatPassword } = req.body;
    if (newPassword !== repeatPassword) {
        req.flash('message', 'Las contraseñas no coinciden');
        res.redirect('/profile')
    } else {
        const newUser = {
            password: await encryptPassword(newPassword)
        }
        await pool.query('UPDATE User set ? WHERE id = ?', [newUser, req.user.id])
        req.flash('success', 'Contraseña actualizada correctamente');
        res.redirect('/profile')
    }
})

module.exports = router;