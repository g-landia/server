var config         = require('nconf')
    ,db = require('../../db')
    ,gText = require('../../language')
    ,renderWithLang = gText.renderWrap

    ,templates = config.get('templates')
    ,templateAdmin = templates.admin
    ,not_foundTemplate = templates.not_found;


/*
* Languages keys
*
*
*
* */

//Action editing language

var action = function(query){

    console.log('QUERY QUERY');
    console.log(query);

    if(query.action === 'save'){ //if action save
        delete query.action; // remove key action
        return db.query('update', 'keys_languages', query)// body = {id: 123, name: "nameKey", en: "text English", ru: "text Russian"}
            .then(function(res){

                console.log("SAVE SAVE");
                console.log(res);

                return db.updateLanguage(); // update local language
            })
    }else if(query.action === 'remove'){ // remove key
        return db.query('delete', 'keys_languages', {id: query.id})
            .then(function(res){

                console.log('DELETE DELETE');
                console.log(res);

                return db.updateLanguage();
            })
    }else if(query.action === 'add_key'){ // add new key
        delete query.action;
        return db.query('insert', 'keys_languages', query)
            .then(function(res){

                console.log("NEW SAVE NEW SAVE");
                console.log(res);

                return db.updateLanguage();
            });
    }


};



var renderGet = function(req, res) {
    var query = req.query;
    renderWithLang(req, res, {
        template: templateAdmin,
        data: {
            title: "Admin",
            query: query,
            text: db.langObj
        }
    });
};



var renderPost = function(req, res){
    var body = req.body
        ,query = req.query;
    if (!body.undefined){
        action(body)
            .then(function(obj){
                renderWithLang(req, res, {
                    template: templateAdmin,
                    data: {
                        title: "Admin",
                        body: body,
                        query: query,
                        text: obj
                    }
                })
            })
            .catch(function(err){
                console.log("Error DB");
                console.log(err);
                req.flash = err;
                renderWithLang(req, res, {
                    template: templateAdmin,
                    data: {
                        title: "Admin",
                        body: body,
                        query: query,
                        text: obj
                    }
                })
            });
        return;
    }
    renderWithLang(req, res, {
        template: templateAdmin,
        data: {
            title: "Admin",
            body: body,
            query: query,
            text: db.langObj
        }
    })



};

exports.get = renderGet;
exports.post = renderPost;