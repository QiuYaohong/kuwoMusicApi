const BaseService = require('./BaseService')

export default class MusicList extends BaseService {
  async getList ({ pid, pn, rn }) {
    return this.commonRequest(`http://www.kuwo.cn/api/www/playlist/playListInfo?pid=${pid}&pn=${pn}&rn=${rn}&httpsStatus=1`)
  }
}
