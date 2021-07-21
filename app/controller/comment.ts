const BaseController = require('./BaseController')

export default class Momment extends BaseController {
  /**
   *  @param {string}  type 评论类型     [热门评论  get_rec_comment , 最新评论  get_comment]
   *  @param {number}   digest          15 歌曲  2  排行榜  8 歌单评论  7  mv评论
   */
  async index () {
    const { ctx, service } = this

    const { sid, page = 1, rows = 30, uid = 0, type = 'get_rec_comment', digest = 15 } = ctx.query

    if (!sid) {
      ctx.body = {
        code: 500,
        message: '参数错误',
        result: null,
        success: false,
      }
      return false
    }

    const res = await service.comment.List({ sid, page, rows, uid, type, digest })
    ctx.body = res
  }
}
