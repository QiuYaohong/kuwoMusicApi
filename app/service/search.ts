const BaseService = require('./BaseService')

export default class Search extends BaseService {
  // 关键字搜索
  async searchKey (key) {
    return this.commonRequest(`http://www.kuwo.cn/api/www/search/searchKey?key=${key}&httpsStatus=1`)
  }

  // 单曲搜索
  async searchMusicBykeyWord ({ key, pn, rn }) {
    return this.commonRequest(`http://www.kuwo.cn/api/www/search/searchMusicBykeyWord?key=${key}&pn=${pn}&rn=${rn}&httpsStatus=1`)
  }

  // 专辑搜索
  async searchAlbumBykeyWord ({ key, pn, rn }) {
    return this.commonRequest(`http://www.kuwo.cn/api/www/search/searchAlbumBykeyWord?key=${key}&pn=${pn}&rn=${rn}&httpsStatus=1`)
  }

  // mv 搜索
  async searchMvBykeyWord ({ key, pn, rn }) {
    return this.commonRequest(`http://www.kuwo.cn/api/www/search/searchMvBykeyWord?key=${key}&pn=${pn}&rn=${rn}&httpsStatus=1`)
  }

  // 歌单搜索
  async searchPlayListBykeyWord ({ key, pn, rn }) {
    return this.commonRequest(`http://www.kuwo.cn/api/www/search/searchPlayListBykeyWord?key=${key}&pn=${pn}&rn=${rn}&httpsStatus=1`)
  }

  // 歌手搜索
  async searchArtistBykeyWord ({ key, pn, rn }) {
    return this.commonRequest(`http://www.kuwo.cn/api/www/search/searchArtistBykeyWord?key=${key}&pn=${pn}&rn=${rn}&httpsStatus=1`)
  }
}
