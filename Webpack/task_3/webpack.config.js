const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
  mode: 'development',
  entry: {
    header: './modules/header/header.js',
    body: './modules/body/body.js',
    footer: './modules/footer/footer.js'
  },
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'public')
  },
  module: {
    rules: [
      { 
        test: /\.css$/i, 
        use: ['style-loader', 'css-loader'] 
      },
      { 
        test: /\.(png|jpg|jpeg|gif)$/i, 
        type: 'asset/resource' 
      }
    ]
  },
  devtool: 'inline-source-map',
  devServer: {
    static: path.resolve(__dirname, 'public'),
    port: 8564,
    open: true
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      title: 'Holberton Dashboard'
    })
  ],
  optimization: {
    splitChunks: {
      chunks: 'all'
    }
  }
};
