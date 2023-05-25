---
title: JS工具人
---

## 对象数组根据唯一 ID 去重

```js
// 这个真的快的一塌糊涂 比二重循环快多了
function uniarr(arr = [], field = '') {
  const map = new Map();
  return arr.filter((item) => !map.has(item[field]) && map.set(item[field], 0));
}
```

## 进制转换

## 16 进制 unicode 转字符串

## 字符串转 16 进制字符串

## 小程序连接 NFC

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
