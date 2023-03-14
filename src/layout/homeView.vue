<template>
   <a-layout>
      <MySider :menuList="routes" />
      <a-layout>
         <HeadertView></HeadertView>
      </a-layout>
   </a-layout>
</template>

<script setup lang="ts">
import { ref, reactive, toRefs, onBeforeMount, onMounted, watchEffect, computed } from 'vue'
import { useRouter } from 'vue-router'
import MySider from '../components/sider/index.vue'
import HeadertView from './headertView.vue'
const routes = useRouter().options.routes[0].children
</script>

<style scoped lang="less"></style>
