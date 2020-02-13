const express = require('express')
const router = express.Router()
const request = require('request')

const requestHeader = require('../util/request-header')

// 推薦歌單

router.get('/', (req, res, next) => {
    let {
        id = 'rec',
        rn = 1,
        pn = 5
    } = req.query

    let options = {
        url: `http://www.kuwo.cn/api/www/rcm/index/playlist?id=${id}&pn=${pn}&rn=${rn}&reqId=bbcd49e0-4c96-11ea-a132-d31e6f025e81`,
        headers: Object.assign(requestHeader, {
            Referer: 'http://www.kuwo.cn/'
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