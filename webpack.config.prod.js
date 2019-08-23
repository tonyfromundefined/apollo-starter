const glob = require('glob')
const path = require('path')
const WebpackbarPlugin = require('webpackbar')
const nodeExternals = require('webpack-node-externals')

const tsconfigFile = path.resolve(__dirname, './tsconfig.json')

const configurations = []

configurations.push({
  mode: 'production',
  entry: {
    index: path.resolve(__dirname, './src/index.ts'),
  },
  optimization: {
    minimize: false,
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
          configFile: tsconfigFile,
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
})

const migrationEntries = {}
const migrationFilenames = glob.sync(path.resolve('src/db/migrations/*.ts'))

for (const migrationFilename of migrationFilenames) {
  const migrationName = path.basename(migrationFilename, '.ts')

  Object.assign({}, migrationEntries, {
    [migrationName]: migrationFilename,
  })
}

if (Object.keys(migrationEntries).length > 0) {
  configurations.push({
    entry: migrationEntries,
    resolve: {
      extensions: ['.ts'],
    },
    output: {
      path: path.resolve(__dirname, './dist/migrations'),
      libraryTarget: 'umd',
      filename: '[name].js',
    },
  })
}

module.exports = configurations
