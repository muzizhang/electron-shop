module.exports = {
  proxy: {
    '/api': {
      target: 'http://172.18.10.20:8888/users',
      secure: false,
      changeOrigin: true,
      pathRewrite: {
        '^/api': ''
      }
    }
  }
}
