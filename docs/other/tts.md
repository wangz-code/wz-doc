---
title: 微软TTS
toc: content
---

### 文字转语音

听说微软的文字转语音是声音最像人的人工智能引擎, 随后在 github 上找到一个开源的软件 [tts-vue](https://github.com/LokerL/tts-vue)
大致原理就是爬取微软演示界面的 API, 然后自行封装一下, 微软演示接口有字数限制, 拆分多次请求最后拼接到一起

### ts 文件 转 js

```shell
# 自动在当前目录下 生成同名的 js 文件
tsc xxx.ts

```

### 核心源码 剔除引用库

```typescript
function getXTime() {
  return new Date().toISOString();
}

function wssSend(connect: any, msg: string) {
  return new Promise((resolve, reject) => {
    connect.send(msg);
    resolve(true);
  });
}

function wssConnect(url: string) {
  return new Promise((resolve, reject) => {
    const socket = new WebSocket(url);
    socket.addEventListener('open', (event) => {
      resolve(socket);
    });
  });
}

async function getTTSData(
  inps: any,
  voice: string = '',
  express: string = '',
  role: string = '',
  rate = 0,
  pitch = 0,
) {
  let SSML = '';
  if (inps.activeIndex == '1') {
    SSML = `
    <speak xmlns="http://www.w3.org/2001/10/synthesis" xmlns:mstts="http://www.w3.org/2001/mstts" xmlns:emo="http://www.w3.org/2009/10/emotionml" version="1.0" xml:lang="en-US">
        <voice name="${voice}">
            <mstts:express-as  ${
              express != 'General' ? 'style="' + express + '"' : ''
            } ${role != 'Default' ? 'role="' + role + '"' : ''}>
                <prosody rate="${rate}%" pitch="${pitch}%">
                ${inps.inputValue}
                </prosody>
            </mstts:express-as>
        </voice>
    </speak>
    `;
  } else {
    // SSML = inps.inputValue;
    SSML = `<speak xmlns="http://www.w3.org/2001/10/synthesis" xmlns:mstts="http://www.w3.org/2001/mstts" xmlns:emo="http://www.w3.org/2009/10/emotionml" version="1.0" xml:lang="en-US"><voice name="zh-CN-XiaoxiaoNeural"><prosody rate="0%" pitch="0%">
		
		${inps.inputValue}
		</prosody></voice></speak>`;
  }
  console.log(SSML);

  // console.log("获取Token...");
  // const Authorization = await getAuthToken();
  const randomUUID =
    typeof crypto !== 'undefined' &&
    crypto.randomUUID &&
    crypto.randomUUID.bind(crypto);
  const XConnectionId = randomUUID().toUpperCase().replaceAll('-', '');

  console.log('创建webscoket连接...');
  console.log(XConnectionId);
  const connect: any = await wssConnect(
    `wss://eastus.api.speech.microsoft.com/cognitiveservices/websocket/v1?TrafficType=AzureDemo&Authorization=bearer%20undefined&X-ConnectionId=${XConnectionId}`,
  );

  console.log('第1次上报...');
  const message_1 = `Path: speech.config\r\nX-RequestId: ${XConnectionId}\r\nX-Timestamp: ${getXTime()}\r\nContent-Type: application/json\r\n\r\n{"context":{"system":{"name":"SpeechSDK","version":"1.19.0","build":"JavaScript","lang":"JavaScript","os":{"platform":"Browser/Linux x86_64","name":"Mozilla/5.0 (X11; Linux x86_64; rv:78.0) Gecko/20100101 Firefox/78.0","version":"5.0 (X11)"}}}}`;
  await wssSend(connect, message_1);

  console.log('第2次上报...');
  const message_2 = `Path: synthesis.context\r\nX-RequestId: ${XConnectionId}\r\nX-Timestamp: ${getXTime()}\r\nContent-Type: application/json\r\n\r\n{"synthesis":{"audio":{"metadataOptions":{"sentenceBoundaryEnabled":false,"wordBoundaryEnabled":false},"outputFormat":"audio-24khz-160kbitrate-mono-mp3"}}}`;
  await wssSend(connect, message_2);

  console.log('第3次上报...');
  const message_3 = `Path: ssml\r\nX-RequestId: ${XConnectionId}\r\nX-Timestamp: ${getXTime()}\r\nContent-Type: application/ssml+xml\r\n\r\n${SSML}`;
  await wssSend(connect, message_3);

  return new Promise((resolve, reject) => {
    connect.addEventListener('message', (event: any) => {
      console.log('Message from server ', event.data);
    });
    // let final_data = Buffer.alloc(0);
    // connect.on("text", (data: string | string[]) => {
    // 	if (data.indexOf("Path:turn.end") >= 0) {
    // 		console.log("已完成");
    // 		connect.close();
    // 		resolve(final_data);
    // 	}
    // });
    // connect.on("binary", function (response: { on: (arg0: string, arg1: { (): void; (): void }) => void; read: () => any }) {
    // 	console.log("正在接收数据...");
    // 	let data = Buffer.alloc(0);
    // 	response.on("readable", function () {
    // 		const newData = response.read();
    // 		if (newData) data = Buffer.concat([data, newData], data.length + newData.length);
    // 	});
    // 	response.on("end", function () {
    // 		const index = data.toString().indexOf("Path:audio") + 10;
    // 		const cmbData = data.slice(index + 2);
    // 		final_data = Buffer.concat([final_data, cmbData]);
    // 	});
    // });
    // connect.on("close", function (code: any, reason: any) {});
  });
}
export default getTTSData;
```
