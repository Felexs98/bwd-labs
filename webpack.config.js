const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');


module.exports = {
    entry: './src/index.js',
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist'),
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader'],
            },
        ],
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/index.html',
            inject: true,
            chunks: ['index'],
            filename: 'index.html',
            favicon: './src/favicon.ico'
        }),
        new HtmlWebpackPlugin({
            template: './src/about.html',
            inject: true,
            chunks: ['index'],
            filename: 'about.html',
            favicon: './src/favicon.ico'
        }),
        new HtmlWebpackPlugin({
            template: './src/projects.html',
            inject: true,
            chunks: ['index'],
            filename: 'projects.html',
            favicon: './src/favicon.ico'
        }),
        new HtmlWebpackPlugin({
            template: './src/works.html',
            inject: true,
            chunks: ['index'],
            filename: 'works.html',
            favicon: './src/favicon.ico'
        }),
        new CopyPlugin({
            patterns: [
                {
                    from: path.resolve(__dirname, 'src/images'),
                    to: path.resolve(__dirname, 'dist/images')
                },
			    {
                    from: path.resolve(__dirname, 'src/favicon.ico'),
                    to: path.resolve(__dirname, 'dist/favicon.ico')
                }
            ]
        })
    ],
    devServer: {
        static: {
            directory: path.join(__dirname, 'dist'),
        },
        open: true,
    },
    mode: 'development',
};
