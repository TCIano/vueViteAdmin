<template>
   <iframe style="width: 100%" :src="ifUrl" frameborder="0"></iframe>
   <two />
   <two />
</template>

<script setup lang="ts">
import two from '../two/index.vue'
import { ref, reactive, toRefs, onBeforeMount, onMounted, watchEffect, computed } from 'vue'
const ifUrl = ref('')
</script>
<style scoped lang="less"></style>
