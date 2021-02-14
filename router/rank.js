const express = require('express')
const router = express.Router()
const request = require('request')
const requestHeader = require('../utils/request-header')

router.get('/', (req, res, next) => {
    const options = {
        url: 'http://www.kuwo.cn/api/www/bang/bang/bangMenu?',
        headers: Object.assign(requestHeader, {
            Referer: 'http://www.kuwo.cn/',
        }, {})
    }
    request(options, (err, response, body) => {
        if (!err) {
            res.send(JSON.parse(body))
        } else {
            res.sendResult(null, 500, '請求失敗')
        }
    })
})

// 排行榜音樂
router.get('/musicList', (req, res, next) => {
    const {
        bangId = 93,
        pn = 1,
        rn = 30
    } = req.query
    const options = {
        url: `http://www.kuwo.cn/api/www/bang/bang/musicList?bangId=${bangId}&pn=${pn}&rn=${rn}`,
        headers: Object.assign(requestHeader, {
            Referer: 'http://www.kuwo.cn/rankList'
        }, {})
    }
    request(options, (err, response, body) => {
        if (!err) {
            res.send(JSON.parse(body))
        } else {
            res.sendResult(null, 500, '請求失敗')
        }
    })
})

// 推薦榜單 首頁

router.get('/rec_bangList', (req, res, next) => {
    const options = {
        url: 'http://www.kuwo.cn/api/www/bang/index/bangList?',
        headers: Object.assign(requestHeader, {
            Referer: 'http://www.kuwo.cn/rankList',
        }, {})
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