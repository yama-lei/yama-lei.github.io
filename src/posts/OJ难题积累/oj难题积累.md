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



# 我的尝试

# Deepseek 解答

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

# MetaXiao's solution

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

