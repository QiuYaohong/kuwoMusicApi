const BaseService = require('./BaseService')

export default class MusicInfo extends BaseService {
  async getList (mid) {
    return this.commonRequest(`http://www.kuwo.cn/api/www/music/musicInfo?mid=${mid}&httpsStatus=1`)
  }
}
