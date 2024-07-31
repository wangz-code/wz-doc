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

[参考资料](https://cloud.tencent.com/developer/article/2084531)

### 操作步骤

- 乌班图系统内

```bash
# 安装ethtool
sudo apt-get install ethtool

# 查询网卡是否支持远程唤醒
sudo ethtool enp3s0 | grep Wake-on

# 开启远程唤醒 d为关闭g为开启 , 实际测试这个命令仅生效一次, 每次开机都要执行,否则就会自动关闭(d), 需要开机自动执行
sudo ethtool -s enp3s0 wol g

# 解决重启以后，配置失效问题：
# 执行创建一个服务
sudo vim /etc/systemd/system/wol.service
# 在文件中输入：
[Unit]
Description=Configure Wake On LAN
[Service]
Type=oneshot
ExecStart=/sbin/ethtool -s enp3s0 wol g
[Install]
WantedBy=basic.target

# 然后保存退出 执行命令：
sudo systemctl daemon-reload
sudo systemctl enable wol.service
sudo systemctl start wol.service

```

- Openwrt

```bash
# 安装 etherwake
opkg update
opkg install etherwake

# 唤醒设备  br-lan 是设备所在的接口, 1D:1D:1D:1D:D1:1D 是设备的mac地址
etherwake -i br-lan 1D:1D:1D:1D:D1:1D
```
