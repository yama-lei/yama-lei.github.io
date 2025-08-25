---
title: vue3的响应式数据
date: 2025-01-20
---

# vue3的响应式数据

## 分类：

1.   ref-> 普通数据类型，也可定义对象类型的响应式数据，生成一个ref对象。（使用ref创建响应式对象数据，底层其实是用reactive实现的，因此也是深层次的）

2.   reactive-> 只能定义对象(包括数组)数据类型，深层次的，对象的属性也都是响应式的。reactive生成的响应式数据不能整个修改，（会丧失响应式）可以使用BObjext.assign(object1, boject2),即可把object2复制到object1上

3.   computed-> 计算属性

4.   toRefs,参数为一个响应式对象，使得里面每个属性都是响应式的响应式数据。如let {name, age}= person; name 和age都不是响应式的，可以let name=ref(person.name) age=ref(person.age)

     或者： let {name, age}= toRefs(person)

     toRef: let name=toRef(person,name);

5.   v-model 用于数据的双向绑定

6.    computed:计算属性

## 特殊用法

1.   watch 的监视

---

## NOTE: 

1.   使用解包会导致响应式数据丧失！需要用toRefs，才能够避免出现意外。但是会使得对象中的每一个都变成响应式数据，所以可以使用"storeToRefs"

     
