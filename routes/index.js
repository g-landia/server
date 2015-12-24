var express = require('express')
    ,router = express.Router()
    ,config = require('nconf')
    ,db = require('../db')
    ,gText = require('../language')

    ,mainTemplate = config.get('templates').content
    ,renderWithLang = gText.renderWrap;



/* GET home page. */ //EXAMPLE/////


router.get('/', function(req, res) {
    /*var query = req.query;
    if(query.ln ){}
    //(req.user)?*/

    renderWithLang(req, res, {
        template: mainTemplate,
        data: {
            //this key in the template
            title: "Hello",
            text: db.langObj,
            req: req,
            content: {
                exampleKey: "info"
            }
        }
    });

});

//for update language
router.post('/', function(req, res, next) {
    req.flash('testInfo', 'Flash work');
    //res.render(mainTemplate, {getText: gText.language("ru")});
    res.redirect('/');
    /*gText.wrap(req, res, {
        template: mainTemplate,
        data: {
            //this key in the template
            title: "Hello",
            content: {
                exampleKey: "info"
            }
        }
    });*/

});




module.exports = router;

