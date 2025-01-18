import { defineConfig } from "vitepress";

// https://vitepress.dev/reference/site-config
export default defineConfig({
	title: "This dream",
	description: "i love dream",
	sitemap: {
		hostname: "https://www.678998.xyz",
	},
	outDir: "./dist",
	themeConfig: {
		footer: { message: `<a style="margin-right:10px" href="https://beian.miit.gov.cn" target="_blank">豫ICP备2022007076号</a>  <a style="margin-right:10px" href="https://beian.miit.gov.cn">豫ICP备2022007076号-1</a> <a href="/docs/other/disclaimer">免责声明</a>`, copyright: `Copyright © ${new Date().getFullYear()}-present Evan You` },
		logo: "/logo.jpg",
		nav: [
			{ text: "首页", link: "/" },
			{ text: "Blog", link: "/markdown-examples" },
		],
		sidebar: [
			{
				text: "小程序",
				collapsed: false,
				items: [
					{ text: "蓝牙", link: "/docs/webapp/bluetooth" },
					{ text: "JS", link: "/docs/webapp/js" },
					{ text: "NFC", link: "/docs/webapp/nfc" },
					{ text: "Markdown Examples", link: "/markdown-examples" },
					{ text: "Runtime API Examples", link: "/api-examples" },
				],
			},
			{
				text: "笔记",
				collapsed: false,
				items: [
					{ text: "pnpm", link: "/docs/note/pnpm" },
					{ text: "组装山地车", link: "/docs/note/bicycle" },
					{ text: "组装台式机", link: "/docs/note/pc" },
					{ text: "路由器刷机", link: "/docs/note/mirouter" },
					{ text: "Openwrt", link: "/docs/note/openwrt" },
					{ text: "树莓派小车", link: "/docs/note/picar" },
					{ text: "远程Ubuntu", link: "/docs/note/ubuntu" },
					{ text: "手机直供电", link: "/docs/note/zuk" },
					{ text: "yolo训练", link: "/docs/note/yolo" },
				],
			},
			{
				text: "后端",
				collapsed: false,
				items: [
					{ text: "go", link: "/docs/server/go" },
					{ text: "nginx", link: "/docs/server/nginx" },
					{ text: "opencv", link: "/docs/server/opencv" },
					{ text: "reptile", link: "/docs/server/reptile" },
				],
			},
			{
				text: "其他",
				collapsed: false,
				items: [
					{ text: "git", link: "/docs/other/git" },
					{ text: "xray onekey", link: "/docs/other/onekey" },
					{ text: "xray", link: "/docs/other/xray" },
					{ text: "tts", link: "/docs/other/tts" },
					{ text: "vps", link: "/docs/other/vps" },
					{ text: "ffmpeg", link: "/docs/other/ffmpeg" },
					{ text: "输入法", link: "/docs/other/input" },
					{ text: "安卓盒子", link: "/docs/other/video" },
					{ text: "长文章", link: "/docs/other/text" },
					{ text: "免责声明", link: "/docs/other/disclaimer" },
				],
			},
		],

		socialLinks: [{ icon: "github", link: "https://github.com/wangz-code" }],
	},
});
