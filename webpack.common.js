const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCSSExtractPlugin = require('mini-css-extract-plugin');

const src = path.join(__dirname, 'src');

const prodMode = process.env.NODE_ENV === 'production';

module.exports = {
  entry: path.resolve(src, 'js/render.jsx'),
  resolve: {
    modules: ['node_modules'],
    extensions: ['.js', '.jsx']
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      },
      {
        test: /\.css$/,
        exclude: /node_modules/,
        use: [
          MiniCSSExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              importLoaders: 1,
              modules: {
                localIdentName: '[name]__[local]--[hash:base64:5]'
              },
            }
          },
          'postcss-loader'
        ]
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(src, 'html/index.html')
    }),
    new MiniCSSExtractPlugin({
      filename: prodMode ? 'app.min.css' : 'app.css'
    })
  ]
};
