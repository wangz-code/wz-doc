---
title: 蓝牙通讯
description: 小程序蓝牙通讯
head:
  - - meta
    - name: keywords
      content: webapp 小程序 蓝牙
---

### 微信小程序蓝牙通讯

简单说下个人理解
每个蓝牙设备(BLE) 都有一个`主服务`还有`设备ID`, 小程序连接设备需要用到`设备ID` 连接后小程序可以获取设备的 `服务` 再由`服务` 获取到蓝牙设备的 `特征值`

这个`主服务`和`serviceId` 应该指的是同一个东西

`主服务` 和 `特征值`一般都是蓝牙厂商提前定义好的固定值

一个`服务`下有 多个 `特征值` 这些 `特征值` 有的可读, 有的可写, 还有通知的 就是`特征值的 read、write、notify 操作`

(官方文档)[https://developers.weixin.qq.com/miniprogram/dev/framework/device/ble.html]

```js
// 初始化蓝牙模块
wx.openBluetoothAdapter;

// 开始搜索附近的蓝牙外围设备
wx.startBluetoothDevicesDiscovery;

// 连接设备获取服务
wx.createBLEConnection({
  deviceId, // 搜索到设备的 deviceId
  success: () => {
    // 连接成功，获取服务
    wx.getBLEDeviceServices({
      deviceId,
      success: (res) => {
        wx.getBLEDeviceCharacteristics({
          deviceId, // 搜索到设备的 deviceId
          serviceId, // 上一步中找到的某个服务
          success: (res) => {
            for (let i = 0; i < res.characteristics.length; i++) {
              let item = res.characteristics[i];
              if (item.properties.write) {
                // 该特征值可写
                // 本示例是向蓝牙设备发送一个 0x00 的 16 进制数据
                // 实际使用时，应根据具体设备协议发送数据
                let buffer = new ArrayBuffer(1);
                let dataView = new DataView(buffer);
                dataView.setUint8(0, 0);
                wx.writeBLECharacteristicValue({
                  deviceId,
                  serviceId,
                  characteristicId: item.uuid,
                  value: buffer,
                });
              }
              if (item.properties.read) {
                // 该特征值可读
                wx.readBLECharacteristicValue({
                  deviceId,
                  serviceId,
                  characteristicId: item.uuid,
                });
              }
              if (item.properties.notify || item.properties.indicate) {
                // 必须先启用 wx.notifyBLECharacteristicValueChange 才能监听到设备 onBLECharacteristicValueChange 事件
                wx.notifyBLECharacteristicValueChange({
                  deviceId,
                  serviceId,
                  characteristicId: item.uuid,
                  state: true,
                });
              }
            }
          },
        });
      },
    });
  },
});
```

### 常见问题

- iOS 上，对特征值的 read、write、notify 操作，由于系统需要获取特征值实例，传入的 serviceId 与 characteristicId 必须由 wx.getBLEDeviceServices 与 wx.getBLEDeviceCharacteristics 中获取到后才能使用。建议统一在建立连接后先执行 wx.getBLEDeviceServices 与 wx.getBLEDeviceCharacteristics 后再进行与蓝牙设备的数据交互。
- 考虑到蓝牙功能可以间接进行定位，安卓 6.0 及以上版本，无定位权限或定位开关未打开时，无法进行设备搜索。
- 安卓上，部分机型获取设备服务时会多出 00001800 和 00001801 UUID 的服务，这是系统行为，注意不要使用这两个服务。
- 建立连接和关闭连接必须要成对调用。如果未能及时关闭连接释放资源，安卓上容易导致 state 133 GATT ERROR 的异常。
- 在与蓝牙设备传输数据时，需要注意 MTU（最大传输单元）。如果数据量超过 MTU 会导致错误，建议根据蓝牙设备协议进行分片传输。安卓设备可以调用 wx.setBLEMTU 进行 MTU 协商。在 MTU 未知的情况下，建议使用 20 字节为单位传输。
