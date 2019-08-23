const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin')
const path = require('path')
const NodemonPlugin = require('nodemon-webpack-plugin')
const WebpackbarPlugin = require('webpackbar')
const nodeExternals = require('webpack-node-externals')

const graphqlImportLoader = path.resolve(__dirname, './graphql-import-loader.js')
const configFile = path.resolve(__dirname, './tsconfig.json')

module.exports = {
  mode: 'development',
  entry: {
    index: path.resolve(__dirname, './src/index.ts'),
  },
  optimization: {
    minimize: false,
  },
  output: {
    filename: 'index.js',
    libraryTarget: 'commonjs',
    path: path.resolve(__dirname, './dist'),
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js'],
    alias: {
      '~': path.resolve(__dirname, './src'),
    },
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: 'ts-loader',
        options: {
          transpileOnly: true,
        },
      },
      {
        test: /\.graphql$/,
        loader: graphqlImportLoader,
      },
    ],
  },
  node: {
    __dirname: false,
  },
  devtool: 'cheap-source-map',
  stats: 'errors-only',
  target: 'node',
  watch: true,
  externals: [
    nodeExternals(),
  ],
  plugins: [
    new WebpackbarPlugin({
      color: '#1c7ed6',
      name: 'Development',
    }),
    new NodemonPlugin(),
    new ForkTsCheckerWebpackPlugin({
      tsconfig: configFile,
    }),
  ],
}
