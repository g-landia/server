var express          = require('express')
    ,app             = express()
    ,path            = require('path')
    ,favicon         = require('serve-favicon')
    ,logger          = require('morgan')
    ,cookieParser    = require('cookie-parser')
    ,bodyParser      = require('body-parser')
    ,passport        = require('passport')
    ,expressSession  = require('express-session')
    ,config          = require("nconf")
    ,flash           = require('connect-flash');




config.argv().env().file({ file: 'config.json' });


app.set('view engine', 'jade');
app.set('views', path.join(__dirname, '/templates'));


var templateError = 'errors/error'
    ,sessionData = config.get('session');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(expressSession(sessionData));
app.use(flash());

// Passport

app.use(passport.initialize());
app.use(passport.session());

///////////////////////////////////////ROUTES/////////////////////////////


app.use('/login', require('./routes/login'));
app.use('/users', require('./routes/users'));
app.use('/register', require('./routes/register'));
app.use('/logout', require('./routes/logout'));
app.use('/profile', require('./routes/profile'));
app.use('/*', require('./routes/index'));




//////////////////////////////////////END ROUTES/////////////////////////



// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res) {
    res.status(err.status || 500);
    res.render(templateError, {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res) {
  res.status(err.status || 500);
  res.render(templateError, {
    message: err.message,
    error: {}
  });
});



module.exports = app;
