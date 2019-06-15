const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const path = require("path");

const proxyPath = "http://localhost:3000";

const cfg = {
  entry: "./src/index.tsx",
  output: {
    filename: "[name].[chunkhash].js",
    path: __dirname + "/public/dist"
  },
  resolve: {
    extensions: [".ts", ".tsx", ".js", ".json"],
    alias: {
      "~": path.resolve(__dirname, 'src/'),
    }
  },
  
  plugins: [
    new HtmlWebpackPlugin({
      template: __dirname + "/src/index.html"
    }),
  ],
  module: {
    rules: [
      // All files with a '.ts' or '.tsx' extension will be handled by 'awesome-typescript-loader'.
      {test: /\.tsx?$/, loader: "awesome-typescript-loader"},
      
      // All output '.js' files will have any sourcemaps re-processed by 'source-map-loader'.
      {enforce: "pre", test: /\.js$/, loader: "source-map-loader"},
    ],
    
  },
  
};

if (process.env.NODE_ENV === 'development') {
  Object.assign(cfg, {
    mode: 'development',
    devtool: "source-map",
    devServer: {
      contentBase: './public/dist',
      proxy: {
        '/api': proxyPath,
        '/graphql': proxyPath
      }
    },
  });
  cfg.output.filename = "[name].js";
  cfg.module.rules.push(
    {
      test: /\.less$/,
      use: [
        {
          loader: 'style-loader',
        }, {
          loader: 'css-loader', // translates CSS into CommonJS
        }, {
          loader: 'less-loader', // compiles Less to CSS
          options: {
            sourceMap: true,
          },
        },
      ],
    },
  );
}
if (process.env.NODE_ENV === 'production') {
  Object.assign(cfg, {
    mode: 'production',
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
  });
  
  cfg.plugins.unshift(
    new MiniCssExtractPlugin({
      filename: '[name].[chunkhash].css',
    })
  );
  
  cfg.module.rules.push(
    {
      test: /\.less$/,
      use: [
        {
          loader: MiniCssExtractPlugin.loader,
          options: {
            // you can specify a publicPath here
            // by default it uses publicPath in webpackOptions.output
            publicPath: __dirname + "/public/dist",
            hmr: false,
          },
        },
        {
          loader: 'css-loader', // translates CSS into CommonJS
        },
        {
          loader: 'less-loader', // compiles Less to CSS
          options: {
            sourceMap: false,
          },
        },
      ],
    },
  );
}
module.exports = cfg;
