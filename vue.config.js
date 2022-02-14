const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
module.exports = {
  pluginOptions: {
    i18n: {
      locale: 'en',
      fallbackLocale: 'en',
      localeDir: 'locales',
      enableInSFC: false,
      enableBridge: false
    }
  },
  assetsDir: 'src/assets',
  pwa: {
    themeColor: '#084e74'
  },
  configureWebpack: {
    plugins: [new BundleAnalyzerPlugin()]
  }
}
