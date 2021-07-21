/* eslint-disable jsdoc/check-param-names */
const BaseController = require('./BaseController')

export default class RecSinger extends BaseController {
  /**
   * @param {number} category //  11 華語  13 歐美  12 日韓 16 組合
   * @param {number} pn 分页
   * @param {number} rn 每页数据
   */
  async index () {
    const { ctx, service } = this
    const { category = 1, pn = 5, rn = 1 } = ctx.query
    const res = await service.recSinger.index({ category, pn, rn })
    ctx.body = res
  }
}
