import { defineConfig } from "vitepress";
const prod = !!process.env.NETLIFY;

export default defineConfig({
	title: "This Wz",
	description: "i love dream",
	rewrites: {
		"en/:rest*": ":rest*",
	},
	sitemap: {
		hostname: "https://www.678998.xyz",
	},
	outDir: "../dist",
	themeConfig: {
		logo: { src: "/logo.jpg", width: 24, height: 24 },
		search: {
			provider: "local",
		},
		outline: {
			level: 3,
			label: "页面导航",
		},

		socialLinks: [{ icon: "github", link: "https://github.com/wangz-code" }],
	},
	locales: {
		root: { label: "English", lang: "en-US", dir: "ltr" },
		zh: { label: "简体中文", lang: "zh-Hans", dir: "ltr" },
	},
});
