const express = require('express')
const router = express.Router()
const request = require('request')
const requestHeader = require('../utils/request-header')

router.get(`/`, (req, res, next) => {
 
    const {
        rid   // 28015050
    } = req.query

    if (!rid) {
        return res.sendResult(null,500,"参数错误")
    }
    const options = {
        url: `http://www.kuwo.cn/url?&rid=${rid}&response=url&type=convert_url3&br=128kmp3&from=web&t=${new Date().getTime()}`,
        headers: requestHeader
    }
    request(options, (err, response, body) => {
        if (!err) {
          return res.send(JSON.parse(body))
        } 
        res.sendResult(null,500,"請求失敗")
    })
})

module.exports = router