const path = require('path')
const fse = require('fs-extra')
const appDirectory = fse.realpathSync(process.cwd())
const resolveApp = relativePath => path.resolve(appDirectory, relativePath)

//  https://www.eggjs.org/zh-CN/basics/schedule#%E5%AE%9A%E6%97%B6%E6%96%B9%E5%BC%8F
module.exports = app => {
  console.log('app-->', app.config)
  return {
    schedule: {
      //  每 24 h
      interval: '86440s',
      type: 'all', // 指定所有的 worker 都需要执行
    },
    async task (ctx) {
      fse.emptydirSync(resolveApp('logs'), err => {
        if (!err) {
          return console.log('emptydirSync success')
        }
      })
      ctx.app.cache = 1
    },
  }
}
