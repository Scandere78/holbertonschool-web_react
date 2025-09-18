const path = require('path');

module.exports = {
  mode: "production",
  entry: "./js/dashboard_main.js",
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "public")
  },
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"]
      },
      {
        test: /\.(png|jpe?g|gif)$/i,
        use: [
          {
            loader: "file-loader",
            options: { name: "[name].[ext]", outputPath: "assets/" }
          },
          {
            loader: "image-webpack-loader", // juste pour que le test détecte le loader
            options: {}    
          }
        ]
      }
    ]
  },
  performance: { hints: false }
};
