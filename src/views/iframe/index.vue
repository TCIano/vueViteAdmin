<template>
   <iframe id="iframe" :style="{ width: '100%' }" :src="ifUrl" frameborder="0"></iframe>
</template>

<script setup lang="ts">
import two from '../two/index.vue'
import { ref, reactive, toRefs, onBeforeMount, onMounted, watchEffect, computed } from 'vue'
const ifUrl = ref('')
// http://localhost:8081
</script>
<style scoped lang="less">
iframe {
   position: absolute;
   top: 0;
   right: 0;
   display: block;
   height: 100%;
}
</style>
