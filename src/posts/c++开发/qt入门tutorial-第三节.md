---
title: qt入门tutorial-第3节
date: 2025-05-01
---

很久没更新这个系列了，写的很简陋。到时候再改吧。

## QGraphicsView and QGraphicsScene

简单来说，view是你看到的页面。但是scene是这个页面的容器。view可以只展示一部分内容。

**view**：

```cpp
view->show();
view->scale(0.5,0.5); 
view->centerOn(user);
```

**scene**

```cpp
scene->addItem(QGraphicsItem);
```



## QGraphicsItem and QGraphicsPixmapItem

### 1. `setPixmap` 可以设置显示内容  
- `QGraphicsPixmapItem` 通过 `setPixmap(const QPixmap &pixmap)` 设置要显示的图像。
- 每次调用 `setPixmap()`，图形项会立即刷新为新的图像。

```cpp
item->setPixmap(QPixmap(":/images/icon.png")); // 显示 icon.png
```

---

### 2. 如何使用 `setPixmap` 展示图像和 GIF 动画

#### ✅ 显示静态图像：
直接加载图片文件即可：

```cpp
item->setPixmap(QPixmap("idle.png"));
```

#### ❌ 直接播放 GIF 的错误方式：
```cpp
item->setPixmap(QPixmap("animation.gif")); // ❌ 只显示第一帧，不会动
```

#### ✅ 正确播放 GIF 的方式：
使用 `QMovie` 配合 `setPixmap()` 实现动画播放：

```cpp
QMovie *movie = new QMovie("animation.gif");
item->setPixmap(movie->currentPixmap()); // 设置第一帧
connect(movie, &QMovie::frameChanged, [=](int) {
    item->setPixmap(movie->currentPixmap()); // 每帧更新
});
movie->start(); // 启动动画
```





