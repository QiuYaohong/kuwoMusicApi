const express = require('express')
const router = express.Router()
const request = require('request')
const requestHeader = require('../utils/request-header')

router.get('/', (req, res, next) => {
    const {
        category = 11,   //  11 華語  13 歐美  12 日韓 16 組合
        rn = 6,  // 默认 每页数据
        pn = 1,  // 分页
    } = req.query

    const options = {
        url: `http://www.kuwo.cn/api/www/artist/artistInfo?category=${category}&pn=${pn}&rn=${rn}`,
        headers: Object.assign(requestHeader, {
            Referer: 'http://www.kuwo.cn/'
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