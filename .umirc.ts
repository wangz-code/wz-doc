import { defineConfig } from 'dumi';

const repo = 'MyStory';

export default defineConfig({
  title: repo,
  favicon: '/images/favicon.png',
  logo: '/images/logo.png',
  outputPath: 'docs-dist',
  locales: [['zh-CN', '中文']],
  mode: 'doc',
  hash: true,
  base: `./`,
  publicPath: `./`,
  navs: [],
  // more config: https://d.umijs.org/config
});
