<template>
   <iframe ref="iframe" width="100%" height="100%" :src="ifUrl" frameborder="0"></iframe>
</template>

<script setup lang="ts">
import { ref, reactive, toRefs, onBeforeMount, onMounted, watchEffect, computed } from 'vue'
const ifUrl = ref('http://127.0.0.1:5173/testsub1')
// http://localhost:8081
const iframe = ref<HTMLIFrameElement>()
const ifHeight = ref(0)
onMounted(() => {
   ifHeight.value = iframe.value!.parentElement!.clientHeight
   console.log(ifHeight.value)
})
</script>
<style scoped lang="less"></style>
