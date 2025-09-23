import { defineConfig } from "vitepress";
import {
	groupIconMdPlugin
} from 'vitepress-plugin-group-icons';

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
	markdown: {
		codeTransformers: [
		  // We use `[!!code` in demo to prevent transformation, here we revert it back.
		  {
			postprocess(code) {
			  return code.replace(/\[\!\!code/g, '[!code')
			}
		  }
		],
		config(md) {
		  // TODO: remove when https://github.com/vuejs/vitepress/issues/4431 is fixed
		  const fence = md.renderer.rules.fence!
		  md.renderer.rules.fence = function (tokens, idx, options, env, self) {
			const { localeIndex = 'root' } = env
			const codeCopyButtonTitle = (() => {
			  switch (localeIndex) {
				case 'zh':
				  return '复制代码'
				default:
				  return 'Copy code'
			  }
			})()
			return fence(tokens, idx, options, env, self).replace(
			  '<button title="Copy Code" class="copy"></button>',
			  `<button title="${codeCopyButtonTitle}" class="copy"></button>`
			)
		  }
		  md.use(groupIconMdPlugin)
		}
	  },
});
