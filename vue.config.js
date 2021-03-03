const CompressionPlugin = require('compression-webpack-plugin');

module.exports = {
  publicPath: '/',
  productionSourceMap: false,
  "transpileDependencies": [
    "vuetify"
  ],
  chainWebpack(config) {
    config.plugin('CompressionPlugin').use(CompressionPlugin);
  }
};
