const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const paths = require('./paths');

function getConfig (production = false) {
  return {
    entry: {
      index: path.join(paths.SOURCE_FOLDER, 'index.js')
    },
    output: {
      path: paths.DIST_FOLDER,
      filename: '[name].js'
    },
    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: [
            /node_modules/,
            /serviceWorkerRegistration*/
          ],
          use: require.resolve('babel-loader')
        },
        {
          test: /\.css$/,
          use: ExtractTextPlugin.extract({
            fallback: 'style-loader',
            use: [
              {
                loader: 'css-loader',
                options: {
                  importLoaders: 1,
                  minimize: production,
                  sourceMap: !production
                }
              },
              {
                loader: 'postcss-loader',
                options: {
                  sourceMap: !production
                }
              }
            ]
          })
        },
        {
          test: /\.scss$/,
          use: ExtractTextPlugin.extract({
            fallback: 'style-loader',
            use: [
              {
                loader: 'css-loader',
                options: {
                  importLoaders: 2,
                  minimize: production,
                  sourceMap: !production
                }
              },
              {
                loader: 'postcss-loader',
                options: {
                  sourceMap: !production
                }
              },
              {
                loader: 'sass-loader',
                options: {
                  sourceMap: !production
                }
              }
            ]
          })
        },
        {
          test: /\.(png|jpe?g|gif|svg)$/,
          use: [
            {
              loader: 'url-loader',
              options: {
                limit: 8192
              }
            }
          ]
        },
        {
          test: /\.(eot|svg|ttf|woff|woff2)$/,
          use: 'file-loader'
        },
        {
          test: /\.json$/,
          use: 'json-loader'
        }
      ]
    }
  };
}

module.exports = getConfig;
