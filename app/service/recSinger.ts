const BaseService = require('./BaseService')

export default class RecSinger extends BaseService {
  async index ({ category, pn, rn }) {
    return this.commonRequest(`http://www.kuwo.cn/api/www/artist/artistInfo?category=${category}&pn=${pn}&rn=${rn}&httpsStatus=1`)
  }
}
