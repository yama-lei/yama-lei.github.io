---
categories:
  - NJUCS
  - 高级程序设计
date: 2025-03-09 00:00:00
---

# STL算法

### sort

sort(arr.begin(),a.end(),cmp);按照cmp的方式进行排序，其中cmp函数接受两个参数（arr中的两个相邻元素），如果cmp返回的值为false，那么交换这两个元素。

```cpp
#include<bits/stdc++.h>
using namespace std;

typedef struct Student{
    string name;
    string id;
    int score;
}S;

bool cmp(S&s1,S&s2){
    if(s1.score==s2.score){
        return s1.name>s2.name;
    }
    return s1.score>s2.score;
}


int main{
    int n,m;
    cin>>n;
    vector<S>students;
    for(int i=0;i<n;i++){
        stirng name,id;
        int score;
        cin>>string>>id>>score;
        students.push_back((S){name,id,score});
    }
    sort(students.begin(),students.end(),cmp);
    for(S& stu:students){
        cout<<"Student name:"<<stu.name<<"score: "<<stu.score<<endl;
    }
}
```

### lower_bound 和 upper_bound

**lower_bound** return 第一个**大于或等于**目标元素的迭代器

**upper_bound** return 第一个**大于**目标元素的迭代器

结合lower_bound和upper_bound我们可以找到任意一个排序好的数据的区间

```cpp
    int len=10;
    int arr[len]={9,8,7,7,6,5,4,3,3,0};
    mySort(arr,0,len-1);
    cout<<"[3,7]"<<": ";
    int left1=lower_bound(arr,arr+len,3)-arr;
    int right1=upper_bound(arr,arr+len,7)-arr-1;
    print(arr,left1,right1);
    cout<<"[3,7)"<<": ";
    int left2=lower_bound(arr,arr+len,3)-arr;
    int right2=lower_bound(arr,arr+len,7)-arr-1;
    print(arr,left2,right2);
    cout<<"(3,7]"<<": ";
    int left4=upper_bound(arr,arr+len,3)-arr;
    int right4=upper_bound(arr,arr+len,7)-arr-1;
    print(arr,left4,right4);
    cout<<"(3,7)"<<": ";
    int left3=upper_bound(arr,arr+len,3)-arr;
    int right3=lower_bound(arr,arr+len,7)-arr-1;
    print(arr,left3,right3);
/*
输出：
[3,7]: 3 3 4 5 6 7 7 
[3,7): 3 3 4 5 6
(3,7]: 4 5 6 7 7
(3,7): 4 5 6
*/

```

**注意**：使用lower_bound来查找元素的时候，要确定：1. 得到的不是尾迭代器 2. 迭代器所指的值正是需要找的！

### swap

交换两个元素

### reverse

将序列进行翻转

```cpp
vector<int> arr={1,2,3};
reverse(a.begin(),a.end());
```

### next_permutation

将两个迭代器中间的部分按照自定义规则（默认是字典序）形成下一个排序，但是要注意，如果还存在可以排序的情况那么就return true， 如果没有新的排序了那就回return false。

**本质是得到下一个排序！！！**

如果想要得到某个序列的全排列，需要先将序列按照某种规则**进行排序**,

再将按照该规则的**升序序列** 不断运用`next_permutation`即可

```cpp
int arr[]={3,2,1};
sort(arr,arr+3,cmp);
while(next_permutaion(arr)){
    print(arr,arr+3);
}
//会打印5种排序（最开始的第一中没有打印，因为打印前已经用了next_permutaion）
```

