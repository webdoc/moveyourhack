var express = require('express')
var config = (process.env.NODE_ENV=='production'? require('./config.production') : require('./config'));
var routes = require('./routes')
  , http = require('http')
  , path = require('path')
  , mongoose = require('mongoose')
  , db = mongoose.createConnection(config.mongodb.host, config.mongodb.db)
  , passport = require('passport')
  , FacebookStrategy = require('passport-facebook').Strategy;

var app = express();

app.configure(function(){
  app.set('port', config.web.port);
  app.set('views', __dirname + '/views');
  app.set('view engine', 'ejs');
  app.use(express.favicon());
  app.use(express.logger('dev'));
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(express.cookieParser(config.cookie.secret));
  app.use(express.session());
  app.use(express['static'](path.join(__dirname, 'public')));
  app.use(passport.initialize());
  app.use(passport.session());
  app.use(app.router);
});

app.configure('development', function(){
  app.use(express.errorHandler());
});

var User = db.model('User', new mongoose.Schema({
  facebookId: Number,
  displayName: String
}));

passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  User.findById(id, function(err, user) {
    done(err, user);
  });
});

passport.use(new FacebookStrategy({
    clientID: config.facebook.appId,
    clientSecret: config.facebook.appSecret,
    callbackURL: "http://"+config.web.host+":"+config.web.port+"/auth/facebook/callback"
  },
  function(accessToken, refreshToken, profile, done) {
    user = User.findOne({ facebookId: profile.id }, function(err, user) {
      if (err) { console.log(err); return; }
      if(!user) {
        User.create({
          facebookId: profile.id,
          displayName: profile.displayName
        }, function (errNew, userNew) {
          if (errNew) { console.log(errNew); return; }
          done(null, userNew);
        });
      }
      else {
        done(null, user);
      }
    });
  }
));

app.get('/', routes.index);
app.get('/auth/facebook', passport.authenticate('facebook', { scope: [] }));
app.get('/auth/facebook/callback',
  passport.authenticate('facebook', { successRedirect: '/', failureRedirect: '/login' }));
app.get('/logout', routes.logout);

http.createServer(app).listen(app.get('port'), function(){
  console.log("Express server listening on port " + app.get('port'));
});

