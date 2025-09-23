---
title: acme.sh申请泛域名证书ssl
description: acme.sh申请泛域名证书ssl
head:
  - - meta
    - name: keywords
      content: ssl 证书 https 免费 泛域名证书 zerossl
---
### 通过 acme 申请免费的泛域名证书
免费的泛域名，我他妈直接吹爆，申请也超级简单，acme.sh 一行脚本搞定还有谁！  
这么良心的企业不多了

### 操作流程
- 在zerossl注册账号并开启  `EAB Credentials for ACME Clients`
- 在域名厂商比如Namesilo开通 api manage 拿到 key
- 执行脚本自动申请

```bash
# 注册
acme.sh  --register-account  --server zerossl  --eab-kid  替换你的zerossl kid  --eab-hmac-key 替换为你的zerossl key

# 设置zerossl为默认
acme.sh --set-default-ca  --server zerossl

# 设置Namesilo key
export Namesilo_Key="替换为Namesil的 key"

# 申请泛域名证书 三个月有效期
acme.sh --issue --dns dns_namesilo -d 678998.xyz -d *.678998.xyz

# 安装证书到指定目录
acme.sh --install-cert -d 678998.xyz --key-file /ssl/678998.xyz.key --fullchain-file /ssl/678998.xyz.crt

# 正常来说 acme 会通过 cron定时任务自动检查续期 通过 crontab -l | grep acme.sh 检查定时任务
# 如果需要手动续期
acme.sh --renew --dns dns_namesilo -d 678998.xyz -d *.678998.xyz 

```