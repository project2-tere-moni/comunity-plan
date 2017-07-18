require('dotenv').config();
const express      = require('express');
const path         = require('path');
const favicon      = require('serve-favicon');
const logger       = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser   = require('body-parser');
const layouts      = require('express-ejs-layouts');
const mongoose     = require('mongoose');
const passport      = require("passport");
const session = require("express-session");
const flash = require("connect-flash");
const MongoStore = require('connect-mongo')(session);
const debug = require('debug')(`comunity-plan:${path.basename(__filename).split('.')[0]}`);

const index = require('./routes/index');
const user = require('./routes/user');
const auth = require('./routes/auth');
const events = require('./routes/event');
const place = require('./routes/place');
const dbURL = process.env.MONGO_DB_URL;

mongoose.connect(dbURL).then(() => debug("Connected to DB"));

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(layouts);
app.set('layout', 'layouts/main');

app.use(flash());


// default value for title local
app.locals.title = 'Express - Generated with IronGenerator';

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/vendor/jquery', express.static(path.join(__dirname, 'node_modules/jquery/dist')));
app.use('/vendor/bootstrap', express.static(path.join(__dirname, 'node_modules/bootstrap/dist')));

app.use(session({
  secret: "communitylab",
  resave: true,
  saveUninitialized: true,
  store: new MongoStore( { mongooseConnection: mongoose.connection })
}));

require('./passport/config');

app.use(passport.initialize());
app.use(passport.session());

app.use((req,res,next) => {
  res.locals.user = req.user;
  next();
});

app.use('/', index);
app.use('/user', user);
app.use('/event', events);
app.use('/place', place);
app.use('/', auth);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use((err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
