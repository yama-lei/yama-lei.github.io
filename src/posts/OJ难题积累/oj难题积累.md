---
title:OJ难题积累(luogu)
---

# P2089 烤鸡

## 题目背景

猪猪 Hanke 得到了一只鸡。

## 题目描述

猪猪 Hanke 特别喜欢吃烤鸡（本是同畜牲，相煎何太急！）Hanke 吃鸡很特别，为什么特别呢？因为他有 $10$ 种配料（芥末、孜然等），每种配料可以放 $1$ 到 $3$ 克，任意烤鸡的美味程度为所有配料质量之和。

现在， Hanke 想要知道，如果给你一个美味程度 $n$ ，请输出这 $10$ 种配料的所有搭配方案。

## 输入格式

一个正整数 $n$，表示美味程度。

## 输出格式

第一行，方案总数。

第二行至结束，$10$ 个数，表示每种配料所放的质量，按字典序排列。

如果没有符合要求的方法，就只要在第一行输出一个 $0$。

## 输入输出样例 #1

### 输入 #1

```
11
```

### 输出 #1

```
10
1 1 1 1 1 1 1 1 1 2 
1 1 1 1 1 1 1 1 2 1 
1 1 1 1 1 1 1 2 1 1 
1 1 1 1 1 1 2 1 1 1 
1 1 1 1 1 2 1 1 1 1 
1 1 1 1 2 1 1 1 1 1 
1 1 1 2 1 1 1 1 1 1 
1 1 2 1 1 1 1 1 1 1 
1 2 1 1 1 1 1 1 1 1 
2 1 1 1 1 1 1 1 1 1
```

## 说明/提示

对于 $100\%$ 的数据，$n \leq 5000$。



## 我的尝试

## Deepseek 解答

为了解决这个问题，我们需要找到所有可能的10种调料的组合，每种调料的克数可以是1到3克，使得它们的总和等于给定的美味程度n。我们需要按字典序输出所有可能的组合，并在没有解的情况下输出0。

### 方法思路
1. **问题分析**：每个调料的克数可以是1、2或3，总和必须等于给定的n。我们需要生成所有可能的组合，并按字典序排列。
2. **递归与回溯**：使用递归生成所有可能的组合，并在生成过程中剪枝，以避免不必要的计算。剪枝的条件是当前部分和加上剩余部分的最小可能和不能超过n，或者当前部分和加上剩余部分的最大可能和不能小于n。
3. **字典序排列**：在递归过程中按1、2、3的顺序尝试每个位置的数值，这样生成的组合自然按字典序排列。

### 解决代码
```python
n = int(input())
if n < 10 or n > 30:
    print(0)
else:
    result = []
    def backtrack(current, start_index, current_sum):
        if start_index == 10:
            if current_sum == n:
                result.append(current.copy())
            return
        remaining_positions = 10 - start_index - 1
        for a in [1, 2, 3]:
            new_sum = current_sum + a
            min_possible = new_sum + remaining_positions * 1
            max_possible = new_sum + remaining_positions * 3
            if n < min_possible or n > max_possible:
                continue
            current.append(a)
            backtrack(current, start_index + 1, new_sum)
            current.pop()
    
    backtrack([], 0, 0)
    print(len(result))
    for solution in result:
        print(' '.join(map(str, solution)))
```

### 代码解释
1. **输入处理**：读取输入的美味程度n，并检查其是否在有效范围内（10到30之间）。
2. **回溯函数**：`backtrack`函数递归生成所有可能的调料组合。参数包括当前组合、当前处理的调料位置和当前总和。
3. **剪枝条件**：在每一步递归中，计算剩余位置的最小和最大可能和，判断是否可能达到目标n，以决定是否继续递归。
4. **结果收集**：当递归处理完所有位置时，检查当前总和是否等于n，并将有效组合保存到结果列表中。
5. **输出结果**：输出结果的数量和所有有效组合，按字典序排列。

这种方法通过递归和剪枝高效地生成所有可能的解，并按字典序输出，确保在合理时间内处理所有可能的情况。

---

## MetaXiao's solution

```cpp
#include<bits/stdc++.h>
using namespace std;
int n, cnt = 0, curr[10];
vector<vector<int>> res;

void dfs(int* curr, int idx, int s, int trg, int& cnt, vector<vector<int>>& res)
{
    if (idx == 10)
    {
        if (s == trg)
        {
            res.push_back(vector<int>(curr, curr + 10));
            cnt++;
        }
        return;
    }
    if (s+(10-idx)>trg || s+(10-idx)*3<trg) return; 

    for (int i = 1; i <= 3; i++)
    {
        curr[idx]=i;
        dfs(curr, idx+1, s+i, trg, cnt, res);
    }
}

int main()
{
    cin >> n;
    if (n < 10 || n > 30)
    {
        cout << "0" << endl;
        return 0;
    }

    dfs(curr, 0, 0, n, cnt, res);
    cout << cnt << endl;
    for (const auto& result : res)
    {
        for (size_t j = 0; j < result.size(); j++)
            cout << result[j] << (j < 9 ? " " : "");
        cout << endl;
    }
}

```

# P1044 [NOIP 2003 普及组] 栈 | 递归

[题解 P1044 【栈】 - 洛谷专栏](https://www.luogu.com.cn/article/vj5wm9da)

## 题目背景

栈是计算机中经典的数据结构，简单的说，栈就是限制在一端进行插入删除操作的线性表。

栈有两种最重要的操作，即 pop（从栈顶弹出一个元素）和 push（将一个元素进栈）。

栈的重要性不言自明，任何一门数据结构的课程都会介绍栈。宁宁同学在复习栈的基本概念时，想到了一个书上没有讲过的问题，而他自己无法给出答案，所以需要你的帮忙。

## 题目描述

![](https://cdn.luogu.com.cn/upload/image_hosting/5qxy9fz2.png)

宁宁考虑的是这样一个问题：一个操作数序列，$1,2,\ldots ,n$（图示为 1 到 3 的情况），栈 A 的深度大于 $n$。

现在可以进行两种操作，

1. 将一个数，从操作数序列的头端移到栈的头端（对应数据结构栈的 push 操作）
2. 将一个数，从栈的头端移到输出序列的尾端（对应数据结构栈的 pop 操作）

使用这两种操作，由一个操作数序列就可以得到一系列的输出序列，下图所示为由 `1 2 3` 生成序列 `2 3 1` 的过程。

![](https://cdn.luogu.com.cn/upload/image_hosting/8uwv2pa2.png)

（原始状态如上图所示）

你的程序将对给定的 $n$，计算并输出由操作数序列 $1,2,\ldots,n$ 经过操作可能得到的输出序列的总数。

## 输入格式

输入文件只含一个整数 $n$（$1 \leq n \leq 18$）。

## 输出格式

输出文件只有一行，即可能输出序列的总数目。

## 输入输出样例 #1

### 输入 #1

```
3
```

### 输出 #1

```
5
```

## 说明/提示

**【题目来源】**

NOIP 2003 普及组第三题

## 我的尝试

```cpp
#include<bits/stdc++.h>
using namespace std;
int m;
long long nums[19];
long long getNum(int n){
    if(n<0) return 0;
    if(nums[n]!=0){
        return nums[n];
    }
    for(int i=1;i<=n;i++){
        nums[n]+=getNum(i-1)*getNum(n-i);
    }
    return nums[n];
}
int main(){
    cin>>m;
    nums[0]=1;
    nums[1]=1;
    nums[2]=2;
    nums[3]=5;
    cout<<getNum(m)<<endl;
}
```

# P1928 外星密码

## 题目描述

有了防护伞，并不能完全避免 2012 的灾难。地球防卫小队决定去求助外星种族的帮助。经过很长时间的努力，小队终于收到了外星生命的回信。但是外星人发过来的却是一串密码。只有解开密码，才能知道外星人给的准确回复。解开密码的第一道工序就是解压缩密码，外星人对于连续的若干个相同的子串 $\texttt{X}$ 会压缩为 $\texttt{[DX]}$ 的形式（$D$ 是一个整数且 $1\leq D\leq99$），比如说字符串 $\texttt{CBCBCBCB}$ 就压缩为 $\texttt{[4CB]}$ 或者$\texttt{[2[2CB]]}$，类似于后面这种压缩之后再压缩的称为二重压缩。如果是 $\texttt{[2[2[2CB]]]}$ 则是三重的。现在我们给你外星人发送的密码，请你对其进行解压缩。

## 输入格式

输入一行，一个字符串，表示外星人发送的密码。

## 输出格式

输出一行，一个字符串，表示解压缩后的结果。

## 输入输出样例 #1

### 输入 #1

```
AC[3FUN]
```

### 输出 #1

```
ACFUNFUNFUN
```

## 说明/提示

【数据范围】

对于 $50\%$ 的数据：解压后的字符串长度在 $1000$ 以内，最多只有三重压缩。

对于 $100\%$ 的数据：解压后的字符串长度在 $20000$ 以内，最多只有十重压缩。保证只包含数字、大写字母、`[` 和 `]`。

# P1102 A-B 数对 | 二分查找

## 题目背景

出题是一件痛苦的事情！

相同的题目看多了也会有审美疲劳，于是我舍弃了大家所熟悉的 A+B Problem，改用 A-B 了哈哈！

## 题目描述

给出一串正整数数列以及一个正整数 $C$，要求计算出所有满足 $A - B = C$ 的数对的个数（不同位置的数字一样的数对算不同的数对）。

## 输入格式

输入共两行。

第一行，两个正整数 $N,C$。

第二行，$N$ 个正整数，作为要求处理的那串数。

## 输出格式

一行，表示该串正整数中包含的满足 $A - B = C$ 的数对的个数。

## 输入输出样例 #1

### 输入 #1

```
4 1
1 1 2 3
```

### 输出 #1

```
3
```

## 说明/提示

对于 $75\%$ 的数据，$1 \leq N \leq 2000$。

对于 $100\%$ 的数据，$1 \leq N \leq 2 \times 10^5$，$0 \leq a_i <2^{30}$，$1 \leq C < 2^{30}$。

2017/4/29 新添数据两组

---

我的尝试：

```cpp
#include<bits/stdc++.h>
using namespace std;



int main(){
    long long int n,c;
    cin>>n>>c;
    vector<long long int> arr(n);
    for(long long int i=0;i<n;i++){
        scanf("%lld",&arr[i]);
    }
    sort(arr.begin(),arr.end());
    long long int max=arr[n-1];
    long long int pairs=0;
    long long int lastIndex=0;
    for(long long int i=0;i<n&&arr[i]+c<=max;i++){
        long long int thisIndex=lower_bound(arr.begin()+lastIndex,arr.end(),c+arr[i])-arr.begin();
        if(thisIndex!=n){
            lastIndex=thisIndex;
            if(arr[thisIndex]==arr[i]+c){
                int nums=0;
                while(thisIndex+nums<n&&arr[thisIndex+nums]==arr[thisIndex]){
                    nums+=1;
                }
                pairs+=nums;
            }
        }
    }
    cout<<pairs;
    return 0;
}
```

**TLE**

一个和我思路差不多，效率类似的算法

```cpp
#include<bits/stdc++.h>
using namespace std;

long long arr[200001];

int main(){
    int n,c;
    cin>>n>>c;
    for(int i=0;i<n;i++){
        scanf("%lld",arr+i);
    }
    sort(arr,arr+n);
    int pairs=0;
    for(int i=0;i<n;i++){
        pairs+=upper_bound(arr,arr+n,arr[i]+c)-lower_bound(arr,arr+n,arr[i]+c);
    }
    cout<<pairs;    
    return 0;

}
```

**WA**，也是测试点三

>   测试点三 输入是10000个1 和10000个2

**最后，把pairs从int改成了longlong之后就AC了**

从题解里面看到的一个很神奇的算法：

```
#include<bits/stdc++.h>
using namespace std;

long long arr[200001];
map<long long,long long> mp;
int main(){
    int n,c;
    cin>>n>>c;
    for(int i=0;i<n;i++){
        scanf("%lld",arr+i);
        mp[arr[i]]++;
        arr[i]-=c;
    }
    sort(arr,arr+n);
    long long ans=0;
    for(int i=0;i<n;i++){
        ans+=mp[arr[i]];
    }
    cout<<ans;
    return 0;
}
```

用两个map相互映射。

# P1873 [COCI 2011/2012 #5] EKO / 砍树 | 二分查找

## 题目描述

伐木工人 Mirko 需要砍 $M$ 米长的木材。对 Mirko 来说这是很简单的工作，因为他有一个漂亮的新伐木机，可以如野火一般砍伐森林。不过，Mirko 只被允许砍伐一排树。

Mirko 的伐木机工作流程如下：Mirko 设置一个高度参数 $H$（米），伐木机升起一个巨大的锯片到高度 $H$，并锯掉所有树比 $H$ 高的部分（当然，树木不高于 $H$ 米的部分保持不变）。Mirko 就得到树木被锯下的部分。例如，如果一排树的高度分别为 $20,15,10$ 和 $17$，Mirko 把锯片升到 $15$ 米的高度，切割后树木剩下的高度将是 $15,15,10$ 和 $15$，而 Mirko 将从第 $1$ 棵树得到 $5$ 米，从第 $4$ 棵树得到 $2$ 米，共得到 $7$ 米木材。

Mirko 非常关注生态保护，所以他不会砍掉过多的木材。这也是他尽可能高地设定伐木机锯片的原因。请帮助 Mirko 找到伐木机锯片的最大的整数高度 $H$，使得他能得到的木材至少为 $M$ 米。换句话说，如果再升高 $1$ 米，他将得不到 $M$ 米木材。

## 输入格式

第 $1$ 行 $2$ 个整数 $N$ 和 $M$，$N$ 表示树木的数量，$M$ 表示需要的木材总长度。

第 $2$ 行 $N$ 个整数表示每棵树的高度。

## 输出格式

$1$ 个整数，表示锯片的最高高度。

## 输入输出样例 #1

### 输入 #1

```
4 7
20 15 10 17
```

### 输出 #1

```
15
```

## 输入输出样例 #2

### 输入 #2

```
5 20
4 42 40 26 46
```

### 输出 #2

```
36
```

## 说明/提示

对于 $100\%$ 的测试数据，$1\le N\le10^6$，$1\le M\le2\times10^9$，树的高度 $\le 4\times 10^5$，所有树的高度总和 $>M$。

**我的尝试一**

```cpp
#include<bits/stdc++.h>
using namespace std;
typedef long long int LL;
int trees[1000000];
map<LL,LL> mp;

int biggerNum=0;
LL calculateCut(LL H,LL N){
    if(mp[H]!=0){
        return mp[H];
    }
    int index=upper_bound(trees,trees+N,H)-trees;
    LL sum=0;
    while(index!=N){
        sum+=trees[index]-H;
        index++;
    }
    biggerNum=N-index-1;
    mp[H]=sum;
    return sum;
}
int main(){
    LL N,M,sum=0,avr,cut,H;
    cin>>N>>M;
    for(int i=0;i<N;i++){
        scanf("%d",trees+i);
        sum+=trees[i];
    }
    sort(trees,trees+N);
    avr=sum/N;
    H=avr;
    while(!(calculateCut(H,N)>=M&&calculateCut(H-1,N)<M)){
        if(mp[H]>M){
            H+=((mp[H]-M)/biggerNum>1)?(mp[H]-M)/biggerNum:1;
        }else if(mp[H]==M){
            break;
        }else{
            H-=((M-mp[H])/biggerNum>1)?(M-mp[H])/biggerNum:1;
        }
    }
    cout<<H;
    return 0;
}
```

>    结果：1AC，9TLE...

看了qwen给的题解之后，我尝试用ta的方法：

```cpp
#include<bits/stdc++.h>
using namespace std;
typedef long long LL;
int main(){
    LL N,M,H;
    cin>>N>>M;
    vector<LL> trees(N,0);
    for(int i=0;i<N;i++){
        scanf("%d",&trees[i]);
    }
    sort(trees.begin(),trees.end());
    vector<LL>prefix_sum(N+1,0);
    prefix_sum[0]=0;
    for(int i=1;i<=N;i++){
        prefix_sum[i]=prefix_sum[i-1]+trees[i-1];
    }
    LL left=0,right=trees[N-1];
    LL mid=0;
    while(left<right){
        mid=(left+right)/2;
        LL idx=(upper_bound(trees.begin(),trees.end(),mid)-trees.begin());
        LL sum=prefix_sum[N]-prefix_sum[idx]-mid*(N-idx);
        if(sum>M){
            left=mid+1;
        }else if(sum<M){
            right=mid-1;
        }else{
            break;
        }
    }
    cout<<mid;
    return 0;
}
```

>   结果 4AC，6WA

再次经过qwen同学的指导：

>   发现，如果while循环的停止条件不对

```cpp
#include<bits/stdc++.h>
using namespace std;
typedef long long LL;
int main(){
    LL N,M,H;
    cin>>N>>M;
    vector<LL> trees(N,0);
    for(int i=0;i<N;i++){
        scanf("%d",&trees[i]);
    }
    sort(trees.begin(),trees.end());
    vector<LL>prefix_sum(N+1,0);
    prefix_sum[0]=0;
    for(int i=1;i<=N;i++){
        prefix_sum[i]=prefix_sum[i-1]+trees[i-1];
    }
    LL left=0,right=trees[N-1];
    LL mid=0;
    while(left<=right){
        mid=(left+right)/2;
        LL idx=(upper_bound(trees.begin(),trees.end(),mid)-trees.begin());
        LL sum=prefix_sum[N]-prefix_sum[idx]-mid*(N-idx);
        if(sum>M){
            left=mid+1;
        }else if(sum<M){
            right=mid-1;
        }else{
            break;
        }
    }
    mid=(left+right)/2;
    cout<<mid;
    return 0;
}
```

其他的解答：

```cpp
#include<bits/stdc++.h>
using namespace std;
typedef long long LL;
LL trees[1000001];
int main(){
    LL N,M,H;    
    cin>>N>>M;
    LL max=0;
    for(int i=0;i<N;i++){
        scanf("%lld",trees+i);
        if(trees[i]>max){
            max=trees[i];
        }
    }
    LL right=max,left=0;
    LL mid=(right+left)/2;
    while(left<=right){
        mid=(right+left)/2;
        LL sum=0;
        for(int i=0;i<N;i++){
            if(trees[i]>mid){
                sum+=(trees[i]-mid);
            }
        }
        if(sum<M){
            right=mid-1;
        }else if(sum>M){
            left=mid+1;
        }else{
            break;
        }
    }
    mid=(left+right)/2;
    cout<<mid;
}
```

