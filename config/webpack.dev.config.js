const path = require("path");
const HTMLPlugin = require("html-webpack-plugin");
const webpack = require("webpack");
const ExtractTextPlugin = require("extract-text-webpack-plugin");

const config = {
    target: "web",
    entry: path.join(__dirname, "..", "src", "index.tsx"),
    output: {
        filename: "app.bundle.js",
        path: path.join(__dirname, 'dist')
    },

    mode: "development",
    devtool: '#cheap-module-eval-source-map',

    // devtool: "source-map",
    resolve: {
        extensions: ['.ts', '.tsx', '.js']
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                loader: ["ts-loader"]
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
            template: path.join(__dirname, "..", "src", "index.html"),
            minify: true,
            hash: true
        }),
        new ExtractTextPlugin("style.css"), // 打包后的文件
        //new uglify(),  //压缩JS
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: '"development"'
            }
        }),
        new webpack.ProvidePlugin({
            $: 'jquery',
            jQuery: "jquery",
            "window.jQuery": "jquery"
        }),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoEmitOnErrorsPlugin()
    ],
    optimization: {
        splitChunks: {
            chunks: 'all',
        },
    },

    devServer: {
        port: 8000,  //使用的端口
        host: '0.0.0.0',  //host地址
        overlay: {
            errors: true
        },
        hot: true,  //热更新
        inline: true,
        contentBase: path.join(__dirname, 'dist'), //发布目录
    }
};


module.exports = config;