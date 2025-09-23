---
title: Xray onkey
description: Xray onkey
head:
  - - meta
    - name: keywords
      content: Xray onkey
---

### 说明
namesilo 原有的域名到期了, 迁移新域名的时候出了点问题, 这里记录一下, 便于后续重装

### 准备工作
- 安装脚本 https://github.hscsec.cn/wulabing/Xray_onekey
- 安装/更新方式（Xray 前置） 
``` wget -N --no-check-certificate -q -O install.sh "https://raw.githubusercontent.com/wulabing/Xray_onekey/main/install.sh" && chmod +x install.sh && bash install.sh ```

这个脚本仅能用在 CentOS Linux 7 KVM x86_64 , 使用 CentOS 8 会报错
装的是第二个 WebSocket 回落并存模式

### 使用记录

刚装好之后感觉搜索有很大的延迟,  youtube看起来也很卡顿, 想起来要安装BBR 遂找到文档  [Xray BBR教程](https://xtls.github.io/document/level-0/ch07-xray-server.html#_7-7-%E6%9C%8D%E5%8A%A1%E5%99%A8%E4%BC%98%E5%8C%96%E4%B9%8B%E4%B8%80-%E5%BC%80%E5%90%AF-bbr)

主要是下面这两句:
```
4.fq, fq_codel, fq_pie, cake和其他算法哪个好？
一句话：看不懂的话，请保持fq，足够、且不会劣化你的线路

5.锐速、Finalspeed、LotServer 和其他“加速工具”
一句话：不要用这些！把他们丢进历史的垃圾桶吧！
```


所以我就用了 `BBRplus+fq`

脚本顺序: 
- 5. 安装 BBRplus新版内核
- 19. 使用BBRplus+FQ版加速 
- 21. 系统配置优化

现在youtube 能看4K 视频了, 看起来并不卡, google搜索也比之前快了不少; 不确定是装了加速内核还是启用了系统优化 