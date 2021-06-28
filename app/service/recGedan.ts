const BaseService = require('./BaseService')

export default class RecGedan extends BaseService {
  async index ({ id, pn, rn }) {
    return this.commonRequest(`http://www.kuwo.cn/api/www/rcm/index/playlist?id=${id}&pn=${pn}&rn=${rn}&httpsStatus=1&reqId=bbcd49e0-4c96-11ea-a132-d31e6f025e81`)
  }
}
