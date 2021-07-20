import { Service } from 'egg'
import { v4 as uuidv4 } from 'uuid'

class BaseService extends Service {
  _headers (opts) {
    return {
      Cookie: 'Hm_lvt_cdb524f42f0ce19b169a8071123a4797=1623339177,1623339183; _ga=GA1.2.1195980605.1579367081; Hm_lpvt_cdb524f42f0ce19b169a8071123a4797=1623339982; kw_token=3E7JFQ7MRPL; _gid=GA1.2.747985028.1623339179; _gat=1',
      csrf: '3E7JFQ7MRPL',
      Host: 'www.kuwo.cn',
      Referer: 'http://www.kuwo.cn/',
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.77 Safari/537.36',
      ...opts,
    }
  }

  async commonRequest (url, options) {
    const opts = {
      method: 'GET',
      dataType: 'json',
      timeout: 60000,
      ...options,
      headers: this._headers(options?.headers),
    }

    const reqId = uuidv4()
    return this.ctx.curl(`${url}&reqId=${reqId}`, opts).then(res => {
      this.logger.info({
        req: Object.assign({}, opts, { ctx: undefined }),
        url,
        reqId,
        status: res.status,
        res: JSON.stringify(res.data),
      })
      return res.data
    })
      .catch(e => {
        this.logger.info({
          req: Object.assign({}, opts, { ctx: undefined }),
          url,
          reqId,
          error: e,
          res: null,
        })
        throw e
      })
  }
}

module.exports = BaseService
