---
title: Vps的SSH安全配置
toc: Vps的SSH安全配置
---

### debian 为例

```shell
# 用root 登录之后 创建一个拥有root的用户
#创建一个新的超级用户，例如 "newadmin"，并设置密码：
adduser newuser

# 添加新的用户到 sudo 组
usermod -aG sudo newuser

# 切换到newuser
su - newuser

# 测试是否具有root权限

# 如果提示newuser is not in the sudoers file.
vim /etc/sudoers

# 增加 下面两行
root    ALL=(ALL:ALL) ALL
%sudo   ALL=(ALL:ALL) ALL

sudo ls -a /root

```

### 禁用 root 用户登录修改ssh端口
```shell
# 安装vim,lrzsz
sudo apt-get install vim
sudo apt-get install lrzsz

# 编辑配置
sudo vim /etc/ssh/sshd_config


# root登录
PermitRootLogin yes
#修改为 不允许root登录
PermitRootLogin no

# 修改端口号 修改为自己喜欢的端口号
Port 22

# 要求必须在2分钟内完成身份认证, 可以改为10秒  LoginGraceTime 10s
LoginGraceTime 2m

# PAM 支持许多不同的认证方式，包括密码、生物识别、令牌等, 仅用密钥认证可以设置为no
UsePAM yes

# 意味着一个用户最多可以同时打开 10 个会话
MaxSessions: 10 

# 连续失败登录若干次后禁止连接 3 代表3次
MaxAuthTries 3

# 是 SSH（Secure Shell）中的一个配置选项，通常用于启用用户的交互式身份验证 如果仅用密钥则设为no 即可
KbdInteractiveAuthentication no

# 开启密钥登录
PubkeyAuthentication yes
AuthorizedKeysFile      .ssh/authorized_keys .ssh/authorized_keys2




# 生成本机密钥, 如果已经生成过,生成密钥可以省略
ssh-keygen -t rsa -b 4096 -C "xxx@qq.com"
# 然后在 粘贴 其他机器的 公钥(id_rsa.pub) 一行一个
sudo vim ~/.ssh/authorized_keys


# 保存退出 重启 SSH 服务以应用更改：
sudo systemctl restart sshd
# 现在，你已经成功禁用了root用户登录。 并更改为 newuser 密钥+密码登录

# 为了安全起见, 需要把 所有用户禁用密码登录
sudo vim /etc/ssh/sshd_config
# 找到最后一行把 yes 修改为 no
PasswordAuthentication no


# 安装 ufw 开启白名单, 或者找到badip 集合全部加到拦截列表里

5. 安装 BBRplus新版内核
19.使用BBRplus+FQ版加速
21.系统配置优化
开启ECN

```