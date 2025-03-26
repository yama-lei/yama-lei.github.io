import{_ as t,c as p,d as n,e as i,g as o,b as r,r as s,o as c,f as l}from"./app-OYQg825M.js";const d={};function m(h,e){const a=s("center");return c(),p("div",null,[e[1]||(e[1]=n('<h1 id="_01背包问题" tabindex="-1"><a class="header-anchor" href="#_01背包问题"><span>01背包问题：</span></a></h1><p>它的目标是：给定一组物品，每个物品有自己的重量和价值，在不超过背包容量的前提下，如何选择物品使得总价值最大。</p><h3 id="不太正确的做法" tabindex="-1"><a class="header-anchor" href="#不太正确的做法"><span><strong>不太正确的做法</strong></span></a></h3><p>将物品按照性价比进行排序，性价比高的优先选择，便利数组。</p><p>错误之处：可能出现背包留下很大的空隙，反而因为无法装满而没有达到总价值最大。</p><p>比如：有商品如下<code>(value, space)</code> (5,10) (1,1) (1,1) (1,1).如果背包大小为12的话，按照上面的算法，就会最终有9个空间的剩余。</p><h3 id="正确的做法" tabindex="-1"><a class="header-anchor" href="#正确的做法"><span><strong>正确的做法</strong></span></a></h3><blockquote><p>Reference：<a href="https://zhuanlan.zhihu.com/p/345364527" target="_blank" rel="noopener noreferrer">咱就把0-1背包问题讲个通透！ - 知乎</a></p></blockquote><p>使用动态规划，<code>dp[i][j]</code>表示，在index为0~i的物品里面随便选择，能获得的最大价值。</p><h4 id="递推公式为" tabindex="-1"><a class="header-anchor" href="#递推公式为"><span>递推公式为：</span></a></h4><p>$$<br> dp[i][j]=max(dp[i-1][j],dp[i-1][j-space[i])]+value[i])<br> $$</p><p>代表的意思是：0~i的物品里面选最多j体积的物品，有两种可能：</p><ul><li><p>取了第i个物品，则最大价值为 value[i]+0-i-1个物品里面取体积为j-space[i]</p></li><li><p>没取第i个物品，如果没取这个物品，则最大价值和0~i-1里面取j体积的物品一样</p></li></ul><p><strong>取这两种可能的最大者</strong></p><hr><h4 id="dp数组初始化" tabindex="-1"><a class="header-anchor" href="#dp数组初始化"><span>dp数组初始化</span></a></h4><p>考虑到，如果体积j==0，那么一定有<code>dp[i][j]==0</code>;</p><p>如果i==0，那么有<code>dp[i][j] = 0 if j&lt;space[i] else j</code>;</p><p>其他的情况，只要保证<strong>初始值不大于 最终的正确值</strong>，通常来说可以初始化为0，除非有的物品价值为负数（此时应该赋值为一个很小的负数，理论上应该赋值$- \\infin$）</p><blockquote><p>比如说，如果某一个地方最终值应该是-19（在某些价值可能为负数的时候），在初始化的时候，不应该把这个地方赋值为0；</p></blockquote><hr><h4 id="dp数组遍历" tabindex="-1"><a class="header-anchor" href="#dp数组遍历"><span>dp数组遍历</span></a></h4><p>在遍历之前，我们先思考一下状态转移方程：<br> $$<br> dp[i][j]=max(dp[i-1][j],dp[i-1][j-space[i])]+value[i])<br> $$<br> 发现我们的每一个新状态，都依赖于前面i,j值更小的状态；因此一定是要讲i，j从小往大的方向遍历。</p><p>可以参考一下这幅图：</p><figure><img src="https://yamapicgo.oss-cn-nanjing.aliyuncs.com/picgoImage/image-20250315172252427.png" alt="image-20250315172252427" tabindex="0" loading="lazy"><figcaption>image-20250315172252427</figcaption></figure>',25)),i(a,null,{default:o(()=>e[0]||(e[0]=[l("图像来源于“代码随想录”，经过笔者加工，侵删")])),_:1}),e[2]||(e[2]=r("p",null,"图中那个点的值只依赖于ta上面的点和左上方的某个点，因此，只需要保证这个点左上方那一块全都正确地赋值，这个点就能得到正确的结果。",-1))])}const u=t(d,[["render",m],["__file","01背包.html.vue"]]),f=JSON.parse('{"path":"/posts/OJ%E9%9A%BE%E9%A2%98%E7%A7%AF%E7%B4%AF%E4%B8%8E%E5%AD%A6%E4%B9%A0/01%E8%83%8C%E5%8C%85.html","title":"01背包","lang":"zh-CN","frontmatter":{"title":"01背包","star":true,"description":"01背包问题： 它的目标是：给定一组物品，每个物品有自己的重量和价值，在不超过背包容量的前提下，如何选择物品使得总价值最大。 不太正确的做法 将物品按照性价比进行排序，性价比高的优先选择，便利数组。 错误之处：可能出现背包留下很大的空隙，反而因为无法装满而没有达到总价值最大。 比如：有商品如下(value, space) (5,10) (1,1) (1...","head":[["meta",{"property":"og:url","content":"https://github.com/yama-lei/yama-lei.github.io/posts/OJ%E9%9A%BE%E9%A2%98%E7%A7%AF%E7%B4%AF%E4%B8%8E%E5%AD%A6%E4%B9%A0/01%E8%83%8C%E5%8C%85.html"}],["meta",{"property":"og:site_name","content":"Myblog"}],["meta",{"property":"og:title","content":"01背包"}],["meta",{"property":"og:description","content":"01背包问题： 它的目标是：给定一组物品，每个物品有自己的重量和价值，在不超过背包容量的前提下，如何选择物品使得总价值最大。 不太正确的做法 将物品按照性价比进行排序，性价比高的优先选择，便利数组。 错误之处：可能出现背包留下很大的空隙，反而因为无法装满而没有达到总价值最大。 比如：有商品如下(value, space) (5,10) (1,1) (1..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:image","content":"https://yamapicgo.oss-cn-nanjing.aliyuncs.com/picgoImage/image-20250315172252427.png"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2025-03-21T02:00:27.000Z"}],["meta",{"property":"article:modified_time","content":"2025-03-21T02:00:27.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"01背包\\",\\"image\\":[\\"https://yamapicgo.oss-cn-nanjing.aliyuncs.com/picgoImage/image-20250315172252427.png\\"],\\"dateModified\\":\\"2025-03-21T02:00:27.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Yama-lei\\",\\"url\\":\\"/underbuilding.html\\"}]}"]]},"headers":[{"level":3,"title":"不太正确的做法","slug":"不太正确的做法","link":"#不太正确的做法","children":[]},{"level":3,"title":"正确的做法","slug":"正确的做法","link":"#正确的做法","children":[]}],"git":{"createdTime":1742522427000,"updatedTime":1742522427000,"contributors":[{"name":"yama-lei","username":"yama-lei","email":"1908777046@qq.com","commits":1,"url":"https://github.com/yama-lei"}]},"readingTime":{"minutes":2.28,"words":685},"filePathRelative":"posts/OJ难题积累与学习/01背包.md","localizedDate":"2025年3月21日","excerpt":"\\n<p>它的目标是：给定一组物品，每个物品有自己的重量和价值，在不超过背包容量的前提下，如何选择物品使得总价值最大。</p>\\n<h3><strong>不太正确的做法</strong></h3>\\n<p>将物品按照性价比进行排序，性价比高的优先选择，便利数组。</p>\\n<p>错误之处：可能出现背包留下很大的空隙，反而因为无法装满而没有达到总价值最大。</p>\\n<p>比如：有商品如下<code>(value, space)</code> (5,10) (1,1) (1,1) (1,1).如果背包大小为12的话，按照上面的算法，就会最终有9个空间的剩余。</p>\\n<h3><strong>正确的做法</strong></h3>","autoDesc":true}');export{u as comp,f as data};
