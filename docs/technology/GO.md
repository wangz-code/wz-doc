---
title: GO工具人
---

# GO 工具人

---

## 生成随机数

```go
  rand.Seed(time.Now().UnixNano())
	r := rand.Intn(60)
```

## 定时函数

```go
  r:= 10
  time.AfterFunc(time.Duration(r)*time.Minute, func() {
		// do something ...
	})
```

## 阻塞 main

```go
func main() {
  // do something..
	select {} // 阻塞
}
```

## 休眠

```go
time.Sleep(10 * time.Hour)
```

## 原生发起请求

```go
func get(url string) {
  // func http.NewRequest(method string, url string, body io.Reader) (*http.Request, error)
	req, _ := http.NewRequest(http.MethodGet, url, nil)
	cli := http.Client{
    // Transport RoundTripper
    // CheckRedirect func(req *Request, via []*Request) error
    // Jar CookieJar
		Timeout: time.Second * 10, // 请求超时timeout.
	}
	resp, err := cli.Do(req)
  // 请求异常
	if err != nil {
		fmt.Println(err)
		return
	}

  // 响应异常
	if resp.StatusCode != 200 {
    // do something...
	}

  // 延迟释放请求
	defer resp.Body.Close()
}
```
