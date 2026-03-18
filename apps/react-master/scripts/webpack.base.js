const path = require('path')
const MiniCssExtractPlugin = require("mini-css-extract-plugin")
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = function (isDev) {
  return {
    entry: path.resolve(__dirname, '../src/index.tsx'),
    output: {
      path: path.resolve(__dirname, '../dist'),
      filename: 'static/js/[name].[chunkhash:8].js',
      clean: true,
      publicPath: '/'
    },
    resolve: {
      extensions: ['.js', '.jsx', '.ts', '.tsx', 'json'],
      alias: {
        '@': path.resolve(__dirname, '../src')
      },
    },
    module: {
      rules: [
        {
          test: /\.(ts|tsx)$/,
          use: [
            {
              loader: 'babel-loader',
              // options: {} 配置babelrc文件无需配置该options
            }
          ]
        },
        {
          oneOf: [
            {
              test: /\.module\.(less|css)$/,
              include: [path.resolve(__dirname, '../src')],
              use: [
                isDev ? 'style-loader' : MiniCssExtractPlugin.loader,
                {
                  loader: 'css-loader',
                  options: {
                    modules: {
                      localIdentName: '[path][name]__[local]--[hash: base64:5]'
                    }
                  }
                },
                "postcss-loader",
                "less-loader"
              ]
            },
            {
              test: /\.css$/,
              use: [
                isDev ? 'style-loader' : MiniCssExtractPlugin.loader,
                "css-loader",
                "postcss-loader",
              ]
            },
            {
              test: /\.less$/,
              use: [
                isDev ? 'style-loader' : MiniCssExtractPlugin.loader,
                "css-loader",
                "postcss-loader",
                "less-loader"
              ]
            }
          ]
        },
        {
          test: /\.(png|jpg|jpeg|gif|svg)$/,
          type: "asset",
          parser: {
            dataUrlCondition: {
              maxSize: 8 * 1024
            }
          },
          generator: {
            filename: 'static/images/[name].[contenthash:8][ext]'
          }
        },
        {
          test: /\.(woff2?|eot|ttf|otf)$/,
          type: "asset",
          parser: {
            dataUrlCondition: {
              maxSize: 8 * 1024
            }
          },
          generator: {
            filename: 'static/fonts/[name].[contenthash:8][ext]'
          }
        },
        {
          test: /\.(mp4|webm|ogg|mp3)$/,
          type: "asset",
          parser: {
            dataUrlCondition: {
              maxSize: 8 * 1024
            }
          },
          generator: {
            filename: 'static/media/[name].[contenthash:8][ext]'
          }
        }
        // webpack5 内置了 url file-loader
      ]
    },
    plugins: [
      new MiniCssExtractPlugin({
        filename: 'static/css/[name].[contenthash:8].css'
      }),
      new HtmlWebpackPlugin({
        template: path.resolve(__dirname, '../public/index.html'), // 模板文件
      }),
    ]
  }
}