---
title: 爬虫
---

## 前言

用 nodejs 写一些爬虫, cheerio 库很强大, 非常好用, 解析 HTML 很方便

## 我不是盐神

https://onehu.xyz/about 这个是偶然发现的一个站点 , 站长好像收集了不少需要知乎会员才能看的文章, 我是经常上班摸鱼在知乎上面, 遂想把内容爬下来导入到听书 APP 里

> 注意 切勿频繁密集请求, 导致站点流量猛增, 做人留一线日后好相见! 我是 3~9 秒随机休眠, 基本和人差不多了

### 准备程序
```js
const fs = require('fs');
const request = require('request');
const cheerio = require('cheerio');
const { random, replaceStr } = require('./utils/utils');
const md5 = require('md5');

const baseUrl = 'https://onehu.xyz';
const dirPath = {
  indexPath: './index.json',
  list: './list.json',
  log: './log.txt',
};

const log = [];
let listJSON = {};

// 写入本地数据, 错误或者数据多的时候写入本地
const writeData = (path = '', data = {}) => {
  try {
    fs.writeFileSync(path, JSON.stringify(data));
    console.log('写入完毕 log==>');
  } catch (error) {
    console.log('失败URL log==>', path);
    console.log('写入失败 log==>', error);
  }
};

// 列表请求
const decryList = (url) => {
  return new Promise((resolve, reject) => {
    request(url, { json: true }, (err, res) => {
      if (err) reject(err);
      const result = res.toJSON();
      if (result.statusCode != 200) reject(res.body);
      resolve(result.body);
    });
  });
};
// 延迟请求
let dely = { min: 3000, max: 9000 };

// 查询列表
const queryList = async (url) => {
  // 检查本地缓存
  if (!listJSON.hasOwnProperty('values')) {
    try {
      const list = fs.readFileSync(dirPath.list, 'utf8');
      listJSON = JSON.parse(list);
      listJSON.begin.md5 = md5(listJSON.begin.href);
      url = listJSON.begin.href;
    } catch (error) {
      console.log('缓存读取失败', error);
    }
  }

  const currData = listJSON.values[md5(url)];
  if (currData && currData.next) {
    console.log('已存在 跳过 log==>', currData.next);
    queryList(currData.next);
    return;
  }

  try {
    const html = await decryList(url);
    const $ = cheerio.load(html);
    const nextAttr = $('.post-next a').attr();
    const tittle = $('#board h1').text();
    const text = $('#board .markdown-body').text();
    console.log('text log==>', text.length);
    const key = md5(url);
    listJSON.values[key] = {
      tittle: tittle,
      href: url,
      context: replaceStr(text),
    };

    if (Object.values(listJSON.values).length % 10 == 0)
      writeData(dirPath.list, listJSON); // 每间隔10条 缓存当前数据
    if (!nextAttr.href) {
      console.log('没有更多了  存储 log==>');
      writeData(dirPath.list, listJSON); // 缓存当前数据
      return;
    } else {
      console.log('发现下一页 log==>', nextAttr.href);
      const nextHref = baseUrl + nextAttr.href;
      listJSON.values[key].next = nextHref;
      setTimeout(queryList.bind(null, nextHref), random(dely.min, dely.max));
    }
  } catch (error) {
    console.log('error log==>', error);
    log.push({
      url,
      err: error,
      type: '请求错误',
    });
    writeData(dirPath.list, listJSON); // 缓存当前数据
    writeData(dirPath.log, log); /// 写入日志
  }
};
queryList();
```

### 后续处理
```js

try {
	const list = fs.readFileSync("./list.json", "utf8");
	const listJSON = JSON.parse(list);
	let text = "";
	for (const item of Object.values(listJSON.values)) {
		console.log("item.tittle log==>", item.tittle);
		text += `${item.tittle} \n ${item.context} \n`;
	}
	fs.writeFileSync("./info.txt", text);
} catch (error) {
	console.log("缓存读取失败", error);
}


```
