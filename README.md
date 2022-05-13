# 酷我音樂API
### Development

## 安装
```bash
$ git clone https://github.com/QiuYaohong/kuwoMusicApi.git
$ npm i
$ npm run dev
```

## 环境要求

- Node.js 8.x
- Typescript 2.8+


## 使用文档

- 项目启动后 默认本地服务为 http://127.0.0.1:7002
- 接口完整地址 为 本地服务地址 + 接口地址
  ![](https://user-images.githubusercontent.com/51219225/140633174-8e25f1dd-7581-480c-af3b-99f8144c20e9.png)
- 例如歌曲播放链接: http://127.0.0.1:7002/kuwo/url?mid=162457325&type=music

[接口文档地址](https://qiuyaohong.github.io/kuwoMusicApi/) 



## 部署

```shell

  npm run ci  # 将ts转化为js, 在服务器里面运行之前，需要将ts都转换为js，这样才能正常运行

  npm run start # 启动服务

  npm run stop  # 停止服务

```