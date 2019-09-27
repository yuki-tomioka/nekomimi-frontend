const path = require('path');
// webpackモジュールの読み込み
const webpack = require('webpack');
// html-webpack-pluginモジュールの読み込み
const HtmlWebpackPlugin = require('html-webpack-plugin');
// mini-css-extract-pluginの追加
const MiniCSSExtractPlugin = require('mini-css-extract-plugin');

const src = path.join(__dirname, 'src');
const dist = path.join(__dirname, 'dist');

module.exports = {
  // developmentモードで実行
  mode: 'development',
  // ビルドを実行するファイルパス
  entry: path.resolve(src, 'js/render.jsx'),
  output: {
    // 生成されるファイル名
    filename: 'index.bundle.js',
    // 生成先のディレクトリ
    path: dist
  },
  resolve: {
    // import文のパス指定にnode_modulesを省略できるようにする
    modules: ['node_modules'],
    // .jsまたは.jsxの拡張子を省略できるようにする
    extensions: ['.js', '.jsx']
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        enforce: 'pre', // babel-loaderよりも前に実行
        loader: 'eslint-loader'
      },
      {
        // ルールを適用するファイルの正規表現
        test: /\.(js|jsx)$/,
        // node_modules以下のファイルには適用しない
        exclude: /node_modules/,
        // 使用するloader
        loader: 'babel-loader'
      },
      {
        // CSSの設定
        test: /\.css$/,
        exclude: /node_modules/,
        // loaderを複数使用する場合はuseを使う
        use: [
          MiniCSSExtractPlugin.loader,
          {
            loader: 'css-loader',
            // CSSModulesのオプションを追加
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
  // sourceMappingの設定
  devtool: 'cheap-module-eval-source-map',
  devServer: {
    contentBase: dist, // 開発サーバーを立ち上げる参照ディレクトリ
    hot: true, // hot-reloadを有効に
    port: 3000
  },
  plugins: [
    // hot-reloadを有効にするプラグインを追加
    new webpack.HotModuleReplacementPlugin(), // HtmlWebpackPluginを追加
    new HtmlWebpackPlugin({
      // templateの設定を追加
      template: path.resolve(src, 'html/index.html')
    }),
    new MiniCSSExtractPlugin()
  ]
};
