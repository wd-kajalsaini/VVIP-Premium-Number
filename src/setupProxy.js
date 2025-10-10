const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '/api',
    createProxyMiddleware({
      target: 'http://localhost/premium-numbers/public',
      changeOrigin: true,
      logLevel: 'debug',
    })
  );
};
