const BaseService = require('./BaseService')

export default class Lrc extends BaseService {
  async LrcRes (musicId) {
    return this.commonRequest(`http://m.kuwo.cn/newh5/singles/songinfoandlrc?musicId=${musicId}&httpsStatus=1`)
  }
}
