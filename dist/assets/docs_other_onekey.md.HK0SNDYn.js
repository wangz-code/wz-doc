import{_ as e,c as a,o as t,a2 as s}from"./chunks/framework.DrxArEOS.js";const y=JSON.parse('{"title":"Xray onkey","description":"Xray onkey","frontmatter":{"title":"Xray onkey","description":"Xray onkey","head":[["meta",{"name":"keywords","content":"Xray onkey"}]]},"headers":[],"relativePath":"docs/other/onekey.md","filePath":"docs/other/onekey.md"}'),n={name:"docs/other/onekey.md"},l=s(`<h3 id="说明" tabindex="-1">说明 <a class="header-anchor" href="#说明" aria-label="Permalink to &quot;说明&quot;">​</a></h3><p>namesilo 原有的域名到期了, 迁移新域名的时候出了点问题, 这里记录一下, 便于后续重装</p><h3 id="准备工作" tabindex="-1">准备工作 <a class="header-anchor" href="#准备工作" aria-label="Permalink to &quot;准备工作&quot;">​</a></h3><ul><li>安装脚本 <a href="https://github.hscsec.cn/wulabing/Xray_onekey" target="_blank" rel="noreferrer">https://github.hscsec.cn/wulabing/Xray_onekey</a></li><li>安装/更新方式（Xray 前置） <code>wget -N --no-check-certificate -q -O install.sh &quot;https://raw.githubusercontent.com/wulabing/Xray_onekey/main/install.sh&quot; &amp;&amp; chmod +x install.sh &amp;&amp; bash install.sh</code></li></ul><p>这个脚本仅能用在 CentOS Linux 7 KVM x86_64 , 使用 CentOS 8 会报错 装的是第二个 WebSocket 回落并存模式</p><h3 id="使用记录" tabindex="-1">使用记录 <a class="header-anchor" href="#使用记录" aria-label="Permalink to &quot;使用记录&quot;">​</a></h3><p>刚装好之后感觉搜索有很大的延迟, youtube看起来也很卡顿, 想起来要安装BBR 遂找到文档 <a href="https://xtls.github.io/document/level-0/ch07-xray-server.html#_7-7-%E6%9C%8D%E5%8A%A1%E5%99%A8%E4%BC%98%E5%8C%96%E4%B9%8B%E4%B8%80-%E5%BC%80%E5%90%AF-bbr" target="_blank" rel="noreferrer">Xray BBR教程</a></p><p>主要是下面这两句:</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>4.fq, fq_codel, fq_pie, cake和其他算法哪个好？</span></span>
<span class="line"><span>一句话：看不懂的话，请保持fq，足够、且不会劣化你的线路</span></span>
<span class="line"><span></span></span>
<span class="line"><span>5.锐速、Finalspeed、LotServer 和其他“加速工具”</span></span>
<span class="line"><span>一句话：不要用这些！把他们丢进历史的垃圾桶吧！</span></span></code></pre></div><p>所以我就用了 <code>BBRplus+fq</code></p><p>脚本顺序:</p><ul><li><ol start="5"><li>安装 BBRplus新版内核</li></ol></li><li><ol start="19"><li>使用BBRplus+FQ版加速</li></ol></li><li><ol start="21"><li>系统配置优化</li></ol></li></ul><p>现在youtube 能看4K 视频了, 看起来并不卡, google搜索也比之前快了不少; 不确定是装了加速内核还是启用了系统优化</p>`,13),o=[l];function i(r,p,c,h,d,u){return t(),a("div",null,o)}const b=e(n,[["render",i]]);export{y as __pageData,b as default};