import{_ as t,c as i,d as a,o}from"./app-CNdfIOFZ.js";const l="/assets/image-20250228105251394-CIhVIk1m.png",n="/assets/image-20250228105333434-BiChIym4.png",s="/assets/image-20250228105343896-4QC3DtGj.png",p="/assets/image-20250228110021775-vAgDz9OU.png",g="/assets/image-20250228112500139-CL3BJ4l0.png",r="/assets/image-20250228095605847-B13e1Wdn.png",c="/assets/image-20250228113834753-BnF3-2Qw.png",m="/assets/image-20250228114607715-BhXzE9eP.png",d={};function h(u,e){return o(),i("div",null,e[0]||(e[0]=[a('<p>对应了实验123.</p><h2 id="逻辑门与数字抽象" tabindex="-1"><a class="header-anchor" href="#逻辑门与数字抽象"><span>逻辑门与数字抽象</span></a></h2><h3 id="逻辑门-logic-gate" tabindex="-1"><a class="header-anchor" href="#逻辑门-logic-gate"><span>逻辑门：logic gate</span></a></h3><p>直接上图：</p><div style="display:flex;width:33.3%;"><img src="'+l+'"><img src="'+n+'"><img src="'+s+'"></div> 上面的三种logic gate是基本逻辑门。 <figure><img src="'+p+'" alt="image-20250228110021775" tabindex="0" loading="lazy"><figcaption>image-20250228110021775</figcaption></figure><p>但是要记住这几种logic gate对应的运算符号。</p><ul><li>$A \\cdot B$, $\\overline{A}$, A+B</li><li>$A \\oplus B$</li><li>$A \\odot B$</li></ul><h3 id="数字抽象" tabindex="-1"><a class="header-anchor" href="#数字抽象"><span>数字抽象</span></a></h3><p><strong>数字抽象（逻辑采样）</strong>：将某个物理量的实际值集映射为两个子集，对应于两个状态或两个逻辑值0和1。</p><p>在数字系统中，将一定范围内的电压映射到两个状态：高态（high）和低态（low），并用0和1来表示。</p><p><strong>正逻辑</strong>将高电压映射为1，低电压映射为0；负逻辑则相反。</p><p>L or H stands for &#39;Low&#39; or &#39;High&#39;</p><ul><li>VIHmin：确保能被识别为高态的最小输入电压值。</li><li>VILmax：确保能被识别为低态的最大输入电压值。</li><li>VOHmin：输出为高态时的最小输出电压值。</li></ul><blockquote><p>VIHmin小于VOHmin,即<strong>输入识别的电压范围比较大，输出电压的范围比较窄</strong></p></blockquote><ul><li>VOLmax：输出为低态时的最大输出电压值。</li></ul><blockquote><p>VILmax大于VOLmax，理由同上。</p></blockquote><blockquote><figure><img src="'+g+'" alt="image-20250228112500139" tabindex="0" loading="lazy"><figcaption>image-20250228112500139</figcaption></figure><p>​ （图中表示输入输出的电压范围）</p></blockquote><h3 id="cmos晶体管" tabindex="-1"><a class="header-anchor" href="#cmos晶体管"><span>CMOS晶体管</span></a></h3><p>MOS是三极晶体管：</p><ul><li>gate栅极，通常是in的部分</li><li>source源极</li><li>drain漏极</li></ul><h4 id="nmos和pmos" tabindex="-1"><a class="header-anchor" href="#nmos和pmos"><span>NMOS和PMOS</span></a></h4><p>MOS常见的是下面这两种：<br><img src="'+r+'" width="50%/"></p><p>左边是NMOS,上面是漏极，下面是源极；右边的PMOS相反。</p><p>更重要的区别在与：</p><ul><li>对于NMOS，当Vgs&lt;=0的时候，电阻大不导通；当Vgs&gt;=0的时候导通</li><li>PMOS是，当Vgs&gt;=0的时候不导通，当Vgs&lt;0的时候导通。</li></ul><p><strong>即栅极和源极在上面的那个电平大的时候导通</strong></p><h4 id="cmos晶体管-1" tabindex="-1"><a class="header-anchor" href="#cmos晶体管-1"><span>CMOS晶体管</span></a></h4><p>利用NMOS和PMOS构成CMOS,下面是非门(左），与非门（右）的实现方式：</p><div style="display:flex;"><img src="'+c+'" width="50%"><img src="'+m+'" width="50%/"></div><p><strong>K输入</strong>：输入k个电压，通常小于4；因为会导致噪音增大。</p><p><strong>级联</strong>：将多个输入端较少的门电路级联，实现多数入。</p><p><strong>缓冲器</strong>：取两次非，将信号更加精准。</p><blockquote><p>由两个非门<strong>级联</strong>得到</p></blockquote><h2 id="布尔代数" tabindex="-1"><a class="header-anchor" href="#布尔代数"><span>布尔代数</span></a></h2>',36)]))}const E=t(d,[["render",h],["__file","数字逻辑基础.html.vue"]]),A=JSON.parse('{"path":"/posts/NJUCS/%E6%95%B0%E5%AD%97%E9%80%BB%E8%BE%91%E4%B8%8E%E8%AE%A1%E7%AE%97%E6%9C%BA%E7%BB%84%E6%88%90/%E6%95%B0%E5%AD%97%E9%80%BB%E8%BE%91%E5%9F%BA%E7%A1%80.html","title":"数字逻辑基础","lang":"zh-CN","frontmatter":{"title":"数字逻辑基础","description":"对应了实验123. 逻辑门与数字抽象 逻辑门：logic gate 直接上图： 上面的三种logic gate是基本逻辑门。 image-20250228110021775image-20250228110021775 但是要记住这几种logic gate对应的运算符号。 $A \\\\cdot B$, $\\\\overline{A}$, A+B $A \\\\opl...","head":[["meta",{"property":"og:url","content":"https://github.com/yama-lei/yama-lei.github.io/posts/NJUCS/%E6%95%B0%E5%AD%97%E9%80%BB%E8%BE%91%E4%B8%8E%E8%AE%A1%E7%AE%97%E6%9C%BA%E7%BB%84%E6%88%90/%E6%95%B0%E5%AD%97%E9%80%BB%E8%BE%91%E5%9F%BA%E7%A1%80.html"}],["meta",{"property":"og:site_name","content":"Myblog"}],["meta",{"property":"og:title","content":"数字逻辑基础"}],["meta",{"property":"og:description","content":"对应了实验123. 逻辑门与数字抽象 逻辑门：logic gate 直接上图： 上面的三种logic gate是基本逻辑门。 image-20250228110021775image-20250228110021775 但是要记住这几种logic gate对应的运算符号。 $A \\\\cdot B$, $\\\\overline{A}$, A+B $A \\\\opl..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2025-03-01T09:05:35.000Z"}],["meta",{"property":"article:modified_time","content":"2025-03-01T09:05:35.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"数字逻辑基础\\",\\"image\\":[\\"\\"],\\"dateModified\\":\\"2025-03-01T09:05:35.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Yama-lei\\",\\"url\\":\\"/underbuilding.html\\"}]}"]]},"headers":[{"level":2,"title":"逻辑门与数字抽象","slug":"逻辑门与数字抽象","link":"#逻辑门与数字抽象","children":[{"level":3,"title":"逻辑门：logic gate","slug":"逻辑门-logic-gate","link":"#逻辑门-logic-gate","children":[]},{"level":3,"title":"数字抽象","slug":"数字抽象","link":"#数字抽象","children":[]},{"level":3,"title":"CMOS晶体管","slug":"cmos晶体管","link":"#cmos晶体管","children":[]}]},{"level":2,"title":"布尔代数","slug":"布尔代数","link":"#布尔代数","children":[]}],"git":{"createdTime":1740819935000,"updatedTime":1740819935000,"contributors":[{"name":"yama-lei","username":"yama-lei","email":"1908777046@qq.com","commits":1,"url":"https://github.com/yama-lei"}]},"readingTime":{"minutes":2.14,"words":642},"filePathRelative":"posts/NJUCS/数字逻辑与计算机组成/数字逻辑基础.md","localizedDate":"2025年3月1日","excerpt":"<p>对应了实验123.</p>\\n<h2>逻辑门与数字抽象</h2>\\n<h3>逻辑门：logic gate</h3>\\n<p>直接上图：</p>\\n<div style=\\"display:flex;width: 33.3%\\">\\n\\n\\n\\n</div>\\n上面的三种logic gate是基本逻辑门。\\n<figure><figcaption>image-20250228110021775</figcaption></figure>\\n<p>但是要记住这几种logic gate对应的运算符号。</p>\\n<ul>\\n<li>$A \\\\cdot B$, $\\\\overline{A}$, A+B</li>\\n<li>$A \\\\oplus B$</li>\\n<li>$A \\\\odot B$</li>\\n</ul>","autoDesc":true}');export{E as comp,A as data};
