var express = require('express')
    ,router = express.Router()
    ,config = require('nconf')
    ,db = require('../db')
    ,gText = require('../language')
    ,profileTemplate = 'content/profile';


router.get('/', function(req, res){
   gText.wrap(req, res, {
       template: profileTemplate,
       data: {

       }
   })
});

module.exports = router;