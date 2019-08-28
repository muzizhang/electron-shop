module.exports = {
  proxy: {
    '/api': {
      target: 'http://localhost:8888/users/',
      // secure: false,
      changeOrigin: true,
      pathRewrite: {
        '^/api': ''
      }
    }
  }
}
