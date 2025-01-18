---
title: yolo
description: yolo 实时检测
head:
    - - meta
      - name: keywords
        content: yolo11
---

### yolo 目标检测

yotube 总是推送一些垃圾动画, 一个一个筛选肯定不可能, 想要使用 yolo 检测某些特征,然后剔除掉

### 最方便的文件夹格式

```txt
sailuo/
├── aoto.yaml
├── images/
│   ├── train/
│   │   ├── zhang_san/
│   │   │   ├── zhang_san_1.jpg
│   │   │   ├── zhang_san_2.jpg
│   │   │   └── ...
│   │   ├── li_si/
│   │   │   ├── li_si_1.jpg
│   │   │   ├── li_si_2.jpg
│   │   │   └── ...
│   │
│   ├── val/
│   │   ├── zhang_san/
│   │   │   ├── zhang_san_1.jpg
│   │   │   ├── zhang_san_2.jpg
│   │   │   └── ...
│   │   ├── li_si/
│   │   │   ├── li_si_1.jpg
│   │   │   ├── li_si_2.jpg
│   │   │   └── ...
│   │
│   └── test/
│       ├── zhang_san/
│       ├── li_si/
│       └── other/
│
└── labels/
    ├── train/
    │   ├── zhang_san/
    │   │   ├── zhang_san_1.txt
    │   │   ├── zhang_san_2.txt
    │   │   └── ...
    │   ├── li_si/
    │   │   ├── li_si_1.txt
    │   │   ├── li_si_2.txt
    │   │   └── ...
    │
    ├── val/
    │   ├── zhang_san/
    │   │   ├── zhang_san_1.txt
    │   │   ├── zhang_san_2.txt
    │   │   └── ...
    │   ├── li_si/
    │   │   ├── li_si_1.txt
    │   │   ├── li_si_2.txt
    │   │   └── ...
    │
    └── test/
        ├── zhang_san/
        ├── li_si/
        └── other/
```

### aoto.yaml

```yaml
# Ultralytics YOLO 🚀, AGPL-3.0 license
# COCO8 dataset (first 8 images from COCO train2017) by Ultralytics
# Documentation: https://docs.ultralytics.com/datasets/detect/coco8/
# Example usage: yolo train data=coco8.yaml
# parent
# ├── ultralytics
# └── datasets
#     └── coco8  ← downloads here (1 MB)

# Train/val/test sets as 1) dir: path/to/imgs, 2) file: path/to/imgs.txt, or 3) list: [path/to/imgs1, path/to/imgs2, ..]
path: datasets/sailuo # dataset root dir
train: images/train # train images (relative to 'path') 4 images
val: images/val # val images (relative to 'path') 4 images
test: # test images (optional)

# Classes
names:
    0: sailuo
    1: aoto
    2: geliqiao
    3: gesila
    4: guai
    5: d
    6: sailuof
```

### 开始训练

```python
from ultralytics import YOLO

# Load a model
model = YOLO("yolo11n.pt")

# Train the model
train_results = model.train(
    data="datasets/aoto.yaml",  # path to dataset YAML
    epochs=10,  # number of training epochs
    imgsz=640,  # training image size
    device="mps",  # device to run on, i.e. device=0 or device=0,1,2,3 or device=cpu
)
# print("train_results",train_results)
# # Evaluate model performance on the validation set
# metrics = model.val()

# Export the model to ONNX format
# path = model.export(format="onnx")  # return path to exported model

```

### 推理单张图片

```python
# 训练完毕之后 会生成 best.pt(最好的模型) 和  last.pt(最后训练的模型)
from ultralytics import YOLO

model = YOLO("runs/detect/train7/weights/last.pt")
results = model("test/sailuo.png")
# Visualize the results
for result in results:
    result.show()

```


### 推理视频帧

```python
# 训练完毕之后 会生成 best.pt(最好的模型) 和  last.pt(最后训练的模型)
import cv2
from ultralytics import YOLO

# 加载 YOLO 模型
model = YOLO("models/aoto_best.pt")

# 打开视频文件
video_path = "test/aoto_test-video.mp4"  # 替换为你的 MP4 文件路径
cap = cv2.VideoCapture(video_path)

# 检查视频是否成功打开
if not cap.isOpened():
    print("Error: Could not open video.")
    exit()


while cap.isOpened():
    ret, frame = cap.read()
    if not ret:
        break

    results = model(frame)  # 对帧进行目标检测
    result_img = ""
    for result in results:
        names = result.names
        result_img = result.plot()
    # 显示处理后的帧
    cv2.imshow("Video", result_img)

    # 按 'q' 键退出
    if cv2.waitKey(1) & 0xFF == ord("q"):
        break

# 释放视频捕获对象并关闭窗口
cap.release()
cv2.destroyAllWindows()


```
