import { defineAdditionalConfig } from "vitepress";
import { navGen, sidebarGen } from "../common";


export default defineAdditionalConfig({
	description: "由 Vite 和 Vue 驱动的静态站点生成器",
	themeConfig: {
		nav: navGen('zh'),
		sidebar: sidebarGen('zh'),
		editLink: {
			pattern: "https://github.com/vuejs/vitepress/edit/main/docs/:path",
			text: "在 GitHub 上编辑此页面",
		},
		footer: {
			message: "基于 MIT 许可发布",
			copyright: "版权所有 © 2019-至今 尤雨溪",
		},

		docFooter: {
			prev: "上一页",
			next: "下一页",
		},

		outline: {
			label: "页面导航",
		},

		lastUpdated: {
			text: "最后更新于",
		},

		notFound: {
			title: "页面未找到",
			quote: "但如果你不改变方向，并且继续寻找，你可能最终会到达你所前往的地方。",
			linkLabel: "前往首页",
			linkText: "带我回首页",
		},

		langMenuLabel: "多语言",
		returnToTopLabel: "回到顶部",
		sidebarMenuLabel: "菜单",
		darkModeSwitchLabel: "主题",
		lightModeSwitchTitle: "切换到浅色模式",
		darkModeSwitchTitle: "切换到深色模式",
		skipToContentLabel: "跳转到内容",
	},
});
