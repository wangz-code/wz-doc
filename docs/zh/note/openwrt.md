---
title: Openwrt配置
description: Openwrt安全相关,配置防火墙,密钥登录,端口转发,动态IP和DDNS
head:
  - - meta
    - name: keywords
      content: Openwrt 配置防火墙 密钥登录 端口转发 动态IP和DDNS
---
### 远程访问家里的机器

- 宽带猫必须要桥接使用路由器拨号
- 需要一个域名,方便动态ip变更的时候自动更新dns解析
- 路由器要能运行脚本或软路由运行程序, 每次开机的时候检查一下即可检查域名解析ip和当前的ip是否相等
- 编辑路由器防火墙端口转发openwrt 端口转发到内网的端口
- 限制ssh登录ip 使用密钥登录
