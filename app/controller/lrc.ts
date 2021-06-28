const BaseController = require('./BaseController')

export default class Lrc extends BaseController {
  async index () {
    const { ctx, service } = this
    const { musicId } = ctx.query

    if (!musicId) {
      ctx.body = {
        code: 500,
        message: '参数错误',
        result: null,
        success: false,
      }
      return false
    }

    const res = await service.lrc.LrcRes(musicId)

    ctx.body = res
  }
}
