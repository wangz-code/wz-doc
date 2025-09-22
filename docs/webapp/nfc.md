---
title: 小程序 NFC 通讯
---

# 小程序 NFC 通讯

### 前言

最近要用微信小程序的 NFC 读写功能和支持 NFC 协议的卡片通讯, [参见](https://developers.weixin.qq.com/miniprogram/dev/api/device/nfc/wx.getNFCAdapter.html)

`通讯协议`: [参见](https://www.mwahiot.com/Service/mifare_classic_s50_technical_details.html)
`验密`: 根据卡片中存储的 keyA 或 keyB 进行验证, 验证通过后才能操作读写, 每次读写都需要验证密钥
`NFC卡片`: 我这边使用的是 MifareClassic, 这张卡片每次读写都需要`验密`, 有些其他的卡是不用`验密`,操作都是类似, 免密卡更简单
`小程序版本`: 基础库 2.11.2 开始支持，仅支持 Android 平台, ios 不支持

### 差异

标准 NFC 操作: 存在`扇区`和`块` 的概念, 我的这张卡有`16个扇区`, 每个扇区下有`4个块`, 扇区从`1开始`, 块从`0开始`,
小程序操作: 小程序抹去了扇区的概念, 统一使用`块`进行操作, 16 个扇区也就是共有 `16*4 = 64块`, 下标从`0块 ~ 63块`

> `注意!!!` 根据协议 每个扇区的`尾块`记录的是密钥, `[0~5]=keyA`, `[6~9]=访问控制`, ` [11~15]=keyB`
> 比如 `1扇区3块`就是`尾块`(小程序的 3 块), `2扇区3块`也是`尾块`(小程序的 7 块) 由此可以得知每个扇区都可以单独加密
> ![alt 属性文本](/images/lastblock.jpg)

- 1 扇区 0 块 这里记录的是厂商信息,已经固化无法覆写, 只能读取
- 1 扇区 3 块 `尾块` 每个扇区的第 3 块(下标从 0 开始),这里记录的是密钥信息, 就是根据这里的数据进行验密
  小程序的对应的就是 3,7,11 .....63 作为 `尾块`
  `特别要注意这个尾块, 我就是不小心覆写了这个块导致我现有两块扇区都变成了死扇区, 密钥也忘记了是多少 `

### 指令

- `0x60` 验密
- `0x30` 读取数据
- `0xA0` 写入数据

统一格式: `[指令 1字节]`+`[块号 1字节]`+`[内容16字节]`

```js
// 验密指令 0x60
// 每个块的验密要根据块号来  比如你要读写1块 那么验密的块号就是1块 不能验密1块读写7块, 7块要使用7块的验密
const decryCmd = [];
decryCmd[0]:指令 0x60
decryCmd[1]:块号 0x01 对应 10进制的 1 就是1块, 如果要读取63块就是 0x3f
decryCmd[2~17]:内容 填充密钥信息, 一般卡片刚出场是默认是 6个`0xFF` 所以解密指令length = 8

// 读取指令 0x30
const readCmd = [];
readCmd[0]:指令 0x30
readCmd[1]:块号 0x01 对应 10进制的 1 就是1块, 如果要读取63块就是 0x3f
readCmd[2~17]:内容 按照协议标准的[2~3]是CRC 也就是`效验和`  读取的时候没有要求 可以填充0xff


// 写入指令 0xA0
const writeCmd = [];
writeCmd[0]:指令 0xA0
writeCmd[1]:块号 0x01 对应 10进制的 1 就是1块, 如果要读取63块就是 0x3f
writeCmd[2~17]:内容 按照协议标准的[2~3]是CRC 也就是`效验和` 根据内容写入数据, 不足的可以填充0xff或0x00看你自己的喜好

写入成功后建议再读取一次,比较一些写入数据和读取的数据, 验证是否真的写入成功

```

### 小程序连接 NFC

[MifareClassic](https://developers.weixin.qq.com/miniprogram/dev/api/device/nfc/MifareClassic.html) MifareClassic 是加密卡 在读写操作前需要验密
[读写 ndef 数据](https://developers.weixin.qq.com/community/develop/article/doc/00082863aecb98f2778b24a4755c13)

```js
   NFC定义的数据类型需要载荷内容被定义在RTD文档中， NFC论坛具体定义了以下RTD：
  1、NFC 文本RTD(T) ，可携带Unicode字符串。文本记录可包含在NDEF信息中作为另一条记录的描述文本。

  2、NFC URI RTD(U)，可用于存储网站地址，邮件，和电话号码，存储成经过优化的二进制形式

  3、NFC 智能海报RTD(Sp)，用于将URL，短信或电话号码编入NFC论坛标签，及如何在设备间传递这些信息。

  4、NFC 通用控制RTD。

  5、NFC 签名RTD。

  String.fromCharCode(85) // U  网址
  String.fromCharCode(84) // T  文本

```


### 流程

- 使用 wx.getNFCAdapter() 获取 NFC 适配器 ` const NFCAdapter = wx.getNFCAdapter()`
- 根据卡片类型调用对应的实例,所以对应的是 `NFCAdapter.getMifareClassic()` 获取 MifareClassic 实例，这个时候需要处理错误, 检查 NFC 功能是否开启, 是否允许访问 NFC 等等
- 读取操作: 验密=>读取
- 读取操作: 验密=>写入
- 读取操作: 验密=>写入=>读取 这种仅需要验密一次,亲测可行

### 踩坑

锁死了两个扇区 8 个块, 这个卡变得不完美了

### 总结

一定要先读协议再去操作, 关于这方面的文档太少了, 对于初次接触的时候还是有隐患在里面, 一直验密失败我还以为我代码写的有问题, 找了很多资料才知道把密钥给覆写了, 垃圾微信, 文档上多写一句感觉要死了一样!
