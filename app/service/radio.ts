const BaseService = require('./BaseService')

export default class Radio extends BaseService {
  async getRadio () {
    return this.commonRequest('http://www.kuwo.cn/api/www/radio/index/radioList?&httpsStatus=1', {
      headers: {
        Referer: 'http://www.kuwo.cn/rankList',
      },
    })
  }
}
