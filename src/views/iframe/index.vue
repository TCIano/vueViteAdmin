<template>
   <div>
      <iframe
         id="iframe"
         :style="{ width: '100%', height: `${ifHeight}px` }"
         :src="ifUrl"
         frameborder="0"
      ></iframe>
   </div>
</template>

<script setup lang="ts">
import { ref, reactive, toRefs, onBeforeMount, onMounted, watchEffect, computed } from 'vue'
const ifUrl = ref('http://localhost:8080/#/demo')
// http://localhost:8081
let ifHeight = computed(() => window.innerHeight - 64 - 40 - 10 - 24)
console.log(ifHeight)
</script>
<style scoped lang="less">
iframe {
   // position: absolute;
   // top: 0;
   // right: 0;
   // display: block;
   // height: 100vh;
}
</style>
