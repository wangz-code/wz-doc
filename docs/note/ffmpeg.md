---
title: FFmpeg
description: FFmpeg
head:
    - - meta
      - name: keywords
        content: FFmpeg
---

### 个人常用 youtube 下载的 mp4 转 mp3

```shell

# 剪切视频
ffmpeg -ss 00:00:00 -i video.mp4 -to 00:02:00 -c copy cut.mp4

# 转换
ffmpeg -i cut.mp4 -vn audio.mp3

# 视频转Gif
ffmpeg -i test.mp4 test.gif

# 从视频中第3秒开始，截取时长为3秒的片段转化为 gif  -ss:表示起始点
ffmpeg -t 3 -ss 00:00:03 -i test.mp4 test-clip.gif

# 默认转化是中等质量模式，若要转化出高质量的 gif，可以修改比特率
ffmpeg -i test.mp4 -b 2048k test.gif

# 缩放滤镜 scale=300 宽度 -2:特殊值根据原始视频的宽高比自动计算高度,  -r: 帧率
ffmpeg -i test.mp4 -vf "scale=300:-2" -r 10 output.gif

# 将GIF 转换为 MP4
ffmpeg -f gif -i test.gif test.mp4

# 移除视频中的音频（静音） -an 就是禁止音频输出  -vn 禁用视频流输出
ffmpeg -i input.mov -an mute-output.mov

# 视频提取帧 将视频提取10帧
ffmpeg -i index.mp4 -r 10 %03d.jpg;



```

### mp4 转 wav

```shell
# -ar 音频采样率  -ac 声道  -filter:a "volume=1.5"  # 音量放大 1.5 倍  -t 30  # 截取前30秒
ffmpeg -i output.mp4 -vn -ar 16000 -ac 1 audio.wav
```

### ffmpeg 音频 mp4 转 mp3

```shell

ffmpeg -i filename.mp4 filename.mp3

# -vn 选项明确丢弃视频，因此转换速度要快得多
ffmpeg -i video.mp4 -vn audio.mp3

```

### ffmpeg 剪切视频文件命令 [参考](https://moejj.com/ffmpeg)

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
