---
title: Opencv
description: Opencv和yolo8n检测
head:
  - - meta
    - name: keywords
      content: Opencv 人体检测 yolo8n
---

### yolo检测
~ 给树莓派装上摄像头之后, 就想着能不能用来检测人体然后跟随, 找了资料了解了一下, 使用yolo对象检测, 后面发现了一个开源库[supervision](https://github.com/roboflow/supervision) 看视频演示很强而且很多的api都已经封装好了直接就可以调用

### 探索
~ 刚开始是想要直接全部都在树莓派上完成, `yolo8n` 我在Mac上跑完一张图是Cpu大概是20ms GPU 在8ms左右, 但是在树莓派上一张图要3秒 🐢太慢了, 那就分离把 树莓派承担拍照+上传, 然后准备一台机器专门处理yolo检测, 台式机是40hx用cuda仅需要5ms左右非常快 nice! 

~ 在台式机上面部署服务端, 就想着那个快就用那个吧, 反正丢个几帧无所谓按照GPT的提示就用了 UDP 传输协议, 第一次接触UDP 帧数据太大一次传不完要分包传输, 之后在服务端合并, 还有upd传输的消息响应会阻塞程序, 没法办实时性, 然后就采用 帧数据 和消息数据分开传输 另外启动一个端口用udp传输消息😅  

~ 插电之后能正常识别, 装起来的时候仅能运行一分钟不到, 充电宝可能是因为功耗太大导致充电宝自动断电了, 树莓派是充电宝供电, 只好降低传输频次, 限制 1秒传输1帧, 看起来是有点卡顿, 能够正常识别左右,  前后判断目前使用超声波模块 根据前面的距离如果距离小就后退, 太大就前进,但是这个好像很不准 动不动就抽风一下 