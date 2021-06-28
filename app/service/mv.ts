const BaseService = require('./BaseService')

export default class Mv extends BaseService {
  async getMvUrl (rid) {
    const res = await this.commonRequest(`http://www.kuwo.cn/url?rid=${rid}&response=url&format=mp4%7Cmkv&type=convert_url&t=${Date.now()}&httpsStatus=1`, {
      headers: {
        Referer: 'http://www.kuwo.cn/mvs',
      },
      dataType: 'text',
    })
    return {
      code: 200,
      msg: 'success',
      url: res,
    }
  }
}
