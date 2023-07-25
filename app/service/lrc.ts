/* eslint-disable node/prefer-global/process */
const BaseService = require('./BaseService')
const needle = require('needle')
const process = require('process')
const deflateRaw = require('zlib')
const { inflate } = require('zlib')
const iconv = require('iconv-lite')

const bufkey = Buffer.from('yeelion')
const bufkeylen = bufkey.length
const buildParams = (id, isGetLyricx) => {
  let params = `user=12345,web,web,web&requester=localhost&req=1&rid=MUSIC_${id}`
  if (isGetLyricx) params += '&lrcx=1'
  const bufstr = Buffer.from(params)
  const bufstrlen = bufstr.length
  const output = new Uint16Array(bufstrlen)
  let i = 0
  while (i < bufstrlen) {
    let j = 0
    while (j < bufkeylen && i < bufstrlen) {
      // eslint-disable-next-line no-bitwise
      output[i] = bufkey[j] ^ bufstr[i]
      i++
      j++
    }
  }
  return Buffer.from(output).toString('base64')
}

const cancelHttp = requestObj => {
  if (!requestObj) return
  if (!requestObj.abort) return
  requestObj.abort()
}

const requestMsg = {
  fail: '请求异常，可以多试几次，若还是不行就换一首吧',
  unachievable: '哦No...接口无法访问了！',
  timeout: '请求超时',
  // unachievable: '哦No...接口无法访问了！已帮你切换到临时接口，重试下看能不能播放吧~',
  notConnectNetwork: '无法连接到服务器',
  cancelRequest: '取消http请求',
}

const request = (url, options, callback) => {
  let data
  if (options.body) {
    data = options.body
  } else if (options.form) {
    data = options.form
    // data.content_type = 'application/x-www-form-urlencoded'
    options.json = false
  } else if (options.formData) {
    data = options.formData
    // data.content_type = 'multipart/form-data'
    options.json = false
  }
  options.response_timeout = options.timeout

  return needle.request(options.method || 'get', url, data, options, (err, resp, body) => {
    if (!err) {
      body = resp.body = resp.raw.toString()
      try {
        resp.body = JSON.parse(resp.body)
      } catch (_) { }
      body = resp.body
    }
    callback(err, resp, body)
  }).request
}

const defaultHeaders = {
  'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/69.0.3497.100 Safari/537.36',
}

const handleDeflateRaw: any = data => new Promise((resolve, reject) => {
  deflateRaw(data, (err, buf) => {
    if (err) return reject(err)
    resolve(buf)
  })
})

const regx = /(?:\d\w)+/g

const fetchData = async (url, method, {
  headers = {},
  format = 'json',
  timeout = 15000,
  ...options
}, callback) => {
  headers = Object.assign({}, headers)
  const bHh = '624868746c'
  if (headers[bHh]) {
    const path = url.replace(/^https?:\/\/[\w.:]+\//, '/')
    let s = Buffer.from(bHh, 'hex').toString()
    s = s.replace(s.substr(-1), '')
    s = Buffer.from(s, 'base64').toString()
    const v = process.versions.app.split('-')[0].split('.').map(n => (n.length < 3 ? n.padStart(3, '0') : n)).join('')
    const v2 = process.versions.app.split('-')[1] || ''
    headers[s] = !s || `${(await handleDeflateRaw(Buffer.from(JSON.stringify(`${path}${v}`.match(regx), null, 1).concat(v)).toString('base64'))).toString('hex')}&${parseInt(v)}${v2}`
    delete headers[bHh]
  }
  return request(url, {
    ...options,
    method,
    headers: Object.assign({}, defaultHeaders, headers),
    timeout,
    json: format === 'json',
  }, (err, resp, body) => {
    if (err) return callback(err, null)
    callback(null, resp, body)
  })
}

const buildHttpPromose = (url, options) => {
  const obj: any = {
    isCancelled: false,
  }
  obj.promise = new Promise((resolve, reject) => {
    obj.cancelFn = reject
    // console.log(`\nsend request---${url}`)
    fetchData(url, options.method, options, (err, resp) => {
      obj.requestObj = null
      obj.cancelFn = null
      if (err) return reject(err)
      resolve(resp)
    }).then(ro => {
      obj.requestObj = ro
      if (obj.isCancelled) obj.cancelHttp()
    })
  })
  obj.cancelHttp = () => {
    if (!obj.requestObj) return obj.isCancelled = true
    cancelHttp(obj.requestObj)
    obj.requestObj = null
    obj.promise = obj.cancelHttp = null
    obj.cancelFn(new Error(requestMsg.cancelRequest))
    obj.cancelFn = null
  }
  return obj
}
const httpFetch = (url, options = { method: 'get' }) => {
  const requestObj = buildHttpPromose(url, options)
  requestObj.promise = requestObj.promise.catch(err => {
    if (err.message === 'socket hang up') {
      return Promise.reject(new Error(requestMsg.unachievable))
    }
    switch (err.code) {
      case 'ETIMEDOUT':
      case 'ESOCKETTIMEDOUT':
        return Promise.reject(new Error(requestMsg.timeout))
      case 'ENOTFOUND':
        return Promise.reject(new Error(requestMsg.notConnectNetwork))
      default:
        return Promise.reject(err)
    }
  })
  return requestObj
}
const lrcTools: any = {
  rxps: {
    wordLine: /^(\[\d{1,2}:.*\d{1,4}\])\s*(\S+(?:\s+\S+)*)?\s*/,
    tagLine: /\[(ver|ti|ar|al|offset|by|kuwo):\s*(\S+(?:\s+\S+)*)\s*\]/,
    wordTimeAll: /<(-?\d+),(-?\d+)(?:,-?\d+)?>/g,
    wordTime: /<(-?\d+),(-?\d+)(?:,-?\d+)?>/,
  },
  offset: 1,
  offset2: 1,
  isOK: false,
  lines: [],
  tags: [],
  getWordInfo (str, str2, prevWord) {
    const offset = parseInt(str)
    const offset2 = parseInt(str2)
    const startTime = Math.abs((offset + offset2) / (this.offset * 2))
    const endTime = Math.abs((offset - offset2) / (this.offset2 * 2)) + startTime
    if (prevWord) {
      if (startTime < prevWord.endTime) {
        prevWord.endTime = startTime
        if (prevWord.startTime > prevWord.endTime) {
          prevWord.startTime = prevWord.endTime
        }
        prevWord.newTimeStr = ''
      }
    }
    return {
      startTime,
      endTime,
      timeStr: '',
    }
  },
  parseLine (line) {
    if (line.length < 6) return
    let result = this.rxps.wordLine.exec(line)
    if (result) {
      const time = result[1]
      let words = result[2]
      if (words == null) {
        words = ''
      }
      const wordTimes = words.match(this.rxps.wordTimeAll)
      if (!wordTimes) return
      // console.log(wordTimes)
      let preTimeInfo
      for (const timeStr of wordTimes) {
        const result = this.rxps.wordTime.exec(timeStr)
        const wordInfo = this.getWordInfo(result[1], result[2], preTimeInfo)
        words = words.replace(timeStr, wordInfo.timeStr)
        if (preTimeInfo?.newTimeStr) words = words.replace(preTimeInfo.timeStr, preTimeInfo.newTimeStr)
        preTimeInfo = wordInfo
      }
      this.lines.push(time + words)
      return
    }
    result = this.rxps.tagLine.exec(line)
    if (!result) return
    if (result[1] === 'kuwo') {
      let content = result[2]
      if (content !== null && content.includes('][')) {
        content = content.substring(0, content.indexOf(']['))
      }
      const valueOf = parseInt(content, 8)
      this.offset = Math.trunc(valueOf / 10)
      this.offset2 = Math.trunc(valueOf % 10)
      if (this.offset === 0 || Number.isNaN(this.offset) || this.offset2 === 0 || Number.isNaN(this.offset2)) {
        this.isOK = false
      }
    } else {
      this.tags.push(line)
    }
  },
  parse (lrc) {
    // console.log(lrc)
    const lines = lrc.split(/\r\n|\r|\n/)
    const tools = Object.create(this)
    tools.isOK = true
    tools.offset = 1
    tools.offset2 = 1
    tools.lines = []
    tools.tags = []
    for (const line of lines) {
      if (!tools.isOK) throw new Error('failed')
      tools.parseLine(line)
    }
    if (!tools.lines.length) return ''
    let lrcs = tools.lines.join('\n')
    if (tools.tags.length) lrcs = `${tools.tags.join('\n')}\n${lrcs}`
    // console.log(lrcs)
    return lrcs
  },
}
const isGetLyricx = true
const handleInflate = data => new Promise((resolve, reject) => {
  inflate(data, (err, result) => {
    if (err) return reject(err)
    resolve(result)
  })
})
const bufKey = Buffer.from('yeelion')
const bufKeyLen = bufKey.length
const decodeLyrics = async (buf, isGetLyricx) => {
  if (buf.toString('utf8', 0, 10) !== 'tp=content') return ''
  const lrcData: any = await handleInflate(buf.slice(buf.indexOf('\r\n\r\n') + 4))
  if (!isGetLyricx) return iconv.decode(lrcData, 'gb18030')
  const bufStr = Buffer.from(lrcData.toString(), 'base64')
  const bufStrLen = bufStr.length
  const output = new Uint16Array(bufStrLen)
  let i = 0
  while (i < bufStrLen) {
    let j = 0
    while (j < bufKeyLen && i < bufStrLen) {
      // eslint-disable-next-line no-bitwise
      output[i] = bufStr[i] ^ bufKey[j]
      i++
      j++
    }
  }
  return iconv.decode(Buffer.from(output), 'gb18030')
}
const timeExp = /^\[([\d:.]*)\]{1}/g
const sortLrcArr = arr => {
  const lrcSet = new Set()
  const lrc: any = []
  const lrcT: any = []
  for (const item of arr) {
    if (lrcSet.has(item.time)) {
      if (lrc.length < 2) continue
      const tItem: any = lrc.pop()
      tItem.time = lrc[lrc.length - 1].time
      lrcT.push(tItem)
      lrc.push(item)
    } else {
      lrc.push(item)
      lrcSet.add(item.time)
    }
  }
  return {
    lrc,
    lrcT,
  }
}
const parseLrc = lrc => {
  const lines = lrc.split(/\r\n|\r|\n/)
  const tags: any = []
  const lrcArr: any = []
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim()
    const result = timeExp.exec(line)
    if (result) {
      let text = line.replace(timeExp, '').trim()
      let time = RegExp.$1
      if (/\.\d\d$/.test(time)) time += '0'
      const regexp = /<.*?>/g
      text = text.replace(regexp, '').replace(/\[by:.*?\](\n|$)/g, '').replace(/\[kuwo:.*?\](\n|$)/g, '')
      const times = time.split(':')
      time = (parseFloat(times[0]) * 60 + parseFloat(times[1])).toFixed(2)
      lrcArr.push({
        time,
        lineLyric: text,
      })
    } else if (lrcTools.rxps.tagLine.test(line)) {
      tags.push(line)
    }
  }
  const lrcInfo = sortLrcArr(lrcArr)
  return lrcInfo
}

const rendererInvoke = async params => {
  const lrc = await decodeLyrics(Buffer.from(params.lrcBase64, 'base64'), isGetLyricx)
  return Buffer.from(lrc).toString('base64')
}
const decodeLyric = base64Data => rendererInvoke(base64Data)

export default class Lrc extends BaseService {
  async LrcRes (musicId) {
    const url = `http://newlyric.kuwo.cn/newlyric.lrc?${buildParams(musicId, isGetLyricx)}`

    const requestObj = httpFetch(url)
    requestObj.promise = requestObj.promise.then(({ statusCode, body, raw }) => {
      if (statusCode !== 200) {
        console.log(body)
        //  兼容 web 端请求
        return this.commonRequest(`http://m.kuwo.cn/newh5/singles/songinfoandlrc?musicId=${musicId}&httpsStatus=1`)
        // return Promise.reject(new Error(JSON.stringify(body)))
      }
      return decodeLyric({ lrcBase64: raw.toString('base64'), isGetLyricx }).then(base64Data => {
        let lrcInfo
        lrcInfo = parseLrc(Buffer.from(base64Data, 'base64').toString())
        try {
          lrcInfo = parseLrc(Buffer.from(base64Data, 'base64').toString())
        } catch (err) {
          return Promise.reject(new Error('Get lyric failed'))
        }
        const msg = {
          data: {
            lrclist: lrcInfo.lrc,
          },
          msg: '成功',
          status: 200,
        }
        return msg
      })
    })
    const asd = async () => {
      return await new Promise(resolve => {
        requestObj.promise.then(re => {
          resolve(re)
        })
      })
    }

    return await asd()
  }
}
