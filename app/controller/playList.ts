const BaseController = require('./BaseController')

export default class PlayList extends BaseController {
  async index () {
    const { ctx, service } = this
    // 默认 new = 最新 hot = 最热
    const { order = 'new', rn = 30, pn = 1 } = ctx.query

    const res = await service.playList.index({ order, rn, pn })
    ctx.body = res
  }

  // 歌单分类
  async getTagPlayList () {
    const { ctx, service } = this
    const { id, rn = 30, pn = 1 } = ctx.query
    if (!id) {
      ctx.body = {
        code: 500,
        message: '参数错误',
        result: null,
        success: false,
      }
      return false
    }
    const res = await service.playList.getTagPlayList({ id, rn, pn })

    ctx.body = res
  }
}
