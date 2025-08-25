---
date: 2025-04-20
title: qt开发入门tutorial-第一节
---

## Before We Start

qt开发工具： 

-   qt creator
-   qt designer

qt creator的使用不复杂，并且我以及掌握了，所以不会写在这个系列中

qt的项目有 qt-widget和 qt-quick两种，后者更为现代，但是本教材以第一种为主

## 一个qt程序是怎么运作的

笔者曾经写过一个简陋的魔塔小游戏使用的是easyX开发，逻辑是：

```cpp
while(gameIsOn){
	drawAllTheItem();
	getchar();
	...
	//即，在一个不断运行的while循环里，我在keyborad的输入引起了draw的内容变化，从而实现游戏交互
}
```

而在qt中，也是类似的：

```cpp
while (应用程序运行中) {
    1. 检查事件队列是否有新事件
       - 用户输入（鼠标/键盘）
       - 窗口系统事件（重绘/缩放）
       - 定时器事件
       - 网络/IO事件
       
    2. 如果有事件：
       a. 转换为QEvent对象
       b. 通过QCoreApplication::sendEvent()分发
       c. 调用对应对象的event()方法
       
    3. 处理完所有事件后，进入等待状态（不消耗CPU）
}
```

---

## QT widget

>   这里的内容是qt官方的文档

The Qt Widgets Module provides a set of UI elements to create classic desktop-style user interfaces. See the User Interfaces overview for more information on using widgets.

### Widgets

Widgets are the primary elements for creating user interfaces in Qt. Widgets can display data and status information, receive user input, and provide a container for other widgets that should be grouped together. A widget that is not embedded in a parent widget is called a window.
The QWidget class provides the basic capability to render to the screen and to handle user input events. All UI elements that Qt provides are either subclasses of QWidget or are used in connection with a QWidget subclass. To create custom widgets, subclass QWidget or a suitable subclass and reimplement the virtual event handlers.

### Styles

Styles draw on behalf of widgets and encapsulate the look and feel of a GUI. Qt's built-in widgets use the QStyle class to perform nearly all of their drawing, ensuring that they look exactly like the equivalent native widgets.

Qt Style Sheets are a powerful mechanism that lets you customize the appearance of widgets, in addition to what is already possible by subclassing QStyle.

### Layouts

Layouts are an elegant and flexible way to automatically arrange child widgets within their container. Each widget reports its size requirements to the layout through the sizeHint and sizePolicy properties, and the layout distributes the available space accordingly.

Qt Widgets Designer is a powerful tool for interactively creating and arranging widgets in layouts.

---

## ui文件是如何使用在qt中的？

