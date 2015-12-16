/**
 * Created by Vasiliy on 21.11.2015.
 */

//files language

var En = require('./languages/en.json')
    ,Ru = require('./languages/ru.json');


/*
*
*  language keys:
*       en: - English
*       ru: - Russian
*       de: - Deutsch
*       sp: - Spanish
*       por: - Portugal
* */


var langObj = {}; //Global objects


var addLanguage = function(lang, requireFile){
    langObj[lang] = requireFile
};

var getText = function(language){
   /* var language = (typeof req_or_lang !== 'object')? req_or_lang
        : req_or_lang; //taken from session or url req. ,,,*/
    return function(keyText, errOff, langIn){
        var lang = (langIn !== undefined && langIn !== false)? langIn: language;
        var val = (langObj[lang])? langObj[lang][keyText]: undefined;
        if (val !== undefined){
            return val;
        } else {
            var valEn = langObj.en[keyText];
            return (valEn !== undefined)? valEn
                : (keyText === undefined)? ""
                : (errOff)? keyText
                : "%The key: '" + keyText + "' is not found!%"
        }
    }
};


var getFromSession = function (req) {
    var passport = req.session.passport
        ,guest = req.session.guest
        ,language = (typeof passport === 'object')
            ? JSON.parse(passport.user)['language']
            : (typeof  guest === 'object')
            ? guest.ln
            : "en";
    console.log(language);
    return language
};
/*
This wrap for using with req and res parameters and options for render templates

example
    var gText = requaire('../language')();

    var pathTemplate = 'tamplate';

    gText.wrap(req, res, {
        template: pathTemplate,
        data: {
            //this keys in templates//
        }
    })

*/


var wrap = function(req, res, option){
    var query = req.query
        ,headers = req.headers
        ,passport = req.session.passport
        ,guest = req.session.guest
        ,language;
    if(typeof passport === 'object' && typeof passport.user === 'string'){
        language = JSON.parse(passport.user)['language']
    } else if(typeof guest === 'object'){
        language = guest.ln
    } else if(!query.ln){
        //opened the page. In the page redirecting to home page http://hostName/?ln=nameLanguageFromBrauser
        res.render('content/getlanguage', {
                host: "'" + headers.host + "'",
                req: req
            }
        );
        return;
    } else {
        req.session.guest = {"ln": query.ln};
        language = query.ln
    }


    if(query.ln !== undefined && ((passport === undefined ) || (typeof  passport === 'object' && passport.user === undefined))){
        req.session.guest = {"ln": query.ln};
        language = query.ln
    }
    if(typeof  option.data == 'object') {
        option.data.getText = getText(language); // aded key getText
        option.data.req = req;
    }
       // console.log(option.data.req);
    res.render(option.template, option.data);

};




//added gText in Global objects
addLanguage('en', En);
addLanguage('ru', Ru);

exports.addLanguage = addLanguage;
exports.language = getText;
exports.wrap = wrap;
exports.getLanguageFromSession = getFromSession;
exports.obj = langObj;