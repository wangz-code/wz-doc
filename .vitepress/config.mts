import { defineConfig } from "vitepress";

// https://vitepress.dev/reference/site-config
export default defineConfig({
	title: "This dream",
	description: "i love dream",
	sitemap: {
		hostname: "https://www.678998.xyz",
	},
	outDir: './dist',
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
				collapsed: true,
				items: [
					{ text: "Markdown Examples", link: "/markdown-examples" },
					{ text: "Runtime API Examples", link: "/api-examples" },
				],
			},
			{
				text: "笔记",
				collapsed: true,
				items: [
					{ text: "组装山地车", link: "/docs/note/bicycle" },
					{ text: "组装台式机", link: "/docs/note/pc" },
					{ text: "路由器刷机", link: "/docs/note/mirouter" },
					{ text: "Openwrt", link: "/docs/note/openwrt" },
					{ text: "树莓派小车", link: "/docs/note/picar" },
					{ text: "远程Ubuntu", link: "/docs/note/ubuntu" },
					{ text: "手机直供电", link: "/docs/note/zuk" },
				],
			},
			{
				text: "其他",
				items: [
					{ text: "免责声明", link: "/docs/other/disclaimer" },
					{ text: "ffmpeg", link: "/other/ffmpeg" },
				],
			},
		],

		socialLinks: [{ icon: "github", link: "https://github.com/wangz-code" }],
	},
});
