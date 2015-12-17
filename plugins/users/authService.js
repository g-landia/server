var md5             = require('md5')
    ,config         = require('nconf')
    ,gText          = require('../../language')
    //,sendMessage    = require("./sendMessage")
    ,salt           = config.get('registrationKey') || 'someDefaultKey'
    ,LocalStrategy   = require('passport-local').Strategy
    ,passport = require('passport')
    ,db             = require('../../db');

/*var authService = {
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
};*/

passport.use('login', new LocalStrategy({
        passReqToCallback : true,
        usernameField: 'email',
        passwordField: 'password'
    },
    /*if email is exists and password is right then checks the field authToken
    if authToket.length == 0 then good
    else the user goes to page with information: see your email
    */

    function (req, email, password, done) {

        db.query('queryRow', 'SELECT * FROM `users` WHERE `email` = ?', [email])
            .then(function (user) {
                // if query was successful
                if (md5(password) === user.password) {
                    console.log(user);
                    if(user.authToken.length !== 0){ //user goes to page with information: see your email
                        return done(null, {
                            regStatus: 'waiting',
                            email: email,
                            language: user.language
                        });
                    } else if(user.firstName.length === 0){ //user goes to enter the data registration
                        return done(null, {
                            regStatus: 'lastStep',
                            email: email,
                            language: user.language
                        });
                    } else {
                        return done(null, {
                            regStatus: 'registered',
                            username: user.firstName,
                            language: user.language //data the session
                            //here you need to add data for the session
                        });
                    }
                }
                return done(null, false, {
                    message: 'errorLogin' //this is key for language
                });
            })
            .catch(function (err) {
                // if query threw an error
                console.log('Error');
                console.log(err);
                return done(null, false, {
                    message: 'errorLogin' //this is key for language
                });
            });
    }
));


passport.use('register', new LocalStrategy({
        passReqToCallback : true,
        usernameField: 'email',
        passwordField: 'password'
    },
    function(req, email, password, done){
        var repeatPassword = req.body.repeatPassword
            ,md5Password = md5(password)
            ,language = gText.getLanguageFromSession(req)
            ,text = gText.language(language)
            ,headers = req.headers
            ,regToken = "http://" + headers.host + "/register?newuser=" + md5(email + password + salt); // making of the unique registration token


        if(repeatPassword === password){

            // if password matches
            db.query('insert', 'users', {email: email, password: md5Password})
                .then(function(recordId){
                    // if query was successful
                    console.log(recordId);
                    return done(null, {
                        regStatus: 'waiting', // status: 'waiting', 'registered' 'lastStep'
                        email: email
                    })
                })
                .catch(function(err){
                    // if query threw an error
                    console.log(err);
                    return done(null, false, {
                        message: "errorEmailExists"  //this is key for language
                    })
                });

        }else {
            return done(null, false, {
                // if password mismatch
                message: 'errorPasswordMismatch' //this is key for language
            })
        }
    }
));


module.exports = passport;