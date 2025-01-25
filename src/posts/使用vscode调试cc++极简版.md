---

date: 2025-01-24

---

# 使用vscode调试c/c++ 极简版

## Preparation:

下载vscode，mingw等等，记得添加path环境变量

这一步教程很多，~~而且最重要的是我没有卡在这一步~~ 所以，我们不看这一步


## 配置任务

![image-20250124223439139](C:\Users\yama\AppData\Roaming\Typora\typora-user-images\image-20250124223439139.png)

如图，需要打开对应的文件，然后找到**配置任务**

![image-20250124223612220](C:\Users\yama\AppData\Roaming\Typora\typora-user-images\image-20250124223612220.png)

**c对应是gcc文件， cpp对应是g++文件**

![image-20250124223755055](C:\Users\yama\AppData\Roaming\Typora\typora-user-images\image-20250124223755055.png)

发现自动生成了.vscode文件

然后就可以回到c文件里面，发现可以开始调试了

### 开始调试

点击F5，或者右上角那个运行按钮，点击“调试c/c++文件”

>   如果你的电脑按F1~ F12的功能键功能键没有用，不妨同时摁下Fn和Esc键，这将启用F1~F12的功能键

![image-20250124224449511](C:\Users\yama\AppData\Roaming\Typora\typora-user-images\image-20250124224449511.png)

点击上面那个，就会发现开始调试啦





## 调试C++

刚刚以c为例，现在c++再演示一遍

![image-20250124224645066](C:\Users\yama\AppData\Roaming\Typora\typora-user-images\image-20250124224645066.png)

同样的先要**配置任务**

然后选择第一个(**C/C++:g++.exe**)：

![image-20250124224932279](C:\Users\yama\AppData\Roaming\Typora\typora-user-images\image-20250124224932279.png)

再点击F5或者右上角，开始调试：

![image-20250124224811351](C:\Users\yama\AppData\Roaming\Typora\typora-user-images\image-20250124224811351.png)

在这里选择**C++(GDB/LLDB)**即可

就可以啦。



当然，你也可以点击左侧的调试按钮，反正差不多（我感觉）

![image-20250124230048579](C:\Users\yama\AppData\Roaming\Typora\typora-user-images\image-20250124230048579.png)

同样是点击第一个即可。

