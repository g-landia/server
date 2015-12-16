var md5              = require('md5')
    ,config          = require('nconf')
    ,gText           = require('../../language')
    ,sendMessage     = require("./sendMessage")
    ,salt            = config.get('registrationKey') || 'someDefaultKey';

var authService = {
	register: function(req, res, callback) {
        var language = gText.getLanguageFromSession(req)
            ,text = gText.language(language)
            ,headers = req.headers;

		if (!req || !req.body) {
			if (typeof callback == 'function') {
				callback(false,'Error in requestBody');
			}
			return false;
		}
		var email = req.body.email || '',
			password = req.body.password || '',
			regToken = "http://" + headers.host + "/register/?" + md5(email + password + salt); // making of the unique registration token
		// Checking email and password (there could be more powerfull validation system, of course)
		if (!email || !password) {
			if (typeof callback == 'function') {
				callback(false,'Invalid email address or password');
			}
			return false;
		}

		// Now we need to save registration token to database and send it to client

		// <Here will be function for saving data to DB>

		// </Here will be function for saving data to DB>

		// <Sending registration token to client's email>
		sendMessage.email({
			to: email, // recipient of a message
			text: regToken, // body of the message
			subject: text('confirmationOfRegistration')  // subject of the message
		},function(status,msg){
			// status: true if success, false if error;
			// msg: can be unused if success AND should contain error string or object if error
			console.log(status);
			console.log(msg);
			if (typeof callback == 'function') {
				callback(status,msg);
			}
		});
		// </Sending registration token to client's email>
	},
	// Function for checking the registration token when user confirms registration
	check: function(req, res, callback) {

	}
};
module.exports = authService;