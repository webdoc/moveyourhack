var config = require('../config');

exports.index = function(req, res){
  console.log(req.session);
  res.render('index', { title: 'Express', auth: req.session.passport, config: config });
};

exports.logout = function(req, res){
  req.logout();
  res.redirect('/');
};

var config = require('../config');

exports.index = function(req, res){
  console.log(req.session);
  res.render('index', { title: 'Express', auth: req.session.passport, config: config });
};

exports.logout = function(req, res){
  req.logout();
  res.redirect('/');
};

