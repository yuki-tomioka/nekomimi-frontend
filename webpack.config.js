const path = require('path');
// webpackモジュールの読み込み
const webpack = require('webpack');
// html-webpack-pluginモジュールの読み込み
const HtmlWebpackPlugin = require('html-webpack-plugin');

const src = path.join(__dirname, 'src');
const dist = path.join(__dirname, 'dist');

module.exports = {
  // developmentモードで実行
  mode: 'development',
  // ビルドを実行するファイルパス
  entry: path.resolve(src, 'js/index.js'),
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
        // ルールを適用するファイルの正規表現
        test: /\.(js|jsx)$/,
        // node_modules以下のファイルには適用しない
        exclude: /node_modules/,
        // 使用するloader
        loader: 'babel-loader'
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
    new HtmlWebpackPlugin()
  ]
};
