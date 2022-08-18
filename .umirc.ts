import { defineConfig } from 'dumi';

const repo = 'MyStory';

export default defineConfig({
  title: repo,
  favicon: '/images/favicon.png',
  logo: '/images/logo.png',
  outputPath: 'docs-dist',
  locales: [['zh-CN', '中文']],
  mode: 'doc',
  hash: false,
  // Because of using GitHub Pages
  // base: `/${repo}/`,
  // publicPath: `/${repo}/`,
  navs: [],
  // more config: https://d.umijs.org/config
});
