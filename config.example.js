var config = {};

config.web = {};
config.cookie = {};
config.facebook = {};
config.mongodb = {};

config.web.host = process.env.WEB_HOST || 'moveyourhack.dev';
config.web.port = process.env.WEB_PORT || 3000;
config.cookie.secret = process.env.WEB_COOKIE_SECRET || 'aSecretKey';
config.facebook.appId = process.env.FACEBOOK_APP_ID || 'appId';
config.facebook.appSecret = process.env.FACEBOOK_APP_SECRET || 'appSecret';
config.mongodb.db = process.env.MONGODB_DB || 'moveyourhack';
config.mongodb.host = process.env.MONGODB_HOST || '127.0.0.1';

module.exports = config;
