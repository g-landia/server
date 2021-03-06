var express = require('express')
    ,router = express.Router()
    ,gText = require('../../language')
    ,renderWithLang = gText.wrap
    ,authService = require('../../plugins/users/authService.js');
/*
router.post('/', function(req, res){
	authService.register(req,res,function(status,msg){
		if (status) {
			console.log('Success');
			console.log(msg);
		} else {
			console.log('Error');
			console.log(msg);
		}

	});
    res.redirect('/');
});*/


var template = "content/register";

router.get('/', function (req, res){
        if (req.isAuthenticated()) {
            res.redirect('/');
            return;
        }
        renderWithLang(req, res, {
                template: template,
                data: {
                    content: {
                        error: req.flash('error')[0]
                    }
                }
            }
        );
    }
);

router.post('/', authService.authenticate('register', {
        successRedirect: '/',
        failureRedirect: '/register',
        failureFlash: true
    })
);



module.exports = router;




