const BaseService = require('./BaseService')

export default class Banner extends BaseService {
  async List () {
    return this.commonRequest('http://www.kuwo.cn/api/www/banner/index/bannerList?&httpsStatus=1')
  }
}
