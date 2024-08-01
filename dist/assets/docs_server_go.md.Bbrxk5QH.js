import{_ as s,c as i,o as a,a2 as n}from"./chunks/framework.DrxArEOS.js";const c=JSON.parse('{"title":"golang","description":"","frontmatter":{"title":"golang"},"headers":[],"relativePath":"docs/server/go.md","filePath":"docs/server/go.md"}'),t={name:"docs/server/go.md"},h=n(`<h2 id="生成随机数" tabindex="-1">生成随机数 <a class="header-anchor" href="#生成随机数" aria-label="Permalink to &quot;生成随机数&quot;">​</a></h2><div class="language-go vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">go</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  rand.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">Seed</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(time.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">Now</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">().</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">UnixNano</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">())</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">	r </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">:=</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> rand.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">Intn</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">60</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">)</span></span></code></pre></div><h2 id="定时函数" tabindex="-1">定时函数 <a class="header-anchor" href="#定时函数" aria-label="Permalink to &quot;定时函数&quot;">​</a></h2><div class="language-go vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">go</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  r</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">:=</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> 10</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  time.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">AfterFunc</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(time.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">Duration</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(r)</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">*</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">time.Minute, </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">func</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">() {</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">		// do something ...</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">	})</span></span></code></pre></div><h2 id="阻塞-main" tabindex="-1">阻塞 main <a class="header-anchor" href="#阻塞-main" aria-label="Permalink to &quot;阻塞 main&quot;">​</a></h2><div class="language-go vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">go</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">func</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> main</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">() {</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">  // do something..</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">	select</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> {} </span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">// 阻塞</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">}</span></span></code></pre></div><h2 id="休眠" tabindex="-1">休眠 <a class="header-anchor" href="#休眠" aria-label="Permalink to &quot;休眠&quot;">​</a></h2><div class="language-go vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">go</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">time.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">Sleep</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">10</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> *</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> time.Hour)</span></span></code></pre></div><h2 id="原生发起请求" tabindex="-1">原生发起请求 <a class="header-anchor" href="#原生发起请求" aria-label="Permalink to &quot;原生发起请求&quot;">​</a></h2><div class="language-go vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">go</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">func</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> get</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;">url</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> string</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">) {</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">  // func http.NewRequest(method string, url string, body io.Reader) (*http.Request, error)</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">	req, _ </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">:=</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> http.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">NewRequest</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(http.MethodGet, url, </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">nil</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">)</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">	cli </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">:=</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> http</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">Client</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">{</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">    // Transport RoundTripper</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">    // CheckRedirect func(req *Request, via []*Request) error</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">    // Jar CookieJar</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">		Timeout: time.Second </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">*</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> 10</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, </span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">// 请求超时timeout.</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">	}</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">	resp, err </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">:=</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> cli.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">Do</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(req)</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">  // 请求异常</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">	if</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> err </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">!=</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> nil</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> {</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">		fmt.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">Println</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(err)</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">		return</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">	}</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">  // 响应异常</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">	if</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> resp.StatusCode </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">!=</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> 200</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> {</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">    // do something...</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">	}</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">  // 延迟释放请求</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">	defer</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> resp.Body.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">Close</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">()</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">}</span></span></code></pre></div>`,10),l=[h];function p(e,k,r,d,E,g){return a(),i("div",null,l)}const y=s(t,[["render",p]]);export{c as __pageData,y as default};