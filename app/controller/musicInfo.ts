const BaseController = require('./BaseController')

export default class MusicInfo extends BaseController {
  async index () {
    const { ctx, service } = this
    const { mid } = ctx.query

    if (!mid) {
      ctx.body = {
        code: 500,
        message: '参数错误',
        result: null,
        success: false,
      }
      return false
    }

    const res = await service.musicInfo.getList(mid)

    ctx.body = res
  }
}
