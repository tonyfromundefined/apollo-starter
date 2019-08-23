const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin')
const glob = require('glob')
const path = require('path')
const NodemonPlugin = require('nodemon-webpack-plugin')
const WebpackbarPlugin = require('webpackbar')
const nodeExternals = require('webpack-node-externals')

const tsconfigFile = path.resolve(__dirname, './tsconfig.json')

const configs = []

configs.push({
  mode: 'development',
  entry: {
    index: path.resolve(__dirname, './src/index.ts'),
  },
  output: {
    filename: 'index.js',
    libraryTarget: 'commonjs',
    path: path.resolve(__dirname, './dist'),
  },
  target: 'node',
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
        loader: 'graphql-import-webpack-loader',
      },
    ],
  },
  node: {
    __dirname: false,
  },
  externals: [
    nodeExternals(),
  ],
  optimization: {
    minimize: false,
  },
  devtool: 'cheap-source-map',
  stats: 'errors-only',
  watch: true,
  plugins: [
    new WebpackbarPlugin({
      color: '#1c7ed6',
      name: 'Development',
    }),
    new NodemonPlugin(),
    new ForkTsCheckerWebpackPlugin({
      tsconfig: tsconfigFile,
    }),
  ],
})

const migrationEntries = {}
const migrationFilenames = glob.sync(path.resolve('src/migrations/*.ts'))


for (const migrationFilename of migrationFilenames) {
  const migrationName = path.basename(migrationFilename, '.ts')
  
  Object.assign(migrationEntries, {
    [migrationName]: migrationFilename,
  })
}

if (Object.keys(migrationEntries).length > 0) {
  configs.push({
    mode: 'production',
    entry: migrationEntries,
    output: {
      path: path.resolve(__dirname, './dist/migrations'),
      libraryTarget: 'umd',
      filename: '[name].js',
    },
    target: 'node',
    resolve: {
      extensions: ['.ts'],
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
      ],
    },
    optimization: {
      minimize: false,
    },
    externals: [
      nodeExternals(),
    ],
    devtool: 'cheap-source-map',
    stats: 'errors-only',
    plugins: [
      new WebpackbarPlugin({
        color: '#fcc419',
        name: 'Migrations',
      }),
    ],
  })
}

module.exports = configs
