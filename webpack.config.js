const prod = process.env.NODE_ENV === "production";

const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  mode: prod ? "production" : "development",
  entry: {
    dashboard: "./src/index.tsx",
    popup: "./src/popup/index.tsx",
  },
  output: {
    filename: "[name].bundle.js",
    path: __dirname + "/dist/",
    clean: true,
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: ["babel-loader"],
      },
      {
        test: /\.(ts|tsx)$/,
        exclude: /node_modules/,
        resolve: {
          extensions: [".ts", ".tsx", ".js", ".json"],
        },
        use: ["ts-loader"],
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.png/,

        type: "asset/resource",
      },
    ],
  },
  devtool: prod ? undefined : "source-map",
  plugins: [
    new HtmlWebpackPlugin({
      filename: "dashboard.html",
      template: "public/templates/dashboard.html",
      chunks: ["dashboard"],
    }),
    new HtmlWebpackPlugin({
      filename: "popup.html",
      template: "public/templates/popup.html",
      chunks: ["popup"],
    }),
  ],
  optimization: {
    splitChunks: {
      chunks: "all",
    },
  },
};
