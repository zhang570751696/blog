const path = require("path");
const HTMLPlugin = require("html-webpack-plugin");
const webpack = require("webpack");
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const isDev = process.env.NODE_ENV == 'development';

const config = {
    target: "web",
    entry: path.join(__dirname, "..", "src","index.tsx"),
    output: {
        filename: "app.bundle.js",
        path: path.join(__dirname, 'dist')
    },
    // devtool: "source-map",
    resolve: {
        extensions: ['.ts', '.tsx', '.js']
    },
    mode: "production",
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                loader: [ "ts-loader"]
            },
            {
                enforce: "pre",
                test: /\.js$/,
                loader: "source-map-loader"
            },
            {
                test: /\.css?$/,
                //loader: ["style-loader", "css-loader"]
                use: ExtractTextPlugin.extract({
                    fallback: "style-loader",
                    use: "css-loader"
                })
            }]
    },

    plugins: [
        new HTMLPlugin({
            template: path.join(__dirname, "..", "src","index.html"),
            minify: true,
            hash: true
        }),
        new ExtractTextPlugin("style.css"), // 打包后的文件
        //new uglify(),  //压缩JS
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: '"production"'
            }
        }),
        new webpack.ProvidePlugin({
            $: 'jquery',
            jQuery: "jquery",
            "window.jQuery": "jquery"
        }),
    ],
    optimization: {
        splitChunks: {
            chunks: 'all',
        },
    },
};

module.exports = config;