const express = require('express')
const router = express.Router()
const request = require('request')

const requestHeader = require('../util/request-header')

router.get(`/`, (req, res, next) => {
 
    let {
        rid   // 28015050
    } = req.query

    if (!rid) {
        return res.send({
            result: 500,
            msg: '参数错误'
        })
    }
    let options = {
        url: `http://www.kuwo.cn/url?&rid=${rid}&response=url&type=convert_url3&br=128kmp3&from=web&t=${new Date().getTime()}`,
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