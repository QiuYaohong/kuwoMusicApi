const BaseService = require('./BaseService')

export default class PlayUrl extends BaseService {
  async getPlayUrl (mid, type = 'music', br = '128kmp3') {
    return this.commonRequest(`http://www.kuwo.cn/api/v1/www/music/playUrl?mid=${mid}&type=${type}&httpsStatus=1&plat=web_www&from=&br=${br}`)
  }
}
