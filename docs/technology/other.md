---
title: 其他
---

## 前言

- MacBook Air (M1, 2020) 12.5 macos Monterey
- 搜狗输入法 v6.6.0.13588
- python版本 Python 3.8.9

之前用的输入法一直用搜狗, 最近切换到了 [鼠须管](https://github.com/rime/squirrel) , 想把搜狗的词库给 "鼠须管" 
无奈搜狗导出的备份词库是加密后的bin文件

找到一个强大的转换库:  [Sogou-User-Dict-Converter](https://github.com/h4x3rotab/Sogou-User-Dict-Converter) 可以将搜狗词库转换称明文字典

执行 ``` python3 parse.py <input-bin-dict> <output-tsv> ```

原作的代码输出的字典于鼠须管内其他的字典有些许出入, 只需要修改两行就能输出鼠须管格式相同的字典

参见 [修改代码](https://github.com/wangz-code/Sogou-User-Dict-Converter/commit/aee2f17f98f183840fb21d45ade85d9638c3937f)

转换完毕之后复制内容粘贴到 xxx.yaml 文件中 比如我的就叫做 `luna_pinyin.sougou.dict.yaml`, 丢到鼠须管 `用户设定` 目录下

在目录中找到 `luna_pinyin.extended.dict.yaml` 文件, 找到 `import_tables` 下增加一行 `- luna_pinyin.sougou`  
保存之后执行下 `重新部署` 欢快的使用吧! 

