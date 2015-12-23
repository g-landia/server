/**
 * Created by Vasiliy on 18.11.2015.
 */

var mysql = require('mysql')
    ,mysqlUtilities = require('mysql-utilities')
    ,config = require('nconf')
    ,confDb = config.get('db')
    ,DB = {
        host: confDb.host,
        user: confDb.user,
        password: confDb.password,
        database: confDb.name,
        connectionLimit: 300
    }
    ,pool = mysql.createPool(DB);

//////////////////////////////////////////////////////////////
var connect = function(option){
    var opt = (option)? option: confDb;

    pool = mysql.createPool(opt);
};

/*withDb - it works as a wrapper
* example:
*
* withDb(function(err, connection){
*    connection.queryRow(
*       //this work instruction - mysql-utilities
*       //    https://github.com/tshemsedinov/node-mysql-utilities
*    )
* })
*
*
* */

var withDb = function(option, func){

    if(typeof option === "function"){
        connect(DB);
        func = option;
    } else connect(option);
    return pool.getConnection(function(err, connection){
            mysqlUtilities.upgrade(connection);
            mysqlUtilities.introspection(connection);
            return func(err, connection);
        }
    );
};
////////////////////////////////////////////////////////

var query = function (method, tableOrSql, props, where) {
    return new Promise(function (resolve, reject) {
        pool.getConnection(function (err, connection) {
            // Adding mysql extra options
            mysqlUtilities.upgrade(connection);
            mysqlUtilities.introspection(connection);
            // Query data and return promise
            if (typeof connection[method] == 'function') {
                //connection.update(table, row, where, callback)
                if(typeof where == 'object'){
                    connection[method](tableOrSql, props, where, function(err, res){
                        if(err) reject(err);
                        else resolve(res);
                    });
                 // query  SQL
                }else if(typeof props === 'object') {
                    connection[method](tableOrSql, props, function(err, res){
                        if (err) reject(err);
                        else resolve(res);
                    });
                 // metadata table
                }else if(typeof props === 'undefined'){
                    connection[method](tableOrSql, function(err, res){
                        if (err) reject(err);
                        else resolve(res);
                    });
                 // info database
                }else if(typeof tableOrSql === 'undefined'){
                    connection[method](function(err, res){
                        if (err) reject(err);
                        else resolve(res);
                    });
                }
            } else {
                reject('Incorrect query method');
            }
            connection.release();
        });
    });
};

// loading language from DB to langObj
var updateLanguage = function(){
    return query('queryHash', 'SELECT * FROM keys_languages ORDER BY `name`', [])
        .then(function(keys){
            exports.langObj= keys; //all language'
            return keys;
        })
};

updateLanguage();

exports.withDb = withDb;
exports.updateLanguage = updateLanguage;
exports.mainDB = DB;
exports.query = query;
