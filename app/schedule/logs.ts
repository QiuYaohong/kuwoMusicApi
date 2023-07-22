const fse = require('fs-extra')

//  https://www.eggjs.org/zh-CN/basics/schedule#%E5%AE%9A%E6%97%B6%E6%96%B9%E5%BC%8F
module.exports = app => {
  return {
    schedule: {
      //  每 24 h 清除 logs
      interval: '86440s',
      type: 'all', // 指定所有的 worker 都需要执行
    },
    async task () {
      fse.emptydirSync(app.config?.logger?.dir, err => {
        if (!err) {
          return console.log('emptydirSync success')
        }
      })
    },
  }
}
