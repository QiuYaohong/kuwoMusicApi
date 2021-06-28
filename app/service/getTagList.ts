const BaseService = require('./BaseService')

export default class TagList extends BaseService {
  async index () {
    return this.commonRequest('http://www.kuwo.cn/api/www/playlist/getTagList?&httpsStatus=1')
  }
}
