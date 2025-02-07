---

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

return第一个大于（或小于）目标值的元素的迭代器，如果没找到，那么返回尾迭代器：

``` cpp
vector<int>a={1,3,4,6,10};
int x=lower_bound(a.begin(),a.end(),6)-a.begin();//x为第一个小于6的元素的迭代器；
int y=upper_bound(a.begin(),a.end(),6)-a.begin();
cout<<*x<<" "<<*y<<endl;
```

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



