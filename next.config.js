require('dotenv').config()
const withCSS = require('@zeit/next-css')
const webpack = require('webpack')
const antdLessLoader = require("next-antd-aza-less")

// error when require, need more work on it
//const modifyAntd = require("./utils/modifyAntd")

// fix: prevents error when .less files are required by node
if (typeof require !== 'undefined') {
  require.extensions['.less'] = (file) => {};
}

module.exports = withCSS(antdLessLoader({
  cssModules: false,
  cssLoaderOptions: {
    importLoaders: 1,
    localIdentName: "[local]___[hash:base64:5]",
  },
  lessLoaderOptions: {
    javascriptEnabled: true,
    modifyVars: {
      "@primary-color": "#1DA57A",
    },
  },
  webpack: config => {
    config.plugins.push(new webpack.EnvironmentPlugin(process.env))
    return config
  }
}))
