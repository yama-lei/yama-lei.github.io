import{_ as i,c as e,d as n,o}from"./app-Bw4AqEEi.js";const l="/assets/image-20250217111409374-Ddm9Ai3w.png",r="/assets/image-20250217125953166-E62ZghJd.png",s="/assets/image-20250217192637741-B5QGDQtx.png",a={};function g(p,t){return o(),e("div",null,t[0]||(t[0]=[n('<h1 id="二进制表示" tabindex="-1"><a class="header-anchor" href="#二进制表示"><span>二进制表示</span></a></h1><h2 id="_1-1-计算机系统概述" tabindex="-1"><a class="header-anchor" href="#_1-1-计算机系统概述"><span>1.1 计算机系统概述</span></a></h2><h3 id="冯诺依曼结构" tabindex="-1"><a class="header-anchor" href="#冯诺依曼结构"><span>冯诺依曼结构</span></a></h3><p>采用<strong>存储程序</strong>的工作方式</p><p>计算机由运算器，存储器，控制器，输入/输出设备（I/O设备）构成。</p><p>其中：</p><ul><li>存储器：存储指令和数据（指令和数据在计算机内部的表示方式一致，但是计算机由识别 他们的方法）</li><li>运算器：内部有<strong>ALU</strong>（arithmetic and logic unit）算数逻辑单元和通用寄存器组<strong>GPRs</strong>（General Purposed Register Set），<strong>是指令的执行单元</strong>;</li><li>控制器：<strong>自动地取出指令</strong>;内有指令寄存器<strong>IR</strong>(Instruction Register)和<strong>PC</strong>(Program Count)程序计数器，前者存放从主存中取来的指令</li><li>I/O设备，输入和输出</li></ul><figure><img src="'+l+'" alt="image-20250217111409374" tabindex="0" loading="lazy"><figcaption>image-20250217111409374</figcaption></figure><blockquote><p>CPU中 除了‘控制部件’都是运算器；</p><p>注意缩写的含义!</p><figure><img src="'+r+'" alt="image-20250217125953166" tabindex="0" loading="lazy"><figcaption>image-20250217125953166</figcaption></figure><p>图中内容来自教材</p></blockquote><h3 id="程序的表示和执行-核心" tabindex="-1"><a class="header-anchor" href="#程序的表示和执行-核心"><span>程序的表示和执行（核心！！！）</span></a></h3><ol><li>程序在执行前： <ul><li>将数据和指令存放在<strong>内存</strong>中</li><li>每一条指令和数据都有地址</li><li>指令有序存放 （但是不一定按序执行）</li><li>将程序的起始地址置入PC（Program Count）（PC其实是一个地址寄存器，用于寄存下一个指令的地址）</li></ul></li></ol><blockquote><p>程序执行前指的是“从点击鼠标”到执行第一条指令前的过程</p></blockquote><ol start="2"><li><p>程序执行的过程中：</p><ul><li><p>根据PC取指令</p></li><li><p>翻译PC指令中的操作码</p></li><li><p>根据操作码：取操作数，执行操作，将结果写入目的地址中</p></li><li><p><strong>修改PC为下一条指令的地址</strong>（这是指令依次执行的关键），再循环上述流程</p><blockquote><p>指令中通常包括以下信息：操作码（加减等）源操作数1 或/和 源操作数2（的地址） 目的操作数地址</p></blockquote></li></ul></li></ol><p>关于计算机读取指令的过程，还可以看下面deepseek r1生成的内容</p><blockquote><h4 id="_1-取指阶段-fetch" tabindex="-1"><a class="header-anchor" href="#_1-取指阶段-fetch"><span><strong>1. 取指阶段（Fetch）</strong></span></a></h4><ul><li><strong>目标</strong>：从内存中读取下一条指令。</li><li><strong>步骤</strong>： <ol><li><strong>程序计数器（PC）</strong>：控制器中的寄存器PC存储当前指令的内存地址。</li><li><strong>发送地址</strong>：控制器将PC中的地址发送到内存。</li><li><strong>读取指令</strong>：内存根据地址返回指令内容（二进制码）。</li><li><strong>存入指令寄存器（IR）</strong>：指令被临时存入控制器的<strong>指令寄存器（IR）</strong>。</li><li><strong>更新PC</strong>：PC自动+1（或根据跳转指令修改），指向下一条指令地址。</li></ol></li></ul><hr><h4 id="_2-解码阶段-decode" tabindex="-1"><a class="header-anchor" href="#_2-解码阶段-decode"><span><strong>2. 解码阶段（Decode）</strong></span></a></h4><ul><li><strong>目标</strong>：解析指令内容，确定操作类型和操作数。</li><li><strong>步骤</strong>： <ol><li><strong>拆分指令</strong>：指令分为<strong>操作码（Opcode）**和**操作数（Operand）</strong>。 <ul><li><strong>操作码</strong>：指明操作类型（如加法、跳转）。</li><li><strong>操作数</strong>：指明数据来源（如寄存器、内存地址）。</li></ul></li><li><strong>控制器生成控制信号</strong>：根据操作码，向各部件发送控制信号（如激活ALU、选择寄存器）。</li></ol></li></ul><hr><h4 id="_3-执行阶段-execute" tabindex="-1"><a class="header-anchor" href="#_3-执行阶段-execute"><span><strong>3. 执行阶段（Execute）</strong></span></a></h4><ul><li><strong>目标</strong>：完成指令规定的操作。</li><li><strong>可能的操作类型</strong>： <ul><li><strong>算术/逻辑运算</strong>（由ALU执行）： <ul><li>例如：<code>ADD R1, R2</code>（将寄存器R1和R2的值相加）。</li><li>控制器将R1和R2的数据送入ALU，ALU计算结果后存回指定寄存器。</li></ul></li><li><strong>数据移动</strong>： <ul><li>例如：<code>LOAD R1, 0x100</code>（将内存地址0x100的数据加载到R1）。</li><li>控制器从内存读取地址0x100的数据，存入寄存器R1。</li></ul></li><li><strong>控制流跳转</strong>： <ul><li>例如：<code>JMP 0x200</code>（跳转到地址0x200执行）。</li><li>直接修改PC的值，改变下一条指令地址。</li></ul></li></ul></li></ul><hr><h4 id="_4-写回阶段-write-back" tabindex="-1"><a class="header-anchor" href="#_4-写回阶段-write-back"><span><strong>4. 写回阶段（Write Back）</strong></span></a></h4><ul><li><strong>目标</strong>：将执行结果写回寄存器或内存。</li><li><strong>例如</strong>：运算结果存入寄存器，或内存地址更新数据。</li></ul></blockquote><hr><h3 id="计算机系统的抽象层" tabindex="-1"><a class="header-anchor" href="#计算机系统的抽象层"><span>计算机系统的抽象层</span></a></h3><figure><img src="'+s+'" alt="image-20250217192637741" tabindex="0" loading="lazy"><figcaption>image-20250217192637741</figcaption></figure><p><strong>软硬件交互--ISA</strong></p><p>ISA是硬件和软件之间的桥梁，规定了软件和硬件之间交互的接口；</p><p>ISA是一种规约，规定了可执行的指令的集合，以及指令可以接受的操作数的类型。</p><hr>',22)]))}const d=i(a,[["render",g],["__file","二进制表示.html.vue"]]),h=JSON.parse('{"path":"/posts/NJUCS/%E6%95%B0%E5%AD%97%E9%80%BB%E8%BE%91%E5%92%8C%E8%AE%A1%E7%AE%97%E6%9C%BA%E7%BB%84%E6%88%90/%E4%BA%8C%E8%BF%9B%E5%88%B6%E8%A1%A8%E7%A4%BA.html","title":"二进制表示","lang":"zh-CN","frontmatter":{"title":"二进制表示","description":"二进制表示 1.1 计算机系统概述 冯诺依曼结构 采用存储程序的工作方式 计算机由运算器，存储器，控制器，输入/输出设备（I/O设备）构成。 其中： 存储器：存储指令和数据（指令和数据在计算机内部的表示方式一致，但是计算机由识别 他们的方法） 运算器：内部有ALU（arithmetic and logic unit）算数逻辑单元和通用寄存器组GPRs（...","head":[["meta",{"property":"og:url","content":"https://github.com/yama-lei/yama-lei.github.io/posts/NJUCS/%E6%95%B0%E5%AD%97%E9%80%BB%E8%BE%91%E5%92%8C%E8%AE%A1%E7%AE%97%E6%9C%BA%E7%BB%84%E6%88%90/%E4%BA%8C%E8%BF%9B%E5%88%B6%E8%A1%A8%E7%A4%BA.html"}],["meta",{"property":"og:site_name","content":"Myblog"}],["meta",{"property":"og:title","content":"二进制表示"}],["meta",{"property":"og:description","content":"二进制表示 1.1 计算机系统概述 冯诺依曼结构 采用存储程序的工作方式 计算机由运算器，存储器，控制器，输入/输出设备（I/O设备）构成。 其中： 存储器：存储指令和数据（指令和数据在计算机内部的表示方式一致，但是计算机由识别 他们的方法） 运算器：内部有ALU（arithmetic and logic unit）算数逻辑单元和通用寄存器组GPRs（..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2025-02-17T11:41:17.000Z"}],["meta",{"property":"article:modified_time","content":"2025-02-17T11:41:17.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"二进制表示\\",\\"image\\":[\\"\\"],\\"dateModified\\":\\"2025-02-17T11:41:17.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Yama-lei\\",\\"url\\":\\"/underbuilding.html\\"}]}"]]},"headers":[{"level":2,"title":"1.1 计算机系统概述","slug":"_1-1-计算机系统概述","link":"#_1-1-计算机系统概述","children":[{"level":3,"title":"冯诺依曼结构","slug":"冯诺依曼结构","link":"#冯诺依曼结构","children":[]},{"level":3,"title":"程序的表示和执行（核心！！！）","slug":"程序的表示和执行-核心","link":"#程序的表示和执行-核心","children":[]},{"level":3,"title":"计算机系统的抽象层","slug":"计算机系统的抽象层","link":"#计算机系统的抽象层","children":[]}]}],"git":{"createdTime":1739792477000,"updatedTime":1739792477000,"contributors":[{"name":"yama-lei","username":"yama-lei","email":"1908777046@qq.com","commits":1,"url":"https://github.com/yama-lei"}]},"readingTime":{"minutes":3.42,"words":1027},"filePathRelative":"posts/NJUCS/数字逻辑和计算机组成/二进制表示.md","localizedDate":"2025年2月17日","excerpt":"\\n<h2>1.1 计算机系统概述</h2>\\n<h3>冯诺依曼结构</h3>\\n<p>采用<strong>存储程序</strong>的工作方式</p>\\n<p>计算机由运算器，存储器，控制器，输入/输出设备（I/O设备）构成。</p>\\n<p>其中：</p>\\n<ul>\\n<li>存储器：存储指令和数据（指令和数据在计算机内部的表示方式一致，但是计算机由识别 他们的方法）</li>\\n<li>运算器：内部有<strong>ALU</strong>（arithmetic and logic unit）算数逻辑单元和通用寄存器组<strong>GPRs</strong>（General Purposed Register Set），<strong>是指令的执行单元</strong>;</li>\\n<li>控制器：<strong>自动地取出指令</strong>;内有指令寄存器<strong>IR</strong>(Instruction Register)和<strong>PC</strong>(Program Count)程序计数器，前者存放从主存中取来的指令</li>\\n<li>I/O设备，输入和输出</li>\\n</ul>","autoDesc":true}');export{d as comp,h as data};
