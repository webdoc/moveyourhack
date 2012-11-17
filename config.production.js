var config = {};

config.web = {};
config.cookie = {};
config.facebook = {};
config.mongodb = {};

config.web.host = process.env.WEB_HOST;
config.web.port = process.env.WEB_PORT;
config.cookie.secret = process.env.WEB_COOKIE_SECRET;
config.facebook.appId = process.env.FACEBOOK_APP_ID;
config.facebook.appSecret = process.env.FACEBOOK_APP_SECRET;
config.mongodb.db = process.env.MONGODB_DB;
config.mongodb.host = process.env.MONGODB_HOST;

module.exports = config;
