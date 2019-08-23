const path = require('path')
const WebpackbarPlugin = require('webpackbar')
const nodeExternals = require('webpack-node-externals')

const graphqlImportLoader = path.resolve(__dirname, './graphql-import-loader.js')
const configFile = path.resolve(__dirname, './tsconfig.json')

module.exports = {
  mode: 'production',
  entry: {
    index: path.resolve(__dirname, './src/index.ts'),
  },
  optimization: {
    minimize: true,
  },
  output: {
    filename: 'index.min.js',
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
          configFile,
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
  stats: 'errors-only',
  target: 'node',
  externals: [
    nodeExternals(),
  ],
  plugins: [
    new WebpackbarPlugin({
      color: '#fa5252',
      name: 'Production',
    }),
  ],
}
