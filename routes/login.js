
var express = require('express')
    ,jade        = require('jade')
    ,router = express.Router()
    ,config = require('nconf')
    ,userHandler = require('../plugins/users/handler')
    ,authPassport = userHandler.authPassport
    ,template = "content/login"
    ,gText = require('../language')
    ,wrapLang = gText.wrap;



router.get('/', function (req, res) {

    if (req.isAuthenticated()) {
        res.redirect('/');
        return;
    }

    wrapLang(req, res,{
            template: template,
            data: {
                title: "login",
                content: {
                    error: req.flash('error')[0] //this key error from flash
                }
            }
        }
    );
});


router.post('/', authPassport.authenticate('login', {
        successRedirect: '/',
        failureRedirect: '/login',
        failureFlash: true })
);




module.exports =  router;