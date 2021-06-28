const BaseController = require('./BaseController')

export default class MusicList extends BaseController {
  async index () {
    const { ctx, service } = this
    const { pid, rn = 30, pn = 1 } = ctx.query
    if (!pid) {
      ctx.body = {
        code: 500,
        message: '参数错误',
        result: null,
        success: false,
      }
      return false
    }
    const res = await service.musicList.getList({ pid, rn, pn })

    ctx.body = res
  }
}
