---
date: 2025-04-20
title: qt开发入门tutorial-第四节
---

盐都不盐了。

很好，下面我会**系统地介绍如何设计一个碰撞系统（Collision System）**，包括其基本概念、在 Qt 中用到的接口、经典设计思路，并穿插示例代码。

------

## 🧠 一、碰撞系统的核心目标

让**场景中的对象（物体）能够感知和响应彼此的接触关系**，常见的目标包括：

-   防止角色穿透地图（边界/障碍检测）
-   玩家拾取道具
-   子弹打中敌人
-   人物之间交互

------

## 🧩 二、核心概念

| 概念                      | 说明                                             |
| ------------------------- | ------------------------------------------------ |
| **碰撞检测（Detection）** | 判断两个对象是否接触                             |
| **碰撞响应（Response）**  | 接触之后做什么，例如拾取、弹开、伤害等           |
| **碰撞体（Hitbox）**      | 用于判断碰撞的区域，可以是矩形、圆形或复杂多边形 |
| **空间分区优化（高级）**  | 避免每一帧检测全部物体，提高效率                 |

------

## 🔧 三、Qt 提供的关键接口

### ✅ `QGraphicsItem::collidingItems()`

-   返回当前 item 和其他 item 的所有重叠项（使用形状判定）

```cpp
QList<QGraphicsItem*> collided = this->collidingItems();
```

### ✅ `QGraphicsItem::shape()` 或 `boundingRect()`

-   默认使用 `shape()` 判定碰撞，如果你不重写，默认是 `boundingRect()` 的形状。
-   你可以更细致地定义碰撞区域，例如圆形、路径、多边形等。

```cpp
QPainterPath MyItem::shape() const override {
    QPainterPath path;
    path.addEllipse(-20, -20, 40, 40); // 圆形碰撞体
    return path;
}
```

### ✅ 类型判断接口

-   用于判定碰撞到的 item 的类型：

```cpp
if (auto item = dynamic_cast<HealthItem*>(other)) {
    item->consume();
}
```

或

```cpp
if (qgraphicsitem_cast<HealthItem*>(other)) { ... }
```

------

## 🧱 四、碰撞系统设计思路（面向对象）

### 1. **抽象基类** `Item`

```cpp
class Item : public QGraphicsPixmapItem {
    Q_OBJECT
public:
    virtual void onPickup(Player* p) = 0;
};
```

### 2. **子类实现具体效果**

```cpp
class HealthItem : public Item {
public:
    void onPickup(Player* p) override {
        p->addHealth(20);
        scene()->removeItem(this);
        delete this;
    }
};
```

### 3. **GameScene 或 Player 检查碰撞**

```cpp
void Player::checkCollision() {
    QList<QGraphicsItem*> items = collidingItems();
    for (QGraphicsItem* item : items) {
        if (auto prop = dynamic_cast<Item*>(item)) {
            prop->onPickup(this);
        }
    }
}
```

------

## 🕹 五、边界检测与阻挡处理

你已经做了一部分，我们可以统一封装成一个函数：

```cpp
void Player::moveWithBoundary(QPointF step, QRectF mapRect) {
    QPointF newPos = pos() + step;
    if (mapRect.contains(newPos)) {
        setPos(newPos);
    } else {
        // 限制越界
        newPos.setX(qBound(mapRect.left(), newPos.x(), mapRect.right()));
        newPos.setY(qBound(mapRect.top(), newPos.y(), mapRect.bottom()));
        setPos(newPos);
    }
}
```

------

## ⚙ 六、进阶功能（可选）

| 功能              | 实现方式                               |
| ----------------- | -------------------------------------- |
| 多种碰撞体形状    | 重写 `shape()`                         |
| 动态生成道具      | `scene->addItem(new HealthItem(...))`  |
| 伤害判定/血量管理 | 在 `Player` 里加入 `hp` 字段与伤害函数 |
| 空间分区优化      | 使用四叉树（适合大型地图）             |

------

## 🧪 示例：拾取道具完整流程

1.  玩家移动后调用 `checkCollision()`
2.  玩家检测到与 `Item` 类型碰撞
3.  调用 `item->onPickup(player)`
4.  Item 响应后 `delete this`

------

## 📚 推荐你学习的接口 / 类

| 类                                    | 用途               |
| ------------------------------------- | ------------------ |
| `QGraphicsItem`                       | 所有物体的基类     |
| `QGraphicsScene`                      | 管理所有物体       |
| `QGraphicsView`                       | 显示场景           |
| `QTimer`                              | 帧更新             |
| `QElapsedTimer`                       | 计时器             |
| `QPainterPath`                        | 用于自定义碰撞区域 |
| `dynamic_cast` / `qgraphicsitem_cast` | 类型识别           |

------

需要我为你写一个 `Item` + `HealthItem` 的最小工作示例吗？可以直接拿来添加到你游戏里使用。
