---
date: 2025-01-26
---

# class

## 定义类&创建实例

```cpp
class Car{
    public:
    	string owner;
  		void setOwner(string name){
			woner=name
        	};
};
//记得分号
Car Model_Y;
//创建一个Car的实例
Model_Y.setOwner('yama');
cout<<Model_Y.owner<<endl;
//output: Model_Y 
```

## 类访问修饰符

### 1. public：

可以在class的外部被访问

### 2. private:

只能在class的内部或者通过友元函数访问

### 3. protected:

只能在class的**内部**或者在子类的**内部**访问

---

### 实例：

```c++
#include<bits/stdc++.h>
using namespace std;
class Test{
    public:
    int a=0;
    double b=1;
    int  getPrivate(){
        return c;
    }
    private:
    int c=2;
    double d=4;
    protected:
    char ch='k';
};
//可以直接获取并修改到这里的的public成员，但是private和protected不能够直接通过实例获取到。

class sonClass: public Test{
    //采取public继承，有三种继承分别是public, private（by default）, protected.
    public: 
    char getFatherProtected(){
        return ch;
    }
};
int main(){
    sonClass son;
    Test t;
    cout<<t.a<<" "<<t.b<<" "<<t.getPrivate()<<endl;
    cout<<son.a<<" "<<son.b<<" "<<son.getFatherProtected();
}
```

>   注意
>
>   1.   protected和private无论在什么时候都不可以在类的外面通过实例直接访问到，如'instance.a'。
>   2.   protected中的成员可以在类和子类的内部访问。所谓内部访问其实就是只有在这个类的成员函数中才可以访问。
>   3.   private中的成员只有自己类和友元函数可以访问到。

---

## 构析函数和折构函数

构析函数在创建的时候调用,折构函数在销毁的时候调用：

```cpp
class Car{
    Car(){
        printf("I am created!\n");
    }
    ~Car(){
        printf("I am destoryed!");
    }
};

```

