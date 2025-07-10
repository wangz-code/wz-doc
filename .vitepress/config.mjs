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
			{ text: "Blog", link: "/markdown-examples" },
		],
		sidebar: [
			{
				text: "笔记",
				collapsed: false,
				items: [
					{ text: "pnpm走代理", link: "/docs/note/pnpm" },
					{ text: "bicycle组装山地车", link: "/docs/note/bicycle" },
					{ text: "pc组装台式机", link: "/docs/note/pc" },
					{ text: "iiipro奥利尼刹车", link: "/docs/note/iiir" },
					{ text: "openwrt刷入小米4A", link: "/docs/note/mirouter" },
					{ text: "raspberry小车", link: "/docs/note/picar" },
					{ text: "ubuntu远程唤醒", link: "/docs/note/ubuntu" },
					{ text: "zuk手机直供电", link: "/docs/note/zuk" },
					{ text: "yolo训练", link: "/docs/note/yolo" },
					{ text: "yolo目标检测", link: "/docs/server/opencv" },
					{ text: "wechat小程序蓝牙通讯", link: "/docs/webapp/bluetooth" },
					{ text: "wechat小程序NFC通讯", link: "/docs/webapp/nfc" },
					{ text: "nginx缓存配置", link: "/docs/server/nginx" },
					{ text: "nodejs爬虫", link: "/docs/server/reptile" },
					{ text: "git自建", link: "/docs/other/git" },
					{ text: "xray重装", link: "/docs/other/onekey" },
					{ text: "xray免客户端", link: "/docs/other/xray" },
					{ text: "edge大声朗读", link: "/docs/other/edgetts" },
					{ text: "vps安全ssh", link: "/docs/other/vps" },
					{ text: "vps使用UFW自动拦截", link: "/docs/other/ufw" },
					{ text: "ffmpeg示例", link: "/docs/other/ffmpeg" },
					{ text: "mac输入法", link: "/docs/other/input" },
					{ text: "tvbox安卓", link: "/docs/other/video" },
					{ text: "tvbox爬虫", link: "/docs/other/tvboxjar"},
					{ text: "测试长文章", link: "/docs/other/text" },
					{ text: "免责声明", link: "/docs/other/disclaimer" },
				],
			},
		],
		socialLinks: [{ icon: "github", link: "https://github.com/wangz-code" }],
	},
});
