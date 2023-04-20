import { defineConfig } from 'dumi';

export default defineConfig({
  outputPath: 'docs-dist',
  themeConfig: {
    logo: '/images/logo.png',
    name: 'wz-doc',
    footer: '<a href="https://beian.miit.gov.cn" target="_blank">豫ICP备2022007076号</a>  <a href="https://beian.miit.gov.cn">豫ICP备2022007076号-1</a>',
    socialLinks: {
      github: 'https://github.com/wangz-code',
    },
  },
  metas:[
    { name: 'keywords', content: 'nunu,js,javascript,蓝牙小程序,服务端,数据库,git,go,nodejs,输入法,ffmpeg视频处理,爬虫' },
    { name: 'description', content: '前端,后端,爬虫,蓝牙,小程序开发后端工作中遇到的经验碎碎念,balbala 之类的东西' },
  ],
  favicons: ['/images/favicon.png'],
});
