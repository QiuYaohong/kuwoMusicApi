// This file is created by egg-ts-helper@1.25.9
// Do not modify this file!!!!!!!!!

import 'egg';
import ExportBanner from '../../../app/controller/banner';
import ExportBaseController from '../../../app/controller/BaseController';
import ExportComment from '../../../app/controller/comment';
import ExportGetTagList from '../../../app/controller/getTagList';
import ExportLrc from '../../../app/controller/lrc';
import ExportMusicInfo from '../../../app/controller/musicInfo';
import ExportMusicList from '../../../app/controller/musicList';
import ExportMv from '../../../app/controller/mv';
import ExportPlayList from '../../../app/controller/playList';
import ExportPlayUrl from '../../../app/controller/playUrl';
import ExportRadio from '../../../app/controller/radio';
import ExportRank from '../../../app/controller/rank';
import ExportRecGedan from '../../../app/controller/recGedan';
import ExportRecSinger from '../../../app/controller/recSinger';
import ExportSearch from '../../../app/controller/search';
import ExportSinger from '../../../app/controller/singer';

declare module 'egg' {
  interface IController {
    banner: ExportBanner;
    baseController: ExportBaseController;
    comment: ExportComment;
    getTagList: ExportGetTagList;
    lrc: ExportLrc;
    musicInfo: ExportMusicInfo;
    musicList: ExportMusicList;
    mv: ExportMv;
    playList: ExportPlayList;
    playUrl: ExportPlayUrl;
    radio: ExportRadio;
    rank: ExportRank;
    recGedan: ExportRecGedan;
    recSinger: ExportRecSinger;
    search: ExportSearch;
    singer: ExportSinger;
  }
}
