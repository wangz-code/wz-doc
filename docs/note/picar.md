---
title: 树莓派小车
description: 小树莓派小车socket控制机械臂opencv识别
head:
    - - meta
      - name: keywords
        content: 树莓派小车 socket控制机械臂 opencv识别
---

### 演示视频

<video src="/video/picar.mp4"  controls="" preload="none" style="width: 60%;"/>

### 准备工作

> 可以直接在阿里巴巴上搜索店铺: [明佳泰](https://mingjiataidz.1688.com/page/index.html) 一站购齐

-   车身: `亚克力底盘` `轮胎` `电机` `电池` `电池盒` `充电电池盒`
-   控制: `L298N电机驱动板子` `PWM舵机驱动板PCA9685`
-   其他: `机械臂` `升压模块` `降压模块` `超声波传感器` `csi摄像头` `舵机(MG90的要好一点)` `开关` `杜邦线` `3mm铜线` `串联充电均衡板`

### 基本思路

~ 主要是 Python 我是采用 websocket 控制, 不需要额外的遥控器, 是个手机就能用, 这样做弊端就是离开 wifi 就用不了但是后续实时视频集成比较方便总的来说有利有弊

### 参考资料

-   安装 python
-   安装 [jupyter](https://jupyter.org/install) 直接在网页编写代码实时调试很方便
-   控制电机 [参考](https://blog.csdn.net/weixin_43073852/article/details/83085306)
-   控制超声波 [参考](https://blog.csdn.net/hnmpf/article/details/110312551)
-   控制机械臂 [参考](https://blog.csdn.net/vonct/article/details/120808529)

### 相关代码

```python
from __future__ import division
import http.server
import socketserver
import os
import threading
import asyncio
import websockets
import json
import RPi.GPIO as GPIO  # 引入RPi.GPIO库函数命名为GPIO
import time

import server_client
# --begin 舵机

import Adafruit_PCA9685
# --end 舵机

# WebSocket服务器的端口
WEBSOCKET_SERVER_PORT = 8765

# 接口定义
INT1 = 11  # 将L298 INT1口连接到树莓派Pin11
INT2 = 12  # 将L298 INT2口连接到树莓派Pin12
INT3 = 13  # 将L298 INT3口连接到树莓派Pin13
INT4 = 15  # 将L298 INT4口连接到树莓派Pin15
ENA = 16          # A
ENB = 18          # B
rate = 60  # 转速
pwma_right = 0
pwmb_left = 0


def car_init():
    global pwma_right
    global pwmb_left
    global rate

    if pwmb_left != 0:
        pwma_right.stop()
        pwmb_left.stop()
        GPIO.cleanup()

    # BOARD编号方式，基于插座引脚编号
    GPIO.setmode(GPIO.BOARD)  # 将GPIO编程方式设置为BOARD模式
    # 输出模式
    GPIO.setup(INT1, GPIO.OUT)
    GPIO.setup(INT2, GPIO.OUT)
    GPIO.setup(INT3, GPIO.OUT)
    GPIO.setup(INT4, GPIO.OUT)
    GPIO.setup(ENA, GPIO.OUT)
    GPIO.setup(ENB, GPIO.OUT)

    pwma_right = GPIO.PWM(ENA, 80)  # 控制转速
    pwmb_left = GPIO.PWM(ENB, 80)

    pwma_right.start(rate)
    pwmb_left.start(rate)
    print("初始化完毕")


car_init()


# 前进
def go():
    global pwma_right
    global pwmb_left
    global rate
    if pwma_right != 0:
        pwma_right.ChangeDutyCycle(rate)
        pwmb_left.ChangeDutyCycle(rate)
        GPIO.output(INT1, GPIO.LOW)
        GPIO.output(INT2, GPIO.HIGH)

        GPIO.output(INT3, GPIO.LOW)
        GPIO.output(INT4, GPIO.HIGH)


# 后退
def back():
    global pwma_right
    global pwmb_left
    global rate
    if pwma_right != 0:
        pwma_right.ChangeDutyCycle(rate)
        pwmb_left.ChangeDutyCycle(rate)
        GPIO.output(INT1, GPIO.HIGH)
        GPIO.output(INT2, GPIO.LOW)

        GPIO.output(INT3, GPIO.HIGH)
        GPIO.output(INT4, GPIO.LOW)


# 左转
def left():
    global pwma_right
    global pwmb_left
    global rate
    if pwma_right != 0:
        pwma_right.ChangeDutyCycle(rate)
        pwmb_left.ChangeDutyCycle(rate/2)
        GPIO.output(INT1, GPIO.LOW)
        GPIO.output(INT2, GPIO.HIGH)

        GPIO.output(INT3, GPIO.HIGH)
        GPIO.output(INT4, GPIO.LOW)


# 右转
def right():
    global pwma_right
    global pwmb_left
    global rate

    if pwma_right != 0:
        pwma_right.ChangeDutyCycle(rate/2)
        pwmb_left.ChangeDutyCycle(rate)
        GPIO.output(INT1, GPIO.HIGH)
        GPIO.output(INT2, GPIO.LOW)

        GPIO.output(INT3, GPIO.LOW)
        GPIO.output(INT4, GPIO.HIGH)


# 转速
def rateChange(value):
    global pwma_right
    global pwmb_left
    global rate
    if pwma_right != 0:
        rate = value


# 释放
def close():
    global pwma_right
    global pwmb_left
    if pwmb_left != 0:
        GPIO.output(INT1, GPIO.LOW)
        GPIO.output(INT2, GPIO.LOW)

        GPIO.output(INT3, GPIO.LOW)
        GPIO.output(INT4, GPIO.LOW)

        pwma_right.stop()
        pwmb_left.stop()
        # 清理GPIO引脚
        GPIO.cleanup()


# 停车
def pause():
    global pwma_right
    global pwmb_left
    if pwma_right != 0:
        pwma_right.ChangeDutyCycle(0)
        pwmb_left.ChangeDutyCycle(0)


# 初始化舵机
pwm = Adafruit_PCA9685.PCA9685()
pwm.set_pwm_freq(50)

beangle1 = 0
beangle2 = 0

beangle15 = 15
beangle5 = 75
beangle6 = 150
beangle7 = 60

channel1 = 0  # 摄像头
channel2 = 1  # 暂未使用

channel15 = 15  # 钳子
channel5 = 12  # 底盘
channel6 = 13  # 右侧
channel7 = 14  # 左侧


setpAngle = 2.5
b_sleep = 0.15

isContinue = True

# 使舵机转动角度


def set_servo_angle(channel, angle):  # 输入角度转换成12^精度的数值
    global pwm
    # 进行四舍五入运算 date=int(4096*((angle*11)+500)/(20000)+0.5)
    date = int(4096*((angle*11)+500)/20000)
    pwm.set_pwm(channel, 0, date)


# 设置pwm
def setPwm(value):
    global pwm
    pwm.set_pwm_freq(value)


####  摄像头  ####
# 上看
def upSee():
    global beangle1
    global setpAngle
    global channel1
    beangle1 -= setpAngle
    if beangle1 <= 0:
        beangle1 = 0
    set_servo_angle(channel1, beangle1)


# 下看
def downSee():
    global beangle1
    global setpAngle
    global channel1
    beangle1 += setpAngle
    if beangle1 >= 180:
        beangle1 = 180
    set_servo_angle(channel1, beangle1)


# 不看(未使用)
def pauseSee():
    global beangle1
    global beangle2


####  机械臂  ####

def timeAfter(dely, callFn):
    timer = threading.Timer(dely, callFn)
    timer.start()


# 左臂 升起
def b_left_up():
    global beangle7
    global setpAngle
    global channel7
    global b_sleep
    # print(setpAngle)
    beangle7 += setpAngle
    if beangle7 >= 125:
        beangle7 = 125
        return
    set_servo_angle(channel7, beangle7)
    # print("b_left_up:"+str(beangle7))
    if isContinue:
        timeAfter(b_sleep, b_left_up)


# 左臂 下降
def b_left_down():
    global beangle7
    global setpAngle
    global channel7
    global b_sleep

    beangle7 -= setpAngle
    if beangle7 <= 15:
        beangle7 = 15
        return
    set_servo_angle(channel7, beangle7)
    # print("b_left_down:"+str(beangle7))
    if isContinue:
        timeAfter(b_sleep, b_left_down)


# 右臂 升起
def b_right_up():
    global beangle6
    global setpAngle
    global channel6
    global b_sleep

    beangle6 += setpAngle
    if beangle6 >= 180:
        beangle6 = 180
        return

    set_servo_angle(channel6, beangle6)
    # print("b_right_up:"+str(beangle6))
    if isContinue:
        timeAfter(b_sleep, b_right_up)


# 右臂 下降
def b_right_down():
    global beangle6
    global setpAngle
    global channel6
    global b_sleep

    beangle6 -= setpAngle
    if beangle6 <= 118:
        beangle6 = 118
        return
    set_servo_angle(channel6, beangle6)
    # print("b_right_down:"+str(beangle6))
    if isContinue:
        timeAfter(b_sleep, b_right_down)


# 开钳
def b_open():
    global beangle15
    global setpAngle
    global channel15
    global b_sleep

    beangle15 += setpAngle
    if beangle15 >= 30:
        beangle15 = 30
        return

    set_servo_angle(channel15, beangle15)
    # print("b_open:"+str(beangle15))
    if isContinue:
        timeAfter(b_sleep, b_open)


# 闭钳
def b_close():
    global beangle15
    global setpAngle
    global channel15
    global b_sleep

    beangle15 -= setpAngle
    if beangle15 <= 8:
        beangle15 = 8
        return
    set_servo_angle(channel15, beangle15)
    print("b_close:"+str(beangle15))
    if isContinue:
        timeAfter(b_sleep, b_close)


# 底盘 正转
def b_plus():
    global beangle5
    global setpAngle
    global channel5
    global b_sleep

    beangle5 += setpAngle
    if beangle5 >= 130:
        beangle5 = 130
        return

    set_servo_angle(channel5, beangle5)
    # print("b_plus:"+str(beangle5))
    if isContinue:
        timeAfter(b_sleep, b_plus)


# 底盘 反转
def b_reduce():
    global beangle5
    global setpAngle
    global channel5
    global b_sleep

    beangle5 -= setpAngle
    if beangle5 <= 30:
        beangle5 = 30
        return
    set_servo_angle(channel5, beangle5)
    # print("b_reduce:"+str(beangle5))
    if isContinue:
        timeAfter(b_sleep, b_reduce)


# 跟随
isFloow = False


#  控制转向
def ctrlCar(val):
    print(val)
    if val == "right":
        right()
        timeAfter(1.5, pause)
    if val == "left":
        left()
        timeAfter(1.5, pause)
        pause()
    if val == "center":
        pause()


def follow():
    isFloow = not isFloow
    if isFloow:
        print("启动跟随")
        server_client.beginFloow(ctrlCar)

    else:
        server_client.closeFloow()
        print("结束跟随")

# 处理socket


async def handle_connection(websocket, path):
    async for message in websocket:
        global isContinue
        # print(message)
        isContinue = True
        # 处理消息并发送响应
        response = f"Received: {message}"
        msg = json.loads(message)
        # print(msg['key'])
        # print(msg['value'])
        try:
            if msg['key'] == "go":
                pause()
                time.sleep(0.2)
                go()
            if msg['key'] == "left":
                pause()
                time.sleep(0.2)
                left()

            if msg['key'] == "back":
                pause()
                time.sleep(0.2)
                back()

            if msg['key'] == "right":
                pause()
                time.sleep(0.2)
                right()

            if msg['key'] == "rate":
                rateChange(int(msg['value']))

            if msg['key'] == "close":
                close()

            if msg['key'] == "init":
                car_init()

            if msg['key'] == "pause":
                pause()

            # 摄像头
            if msg['key'] == "upSee":
                upSee()

            if msg['key'] == "downSee":
                downSee()

            if msg['key'] == "pauseSee":
                pauseSee()

            # 机械臂
            if msg['key'] == "b_pause":
                isContinue = False

            if msg['key'] == "setPwm":
                setPwm(int(msg['value']))

            if msg['key'] == "b_left_up":
                b_left_up()

            if msg['key'] == "b_open":
                b_open()

            if msg['key'] == "b_right_up":
                b_right_up()

            if msg['key'] == "b_left_down":
                b_left_down()

            if msg['key'] == "b_close":
                b_close()

            if msg['key'] == "b_right_down":
                b_right_down()

            if msg['key'] == "b_plus":
                b_plus()

            if msg['key'] == "b_reduce":
                b_reduce()
            if msg['key'] == "follow":
                follow()

        except Exception as e:
            print("出错了", e)

        await websocket.send("回复:"+response)


# 启动WebSocket服务器
def start_websocket_server():
    try:
        print(f"启动websocket {WEBSOCKET_SERVER_PORT}")

        # 启动 WebSocket 服务器
        start_server = websockets.serve(
            handle_connection, '0.0.0.0', WEBSOCKET_SERVER_PORT)
        # 运行事件循环
        asyncio.get_event_loop().run_until_complete(start_server)
        asyncio.get_event_loop().run_forever()

    except KeyboardInterrupt:
        asyncio.get_event_loop().stop()
        close()
        print("socket程序已被中断")


# 启动WebSocket服务器
start_websocket_server()
```

<script setup>
import { ref } from 'vue'

const count = ref(0)
</script>
