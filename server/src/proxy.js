'use strict'

const httpProxy = require('http-proxy');
const config = {
    'dev':'http://localhost:7632'
};
const target = config['dev'];
httpProxy.createProxyServer({target}).listen(7631);//本地是7632，代理是7631
console.log(` proxy server: http://localhost:3001 => ${target}`);