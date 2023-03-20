import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import homeView from '../layout/homeView.vue'

declare module 'vue-router' {
   interface RouteMeta {
      title: string,
      hidden?: boolean
   }
}

//根据views自动导入菜单路由
//第一层目录
interface importPage {
   [key: string]: string | any
}
const importPage: importPage = import.meta.glob('../views/**/page.js', {
   eager: true,
   import: 'default'
})

const importCom = import.meta.glob('../views/**/index.vue')
let importAll = import.meta.glob('../views/**/index.vue')
let allDir = Object.keys(importAll).map(item => {
   return item.replace('/index.vue', '').replace('../views', '')
})
interface tree {
   path?: string
   meta?: {
      title: string,
      hidden?: boolean
   },
   children?: tree[]
   component?: any
}
interface pretr {
   [key: string]: string | any,
}

const dirRoutes = filesToTreeNodes(allDir)
console.log(dirRoutes);

function filesToTreeNodes(arr: Array<string>) {
   var tree: tree = {}
   function addnode(node: string) {
      //对每个节点进行处理
      var splitpath: Array<string> = node.replace(/^\/|\/$/g, "").split('/');
      let name: string = ''
      var pretr: pretr = tree;
      for (let i = 0; i < splitpath.length; i++) {
         name += '/' + splitpath[i]
         let node: any = {
            path: '/' + splitpath[i],
            name: name.split('/').filter(Boolean).join('-'),
            ...(i < splitpath.length - 1 ? {} : { component: importCom['../views' + name + '/index.vue'] }),//最后一个节点才有页面，其余都是祖先节点
            meta: importPage['../views' + name + '/page.js'] || {}
            // isDirectory: true
         };
         pretr[splitpath[i]] = pretr[splitpath[i]] || node;
         if (i < splitpath.length - 1) {
            pretr[splitpath[i]].children = pretr[splitpath[i]].children || {};
            pretr = pretr[splitpath[i]].children;
         }
      }
   }
   function objectToArr(node: pretr) {
      Object.keys(node || {}).map((k) => {
         if (node[k].children) {
            objectToArr(node[k])
         }
      })
      //一层一层转为数组
      if (node.children) {
         node.children = Object.values(node.children)
         node.children.forEach(objectToArr)
      }
   }
   arr.map(addnode);//addnode相当于一个回调，他的参数就是map中回调第一个参数
   objectToArr(tree)
   return Object.values(tree)
}

const routes: Array<RouteRecordRaw> = [
   {
      path: '/',
      name: 'homeView',
      redirect: '/two',
      component: homeView,
      children: dirRoutes,
   },
]

const router = createRouter({
   history: createWebHistory(),
   routes,
})

export default router
