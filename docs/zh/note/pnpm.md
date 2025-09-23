---
title: pnpm
description: pnpm 无法使用代理
---

### pnpm 死活不走代理非常难受, 即便让终端走代理pnpm 依然不走

解决方案需要在.npmrc 文件中配置 https-proxy 才行, 之前一直用的npmmirror镜像 我哭死
```sh
# registry = "https://registry.npmmirror.com"
https-proxy = "http://127.0.0.1:10801"
registry = https://registry.npmjs.org/


```

