const HtmlWebPackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');

module.exports = {

    mode: 'development',
    optimization: {
        minimizer: [ new OptimizeCssAssetsPlugin() ]
    },
    module: {
        rules: [
            {
                // Hace esta evaluacion
                test: /\.css$/,
                // Excluye este archivo o que conincidan con la expresion
                exclude: /styles\.css$/,
                use: [
                    // Lo hace parte del bundle de la aplicacion
                    'style-loader',
                    'css-loader'
                ]
            },
            {
                test: /styles\.css$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader'
                ]
            },
            {
                test: /\.html$/i,
                // Aplicar regla si es un archivo html (referencia a test)
                loader: 'html-loader',
                options: {
                    attributes: false,
                    minimize: false,
                },
            },
            {
                test: /\.(png|svg|jpg|gif)$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            esModule: false
                        }
                    }
                ]
            }
        ]
    },
    // Especificar plugins que quiero
    plugins: [
        new HtmlWebPackPlugin({
            // Que archivo es el que quiero tomar
            template: './src/index.html',
            // Donde quiero colocarlo
            filename: './index.html'
        }),
        new MiniCssExtractPlugin({
            filename: '[name].css',
            ignoreOrder: false
        }),
        new CopyPlugin({
            patterns: [
               { from: 'src/assets', to: 'assets/' },
            ],
        }),
    ]

}