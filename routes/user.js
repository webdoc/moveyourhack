exports.list = function(req, res){
  res.send("respond with a resource");
};

exports.auth_facebook = function(req, res){
  req.authenticate([req.param('method')], function(error, authenticated) {
    if(authenticated) {
      res.end("<html><h1>Hello Facebook user:" + JSON.stringify( req.getAuthDetails() ) + ".</h1></html>");
    } else {
      res.end("<html><h1>Facebook authentication failed :( </h1></html>");
    }
  });
};
