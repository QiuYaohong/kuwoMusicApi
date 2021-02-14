const express = require("express")
const router = express.Router()
const request = require("request")

const requestHeader = require("../utils/request-header")

router.get(`/`, (req, res, next) => {
  const { rid } = req.query
  if (!rid) {
    return res.sendResult(null, 500, "参数错误")
  }
  const options = {
    url: `http://www.kuwo.cn/url?rid=${rid}&response=url&format=mp4%7Cmkv&type=convert_url&t=1581339481689`,
    headers: Object.assign(
      requestHeader,
      {
        Referer: "http://www.kuwo.cn/mvs",
      },
      {}
    )
  }
  request(options, (err, response, body) => {
    if (!err) {
      res.send({
        code: "ok",
        url: body,
        curTime: new Date().getTime(),
        msg: "success"
      })
    } else {
      res.sendResult(null, 500, "請求失敗")
    }
  })
})

module.exports = router;
