const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: "./src/app/index.js",
    module: {
        rules: [
            { test: /\.svg$/, use: 'svg-inline-loader' },
            { test: /\.css$/, use: ["style-loader", "css-loader"] },
            { test: /\.(js)$/, use: "babel-loader" }
        ]
    },
    output: {
        path: path.resolve(__dirname, "dist"),
        filename: "bundle.js"
    },
    plugins: [
        new HtmlWebpackPlugin({
            favicon: "./src/assets/icons/favicon.svg",
            template: "index.html",
            inject: "body"
        })
    ],
    devServer: {
        port: 8080,
        open: true,
        hot: true
    },
    mode: "production"
};
