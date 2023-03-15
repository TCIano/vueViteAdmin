<template>
   <a-layout>
      <MySider :menuList="routes" style="position: fixed; height: 100vh; left: 0; right: 0" />
      <a-layout class="admin-layout-main beauty-scroll" :style="{ marginLeft: '200px' }">
         <HeadertView></HeadertView>
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
         <!-- <a-layout-footer :style="{ textAlign: 'center', padding: '48px 16px 24px' }">
            123
         </a-layout-footer> -->
      </a-layout>
   </a-layout>
</template>

<script setup lang="ts">
import { ref, reactive, toRefs, onBeforeMount, onMounted, watchEffect, computed } from 'vue'
import { useRouter } from 'vue-router'
import MySider from '../components/sider/index.vue'
import HeadertView from './headertView.vue'
const routes = useRouter().options.routes[0].children
const minHeight = ref(window.innerHeight - 64 - 50)
</script>

<style scoped lang="less">
.admin-layout-main {
   // padding-top: 20px;
   .admin-header {
      top: 0;
      right: 0;
      overflow: hidden;
      transition: all 0.2s;
      &.fixed-tabs.multi-page:not(.fixed-header) {
         height: 0;
      }
   }
}
</style>
