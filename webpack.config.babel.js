import path from 'path';
import { loaders } from './config/loaders';
import { plugins } from './config/common.config';
import { prodPlugins, prodLoaders } from './config/prod.config';

const ENV = process.env.NODE_ENV || 'development';

if (ENV === 'development') {
  var { devPlugins, devServerconfig, devLoaders } = require('./config/dev.config');
}

const envPlugins = ENV === 'development' ? devPlugins : prodPlugins;

const envLoaders = ENV === 'development' ? devLoaders : prodLoaders;

module.exports = {
  entry: {
    bundle: [
      'react-hot-loader/patch',
      './src/index.js'
    ]
  },

  output: {
    path: path.resolve(__dirname, './build'),
    filename: '[name].js',
    chunkFilename: '[id].[hash:8].chunk.js',
    publicPath: '/'
  },

  resolve: {
    extensions: ['.js', '.scss'],
    alias: {
      'react': 'preact-compat',
      'react-dom': 'preact-compat',
      "preact-compat": "preact-compat/dist/preact-compat"
    }
  },
  module: {
    rules: loaders.concat(envLoaders)
  },
  plugins: plugins.concat(envPlugins),
  stats: {
    colors: true
  },
  // devtool: 'source-map',
  devtool: ENV !== 'production' && 'eval',
  ...devServerconfig
};
