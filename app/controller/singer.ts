const BaseController = require('./BaseController')

export default class Singer extends BaseController {
  async getArtistInfo () {
    const { ctx, service } = this
    const {
      category = 0, // 分类  0 = 全部 1 = 华语男 2 = 华语女 3 = 华语组合 4 = 日韩男 5 = 日韩女 6 = 日韩组合 7 = 欧美男 8 = 欧美女  9 = 欧美组合  10 = 其他
      rn = 50, // 默认 每页数据
      pn = 1, // 分页
      prefix, // A ~ Z  分类
    } = ctx.query

    const res = await service.singer.getArtistInfo({ category, rn, pn, prefix })

    ctx.body = res
  }

  // 歌手单曲
  async getArtistMusic () {
    const { ctx, service } = this
    const {
      artistid,
      rn = 30,
      pn = 1,
    } = ctx.query

    if (!artistid) {
      ctx.body = {
        code: 500,
        message: '参数错误',
        result: null,
        success: false,
      }
      return
    }
    const res = await service.singer.getArtistMusic({ artistid, rn, pn })

    ctx.body = res
  }

  // 获取歌手专辑
  async getArtistAlbum () {
    const { ctx, service } = this
    const {
      artistid,
      rn = 30,
      pn = 1,
    } = ctx.query

    if (!artistid) {
      ctx.body = {
        code: 500,
        message: '参数错误',
        result: null,
        success: false,
      }
      return
    }

    const res = await service.singer.getArtistAlbum({ artistid, rn, pn })
    ctx.body = res
  }

  // 获取歌手mv

  async getArtistMv () {
    const { ctx, service } = this
    const {
      artistid,
      rn = 30,
      pn = 1,
    } = ctx.query

    if (!artistid) {
      ctx.body = {
        code: 500,
        message: '参数错误',
        result: null,
        success: false,
      }
      return
    }
    const res = await service.singer.getArtistMv({ artistid, rn, pn })
    ctx.body = res
  }
}
