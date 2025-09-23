import { DefaultTheme } from "vitepress";

export const sidebar = {
	linux: {
		text: "linux相关",
		collapsed: false,
		items: [
			{ text: "ssl免费泛域名", link: "/ssl" },
			{ text: "vps安全ssh", link: "/vpsssh" },
			{ text: "vps使用UFW自动拦截", link: "/ufw" },
			{ text: "ubuntu远程唤醒", link: "/ubuntu" },
			{ text: "nginx缓存配置", link: "/nginx" },
			{ text: "xray重装", link: "/xrayonekey" },
			{ text: "xray免客户端", link: "/xray" },
			{ text: "git自建", link: "/git" },
		],
	},
	note: {
		text: "note",
		collapsed: false,
		items: [
			{ text: "edgeTTS", link: "/edgetts" },
			{ text: "pnpm走代理", link: "/pnpm" },
			{ text: "ffmpeg示例", link: "/ffmpeg" },
			{ text: "小米4A刷入openwrt", link: "/mirouter" },
			{ text: "openwrt配置", link: "/openwrt" },
			{ text: "raspberry小车", link: "/picar" },
		],
	},
	code: {
		text: "code备忘录",
		collapsed: false,
		items: [
			{ text: "golang", link: "/go" },
			{ text: "nodejs", link: "/reptile" },
		],
	},
	yolo: {
		text: "yolo",
		collapsed: false,
		items: [
			{ text: "yolo训练", link: "/yolo" },
			{ text: "yolo目标检测", link: "/opencv" },
		],
	},
	wechat: {
		text: "微信小程序",
		collapsed: false,
		items: [
			{ text: "小程序蓝牙通讯", link: "/bluetooth" },
			{ text: "小程序NFC通讯", link: "/nfc" },
		],
	},
	other: {
		text: "其他",
		collapsed: false,
		items: [
			{ text: "tvbox安卓", link: "/video" },
			{ text: "tvbox爬虫", link: "/tvboxjar" },
			{ text: "mac输入法", link: "/input" },
			{ text: "bicycle组装山地车", link: "/bicycle" },
			{ text: "pc组装台式机", link: "/pc" },
			{ text: "iiipro奥利尼刹车", link: "/iiir" },
			{ text: "zuk手机直供电", link: "/zuk" },
			{ text: "测试长文章", link: "/text" },
			{ text: "免责声明", link: "/disclaimer" },
		],
	},
};

export function sidebarGen(path = "") {
	const bar = {};
	const p = path ? "/" + path : "";
	for (const key in sidebar) {
		bar[`${p}/${key}/`] = { base: `/${key}/`, items: [sidebar[key]] };
	}
	return bar;
}

export function navGen(path = ""): DefaultTheme.NavItem[] {
	const nav = [] as DefaultTheme.NavItem[];
	const p = path ? "/" + path : "";
	for (const key in sidebar) {
		nav.push({
			text: sidebar[key].text,
			link: `${p}/${key}${sidebar[key].items[0].link}`,
			activeMatch: `/${key}/`,
		});
	}
	return nav;
}
