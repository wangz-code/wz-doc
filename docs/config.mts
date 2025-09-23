import { defineAdditionalConfig } from "vitepress";
import { navGen, sidebarGen } from "./common";

export default defineAdditionalConfig({
	description: "Vite & Vue powered static site generator.",
	themeConfig: {
		nav: navGen(),
		sidebar: sidebarGen(),
		footer: {
			message: "Released under the MIT License.",
			copyright: "Copyright © 2019-present Evan You",
		},
	},
});
