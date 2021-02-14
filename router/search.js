const express = require('express')
const router = express.Router()
const request = require('request')

const requestHeader = require('../utils/request-header')

// 搜索提示

router.get(`/searchKey`, (req, res, next) => {
    const {
        key
    } = req.query
    const options = {
        url: 'http://www.kuwo.cn/api/www/search/searchKey?key=' + encodeURIComponent(key),
        headers: Object.assign(requestHeader, {
            Referer: 'http://www.kuwo.cn/search/playlist?key=' + encodeURIComponent(key),
        }, {})
    }
    request(options, (err, response, body) => {
        if (!err) {
            res.json(JSON.parse(body))
        } else {
            res.sendResult(null, 500, '請求失敗')
        }
    })
})
// 单曲
router.get(`/searchMusicBykeyWord`, (req, res, next) => {
    const {
        key,
        pn = 1,
        rn = 30
    } = req.query
    const options = {
        url: `http://www.kuwo.cn/api/www/search/searchMusicBykeyWord?pn=${pn}&rn=${rn}&key=` + encodeURIComponent(key),
        headers: Object.assign(requestHeader, {
            Referer: 'http://www.kuwo.cn/search/list?key=' + encodeURIComponent(key)
        }, {})
    }
    request(options, (err, response, body) => {
        if (!err) {
            res.json(JSON.parse(body))
        } else {
            res.sendResult(null, 500, '請求失敗')
        }
    })
})
// 专辑
router.get(`/searchAlbumBykeyWord`, (req, res, next) => {

    const {
        key,
        pn = 1,
        rn = 30
    } = req.query

    const options = {
        url: `http://www.kuwo.cn/api/www/search/searchAlbumBykeyWord?pn=${pn}&rn=${rn}&key=` + encodeURIComponent(key),
        headers: Object.assign(requestHeader, {
            Referer: 'http://www.kuwo.cn/search/album?key=' + encodeURIComponent(key)
        }, {})
    }
    request(options, (err, response, body) => {
        if (!err) {
            res.json(JSON.parse(body))
        } else {
            res.sendResult(null, 500, '請求失敗')
        }
    })
})
// mv
router.get(`/searchMvBykeyWord`, (req, res, next) => {

    const {
        key,
        pn = 1,
        rn = 30
    } = req.query

    const options = {
        url: `http://www.kuwo.cn/api/www/search/searchMvBykeyWord?pn=${pn}&rn=${rn}&key=` + encodeURIComponent(key),
        headers: Object.assign(requestHeader, {
            Referer: 'http://www.kuwo.cn/search/mv?key=' + encodeURIComponent(key)
        }, {})
    }

    request(options, (err, response, body) => {
        if (!err) {
            res.json(JSON.parse(body))
        } else {
            res.sendResult(null, 500, '請求失敗')
        }
    })
})
// 歌单
router.get(`/searchPlayListBykeyWord`, (req, res, next) => {
    const {
        key,
        pn = 1,
        rn = 30
    } = req.query

    const options = {
        url: `http://www.kuwo.cn/api/www/search/searchPlayListBykeyWord?pn=${pn}&rn=${rn}&key=` + encodeURIComponent(key),
        headers: Object.assign(requestHeader, {
            Referer: 'http://www.kuwo.cn/search/playlist?key=' + encodeURIComponent(key)
        }, {})
    }
    request(options, (err, response, body) => {
        if (!err) {
            res.json(JSON.parse(body))
        } else {
            res.sendResult(null, 500, '請求失敗')
        }
    })
})
// 歌手
router.get(`/searchArtistBykeyWord`, (req, res, next) => {
    const {
        key,
        pn = 1,
        rn = 30
    } = req.query
    const options = {
        url: `http://www.kuwo.cn/api/www/search/searchArtistBykeyWord?pn=${pn}&rn=${rn}&key=` + encodeURIComponent(key),
        headers: Object.assign(requestHeader, {
            Referer: 'http://www.kuwo.cn/search/singers?key=' + encodeURI(key)
        }, {})
    }
    request(options, (err, response, body) => {
        if (!err) {
            res.json(JSON.parse(body))
        } else {
            res.sendResult(null, 500, '請求失敗')
        }
    })
})

module.exports = router