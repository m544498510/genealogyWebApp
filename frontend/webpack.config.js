const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
  mode: "none",
  entry: "./src/index.tsx",
  output: {
    filename: "[name].[chunkhash].js",
    path: __dirname + "/public/dist"
  },
  
  // Enable sourcemaps for debugging webpack's output.
  devtool: "source-map",
  
  resolve: {
    // Add '.ts' and '.tsx' as resolvable extensions.
    extensions: [".ts", ".tsx", ".js", ".json"]
  },
  optimization: {
    splitChunks: {
      cacheGroups: {
        commons: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          chunks: 'all'
        }
      }
    }
  },
  plugins: [
    new MiniCssExtractPlugin({
      // Options similar to the same options in webpackOptions.output
      // both options are optional
      filename: '[name].[chunkhash].css',
    }),
    new HtmlWebpackPlugin({
      title: 'My Zone',
    }),
  ],
  
  module: {
    rules: [
      // All files with a '.ts' or '.tsx' extension will be handled by 'awesome-typescript-loader'.
      {test: /\.tsx?$/, loader: "awesome-typescript-loader"},
      
      // All output '.js' files will have any sourcemaps re-processed by 'source-map-loader'.
      {enforce: "pre", test: /\.js$/, loader: "source-map-loader"},
      {
        test: /\.less$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              // you can specify a publicPath here
              // by default it uses publicPath in webpackOptions.output
              publicPath: __dirname + "/public/dist",
              hmr: process.env.NODE_ENV === 'development',
            },
          },
          {
            loader: 'css-loader', // translates CSS into CommonJS
          },
          {
            loader: 'less-loader', // compiles Less to CSS
            options: {
              sourceMap: true,
            },
          },
        ],
      },
    ],
    
  },
};
