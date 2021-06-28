const BaseService = require('./BaseService')

export default class Artist extends BaseService {
  // 获取歌手
  async getArtistInfo ({ category, rn, pn, prefix }) {
    return this.commonRequest(
      prefix
        ? `http://www.kuwo.cn/api/www/artist/artistInfo?category=${category}&pn=${pn}&rn=${rn}&prefix=${prefix}&httpsStatus=1`
        : `http://www.kuwo.cn/api/www/artist/artistInfo?category=${category}&pn=${pn}&rn=${rn}&httpsStatus=1`, {
        headers: {
          Referer: prefix ? 'http://www.kuwo.cn/singers' : undefined,
        },
      })
  }

  // 获取歌手单曲
  async getArtistMusic ({ artistid, rn, pn }) {
    return this.commonRequest(`http://www.kuwo.cn/api/www/artist/artistMusic?artistid=${artistid}&rn=${rn}&pn=${pn}&httpsStatus=1`, {
      headers: {
        Referer: 'http://www.kuwo.cn/singer_detail/' + encodeURIComponent(artistid),
      },
    })
  }

  // 获取歌手专辑

  async getArtistAlbum ({ artistid, rn, pn }) {
    return this.commonRequest(`http://www.kuwo.cn/api/www/artist/artistAlbum?artistid=${artistid}&rn=${rn}&pn=${pn}&httpsStatus=1`, {
      headers: {
        Referer: 'http://www.kuwo.cn/singer_detail/' + encodeURIComponent(artistid) + '/album',
      },
    })
  }

  // 获取歌手mv
  async getArtistMv ({ artistid, rn, pn }) {
    return this.commonRequest(`http://www.kuwo.cn/api/www/artist/artistMv?artistid=${artistid}&rn=${rn}&pn=${pn}&httpsStatus=1`, {
      headers: {
        Referer: 'http://www.kuwo.cn/singer_detail/' + encodeURIComponent(artistid) + '/mv',
      },
    })
  }
}
