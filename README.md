# Vue 3 + TypeScript + Vite

This template should help get you started developing with Vue 3 and TypeScript in Vite. The template uses Vue 3 `<script setup>` SFCs, check out the [script setup docs](https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup) to learn more.

## Recommended IDE Setup

-  [VS Code](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur) + [TypeScript Vue Plugin (Volar)](https://marketplace.visualstudio.com/items?itemName=Vue.vscode-typescript-vue-plugin).

## Type Support For `.vue` Imports in TS

TypeScript cannot handle type information for `.vue` imports by default, so we replace the `tsc` CLI with `vue-tsc` for type checking. In editors, we need [TypeScript Vue Plugin (Volar)](https://marketplace.visualstudio.com/items?itemName=Vue.vscode-typescript-vue-plugin) to make the TypeScript language service aware of `.vue` types.

If the standalone TypeScript plugin doesn't feel fast enough to you, Volar has also implemented a [Take Over Mode](https://github.com/johnsoncodehk/volar/discussions/471#discussioncomment-1361669) that is more performant. You can enable it by the following steps:

1. Disable the built-in TypeScript Extension
   1. Run `Extensions: Show Built-in Extensions` from VSCode's command palette
   2. Find `TypeScript and JavaScript Language Features`, right click and select `Disable (Workspace)`
2. Reload the VSCode window by running `Developer: Reload Window` from the command palette.

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

2.如果此路是类似传参路由且不想展示在菜单栏时，可以在 page.js 中增加增加 `hidden：true`
