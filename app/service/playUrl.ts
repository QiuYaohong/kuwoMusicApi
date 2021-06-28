const BaseService = require('./BaseService')

export default class PlayUrl extends BaseService {
  async getPlayUrl (rid) {
    return this.commonRequest(`http://www.kuwo.cn/url?&rid=${rid}&response=url&type=convert_url3&br=128kmp3&from=web&t=${Date.now()}&httpsStatus=1`)
  }
}
