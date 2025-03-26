import{_ as i,c as a,d as n,o as l}from"./app-OYQg825M.js";const h={};function e(t,s){return l(),a("div",null,s[0]||(s[0]=[n(`<h1 id="p1219-usaco1-5-八皇后-checker-challenge" tabindex="-1"><a class="header-anchor" href="#p1219-usaco1-5-八皇后-checker-challenge"><span>P1219 [USACO1.5] 八皇后 Checker Challenge</span></a></h1><h2 id="题目描述" tabindex="-1"><a class="header-anchor" href="#题目描述"><span>题目描述</span></a></h2><p>一个如下的 $6 \\times 6$ 的跳棋棋盘，有六个棋子被放置在棋盘上，使得每行、每列有且只有一个，每条对角线（包括两条主对角线的所有平行线）上至多有一个棋子。</p><figure><img src="https://cdn.luogu.com.cn/upload/image_hosting/3h71x0yf.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><p>上面的布局可以用序列 $2\\ 4\\ 6\\ 1\\ 3\\ 5$ 来描述，第 $i$ 个数字表示在第 $i$ 行的相应位置有一个棋子，如下：</p><p>行号 $1\\ 2\\ 3\\ 4\\ 5\\ 6$</p><p>列号 $2\\ 4\\ 6\\ 1\\ 3\\ 5$</p><p>这只是棋子放置的一个解。请编一个程序找出所有棋子放置的解。<br> 并把它们以上面的序列方法输出，解按字典顺序排列。<br> 请输出前 $3$ 个解。最后一行是解的总个数。</p><h2 id="输入格式" tabindex="-1"><a class="header-anchor" href="#输入格式"><span>输入格式</span></a></h2><p>一行一个正整数 $n$，表示棋盘是 $n \\times n$ 大小的。</p><h2 id="输出格式" tabindex="-1"><a class="header-anchor" href="#输出格式"><span>输出格式</span></a></h2><p>前三行为前三个解，每个解的两个数字之间用一个空格隔开。第四行只有一个数字，表示解的总数。</p><h2 id="输入输出样例-1" tabindex="-1"><a class="header-anchor" href="#输入输出样例-1"><span>输入输出样例 #1</span></a></h2><h3 id="输入-1" tabindex="-1"><a class="header-anchor" href="#输入-1"><span>输入 #1</span></a></h3><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" data-title="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span>6</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div></div></div><h3 id="输出-1" tabindex="-1"><a class="header-anchor" href="#输出-1"><span>输出 #1</span></a></h3><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" data-title="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span>2 4 6 1 3 5</span></span>
<span class="line"><span>3 6 2 5 1 4</span></span>
<span class="line"><span>4 1 5 2 6 3</span></span>
<span class="line"><span>4</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="说明-提示" tabindex="-1"><a class="header-anchor" href="#说明-提示"><span>说明/提示</span></a></h2><p>【数据范围】<br> 对于 $100%$ 的数据，$6 \\le n \\le 13$。</p><p>题目翻译来自NOCOW。</p><p>USACO Training Section 1.5</p><h2 id="我的答案" tabindex="-1"><a class="header-anchor" href="#我的答案"><span>我的答案：</span></a></h2><div class="language-cpp line-numbers-mode" data-highlighter="shiki" data-ext="cpp" data-title="cpp" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;">#include</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;">&lt;bits/stdc++.h&gt;</span></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;">using</span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;"> namespace</span><span style="--shiki-light:#383A42;--shiki-dark:#E5C07B;"> std</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">;</span></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;">typedef</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;"> pair</span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;">&lt;int</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">,</span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;">int&gt;</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;"> P;</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">vector</span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;">&lt;</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">P</span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;">&gt;</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;"> queens;</span></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;">int</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;"> n;</span></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;">int</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;"> solutions</span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;">=</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66;">0</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">;</span></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;">inline</span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;"> bool</span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF;"> contradict</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">(</span><span style="--shiki-light:#C18401;--shiki-dark:#E5C07B;">P</span><span style="--shiki-light:#383A42;--shiki-light-font-style:inherit;--shiki-dark:#E06C75;--shiki-dark-font-style:italic;"> p1</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">, </span><span style="--shiki-light:#C18401;--shiki-dark:#E5C07B;">P</span><span style="--shiki-light:#383A42;--shiki-light-font-style:inherit;--shiki-dark:#E06C75;--shiki-dark-font-style:italic;"> p2</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">){</span></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;">    return</span><span style="--shiki-light:#E45649;--shiki-dark:#E5C07B;"> p1</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">.</span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75;">first</span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;">==</span><span style="--shiki-light:#E45649;--shiki-dark:#E5C07B;">p2</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">.</span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75;">first</span><span style="--shiki-light:#A626A4;--shiki-dark:#56B6C2;">||</span><span style="--shiki-light:#E45649;--shiki-dark:#E5C07B;">p1</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">.</span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75;">second</span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;">==</span><span style="--shiki-light:#E45649;--shiki-dark:#E5C07B;">p2</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">.</span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75;">second</span><span style="--shiki-light:#A626A4;--shiki-dark:#56B6C2;">||</span><span style="--shiki-light:#E45649;--shiki-dark:#E5C07B;">p1</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">.</span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75;">first</span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;">-</span><span style="--shiki-light:#E45649;--shiki-dark:#E5C07B;">p1</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">.</span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75;">second</span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;">==</span><span style="--shiki-light:#E45649;--shiki-dark:#E5C07B;">p2</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">.</span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75;">first</span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;">-</span><span style="--shiki-light:#E45649;--shiki-dark:#E5C07B;">p2</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">.</span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75;">second</span><span style="--shiki-light:#A626A4;--shiki-dark:#56B6C2;">||</span><span style="--shiki-light:#E45649;--shiki-dark:#E5C07B;">p1</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">.</span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75;">first</span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;">+</span><span style="--shiki-light:#E45649;--shiki-dark:#E5C07B;">p1</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">.</span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75;">second</span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;">==</span><span style="--shiki-light:#E45649;--shiki-dark:#E5C07B;">p2</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">.</span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75;">first</span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;">+</span><span style="--shiki-light:#E45649;--shiki-dark:#E5C07B;">p2</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">.</span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75;">second</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">;</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">}</span></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;">bool</span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF;"> couldPlace</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">(</span><span style="--shiki-light:#C18401;--shiki-dark:#E5C07B;">P</span><span style="--shiki-light:#383A42;--shiki-light-font-style:inherit;--shiki-dark:#E06C75;--shiki-dark-font-style:italic;"> p</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">){</span></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;">    for</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">(P queen:queens){</span></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;">        if</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">(</span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF;">contradict</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">(queen,p)){</span></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;">            return</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66;"> false</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">;</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">        }</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">    }</span></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;">    return</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66;"> true</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">;</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">}</span></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;">void</span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF;"> print</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">(){</span></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;">    for</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">(P p:queens){</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">        cout</span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;">&lt;&lt;</span><span style="--shiki-light:#E45649;--shiki-dark:#E5C07B;">p</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">.</span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75;">second</span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;">+</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66;">1</span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;">&lt;&lt;</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;">&quot; &quot;</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">;</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">    }</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">    cout</span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;">&lt;&lt;</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">endl;</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">}</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;">bool</span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF;"> find_P</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">(</span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;">int</span><span style="--shiki-light:#383A42;--shiki-light-font-style:inherit;--shiki-dark:#E06C75;--shiki-dark-font-style:italic;"> row</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">,</span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;">int</span><span style="--shiki-light:#383A42;--shiki-light-font-style:inherit;--shiki-dark:#E06C75;--shiki-dark-font-style:italic;"> start</span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;">=</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66;">0</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">){</span></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;">    bool</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;"> found</span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;">=</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66;">false</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">;</span></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;">    for</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">(</span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;">int</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;"> col</span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;">=</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">start;col</span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;">&lt;</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">n;col</span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;">++</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">){</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">            P </span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF;">newQueen</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">(row,col);</span></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;">            if</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">(</span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF;">couldPlace</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">(newQueen)){</span></span>
<span class="line"><span style="--shiki-light:#E45649;--shiki-dark:#E5C07B;">                queens</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">.</span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF;">push_back</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">(newQueen);</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">                found</span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;">=</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66;">true</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">;</span></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;">                if</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">(row</span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;">!=</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">n</span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;">-</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66;">1</span><span style="--shiki-light:#A626A4;--shiki-dark:#56B6C2;">&amp;&amp;!</span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF;">find_P</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">(row</span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;">+</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66;">1</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">)){</span></span>
<span class="line"><span style="--shiki-light:#E45649;--shiki-dark:#E5C07B;">                    queens</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">.</span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF;">pop_back</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">();</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">                    found</span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;">=</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66;">false</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">;</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">                }</span></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;">                if</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">(found){</span></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;">                    break</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">;</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">                }</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">            }</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">    }</span></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;">    if</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">(found){</span></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;">        if</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">(row</span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;">==</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">n</span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;">-</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66;">1</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">){</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">            solutions</span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;">+=</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66;">1</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">;</span></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;">            if</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">(solutions</span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;">&lt;=</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66;">3</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">){</span></span>
<span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF;">                print</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">();</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">            }</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">        }</span></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;">        int</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;"> col</span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;">=</span><span style="--shiki-light:#E45649;--shiki-dark:#E5C07B;">queens</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">.</span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF;">back</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">().</span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75;">second</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">;</span></span>
<span class="line"><span style="--shiki-light:#E45649;--shiki-dark:#E5C07B;">        queens</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">.</span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF;">pop_back</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">();</span></span>
<span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF;">        find_P</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">(row,col</span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;">+</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66;">1</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">);</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">    }</span></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;">    return</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;"> found;</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">}   </span></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;">int</span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF;"> main</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">(){</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">    cin</span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;">&gt;&gt;</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">n;</span></span>
<span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF;">    find_P</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">(</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66;">0</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">,</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66;">0</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">);</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">    cout</span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;">&lt;&lt;</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">solutions;</span></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;">    return</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66;"> 0</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">;</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">}</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><blockquote><p>上学期课上讲过八皇后问题，但是讲得实在没听懂；时隔几个月再来挑战，成功了；</p></blockquote><h1 id="p2392-kkksc03考前临时抱佛脚" tabindex="-1"><a class="header-anchor" href="#p2392-kkksc03考前临时抱佛脚"><span>P2392 kkksc03考前临时抱佛脚</span></a></h1><h2 id="题目背景" tabindex="-1"><a class="header-anchor" href="#题目背景"><span>题目背景</span></a></h2><p>kkksc03 的大学生活非常的颓废，平时根本不学习。但是，临近期末考试，他必须要开始抱佛脚，以求不挂科。</p><h2 id="题目描述-1" tabindex="-1"><a class="header-anchor" href="#题目描述-1"><span>题目描述</span></a></h2><p>这次期末考试，kkksc03 需要考 $4$ 科。因此要开始刷习题集，每科都有一个习题集，分别有 $s_1,s_2,s_3,s_4$ 道题目，完成每道题目需要一些时间，可能不等（$A_1,A_2,\\ldots,A_{s_1}$，$B_1,B_2,\\ldots,B_{s_2}$，$C_1,C_2,\\ldots,C_{s_3}$，$D_1,D_2,\\ldots,D_{s_4}$）。</p><p>kkksc03 有一个能力，他的左右两个大脑可以同时计算 $2$ 道不同的题目，但是仅限于同一科。因此，kkksc03 必须一科一科的复习。</p><p>由于 kkksc03 还急着去处理洛谷的 bug，因此他希望尽快把事情做完，所以他希望知道能够完成复习的最短时间。</p><h2 id="输入格式-1" tabindex="-1"><a class="header-anchor" href="#输入格式-1"><span>输入格式</span></a></h2><p>本题包含 $5$ 行数据：第 $1$ 行，为四个正整数 $s_1,s_2,s_3,s_4$。</p><p>第 $2$ 行，为 $A_1,A_2,\\ldots,A_{s_1}$ 共 $s_1$ 个数，表示第一科习题集每道题目所消耗的时间。</p><p>第 $3$ 行，为 $B_1,B_2,\\ldots,B_{s_2}$ 共 $s_2$ 个数。</p><p>第 $4$ 行，为 $C_1,C_2,\\ldots,C_{s_3}$ 共 $s_3$ 个数。</p><p>第 $5$ 行，为 $D_1,D_2,\\ldots,D_{s_4}$ 共 $s_4$ 个数，意思均同上。</p><h2 id="输出格式-1" tabindex="-1"><a class="header-anchor" href="#输出格式-1"><span>输出格式</span></a></h2><p>输出一行,为复习完毕最短时间。</p><h2 id="输入输出样例-1-1" tabindex="-1"><a class="header-anchor" href="#输入输出样例-1-1"><span>输入输出样例 #1</span></a></h2><h3 id="输入-1-1" tabindex="-1"><a class="header-anchor" href="#输入-1-1"><span>输入 #1</span></a></h3><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" data-title="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span>1 2 1 3		</span></span>
<span class="line"><span>5</span></span>
<span class="line"><span>4 3</span></span>
<span class="line"><span>6</span></span>
<span class="line"><span>2 4 3</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="输出-1-1" tabindex="-1"><a class="header-anchor" href="#输出-1-1"><span>输出 #1</span></a></h3><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" data-title="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span>20</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div></div></div><h2 id="说明-提示-1" tabindex="-1"><a class="header-anchor" href="#说明-提示-1"><span>说明/提示</span></a></h2><p>$1\\leq s_1,s_2,s_3,s_4\\leq 20$。</p><p>$1\\leq A_1,A_2,\\ldots,A_{s_1},B_1,B_2,\\ldots,B_{s_2},C_1,C_2,\\ldots,C_{s_3},D_1,D_2,\\ldots,D_{s_4}\\leq60$。</p><h2 id="我的解答" tabindex="-1"><a class="header-anchor" href="#我的解答"><span>我的解答</span></a></h2><p>没有ac</p><hr>`,50)]))}const p=i(h,[["render",e],["__file","搜索.html.vue"]]),d=JSON.parse('{"path":"/posts/OJ%E9%9A%BE%E9%A2%98%E7%A7%AF%E7%B4%AF%E4%B8%8E%E5%AD%A6%E4%B9%A0/%E6%90%9C%E7%B4%A2.html","title":"P1219 [USACO1.5] 八皇后 Checker Challenge","lang":"zh-CN","frontmatter":{"description":"P1219 [USACO1.5] 八皇后 Checker Challenge 题目描述 一个如下的 $6 \\\\times 6$ 的跳棋棋盘，有六个棋子被放置在棋盘上，使得每行、每列有且只有一个，每条对角线（包括两条主对角线的所有平行线）上至多有一个棋子。 上面的布局可以用序列 $2\\\\ 4\\\\ 6\\\\ 1\\\\ 3\\\\ 5$ 来描述，第 $i$ 个数字表示在第 $i...","head":[["meta",{"property":"og:url","content":"https://github.com/yama-lei/yama-lei.github.io/posts/OJ%E9%9A%BE%E9%A2%98%E7%A7%AF%E7%B4%AF%E4%B8%8E%E5%AD%A6%E4%B9%A0/%E6%90%9C%E7%B4%A2.html"}],["meta",{"property":"og:site_name","content":"Myblog"}],["meta",{"property":"og:title","content":"P1219 [USACO1.5] 八皇后 Checker Challenge"}],["meta",{"property":"og:description","content":"P1219 [USACO1.5] 八皇后 Checker Challenge 题目描述 一个如下的 $6 \\\\times 6$ 的跳棋棋盘，有六个棋子被放置在棋盘上，使得每行、每列有且只有一个，每条对角线（包括两条主对角线的所有平行线）上至多有一个棋子。 上面的布局可以用序列 $2\\\\ 4\\\\ 6\\\\ 1\\\\ 3\\\\ 5$ 来描述，第 $i$ 个数字表示在第 $i..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:image","content":"https://cdn.luogu.com.cn/upload/image_hosting/3h71x0yf.png"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2025-03-21T02:00:27.000Z"}],["meta",{"property":"article:modified_time","content":"2025-03-21T02:00:27.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"P1219 [USACO1.5] 八皇后 Checker Challenge\\",\\"image\\":[\\"https://cdn.luogu.com.cn/upload/image_hosting/3h71x0yf.png\\"],\\"dateModified\\":\\"2025-03-21T02:00:27.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Yama-lei\\",\\"url\\":\\"/underbuilding.html\\"}]}"]]},"headers":[{"level":2,"title":"题目描述","slug":"题目描述","link":"#题目描述","children":[]},{"level":2,"title":"输入格式","slug":"输入格式","link":"#输入格式","children":[]},{"level":2,"title":"输出格式","slug":"输出格式","link":"#输出格式","children":[]},{"level":2,"title":"输入输出样例 #1","slug":"输入输出样例-1","link":"#输入输出样例-1","children":[{"level":3,"title":"输入 #1","slug":"输入-1","link":"#输入-1","children":[]},{"level":3,"title":"输出 #1","slug":"输出-1","link":"#输出-1","children":[]}]},{"level":2,"title":"说明/提示","slug":"说明-提示","link":"#说明-提示","children":[]},{"level":2,"title":"我的答案：","slug":"我的答案","link":"#我的答案","children":[]},{"level":2,"title":"题目背景","slug":"题目背景","link":"#题目背景","children":[]},{"level":2,"title":"题目描述","slug":"题目描述-1","link":"#题目描述-1","children":[]},{"level":2,"title":"输入格式","slug":"输入格式-1","link":"#输入格式-1","children":[]},{"level":2,"title":"输出格式","slug":"输出格式-1","link":"#输出格式-1","children":[]},{"level":2,"title":"输入输出样例 #1","slug":"输入输出样例-1-1","link":"#输入输出样例-1-1","children":[{"level":3,"title":"输入 #1","slug":"输入-1-1","link":"#输入-1-1","children":[]},{"level":3,"title":"输出 #1","slug":"输出-1-1","link":"#输出-1-1","children":[]}]},{"level":2,"title":"说明/提示","slug":"说明-提示-1","link":"#说明-提示-1","children":[]},{"level":2,"title":"我的解答","slug":"我的解答","link":"#我的解答","children":[]}],"git":{"createdTime":1741939558000,"updatedTime":1742522427000,"contributors":[{"name":"yama-lei","username":"yama-lei","email":"1908777046@qq.com","commits":2,"url":"https://github.com/yama-lei"}]},"readingTime":{"minutes":3.06,"words":919},"filePathRelative":"posts/OJ难题积累与学习/搜索.md","localizedDate":"2025年3月14日","excerpt":"\\n<h2>题目描述</h2>\\n<p>一个如下的 $6 \\\\times 6$ 的跳棋棋盘，有六个棋子被放置在棋盘上，使得每行、每列有且只有一个，每条对角线（包括两条主对角线的所有平行线）上至多有一个棋子。</p>\\n<figure><img src=\\"https://cdn.luogu.com.cn/upload/image_hosting/3h71x0yf.png\\" alt=\\"\\" tabindex=\\"0\\" loading=\\"lazy\\"><figcaption></figcaption></figure>\\n<p>上面的布局可以用序列 $2\\\\ 4\\\\ 6\\\\ 1\\\\ 3\\\\ 5$ 来描述，第 $i$ 个数字表示在第 $i$ 行的相应位置有一个棋子，如下：</p>","autoDesc":true}');export{p as comp,d as data};
