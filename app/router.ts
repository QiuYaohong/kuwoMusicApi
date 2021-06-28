import { Application } from 'egg'

export default (app: Application) => {
  const { controller, router } = app
  // 轮播图
  router.get('/banner', controller.banner.index)
  // 评论
  router.get('/comment', controller.comment.index)
  // 歌词
  router.get('/lrc', controller.lrc.index)
  // 音乐信息
  router.get('/musicInfo', controller.musicInfo.index)
  // 歌单音乐
  router.get('/musicList', controller.musicList.index)
  // 音乐播放地址
  router.get('/url', controller.playUrl.index)
  // 获取 mv 播放地址
  router.get('/mv_url', controller.mv.getMvUrl)
  // 获取电台列表
  router.get('/radio', controller.radio.index)
  // 获取歌手信息
  router.get('/singer', controller.singer.getArtistInfo)
  // 获取歌手单曲
  router.get('/singer/music', controller.singer.getArtistMusic)
  // 获取歌手专辑
  router.get('/singer/album', controller.singer.getArtistAlbum)
  // 获取歌手mv
  router.get('/singer/mv', controller.singer.getArtistMv)
  // 排行榜
  router.get('/rank', controller.rank.index)
  // 排行榜音乐
  router.get('/rank/musicList', controller.rank.rankMusicList)
  // 推荐榜单
  router.get('/rank/rec_bangList', controller.rank.rankRecBangList)
  // 推荐歌单
  router.get('/rec_gedan', controller.recGedan.index)
  // 推荐歌手
  router.get('/rec_singer', controller.recSinger.index)
  // 歌单分类
  router.get('/getTagList', controller.getTagList.index)
  // 默认歌单
  router.get('/playList', controller.playList.index)
  // 歌单分类
  router.get('/playList/getTagPlayList', controller.playList.getTagPlayList)
  // 关键字搜索
  router.get('/search/searchKey', controller.search.searchKey)
  // 单曲搜索
  router.get('/search/searchMusicBykeyWord', controller.search.searchMusicBykeyWord)
  // 专辑搜索
  router.get('/search/searchAlbumBykeyWord', controller.search.searchAlbumBykeyWord)
  // mv 搜索
  router.get('/search/searchMvBykeyWord', controller.search.searchMvBykeyWord)
  // 歌单搜索
  router.get('/search/searchPlayListBykeyWord', controller.search.searchPlayListBykeyWord)
  // 歌手搜索
  router.get('/search/searchArtistBykeyWord', controller.search.searchArtistBykeyWord)
}
