//开发环境配置
const path = require('path');
const webpack = require('webpack');
const HtmlwebpackPlugin = require('html-webpack-plugin');
const merge = require('webpack-merge');
const baseConfig = require('./webpack.base.config.js');

const ROOT_PATH = path.resolve(__dirname);
const SRC_PATH = path.resolve(ROOT_PATH, 'src');
const devConfig = merge(baseConfig, {
    devtool: 'eval-source-map',
    plugins: [
        new webpack.DefinePlugin({
            'process.env.API_ENV': '"development"'
        }),
        new HtmlwebpackPlugin({
            title: 'react-webpack-demo',
            filename: 'index.html',
            template: path.resolve(SRC_PATH, 'templates', 'index.html')
        })
    ],
    devServer: {
        host: '0.0.0.0',
        port: '7630',//前端端口是7630
        proxy: {
            '/api/*': {target: 'http://localhost:7631'},//转代理7631，后端端口是7632转代理7631，通过代理服务器进行通信
        },
        lazy: false,
        compress: true, //启用gzip压缩
        headers: {
            'X-Frame-Options': 'SAMEORIGIN',
            'X-XSS-Protection': '1; mode=block',
        }
    },
});

module.exports = devConfig;