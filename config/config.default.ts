import { EggAppConfig, EggAppInfo, PowerPartial } from 'egg'
const path = require('path')
const fs = require('fs')

export default (appInfo: EggAppInfo) => {
  const config = {} as PowerPartial<EggAppConfig>

  // override config from framework / plugin
  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1618050800795_6113'

  // add your egg config in here
  config.middleware = []

  // add your special config in here
  const bizConfig = {
    sourceUrl: `https://github.com/eggjs/examples/tree/master/${appInfo.name}`,
    headers: {
      /**
       * _ga=GA1.2.675600123.1604474404; gid=1c56e740-1027-41a2-bbd5-40c0372f1af8; JSESSIONID=1wc56uuw4qocl1jef6lxbdm7gq; uname3=%u90B1%u8000%u6D2A; t3kwid=485455771; userid=485455771; websid=155282790;
       * pic3="http://thirdwx.qlogo.cn/mmopen/vi_32/DYAIOgq83eqNeken3rBYSfXTn2Nq6uOm8aumOqIqsj7ibvM3bx9ibUmTp644d0hO4qftyS3iabA48AUzMdqauqaHQ/132";
       * t3=weixin; Hm_lvt_cdb524f42f0ce19b169a8071123a4797=1622942674,1623162158,1623249078,1623338422; Hm_lpvt_cdb524f42f0ce19b169a8071123a4797=1623338422;
       *  _gid=GA1.2.85752388.1623338422; kw_token=9ACQW0P7QIP; _gat=1
       */
      Cookie: 'Hm_lvt_cdb524f42f0ce19b169a8071123a4797=1623339177,1623339183; _ga=GA1.2.1195980605.1579367081; Hm_lpvt_cdb524f42f0ce19b169a8071123a4797=1623339982; kw_token=3E7JFQ7MRPL; _gid=GA1.2.747985028.1623339179; _gat=1',
      csrf: '3E7JFQ7MRPL',
      Host: 'www.kuwo.cn',
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.77 Safari/537.36',
    },
  }

  config.security = {
    csrf: {
      enable: false,
    },
    domainWhiteList: ['*'],
  }

  // 跨域支持
  config.cors = {
    origin: '*',
    allowMethods: 'GET,HEAD,PUT,POST,DELETE,PATCH,OPTIONS',
  }
  // 端口
  config.cluster = {
    listen: {
      path: '',
      port: 7002,
      hostname: '127.0.0.1',
    },
  }

  config.siteFile = {
    '/': fs.readFileSync(path.join(appInfo.baseDir, 'app/public/index.html')),
  }

  // the return config will combines to EggAppConfig
  return {
    ...config,
    ...bizConfig,
  }
}
