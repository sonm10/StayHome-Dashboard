const {createProxyMiddleware} = require('http-proxy-middleware');

module.exports = function(app){
    app.use(
        '/api',
        createProxyMiddleware({
            target: 'http://45.64.248.155',
            changeOrigin: true,
            credentials: "same-origin"
        })
    );
};