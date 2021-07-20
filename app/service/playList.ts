const BaseService = require('./BaseService')

export default class PlayList extends BaseService {
  async index ({ order, rn, pn }) {
    return await this.commonRequest(`http://www.kuwo.cn/api/www/classify/playlist/getRcmPlayList?pn=${pn}&rn=${rn}&order${order}&httpsStatus=1`)
  }

  // 歌单分类
  async getTagPlayList ({ id, rn, pn }) {
    return await this.commonRequest(`http://www.kuwo.cn/api/www/classify/playlist/getTagPlayList?pn=${pn}&rn=${rn}&id=${id}&httpsStatus=1`, {
      headers: {
        Referer: 'http://www.kuwo.cn/playlists',
      },
    })
  }
}
