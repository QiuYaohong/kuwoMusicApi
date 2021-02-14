const express = require('express')
const router = express.Router()
const request = require('request')
const requestHeader = require('../utils/request-header')
// 默认歌单
router.get(`/`, (req, res, next) => {
    const {
        order = 'new',// 默认 new = 最新 hot = 最热
        rn = 30,
        pn = 1
    } = req.query
    const options = {
        url: `http://www.kuwo.cn/api/pc/classify/playlist/getRcmPlayList?pn=${pn}&rn=${rn}&order=${order}`,
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

// 歌单分类
router.get('/category', (req, res, next) => {
    const {
        pn = 1,
        rn = 30,
        id
    } = req.query
    const options = {
        url: `http://www.kuwo.cn/api/pc/classify/playlist/getTagPlayList?pn=${pn}&rn=${rn}&id=${id}`,
        headers: Object.assign(requestHeader, {
            Referer: 'http://www.kuwo.cn/playlists'
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



module.exports = router;