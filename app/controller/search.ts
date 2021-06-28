const BaseController = require('./BaseController')

export default class Search extends BaseController {
  // 关键字搜索
  async searchKey () {
    const { ctx, service } = this
    const { key } = ctx.query
    const res = await service.search.searchKey(key)
    ctx.body = res
  }

  // 单曲搜索
  async searchMusicBykeyWord () {
    const { ctx, service } = this
    const { key, pn = 1, rn = 30 } = ctx.query
    if (!key) {
      ctx.body = {
        code: 500,
        message: '参数错误',
        result: null,
        success: false,
      }
      return
    }
    const res = await service.search.searchMusicBykeyWord({ key, pn, rn })
    ctx.body = res
  }

  // 专辑搜索
  async searchAlbumBykeyWord () {
    const { ctx, service } = this
    const { key, pn = 1, rn = 30 } = ctx.query
    if (!key) {
      ctx.body = {
        code: 500,
        message: '参数错误',
        result: null,
        success: false,
      }
      return
    }
    const res = await service.search.searchAlbumBykeyWord({ key, pn, rn })
    ctx.body = res
  }

  // mv 搜索
  async searchMvBykeyWord () {
    const { ctx, service } = this
    const { key, pn = 1, rn = 30 } = ctx.query
    if (!key) {
      ctx.body = {
        code: 500,
        message: '参数错误',
        result: null,
        success: false,
      }
      return
    }
    const res = await service.search.searchMvBykeyWord({ key, pn, rn })
    ctx.body = res
  }

  // 歌单搜索
  async searchPlayListBykeyWord () {
    const { ctx, service } = this
    const { key, pn = 1, rn = 30 } = ctx.query
    if (!key) {
      ctx.body = {
        code: 500,
        message: '参数错误',
        result: null,
        success: false,
      }
      return
    }
    const res = await service.search.searchPlayListBykeyWord({ key, pn, rn })
    ctx.body = res
  }

  // 歌手搜索
  async searchArtistBykeyWord () {
    const { ctx, service } = this
    const { key, pn = 1, rn = 30 } = ctx.query
    if (!key) {
      ctx.body = {
        code: 500,
        message: '参数错误',
        result: null,
        success: false,
      }
      return
    }
    const res = await service.search.searchArtistBykeyWord({ key, pn, rn })
    ctx.body = res
  }
}
