const glob = require('glob')
const path = require('path')
const WebpackbarPlugin = require('webpackbar')
const nodeExternals = require('webpack-node-externals')

const tsconfigFile = path.resolve(__dirname, './tsconfig.json')

const configs = []

configs.push({
  mode: 'production',
  entry: {
    index: path.resolve(__dirname, './src/index.ts'),
  },
  output: {
    filename: 'index.min.js',
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
  externals: [
    nodeExternals(),
  ],
  optimization: {
    minimize: false,
  },
  devtool: 'inline-source-map',
  stats: 'errors-only',
  plugins: [
    new WebpackbarPlugin({
      color: '#fa5252',
      name: 'Production',
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
