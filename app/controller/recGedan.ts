const BaseController = require('./BaseController')

export default class RecGedan extends BaseController {
  async index () {
    const { ctx, service } = this
    const { id = 'rec', pn = 5, rn = 1 } = ctx.query
    const res = await service.recGedan.index({ id, pn, rn })
    ctx.body = res
  }
}
