---
date: 2025-01-24
title: json文件
---

# json文件

## JSON的认识

json文件其实就是**文本数据格式**就是用来存放数据的，本质就是一条字符串。JSON文件的语法是从javascript的对象语法中脱离出来的，可以将JSON字符串转换为一个js对象，也可以将一个js对象转成JSON字符串：

```js
var object=JSON.prase(jsonText)
//将JSON文本转换成一个js对象
var jsonText=JSON.stringify(object)
//将一个js对象转换成json文本
```

>   所以，JSON只是一种文本规范

---

## JSON的数据类型

1.    数字: 1, 2, 3, 0.1, 0.3 包括整形和浮点型
2.   布尔值：true or false
3.    字符串: "json中的字符串使用双引号，如果必须使用引号，那么需要反斜杠/"转义"
> ’/‘只能够转义一个字符，如//n 变成/n因为第一个反斜杠把第二个给转义了。

4.   null
5.   数组; [value1,value2]
6.   对象：{"key1":value1, "key2":value2}

>   对象和数组可以无限嵌套

---

## JSON文件的应用场景

常见于配置文件等