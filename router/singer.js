const express = require('express')
const router = express.Router()
const request = require('request')
const requestHeader = require('../utils/request-header')

router.get(`/`, (req, res, next) => {

    const {
        category = 0,  // 分类  0 = 全部 1 = 华语男 2 = 华语女 3 = 华语组合 4 = 日韩男 5 = 日韩女 6 = 日韩组合 7 = 欧美男 8 = 欧美女  9 = 欧美组合  10 = 其他
        rn = 100,  // 默认 每页数据
        pn = 1,  // 分页
        prefix,  // A ~ Z  分类
    } = req.query

    let options = {

    }

    if (prefix) {
        options = {
            url: `http://www.kuwo.cn/api/www/artist/artistInfo?category=${category}&pn=${pn}&rn=${rn}&prefix=${prefix}`,
            headers: Object.assign(requestHeader, {
                Referer: ' http://www.kuwo.cn/singers'
            }, {})
        }
    } else {
        options = {
            url: `http://www.kuwo.cn/api/www/artist/artistInfo?category=${category}&pn=${pn}&rn=${rn}`,
            headers: requestHeader
        }
    }


    request(options, (err, response, body) => {
        if (!err) {
            res.send(JSON.parse(body))
        } else {
            res.sendResult(null, 500, '請求失敗')
        }
    })

})

// 歌手單曲
router.get('/music', (req, res, next) => {
    const {
        artistid,
        rn = 30,
        pn = 1
    } = req.query

    if (!artistid) {
        return res.sendResult(null, 500, '参数错误')
    }
    const options = {
        url: `http://www.kuwo.cn/api/www/artist/artistMusic?artistid=${artistid}&rn=${rn}&pn=${pn}`,
        headers: Object.assign(requestHeader, {
            Referer: 'http://www.kuwo.cn/singer_detail/' + encodeURIComponent(artistid)
        })
    }

    request(options, (err, response, body) => {
        if (!err) {
            res.send(JSON.parse(body))
        } else {
            res.sendResult(null, 500, '請求失敗')
        }
    })
})

// 歌手專輯
router.get('/album', (req, res, next) => {
    const {
        artistid,
        rn = 30,
        pn = 1
    } = req.query

    if (!artistid) {
        return res.sendResult(null, 500, '参数错误')
    }
    const options = {
        url: `http://www.kuwo.cn/api/www/artist/artistAlbum?artistid=${artistid}&rn=${rn}&pn=${pn}`,
        headers: Object.assign(requestHeader, {
            Referer: 'http://www.kuwo.cn/singer_detail/' + encodeURIComponent(artistid) + '/album'
        })
    }
    request(options, (err, response, body) => {
        if (!err) {
            res.send(JSON.parse(body))
        } else {
            res.sendResult(null, 500, '請求失敗')
        }
    })
})

// 歌手mv
router.get('/mv', (req, res, next) => {
    const {
        artistid,
        rn = 30,
        pn = 1
    } = req.query

    if (!artistid) {
        return res.sendResult(null, 500, '参数错误')
    }
    const options = {
        url: `http://www.kuwo.cn/api/www/artist/artistMv?artistid=${artistid}&rn=${rn}&pn=${pn}`,
        headers: Object.assign(headers, {
            Referer: 'http://www.kuwo.cn/singer_detail/' + encodeURIComponent(artistid) + '/mv'
        })
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