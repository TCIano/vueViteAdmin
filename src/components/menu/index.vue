<template>
   <!-- 先把父节点拿出来，然后对字节进行遍历 -->
   <a-sub-menu :title="menuInfo.meta.title || menuInfo.name" :key="menuInfo.path">
      <template #icon>
         <!-- 图标 -->
         <SettingOutlined />
      </template>
      <!-- 嵌套子菜单 -->
      <template v-for="menuItem in menuInfo.children">
         <template v-if="menuItem.children">
            <sub-menu :menu-info="menuItem" />
         </template>
         <template v-else>
            <a-menu-item
               :key="menuItem.path"
               :title="menuItem.meta.title"
               v-if="!menuInfo.meta.hidden"
            >
               <template #icon>
                  <!-- 图标 -->
                  <SettingOutlined />
               </template>
               <router-link :to="menuItem.path">
                  {{ menuItem.meta.title || menuInfo.name }}
               </router-link>
            </a-menu-item>
         </template>
      </template>
   </a-sub-menu>
</template>

<script setup lang="ts" name="SubMenu">
import { TreeNode } from '../sider/type'
import SubMenu from './index.vue'

const props = defineProps<{
   menuInfo: TreeNode
}>()
</script>

<style scoped></style>
