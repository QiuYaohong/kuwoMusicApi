const express = require("express")
const router = express.Router()
const request = require("request")
const requestHeader = require("../utils/request-header")

// 热门评论  == get_rec_comment
// 最新评论 == get_comment

// digest = 15      15 歌曲   2  排行榜  8 歌单评论  7  mv评论

router.get(`/`, (req, res, next) => {
  let {
    sid,
    page = 1,
    rows = 30,
    uid = 0,
    type = "get_rec_comment",
    digest = 15, // 15 歌曲   2  排行榜   7  mv评论 mvplay
  } = req.query

  if (!sid) {
    return res.sendResult(null, 500, "参数错误")
  }

  const options = {
    url: `http://www.kuwo.cn/comment?type=${type}&f=web&page=${page}&rows=${rows}&digest=${digest}&sid=${sid}&uid=${uid}&prod=newWeb`,
  }

  // 歌曲
  if (digest == 15) {
    options: Object.assign(options, {
      headers: Object.assign(
        requestHeader,
        {
          Referer: "http://www.kuwo.cn/play_detail/" + encodeURIComponent(sid),
        },
        {}
      ),
    })
  }

  // mv
  if (digest == 7) {
    options: Object.assign(options, {
      headers: Object.assign(
        requestHeader,
        {
          Referer: "http://www.kuwo.cn/mvplay/" + encodeURIComponent(sid),
        },
        {}
      ),
    })
  }
  // 歌单

  if (digest === 8) {
    options: Object.assign(options, {
      headers: Object.assign(
        requestHeader,
        {
          Referer:
            "http://www.kuwo.cn/playlist_detail/" + encodeURIComponent(sid),
        },
        {}
      ),
    })
  }

  // 排行榜

  if (digest === 2) {
    options: Object.assign(options, {
      headers: Object.assign(
        requestHeader,
        {
          Referer: "http://www.kuwo.cn/rankList",
        },
        {}
      ),
    })
  }
  request(options, (err, response, body) => {
    if (!err) {
      res.send(JSON.parse(body))
    } else {
      res.sendResult(null, 500, "請求失敗")
    }
  })
})

module.exports = router
