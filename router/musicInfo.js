const express = require('express')
const router = express.Router()
const request = require('request')

const requestHeader = require('../utils/request-header')

router.get(`/`, (req, res, next) => {
	let { mid } = req.query
	if (!mid) {
		return res.sendResult(null, 500, '参数错误')
	}
	let options = {
		url: `http://www.kuwo.cn/api/www/music/musicInfo?mid=${mid}`,
		headers: requestHeader,
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
