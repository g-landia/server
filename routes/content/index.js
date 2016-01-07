var express = require('express')
    ,router = express.Router()
    ,config = require('nconf')
    ,db = require('../../db')
    ,gText = require('../../language')
    ,renderWithLang = gText.renderWrap;



/* GET home page. */ //EXAMPLE/////





router.get('/', function(req, res) {
    /*var query = req.query;
    if(query.ln ){}
    //(req.user)?*/

    renderWithLang(req, res, {
        template: 'content/index',
        data: {
            //this key in the template
            title: 'titleHomePage',
            smoothscroll: 'smoothscroll',
            text: db.langObj,
            content: {
                exampleKey: "info"
            }
        }
    });

});

//for update language
router.post('/', function(req, res) {
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

