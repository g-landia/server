
var jade = require('jade');
var passport = require('passport');
var authPassport = require('./authPassport');
var signUpPassport = require('./authPassport');
var authService = require('./authService');




passport.serializeUser(function (user, done) {
    done(null, JSON.stringify(user));
});


passport.deserializeUser(function (data, done) {
    try {
        done(null, JSON.parse(data));
    } catch (e) {
        done(err)
    }
});



//here is all objects Users
var handler = function(){
    return {
        authPassport: authPassport,
        signUpPassport: signUpPassport
    }
};

exports.authPassport = authPassport;
exports.signUpPassport = signUpPassport;
exports.authService = authService;




