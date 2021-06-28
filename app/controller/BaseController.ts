import { Controller } from 'egg'
class BaseController extends Controller {
  constructor (ctx) {
    super(ctx)
  }
}

module.exports = BaseController
