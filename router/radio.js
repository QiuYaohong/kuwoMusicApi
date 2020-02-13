const express = require('express')
const router = express.Router()
const request = require('request')

const requestHeader = require('../util/request-header')

router.get('/', (req, res, next) => {
    let options = {
        url: 'http://www.kuwo.cn/api/www/radio/index/radioList?',
        headers: Object.assign(requestHeader, {
            Referer: 'http://www.kuwo.cn/rankList'
        }, {})
    }
    request(options, (err, response, body) => {
        if (!err) {
            res.send(JSON.parse(body))
        } else {
            res.send({
                code: 500,
                msg: '請求失敗'
            })
        }

    })
})



module.exports = router