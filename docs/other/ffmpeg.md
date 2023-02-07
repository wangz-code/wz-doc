---
title: FFmpeg
---

### 个人常用youtube下载的mp4转mp3
```shell

# 剪切视频
ffmpeg -ss 00:00:00 -i video.mp4 -to 00:02:00 -c copy cut.mp4

# 转换
ffmpeg -i cut.mp4 -vn audio.mp3

```


### ffmpeg音频mp4 转 mp3

```shell

ffmpeg -i filename.mp4 filename.mp3

# -vn 选项明确丢弃视频，因此转换速度要快得多
ffmpeg -i video.mp4 -vn audio.mp3

```
### ffmpeg剪切视频文件命令 [参考](https://moejj.com/ffmpeg)

```shell

# ffmpeg剪辑视频文件非常简单，一个命令就可以搞定。-ss后面指定的时间轴，-t后面指定时长单位为秒。为什么要将-ss放在-i前面？
# 因为官方文档推荐这样做，这样做剪辑出来的视频时间轴更精准，并且速度更快。还有一个参数-to放在-i video.mp4后面，作用是指定剪辑时长，
# 例如-to 00:02:00, 当-ss放在-i前面的时候，这个-to剪辑出来的是-ss指定的时间轴加上-to指定的时间，
# 比如-ss 00:01:00 -i video.mp4 -to 00:02:00，则剪辑出来的视频，是原视频00:01:00到00:03:00的片段。
# 如果想把片头给去掉则指定了时间轴就不要添加-to和-t参数。

ffmpeg -ss 00:00:00 -i video.mp4 -to 00:02:00 -c copy cut.mp4  # 0+2 = 结束于2分钟

ffmpeg -ss 00:03:00 -i video.mp4 -to 00:02:00 -c copy cut.mp4  # 3+2 = 结束于5分钟


# -to参数实例 将原视频文件00:03:00到00:05:00的片段剪辑出来，生成为cut.mp4文件在当前文件夹，并且使用编码为copy复制源视频文件的编码格式。
ffmpeg -ss 00:03:00 -i video.mp4 -to 00:02:00 -c copy cut.mp4


# 去除片头，就不需要添加-to或者-t参数，那么则是剪辑00:03:00到视频结尾。
ffmpeg -ss 00:03:00 -i video.mp4 -c copy cut.mp4


```

