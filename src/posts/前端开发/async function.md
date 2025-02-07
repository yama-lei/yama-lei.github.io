---
title: 异步编程
---

The **`async function`** declaration creates a [binding](https://developer.mozilla.org/en-US/docs/Glossary/Binding) of a new async function to a given name. The `await` keyword is permitted within the function body, enabling asynchronous, promise-based behavior to be written in a cleaner style and avoiding the need to explicitly configure promise chains.

>   reference: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/async_function

```js
//usage:
async function fetchMapData() {
  const res = await fetch('https://geo.datav.aliyun.com/areas_v3/bound/100000_full.json')
  return await res.json()
}
```

