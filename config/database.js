var url = require('url');
var params = url.parse(process.env.DATABASE_URL || 'postgres://localhost/novaquotes');
var auth = params.auth.split(':');
var config = {
  user: auth[0],
  password: auth[1],
  host: params.hostname,
  port: params.port,
  database: params.pathname.split('/')[1]
};

module.exports = config;