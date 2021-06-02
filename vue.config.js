module.exports = {
  configureWebpack: {
    devtool: 'source-map',
  },
  pluginOptions: {
    electronBuilder: {
      preload: 'src/background/preload.js',
      mainProcessFile: 'src/background/main.js',
      rendererProcessFile: 'src/renderer/main.js',
    },
  },
};
