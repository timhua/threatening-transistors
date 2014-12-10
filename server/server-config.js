/********** Node Modules **************/
var express = require('express');
var session = require('express-session');
var path = require('path');
var morgan = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var passport = require('passport');
var flash = require('connect-flash');
var methodOverride = require('method-override');
var schedule = require('node-schedule');
var mongoose = require('mongoose');
var fs = require('fs');
var nunjucks = require('nunjucks');

/********** Helper Files **************/
var db = require('./config.js');
var handler = require('/.lib/routehandlers.js');
var emailHandler = require('.lib/emailHandler.js');
/********** Email Config **************/
var api_key = 'key-e81b3d37fc5adcc1bc5c21f5267a90d5';
var domain = 'selfinspi.red';
var mailgun = require('mailgun-js')({apiKey: api_key, domain: domain});

/********** App setup **************/
var app = express();

/**** App configuration *******/
app.use(morgan('dev'));                                         // log every request to the console
app.use(bodyParser.urlencoded({'extended':'true'}));            // parse application/x-www-form-urlencoded
app.use(bodyParser.json());                                     // parse application/json
app.use(bodyParser.json({ type: 'application/vnd.api+json' })); // parse application/vnd.api+json as json
app.use(session({ secret: 'FollowTheHerd' }));                  
app.use(cookieParser());    
app.use(methodOverride());             
app.use(passport.initialize());                                 // initializes use of passport
app.use(passport.session());                                    // persistent login sessions
app.use(flash());                                               // use connect-flash for flash messages stored in session
app.use(express.static(__dirname + '/public'));

require('./lib/auth.js')(passport);

/********** Routes **************/

app.post('/signup', handler.signupHandler);
app.get('/signupError', handler.singupError);

app.get('/loginSuccess', handler.loginSuccess);
app.get('/loginError', handler.loginError);
app.post('/login', handler.loginHandler);


app.get('/logout', handler.logout)


app.get('/goals',  handler.getGoals);
app.post('/goals',  handler.addGoal);
app.delete('/goals/:id',  handler.removeGoal)


/****** module.exports *********/
module.exports = app
