var port = process.env.PORT || 8080;


var express = require('express');
var session = require('express-session');
var contentRoutes = require('./routes/content');
var apiRoutes = require('./routes/api');
var db = require('./shared/Database');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var app = express();

app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.use(session({
  secret: "sosecret",
  saveUninitialized: false,
  resave: false
}));

// middleware to make 'user' available to all templates
app.use(function(req, res, next) {
  res.locals.user = req.session && req.session.user ? req.session.user : null;
  next();
});

app.use(cookieParser());
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use('/', contentRoutes);
app.use('/api', apiRoutes);

app.use(function(req, res, next) {
	var err = new Error('Not Found');
	err.status = 404;
	next(err);
});

app.use(function(err, req, res, next) {
		res.status(err.status || 500);
		res.render('error', {
		message: err.message,
		error: err
	});
});

app.listen(port);
