var express = require('express')
    ,router = express.Router()
    ,config = require('nconf')
    ,db = require('../../db')
    ,gText = require('../../language')

    ,renderWithLang = gText.renderWrap;


router.get('/', function(req, res) {
    /*var query = req.query;
     if(query.ln ){}
     //(req.user)?*/

    renderWithLang(req, res, {
        template: 'content/faq',
        data: {
            //this key in the template
            title: "titleFaq",
            content: {
                exampleKey: "info"
            }
        }
    });

});


module.exports = router;