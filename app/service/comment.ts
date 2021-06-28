const BaseService = require('./BaseService')

export default class Comment extends BaseService {
  async List ({ sid, page, rows, uid, type, digest }) {
    const targetUrl = `http://www.kuwo.cn/comment?type=${type}&f=web&page=${page}&rows=${rows}&digest=${digest}&sid=${sid}&uid=${uid}&prod=newWeb&httpsStatus=1`

    let Ref = ''
    switch (digest) {
      case 15:
        return Ref = 'http://www.kuwo.cn/play_detail/' + encodeURIComponent(sid)
      case 7:
        return Ref = 'http://www.kuwo.cn/mvplay/' + encodeURIComponent(sid)
      case 8:
        return Ref = 'http://www.kuwo.cn/playlist_detail/' + encodeURIComponent(sid)
      case 2:
        return Ref = 'http://www.kuwo.cn/rankList'
    }

    return this.commonRequest(targetUrl, {
      headers: {
        Referer: Ref,
      },
    })
  }
}
