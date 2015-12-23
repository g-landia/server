/**
 * Created by Vasiliy on 21.11.2015.
 */

//files language

/*var En      = require('./languages/en.json')
    ,Ru     = require('./languages/ru.json'),*/
var    db      = require('./db');




/*
*
*  language keys:
*       en: - English
*       ru: - Russian
*       de: - Deutsch
*       fr: - French
*       sp: - Spanish
*       pt: - Portugal
*       it: - Italian
* */
//////////////////////////////////////////////////

/*var langObj = {}; //Global objects



var addLanguage = function(lang, requireFile){
    langObj[lang] = requireFile
};*/

/*
var getTexts = function(language){
   */
/* var language = (typeof req_or_lang !== 'object')? req_or_lang
        : req_or_lang; //taken from session or url req. ,,,*//*

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
*/

////////////////////

var getText = function(language){
    return function(keyText, langIn) {
        var val = db.langObj[keyText]
            ,lang = (langIn)? langIn: language
            ,text = (val)? val[lang]:'';
        if(!text){
            var valEn = (val)? val['en']: '';      //if no text in the selected language, then english
            return (valEn)? valEn
                : (!keyText)? ''        //if  empty keyText, then return ''
                : '%' + keyText + '%';   //if not english, then return name key: '%nameKey%' - language and key is not defined
        } else return text
    }
};

var getFromSession = function (req) {
    var passport = req.user
        ,guest = req.session.guest
        ,language = (typeof passport === 'object')
            ? passport.language                 //if user is authorized, then language from passport
            : (typeof  guest === 'object')
            ? guest.ln                          //if user is guest, then language from session guest
            : "en";                              //if user guest is undefined , then language is default - en
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


var renderWrap = function(req, res, option){
    var query = req.query
        ,headers = req.headers
        ,passport = req.user
        ,guest = req.session.guest
        ,language;
    if(typeof passport === 'object'){
        language = passport.language;//
    } else if(typeof guest === 'object'){
        language = guest.ln
    } else if(!query.ln){
        //opened the page. In the page redirecting to home page http://hostName/?ln=nameLanguageFromBrauser
        res.render('content/getlanguage', {
                host: "'" + headers.host + "'",
                req: req,
                err: req.flash
            }
        );
        return;
    } else {
        //add session guest
        req.session.guest = {"ln": query.ln};
        language = query.ln
    }


    if(query.ln !== undefined && (passport === undefined)){
        req.session.guest = {"ln": query.ln};
        language = query.ln
    }
    if(typeof  option.data == 'object') {
        option.data.getText = getText(language); // added key getText
        option.data.req = req;
        option.data.err = req.flash;
    }
       // console.log(option.data.req);
    res.render(option.template, option.data);

};




//added gText in Global objects
/*addLanguage('en', En);
addLanguage('ru', Ru);*/

//exports.addLanguage = addLanguage;
exports.language = getText;
exports.renderWrap = renderWrap;
exports.getLanguageFromSession = getFromSession;
//exports.obj = langObj;
