---
title: JS工具人
---
# JS工具人
---

## 对象数组根据唯一 ID 去重

```js
// 这个真的快的一塌糊涂 比二重循环快多了
function uniarr(arr = [], field = '') {
  const map = new Map();
  return arr.filter(item => !map.has(item[field]) && map.set(item[field], 0));
}
```
