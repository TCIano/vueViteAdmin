<template>
   <a-layout>
      <a-layout-sider
         v-if="mode !== 'horizontal'"
         width="256px"
         v-model:collapsed="collapsed"
         style="overflow: auto; position: fixed; height: 100vh; top: 0; left: 0; bottom: 0"
      >
         <div
            class="logo"
            :style="{
               '--titleBg': theme === 'light' ? '#fff' : '#001529',
            }"
         >
            <img src="@/assets/image/profile(1).png" />
            <h1 :style="{ '--titleColor': theme === 'light' ? '#001529' : '#ccc' }">后台管理</h1>
         </div>
         <!-- 菜单 -->
         <MySider
            :theme="theme"
            :mode="mode"
            @openSide="openSide"
            :openKeys="openKeys"
            :menuList="routes"
            :selectedKeys="selectedKeys"
            :collapsed="collapsed"
            @clickMenu="clickMenu"
         />
      </a-layout-sider>
      <!-- 内容 -->
      <a-layout
         :class="['beauty-scroll', 'admin-layout-main']"
         :style="{ marginLeft: mode !== 'horizontal' ? (!collapsed ? '256px' : '80px') : '0px' }"
      >
         <!--  -->
         <HeadertView
            :theme="theme"
            :mode="mode"
            class="admin-header"
            :collapsed="collapsed"
            :tabsList="tabsList"
            :activeKey="activeKey"
            @toggleCollapse="toggleCollapse"
            @tabsClose="tabsClose"
            @changePane="changePane"
            @reload-route="reloadRoute"
         >
            <template #sideMenu v-if="mode === 'horizontal'">
               <!-- 页面不路由菜单 -->
               <div class="logo">
                  <img src="@/assets/image/profile(1).png" />
                  <h1 :style="{ '--titleColor': theme === 'light' ? '#001529' : '#ccc' }">
                     后台管理
                  </h1>
               </div>
               <MySider
                  v-if="mode === 'horizontal'"
                  :theme="theme"
                  :mode="mode"
                  :openKeys="openKeys"
                  :menuList="routes"
                  :selectedKeys="selectedKeys"
                  :collapsed="collapsed"
                  @clickMenu="clickMenu"
                  style="margin-left: 10px"
               />
            </template>
         </HeadertView>
         <a-layout-content
            :style="{
               margin: '40px 16px 10px',
               padding: '24px',
               background: '#fff',
               minHeight: `${minHeight}px`,
            }"
         >
            <router-view v-if="reloadRouteAlive" v-slot="{ Component }">
               <page-transition>
                  <keep-alive v-if="keepAliveComponets" :include="keepAliveComponets">
                     <component :is="Component" />
                  </keep-alive>
                  <component v-else :is="Component" />
               </page-transition>
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
import { ref, nextTick, unref, watch, computed, onUnmounted, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import pageTransition from '../components/pageTransition/index.vue'
import MySider from '@/components/sider/index.vue'
import HeadertView from './headertView.vue'
import { matches0, MenuItem, tabsList } from './type'
import { useGlobalSettingStore } from '@/store/modules/globalSetting'
import { useTabsStore } from '@/store/modules/tabs'
import { route } from '@/store/type'
const SYSTEM_TABS_STORE = 'system-tabs'
let openKeys = ref<string[]>([]) //展开的菜单
let activeKey = ref('') //当前tabs栏目选中
// 菜单的默认选择
let selectedKeys = ref<string[]>(['']) //默认选择第一个
let tabsStore = useTabsStore()
const router = useRouter()
const route = useRoute()
//设置激活的当前tab
const setActiveKey = () => {
   activeKey.value = route.path
}
//添加tabs
const addTab = () => {
   const { fullPath, name, meta, params, query, hash, path } = route
   tabsStore.addCacheView({
      fullPath,
      name,
      meta,
      params,
      query,
      hash,
      path,
   })
}
watch(
   () => router.currentRoute.value,
   () => {
      setActiveKey()
      addTab()
      // openSide([])
   }
)
onMounted(() => {
   refreshTabs() //刷新之后重新拿到tabs
   setActiveKey()
   addTab()
})
const routes = router.options.routes[0].children
const minHeight = ref(window.innerHeight - 64 - 50)

const collapsed = ref(false)
const toggleCollapse = () => {
   collapsed.value = !collapsed.value
}

selectedKeys.value = tabsStore.getActiveKey
   ? [tabsStore.getActiveKey]
   : [router.currentRoute.value.fullPath]
/**
 * 菜单栏和tabs栏目逻辑切换
 * (写的有些繁琐，需要修改)
 */
// 要缓存的页面
let keepAliveComponets = computed(() => {
   console.log(
      tabsStore.getCacheView
         .filter(item => !Reflect.has(item.meta, 'notkeepAlive')) //把不缓存的页面过滤掉
         .map(route => route.name) || ['']
   )

   return (
      tabsStore.getCacheView
         .filter(item => !Reflect.has(item.meta, 'notkeepAlive')) //把不缓存的页面过滤掉
         .map(route => route.name) || ['']
   )
})

const tabsList = computed(() => {
   // console.log('变化', tabsStore.getCacheView)
   return tabsStore.getCacheView.length > 0
      ? tabsStore.getCacheView.map(item => {
           return {
              title: item.meta.title,
              path: item.fullPath,
           }
        })
      : [
           {
              title: router.currentRoute.value.meta.title,
              path: selectedKeys.value[0],
           },
        ]
})
// activeKey.value = tabsList.value[0].path
//tabs切换
const changePane = (active: string) => {
   activeKey.value = active
   router.push({
      path: active,
   })
   // selectedKeys.value = [active]
}
// tab栏关闭逻辑
const tabsClose = (tabKey: string) => {
   if (tabsList.value.length === 1) return message.warning('已经是最后一个了')
   //移除缓存
   tabsStore.removeCacheView(tabKey)
   if (tabKey === activeKey.value) {
      activeKey.value = tabsList.value[tabsList.value.length - 1].path
      selectedKeys.value = [activeKey.value]
      router.push({
         path: activeKey.value,
      })
   }
}
//页面刷新tabs
const refreshTabs = () => {
   window.addEventListener('beforeunload', () => {
      sessionStorage.setItem(SYSTEM_TABS_STORE, JSON.stringify(tabsStore.getCacheView))
   })
   let sessionTabs = sessionStorage.getItem(SYSTEM_TABS_STORE)
   if (sessionTabs) {
      let oldTabs = JSON.parse(sessionTabs)
      oldTabs && tabsStore.resetCacheView(oldTabs)
   }
}
// 点击侧边栏逻辑
const clickMenu = (menuItem: any) => {
   if (!tabsList.value?.find(item => item.path === menuItem.key)) {
      tabsList.value?.push({
         path: menuItem.key,
         title: menuItem.item.title,
      })
   }

   selectedKeys.value = [menuItem.key]
   activeKey.value = menuItem.key
}
//侧边栏展开
const openSide = (openKey: string[]) => {
   // openKeys.value = [openKey[openKey.length - 1]] //每次只开一个
   openKeys.value = openKey
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
//设置菜单类型
let globalSettingStore = useGlobalSettingStore()
let mode = computed(() => {
   return globalSettingStore.getNavMode
})
let theme = computed(() => {
   return globalSettingStore.getNavTheme
})
</script>

<style scoped lang="less">
.logo {
   height: 64px;
   // position: relative;
   line-height: 64px;
   padding-left: 15px;
   -webkit-transition: all 0.3s;
   transition: all 0.3s;
   overflow: hidden;
   background-color: var(--titleBg);
   h1 {
      color: var(--titleColor);
      font-size: 20px;
      margin: 0 0 0 40px;
      display: inline-block;
      vertical-align: middle;
   }
   img {
      width: 46px;
      vertical-align: middle;
   }
}
.admin-layout-main {
   // padding-top: 20px;
   margin-left: 0px;
   .admin-header {
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
