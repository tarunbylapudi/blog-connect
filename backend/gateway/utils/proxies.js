const { createProxyMiddleware } = require("http-proxy-middleware");


const setupProxy = (app, routes) => {
  routes.forEach((route) => {
    app.use(route.url, createProxyMiddleware(route.proxy));
  });
};

module.exports = setupProxy;
