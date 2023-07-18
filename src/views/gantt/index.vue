<template>
   <s-table></s-table>
</template>

<script setup lang="ts">
import { useGlobalSettingStore } from '@/store/modules/globalSetting'
import { ref, reactive, toRefs, onBeforeMount, onMounted, watchEffect, computed } from 'vue'
import sTable from '@/components/Stable/index.vue'
const store = useGlobalSettingStore()
console.log(store.navMode)
console.log(window.self === window.top)
</script>

<style scoped lang="less"></style>
