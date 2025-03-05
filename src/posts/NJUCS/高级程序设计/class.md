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

只能在class的内部或者通过友元函数访问；**不能在派生类中被访问！！**

>   如果您没有使用任何访问修饰符，类的成员将被假定为私有成员：

### 3. protected:

只能在class的**内部**或者在子类的**内部**访问；也可被友元函数访问。

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
>   4.   protected中的成员当然也可以被友元函数和友元

---

## 友元函数和友元类

友元函数在类的内部声明，但是并不是类的私有方法；友元函数可以访问private和protected的成员。

```cpp
class Car{
    public:
    string company="Tesla";
    void changeOwner(stirng newOwner){
        owner=newOwner;
    }
    private:
    string owner="yama";
    friend friendFunction(Car &car)；
    //友元函数可以访问到这里的private和protected方法
      friend class XiaomiCar;
    protected:
    string type="Model Y"; 
};

friendFunction(Car &car){
	cout<<car.owner<<endl; 
}

class XiaomiCar{
    pubilc:
  	void getOwner(){
	reutrn owner;
    }
    //友元类空访问所有的成员
}
```

## Inheritance

继承使得derived class获得base class的非private的properties和methods。

三种继承方式: 1. public 2. private 3. protected

### Public Inheritance

完全不变，public在derived class里面依旧是public；protected依旧是protected.

### Private Inheritance

public和protected都变成private，只能在类的内部访问，这也是默认的继承方式。

### Protected Inheritance

public变成protected

>   **无论哪种继承方式，都只改变原来类的protected和public的properties与methods；而private始终不变**

![image-20250126222042198](https://yamapicgo.oss-cn-nanjing.aliyuncs.com/picgoImage/image-20250126222042198.png)

## 操作符重载

重载的操作符要在public中定义

```cpp
#include<bits/stdc++.h>
using namespace std;
class Complex{

    public:
    int real=0;
    int imaginary=0;
    Complex(int r, int m){
        real=r;
        imaginary=m;
    }
    Complex operator+(Complex& other){
        return Complex(this->real+other.real,this->imaginary+other.imaginary);
    }
};
void print(Complex& c){
    printf("%d+%di",c.real,c.imaginary);
}

int main(){
    Complex c1(1,1);
    Complex c2(2,3);
    Complex c3=c1+c2;
    print(c3);
}
```

## 构造函数、拷贝函数、折构函数

### 构造函数

```cpp
class animal{
	public:
        animal(string name);//不能这样写：animal(string:name)
        string name;
};
animal::animal(string name): name(name){
//初始化列表
    cout<<"the animal is created!"<<endl;
};
```

### 拷贝函数

```c++
class animal{
	public:
        animal(string name);//不能这样写：animal(string:name):name(name){}，如果这样的话，就不需要在class之外再
    	animal(animal& animal)
        string name;//It is recommened not to use the same name! 
};
animal::animal(string name): name(name){
//初始化列表
    cout<<"the animal is created!"<<endl;
};

//usage:

```

>   可以自定义一个“深度拷贝”的拷贝函数，如果没有拷贝函数，那么就会默认生成一个浅拷贝的拷贝函数

**写类的时候拷贝函数和重载赋值操作符都是推荐的操作！！！**

### 折构函数 
折构函数在销毁的时候调用：

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

### 例子

```cpp
Vector(Vector& other):vsize(other.vsize),vcapacity(other.vcapacity){
    arr=new int[other.vcapacity];
    for(int i=0;i<other.vsize;i++){
        arr[i]=other.arr[i];
    }
}
~Vector(){
    cout<<"the Vector is destoryed successfully!"<<endl;
    delete[] arr;
}
Vector& operator=(Vector& other){
    if(other.arr!=arr){
        delete[] arr;
        vsize=other.vsize;
        vcapacity=other.vcapacity;
        arr=new int[vsize];
        for(int i=0;i<vsize;i++){
            arr[i]=other.arr[i];
        }
    }
    return *this;
}
```

### 操作符重载

#### 重载赋值=

#### 重载<<

[C++ 输入输出运算符重载 | 菜鸟教程](https://www.runoob.com/cplusplus/input-output-operators-overloading.html)

```cpp
    friend ostream operator<<(ostream& os, Vector& v){
        os<<"[ ";
        for(int i=0;i<v.vsize;i++){
            os<<v.arr[i]<<', ';
        }
        os<<"]"<<endl;
    }
//需要写一个友元函数，重载<<操作符。
```

### 静态成员

#### 变量

1.   **Shared** across all objects of the class.
2.   Declared with `static` inside the class.Must be **initialized outside the class** (e.g., `int Counter::count = 0;`).



#### 函数

1.   可以通过类来访问，也可由instance来访问
2.   **只能访问到类的静态成员（函数，和变量）以及类之外的全局函数**

```cpp
#include<bits/stdc++.h>
using namespace std;

class Counter{
    public:
    static int counts;
    string name;
    Counter(string name):name(name){
        cout<<"A new Counter called "<<name<<" is created!\n";
    }
    ~Counter(){
        cout<<"Counter "<<name<<" is distroyed!\n";
    }
    Counter(Counter& c):name(c.name){
        cout<<"A copy of "<<c.name<<"is created!\n";
    }
    static void count(){
        counts+=1;
    }
    /*static void callName(){
        cout<<name<endl;
    }
    Error! Because you can't access the unstatic members!
    */
    Counter& operator=(Counter& c){
        if(c.name!=name){
            name=c.name;
        }
        return *this;
    }
    friend ostream& operator<<(ostream& out, const Counter& c){
        out<<"Counter "<<c.name<<" is printed! ";
        return out;
    }
};
int Counter::counts=0;//the static member of a nnumber should be initialized outside the calss(but should //be declared inside the class)
//Counter::counts=0 is false,because we haven't initailize it yet!

int main(){
    Counter c1("Xiao");
    cout<<Counter::counts<<endl;
    Counter c2(c1);
    cout<<Counter::counts<<endl;
    Counter::counts+=1;
    cout<<Counter::counts<<endl;
    c1.count();
    c2.count();
    cout<<Counter::counts<<endl;
    cout<<c1<<endl;
    cout<<c1.counts<<" ";
    return 0;
}
```

但是在定义静态成员变量的时候也是可以采取`inline static int count=0;`的方法

## Polymorphism 

### Virtual function

1.   defined inside the class with a keyword `virtual`
2.   can be **overriden** in the derived class

```cpp
class A{
    public:
    virtual void fun() const{
        cout<<"a"<<endl;
    }
};
//A public 继承B, base class的public仍是public，private仍是private。
class B: public A{
	public:
    void fun() const override {
	cout<<"b\n";
    }
    int other_varible=10;
	protected：
    void f(){
        cout<<"Protected function"\n<<endl;
    }
};
int main(){
	A* ptr=new B;
    ptr->fun();
    //output: b
    cout<<ptr->other_varible<<endl;//Error
    ptr->f();//Error
}
```

And it's easy to find we have used `const` keyword, it's used to declare that the function cannot modify the state of the class.

**It’s a promise to the compiler and users of the class that the function is "read-only."**

But the keyworfd `const` is **not mandatory** (We can define a virtual function that is readable and writable)

 

###  Dynamic cast

We konw that we can define a pointer of base class like this :

```cpp
BaseClass* ptr=new DerivedClass
```

And we can access the virtual function :

```cpp
ptr->virtualFunction();
//If the base class overrides the virtual function, then call that function in the derived class, otherwise the base class.
```

But this pointer is base class type, which **cannot access other members of the derived class!**

We need **Dynamic cast** to achieve this!

```cpp
#include<bits/stdc++.h>
using namespace std;
class A{
    public:
    virtual void fun() const{
        cout<<"a"<<endl;
    }
};
//A public 继承B, base class的public仍是public，private仍是private。

class B: public A{
	public:
    void fun() const override {
	cout<<"b\n";
    }
    int other_varible=10;
	protected:
    void f(){
        cout<<"Protected function\n"<<endl;
    }
};

int main(){
	A* ptr=new B; // Base pointer to derived object
    ptr->fun();
    //output: b
    B* p=dynamic_cast<B*>(ptr);
    //cast the pointer to B* type.
    cout<<p->other_varible<<endl;
    p->f();//Error because 'f' is a protected member.
}
```

## This pointer

​	在 C++ 中，**this** 指针是一个特殊的指针，它指向当前对象的实例。在 C++ 中，每一个对象都能通过 **this** 指针来访问自己的地址。**this**是一个隐藏的指针，可以在类的成员函数中使用，它可以用来指向调用对象。

​	当一个对象的成员函数被调用时，编译器会隐式地传递该对象的地址作为 this 指针。

​	友元函数没有 **this** 指针，因为友元不是类的成员，只有成员函数才有 **this** 指针。

​	this 虽然用在类的内部，但是只有在对象被创建以后才会给 this 赋值，并且这个赋值的过程是编译器自动完成的，不需要用户干预，用户也不能显式地给 this 赋值。（`this` is a const pointer！）

```cpp
A* ptr=new A;
//then ptr==this
```

## 模态化设计

We can depart the declaration and the implemtation.

```cpp
project/
├── Vector.h    // Class declaration (header)
├── Vector.cpp  // Class definition (implementation)
└── main.cpp    // Usage (driver code)
```

>   An example from deepseek

When we run the project, we have compiler each `.cpp` file respectly and link them together.

### **4. Compilation & Linking**

C++ requires compiling each `.cpp` file separately and then linking them together. Here’s how to do it:

```bash
g++ -c Vector.cpp -o Vector.o
g++ -c main.cpp -o main.o
g++ Vector.o main.o -o program        #Link both object files into an executable
./program
```

Or we can take the following short cut:

```bash
g++ Vector.cpp main.cpp -o program    # Compile + link → "program" executable
./program                             # Run it
```

The follwing are some place to pay attention to.

>   1.  **Never compile `.h` files directly**:
>
>       -   Headers are included via `#include` in `.cpp` files.
>       -   Example: `main.cpp` includes `Vector.h`, which is processed during compilation.
>
>   2.  **Common Errors**:
>
>       -   **Linker Error**: If you forget to compile `Vector.cpp`, you’ll see errors like:
>
>           ```
>           undefined reference to `Vector::push_back(int)'
>           ```
>
>       -   **Missing Header Guards**: If `Vector.h` is included multiple times, use `#pragma once` to avoid redefinition errors.
