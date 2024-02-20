---
title: Xray
toc: 使用心得
---

### 缘起

之前我以为 xray-core 必须配合客户端一起配合才能使用, 所以我一直使用的是 mac 下 [V2RayXS](https://github.com/tzmax/V2RayXS), 偶然间发现有人提出了一个[issues](https://github.com/tzmax/V2RayXS/issues/52), 关于如何修改[inbound](https://xtls.github.io/config/inbound.html)配置, 详细了解之后发现这个功能确实挺好用的,可以直接拦截一些广告请求, 在客户端翻了一遍没找到 config.json 所处的位置, 然后在 xray-core 文件夹翻来覆去, 碰巧看到一篇文章[在 PC 端手工配置 xray-core](https://xtls.github.io/document/level-0/ch08-xray-clients.html#_8-3-%E9%99%84%E5%8A%A0%E9%A2%98-1-%E5%9C%A8-pc-%E7%AB%AF%E6%89%8B%E5%B7%A5%E9%85%8D%E7%BD%AE-xray-core)
这篇文章大概意思就是教你在脱离 GUI 的情况之下如何使用 xray 然后恍然大悟, xray-core 丢在 vps 上就是`服务端`, 丢在本机就是`客户端`
所谓的 GUI 程序本质上就是把本机的请求`筛选`后, 也可能没有`筛选`这一步, 直接转发到 xray 所在的端口然后经过配置路由进行分发, 　我用的 V2RayXS 是有一个 PAC 文件, 只有在 PAC 中的域名才会被代理否则直链;

我猜测 『浏览器请求 --> GUI 筛选---> xray ----> 响应 --->GUI ---> 浏览器』 会多一层而且会有稀奇古怪的 bug 比如锁屏后再解锁后 GUI 代理就会一直转圈, 每次都要关掉页签之后才能正常刷新. 准备脱离GUI 直接就是 ` xray-core + config.json `
![alt 属性文本](/images/xray-router.png)

### 准备工作
- mac下
- 下载 [xray-core 1.75](https://github.com/XTLS/Xray-core/releases/tag/v1.7.5) 目前稳定版就是1.75
- 准备 [config.json ](https://xtls.github.io/document/level-0/ch08-xray-clients.html#_8-3-%E9%99%84%E5%8A%A0%E9%A2%98-1-%E5%9C%A8-pc-%E7%AB%AF%E6%89%8B%E5%B7%A5%E9%85%8D%E7%BD%AE-xray-core) 记得删除注释内容


### 操作步骤
- 为了方便操作我把xray所在的目录添加到了 path中, 不添加也可以但是需要绝对路径运行
```shell
# 编辑终端文件
vim ~/.zshrc


# 添加xray路径到系统path中, 便于终端中直接执行
# 终端启动代理 比如: xray  回车
# 终端启动代理指定配置文件 比如: xray run /User/xx/config.json  回车
# 根据程序名杀死进程 比如: killall xray  回车
export PATH=$PATH:/Users/wz/Proxy/xray-core

# 重启xray 相当于重新加载confdir内配置内容
alias rexray='killall xray; sleep 2s; nohup xray run -confdir confs >/dev/null 2>&1 &;'

# 让终端走代理  10801 是config.json中配置的
alias proxy='export http_proxy="http://127.0.0.1:10801"; export HTTP_PROXY="http://127.0.0.1:10801"; export https_proxy="http://127.0.0.1:10801"; export HTTPS_PROXY="http://127.0.0.1:10801"'

# 懒人操作 简化指令
alias p=proxy

# 后台运行指令:  nohup xray &   注意 `&` 符号一定不能忘记

```
- 然后在本机的  wifi  ===> 详细信息 ===> 代理 ===> 网页代理&网页安全代理 
`根据自己的配置内容进行填写 比如我的就是:`
服务器:127.0.0.1
端口: 10801

### 后续遇到没有代理的网站可以直接修改 [config.json](https://xtls.github.io/document/level-0/ch08-xray-clients.html#_8-3-%E9%99%84%E5%8A%A0%E9%A2%98-1-%E5%9C%A8-pc-%E7%AB%AF%E6%89%8B%E5%B7%A5%E9%85%8D%E7%BD%AE-xray-core)
```json
// 3.4 国外域名代理 
domain 这是一个字符串数组, 例如 "domain":["www.baidu.com","zhihu.com"] 就会让百度和知乎走代理了, 其他的配置同理
...
"routing": {
        "domainMatcher": "hybrid",
        "domainStrategy": "AsIs",
        "rules": [
            {
                "domain": [
                    "domain:google.com",
                    "domain:youtube.com",
                    "regexp:\\.goo.*\\.com$",
                    "*.googlevideo.com",
                    "domain:google.com.hk",
                    "domain:googleapis.com",
                    "domain:gstatic.com",
                    "domain:ggpht.com",
                    "domain:ytimg.com",
                    "domain:googleusercontent.com",
                    "domain:twimg.com",
                    "domain:npmjs.com",
                    "domain:twitter.com",
                    "domain:soundcloud.com",
                    "domain:sndcdn.com",
                    "domain:googletagmanager.com",
                    "domain:appspot.com",
                    "domain:wikipedia.org",
                    "domain:codesandbox.io",
                    "domain:unpkg.com",
                    "domain:apache.org",
                    "domain:jsdelivr.net",
                    "domain:cloudflareinsights.com",
                    "domain:visualstudio.com",
                    "domain:csb.app",
                    "domain:instagram.com",
                    "domain:cdninstagram.com",
                    "domain:fbcdn.net",
                    "domain:pinterest.com",
                    "domain:pinterest.fr",
                    "domain:babylonjs-playground.com",
                    "domain:githack.com",
                    "domain:speedtest.net",
                    "domain:openwrt.org",
                    "domain:nuxt.com",
                    "domain:duckduckgo.com",
                    "domain:npmmirror.com",
                    "domain:v2ex.com",
                    "domain:feel-gpt.top",
                    "domain:huggingface.co",
                    "domain:theb.ai",
                    "domain:mercari.com",
                    "domain:pcwrap.com",
                    "beta.theb.ai",
                    "domain:binance.com",
                    "domain:bnbstatic.com",
                    "domain:deepswap.ai",
                    "regexp:eacg",
                    "regexp:telegram",
                    "regexp:mercdn",
                    "regexp:github",
                ],
                "outboundTag": "proxyvps",
                "type": "field"
            },
            {
                "domain": [
                    "domain:djgo.cc",
                    "regexp:\\*baidu\\$",
                    "regexp:360buyimg",
                    "regexp:jd"
                ],
                "outboundTag": "direct",
                "type": "field"
            }
        ]
    }
...

```

到此就完成了



