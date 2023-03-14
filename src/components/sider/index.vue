<template>
   <a-layout-sider breakpoint="lg" mode="inline" style="height: 100vh">
      <div class="logo" />
      <a-menu
         id="menu"
         theme="dark"
         mode="inline"
         v-model:openKeys="openKeys"
         v-model:selectedKeys="selectedKeys"
      >
         <template v-for="item in props.menuList" :key="item.name">
            <template v-if="!item.children">
               <a-menu-item :key="item.name">
                  <template #icon>
                     <!-- 图标 -->
                     <!-- <SettingOutlined /> -->
                  </template>
                  <router-link :to="item.path">{{ item.meta.title }}</router-link>
               </a-menu-item>
            </template>
            <template v-else>
               <!-- 子节点也有名字，所有子菜单遍历需要在submenu中进行 -->
               <sub-menu :menu-info="item" />
            </template>
         </template>
      </a-menu>
   </a-layout-sider>
</template>

<script setup lang="ts" name="MySider">
import SubMenu from '../menu/index.vue'
import { ref, reactive, toRefs, onBeforeMount, onMounted, watchEffect, computed } from 'vue'

let selectedKeys = ref<string[]>() //默认选择第一个
let openKeys = ref<string[]>()
const props = defineProps({
   menuList: Array,
})
// console.log(props.menuList)
</script>

<style scoped lang="less">
.logo {
   height: 32px;
   background: rgba(255, 255, 255, 0.2);
   margin: 16px;
}

.site-layout-sub-header-background {
   background: #fff;
}

.site-layout-background {
   background: #fff;
}

[data-theme='dark'] .site-layout-sub-header-background {
   background: #141414;
}
</style>
