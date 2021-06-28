const BaseController = require('./BaseController')

export default class Rank extends BaseController {
  async index () {
    const { ctx, service } = this
    const res = await service.rank.index()
    ctx.body = res
  }

  // 排行榜音乐
  async rankMusicList () {
    const { ctx, service } = this
    const { bangId = 93, pn = 1, rn = 30 } = ctx.query
    const res = await service.rank.getRankMusicList({ bangId, pn, rn })
    ctx.body = res
  }

  // 推荐榜单

  async rankRecBangList () {
    const { ctx, service } = this
    const res = await service.rank.getRecBangList()
    ctx.body = res
  }
}
