// This file is created by egg-ts-helper@1.25.9
// Do not modify this file!!!!!!!!!

import 'egg';
type AnyClass = new (...args: any[]) => any;
type AnyFunc<T = any> = (...args: any[]) => T;
type CanExportFunc = AnyFunc<Promise<any>> | AnyFunc<IterableIterator<any>>;
type AutoInstanceType<T, U = T extends CanExportFunc ? T : T extends AnyFunc ? ReturnType<T> : T> = U extends AnyClass ? InstanceType<U> : U;
import ExportBanner from '../../../app/service/banner';
import ExportBaseService from '../../../app/service/BaseService';
import ExportComment from '../../../app/service/comment';
import ExportGetTagList from '../../../app/service/getTagList';
import ExportLrc from '../../../app/service/lrc';
import ExportMusicInfo from '../../../app/service/musicInfo';
import ExportMusicList from '../../../app/service/musicList';
import ExportMv from '../../../app/service/mv';
import ExportPlayList from '../../../app/service/playList';
import ExportPlayUrl from '../../../app/service/playUrl';
import ExportRadio from '../../../app/service/radio';
import ExportRank from '../../../app/service/rank';
import ExportRecGedan from '../../../app/service/recGedan';
import ExportRecSinger from '../../../app/service/recSinger';
import ExportSearch from '../../../app/service/search';
import ExportSinger from '../../../app/service/singer';

declare module 'egg' {
  interface IService {
    banner: AutoInstanceType<typeof ExportBanner>;
    baseService: AutoInstanceType<typeof ExportBaseService>;
    comment: AutoInstanceType<typeof ExportComment>;
    getTagList: AutoInstanceType<typeof ExportGetTagList>;
    lrc: AutoInstanceType<typeof ExportLrc>;
    musicInfo: AutoInstanceType<typeof ExportMusicInfo>;
    musicList: AutoInstanceType<typeof ExportMusicList>;
    mv: AutoInstanceType<typeof ExportMv>;
    playList: AutoInstanceType<typeof ExportPlayList>;
    playUrl: AutoInstanceType<typeof ExportPlayUrl>;
    radio: AutoInstanceType<typeof ExportRadio>;
    rank: AutoInstanceType<typeof ExportRank>;
    recGedan: AutoInstanceType<typeof ExportRecGedan>;
    recSinger: AutoInstanceType<typeof ExportRecSinger>;
    search: AutoInstanceType<typeof ExportSearch>;
    singer: AutoInstanceType<typeof ExportSinger>;
  }
}
