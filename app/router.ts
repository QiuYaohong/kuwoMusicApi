import { Application } from 'egg'

export default (app: Application) => {
  const { controller, router } = app
  // 轮播图
  router.get('/kuwo/banner', controller.banner.index)
  // 评论
  router.get('/kuwo/comment', controller.comment.index)
  // 歌词
  router.get('/kuwo/lrc', controller.lrc.index)
  // 音乐信息
  router.get('/kuwo/musicInfo', controller.musicInfo.index)
  // 歌单音乐
  router.get('/kuwo/musicList', controller.musicList.index)
  // 音乐播放地址
  router.get('/kuwo/url', controller.playUrl.index)
  // 获取 mv 播放地址
  router.get('/kuwo/mv_url', controller.mv.getMvUrl)
  // 获取电台列表
  router.get('/kuwo/radio', controller.radio.index)
  // 获取歌手信息
  router.get('/kuwo/singer', controller.singer.getArtistInfo)
  // 获取歌手单曲
  router.get('/kuwo/singer/music', controller.singer.getArtistMusic)
  // 获取歌手专辑
  router.get('/kuwo/singer/album', controller.singer.getArtistAlbum)
  // 获取歌手mv
  router.get('/kuwo/singer/mv', controller.singer.getArtistMv)
  // 排行榜
  router.get('/kuwo/rank', controller.rank.index)
  // 排行榜音乐
  router.get('/kuwo/rank/musicList', controller.rank.rankMusicList)
  // 推荐榜单
  router.get('/kuwo/rank/rec_bangList', controller.rank.rankRecBangList)
  // 推荐歌单
  router.get('/kuwo/rec_gedan', controller.recGedan.index)
  // 推荐歌手
  router.get('/kuwo/rec_singer', controller.recSinger.index)
  // 歌单分类
  router.get('/kuwo/getTagList', controller.getTagList.index)
  // 默认歌单
  router.get('/kuwo/playList', controller.playList.index)
  // 专辑歌单
  router.get('/kuwo/albumInfo', controller.albumInfo.index)
  // 歌单分类
  router.get('/kuwo/playList/getTagPlayList', controller.playList.getTagPlayList)
  // 关键字搜索
  router.get('/kuwo/search/searchKey', controller.search.searchKey)
  // 单曲搜索
  router.get('/kuwo/search/searchMusicBykeyWord', controller.search.searchMusicBykeyWord)
  // 专辑搜索
  router.get('/kuwo/search/searchAlbumBykeyWord', controller.search.searchAlbumBykeyWord)
  // mv 搜索
  router.get('/kuwo/search/searchMvBykeyWord', controller.search.searchMvBykeyWord)
  // 歌单搜索
  router.get('/kuwo/search/searchPlayListBykeyWord', controller.search.searchPlayListBykeyWord)
  // 歌手搜索
  router.get('/kuwo/search/searchArtistBykeyWord', controller.search.searchArtistBykeyWord)
}
