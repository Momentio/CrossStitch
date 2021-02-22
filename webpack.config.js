const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  entry: [
    './client/src/index.js'
  ],
  
  output: {
    path: path.join(__dirname, "client/build"),
    filename: './js/bundle.js',
  },

  devtool: "source-map",

  module: {
    rules: [
      {
        test: /\.m?js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: "babel-loader"
        }
      },

      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"]
      },
      
      {
        test: /\.(png|jpe?g|gif|svg|ttf|woff|otf|mp3)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[contenthash].[ext]',
              outputPath: 'static/img',
              esModule: false // <- here
            }
          }
        ]
      },

      {
        test: /\.scss$/,
        use: [
          MiniCssExtractPlugin.loader, // Extract css to separate file
          'css-loader', // translates CSS into CommonJS
          'postcss-loader', // parse CSS and add vendor prefixes to CSS rules
          'sass-loader', // compiles Sass to CSS, using Node Sass by default
        ],
      },
    ],
  },

  plugins: [
    new HtmlWebpackPlugin({
      title: 'Webpack 4 Starter',
      template: './client/public/index.html',
      inject: true,
      minify: {
        removeComments: true,
        collapseWhitespace: false,
      }
    }),

    new MiniCssExtractPlugin({
      filename: 'style.css',
    }),
  ],

  devServer: {
    contentBase: path.join(__dirname, "client/public"),
    compress: true,
    port: 888,
    watchContentBase: true,
    progress: true
  },
};
