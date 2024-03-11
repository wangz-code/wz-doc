# wz-doc

基于dumi 的博客 配置内开启了 SSR
## 版本信息

这是一个示例 [DEMO](https://djgo.cc/)。

![图片](https://github.com/WangSunio/img/blob/main/images/blog-demo.png?raw=true)

```bash
dumi v2.1.24
umi@4.0.68


```


## 开发

```bash
# install dependencies
$ npm install

# 开发
$ npm run dev

# 打包
$ npm run build


# 部署
nohup node ./wzdoc.js &
# bun部署
bun run wzdoc.js 

# pm2 部署(守护进程,自动重启) node 和bun 总是三天两头挂逼
npm install pm2 -g
pm2 start wzdoc.js
```

## LICENSE

MIT
