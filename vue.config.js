const CompressionPlugin = require('compression-webpack-plugin');

module.exports = {
  productionSourceMap: false,
  "transpileDependencies": [
    "vuetify"
  ],
  chainWebpack(config) {
    config.plugin('CompressionPlugin').use(CompressionPlugin);
  }
};
