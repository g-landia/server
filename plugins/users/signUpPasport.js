/**
 * Created by Vasiliy on 19.11.2015.
 * plugins security authorization
 */

var LocalStrategy  = require('passport-local').Strategy;
var User = require('./db');
var passport = require('passport');

passport.use('signup', new LocalStrategy ({
        passReqToCallback : true,
        usernameField: 'email',
        passwordField: 'password'
    },
    function(req, username, password, done){

        /*User.findOne({ username : username},function(err,user){

         });*/
    }));

module.exports = passport;