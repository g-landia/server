var express = require('express')
    ,router = express.Router()
    ,config = require('nconf')
    ,db = require('../db')
    ,gText = require('../language')
    ,mainTemplate = config.get('mainTemplate');//'templates/content/main/index';


/* GET home page. */ //EXAMPLE/////


router.get('/', function(req, res) {

    //res.render(mainTemplate, {getText: gText.language("ru")});

    gText.wrap(req, res, {
        template: mainTemplate,
        data: {
            //this key in the template
            title: "Hello",
            content: {
                exampleKey: "info"
            }
        }
    });

});

//for update language
/*router.post('/', function(req, res, next) {

    //res.render(mainTemplate, {getText: gText.language("ru")});

    gText.wrap(req, res, {
        template: mainTemplate,
        data: {
            //this key in the template
            title: "Hello",
            content: {
                exampleKey: "info"
            }
        }
    });

});*/




module.exports = router;

