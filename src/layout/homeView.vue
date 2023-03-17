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
         :style="{ marginLeft: !collapsed ? '200px' : '80px' }"
      >
         <HeadertView
            class="admin-header"
            :collapsed="collapsed"
            :tabsList="tabsList"
            :activeKey="activeKey"
            @toggleCollapse="toggleCollapse"
            @tabsClose="tabsClose"
            @changePane="changePane"
         ></HeadertView>
         <a-layout-content
            :style="{
               margin: '40px 16px 10px',
               padding: '24px',
               background: '#fff',
               minHeight: `${minHeight}px`,
            }"
         >
            <router-view></router-view>
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
import { ref, reactive, toRefs, onBeforeMount, onMounted, watchEffect, computed } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import MySider from '../components/sider/index.vue'
import HeadertView from './headertView.vue'
import { matches0, MenuItem, tabsList } from './type'
const router = useRouter()
const routes = router.options.routes[0].children
const minHeight = ref(window.innerHeight - 64 - 50)
const collapsed = ref(false)
const toggleCollapse = () => {
   collapsed.value = !collapsed.value
}
// 菜单的默认选择
let selectedKeys = ref<string[]>([]) //默认选择第一个
let matches: Array<any> = useRoute().matched
selectedKeys.value = [
   matches[0].children.find((item: matches0) => item.path === matches[0].redirect).path,
]

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
}
// tab栏关闭逻辑
const tabsClose = (tabKey: string) => {
   if (tabsList.value.length === 1) return message.warning('已经是最后一个了')
   tabsList.value = tabsList.value.filter(item => item.path !== tabKey)
   activeKey.value = tabsList.value[tabsList.value.length - 1].path
}
// 点击侧边栏逻辑
const clickMenu = (menuItem: MenuItem) => {
   if (!tabsList.value?.find(item => item.path === menuItem.key)) {
      tabsList.value?.push({
         path: menuItem.key,
         title: menuItem.item.title,
      })
   }
   selectedKeys.value = [menuItem.key]
   activeKey.value = menuItem.key
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
}
</style>
