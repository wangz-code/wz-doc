import { defineConfig } from 'dumi';

export default defineConfig({
  outputPath: 'docs-dist',
  themeConfig: {
    logo: '/images/logo.png',
    name: 'wz-doc',
    footer: '豫ICP备2022007076号-1 豫ICP备2022007076号',
    socialLinks: {
      github: 'https://github.com/wangz-code',
    },
  },
  favicons: ['/images/favicon.png'],
});
