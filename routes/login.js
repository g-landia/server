
var express = require('express')
    ,jade        = require('jade')
    ,router = express.Router()
    ,config = require('nconf')
    ,userHandler = require('../plugins/users/handler')
    ,authService = userHandler.authService
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
                the: this,
                req: req,
                content: {
                    error: req.flash('error')[0] //this key error from flash

                }
            }
        }
    );
});


router.post('/', authService.authenticate('login', {failureFlash: true, failureRedirect: '/login'}), function(req, res){

        var regStatus = req.user.regStatus;
        if(regStatus === 'waiting' || undefined){
            res.redirect('/seeEmail');
            return;
        } else if(regStatus === "lastStep"){
            res.redirect('/lastStep');
            return;
        }
        res.redirect('/');
    }
);




module.exports =  router;