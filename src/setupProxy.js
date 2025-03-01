const { createProxyMiddleware } = require('http-proxy-middleware');
const { env } = require('process');

const target = env.ASPNETCORE_HTTPS_PORT ? `https://localhost:${env.ASPNETCORE_HTTPS_PORT}` :
  env.ASPNETCORE_URLS ? env.ASPNETCORE_URLS.split(';')[0] : 'http://localhost:65429';

const context =  [
    "/weatherforecast",
    "/api/chuyenbay",
    "/api/sanbay",
    "/api/customer",
    "/api/plane",
    "/api/ticket",
    "/api/luggage",
    "/api/account",
    "/api/food",
    "/api/discount",
    "/api/doanhthu",
    "/api/airport",
    "/api/flight",
    "/api/zalo",
    "/api/seat",
    "/api/callback",
];

module.exports = function(app) {
  const appProxy = createProxyMiddleware(context, {
    target: target,
    secure: false,
    headers: {
      Connection: 'Keep-Alive'
    }
  });

  app.use(appProxy);
};