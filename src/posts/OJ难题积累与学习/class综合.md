## 模拟堆区管理

**本题满分10分**

### 简介

堆是一种动态分配内存的数据结构，用于存储和管理动态分配的对象。它是一块连续的内存空间，用于存储程序运行时动态申请的内存。

堆可以被看作是一个由各个内存块组成的堆栈，其中每个内存块都有一个地址指针，指向下一个内存块。当程序需要分配内存时，堆会根据分配算法找到一块足够大的连续内存空间，并将其分配给程序。程序可以在堆中动态创建和销毁对象，而不需要在编译时确定对象的数量或大小。

与静态分配的栈不同，堆的内存分配不是自动的，需要显式地通过内存分配函数（如malloc、new等）来申请内存空间，并在不使用时通过释放函数（如free、delete等）来释放已分配的内存。这种动态的内存管理方式使得程序能够根据实际需要来动态调整内存的使用情况。

### 任务描述

该任务中，你将要使用链表的实现一个简化版的堆区管理。

首先我们定义一个堆区的内存基本单元结构体`MM_Struct`，它记录了堆区中一个`四字节单元`对应的信息（包括下一个单元，单元中储存的值）。

```
struct MM_Struct {    bool locked;    size_t size; //如果是一段连续分配内存的开头，就保存这段连续内存区域的大小。    int val;    MM_Struct *nxt;    MM_Struct() {        locked = false;        val = 0;        nxt = nullptr;    }}; // 表示一个4字节内存单元
```

在这里解释一下部分成员的含义

-   `locked`记录着这个内存单元是否已经被分配

-   ```
    size
    ```

    如果它是连续分配的一段内存区域的开头，那么

    ```
    size
    ```

    记录这段内存区域的大小，

    否则请设置为0

    -   **连续分配的一段内存区域的开头**指通过`Malloc(x)`分配的`x`字节区域的`第一个`四字节内存单元
    -   例如，`MM_Struct *p = heap->Malloc(12)`（`heap`是一个`Heap`类的对象，`Heap`类的定义见后文）会分配3个四字节单元，你需要给第一个单元的`size`设为`12`,其余两个单元设为`0`

接着，我们需要定义一个堆区的类，它包含了一个链表。具体如下：

```
class Heap {private:    MM_Struct *head;    size_t size;public:    Heap(size_t _size);    ~Heap();    size_t GetTotalSize() {return size;}    MM_Struct *Malloc(size_t size) ;    void Free(MM_Struct *p);    void output(MM_Struct *p);    void setval(MM_Struct *p, int x);};
```

这里解释一下各个成员变量的含义：

-   `head`是堆中4字节内存单元链表的头指针
-   `size`表示堆的**最大**容量（以字节为单位）（而不是“使用”/“分配”了多少内存）

### 任务0：实现构造和析构函数

注意：你需要在正确的位置归还所有通过`new`/库函数`malloc`申请的空间，否则评测时会报错。

### 任务1：实现`Malloc`和`Free`方法（40分）

用户可以调用`MM_Struct *Malloc(size_t x)`来分配链表中**连续的**且**可分配的**（未被分配过或已经通过Free方法释放的）若干字节，并返回第一个单元所在的地址。如果有多段区域满足条件，则分配**离`head`最近的区域**。

本题中，所有的字节数都是**大于0的4的倍数**。

如果出现堆区预先分配的大小不够大的情况，则需要在链表的**尾部**执行堆区扩容操作：我们约定，每一次扩容后的大小为**当前大小**的两倍。 例如：堆区本来的大小为`24`字节，我们需要通过`Malloc`方法分配`52`字节的空间，那么你的堆区将

-   先扩容两倍变成`48`字节，发现仍然不满足要求，需要继续扩容
-   再扩容两倍变为`96`字节，扩容后的堆区大小即`96`字节

用户调用`void Free(MM_Struct *p);`来释放以`p`开头的一段连续的空间。规定如下：

1.  在遇到`Free`一个*空指针*或*已经被释放的指针*或*还没有被分配过的指针*时，需要输出一行`"Segmentation Fault!\n"`，并**返回，继续执行其他代码，而不是直接让程序停止！**（在标准库函数`free`调用出现以上情况时，一般程序会直接抛出“段错误”而终止整个程序，但是我们实现的`Free`**不需要也不应该**终止整个程序）
2.  当`p`是一串通过`Malloc`分配的**连续的**内存区域的第一个单元时，需要把所有通过该`Malloc`分配的内容全部释放。
3.  如果遇到`p`是一串通过`Malloc`分配的**连续的**内存区域的**中间**某个单元（不是第一个单元）时，需要输出一行`"Error Free!\n"`并返回。
4.  释放一个单元时，我们需要把这个单元的`val`清零，如果单元保存着`size`，也要把`size`清零；将`locked`设置为`false`，并且把这个单元移动到链表的末尾，以避免制造内存碎片（思考一下可能有哪些corner cases）。

实现好这两个方法后，你可以在`main`函数中用以下代码来检测。

```
    Heap *heap = new Heap(12);    std::cout << heap->GetTotalSize() << std::endl;    MM_Struct *p = heap->Malloc(12);    std::cout << heap->GetTotalSize() << std::endl;    MM_Struct *q = heap->Malloc(4);    heap->Free(q);    std::cout << heap->GetTotalSize() << std::endl;    heap->Free(q);    std::cout << heap->GetTotalSize() << std::endl;        delete heap;
```

输出为

```
121224Segmentation Fault!24
```

测试点1将测试基本功能的实现，测试点2将测试一些Corner cases.

### 任务2：实现`setval`和`output`方法（40分）

用户可以调用`void setval(MM_Struct *p, int x)`来将`p`所在内存单元的值设为`x`，其中，如果`p`是空指针或指向未被分配的内存单元，那么输出一行`"Segmentation Fault!\n"`并**返回**（而不是结束整个程序）。

用户可以调用`void output(MM_Struct *p)`来输出`p`所指向内存单元保存的值，具体地，

1.  如果`p`是空指针或指向未被分配的内存单元，那么输出一行`"Segmentation Fault!\n"`并**返回**（而不是结束整个程序）。
2.  如果'p'是一串通过`Malloc`分配的**连续的**内存区域的第一个单元时，则输出一行这**一段**连续内存中每个单元的值`val`（如果不调用`setval`赋值，默认为`0`），两个数之间以空格隔开，行末换行。
3.  如果遇到`p`是一串通过`Malloc`分配的**连续的**内存区域的**中间**某个单元（不是第一个单元）时，需要输出这个单元的值`val`并换行。

实现好这两个方法后，你可以在`main`函数中用以下代码来检测

```
    Heap *heap = new Heap(12);    MM_Struct *p = heap->Malloc(12);    heap->setval(p, 1);    heap->setval(p->nxt, 2);    heap->setval(p->nxt->nxt, 3);    heap->output(p);    heap->output(p->nxt);    heap->output(nullptr);    delete heap;
```

输出为：

```
1 2 3 2Segmentation Fault!
```

测试点3将测试这两个方法的基本情况，测试点4将测试一些Corner cases.

### 任务3：综合测试（20分）

最后一个测试点将全面地检测堆的实现。

#### 提示

要注意一定要在合适的地方释放所有申请的动态对象，否则会通不过任何测试点。

### 关于Online Judge

我们会使用一个隐藏的头文件`mm.h`，里面定义了`MM_Struct`，你在调试过程中，可以使用如下的结构体类型。它会在创建新对象时，自动清零所有成员。

```
struct MM_Struct {    bool locked;    size_t size; //如果是一段连续分配内存的开头，就保存这段连续内存区域的大小。    int val;    MM_Struct *nxt;    MM_Struct() {        locked = false;        val = 0;        nxt = nullptr;        size = 0;    }}; // 表示一个4字节内存单元
```

但是，在你提交到OJ的内容中，不应该存在这个结构类型的定义，否则会出现编译错误。评测时的`MM_Struct`类型会在上述代码基础上稍作修改。

另外，请不要在程序中出现`main`函数。

### 本题禁止使用`vector`等STL库，在结束后会进行人工检查！

---

### My solution

This question is quite demanding!!!!!

```cpp
//heap.cpp
#include "heap.h"
#include <iostream>
using namespace std;

Heap::Heap(size_t _size)
{
    int num = _size / 4;
    size = _size;
    if (num > 0)
    {
        head = new MM_Struct();
        auto cur = head;
        for (int i = 1; i < num; i++)
        {
            cur->nxt=new MM_Struct();
            cur=cur->nxt;
        }
    }
    else
    {
        head = nullptr;
    }
    p_free = head;
    remainSize = size;
}
Heap::~Heap()
{
    // TODO
    while (head != nullptr)
    {
        auto temp = head->nxt;
        delete head;
        head = temp;
    }
}
MM_Struct *Heap::Malloc(size_t size)
{
    // TODO
    //cout << "Start Malloc size: " << size << " " << "Current size" << this->size << " Remainsize " << remainSize << " ";
    while (remainSize < size)
    {
        // 扩容
        auto cur = head;
        while (cur->nxt != nullptr)
        {
            cur = cur->nxt;
        }
        auto tail = cur;
        for (int i = 0; i < this->size / 4; i++)
        {
            tail->nxt = new MM_Struct();
            tail = tail->nxt;
        }
        remainSize += this->size;
        this->size *= 2;
    }
    p_free=head;
    while(p_free->locked){
        p_free=p_free->nxt;
    }
    auto returnPtr = p_free;
    p_free->locked = true;
    p_free->size = size; // 设置size
    p_free = p_free->nxt;
    for (int i = 1; i < size / 4; i++)
    {
        // 分配
        p_free->locked = true;
        p_free=p_free->nxt;
    }
    remainSize -= size;
   // cout << "End Malloc size: " << size << " " << "Current size" << this->size << " Remainsize " << remainSize << " \n";
    return returnPtr;
}
void Heap::Free(MM_Struct *p)
{
    if (p == nullptr ||!p->locked)
    {
        cout << "Segmentation Fault!\n";
        return;
    }
    if(p->size==0){
        cout<<"Error Free!\n";
        return;
    }
    // get tail:
    auto tail = head;
    while (tail->nxt != nullptr)
    {
        tail = tail->nxt;
    }

    int num = p->size / 4;
    remainSize += p->size;
    MM_Struct **deletedNode = new MM_Struct *[num];

    if (p == head)
    {
        for (int i = 0; i < num; i++)
        {
            p->locked = false;
            p->val = 0;
            p->size = 0;
            // 清除这个node的信息
            deletedNode[i] = p;
            p = p->nxt;
        }
        if(p==nullptr){
            return ;
        }
        tail->nxt = head;
        deletedNode[num - 1]->nxt = nullptr; // the lastnode
        head = p;
    }
    else
    {
        auto before_p = head;
        while (before_p->nxt != p)
        {
            before_p = before_p->nxt;
        }
        for (int i = 0; i < num; i++)
        {
            p->locked = false;
            p->val = 0;
            p->size = 0;
            // 清除这个node的信息
            deletedNode[i] = p;
            p = p->nxt;
        }
        if (p == nullptr)
        {
            // 本来就在末尾
        }
        else
        {
            before_p->nxt = p; // 跳过中间
            tail->nxt = deletedNode[0];
            deletedNode[num - 1]->nxt = nullptr;

        }
        //更新pfree
        p_free=head;
        while(p_free->locked){
            p_free=p_free->nxt;
            if(p_free==nullptr){
                return;
            }
        }


    }

    // TODO
    delete deletedNode;
}
void Heap::output(MM_Struct *p)
{
    if(p==nullptr||!p->locked){
        cout<<"Segmentation Fault!\n";
        return;
    }
    if(p->size==0){
        cout<<p->val<<endl;
        return ;
    }else{
        int num=p->size/4;
        for(int i=0;i<num;i++){
            cout<<p->val<<" ";
            p=p->nxt;
        }
        cout<<endl;
    }
}
void Heap::setval(MM_Struct *p, int x)
{
    // TODO
    if(p==nullptr||!p->locked){
        cout<<"Segmentation Fault!\n";
        return;
    }
    p->val=x;
}

void Heap::show()
{
    cout << "Size: " << size << " ";
    auto cur = head;
    while (cur != nullptr)
    {
        cout << cur->locked << " ";
        cur=cur->nxt;
    }
    cout<<endl;
}
```

```cpp
//heap.h
#ifndef HEAP_H
#define HEAP_H
#include "mm.h"
class Heap {
private:
    MM_Struct *head;
    size_t size; // 当堆区大小不够时，需要将大小变为原来的两倍
    //你可以添加其他的私有函数
    MM_Struct* p_free;
    int remainSize;
    public:
    Heap(size_t _size);
    ~Heap();
    size_t GetTotalSize() {return size;}
    MM_Struct *Malloc(size_t size);
    void Free(MM_Struct *p);
    void output(MM_Struct *p);
    void setval(MM_Struct *p, int x);
    void show();
};
#endif
```

```cpp
//mm.h
#include <cstddef>
struct MM_Struct {
    bool locked;
    size_t size; //如果是一段连续分配内存的开头，就保存这段连续内存区域的大小。
    int val;
    MM_Struct *nxt;
    MM_Struct() {
        locked = false;
        val = 0;
        nxt = nullptr;
        size = 0;
    }
}; // 表示一个4字节内存单元
```





```cpp
//GameEngine.h
#include <iostream>
#include <vector>
#include <cstring>
#include <assert.h>

using namespace std;

// 新增类型定义
typedef bool (*ProcessorFunc)(string&);  // 基础处理器
typedef ProcessorFunc (*StrategyGenerator)(const string&); // 策略生成器

bool formatStandardize(string& cmd);
bool removeCodes(string& s);

class GameEngine {
public:
    char* scene_desc;
    vector<StrategyGenerator> strategyGenerators;
    vector<ProcessorFunc> processors;
    vector<ProcessorFunc> activeProcessors;

    GameEngine(const char* desc);
    GameEngine();
    GameEngine(const GameEngine& other);
    GameEngine& operator=(const GameEngine& other);
    ~GameEngine();
    void addProcessor(bool (*func)(string&));
    void addStrategyGenerator(StrategyGenerator gen);
    bool processCommand(string& command);

    const char* getSceneDesc() const;

    GameEngine createBackup() const;
};

```



```cpp
#include "GameEngine.h"

GameEngine::GameEngine(){
    scene_desc = nullptr;
}

GameEngine::GameEngine(const char* desc){
    //TODO

}

GameEngine::GameEngine(const GameEngine& other){
    //TODO
}

GameEngine& GameEngine::operator=(const GameEngine& other) {
    if (this != &other) {
        delete[] scene_desc;
        const char* src = other.scene_desc;
        if (src) {
            scene_desc = new char[strlen(src)+1];
            strncpy(scene_desc, src,strlen(src));
        } else {
            scene_desc = nullptr;
        }
        processors = other.processors;
        strategyGenerators = other.strategyGenerators;
        activeProcessors = other.activeProcessors;
    }
    return *this;
}

GameEngine::~GameEngine(){
    //TODO

}

void GameEngine::addProcessor(bool (*func)(string&)){
    //TODO

}

void GameEngine::addStrategyGenerator(StrategyGenerator gen){
    //TODO

}

bool GameEngine::processCommand(string& command){
    //TODO
    //注意非法原命令不变
}

const char* GameEngine::getSceneDesc() const{
    //TODO
}

GameEngine GameEngine::createBackup()const{
    //TODO
}

bool formatStandardize(string& cmd) {
    //TODO
    //压缩空格并转化为小写
}

bool removeCodes(string& s) {
    //TODO

}

```

以下是两个题目分别以Markdown格式整理的内容：

## GameEngine

#### **任务要求**
- 实现一个命令处理类 `GameEngine`，并完成指定的功能。

#### **关卡排行榜**
- 暂无排名信息。

#### **部分知识回顾**
1. `RETURN_TYPE(*fp)(ARGLIST...);` 定义了一个函数指针类型的变量 `fp`，它可以指向返回值类型为 `RETURN_TYPE` 且参数列表为 `ARGLIST...` 的所有函数。
2. `string` 是一个字符串类，可以将其视为普通字符串。
3. `vector` 是一个容器类，类似数组。例如，`vector<int> a` 定义了一个存储整数的容器，可以通过 `a.push_back((int) b)` 向其末尾添加元素。

#### **任务描述**
日常生活中对命令的处理非常常见（例如游戏中的敏感词过滤）。你需要实现一个命令处理类 `GameEngine`，包含以下功能：
1. **构造函数**  
   - `GameEngine(const char* desc)`：初始化 `scene_desc`。
   - `GameEngine(const GameEngine& other)`：拷贝构造函数。
   - `~GameEngine()`：析构函数。
2. **成员函数**  
   - `void addProcessor(bool (*func)(string& s))`：添加一个处理器。
   - `void addStrategyGenerator(StrategyGenerator gen)`：添加一个生成器。
   - `bool processCommand(string& command)`：通过所有处理器处理命令 `command`，若成功返回 `true`，否则不改变 `command` 并返回 `false`。
   - `const char* getSceneDesc() const`：返回 `scene_desc`。
   - `GameEngine createBackup() const`：创建当前对象的副本，并在 `scene_desc` 前添加 `BACKUP:`。

3. **处理器实现**  
   - `bool formatStandardize(string& cmd)`：将命令中的大写字母转为小写，并压缩空格。
   - `bool removeCodes(string& s)`：删除 `#` 及其中间或后面的内容。

#### **注意**
1. 可以使用任何 STL 库（推荐熟练使用 `string` 库）。
2. 可以自定义任何函数或变量，但不要修改框架代码。
3. 注意拷贝构造函数的潜在问题。

#### **本地调试与测试样例**
```cpp
#include "GameEngine.h"
#include <iostream>
using namespace std;

int main() {
    GameEngine engine;
    engine.addProcessor(removeCodes);
    engine.addProcessor(formatStandardize);

    string cmd1 = "NJU#nju#Nju";
    string cmd2 = "Never   GiVe uP";
    string cmd3 = "Time#Flies";
    bool result1 = engine.processCommand(cmd1);
    bool result2 = engine.processCommand(cmd2);
    bool result3 = engine.processCommand(cmd3);

    cout << cmd1 << endl << cmd2 << endl << cmd3 << endl;
    cout << result1 << endl << result2 << endl << result3 << endl;
    return 0;
}
```

**输出：**

```
njunju
never give up
time
1
1
1
```

#### 我的错误：

1.   在遍历processCommand的时候，我错误地每一次都将处理的结果赋值给ok，结果导致ok只会记录最后一次的结果
2.   在processCommand的时候，如果得到的processor是nullptr，那么不应该把它push到activeProcessor里面去。

## Naive Pointer

#### **任务要求**
- 补全伪智能指针类 `SmartPointer`，实现动态内存管理。

#### **关卡排行榜**
- 暂无排名信息。

#### **考察知识点**
- 拷贝构造函数、析构函数。

#### **注意**
1. `*a++` 与 `(*a)++` 是不同的。
2. 注意边界条件（例如空指针）。

#### **任务描述**
智能指针是 C++ 标准库提供的一种机制，用于防止内存泄漏，及时回收不再需要的内存。本关要求你补全一个伪智能指针类 `SmartPointer`，它只能指向动态分配内存的 `Node` 类型对象。

#### **类结构**
```cpp
class Node;

class SmartPointer {
    Node* pointer;
    int* ref_cnt;

public:
    SmartPointer();
    SmartPointer(Node* p);
    SmartPointer(const SmartPointer& sptr);
    void assign(const SmartPointer& sptr);
    ~SmartPointer();
};
```

#### **功能需求**
1. **构造函数**  
   - `SmartPointer()`：初始化为空指针。
   - `SmartPointer(Node* p)`：初始化 `pointer` 和计数器 `ref_cnt`。
   - `SmartPointer(const SmartPointer& sptr)`：拷贝构造函数。
2. **成员函数**  
   - `void assign(const SmartPointer& sptr)`：将 `sptr` 赋值给当前对象。
   - `~SmartPointer()`：析构函数，释放内存。

#### **输出**
测评文件会根据 `Node` 对象析构时输出的 `id` 判断程序是否正确。

#### **样例**
**样例1：**

```cpp
SmartPointer sp1(new Node(1));
// 函数结束，此时 node1 应该被销毁
```
**输出：**

```
1
```

**样例2：**
```cpp
SmartPointer sp1(new Node(1));
SmartPointer* sp2 = new SmartPointer(sp1);
// 函数结束，sp1 被销毁，但 sp2 仍持有 node1 的地址
```
**输出：**

```
```

**样例3：**
```cpp
SmartPointer sp1(new Node(123));
sp1.~SmartPointer();
sp1.assign(SmartPointer()); // 测试空指针赋值
sp1.assign(*(new SmartPointer(new Node(456)))); // Node 456 仍然被持有
```
**输出：**
```
123
```

#### **提示**
1. 请确保代码鲁棒性，避免程序崩溃。
2. 不要在代码中包含 `"shared_ptr"` 字段。

#### **测试结果**
- 测试集1 ~ 测试集10。

### solution

```cpp
#include "SmartPointer.h"

SmartPointer::SmartPointer(const SmartPointer &sptr){
    //TODO
    pointer=sptr.pointer;
    ref_cnt=sptr.ref_cnt;
    if(ref_cnt!=nullptr){
        (*ref_cnt)+=1;
    }
}

void SmartPointer::assign(const SmartPointer &sptr){
    //TODO
    if(sptr.ref_cnt==ref_cnt){
        return;
    }
    if(ref_cnt!=nullptr){
        (*ref_cnt)-=1;
        if(*ref_cnt<=0){
            delete pointer;
            delete ref_cnt;
        }
    }
    ref_cnt=sptr.ref_cnt;
    pointer=sptr.pointer;
    if(ref_cnt!=nullptr){
        (*ref_cnt)+=1;
    }
}

SmartPointer::~SmartPointer(){
    //TODO
    if(ref_cnt!=nullptr){
        (*ref_cnt)-=1;
        if((*ref_cnt)<=0){
            delete pointer;
            delete ref_cnt;
        }
    }
    pointer=nullptr;
    ref_cnt=nullptr;
}
```

这道题对于边界情况的考虑很多：

1.   能否为自己赋值（assign自己的时候，应该直接return，因为可能出现先把自己delete的case）
2.   在delete之后，要将指针赋值为nullptr（防止悬浮指针）
3.   其他的与nullptr有关的内容

