---
title: nginx 配置
---

### nginx 缓存 `no-cache`(推荐)

我测试单独配置 `no-cache` 不生效, nginx 好像有一个默认的过期时间, 如果没过期就不会向服务器请求, 需要配置`expires 0`; 浏览器就会认为这里的每个文件都过期了, 快点去跟服务器请求一下, 然后根据服务器的 ETag 验证有哪些文件更新了, 就从服务器下载最新的并且响应码为`200`, 如果文件没有更新则响应码为`304`告诉浏览器目前的缓存也是有效的你直接用就行。

### nginx 无缓存模式 `no-store`

所有的文件都从服务器上下载, 保持最新的(不常用)

---

```bash
# add_header Cache-Control
# public 所有内容都将被缓存（客户端和代理服务器都可缓存）
# private 内容只缓存到私有缓存中（仅客户端可以缓存，代理服务器不可缓存）。
# no-cache 必须先与服务器确认返回的响应是否被更改，然后才能使用该响应来满足后续对同一个网址的请求。因此，如果存在合适的验证停牌（ETag），no-cache 会发起往返通信来验证缓存的响应，如果资源未被更改，可以避免下载。
# no-store 所有内容都不会被缓存到缓存或 Internet 临时文件中，强制缓存和对比缓存都不会触发。
# must-revalidation.proxy-revalidation 如果缓存内容失败，请求必须发送到服务器、代理以进行重新验证。
# max-age=xxx(xxx is numeric） 缓存的内容将在 xxx 秒失效，这个选项只在 HTTP 1.1 可用，并如果和 Last-Modified 一起使用时，优先级较高。

 # 代理websocket需要用到的配置
 map $http_upgrade $connection_upgrade {
        default upgrade;
        '' close;
 }

server {
        listen 3300;
        server_name localhost;
        location ^~/alert/ {
            proxy_pass http://www.baidu.com/;
            client_max_body_size 10m; #允许客户端请求的最大单文件字节
        }

        location / {
            root  /program/client-alert/app/;
            # 这里的缓存
            if ($request_filename ~* ^.*?.(html|htm|js|css|json)$) {
                add_header Cache-Control "no-cache";
                expires 0;
            }
        }
         # 上方的 map + 下方的配置 websocket
        location ^~/wsnginx/ {
            proxy_pass http://www.baidu.com/ws;
            proxy_http_version 1.1;
            proxy_set_header Upgrade $http_upgrade;
            proxy_set_header Connection "upgrade";
        }


        # 高德地图地点搜索服务   xxxxx 是你申请的服务key
        location /_AMapService/ {
            set $args "$args&key=xxxxx";
            proxy_pass https://restapi.amap.com/;
        }
    }



```

### nginx 自启动 CentOS7.x&RedHat7.x 配置 Nginx 开机自启动`

```sh

vim /lib/systemd/system/nginx.service

#内容如下
[Unit]
Description=nginx service
After=network.target
[Service]
Type=forking
ExecStart=/usr/nginx/sbin/nginx
ExecReload=/usr/nginx/sbin/nginx -s reload
ExecStop=/usr/nginx/sbin/nginx -s quit
PrivateTmp=true
[Install]
WantedBy=multi-user.target


# 授权
chmod a+x /lib/systemd/system/nginx.service


#命令
systemctl enable nginx.service          #设置开机自启动
systemctl disable nginx.service         #停止开机自启动
systemctl start nginx.service　         #启动 Nginx 服务
systemctl stop nginx.service　          #停止服务
systemctl status nginx.service          #查看服务当前状态
systemctl list-units --type=service     #查看所有已启动的服务


# 如果已经手工启动需要 kill之后 再使用 systemctl 启动

```
