const BaseController = require('./BaseController')

export default class Radio extends BaseController {
  async index () {
    const { ctx, service } = this

    const res = await service.radio.getRadio()

    ctx.body = res
  }
}
