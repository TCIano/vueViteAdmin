<template>
   <a-menu
      id="menu"
      :theme="props.theme"
      :mode="props.mode"
      :openKeys="openKeys"
      :selectedKeys="selectedKeys"
      @openChange="onOpenChange"
      @click="onClickItemMenu"
   >
      <template v-for="item in props.menuList" :key="item.name">
         <template v-if="!item?.children">
            <a-menu-item :key="item.path" :title="item.meta?.title" v-if="!item.meta.hidden">
               <template #icon>
                  <!-- 图标 -->
                  <SettingOutlined />
               </template>
               <router-link :to="item.path">
                  {{ item.meta?.title || item.name }}
               </router-link>
            </a-menu-item>
         </template>
         <template v-else>
            <!-- 子节点也有名字，所有子菜单遍历需要在submenu中进行 -->
            <sub-menu :menu-info="item" />
         </template>
      </template>
   </a-menu>
</template>

<script setup lang="ts" name="MySider">
import SubMenu from '@/components/menu/index.vue'
import { ref, reactive, toRefs, onBeforeMount, onMounted, watchEffect, computed } from 'vue'
import { MenuItem } from '../../layout/type'
import { TreeNode } from './type'

const props = defineProps({
   mode: {
      type: String,
      default: 'inline',
   },
   theme: {
      type: String,
      default: 'dark',
   },
   menuList: {
      type: Array<any>,
      default: () => [],
   },
   collapsed: Boolean,
   selectedKeys: {
      type: Array,
      default: () => [],
   },
   openKeys: {
      type: Array,
      default: () => [],
   },
})
const emit = defineEmits(['clickMenu', 'openSide'])
// 点击菜单栏
const onClickItemMenu = (menuItem: MenuItem) => {
   emit('clickMenu', menuItem)
}
//展开菜单
const onOpenChange = (openKeys: string[]) => {
   emit('openSide', openKeys)
}
</script>

<style scoped lang="less">
.admin-layout {
   .side-menu {
      &.fixed-side {
         position: fixed;
         height: 100vh;
         left: 0;
         top: 0;
      }
   }
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
