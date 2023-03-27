<template>
   <a-layout-sider width="256px" v-model:collapsed="props.collapsed">
      <div class="logo">
         <img src="@/assets/image/profile(1).png" />
         <h1>后台管理</h1>
      </div>
      <a-menu
         id="menu"
         theme="dark"
         :mode="props.mode"
         v-model:openKeys="openKeys"
         :selectedKeys="selectedKeys"
         @click="onClickItemMenu"
      >
         <template v-for="item in props.menuList" :key="item.name">
            <template v-if="!item.children">
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
   </a-layout-sider>
</template>

<script setup lang="ts" name="MySider">
import SubMenu from '@/components/menu/index.vue'
import { ref, reactive, toRefs, onBeforeMount, onMounted, watchEffect, computed } from 'vue'
import { MenuItem } from '../../layout/type'

let openKeys = ref<string[]>()
const props = defineProps({
   mode: {
      type: String,
      default: 'inline',
   },
   menuList: {
      type: Array,
      default: () => [],
   },
   collapsed: Boolean,
   selectedKeys: {
      type: Array,
      default: () => [],
   },
})
console.log(props.mode)

const emit = defineEmits(['clickMenu'])
// 点击菜单栏
const onClickItemMenu = (menuItem: MenuItem) => {
   console.log(menuItem)
   emit('clickMenu', menuItem)
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
.logo {
   height: 64px;
   position: relative;
   line-height: 64px;
   padding-left: 15px;
   -webkit-transition: all 0.3s;
   transition: all 0.3s;
   overflow: hidden;
   background-color: #001529;
   // &.light {
   //    background-color: #fff;
   //    h1 {
   //       color: @primary-color;
   //    }
   // }
   h1 {
      color: #fff;
      font-size: 20px;
      margin: 0 0 0 50px;
      display: inline-block;
      vertical-align: middle;
   }
   img {
      width: 46px;
      vertical-align: middle;
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
