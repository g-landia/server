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
        database: confDb.name
    }
    ,pool;

var connect = function(option){
    var opt = (option)? option: confDb;

    pool = mysql.createPool(opt);
};

var getInstance = function() {
    if (!pool) {
        throw new Error('Connect the pool first');
    }
    return pool;
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

exports.connect = connect;
//exports.getInstance = getInstance;
//exports.pool = pool;
exports.withDb = withDb;
exports.mainDB = DB;