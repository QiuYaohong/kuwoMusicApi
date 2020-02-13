const express = require('express')
const router = express.Router()
const request = require('request')

const requestHeader = require('../util/request-header')

router.get(`/`, (req, res, next) => {

    let {
        rid
    } = req.query

    if (!rid) {
        return res.send({
            result: 500,
            msg: '参数错误'
        })
    }
    let options = {
        url: `http://www.kuwo.cn/url?rid=${rid}&response=url&format=mp4%7Cmkv&type=convert_url&t=1581339481689`,
        headers: Object.assign(requestHeader, {
            Referer: 'http://www.kuwo.cn/mvs'
        }, {})

    }

    request(options, (err, response, body) => {
        if (!err) {
            let obj = {
                code: 'ok',
                url: body,
                curTime: new Date().getTime(),
                msg: 'success'
            }
            res.send(obj)
        } else {
            res.send({
                code: 500,
                msg: '請求失敗'
            })
        }

    })

})


module.exports = router;