---
title: 远程开机Ubuntu
description: 使用wol或etherwake远程唤醒Ubuntu
head:
    - - meta
      - name: keywords
        content: 远程唤醒Ubuntu 远程开机 wol etherwake 网卡唤醒
---

### Ubuntu 远程唤醒

~ 家里有一台 PC, 有些时候想要跑软件, 整天开机空载也比较费电, 一般比较新的主板都支持网卡唤醒, 然后就了解到了 wol 和 etherwake, 系统是乌班图, 唤醒端是 openwrt, 大致原理就是 往主机发送幻数据包激活主机

### 准备

- 乌班图系统
- 主板支持网卡唤醒(精粤的默认开启了, 没开启需要在 bios 中启用)
- Openwrt 路由器


### 操作步骤

- 乌班图系统内

```bash
# 安装ethtool
sudo apt-get install ethtool

# 查询本机网卡设备 找到  UP mode
ip link show

# 永久启用 WOL
sudo nano /etc/netplan/01-netcfg.yaml

# 黏贴
network:
  version: 2
  ethernets:
    enp4s0:
      dhcp4: true
      wakeonlan: true  # 确保有这一行

# 如果提示权限过松, 未提示可以省略
sudo chmod 600 /etc/netplan/*.yaml

# 应用配置
sudo netplan apply

# 睡眠可能无法唤醒, 最好是shutdown之后在唤醒
```

- Openwrt

```bash
# 安装 etherwake
opkg update
opkg install etherwake

# 唤醒设备  br-lan 是设备所在的接口, 1D:1D:1D:1D:D1:1D 是设备的mac地址
etherwake -i br-lan 1D:1D:1D:1D:D1:1D
```
