/**
 * Created by Vasiliy on 24.11.2015.
 */

var LocalStrategy   = require('passport-local').Strategy,
    passport = require('passport')
    ,db = require('../../db');

passport.use('login', new LocalStrategy({
        passReqToCallback : true,
        usernameField: 'email',
        passwordField: 'password'
    },
    function (req, email, password, done) {
        db.query('queryRow', 'SELECT * FROM `users` WHERE `email` = ?', [email])
            .then(function (user) {
                // if query was successful
                if (password == user.password) {
                    console.log('password: ' + password);
                    console.log('email: ' + user.email);
                    return done(null, {
                        username: user.firstName,
                        language: user.language //data the session
                        //here you need to add data for the session
                    });
                }
                return done(null, false, {
                    message: 'errorLogin' //this is key for language
                });
            }).catch(function (err) {
                // if query threw an error
                console.log('Error');
                console.log(err);
                return done(null, false, {
                    message: 'errorLogin' //this is key for language
                });
            });
    }
));


module.exports = passport;
