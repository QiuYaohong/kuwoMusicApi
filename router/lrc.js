const express = require('express')
const router = express.Router()
const request = require('request')

const requestHeader = require('../util/request-header')

router.get(`/`, (req, res, next) => {

    let {
        musicId
    } = req.query

    if (!musicId) {
        return res.send({
            result: 500,
            msg: '参数错误'
        })
    }
    let options = {
        url: `http://m.kuwo.cn/newh5/singles/songinfoandlrc?musicId=${musicId}`,
        headers: requestHeader

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