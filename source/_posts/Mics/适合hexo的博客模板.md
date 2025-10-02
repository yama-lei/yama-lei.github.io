---
<%*
let title = await tp.system.prompt("请输入标题", "untitled"); 
await tp.file.rename(title);
%>
title: <%- title %>
date: <% tp.date.now("YYYY-MM-DD HH:mm:ss") %>
categories:
<%*
 // 根据文件路径生成分类
 let filePath = tp.file.path(true);
 let relativeFolder = filePath.split("/").slice(0, -1).join("/");
 if (relativeFolder) {
   let pathArray = relativeFolder.split("/");
   for (let category of pathArray) {
-%>  - <%- category %>
<%* } } %>
article: false
---
