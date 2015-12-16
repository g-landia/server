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
        db.withDb(function(err, connection){

            connection.queryRow('SELECT * FROM users where email=?', [email], function(err, user){
                if (password == user.password) {

                    return done(null, {
                        username: user.firstName,
                        language: user.language//data the session
                        //here you need to add data for the session
                    });
                }
                return done(null, false, {
                    message: 'errorLogin' //this is key for language
                });

            });

        });
    }
));


module.exports = passport;
