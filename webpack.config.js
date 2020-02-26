const HtmlWebPackPlugin = require("html-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

const path = require("path");

module.exports = (env, arg) => {
  process.env.NODE_ENV = arg.mode;
  return {
    entry: {
      bundle: "./src/index.js"
    },
    devtool: "source-map",
    output: {
      path: path.resolve(__dirname, "dist"),
      filename: "[name].js"
    },
    module: {
      rules: [
        {
          test: /\.(js|jsx)$/,
          exclude: /node_modules/,
          use: {
            loader: "babel-loader"
          }
        },
        {
          test: /\.html$/,
          use: [
            {
              loader: "html-loader"
            }
          ]
        }
      ]
    },
    plugins: [
      new CleanWebpackPlugin(),
      new HtmlWebPackPlugin({
        template: path.resolve(__dirname, "public", "index.html"),
        filename: "index.html"
      }),
      new CopyWebpackPlugin([{ from: "./src/assets", to: "assets" }])
    ],
    devServer: {
      inline: true,
      contentBase: path.resolve(__dirname, "dist"),
      port: 5000
    }
  };
};
