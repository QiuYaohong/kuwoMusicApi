const express = require('express')
const router = express.Router()
const request = require('request')

const requestHeader = require('../util/request-header')




router.get(`/`, (req, res, next) => {

    let {
        pid = '',// 默认 new = 最新 hot = 最热
        rn = 30,
        pn = 1
    } = req.query

    let options = {
        url: `http://www.kuwo.cn/api/www/playlist/playListInfo?pid=${pid}&pn=${pn}&rn=${rn}`,
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









module.exports = router;