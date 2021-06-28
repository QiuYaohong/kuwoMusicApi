const BaseController = require('./BaseController')

export default class PlayUrl extends BaseController {
  async index () {
    const { ctx, service } = this
    const { rid } = ctx.query

    if (!rid) {
      ctx.body = {
        code: 500,
        message: '参数错误',
        result: null,
        success: false,
      }
      return false
    }

    const res = await service.playUrl.getPlayUrl(rid)

    ctx.body = res
  }
}
