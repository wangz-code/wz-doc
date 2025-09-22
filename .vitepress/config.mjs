import { defineConfig } from "vitepress";

export default defineConfig({
	title: "This Wz",
	description: "i love dream",
	sitemap: {
		hostname: "https://www.678998.xyz",
	},
	outDir: "./dist",
	themeConfig: {
		logo: "/logo.jpg",
		nav: [
			{ text: "首页", link: "/" },
			{ text: "Note", link: "/markdown-examples" },
		],
		search: {
			provider: "local",
		},
		outline: {
			level: 3,
			label: "页面导航",
		},
		sidebar: [
			{
				text: "linux相关",
				collapsed: false,
				items: [
					{ text: "ssl免费泛域名", link: "/docs/linux/ssl" },
					{ text: "vps安全ssh", link: "/docs/linux/vpsssh" },
					{ text: "vps使用UFW自动拦截", link: "/docs/linux/ufw" },
					{ text: "ubuntu远程唤醒", link: "/docs/linux/ubuntu" },
					{ text: "nginx缓存配置", link: "/docs/linux/nginx" },
					{ text: "xray重装", link: "/docs/linux/xrayonekey" },
					{ text: "xray免客户端", link: "/docs/linux/xray" },
					{ text: "git自建", link: "/docs/linux/git" },
				],
			},
			{
				text: "note",
				collapsed: false,
				items: [
					{ text: "edgeTTS", link: "/docs/note/edgetts" },
					{ text: "pnpm走代理", link: "/docs/note/pnpm" },
					{ text: "ffmpeg示例", link: "/docs/note/ffmpeg" },
					{ text: "小米4A刷入openwrt", link: "/docs/note/mirouter" },
					{ text: "openwrt配置", link: "/docs/note/openwrt" },
					{ text: "raspberry小车", link: "/docs/note/picar" },
				],
			},
			
			{
				text: "code备忘录",
				collapsed: true,
				items: [
					{ text: "golang", link: "/docs/code/go" },
					{ text: "nodejs", link: "/docs/code/reptile" },
				],
			},
			{
				text: "yolo",
				collapsed: true,
				items: [
					{ text: "yolo训练", link: "/docs/yolo/yolo" },
					{ text: "yolo目标检测", link: "/docs/yolo/opencv" },
				],
			},
			{
				text: "微信小程序",
				collapsed: true,
				items: [
					{ text: "wechat小程序蓝牙通讯", link: "/docs/webapp/bluetooth" },
					{ text: "wechat小程序NFC通讯", link: "/docs/webapp/nfc" },
				],
			},
			
			{
				text: "其他",
				collapsed: true,
				items: [
					{ text: "tvbox安卓", link: "/docs/other/video" },
					{ text: "tvbox爬虫", link: "/docs/other/tvboxjar" },
					{ text: "mac输入法", link: "/docs/other/input" },
					{ text: "bicycle组装山地车", link: "/docs/other/bicycle" },
					{ text: "pc组装台式机", link: "/docs/other/pc" },
					{ text: "iiipro奥利尼刹车", link: "/docs/other/iiir" },
					{ text: "zuk手机直供电", link: "/docs/other/zuk" },
					{ text: "测试长文章", link: "/docs/other/text" },
					{ text: "免责声明", link: "/docs/other/disclaimer" },
				],
			},
		],
		socialLinks: [{ icon: "github", link: "https://github.com/wangz-code" }],
	},
});
