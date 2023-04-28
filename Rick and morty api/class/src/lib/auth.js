module.exports = {
    //Estas 2 funciones nunca regresan que el usuario si esta autentificado, aunque haya comprobado que si paso el test
    isLoggedIn(req, res, next) {
        console.log("req:")
        console.log(req.isAuthenticated());
        if (req.isAuthenticated()) {
            return next();
        } else {
            res.redirect('/signin');
        }
    },

    isNotLoggedIn(req, res, next) {
        if (!req.isAuthenticated()) {
            return next();
        } else {
            res.redirect('/profile');
        }
    }

}