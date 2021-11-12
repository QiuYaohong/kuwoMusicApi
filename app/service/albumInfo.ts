const BaseService = require('./BaseService')

export default class AlbumInfo extends BaseService {
  async getList ({ albumId, pn, rn }) {
    return this.commonRequest(`http://www.kuwo.cn/api/www/album/albumInfo?albumId=${albumId}&pn=${pn}&rn=${rn}&httpsStatus=1`)
  }
}
