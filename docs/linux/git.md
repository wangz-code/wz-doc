---
title: 自建 Git
description: 自建 Git
head:
  - - meta
    - name: keywords
      content: 自建 Git
---

### 自建 Git

众所周知的原因 github 非常不稳定, 所以想要自建一个 git, 大致步骤如下

- 安装 git
- 系统创建 git 用户
- 初始化 git 仓库
- 生成密钥 免密 clone pull push
- 禁用 git 用户使用 shell 登录


### 环境介绍

```
CentOS 8
yum 4.4.2

假设服务器 ip 为 100.10.10.100

```

### 操作步骤

```bash
# 切换到 su
sudo su

# 安装 git工具
yum install git

# 增加用户名为 git 的用户 后续基本都是用 git 这个用户操作,
useradd git

# 为 git 用户设置密码 , 最好是大于 8 位 字符+数字,避免因弱密码设置失败
passwd git

# 添加一个存放git 仓库的文件夹位置在  /data/git-repository
mkdir /data/git-repository

# 将此文件夹授权给 git 用户,方便后续操作  chown -R [用户名称] [目录名称]
chmod -R  git /data/git-repository

# 切换到 git 用户
su git

# 初始化git仓库. "sample" 是项目名(仓库名)  
git init --bare /data/git-repository/sample.git

# 现在就可以 clone 但是在 clone 时会让你输入 git 用户的密码, 为了避免每次操作都要输入密码, 我们使用密钥登录
# 启用 ssh 公钥登录
vim /etc/ssh/sshd_config

# 找到这一行把下面这一行启用 默认是带#, 去掉前面的#号即启用 
# centos8 删减了 RSAAuthentication, 详细的原因 请参见: https://www.cnblogs.com/Leroscox/p/9627809.html
# AuthorizedKeysFile .ssh/authorized_keys 这一行不用动 这是存储公钥的文件
PubkeyAuthentication yes

# 生成本机的密钥,  生成后存放在 /home/git/.ssh/ 目录下, 这个目录应该有两个文件(id_rsa,id_rsa.pub) id_rsa: 私钥注意保密 ,  id_rsa.pub: 公钥待会会用到
# 其他的主机指令相同 win 下要使用 powersehll 或者 git bash 生成
ssh-keygen -t rsa -b 4096 -C "your_email@163.com"

# 1.先检查下  /home/git/.ssh/ 下有没有 authorized_keys 这个文件, 没有的话新建一个
# 2.然后把生成的 id_rsa.pub 里的内容 copy 到 authorized_keys 中 应该是一行一个

authorized_keys:
第一行: 放其他需要免密登录的 id_rsa.pub
第二行: 放其他需要免密登录的 id_rsa.pub
第三行: 放其他需要免密登录的 id_rsa.pub
......


# 这个时候已经可以使用密钥登录了, 开始 clone; 命令解释 git clone [用户名]@[服务器 ip]:[仓库所在的路径]
# clone 之后  pull , push 都不需要免密了 尽情操作吧
git clone git@100.10.10.100:/data/git-repository/sample.git


# 为了安全起见, 需要把 git用户禁用shell登录
vim /etc/passwd

# 找到下面这一行, 把后面的 /bin/bash 修改为  /usr/bin/git-shell
# 成功后 git 用户就无法登录了
git:x:1001:1001:,,,:/home/git:/bin/bash
修改为: 
git:x:1001:1001:,,,:/home/git:/usr/bin/git-shell

# 至此搭建完毕 参考资料
廖雪峰搭建 git 服务器: https://www.liaoxuefeng.com/wiki/896043488029600/899998870925664
生成本机密钥: https://www.myfreax.com/how-to-set-up-ssh-keys-on-centos-8/
启用密钥登录: https://www.cnblogs.com/Leroscox/p/9627809.html
# 其他问题
如果看到有说不能访问 ~/.ssh/authorized_keys 这个文件的，可以尝试下修改.ssh目录的权限为700，authorized_keys 文件的权限为 600


```