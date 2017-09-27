const webpack = require('webpack')
const path = require('path')
const htmlWebpackPlugin = require('html-webpack-plugin')
const extractTextPlugin = require('extract-text-webpack-plugin')
const autoprefixer = require('autoprefixer')

const app = path.join(__dirname, 'src')

const config = {
  context: app,
  devtool: 'eval-source-map',
  entry: {
    polyfills: path.join(app, 'polyfills.ts'),
    vendor: path.join(app, 'vendor.ts'),
    app: path.join(app, 'main.ts')
  },
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'js/[name].js'
  },
  resolve: {
    extensions: ['.ts', '.js', '.json', '.css', '.scss', '.html']
  },
  module: {
    rules: [{
      test: /\.ts$/,
      loaders: ['awesome-typescript-loader', 'angular2-template-loader', '@angularclass/hmr-loader'],
      exclude: [/\.(spec|e2e)\.ts$/, /node_modules\/(?!(ng2-.+))/]
    }, {
      test: /\.ts$/,
      enforce: 'pre',
      loader: 'tslint-loader'
    }, {
      test: /\.(png|jpe?g|gif|svg|woff|woff2|ttf|eot|ico)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
      loader: 'file-loader?name=/assets/[name].[ext]?'
    }, {
      test: /\.json$/,
      loader: 'json-loader'
    }, {
      test: /\.(scss|sass)$/,
      exclude: path.join(app, 'app'),
      loader: extractTextPlugin.extract({
        fallback: 'style-loader',
        use: ['css-loader', 'postcss-loader', 'sass-loader']
      })
    }, {
      test: /\.(scss|sass)$/,
      exclude: path.join(app, 'style'),
      loader: 'raw-loader!postcss-loader!sass-loader'
    }, {
      test: /\.html$/,
      loader: 'html-loader'
    }]
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        ENV: JSON.stringify(process.env.NODE_ENV)
      }
    }),
    // Tslint configuration for webpack 2
    new webpack.LoaderOptionsPlugin({
      options: {
        tslint: {
          emitErrors: false,
          failOnHint: false
        },
        postcss: [
          autoprefixer({
            browsers: ['last 2 version']
          })
        ]
      }
    }),
    new webpack.ContextReplacementPlugin(/angular(\\|\/)core(\\|\/)@angular/, app),
    new webpack.optimize.CommonsChunkPlugin({ name: ['vendor', 'polyfills'] }),
    new webpack.optimize.OccurrenceOrderPlugin(),
    new htmlWebpackPlugin({
      template: path.join(app, 'public', 'index.html'),
      chunksSortMode: 'dependency'
    }),
    new extractTextPlugin({
      filename: 'css/[name].css',
      disable: true
    })
  ]
}

module.exports = config
