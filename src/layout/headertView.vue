<template>
   <a-layout-header style="background: #fff; padding: 0">
      <menu-unfold-outlined class="outLined" v-if="props.collapsed" @click="toggleCollapse" />
      <menu-fold-outlined class="outLined" v-else @click="toggleCollapse" />
      <!-- 头部右边菜单 -->
      <div class="admin-header-right">
         <a-space>
            <a-button>8464</a-button>
         </a-space>
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
               <sync-outlined class="syncIcon" />
               <span>{{ item.title }}</span>
            </template>

            <!-- pane内容 -->
         </a-tab-pane>
      </a-tabs>
   </a-layout-header>
</template>

<script setup lang="ts" name="headerView">
import { ref, reactive, toRefs, onBeforeMount, onMounted, watchEffect, computed } from 'vue'
const props = defineProps(['collapsed', 'tabsList', 'activeKey'])
const emit = defineEmits(['toggleCollapse', 'tabsClose', 'changePane'])
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
.admin-header-right {
   float: right;
   margin-right: 15px;
   height: 100%;
   display: flex;
   justify-content: flex-end;
}
.syncIcon {
   &:hover {
      color: #56a6f0;
   }
}
</style>
