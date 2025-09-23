---
title: 组装台式机
toc: content
order: 1
description: 折腾日记 40hx显卡stable-diffusion绘图
keywords: ['折腾日记', '40hx显卡', 'stable-diffusion绘图']
---

### 装机

最近搞了一张 CMP 40HX 显卡, 纯纯的大矿卡, 收到货之后看了下还挺新, 看评测说好像介于 2060 和 2060S 之间, 370 的价格拼多多购入
到家后立马就安排了一波清灰, 贴上了 9 块 9 买的霍尼韦尔相变片
中间虽然有点困难,万幸都已经解决了;

### 问题

- 精粤 B760M snow dream 内存频率的问题, 听说精粤主板对金百达长鑫颗粒兼容问题, 我误打误撞没遇到
- win 下 xray 代理工具不能获取域名仅能读到 IP (这个问题截止目前没找到解决办法)
- 40hx 驱动问题, 这个屌卡没有显示输出接口,听说是在核心上被砍了, 其次是半精度被砍了(绘画会用到)

### 问题解决

- 精粤主板需要进入 bios 中配置内存的倍频 才能运行在 3200HZ(默认是 2666)
- address 在 win 下不能填写 iP, 填写域名一切就能正常了,router 内也能通过域名进行分流了
- 40hx 绘画需要增加 `--no-half --precision full` 启动参数, 方能正常使用 GPU

### 总结

- 感谢 P106 吧内 无悔大佬的最新[魔改驱动](https://www.aliyundrive.com/s/LXKQfxTX4Ra/folder/617e7c79610c9bf9b78a4072952e02fb3289ce4e)
- 研究了 stable-diffusion 使用 40hx 绘图, 感谢 [stable-diffusion-webui](https://github.com/AUTOMATIC1111/stable-diffusion-webui/pull/12710) 作者给予的帮助

画出来的一些小护士 https://www.zhihu.com/column/c_1677056298045358080

<img src="/images/40hx.jpg" style="transform: rotate(-90deg);width:200px;margin-left:120px">
