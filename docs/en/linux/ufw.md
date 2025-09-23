---
title: ufw防火墙拦截封禁类似fail2ban
description: deebian使用 ufw 拦截恶意扫描ip
head:
  - - meta
    - name: keywords
      content: deebian ufw 拦截扫描 防火墙封禁
---
### 原理
根据 json 配置路径, 比如nginx日志匹配恶意扫描并使用 ufw封禁对应的ip


### golang 为例


```json
{
    "logs": [
        {
            "file": "/var/log/nginx/access.log",
            "name": "access",
            "rule": [
                "/.",
                ".php",
                "config.json",
                "/auth",
                "/login",
                "Yoohoo"
            ]
        }
    ]
}

```

```go
package main

import (
	"bufio"
	"encoding/json"
	"log"
	"os"
	"os/exec"
	"regexp"
	"strings"
	"time"

	"github.com/robfig/cron/v3"
)

type Rule struct {
	File string   `json:"file"`
	Name string   `json:"name"`
	Rule []string `json:"rule"`
}

type Config struct {
	Logs []Rule `json:"logs"`
}

func readConfig() (Config, error) {
	var conf Config
	file, err := os.Open("./config.json")
	if err != nil {
		log.Printf("无法打开文件: %v", err)
		return conf, err
	}
	defer file.Close()

	decoder := json.NewDecoder(file)
	err = decoder.Decode(&conf)
	if err != nil {
		log.Printf("解析配置文件出错: %v", err)
		return conf, err
	}
	log.Println("配置已加载:", conf)
	return conf, err
}

func ban(ip string) {
	// 构建UFW封禁命令 (永久封禁)
	cmd := exec.Command("ufw", "insert", "3", "deny", "from", ip, "to", "any")
	out, err := cmd.CombinedOutput()
	if err != nil {
		log.Println("err", err)
	}
	log.Println("combined out:", ip+" ", string(out))
}

// extractFirstIP 从字符串中提取第一个 IP 地址
func extractFirstIP(input string) (string, bool) {
	// 正则表达式，用于匹配 IP 地址
	ipRegex := regexp.MustCompile(`\b(?:\d{1,3}\.){3}\d{1,3}\b`)
	matches := ipRegex.FindStringSubmatch(input)
	if len(matches) > 0 {
		return matches[0], true // 返回第一个匹配的 IP 地址
	}
	return "", false // 如果没有匹配，返回空字符串
}

func checkBadIP(logLine string, rule []string) (string, bool) {
	for _, value := range rule {
		if strings.Contains(logLine, value) {
			ip, isFind := extractFirstIP(logLine)
			if isFind {
				return ip, true
			}
		}
	}
	return "", false
}

// 读取新的行并返回新增的行及更新后的行号
func readFile(filePath string, rule []string) error {
	file, err := os.Open(filePath)
	if err != nil {
		log.Printf("无法打开文件: %v", err)
		return nil
	}
	defer file.Close()
	scanner := bufio.NewScanner(file)

	type StringSet map[string]int
	var bakIP = make(StringSet)
	for scanner.Scan() {
		ip, isBad := checkBadIP(scanner.Text(), rule)
		if isBad {
			bakIP[ip] = 1
		}
	}
	if err := scanner.Err(); err != nil {
		log.Printf("读取文件时出错: %v", err)
	}
	for ip := range bakIP {
		ban(ip)
	}
	return nil
}

func task() {
	conf, _ := readConfig()
	for _, logConf := range conf.Logs {
		readFile(logConf.File, logConf.Rule)
	}
	log.Println("执行定时任务:", time.Now().Format("2006-01-02 15:04:05"))
}

func main() {
	task()
	// 创建一个新的 cron 调度器
	c := cron.New(cron.WithSeconds()) // 启用秒级精度
	// 添加定时任务，每天 22:00:00 执行  秒：0 分：0 时：22
	_, err := c.AddFunc("0 0 2 * * *", task)
	if err != nil {
		log.Println("定时任务:凌晨 2 点任务失败:", err)
		return
	}
	// 启动调度器
	c.Start()
	log.Println("定时任务已启动，每天2点执行")
	// 保持主程序运行
	select {}
}

```