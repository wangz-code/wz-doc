import{_ as s,c as i,o as a,a2 as n}from"./chunks/framework.DrxArEOS.js";const o=JSON.parse('{"title":"自建 Git","description":"自建 Git","frontmatter":{"title":"自建 Git","description":"自建 Git","head":[["meta",{"name":"keywords","content":"自建 Git"}]]},"headers":[],"relativePath":"docs/other/git.md","filePath":"docs/other/git.md"}'),l={name:"docs/other/git.md"},p=n(`<h2 id="自建-git" tabindex="-1">自建 Git <a class="header-anchor" href="#自建-git" aria-label="Permalink to &quot;自建 Git&quot;">​</a></h2><p>众所周知的原因 github 非常不稳定, 所以想要自建一个 git, 大致步骤如下</p><ul><li>安装 git</li><li>系统创建 git 用户</li><li>初始化 git 仓库</li><li>生成密钥 免密 clone pull push</li><li>禁用 git 用户使用 shell 登录</li></ul><hr><h3 id="环境介绍" tabindex="-1">环境介绍 <a class="header-anchor" href="#环境介绍" aria-label="Permalink to &quot;环境介绍&quot;">​</a></h3><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>CentOS 8</span></span>
<span class="line"><span>yum 4.4.2</span></span>
<span class="line"><span></span></span>
<span class="line"><span>假设服务器 ip 为 100.10.10.100</span></span></code></pre></div><h3 id="操作步骤" tabindex="-1">操作步骤 <a class="header-anchor" href="#操作步骤" aria-label="Permalink to &quot;操作步骤&quot;">​</a></h3><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># 切换到 su</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">sudo</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> su</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># 安装 git工具</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">yum</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> install</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> git</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># 增加用户名为 git 的用户 后续基本都是用 git 这个用户操作,</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">useradd</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> git</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># 为 git 用户设置密码 , 最好是大于 8 位 字符+数字,避免因弱密码设置失败</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">passwd</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> git</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># 添加一个存放git 仓库的文件夹位置在  /data/git-repository</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">mkdir</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> /data/git-repository</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># 将此文件夹授权给 git 用户,方便后续操作  chown -R [用户名称] [目录名称]</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">chmod</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> -R</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">  git</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> /data/git-repository</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># 切换到 git 用户</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">su</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> git</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># 初始化git仓库. &quot;sample&quot; 是项目名(仓库名)  </span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">git</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> init</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> --bare</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> /data/git-repository/sample.git</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># 现在就可以 clone 但是在 clone 时会让你输入 git 用户的密码, 为了避免每次操作都要输入密码, 我们使用密钥登录</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># 启用 ssh 公钥登录</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">vim</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> /etc/ssh/sshd_config</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># 找到这一行把下面这一行启用 默认是带#, 去掉前面的#号即启用 </span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># centos8 删减了 RSAAuthentication, 详细的原因 请参见: https://www.cnblogs.com/Leroscox/p/9627809.html</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># AuthorizedKeysFile .ssh/authorized_keys 这一行不用动 这是存储公钥的文件</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">PubkeyAuthentication</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> yes</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># 生成本机的密钥,  生成后存放在 /home/git/.ssh/ 目录下, 这个目录应该有两个文件(id_rsa,id_rsa.pub) id_rsa: 私钥注意保密 ,  id_rsa.pub: 公钥待会会用到</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># 其他的主机指令相同 win 下要使用 powersehll 或者 git bash 生成</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">ssh-keygen</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> -t</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> rsa</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> -b</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> 4096</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> -C</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> &quot;your_email@163.com&quot;</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># 1.先检查下  /home/git/.ssh/ 下有没有 authorized_keys 这个文件, 没有的话新建一个</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># 2.然后把生成的 id_rsa.pub 里的内容 copy 到 authorized_keys 中 应该是一行一个</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">authorized_keys:</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">第一行:</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> 放其他需要免密登录的</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> id_rsa.pub</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">第二行:</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> 放其他需要免密登录的</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> id_rsa.pub</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">第三行:</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> 放其他需要免密登录的</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> id_rsa.pub</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">......</span></span>
<span class="line"></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># 这个时候已经可以使用密钥登录了, 开始 clone; 命令解释 git clone [用户名]@[服务器 ip]:[仓库所在的路径]</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># clone 之后  pull , push 都不需要免密了 尽情操作吧</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">git</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> clone</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> git@100.10.10.100:/data/git-repository/sample.git</span></span>
<span class="line"></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># 为了安全起见, 需要把 git用户禁用shell登录</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">vim</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> /etc/passwd</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># 找到下面这一行, 把后面的 /bin/bash 修改为  /usr/bin/git-shell</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># 成功后 git 用户就无法登录了</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">git:x:1001:1001:,,,:/home/git:/bin/bash</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">修改为:</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> </span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">git:x:1001:1001:,,,:/home/git:/usr/bin/git-shell</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># 至此搭建完毕 参考资料</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">廖雪峰搭建</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> git</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> 服务器:</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> https://www.liaoxuefeng.com/wiki/896043488029600/899998870925664</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">生成本机密钥:</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> https://www.myfreax.com/how-to-set-up-ssh-keys-on-centos-8/</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">启用密钥登录:</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> https://www.cnblogs.com/Leroscox/p/9627809.html</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># 其他问题</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">如果看到有说不能访问</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> ~/.ssh/authorized_keys</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> 这个文件的，可以尝试下修改.ssh目录的权限为700，authorized_keys</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> 文件的权限为</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> 600</span></span></code></pre></div>`,8),t=[p];function h(e,k,r,d,F,g){return a(),i("div",null,t)}const y=s(l,[["render",h]]);export{o as __pageData,y as default};
