<template>
   <div style="height: 500px; width: 100px; background-color: skyblue">two</div>
   <div style="height: 500px; width: 100px; background-color: skyblue">two</div>
   <div style="height: 500px; width: 100px; background-color: skyblue">two</div>
</template>

<script setup lang="ts">
import { useGlobalSettingStore } from '@/store/modules/globalSetting'
import { ref, reactive, toRefs, onBeforeMount, onMounted, watchEffect, computed } from 'vue'
const store = useGlobalSettingStore()
console.log(store.navMode)
</script>

<style scoped lang="less"></style>
