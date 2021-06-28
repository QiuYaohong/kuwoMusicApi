const BaseController = require('./BaseController')

export default class TagList extends BaseController {
  async index () {
    const { ctx, service } = this

    const res = await service.getTagList.index()

    ctx.body = res
  }
}
