# Vue 3 + TypeScript + Vite

[点击体验（Vue3+TypeScript+Antd+Vite）](https://tciano.github.io/vueViteAdmin/)

## Project setup

`npm install`

## Compiles and hot-reloads for development

`npm run dev`

## Compiles and minifies for production

`npm run build`

## 路由配置

> 本项目会根据`views`中的文件自动生成路由并且自动配置菜单，规则如下：

1.一个文件夹代表一个路由和菜单，包含：

-  一个入口页面：`index.vue`(可选)。

   -  如果页面文件中有`index.vue`,说明这是一个页面文件，否则这是一个父级菜单。

-  一个配置文件：`page.js`(必填)。

   -  里面配置菜单的标题等：`export default {title:'\*\*\*'}`。

-  菜单排序

   -  可在文件中的 page.js 中配置`sort`进行升序排序。
   -  `注意:`当未配置`sort`时，默认排序为 0 ，因此会出现在菜单最前面（并且按照文件顺序排序）。

2.如果此路是类似传参路由且不想展示在菜单栏时，可以在 page.js 中增加增加 `hidden：true`

3. 当页面名和页面文件夹名字一样时，页面会自动缓存

   -  如果不想缓存该页面则可以，在配置文件中添加`notkeepAlive:true`字段
