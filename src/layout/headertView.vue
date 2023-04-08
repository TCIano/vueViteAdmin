<template>
   <a-layout-header
      :style="{
         background: props.theme == 'dark' && props.mode === 'horizontal' ? '#001529' : '#fff',
         padding: 0,
      }"
   >
      <menu-unfold-outlined
         class="outLined"
         v-if="props.collapsed && mode !== 'horizontal'"
         @click="toggleCollapse"
      />
      <menu-fold-outlined
         class="outLined"
         v-else-if="mode !== 'horizontal'"
         @click="toggleCollapse"
      />
      <!-- 头部右边菜单 -->
      <div class="admin-header-right">
         <a-space>
            <a-button>8464</a-button>
         </a-space>
      </div>
      <div class="admin-header-menu">
         <slot name="sideMenu"></slot>
      </div>
      <!-- tab栏 -->
      <a-tabs
         type="editable-card"
         style="margin-left: 15px"
         :activeKey="props.activeKey"
         @edit="handelClose"
         @change="onChangePane"
         hideAdd
      >
         <a-tab-pane v-for="item in props.tabsList" :key="item.path">
            <template #tab>
               <sync-outlined
                  class="syncIcon"
                  v-show="item.path === activeKey"
                  @click="reloadRoute(item.path)"
               />
               <span>{{ item.title }}</span>
            </template>

            <!-- pane内容 -->
         </a-tab-pane>
      </a-tabs>
   </a-layout-header>
</template>

<script setup lang="ts" name="headerView">
import { useGlobalSettingStore } from '@/store/modules/globalSetting'
import { computed, ref, watch, unref } from 'vue'
const props = defineProps(['collapsed', 'tabsList', 'activeKey', 'theme', 'mode'])
const emit = defineEmits(['toggleCollapse', 'tabsClose', 'changePane', 'reloadRoute'])

//设置菜单类型
let globalSettingStore = useGlobalSettingStore()
let mode = computed(() => {
   return globalSettingStore.getNavMode
})
const toggleCollapse = () => {
   emit('toggleCollapse')
}
// 关闭tab栏逻辑

// 关闭tabs栏按钮
const handelClose = (tabKey: string) => {
   emit('tabsClose', tabKey)
}
//切换面板
const onChangePane = (activeKey: string) => {
   emit('changePane', activeKey)
}
//点击刷新按钮
const reloadRoute = (path: string) => {
   emit('reloadRoute', path)
}

//监听路由变化
</script>

<style scoped lang="less">
.outLined {
   font-size: 25px;
   margin-left: 15px;
   cursor: pointer;
   &:hover {
      color: #3498db;
   }
}
.admin-header-menu {
   display: flex;
}
.admin-header-right {
   float: right;
   margin-right: 15px;
   height: 100%;
   display: flex;
   justify-content: flex-end;
}
.ant-tabs-tab {
   .syncIcon {
      &:hover {
         // font-size: 15px;
         color: #4a81b4;
      }
   }
}
</style>
