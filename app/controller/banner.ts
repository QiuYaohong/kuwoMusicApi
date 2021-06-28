const BaseController = require('./BaseController')

export default class Banner extends BaseController {
  async index () {
    const { ctx, service } = this
    const res = await service.banner.List()
    ctx.body = res
  }
}
