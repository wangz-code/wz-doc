import { defineConfig } from 'dumi';

export default defineConfig({
  ssr: {},
  chainWebpack(conf, { env, webpack }) {
    conf.output.filename('[name].server.js');
  },
  themeConfig: {
    logo: '/images/logo.png',
    name: 'wz-doc',
    footer:
      '<a style="margin-right:10px" href="https://beian.miit.gov.cn" target="_blank">豫ICP备2022007076号</a>  <a style="margin-right:10px" href="https://beian.miit.gov.cn">豫ICP备2022007076号-1</a> <a href="/other/disclaimer">免责声明</a>',
    socialLinks: {
      github: 'https://github.com/wangz-code',
    },
  },
  sitemap: { hostname: 'https://djgo.cc', exclude: [] },
  favicons: ['/images/favicon.png'],
});
