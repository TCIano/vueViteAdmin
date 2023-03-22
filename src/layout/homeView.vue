<template>
   <a-layout>
      <!-- 菜单 -->
      <MySider
         :menuList="routes"
         :selectedKeys="selectedKeys"
         :collapsed="collapsed"
         style="position: fixed; height: 100vh; left: 0; right: 0"
         @clickMenu="clickMenu"
      />
      <!-- 内容 -->
      <a-layout
         class="beauty-scroll admin-layout-main"
         :style="{ marginLeft: !collapsed ? '256px' : '80px' }"
      >
         <HeadertView
            class="admin-header"
            :collapsed="collapsed"
            :tabsList="tabsList"
            :activeKey="activeKey"
            @toggleCollapse="toggleCollapse"
            @tabsClose="tabsClose"
            @changePane="changePane"
            @reload-route="reloadRoute"
         ></HeadertView>
         <a-layout-content
            :style="{
               margin: '40px 16px 10px',
               padding: '24px',
               background: '#fff',
               minHeight: `${minHeight}px`,
            }"
         >
            <router-view v-if="reloadRouteAlive">
               <template #default="{ Component, route }">
                  <page-transition>
                     <keep-alive v-if="keepAliveComponets" :exclude="keepAliveComponets">
                        <component :is="Component" />
                     </keep-alive>
                     <component v-else :is="Component" />
                  </page-transition>
               </template>
            </router-view>
         </a-layout-content>
         <!-- 底部 -->
         <!-- <a-layout-footer :style="{ textAlign: 'center', padding: '48px 16px 24px' }">
            123
         </a-layout-footer> -->
      </a-layout>
   </a-layout>
</template>

<script setup lang="ts" name="homeView">
import { message } from 'ant-design-vue'
import { ref, nextTick, unref, watch } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import pageTransition from '../components/pageTransition/index.vue'
import MySider from '../components/sider/index.vue'
import HeadertView from './headertView.vue'
import { matches0, MenuItem, tabsList } from './type'
const router = useRouter()
watch(
   () => unref(router.currentRoute.value),
   val => {
      //监听路由的回退和前进，实现切换菜单和tabs
      clickMenu({ key: val.path, item: { title: val.meta.title } })
   }
)
const routes = router.options.routes[0].children
const minHeight = ref(window.innerHeight - 64 - 50)
const collapsed = ref(false)
const toggleCollapse = () => {
   collapsed.value = !collapsed.value
}
// 菜单的默认选择
let selectedKeys = ref<string[]>(['']) //默认选择第一个
let matches: Array<any> = useRoute().matched
selectedKeys.value = [
   matches[0].children.find((item: matches0) => item.path === matches[0].redirect).path,
]
/**
 * 菜单栏和tabs栏目逻辑切换
 * (写的有些繁琐，需要修改)
 */
// 要缓存的页面
let keepAliveComponets = ref<string[]>([''])

const tabsList = ref<tabsList[]>([])
let activeKey = ref('') //当前tabs栏目选中
tabsList.value = [
   {
      title: matches[0].children.find((item: matches0) => item.path === matches[0].redirect).meta
         .title,
      path: selectedKeys.value[0],
   },
]
activeKey.value = tabsList.value[0].path
//tabs切换
const changePane = (active: string) => {
   activeKey.value = active
   router.push({
      path: active,
   })
   selectedKeys.value = [active]
}
// tab栏关闭逻辑
const tabsClose = (tabKey: string, currentActiveKey: string) => {
   if (tabsList.value.length === 1) return message.warning('已经是最后一个了')
   tabsList.value = tabsList.value.filter(item => item.path !== tabKey)
   if (tabKey === currentActiveKey) {
      activeKey.value = tabsList.value[tabsList.value.length - 1].path
      selectedKeys.value = [activeKey.value]
      router.push({
         path: activeKey.value,
      })
   }
}
// 点击侧边栏逻辑
const clickMenu = (menuItem: any) => {
   // await router.push({ path: menuItem.key })
   if (!tabsList.value?.find(item => item.path === menuItem.key)) {
      tabsList.value?.push({
         path: menuItem.key,
         title: menuItem.item.title,
      })
   }
   selectedKeys.value = [menuItem.key]
   activeKey.value = menuItem.key
}
//刷新当前路由
let reloadRouteAlive = ref(true)
const reloadRoute = (path: string) => {
   //通过刷新路由刷新
   // router.push(path)
   reloadRouteAlive.value = false
   nextTick(() => {
      reloadRouteAlive.value = true
   })
}
</script>

<style scoped lang="less">
.admin-layout-main {
   // padding-top: 20px;
   .admin-header {
      // position: fixed;
      // right: 0;
      // left: 200px;·
      // margin-bottom: 64px;·
      // float: right;
      // overflow: hidden;
      // transition: all 0.2s;
      // &.fixed-tabs.multi-page:not(.fixed-header) {
      //    height: 0;
      // }
   }
   // .zoom-fade-enter-active,
   // .zoom-fade-leave-active {
   //    // transition: transform 0.2s, opacity 0.3s ease-out;
   //    transition: transform 0.2s, opacity 0.3s ease-out;
   // }

   // .zoom-fade-enter-from {
   //    opacity: 0;
   //    transform: scale(0.92);
   // }
   // // .zoom-fade-enter-to {
   // //    opacity: 1;
   // //    transform: scale(1);
   // // }

   // .zoom-fade-leave-to {
   //    opacity: 0;
   //    transform: scale(1.06);
   // }
}
</style>
