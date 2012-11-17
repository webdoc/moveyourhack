var config = {};

config.web = {};
config.facebook = {};

config.web.port = process.env.WEB_PORT || 3000;
config.facebook.appId = process.env.FACEBOOK_APP_ID || 'appId';
config.facebook.appSecret = process.env.FACEBOOK_APP_SECRET || 'appSecret';

module.exports = config;
