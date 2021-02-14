const express = require('express');
const router = express.Router();
const request = require('request');

const requestHeader = require('../utils/request-header')

router.get(`/`, (req, res, next) => {
  const { musicId } = req.query

  if (!musicId) {
    return res.sendResult(null, 500, '参数错误')
  }
  const options = {
    url: `http://m.kuwo.cn/newh5/singles/songinfoandlrc?musicId=${musicId}`,
    headers: requestHeader,
  }
  request(options, (err, response, body) => {
    if (!err) {
      res.send(JSON.parse(body))
    } else {
      res.sendResult(null, 500, '請求失敗')
    }
  })
})

module.exports = router
