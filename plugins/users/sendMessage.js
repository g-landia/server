var email       = require("emailjs/email")
    ,config     = require('nconf')
    ,gText      = require('../../language')
    ,text       = gText.language('en');

// Connecting to SMTP server
// var sslRootCAs = require('ssl-root-cas').inject();
process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
var smtpConfig  = config.get('smtp')
    ,smtp       = email.server.connect({
		user: smtpConfig.user,
		password: smtpConfig.password,
		host: smtpConfig.host,
		ssl: smtpConfig.useSSL
		// authentication: ['PLAIN']
	});

var sendMessage = {
	email: function(data, callback){
		if (!data) {
			if (typeof callback == 'function') {
				callback(false,'Invalid argument in sendmail function');
			}
			return false;
		}
		var mailObject = {
			text: data.text, // Email body
			from: smtpConfig.fromName + " <" + smtpConfig.user + ">", // From 
			to: data.to, // Recipient of the email
			// cc:      "CopyTo <r.alex.andr@ya.ru>", // If we want to send copy of this email to some address/s
			subject: data.subject || '', 
			attachment: 
			[
				{data: data.text, alternative: true}
				// {path:"path/to/file.zip", type:"application/zip", name:"renamed.zip"} // We can attach some files if we want
			]
		};
		// Sending email
		smtp.send(mailObject, function(err, mail) { 
			if (err) {
				console.log(mailObject);
				if (typeof callback == 'function') {
					callback(false,err);
				}
				return false;
			} else {
				if (typeof callback == 'function') {
					callback(true,'Email have been sent successfully');
				}
				return true;
			}
		});
	},
	sms: {
		registration: function(){

		}
	}
};

module.exports = sendMessage;
