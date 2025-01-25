# pinia

pinia： 用于集中管理应用数据。

## 创建pinia环境

运行：

```cmd
npm i pinia
```

在src文件夹下创建一个名叫'store'的文件夹，用于存储所有的Store文件。每个文件相当于一个模块，如用于管理LoveTalke.vue组件数据的loveTalk.ts

---

## 创建store

在对应的ts文件中：
```ts
import { defineStore } from 'pinia';

// 定义一个 Store
const useLoveTalkStore = defineStore('loveTalk', {
  state: () => {
    return {
      loveTalks: [
        'loveTalk1',
        'loveTalk2',
        'loveTalk3',
      ],
    };
  },
});

// 导出 Store
export default useLoveTalkStore;
```

>   Store 主要包含以下属性：
>   - **state**: 存储应用的状态。
>   - **getters**: 类似于计算属性，用于从 state 中派生出一些状态。
>   - **actions**: 用于修改 state 的方法。

## 在组件中使用store

### 1.先在main.ts里面引入pinia并挂载

```ts
import {createPinia} from 'pinia'
import App form 'App.vue'
import {createApp} from 'vue'

const app=createApp(App)
app.use(createPinia())//use pinia
app.mount('#app');//mount the app

```

>   和Router使用时类似，也要在main,ts文件里面调用app的use方法
>
>   ```ts
>   import {createRouter} from 'vue-router'
>   app.use(createRouter())
>   ```
>
>   如图，加上这两行即可

### 2. 在组件中使用store里面的数据

将组件里的数据用store里面的数据替换（前提是store里面有这个数据）

如在LoveTalk.vue组件内：

```vue
<template>
  <div>
    <ul>
      <li v-for="loveTalk in loveTalkStore.loveTalks" :key="loveTalk">
        {{ loveTalk }}
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { useLoveTalkStore } from '@/store/loveTalkStore';

// 获取 Store 实例
const loveTalkStore = useLoveTalkStore();
</script>
```

### 3. 修改数据的方法

#### 1. 直接修改

可以直接在import了对应store的组件内直接修改值：

```vue
<script>
	import {useLoveTalkStore} from '@/store/loveTalk.ts'
	const loveTalk=useLoveTalk()
	function addLoveTalk()
	{
		loveTalk.loveTalks.push('aNewLoveTalk')
		//直接就可以修改数据，可读可写
	}
</script>
```



#### 2. 批量修改
如果需要一次性修改多个数据，可以采取上面的方法，也可以一次性修改：
```vue
<script>
	import {useLoveTalkStore} from '@/store/loveTalk.ts'
	const loveTalk=useLoveTalk()
	function addLoveTalk()
	{
		/*
		
		loveTalk.a='hahaha'
		loveTalk.b='hahaha'
		loveTalk.c='hahaha'
		可以这样一个一个改
		*/
		//也可以下面使用$patch方法
		loveTalk.$patch({
			a:'hahaha',
			b:'hahaha',
			c:'hahaha'
		})
		//$patch是一次修改，分开的话是多次修改
	}
</script>
```
#### 3. 借助action修改
在创建store的时候加上一个叫action的属性：
```ts
import { defineStore } from 'pinia';

// 定义一个 Store

const useLoveTalkStore = defineStore('loveTalk', {
  actions:{
		func1(){
			console.log('function1 is called')
		},
		func2: ()=>{
		console.log('')
		},
		func3(){
			//如果想要修改store里面的数据的话，必须要通过this指针
			if(this.loveTalk.length>3){
				this.loveTalks.push(
				'newLoveTalk')
			}
		}
  }
  //最后一种方法有利于代码复用
  //action是一个对象，对象这个对象存储了一个一个的方法
  state: () => {
    return {
      loveTalks: [
        'loveTalk1',
        'loveTalk2',
        'loveTalk3',
      ],
    };
    //state是一个函数，return一个对象，用这个对象存储所有的数据，这些数据可以直接通过dot表达式获取
  },
});

// 导出 Store
export default useLoveTalkStore;
```

## store的参数：getters和actions

### getters:类似于计算属性

对store里面的state中的数据进行加工，创建新的变量， 并且能够像state里面的变量一样被访问

```ts
import {defineStore} from 'pinia'
//defineStore的第一个参数是名字，
const testStore=defineStore('forTest',{
    state(){
        return {
            test1:10
        }
    },//state的这个函数return一个
   getters:{
       //getters和actions都是一个对象。对象里面都有很多的函数，这些函数都是返回目的值
       test2(state){
           return 10*state.test1
       }
   },
   actions:{
   	 	addTestOne(){
		this.test1+=1
            //通过this指针访问
        },
       addTestTwo(state){
		state.test1+=2
            //通过state访问
        }
       
	}
})
```



## store的组合式写法

前面写的都是选项式写法，下面介绍组合式写法，更加的简单和便捷。

```ts
import {ref, reacctive} from 'vue'
export const loveTalkStore=defineStore('name',()=>{
    var loveTalks=reactive(
    [
        'loveTalk1',
        'loveTalk2'
    ])
//数据和方法都可以放在一起
    return {loveTalks}
})
//第二个参数是一个函数，而非一个对象
```





---

## Note：在getters和actions中获取state的数据

需注意，可以在对应的函数中加上state参数，然后通过state.data的方式实先参数的获取

或者可以通过this指针，this指针指向的是当前Store实例。

