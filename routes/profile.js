var express = require('express')
    ,router = express.Router()
    ,config = require('nconf')
    ,db = require('../db')
    ,gText = require('../language')

    ,renderWithLang = gText.renderWrap
    ,profileTemplate = 'content/profile';


router.get('/', function(req, res){
    renderWithLang(req, res, {
       template: profileTemplate,
       data: {

       }
   })
});

module.exports = router;