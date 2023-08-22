import { defineConfig } from 'dumi';

export default defineConfig({
  outputPath: 'docs-dist',
  themeConfig: {
    logo: '/images/logo.png',
    name: 'wz-doc',
    footer:
      '<a style="margin-right:10px" href="https://beian.miit.gov.cn" target="_blank">豫ICP备2022007076号</a>  <a style="margin-right:10px" href="https://beian.miit.gov.cn">豫ICP备2022007076号-1</a> <a href="/other/disclaimer">免责声明</a>   ',
    socialLinks: {
      github: 'https://github.com/wangz-code',
    },
  },
  metas: [
    {
      name: 'keywords',
      content:
        'js,javascript,小程序,服务端,数据库,git,go,nodejs,输入法,ffmpeg,折腾日记,电脑,游戏',
    },
    {
      name: 'description',
      content: '前端|后端|蓝牙|小程序日常折腾|技术笔记|电脑装机|ai绘图',
    },
  ],
  favicons: ['/images/favicon.png'],
});
