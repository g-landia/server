var express = require('express')
    ,router = express.Router()
    ,config = require('nconf')
    ,db = require('../db')
    ,gText = require('../language')
    ,admin = require('../plugins/admin/handler')
    ,renderWithLang = gText.renderWrap

    ,templates = config.get('templates')
    ,templateAdmin = templates.admin
    ,not_foundTemplate = templates.not_found;


router.get('/', function(req, res) {
    var user = (req.user)? req.user: {};
    if(user.rights === 'root'){
        admin.get(req, res)
    } else{ // if user is not root admin
        res.status(404);
        renderWithLang(req, res, {
            template: not_foundTemplate,
            data: {}
        })
    }
});

router.post('/', function(req, res){
    var user = (req.user)? req.user: {};
    if(user.rights === 'root'){
        admin.post(req, res)
    } else{ // if user is not root admin
        res.status(404);
        renderWithLang(req, res, {
            template: not_foundTemplate,
            data: {}
        })
    }
});


module.exports = router;